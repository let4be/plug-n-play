// Placeholder for the Solana SIWS Adapter
import { Adapter, Wallet } from "../../types/index.d";
import { HttpAgent, ActorSubclass, AnonymousIdentity, Identity, Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { 
    WalletAdapterNetwork,
    WalletReadyState,
    type Adapter as SolanaAdapter,
    type MessageSignerWalletAdapterProps,
} from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { Connection, type PublicKey as SolanaPublicKey } from "@solana/web3.js";
import { 
    Ed25519KeyIdentity,
    DelegationIdentity,
    DelegationChain,
    Delegation,
} from "@dfinity/identity";
import bs58 from "bs58";
import { formatSiwsMessage } from "./utils";
import type { _SERVICE as SiwsProviderService } from '../../did/ic_siws_provider';
import { idlFactory as siwsProviderIdlFactory } from '../../did/ic_siws_provider.did.js';

// Define SIWS Provider Actor interface using generated types
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;

// Define the shape of the config object the adapter expects
// This combines global PNPConfig and specific adapter config
type SolSiwsAdapterConfig = Wallet.PNPConfig & Adapter.Info['config'];

export class SolSiwsAdapter implements Adapter.Interface {
    public walletName: string;
    public logo: string;
    public readonly id: string;

    private config: SolSiwsAdapterConfig;
    private state: Adapter.Status = Adapter.Status.INIT;
    private solanaAdapter: SolanaAdapter;
    private solanaConnection: Connection;
    private identity: Identity | null = null; // Holds the DelegationIdentity after SIWS flow
    private principal: Principal | null = null;
    private solanaAddress: string | null = null;

    constructor(adapterInfo: Adapter.Info, pnpConfig: Wallet.PNPConfig) {
        this.id = adapterInfo.id;
        this.walletName = adapterInfo.walletName;
        this.logo = adapterInfo.logo;
        
        // Merge global and adapter-specific configs
        this.config = { 
            ...pnpConfig, 
            ...adapterInfo.config 
        };

        const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
        const endpoint = network === WalletAdapterNetwork.Mainnet
            ? "https://api.mainnet-beta.solana.com" // Replace with preferred mainnet endpoint if needed
            : "https://api.devnet.solana.com";
        this.solanaConnection = new Connection(endpoint);

        // Instantiate the correct Solana adapter based on the ID
        if (this.id === 'phantomSiws') {
            this.solanaAdapter = new PhantomWalletAdapter();
        } else if (this.id === 'solflareSiws') {
            this.solanaAdapter = new SolflareWalletAdapter({ network });
        } else if (this.id === 'backpackSiws') {
            this.solanaAdapter = new BackpackWalletAdapter();
        } else {
            throw new Error(`Unsupported SIWS adapter ID: ${this.id}. Expected 'phantomSiws', 'solflareSiws', or 'backpackSiws'.`);
        }

        this.setupWalletListeners();
        this.state = Adapter.Status.READY;
    }

    private setupWalletListeners(): void {
        this.solanaAdapter.on('connect', this.handleSolanaConnect);
        this.solanaAdapter.on('disconnect', this.handleSolanaDisconnect);
        this.solanaAdapter.on('error', this.handleSolanaError);
    }

    private removeWalletListeners(): void {
        this.solanaAdapter.off('connect', this.handleSolanaConnect);
        this.solanaAdapter.off('disconnect', this.handleSolanaDisconnect);
        this.solanaAdapter.off('error', this.handleSolanaError);
    }

    // Bound event handlers to maintain `this` context
    private handleSolanaConnect = (publicKey: SolanaPublicKey): void => {
        console.log(`[${this.walletName}] Solana wallet connected:`, publicKey.toBase58());
        this.solanaAddress = publicKey.toBase58();
        // Connection established, SIWS flow will happen in `connect` method
    };

    private handleSolanaDisconnect = (): void => {
        console.log(`[${this.walletName}] Solana wallet disconnected.`);
        // If the wallet disconnects externally, trigger a full disconnect/cleanup
        if (this.state !== Adapter.Status.DISCONNECTING && this.state !== Adapter.Status.DISCONNECTED) {
            this.disconnect(); 
        }
    };

    private handleSolanaError = (error: any): void => {
        console.error(`[${this.walletName}] Solana wallet error:`, error);
        this.state = Adapter.Status.ERROR;
        // Optionally trigger disconnect on error
        this.disconnect();
    };

    // --- Adapter.Interface Implementation ---

    async isAvailable(): Promise<boolean> {
        // Check if the selected Solana adapter is ready
        return this.solanaAdapter.readyState === WalletReadyState.Installed || this.solanaAdapter.readyState === WalletReadyState.Loadable;
    }

    async isConnected(): Promise<boolean> {
        // Check both Solana wallet connection and successful SIWS delegation
        return this.solanaAdapter.connected && this.identity !== null && !this.identity.getPrincipal().isAnonymous();
    }

    async connect(): Promise<Wallet.Account> {
        if (this.state === Adapter.Status.CONNECTING || this.state === Adapter.Status.CONNECTED) {
            // Already connecting or connected
            return { owner: this.principal, subaccount: null }; 
        }
        if (this.state !== Adapter.Status.READY && this.state !== Adapter.Status.DISCONNECTED) {
             throw new Error(`Cannot connect while in state: ${this.state}`);
        }

        this.state = Adapter.Status.CONNECTING;

        try {
            // 1. Ensure Solana Wallet is Connected
            if (!this.solanaAdapter.connected) {
                console.log(`[${this.walletName}] Connecting Solana wallet...`);
                await this.solanaAdapter.connect(); // This triggers the 'connect' listener if successful
            }
            // Ensure address is set (might happen via listener or if already connected)
            if (!this.solanaAdapter.publicKey) {
                 throw new Error("Solana wallet connected but public key not available.");
            }
            this.solanaAddress = this.solanaAdapter.publicKey.toBase58();
            console.log(`[${this.walletName}] Using Solana address:`, this.solanaAddress);

            // 2. Perform SIWS Flow
            console.log(`[${this.walletName}] Starting SIWS flow...`);
            const siwsResult = await this.performSiwsLogin(this.solanaAddress);
            this.identity = siwsResult.identity;
            this.principal = siwsResult.principal;

            if (!this.principal || this.principal.isAnonymous()) {
                throw new Error("SIWS flow completed but resulted in an anonymous principal.");
            }

            this.state = Adapter.Status.CONNECTED;
            console.log(`[${this.walletName}] SIWS Connect successful. Principal: ${this.principal.toText()}`);

            // Return the IC account details
            return { owner: this.principal, subaccount: null }; // SIWS typically doesn't involve subaccounts

        } catch (error) {
            console.error(`[${this.walletName}] Connect failed:`, error);
            this.state = Adapter.Status.ERROR;
            await this.disconnect(); // Attempt cleanup on failure
            throw error; // Re-throw the error for PNP core to handle
        }
    }

    async disconnect(): Promise<void> {
        if (this.state === Adapter.Status.DISCONNECTING || this.state === Adapter.Status.DISCONNECTED) {
            return;
        }
        const previousState = this.state;
        this.state = Adapter.Status.DISCONNECTING;
        console.log(`[${this.walletName}] Disconnecting...`);

        try {
            // Disconnect Solana wallet if connected
            if (this.solanaAdapter.connected) {
                // Temporarily remove listener to prevent disconnect loop if disconnect() triggers event
                this.removeWalletListeners(); 
                await this.solanaAdapter.disconnect();
                this.setupWalletListeners(); // Re-attach listeners
            }
        } catch (error) {
            console.warn(`[${this.walletName}] Error during Solana disconnect:`, error);
            // Continue cleanup even if Solana disconnect fails
        } finally {
            // Clear internal state
            this.identity = null;
            this.principal = null;
            this.solanaAddress = null;
            // Clear localStorage persistence (assuming PNP core handles this based on activeWallet)
            this.state = Adapter.Status.DISCONNECTED;
            console.log(`[${this.walletName}] Disconnected.`);
        }
    }

    async getPrincipal(): Promise<Principal> {
        if (!this.principal) {
            throw new Error("Not connected or SIWS flow not completed.");
        }
        return this.principal;
    }

    async getAccountId(): Promise<string> {
        // For SIWS, the primary identifier is the Solana address
        if (!this.solanaAddress) {
            throw new Error("Not connected or Solana address not available.");
        }
        return this.solanaAddress;
    }

    createActor<T>(
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
            identity: options?.requiresSigning ? this.identity : new AnonymousIdentity(),
            verifyQuerySignatures: this.config.verifyQuerySignatures,
         });

        return Actor.createActor<T>(idl, { agent, canisterId });
    }

    // --- SIWS Specific Methods ---

    private createSiwsProviderActor(identity?: Identity): SiwsProviderActor {
        console.log("Creating SIWS provider actor with canister ID:", this.config);
         if (!this.config.siwsProviderCanisterId) {
            throw new Error("SIWS provider canister ID not configured.");
        }
        const agent = HttpAgent.createSync({ 
            host: this.config.hostUrl, 
            identity: identity ?? new AnonymousIdentity(), // Use provided identity or anonymous
            verifyQuerySignatures: this.config.verifyQuerySignatures 
        });
        return Actor.createActor<SiwsProviderService>(siwsProviderIdlFactory, { 
            agent, 
            canisterId: this.config.siwsProviderCanisterId 
        });
    }

    private async _prepareLogin(actor: SiwsProviderActor, address: string): Promise<any> {
        const prepareResult = await actor.siws_prepare_login(address);
        if ('Err' in prepareResult) throw new Error(`SIWS Prepare Login failed: ${JSON.stringify(prepareResult.Err)}`);
        return prepareResult.Ok;
    }

    private async _signSiwsMessage(siwsMessage: any): Promise<string> {
        const messageText = formatSiwsMessage(siwsMessage);
        const messageBytes = new TextEncoder().encode(messageText);

        if (!('signMessage' in this.solanaAdapter)) {
             throw new Error(`Connected Solana adapter '${this.walletName}' does not support signMessage.`);
        }

        const signerAdapter = this.solanaAdapter as typeof this.solanaAdapter & MessageSignerWalletAdapterProps<string>;
        const signatureBytes = await signerAdapter.signMessage(messageBytes);
        return bs58.encode(signatureBytes);
    }

    private _generateSessionIdentity(): { sessionIdentity: Ed25519KeyIdentity, sessionPublicKeyDer: ArrayBuffer } {
        const sessionIdentity = Ed25519KeyIdentity.generate();
        const sessionPublicKeyDer = sessionIdentity.getPublicKey().toDer();
        return { sessionIdentity, sessionPublicKeyDer };
    }

    private async _loginWithSiws(
        actor: SiwsProviderActor, 
        signature: string, 
        address: string, 
        sessionPublicKeyDer: ArrayBuffer
    ): Promise<any> {
        const loginResult = await actor.siws_login(signature, address, new Uint8Array(sessionPublicKeyDer));
        if ('Err' in loginResult) throw new Error(`SIWS Login failed: ${JSON.stringify(loginResult.Err)}`);
        return loginResult.Ok;
    }
    
    private async _getSiwsDelegation(
        actor: SiwsProviderActor,
        address: string,
        sessionPublicKeyDer: ArrayBuffer,
        expiration: bigint
    ): Promise<any> {
        const delegationResult = await actor.siws_get_delegation(address, new Uint8Array(sessionPublicKeyDer), expiration);
        if ('Err' in delegationResult) throw new Error(`SIWS Get Delegation failed: ${JSON.stringify(delegationResult.Err)}`);
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
            signedDelegation.delegation.targets.length > 0 ? signedDelegation.delegation.targets[0] : undefined
        );

        const delegations = [{
            delegation: delegation,
            signature: signedDelegation.signature.slice().buffer as any,
        }];

        const delegationChain = DelegationChain.fromDelegations(
            delegations,
            userCanisterPublicKeyDer
        );

        const identity = DelegationIdentity.fromDelegation(sessionIdentity, delegationChain);
        
        // Log delegation targets (optional)
        try {
            const chain = identity.getDelegation();
            const targets = chain.delegations.map(d => d.delegation.targets);
            console.log(`[${this.walletName}] DelegationIdentity created with targets:`, targets);
        } catch (e) {
            console.warn(`[${this.walletName}] Could not log delegation targets:`, e);
        }

        return identity;
    }

    private async performSiwsLogin(address: string): Promise<{ identity: Identity, principal: Principal }> {
        const anonSiwsActor = this.createSiwsProviderActor(); 

        // Step 1: Prepare login
        const siwsMessage = await this._prepareLogin(anonSiwsActor, address);
        
        // Step 2: Sign message
        const signature = await this._signSiwsMessage(siwsMessage);

        // Step 3: Generate session identity
        const { sessionIdentity, sessionPublicKeyDer } = this._generateSessionIdentity();

        // Step 4: Login
        const loginDetails = await this._loginWithSiws(anonSiwsActor, signature, address, sessionPublicKeyDer);

        // Step 5: Get delegation
        const signedDelegation = await this._getSiwsDelegation(
            anonSiwsActor, 
            address, 
            sessionPublicKeyDer, 
            loginDetails.expiration
        );

        // Step 6: Create delegation identity
        const identity = this._createDelegationIdentity(
            signedDelegation, 
            sessionIdentity, 
            loginDetails.user_canister_pubkey.slice().buffer // Ensure ArrayBuffer
        );
        
        const principal = identity.getPrincipal();

        return { identity, principal };
    }
} 