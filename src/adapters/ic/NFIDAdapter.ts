import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { DelegationIdentity, Ed25519KeyIdentity } from "@dfinity/identity";
import { type Wallet, Adapter } from "../../types/index.d";
import { PostMessageTransport } from "@slide-computer/signer-web";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { SignerError } from "@slide-computer/signer";
import { BaseAdapter } from "../BaseAdapter"; // Add BaseIcAdapter import
import { 
  createAccountFromPrincipal, 
  isPrincipalAnonymous,
  fetchRootKeyIfNeeded
} from "../../utils/icUtils"; // Import utility functions
import { NFIDAdapterConfig } from "../../types/AdapterConfigs";
import { 
  IdbStorage, 
  getDelegationChain, 
  setDelegationChain, 
  removeDelegationChain,
  getIdentity,
  setIdentity,
  removeIdentity
} from "@slide-computer/signer-storage";

// Extend BaseIcAdapter instead of just implementing Adapter.Interface
export class NFIDAdapter extends BaseAdapter<NFIDAdapterConfig> implements Adapter.Interface {
  private agent: HttpAgent;
  private identity: DelegationIdentity | null = null;
  private sessionKey: Ed25519KeyIdentity | null = null;
  private signerAgent: SignerAgent<Signer> | null;
  private signer: Signer | null;
  private transport: PostMessageTransport | null;
  private storage: IdbStorage;

  constructor(args: Adapter.ConstructorArgs) {
    super(args); // Call BaseIcAdapter constructor with args

    // Initialize storage
    this.storage = new IdbStorage();

    // Get transport config with defaults for missing values
    const transportConfig = {
      ...this.adapter.config.transport
    };

    // Create transport with the configured URL and transport settings
    this.transport = new PostMessageTransport({
      url: this.adapter.config.signerUrl,
      ...transportConfig,
    });

    // Create signer with the transport
    this.signer = new Signer({
      transport: this.transport,
    });

    // Agent interacting with the Signer/NFID uses the provider URL
    const signerHttpAgent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });

    this.signerAgent = SignerAgent.createSync({
      signer: this.signer,
      account: Principal.anonymous(), // Start anonymous
      agent: signerHttpAgent,
    });

    // General purpose agent for non-signed/initial actions
    this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });

    this.setState(Adapter.Status.READY); // Use inherited setState

    // Attempt to restore from storage
    this.restoreFromStorage().catch(error => {
      console.debug("[NFID] Failed to restore from storage on init:", error);
    });
  }
  
  private async clearStoredSession(): Promise<void> {
    this.identity = null;
    this.signerAgent = null; 
    this.sessionKey = null;
    await removeIdentity("nfid", this.storage);
    await removeDelegationChain("nfid", this.storage);
    console.debug("[NFID] Cleared stored session data.");
    // Do not change state here, let the caller manage it.
  }

  private async restoreFromStorage(): Promise<void> {
    try {
      console.debug("[NFID] Attempting to restore from storage...");
      const storedSessionKey = await getIdentity("nfid", this.storage) as Ed25519KeyIdentity | undefined;
      const delegationChain = await getDelegationChain("nfid", this.storage);
      
      if (!storedSessionKey || !delegationChain) {
        console.debug("[NFID] No session key or delegation chain found in storage.");
        await this.clearStoredSession(); // Clear if partially stored
        return;
      }

      // Check if delegation is still valid
      const expiration = delegationChain.delegations[0].delegation.expiration;
      if (expiration < BigInt(Date.now() * 1_000_000)) {
        console.debug("[NFID] Stored delegation chain has expired.");
        await this.clearStoredSession();
        return;
      }

      console.debug("[NFID] Found valid session key and delegation chain, restoring...");
      
      this.sessionKey = storedSessionKey;

      this.identity = DelegationIdentity.fromDelegation(
        this.sessionKey,
        delegationChain
      );

      this.signerAgent = SignerAgent.createSync({
        signer: this.signer!, // Signer should be initialized in constructor
        account: this.identity.getPrincipal(),
        agent: HttpAgent.createSync({ host: this.adapter.config.hostUrl }),
      });

      console.debug("[NFID] Successfully restored connection.");
      this.setState(Adapter.Status.CONNECTED);
    } catch (error) {
      console.error("[NFID] Error restoring from storage:", error);
      await this.clearStoredSession();
      // Do not change state here, allow connect flow to proceed if called from there
    }
  }

  async openChannel(): Promise<void> {
	if (this.signer) {
		await this.signer.openChannel();
	}
  }

  async isConnected(): Promise<boolean> {
    return this.identity !== null && this.state === Adapter.Status.CONNECTED;
  }

  async getPrincipal(): Promise<string> {
    if (!this.identity) {
      throw new Error("NFID Adapter: Not connected. Call connect() first.");
    }
    return this.identity.getPrincipal().toText();
  }

  unwrapResponse = <T extends any>(response: any): T => {
    if ("error" in response) {
      throw new SignerError(response.error);
    }
    if ("result" in response) {
      return response.result;
    }
    throw new SignerError({
      code: 500,
      message: "Invalid response",
    });
  };

  async connect(): Promise<Wallet.Account> {
    // If we're already connected, return the current account
    if (this.identity && this.state === Adapter.Status.CONNECTED) {
      return createAccountFromPrincipal(this.identity.getPrincipal());
    }

    // Try to restore from storage first
    // Note: restoreFromStorage itself doesn't throw on "not found", but connect should proceed.
    // It will set state to CONNECTED if successful.
    if (!this.identity) { // Check if not already connected by a previous restore attempt (e.g. in constructor)
        try {
            await this.restoreFromStorage();
            if (this.identity && this.state === Adapter.Status.CONNECTED) {
                 console.debug("[NFID] Connection restored from storage during connect call.");
                 return createAccountFromPrincipal(this.identity.getPrincipal());
            }
        } catch (error) {
            // restoreFromStorage already logs its errors and clears session.
            console.debug("[NFID] Failed to restore from storage during connect call:", error);
        }
    }
    
    // If after attempting restore, we are now connected, return.
    if (this.identity && this.state === Adapter.Status.CONNECTED) {
      return createAccountFromPrincipal(this.identity.getPrincipal());
    }


    this.setState(Adapter.Status.CONNECTING);

    if (!this.signer || !this.transport || !this.agent) {
      this.setState(Adapter.Status.ERROR);
      throw new Error("NFID Adapter not initialized correctly.");
    }

    try {
      console.debug("[NFID] Opening channel...");
      await this.signer.openChannel();
      
      // Generate a new session key ONLY if one wasn't restored/doesn't exist.
      // However, for NFID flow, a new session key is typically generated for each new delegation request.
      this.sessionKey = Ed25519KeyIdentity.generate(); 
      console.debug("[NFID] Generated new session key for delegation request.");


      const maxTimeToLiveNs =
        this.adapter.config.delegationTimeout !== undefined
          ? BigInt(Date.now() * 1_000_000) +
            BigInt(this.adapter.config.delegationTimeout)
          : BigInt(Date.now() * 1_000_000) +
            BigInt(48 * 60 * 60 * 1_000_000_000); 

      console.debug("[NFID] Requesting delegation...");
      const delegationChain = await this.signer.delegation({
        publicKey: this.sessionKey.getPublicKey().toDer(),
        targets: Array.isArray(this.adapter.config.delegationTargets) 
          ? this.adapter.config.delegationTargets
              .filter((target): target is string => typeof target === 'string' && target.length > 0)
              .map(target => Principal.fromText(target))
          : [],
        maxTimeToLive: maxTimeToLiveNs,
      });

      console.debug("[NFID] Storing session key and delegation chain...");
      await setIdentity("nfid", this.sessionKey, this.storage);
      await setDelegationChain("nfid", delegationChain, this.storage);

      const delegationIdentity = DelegationIdentity.fromDelegation(
        this.sessionKey,
        delegationChain
      );

      this.signerAgent = SignerAgent.createSync({
        signer: this.signer,
        account: delegationIdentity.getPrincipal(),
        agent: HttpAgent.createSync({ host: this.adapter.config.hostUrl }), 
      });

      this.identity = delegationIdentity;

      if (this.adapter.config.fetchRootKey) { 
        await fetchRootKeyIfNeeded(this.agent, true);
      }

      const principal = delegationIdentity.getPrincipal();

      if (isPrincipalAnonymous(principal)) {
        this.setState(Adapter.Status.READY);
        await this.clearStoredSession(); // Clear stored session data
        throw new Error(
          "Failed to authenticate with NFID - got anonymous principal"
        );
      }

      console.debug("[NFID] Successfully connected and session stored.");
      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      console.error("[NFID] Connection failed:", error);
      await this.clearStoredSession(); // Ensure cleanup
      if (this.signer) {
        try {
          this.signer.closeChannel();
        } catch (e) {
          console.debug("[NFID] Error closing channel on connect failure:", e);
        }
      }
      this.setState(Adapter.Status.READY);
      throw error;
    }
  }

  undelegatedActor<T>(canisterId: string, idlFactory: any): ActorSubclass<T> {
    const agent = HttpAgent.createSync({
      identity: this.identity,
      host: this.adapter.config.hostUrl, 
      verifyQuerySignatures: this.adapter.config.verifyQuerySignatures, 
    });
    const actor = Actor.createActor<T>(idlFactory, {
      agent: agent,
      canisterId,
    });
    return actor;
  }

  // Implementation for BaseIcAdapter actor caching
  protected createActorInternal<T>(
    canisterId: string,
    idlFactory: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning !== false; // Default to true
    if (!this.identity) {
      throw new Error("Not connected. Identity not available.");
    }
    if (!this.signerAgent && requiresSigning) {
      throw new Error("Signer agent not available. Please connect first.");
    }
    if (!this.adapter.config.hostUrl) {
      throw new Error("Host URL configuration is missing.");
    }

    try {
      // Check if canister id is in the delegation targets
      const inTargets = this.identity
        .getDelegation()
        .delegations.some((d) =>
          d.delegation.targets?.some((p) => p.toText() === canisterId)
        );

      // Determine if we should use undelegated actor
      if ((inTargets && !requiresSigning) || (!inTargets && !requiresSigning)) {
        return this.undelegatedActor<T>(canisterId, idlFactory);
      }

      // Create actor with delegation identity for authenticated calls
      if (requiresSigning) {
        return Actor.createActor<T>(idlFactory, {
          agent: this.signerAgent,
          canisterId,
        });
      }

      // Fallback case
      return Actor.createActor<T>(idlFactory, {
        agent: this.signerAgent,
        canisterId,
      });
    } catch (error) {
      console.error("Error creating actor:", error);
      throw new Error(
        `Failed to create actor: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  // disconnect is handled by BaseIcAdapter, implement internal methods instead
  protected async disconnectInternal(): Promise<void> {
    console.debug("[NFID] Disconnecting internally...");
    await this.clearStoredSession(); // Clear stored session data
    // this.identity, this.signerAgent, this.sessionKey are nulled in clearStoredSession

    try {
      if (this.signer) {
        this.signer.closeChannel(); 
      }
    } catch (error) {
      console.error("[NFID] Error during disconnect internal cleanup:", error);
    }
    // State change will be handled by BaseAdapter's disconnect method
  }

  protected cleanupInternal(): void {
    // This method is called by BaseAdapter's disconnect AFTER disconnectInternal.
    // clearStoredSession already handles most of this.
    // Nullify resources not directly tied to a specific session but to the adapter instance if needed.
    // For NFID, most are session-specific or re-initialized.
    // this.transport and this.signer are more persistent but re-created on constructor for now.
    // If they were meant to survive across multiple connect/disconnect cycles without re-instantiation,
    // their cleanup would be more nuanced. Given current structure, this is likely fine.
    console.debug("[NFID] Performing final cleanup (transport/signer are re-created on new instance).");
    // this.transport = null; // Potentially, if not re-created on new adapter instance
    // this.signer = null;    // Potentially
  }
}
