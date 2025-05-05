import { Adapter, Wallet } from "../../types/index.d";
import { HttpAgent, Identity, Actor, ActorSubclass, AnonymousIdentity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  WalletAdapterNetwork,
  type Adapter as SolanaAdapter,
  type MessageSignerWalletAdapterProps,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Ed25519KeyIdentity,
  DelegationIdentity,
  DelegationChain,
  Delegation,
  SignedDelegation
} from "@dfinity/identity";
import bs58 from "bs58";
import { formatSiwsMessage } from "./utils";
import type { _SERVICE as SiwsProviderService } from "../../did/ic_siws_provider";
import { idlFactory as siwsProviderIdlFactory } from "../../did/ic_siws_provider.did.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { 
  deriveAccountId, 
  fetchRootKeysIfNeeded,
  isPrincipalAnonymous,
  formatErrorMessage,
  withRetry
} from "../ic/icUtils";

// Define SIWS Provider Actor interface using generated types
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;

// Define a type that includes message signing props
type SolanaSigningAdapter = SolanaAdapter & MessageSignerWalletAdapterProps;

// Define optional callback types with wallet info
type SignatureRequiredCallback = (adapterConfig: Adapter.Config) => void;
type SignatureCompleteCallback = (adapterConfig: Adapter.Config) => void;

export interface ParsedTokenAccount {
  type: string;
  info: {
    mint: string;
    tokenAmount: {
      amount: string;
      decimals: number;
      uiAmount: number | null;
    };
  };
}

export interface TokenInfo {
  symbol: string;
  name: string;
  logoURI?: string;
  decimals: number;
  address: string;
  price?: number;
}

export interface SplTokenBalance {
  mint: string;
  amount: string;
  decimals: number;
  uiAmount: number;
  symbol?: string;
  name?: string;
  logo?: string;
  usdValue?: number;
}

export abstract class BaseSolAdapter implements Adapter.Interface {
  public walletName: string;
  public logo: string;
  public readonly id: string;
  static supportedChains: Adapter.Chain[] = [Adapter.Chain.ICP, Adapter.Chain.SOL];

  protected adapterConfig: Adapter.Config;
  protected solanaNetwork: WalletAdapterNetwork;
  protected solanaConnection: Connection;
  protected _solanaAdapter: SolanaAdapter | null = null;
  protected state: Adapter.Status = Adapter.Status.INIT;
  protected identity: Identity | null = null;
  protected principal: Principal | null = null;
  protected solanaAddress: string | null = null;
  protected tokenListCache: Record<string, TokenInfo> | null = null;
  protected tokenPricesTimestamp: number = 0;
  protected onSignatureRequired?: SignatureRequiredCallback;
  protected onSignatureComplete?: SignatureCompleteCallback;

  constructor(args: Adapter.ConstructorArgs) {
    this.adapterConfig = args.adapter;
    this.id = this.adapterConfig.id;
    this.walletName = this.adapterConfig.walletName;
    this.logo = this.adapterConfig.logo;

    this.onSignatureRequired = this.adapterConfig.config?.onSignatureRequired;
    this.onSignatureComplete = this.adapterConfig.config?.onSignatureComplete;

    this.solanaNetwork = this.adapterConfig.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    const endpoint =
      this.solanaNetwork === WalletAdapterNetwork.Mainnet
        ? "https://wiser-omniscient-thunder.solana-mainnet.quiknode.pro/c3a27d9cb72eb335a30e3407d576ef64e61b4e8d"
        : "https://api.devnet.solana.com";
    this.solanaConnection = new Connection(endpoint);

    this.state = Adapter.Status.READY;
  }

  protected abstract getSolanaAdapter(): Promise<SolanaAdapter>;
  protected abstract setupWalletListeners(): void;
  protected abstract removeWalletListeners(): void;

  protected async _getConnectedPublicKey(): Promise<PublicKey> {
    const adapter = this._solanaAdapter || await this.getSolanaAdapter();
    if (!adapter.connected || !adapter.publicKey) {
      throw new WalletNotConnectedError("Solana wallet not connected or public key unavailable.");
    }
    return adapter.publicKey;
  }

  protected async _fetchTokenPrice(tokenId: string): Promise<number | undefined> {
    return withRetry(async () => {
      const response = await fetch(`https://price.jup.ag/v4/price?ids=${tokenId}`);
      if (!response.ok) return undefined;
      const data = await response.json();
      const price = Number(data?.data?.[tokenId]?.price);
      return !isNaN(price) && price > 0 ? price : undefined;
    }).catch(error => {
      console.warn(formatErrorMessage(this.walletName, `Failed to fetch ${tokenId} price`, error));
      return undefined;
    });
  }

  protected async _processTokenAccount(item: { pubkey: PublicKey, account: any }): Promise<{ mint: string; account: any } | null> {
    return withRetry(async () => {
      const accountInfo = await this.solanaConnection.getParsedAccountInfo(item.pubkey);
      const parsedData = accountInfo.value?.data as { parsed: ParsedTokenAccount };
      if (!parsedData?.parsed || parsedData.parsed.type !== 'account' || !parsedData.parsed.info?.mint) return null;
      return { mint: parsedData.parsed.info.mint, account: item };
    }).catch(error => {
      console.warn(formatErrorMessage(this.walletName, 'Failed to process token account', error));
      return null;
    });
  }

  protected async _getTokenBalances(publicKey: PublicKey): Promise<{ solAmount: number; solUsdValue?: number; tokenAccounts: readonly any[] }> {
    const [lamports, tokenAccounts] = await Promise.all([
      this.solanaConnection.getBalance(publicKey),
      this.solanaConnection.getTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })
    ]);

    const solAmount = lamports / LAMPORTS_PER_SOL;
    const solPrice = await this._fetchTokenPrice('SOL');
    const solUsdValue = solPrice ? solAmount * solPrice : undefined;

    return { solAmount, solUsdValue, tokenAccounts: tokenAccounts.value };
  }

  protected createSiwsProviderActor(identity?: Identity): SiwsProviderActor {
    if (!this.adapterConfig.config.siwsProviderCanisterId) {
      throw new Error("SIWS provider canister ID not configured.");
    }
    const agent = HttpAgent.createSync({
      host: this.adapterConfig.config.hostUrl,
      identity: identity ?? new AnonymousIdentity(),
      verifyQuerySignatures: this.adapterConfig.config.verifyQuerySignatures,
    });
    if (this.adapterConfig.config.fetchRootKeys) {
      fetchRootKeysIfNeeded(agent, true);
    }
    return Actor.createActor<SiwsProviderService>(siwsProviderIdlFactory, {
      agent,
      canisterId: this.adapterConfig.config.siwsProviderCanisterId,
    });
  }

  protected async _signSiwsMessage(siwsMessage: any): Promise<string> {
    const messageText = formatSiwsMessage(siwsMessage);
    const messageBytes = new TextEncoder().encode(messageText);
    
    const adapter = await this.getSolanaAdapter();
    
    if (!adapter.connected || !('signMessage' in adapter)) {
      throw new WalletNotConnectedError(
        `Solana adapter '${this.walletName}' is not connected or does not support signMessage.`
      );
    }

    const signingAdapter = adapter as SolanaSigningAdapter;
    
    this.onSignatureRequired?.(this.adapterConfig);

    try {
      const signatureBytes: Uint8Array | ArrayBuffer | { signature: Uint8Array } | any = await signingAdapter.signMessage(messageBytes);

      try {
        if (typeof signatureBytes === "object" && signatureBytes !== null && "signature" in signatureBytes && signatureBytes.signature instanceof Uint8Array) {
          return bs58.encode(signatureBytes.signature);
        }
        if (signatureBytes instanceof Uint8Array) {
          return bs58.encode(signatureBytes);
        }
        if (signatureBytes instanceof ArrayBuffer) { 
          return bs58.encode(new Uint8Array(signatureBytes));
        }
        if (Array.isArray(signatureBytes) || (typeof signatureBytes === "object" && signatureBytes !== null && typeof (signatureBytes as any).length === 'number')) {
          try {
            return bs58.encode(new Uint8Array(signatureBytes as any));
          } catch (conversionError) {
            console.error(`[${this.walletName}] Failed to convert array-like signature:`, conversionError);
            throw new Error(`Failed to encode signature from ${this.walletName}: Could not convert array-like object.`);
          }
        }
  
        console.warn(`[${this.walletName}] Unexpected signature bytes type received:`, typeof signatureBytes, signatureBytes);
        throw new Error(`Failed to encode signature from ${this.walletName}: Unexpected signature format.`);
  
      } catch (e) {
        console.error(`[${this.walletName}] Error encoding signature:`, e);
        if (e instanceof Error && e.message.startsWith("Failed to encode signature")) {
          throw e;
        }
        throw new Error(`Failed to encode signature from ${this.walletName}: ${e instanceof Error ? e.message : String(e)}`);
      }
    } finally {
      this.onSignatureComplete?.(this.adapterConfig);
    }
  }

  protected async _prepareLogin(actor: SiwsProviderActor, address: string): Promise<any> {
    const prepareResult = await actor.siws_prepare_login(address);
    if ("Err" in prepareResult) {
      throw new Error(`SIWS Prepare Login failed: ${JSON.stringify(prepareResult.Err)}`);
    }
    return prepareResult.Ok;
  }

  protected _generateSessionIdentity(): { sessionIdentity: Ed25519KeyIdentity; sessionPublicKeyDer: ArrayBuffer; } {
    const sessionIdentity = Ed25519KeyIdentity.generate();
    const sessionPublicKeyDer = sessionIdentity.getPublicKey().toDer();
    return { sessionIdentity, sessionPublicKeyDer };
  }

  protected async _loginWithSiws(actor: SiwsProviderActor, signature: string, address: string, sessionPublicKeyDer: ArrayBuffer, nonce: string): Promise<any> {
    const loginResult = await actor.siws_login(
      signature,
      address,
      new Uint8Array(sessionPublicKeyDer),
      nonce
    );
    if ("Err" in loginResult) {
      throw new Error(`SIWS Login failed: ${JSON.stringify(loginResult.Err)}`);
    }
    return loginResult.Ok;
  }

  protected async _getSiwsDelegation(actor: SiwsProviderActor, address: string, sessionPublicKeyDer: ArrayBuffer, expiration: bigint): Promise<any> {
    const delegationResult = await actor.siws_get_delegation(
      address,
      new Uint8Array(sessionPublicKeyDer),
      expiration
    );
    if ("Err" in delegationResult) {
      throw new Error(`SIWS Get Delegation failed: ${JSON.stringify(delegationResult.Err)}`);
    }
    return delegationResult.Ok;
  }

  protected _createDelegationIdentity(signedDelegation: any, sessionIdentity: Ed25519KeyIdentity, userCanisterPublicKeyDer: ArrayBuffer): DelegationIdentity {
    if (!signedDelegation || typeof signedDelegation !== 'object') {
      throw new Error("SIWS Create Identity Failed: signedDelegation is missing or not an object.");
    }
    if (!signedDelegation.delegation || typeof signedDelegation.delegation !== 'object') {
      throw new Error("SIWS Create Identity Failed: signedDelegation.delegation is missing or not an object.");
    }
    if (!signedDelegation.signature) {
      throw new Error("SIWS Create Identity Failed: signedDelegation.signature is missing.");
    }
    if (!signedDelegation.delegation.pubkey || !(signedDelegation.delegation.pubkey instanceof Uint8Array)) {
      throw new Error("SIWS Create Identity Failed: signedDelegation.delegation.pubkey is missing or not a Uint8Array.");
    }
    if (!(signedDelegation.signature instanceof Uint8Array) || signedDelegation.signature.length === 0) {
      throw new Error("SIWS Create Identity Failed: signedDelegation.signature is invalid or empty.");
    }
    if (typeof signedDelegation.delegation.expiration !== 'bigint') {
      throw new Error("SIWS Create Identity Failed: signedDelegation.delegation.expiration is not a bigint.");
    }

    const delegation = new Delegation(
      signedDelegation.delegation.pubkey.slice().buffer,
      signedDelegation.delegation.expiration,
      signedDelegation.delegation.targets && Array.isArray(signedDelegation.delegation.targets) && signedDelegation.delegation.targets.length > 0
        ? signedDelegation.delegation.targets.map(p => p instanceof Uint8Array ? Principal.fromUint8Array(p) : p)
        : undefined
    );
    const delegations: SignedDelegation[] = [
      {
        delegation: delegation,
        signature: signedDelegation.signature.slice().buffer as any,
      },
    ];
    const delegationChain = DelegationChain.fromDelegations(
      delegations, 
      userCanisterPublicKeyDer
    );
    const identity = DelegationIdentity.fromDelegation(
      sessionIdentity,
      delegationChain
    );

    return identity;
  }

  protected async performSiwsLogin(address: string): Promise<{ identity: Identity; principal: Principal }> {
    const anonSiwsActor = this.createSiwsProviderActor();
    const siwsMessage = await this._prepareLogin(anonSiwsActor, address);
    const signature = await this._signSiwsMessage(siwsMessage);
    const { sessionIdentity, sessionPublicKeyDer } = this._generateSessionIdentity();
    const nonce = siwsMessage.nonce;
    const loginDetails = await this._loginWithSiws(anonSiwsActor, signature, address, sessionPublicKeyDer, nonce);
    const signedDelegation = await this._getSiwsDelegation(anonSiwsActor, address, sessionPublicKeyDer, loginDetails.expiration);
    const identity = this._createDelegationIdentity(signedDelegation, sessionIdentity, loginDetails.user_canister_pubkey.slice().buffer);
    const principal = identity.getPrincipal();

    return { identity, principal };
  }

  protected async getTokenList(): Promise<Record<string, TokenInfo>> {
    if (this.tokenListCache) {
      return this.tokenListCache;
    }
    
    try {
      const response = await fetch('https://token.jup.ag/all');
      if (!response.ok) {
        throw new Error(`Failed to fetch Jupiter token list: ${response.status}`);
      }
      const tokenList = await response.json();
      const tokenMap: Record<string, TokenInfo> = {};
      for (const token of tokenList) {
        if (token.address && token.symbol) {
          tokenMap[token.address] = {
            symbol: token.symbol,
            name: token.name || token.symbol,
            logoURI: token.logoURI,
            decimals: token.decimals || 0,
            address: token.address
          };
        }
      }
      this.tokenListCache = tokenMap;
      return tokenMap;
    } catch (error) {
      console.warn(`[${this.walletName}] Failed to fetch token list:`, error);
      return {};
    }
  }

  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal(); // Relies on getPrincipal's check
    return deriveAccountId(principal);
  }


  // Abstract methods that must be implemented by concrete adapters
  abstract isAvailable(): Promise<boolean>;
  abstract isConnected(): Promise<boolean>;
  abstract connect(): Promise<Wallet.Account>;
  abstract disconnect(): Promise<void>;
  abstract getPrincipal(): Promise<string>;
  abstract getSolanaAddress(): Promise<string>;
  abstract getAddresses(): Promise<Adapter.Addresses>;
  abstract createActor<T>(canisterId: string, idl: any, options?: { requiresSigning?: boolean, anon: true }): ActorSubclass<T>;
  abstract getSolBalance(): Promise<{ amount: number; usdValue?: number }>;
  abstract getSplTokenBalances(): Promise<SplTokenBalance[]>;
} 