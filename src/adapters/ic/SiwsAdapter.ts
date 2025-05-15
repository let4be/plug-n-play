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
import { formatSiwsMessage } from "../../utils/utils";
import type { _SERVICE as SiwsProviderService } from "../../did/ic_siws_provider";
import { idlFactory as siwsProviderIdlFactory } from "../../did/ic_siws_provider.did.js";
import { BaseAdapter } from "../BaseAdapter";
import { SiwsAdapterConfig } from "../../types/AdapterConfigs";
import { TokenManager, SplTokenBalance } from "../../managers/SplTokenManager";
import { deriveAccountId } from "../../utils/icUtils";
import { 
  IdbStorage, 
  getDelegationChain, 
  setDelegationChain, 
  removeDelegationChain,
  getIdentity,
  setIdentity,
  removeIdentity
} from "@slide-computer/signer-storage";

// Check if we're in a browser environment
const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

// Define SIWS Provider Actor interface using generated types
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;

export class SiwsAdapter
  extends BaseAdapter<SiwsAdapterConfig>
  implements Adapter.Interface
{
  public walletName: string;
  public logo: string;
  public readonly id: string;
  static supportedChains: Adapter.Chain[] = [
    Adapter.Chain.ICP,
    Adapter.Chain.SOL,
  ];

  protected state: Adapter.Status = Adapter.Status.INIT;
  private solanaAdapter: Promise<SolanaAdapter> | null = null;
  private solanaConnection: Connection;
  private identity: Identity | null = null;
  private principal: Principal | null = null;
  private solanaAddress: string | null = null;
  private tokenManager: TokenManager;
  private storage: IdbStorage;
  private sessionKey: Ed25519KeyIdentity | null = null;

  constructor(args: Adapter.ConstructorArgs & { config: SiwsAdapterConfig }) {
    super(args);
    this.id = args.adapter.id;
    this.walletName = args.adapter.walletName;
    this.logo = args.adapter.logo;
    this.config = args.config;
    this.storage = new IdbStorage();
    
    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    const endpoint =
      network === WalletAdapterNetwork.Mainnet
        ? "https://wiser-omniscient-thunder.solana-mainnet.quiknode.pro/c3a27d9cb72eb335a30e3407d576ef64e61b4e8d"
        : "https://api.devnet.solana.com";
    this.solanaConnection = new Connection(endpoint);
    this.tokenManager = new TokenManager(this.solanaConnection);

    // Only initialize the adapter if we're in a browser environment
    if (isBrowser && this.id !== "walletconnectSiws") {
      this.solanaAdapter = this.createSolanaAdapter(network);
      this.setupWalletListeners();
    }

    this.state = Adapter.Status.READY;

    // Attempt to restore from storage
    this.restoreFromStorage().catch(error => {
      this.logger.debug("Failed to restore from storage:", error);
    });
  }

  private async restoreFromStorage(): Promise<void> {
    try {
      this.logger.debug(`[${this.id}] Attempting to restore from storage...`);
      // Explicitly type assertion as we expect Ed25519 for SIWS
      const storedSessionKey = await getIdentity(this.id, this.storage) as Ed25519KeyIdentity | undefined;
      const delegationChain = await getDelegationChain(this.id, this.storage);
      const storedSolanaAddress = await this.storage.get(`${this.id}-solana-address`);

      if (!storedSessionKey || !delegationChain) {
        this.logger.debug(`[${this.id}] No session key or delegation chain found in storage.`);
        await this.clearStoredSession();
        return;
      }

      // Check if delegation is still valid
      const expiration = delegationChain.delegations[0].delegation.expiration;
      if (expiration < BigInt(Date.now() * 1_000_000)) {
        this.logger.debug(`[${this.id}] Stored delegation chain has expired.`);
        await this.clearStoredSession();
        return;
      }

      this.logger.debug(`[${this.id}] Found valid session key and delegation chain, restoring...`);
      
      this.sessionKey = storedSessionKey;

      this.identity = DelegationIdentity.fromDelegation(
        this.sessionKey,
        delegationChain
      );

      this.principal = this.identity.getPrincipal();

      if (storedSolanaAddress && typeof storedSolanaAddress === 'string') {
        this.solanaAddress = storedSolanaAddress;
      } else {
        // If solana address is missing, something is inconsistent. Clear session.
        this.logger.warn(`[${this.id}] Solana address missing from storage during restore. Clearing session.`);
        await this.clearStoredSession();
        return;
      }
      
      this.logger.debug(`[${this.id}] Successfully restored connection.`);
      this.state = Adapter.Status.CONNECTED;
    } catch (error) {
      this.logger.error(`[${this.id}] Error restoring from storage:`, error);
      await this.clearStoredSession();
    }
  }

  private async clearStoredSession(): Promise<void> {
    this.identity = null;
    this.principal = null;
    this.solanaAddress = null;
    this.sessionKey = null;
    await removeIdentity(this.id, this.storage);
    await removeDelegationChain(this.id, this.storage);
    await this.storage.remove(`${this.id}-solana-address`);
    this.state = Adapter.Status.READY; // Or DISCONNECTED if appropriate
     this.logger.debug(`[${this.id}] Cleared stored session data.`);
  }

  private async createSolanaAdapter(
    network: WalletAdapterNetwork,
  ): Promise<SolanaAdapter> {
    if (!isBrowser) {
      throw new Error(
        "Cannot create Solana adapter in non-browser environment",
      );
    }

    switch (this.id) {
      case "phantomSiws":
        return new PhantomWalletAdapter();
      case "solflareSiws":
        return new SolflareWalletAdapter({ network });
      case "backpackSiws":
        return new BackpackWalletAdapter();
      case "walletconnectSiws": {
        const { WalletConnectWalletAdapter } = await import(
          "@solana/wallet-adapter-walletconnect"
        );
        const wcAdapter = new WalletConnectWalletAdapter({
          network: network as
            | WalletAdapterNetwork.Mainnet
            | WalletAdapterNetwork.Devnet,
          options: {
            relayUrl: "wss://relay.walletconnect.com",
            projectId: this.config.projectId || "",
            metadata: {
              name: this.config.appName || "W98 dApp",
              description:
                this.config.appDescription ||
                "A dApp using WalletConnect for Solana",
              url: this.config.appUrl || "https://w98.io",
              icons: this.config.appIcons || ["https://w98.io/logo.png"],
            },
          },
        });
        this.logger.debug(
          `WalletConnect adapter created with config:`,
          wcAdapter,
        );
        return wcAdapter;
      }
      default:
        throw new Error(`Unsupported SIWS adapter ID: ${this.id}`);
    }
  }

  private setupWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.then((adapter) => {
      adapter.on("connect", this.handleSolanaConnect);
      adapter.on("disconnect", this.handleSolanaDisconnect);
      adapter.on("error", this.handleSolanaError);
    });
  }

  private removeWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.then((adapter) => {
      adapter.off("connect", this.handleSolanaConnect);
      adapter.off("disconnect", this.handleSolanaDisconnect);
      adapter.off("error", this.handleSolanaError);
    });
  }

  private handleSolanaConnect = (publicKey: PublicKey): void => {
    this.solanaAddress = publicKey.toBase58();
  };

  private handleSolanaDisconnect = (): void => {
    if (
      this.state !== Adapter.Status.DISCONNECTING &&
      this.state !== Adapter.Status.DISCONNECTED
    ) {
      this.disconnect();
    }
  };

  private handleSolanaError = (error: any): void => {
    this.logger.error(`Solana wallet error`, error, {
      wallet: this.walletName,
    });
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

    // If we're already connected, return the current account
    if (this.identity && this.principal && this.state === Adapter.Status.CONNECTED) {
      return {
        owner: this.principal.toText(),
        subaccount: deriveAccountId(this.principal),
      };
    }

    // Try to restore from storage first
    if (!this.identity) {
      try {
        await this.restoreFromStorage();
        if (this.identity && this.principal && this.state === Adapter.Status.CONNECTED) {
          return {
            owner: this.principal.toText(),
            subaccount: deriveAccountId(this.principal),
          };
        }
      } catch (error) {
        this.logger.debug(`[${this.id}] Failed to restore from storage during connect attempt:`, error);
        // Ensure partial state is cleared if restore fails mid-connect
        await this.clearStoredSession();
      }
    }
    
    // If after attempting restore, we are now connected, return.
    if (this.identity && this.principal && this.state === Adapter.Status.CONNECTED) {
      return {
        owner: this.principal.toText(),
        subaccount: deriveAccountId(this.principal),
      };
    }


    if (!this.solanaAdapter) {
      const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
      this.logger.debug(`Creating Solana adapter for network: ${network}`, {
        wallet: this.walletName,
      });
      this.solanaAdapter = this.createSolanaAdapter(network);
      this.setupWalletListeners();
    }

    if (
      this.state === Adapter.Status.CONNECTING // Already connecting, avoid race conditions
    ) {
       this.logger.warn(`[${this.id}] Connect called while already connecting. Waiting for existing attempt.`);
       // Potentially return a promise that resolves with the ongoing connection result
       // For now, let it fall through, but this might need robust handling for concurrent calls
       // For simplicity, we'll assume connect isn't called concurrently in a problematic way.
       // Or throw: throw new Error("Adapter is already in the process of connecting.");
    }
    
    // Reset state if it was e.g. ERROR
    // Allow connect from READY, INIT, or DISCONNECTED
    if (this.state !== Adapter.Status.READY && 
        this.state !== Adapter.Status.INIT && 
        this.state !== Adapter.Status.DISCONNECTED) {
        // If in an unexpected state like CONNECTING or ERROR, reset to READY before proceeding
        // Or potentially throw, depending on desired handling of odd states.
        this.logger.warn(`[${this.id}] Connect called from unexpected state ${this.state}. Resetting to READY.`);
        this.state = Adapter.Status.READY;
    }

    // Check again if we can connect (covers states like CONNECTING)
    if (this.state !== Adapter.Status.READY &&
        this.state !== Adapter.Status.DISCONNECTED &&
        this.state !== Adapter.Status.INIT
    ) {
      throw new Error(`Cannot connect while in state: ${this.state}`);
    }

    this.state = Adapter.Status.CONNECTING;

    try {
      const adapter = await this.solanaAdapter;
      if (!adapter) {
        throw new Error("Solana adapter not initialized");
      }

      if (!adapter.connected) {
        try {
          if (
            this.id === "walletconnectSiws" &&
            adapter.readyState !== WalletReadyState.Loadable
          ) {
            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          await adapter.connect();
        } catch (error) {
          this.logger.error(`Wallet connection error`, error as Error, {
            wallet: this.walletName,
          });

          if (
            error.name === "WalletWindowClosedError" ||
            error.message?.includes("User rejected the request") ||
            error.message?.includes("Wallet closed")
          ) {
            this.logger.warn(
              `Connection cancelled by user (modal closed or rejected).`,
              { wallet: this.walletName },
            );
            this.state = Adapter.Status.DISCONNECTED;
            const cancelError = new Error("Connection cancelled by user");
            cancelError.name = "UserCancelledError";
            throw cancelError;
          }

          this.state = Adapter.Status.ERROR;
          if (adapter.connected) {
            try {
              await adapter.disconnect();
            } catch (disconnectError) {
              this.logger.error(
                `Error during cleanup disconnect`,
                disconnectError as Error,
                { wallet: this.walletName },
              );
            }
          }
          throw error;
        }
      } else {
        this.logger.debug(`Adapter already connected.`, {
          wallet: this.walletName,
        });
      }

      if (!adapter.publicKey) {
        throw new Error(
          "Solana wallet connected, but public key is unavailable.",
        );
      }
      this.solanaAddress = adapter.publicKey.toBase58();
      
      // Store Solana address
      await this.storage.set(`${this.id}-solana-address`, this.solanaAddress);

      const siwsResult = await this.performSiwsLogin(this.solanaAddress);
      this.identity = siwsResult.identity;
      this.principal = siwsResult.principal;
      this.sessionKey = siwsResult.sessionKey; // Capture the sessionKey

      // Store the session key and delegation chain
      if (this.sessionKey) {
        await setIdentity(this.id, this.sessionKey, this.storage);
      }
      if (this.identity instanceof DelegationIdentity) {
        await setDelegationChain(this.id, this.identity.getDelegation(), this.storage);
      } else {
         this.logger.warn(`[${this.id}] SIWS login did not result in a DelegationIdentity. Cannot store delegation chain.`);
         // This case should ideally not happen if SIWS is successful
      }


      if (!this.principal || this.principal.isAnonymous()) {
        await this.clearStoredSession(); // Clear any partial data
        throw new Error("SIWS login failed: Resulted in anonymous principal.");
      }
      
      this.logger.debug(`[${this.id}] Successfully connected and session stored.`);
      this.state = Adapter.Status.CONNECTED;
      return {
        owner: this.principal.toText(),
        subaccount: deriveAccountId(this.principal),
      };
    } catch (error) {
      this.logger.error(`Overall connect process failed`, error as Error, {
        wallet: this.walletName,
      });
      
      await this.clearStoredSession(); // Ensure cleanup on any connect error

      if (error.name === "UserCancelledError") {
        this.state = Adapter.Status.DISCONNECTED;
      } else {
        this.state = Adapter.Status.ERROR;
      }

      // No need to set identity/principal to null here, clearStoredSession does it.

      if (this.solanaAdapter) {
        try {
          const adapter = await this.solanaAdapter;
          if (adapter && adapter.connected) {
            // Don't disconnect if the error was UserCancelled, as it might already be handled by the wallet adapter
            if (error.name !== "UserCancelledError") {
                 await adapter.disconnect();
            }
          }
        } catch (cleanupError) {
          this.logger.error(
            `Error during final cleanup disconnect`,
            cleanupError as Error,
            { wallet: this.walletName },
          );
        }
      }

      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!isBrowser) return;
    if (
      this.state === Adapter.Status.DISCONNECTING ||
      this.state === Adapter.Status.DISCONNECTED
    ) {
      return;
    }
    this.logger.debug(`[${this.id}] Disconnecting...`);
    this.state = Adapter.Status.DISCONNECTING;

    try {
      if (this.solanaAdapter) {
        const adapter = await this.solanaAdapter;
        if (adapter.connected) {
          this.removeWalletListeners(); // Remove listeners before disconnect
          await adapter.disconnect();
          this.setupWalletListeners(); // Re-attach listeners if adapter might be reused
        }
      }
    } catch (error) {
      this.logger.warn(`Error during Solana disconnect`, {
        error,
        wallet: this.walletName,
      });
    } finally {
      await this.clearStoredSession();
      this.state = Adapter.Status.DISCONNECTED;
      this.logger.debug(`[${this.id}] Disconnected and session cleared.`);
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
    if (!principal)
      throw new Error("Principal not available to derive account ID");
    return deriveAccountId(principal);
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
        subaccount: deriveAccountId(this.principal),
      },
    };
  }

  protected createActorInternal<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean },
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning ?? true;
    if (requiresSigning && !this.identity) {
      throw new Error(
        "Cannot create signed actor: Not connected or SIWS flow not completed.",
      );
    }

    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity: this.identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });

    if (this.config.fetchRootKey) {
      agent.fetchRootKey();
    }

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
    if (this.config.fetchRootKey) {
      agent.fetchRootKey();
    }
    return Actor.createActor<SiwsProviderService>(siwsProviderIdlFactory, {
      agent,
      canisterId: this.config.siwsProviderCanisterId,
    });
  }

  private async _prepareLogin(
    actor: SiwsProviderActor,
    address: string,
  ): Promise<any> {
    const prepareResult = await actor.siws_prepare_login(address);

    if ("Err" in prepareResult) {
      const errorMsg = `Prepare login error: ${JSON.stringify(prepareResult.Err)}`;
      this.logger.error(errorMsg, new Error(errorMsg));
      throw new Error(
        `SIWS Prepare Login failed: ${JSON.stringify(prepareResult.Err)}`,
      );
    }
    return prepareResult.Ok;
  }

  private async _signSiwsMessage(siwsMessage: any): Promise<string> {
    const messageText = formatSiwsMessage(siwsMessage);
    const messageBytes = new TextEncoder().encode(messageText);

    if (!this.solanaAdapter) {
      throw new Error("Solana adapter not connected.");
    }

    const adapter = await this.solanaAdapter;

    if (!("signMessage" in adapter)) {
      throw new Error(
        `Connected Solana adapter '${this.walletName}' does not support signMessage.`,
      );
    }

    const signerAdapter = adapter as typeof adapter &
      MessageSignerWalletAdapterProps<string>;
    const signatureBytes = await signerAdapter.signMessage(messageBytes);

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

      this.logger.warn(
        `Unexpected signature bytes type: ${typeof signatureBytes}`,
        { signatureBytes, wallet: this.walletName },
      );

      const fallbackArray = Object.values(signatureBytes as any).map((val) =>
        Number(val),
      );
      return bs58.encode(Uint8Array.from(fallbackArray));
    } catch (e) {
      this.logger.error(`Error encoding signature`, e as Error, {
        wallet: this.walletName,
      });
      throw new Error(
        `Failed to encode signature from ${this.walletName}: ${e.message}`,
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
    siwsMessage: any,
  ): Promise<any> {
    const loginResult = await actor.siws_login(
      signature,
      address,
      new Uint8Array(sessionPublicKeyDer),
      siwsMessage.nonce,
    );
    if ("Err" in loginResult) {
      const errorMsg = `SIWS Login failed: ${JSON.stringify(loginResult.Err)}`;
      this.logger.error(errorMsg, new Error(errorMsg));
      throw new Error(errorMsg);
    }
    return loginResult.Ok;
  }

  private async _getSiwsDelegation(
    actor: SiwsProviderActor,
    address: string,
    sessionPublicKeyDer: ArrayBuffer,
    expiration: bigint,
  ): Promise<any> {
    const delegationResult = await actor.siws_get_delegation(
      address,
      new Uint8Array(sessionPublicKeyDer),
      expiration,
    );
    if ("Err" in delegationResult) {
      const errorMsg = `SIWS Get Delegation failed: ${JSON.stringify(delegationResult.Err)}`;
      this.logger.error(errorMsg, new Error(errorMsg));
      throw new Error(errorMsg);
    }
    return delegationResult.Ok;
  }

  private _createDelegationIdentity(
    signedDelegation: any,
    sessionIdentity: Ed25519KeyIdentity,
    userCanisterPublicKeyDer: ArrayBuffer,
  ): DelegationIdentity {
    const delegation = new Delegation(
      signedDelegation.delegation.pubkey.slice().buffer,
      signedDelegation.delegation.expiration,
      signedDelegation.delegation.targets.length > 0
        ? signedDelegation.delegation.targets[0]
        : undefined,
    );

    const delegations = [
      {
        delegation: delegation,
        signature: signedDelegation.signature.slice().buffer as any,
      },
    ];

    const delegationChain = DelegationChain.fromDelegations(
      delegations,
      userCanisterPublicKeyDer,
    );

    const identity = DelegationIdentity.fromDelegation(
      sessionIdentity,
      delegationChain,
    );

    return identity;
  }

  private async performSiwsLogin(
    address: string,
  ): Promise<{ identity: Identity; principal: Principal; sessionKey: Ed25519KeyIdentity }> {
    const anonSiwsActor = this.createSiwsProviderActor();
    const siwsMessage = await this._prepareLogin(anonSiwsActor, address);
    const signature = await this._signSiwsMessage(siwsMessage);
    
    // sessionIdentity here is the specific Ed25519KeyIdentity for this session
    const { sessionIdentity, sessionPublicKeyDer } = 
      this._generateSessionIdentity(); 
      
    const loginDetails = await this._loginWithSiws(
      anonSiwsActor,
      signature,
      address,
      sessionPublicKeyDer,
      siwsMessage,
    );

    const signedDelegation = await this._getSiwsDelegation(
      anonSiwsActor,
      address,
      sessionPublicKeyDer,
      loginDetails.expiration,
    );

    // This is the DelegationIdentity
    const delegationIdentity = this._createDelegationIdentity(
      signedDelegation,
      sessionIdentity, // Pass the Ed25519KeyIdentity here
      loginDetails.user_canister_pubkey.slice().buffer,
    );
    const principal = delegationIdentity.getPrincipal();

    return { identity: delegationIdentity, principal, sessionKey: sessionIdentity };
  }
}
