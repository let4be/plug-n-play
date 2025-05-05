// Placeholder for the Solana SIWS Adapter
import { Adapter, Wallet } from "../../types/index.d";
import {
  HttpAgent,
  ActorSubclass,
  AnonymousIdentity,
  Identity,
  Actor,
} from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  WalletAdapterNetwork,
  type Adapter as SolanaAdapter,
  type MessageSignerWalletAdapterProps,
  WalletReadyState,
} from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  Ed25519KeyIdentity,
  DelegationIdentity,
  DelegationChain,
  Delegation,
} from "@dfinity/identity";
import bs58 from "bs58";
import { formatSiwsMessage } from "../../utils/solUtils";
import type { _SERVICE as SiwsProviderService } from "../../did/ic_siws_provider";
import { idlFactory as siwsProviderIdlFactory } from "../../did/ic_siws_provider.did.js";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { BaseAdapter } from "../BaseAdapter";
import { SiwsAdapterConfig } from "../../types/AdapterConfigs";
import { TokenManager, SplTokenBalance } from '../../managers/SplTokenManager';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

// Define SIWS Provider Actor interface using generated types
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;

export class SiwsAdapter extends BaseAdapter<SiwsAdapterConfig> implements Adapter.Interface {
  public walletName: string;
  public logo: string;
  public readonly id: string;
  static supportedChains: Adapter.Chain[] = [Adapter.Chain.ICP, Adapter.Chain.SOL];

  protected state: Adapter.Status = Adapter.Status.INIT;
  private solanaAdapter: Promise<SolanaAdapter> | null = null;
  private solanaConnection: Connection;
  private identity: Identity | null = null;
  private principal: Principal | null = null;
  private solanaAddress: string | null = null;
  private tokenManager: TokenManager;

  constructor(args: Adapter.ConstructorArgs & { config: SiwsAdapterConfig }) {
    super(args);
    this.id = args.adapter.id;
    this.walletName = args.adapter.walletName;
    this.logo = args.adapter.logo;
    this.config = args.config;
    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    const endpoint = network === WalletAdapterNetwork.Mainnet
      ? "https://wiser-omniscient-thunder.solana-mainnet.quiknode.pro/c3a27d9cb72eb335a30e3407d576ef64e61b4e8d"
      : "https://api.devnet.solana.com";
    this.solanaConnection = new Connection(endpoint);
    this.tokenManager = new TokenManager(this.solanaConnection);
    
    // Only initialize the adapter if we're in a browser environment
    if (isBrowser && this.id !== 'walletconnectSiws') {
      this.solanaAdapter = this.createSolanaAdapter(network);
      this.setupWalletListeners();
    }
    
    this.state = Adapter.Status.READY;
  }

  private async createSolanaAdapter(network: WalletAdapterNetwork): Promise<SolanaAdapter> {
    if (!isBrowser) {
      throw new Error("Cannot create Solana adapter in non-browser environment");
    }

    switch (this.id) {
      case "phantomSiws":
        return new PhantomWalletAdapter();
      case "solflareSiws":
        return new SolflareWalletAdapter({ network });
      case "backpackSiws":
        return new BackpackWalletAdapter();
      case "walletconnectSiws": {
        const { WalletConnectWalletAdapter } = await import('@solana/wallet-adapter-walletconnect');
        const wcAdapter = new WalletConnectWalletAdapter({
          network: network as WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet,
          options: {
            relayUrl: "wss://relay.walletconnect.com",
            projectId: this.config.projectId || "",
            metadata: {
              name: this.config.appName || "W98 dApp",
              description: this.config.appDescription || "A dApp using WalletConnect for Solana",
              url: this.config.appUrl || "https://w98.io",
              icons: this.config.appIcons || ["https://w98.io/logo.png"],
            },
          },
        });
        console.log(`[${this.walletName}] WalletConnect adapter created with config:`, wcAdapter);
        return wcAdapter;
      }
      default:
        throw new Error(`Unsupported SIWS adapter ID: ${this.id}`);
    }
  }

  private setupWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.then(adapter => {
      adapter.on("connect", this.handleSolanaConnect);
      adapter.on("disconnect", this.handleSolanaDisconnect);
      adapter.on("error", this.handleSolanaError);
    });
  }

  private removeWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.then(adapter => {
      adapter.off("connect", this.handleSolanaConnect);
      adapter.off("disconnect", this.handleSolanaDisconnect);
      adapter.off("error", this.handleSolanaError);
    });
  }

  private handleSolanaConnect = (publicKey: PublicKey): void => {
    console.log(`[${this.walletName}] Solana wallet connected:`, publicKey.toBase58());
    this.solanaAddress = publicKey.toBase58();
  };

  private handleSolanaDisconnect = (): void => {
    console.log(`[${this.walletName}] Solana wallet disconnected.`);
    if (this.state !== Adapter.Status.DISCONNECTING && this.state !== Adapter.Status.DISCONNECTED) {
      this.disconnect();
    }
  };

  private handleSolanaError = (error: any): void => {
    console.error(`[${this.walletName}] Solana wallet error:`, error);
    this.state = Adapter.Status.ERROR;
    this.disconnect();
  };

  async isConnected(): Promise<boolean> {
    if (!this.solanaAdapter) return false;
    const adapter = await this.solanaAdapter;
    return (
      adapter.connected &&
      this.identity !== null &&
      !this.identity.getPrincipal().isAnonymous()
    );
  }

  async connect(): Promise<Wallet.Account> {
    if (!isBrowser) {
      throw new Error("Cannot connect to wallet in non-browser environment");
    }

    if (!this.solanaAdapter) {
      const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
      console.log(`[${this.walletName}] Creating Solana adapter for network: ${network}`);
      this.solanaAdapter = this.createSolanaAdapter(network);
      this.setupWalletListeners();
    }

    if (this.state === Adapter.Status.CONNECTING || this.state === Adapter.Status.CONNECTED) {
      console.log(`[${this.walletName}] Already connecting or connected. State: ${this.state}`);
      if (this.principal) {
        return { owner: this.principal.toText(), subaccount: null };
      } else {
        throw new Error("Adapter is connecting, but principal not yet available.");
      }
    }
    if (this.state !== Adapter.Status.READY && this.state !== Adapter.Status.DISCONNECTED) {
      throw new Error(`Cannot connect while in state: ${this.state}`);
    }

    this.state = Adapter.Status.CONNECTING;
    console.log(`[${this.walletName}] Set state to CONNECTING`);

    try {
      const adapter = await this.solanaAdapter;
      if (!adapter) {
        throw new Error("Solana adapter not initialized");
      }

      console.log(`[${this.walletName}] Adapter obtained. Current ready state: ${adapter.readyState}`);

      if (!adapter.connected) {
        console.log(`[${this.walletName}] Adapter not connected. Attempting connection...`);
        try {
          if (this.id === 'walletconnectSiws' && adapter.readyState !== WalletReadyState.Loadable) {
            console.warn(`[${this.walletName}] WalletConnect adapter not in Loadable state (${adapter.readyState}). Waiting briefly before connecting.`);
            await new Promise(resolve => setTimeout(resolve, 200));
          }

          await adapter.connect();
          console.log(`[${this.walletName}] Wallet connection successful.`);

        } catch (error) {
          console.error(`[${this.walletName}] Wallet connection error:`, error);

          if (error.name === 'WalletWindowClosedError' || error.message?.includes('User rejected the request') || error.message?.includes('Wallet closed')) {
            console.log(`[${this.walletName}] Connection cancelled by user (modal closed or rejected).`);
            this.state = Adapter.Status.DISCONNECTED;
            const cancelError = new Error('Connection cancelled by user');
            cancelError.name = 'UserCancelledError';
            throw cancelError;
          }

          this.state = Adapter.Status.ERROR;
          if (adapter.connected) {
            try {
              await adapter.disconnect();
            } catch (disconnectError) {
              console.error(`[${this.walletName}] Error during cleanup disconnect:`, disconnectError);
            }
          }
          throw error;
        }
      } else {
        console.log(`[${this.walletName}] Adapter already connected.`);
      }

      if (!adapter.publicKey) {
        throw new Error("Solana wallet connected, but public key is unavailable.");
      }
      this.solanaAddress = adapter.publicKey.toBase58();
      console.log(`[${this.walletName}] Public key obtained:`, this.solanaAddress);

      console.log(`[${this.walletName}] Starting SIWS login...`);
      const siwsResult = await this.performSiwsLogin(this.solanaAddress);
      this.identity = siwsResult.identity;
      this.principal = siwsResult.principal;

      if (!this.principal || this.principal.isAnonymous()) {
        throw new Error("SIWS login failed: Resulted in anonymous principal.");
      }

      console.log(`[${this.walletName}] SIWS login successful. Principal: ${this.principal.toText()}`);
      this.state = Adapter.Status.CONNECTED;
      return { owner: this.principal.toText(), subaccount: null };

    } catch (error) {
      console.error(`[${this.walletName}] Overall connect process failed:`, error);

      if (error.name === 'UserCancelledError') {
        this.state = Adapter.Status.DISCONNECTED;
      } else {
        this.state = Adapter.Status.ERROR;
      }

      this.identity = null;
      this.principal = null;
      this.solanaAddress = null;

      if (this.solanaAdapter) {
        try {
          const adapter = await this.solanaAdapter;
          if (adapter && adapter.connected) {
            console.log(`[${this.walletName}] Cleaning up: disconnecting adapter.`);
            await adapter.disconnect();
          }
        } catch (cleanupError) {
          console.error(`[${this.walletName}] Error during final cleanup disconnect:`, cleanupError);
        }
      }

      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!isBrowser) return;
    if (this.state === Adapter.Status.DISCONNECTING || this.state === Adapter.Status.DISCONNECTED) {
      return;
    }
    this.state = Adapter.Status.DISCONNECTING;

    try {
      if (this.solanaAdapter) {
        const adapter = await this.solanaAdapter;
        if (adapter.connected) {
          this.removeWalletListeners();
          await adapter.disconnect();
          this.setupWalletListeners();
        }
      }
    } catch (error) {
      console.warn(`[${this.walletName}] Error during Solana disconnect:`, error);
    } finally {
      this.identity = null;
      this.principal = null;
      this.solanaAddress = null;
      this.state = Adapter.Status.DISCONNECTED;
    }
  }

  async getPrincipal(): Promise<string> {
    if (!this.principal) {
      throw new Error("Not connected or SIWS flow not completed.");
    }
    return this.principal.toText();
  }

  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    if (!principal) throw new Error("Principal not available to derive account ID");
    return AccountIdentifier.fromPrincipal({
      principal: Principal.fromText(principal),
      subAccount: undefined,
    }).toHex();
  }

  async getSolanaAddress(): Promise<string> {
    if (!this.solanaAddress) {
      throw new Error("Not connected or Solana address not available.");
    }
    return this.solanaAddress;
  }

  async getAddresses(): Promise<Adapter.Addresses> {
    return {
      sol: {
        address: this.solanaAddress,
        network: this.config.solanaNetwork,
      },
      icp: {
        address: this.principal?.toText(),
        subaccount: await this.getAccountId(),
      },
    };
  }

  protected createActorInternal<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning ?? true;
    if (requiresSigning && !this.identity) {
      throw new Error("Cannot create signed actor: Not connected or SIWS flow not completed.");
    }

    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity: this.identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });

    return Actor.createActor<T>(idl, { agent, canisterId });
  }

  async getSolBalance(): Promise<{ amount: number; usdValue?: number }> {
    if (!this.solanaAdapter) return { amount: 0, usdValue: 0 };
    const adapter = await this.solanaAdapter;
    if (!adapter.connected || !adapter.publicKey) {
      throw new Error("Solana wallet not connected or public key unavailable.");
    }
    return this.tokenManager.getSolBalance(adapter.publicKey);
  }

  async getSplTokenBalances(): Promise<SplTokenBalance[]> {
    if (!this.solanaAdapter) return [];
    const adapter = await this.solanaAdapter;
    if (!adapter.connected || !adapter.publicKey) {
      throw new Error("Solana wallet not connected or public key unavailable.");
    }
    return this.tokenManager.getSplTokenBalances(adapter.publicKey);
  }

  private createSiwsProviderActor(identity?: Identity): SiwsProviderActor {
    if (!this.config.siwsProviderCanisterId) {
      throw new Error("SIWS provider canister ID not configured.");
    }
    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity: identity ?? new AnonymousIdentity(),
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });
    return Actor.createActor<SiwsProviderService>(siwsProviderIdlFactory, {
      agent,
      canisterId: this.config.siwsProviderCanisterId,
    });
  }

  private async _prepareLogin(
    actor: SiwsProviderActor,
    address: string
  ): Promise<any> {
    console.log(`[${this.walletName}] Calling siws_prepare_login with address:`, address);
    const prepareResult = await actor.siws_prepare_login(address);
    console.log(`[${this.walletName}] Got prepare result:`, prepareResult);
    
    if ("Err" in prepareResult) {
      console.error(`[${this.walletName}] Prepare login error:`, prepareResult.Err);
      throw new Error(
        `SIWS Prepare Login failed: ${JSON.stringify(prepareResult.Err)}`
      );
    }
    return prepareResult.Ok;
  }

  private async _signSiwsMessage(siwsMessage: any): Promise<string> {
    console.log(`[${this.walletName}] Formatting SIWS message...`);
    const messageText = formatSiwsMessage(siwsMessage);
    console.log(`[${this.walletName}] Formatted message:`, messageText);
    
    const messageBytes = new TextEncoder().encode(messageText);
    console.log(`[${this.walletName}] Encoded message bytes`);

    if (!this.solanaAdapter) {
      throw new Error("Solana adapter not connected.");
    }

    const adapter = await this.solanaAdapter;
    console.log(`[${this.walletName}] Got adapter for signing`);

    if (!("signMessage" in adapter)) {
      throw new Error(
        `Connected Solana adapter '${this.walletName}' does not support signMessage.`
      );
    }

    console.log(`[${this.walletName}] Signing message...`);
    const signerAdapter = adapter as typeof adapter &
      MessageSignerWalletAdapterProps<string>;
    const signatureBytes = await signerAdapter.signMessage(messageBytes);
    console.log(`[${this.walletName}] Got signature bytes:`, signatureBytes);

    try {
      if (
        typeof signatureBytes === "object" &&
        "signature" in signatureBytes &&
        signatureBytes.signature instanceof Uint8Array
      ) {
        return bs58.encode(signatureBytes.signature);
      }

      if (signatureBytes instanceof Uint8Array) {
        return bs58.encode(signatureBytes);
      }

      if ((signatureBytes as any) instanceof ArrayBuffer) {
        return bs58.encode(new Uint8Array(signatureBytes as any));
      }

      if (
        Array.isArray(signatureBytes) ||
        (typeof signatureBytes === "object" && "length" in signatureBytes)
      ) {
        return bs58.encode(new Uint8Array(signatureBytes as any));
      }

      console.warn(
        `[${this.walletName}] Unexpected signature bytes type:`,
        typeof signatureBytes,
        signatureBytes
      );

      const fallbackArray = Object.values(signatureBytes as any).map((val) =>
        Number(val)
      );
      return bs58.encode(Uint8Array.from(fallbackArray));
    } catch (e) {
      console.error(`[${this.walletName}] Error encoding signature:`, e);
      throw new Error(
        `Failed to encode signature from ${this.walletName}: ${e.message}`
      );
    }
  }

  private _generateSessionIdentity(): {
    sessionIdentity: Ed25519KeyIdentity;
    sessionPublicKeyDer: ArrayBuffer;
  } {
    const sessionIdentity = Ed25519KeyIdentity.generate();
    const sessionPublicKeyDer = sessionIdentity.getPublicKey().toDer();
    return { sessionIdentity, sessionPublicKeyDer };
  }

  private async _loginWithSiws(
    actor: SiwsProviderActor,
    signature: string,
    address: string,
    sessionPublicKeyDer: ArrayBuffer,
    siwsMessage: any
  ): Promise<any> {
    const loginResult = await actor.siws_login(
      signature,
      address,
      new Uint8Array(sessionPublicKeyDer),
      siwsMessage.nonce
    );
    if ("Err" in loginResult)
      throw new Error(`SIWS Login failed: ${JSON.stringify(loginResult.Err)}`);
    return loginResult.Ok;
  }

  private async _getSiwsDelegation(
    actor: SiwsProviderActor,
    address: string,
    sessionPublicKeyDer: ArrayBuffer,
    expiration: bigint
  ): Promise<any> {
    const delegationResult = await actor.siws_get_delegation(
      address,
      new Uint8Array(sessionPublicKeyDer),
      expiration
    );
    if ("Err" in delegationResult)
      throw new Error(
        `SIWS Get Delegation failed: ${JSON.stringify(delegationResult.Err)}`
      );
    return delegationResult.Ok;
  }

  private _createDelegationIdentity(
    signedDelegation: any,
    sessionIdentity: Ed25519KeyIdentity,
    userCanisterPublicKeyDer: ArrayBuffer
  ): DelegationIdentity {
    const delegation = new Delegation(
      signedDelegation.delegation.pubkey.slice().buffer,
      signedDelegation.delegation.expiration,
      signedDelegation.delegation.targets.length > 0
        ? signedDelegation.delegation.targets[0]
        : undefined
    );

    const delegations = [
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

  private async performSiwsLogin(
    address: string
  ): Promise<{ identity: Identity; principal: Principal }> {
    console.log(`[${this.walletName}] Starting SIWS login flow for address:`, address);
    
    const anonSiwsActor = this.createSiwsProviderActor();
    console.log(`[${this.walletName}] Created anonymous SIWS actor`);

    console.log(`[${this.walletName}] Preparing login...`);
    const siwsMessage = await this._prepareLogin(anonSiwsActor, address);
    console.log(`[${this.walletName}] Got SIWS message:`, siwsMessage);

    console.log(`[${this.walletName}] Signing message...`);
    const signature = await this._signSiwsMessage(siwsMessage);
    console.log(`[${this.walletName}] Got signature`);

    console.log(`[${this.walletName}] Generating session identity...`);
    const { sessionIdentity, sessionPublicKeyDer } = this._generateSessionIdentity();
    console.log(`[${this.walletName}] Generated session identity`);

    console.log(`[${this.walletName}] Logging in with SIWS...`);
    const loginDetails = await this._loginWithSiws(
      anonSiwsActor,
      signature,
      address,
      sessionPublicKeyDer,
      siwsMessage
    );
    console.log(`[${this.walletName}] Login successful, got details:`, loginDetails);

    console.log(`[${this.walletName}] Getting delegation...`);
    const signedDelegation = await this._getSiwsDelegation(
      anonSiwsActor,
      address,
      sessionPublicKeyDer,
      loginDetails.expiration
    );
    console.log(`[${this.walletName}] Got delegation`);

    console.log(`[${this.walletName}] Creating delegation identity...`);
    const identity = this._createDelegationIdentity(
      signedDelegation,
      sessionIdentity,
      loginDetails.user_canister_pubkey.slice().buffer
    );
    const principal = identity.getPrincipal();
    console.log(`[${this.walletName}] Created identity with principal:`, principal.toText());

    return { identity, principal };
  }
}
