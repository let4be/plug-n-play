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
  fetchRootKeysIfNeeded
} from "../../utils/icUtils"; // Import utility functions
import { NFIDAdapterConfig } from "../../types/AdapterConfigs";
import { IdbStorage, getDelegationChain, setDelegationChain, removeDelegationChain } from "@slide-computer/signer-storage";

// Extend BaseIcAdapter instead of just implementing Adapter.Interface
export class NFIDAdapter extends BaseAdapter<NFIDAdapterConfig> implements Adapter.Interface {
  private static readonly TRANSPORT_CONFIG = {
    windowOpenerFeatures: "width=525,height=705",
    establishTimeout: 45000,
    disconnectTimeout: 45000,
    statusPollingRate: 500,
    detectNonClickEstablishment: false, // Allow connection outside of click handler for auto-connect
  };

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

    // Create transport with the configured URL and non-click detection disabled
    this.transport = new PostMessageTransport({
      url: this.adapter.config.signerUrl,
      ...NFIDAdapter.TRANSPORT_CONFIG,
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
      console.debug("Failed to restore from storage:", error);
    });
  }
  
  private async restoreFromStorage(): Promise<void> {
    try {
      const delegationChain = await getDelegationChain("nfid", this.storage);
      
      if (!delegationChain) {
        return;
      }

      // Check if delegation is still valid
      const expiration = delegationChain.delegations[0].delegation.expiration;
      if (expiration < BigInt(Date.now() * 1_000_000)) {
        await removeDelegationChain("nfid", this.storage);
        return;
      }
      
      // Generate a new session key
      this.sessionKey = Ed25519KeyIdentity.generate();

      // Create identity from stored delegation
      this.identity = DelegationIdentity.fromDelegation(
        this.sessionKey,
        delegationChain
      );

      // Update signer agent with restored principal
      this.signerAgent = SignerAgent.createSync({
        signer: this.signer!,
        account: this.identity.getPrincipal(),
        agent: HttpAgent.createSync({ host: this.adapter.config.hostUrl }),
      });

      this.setState(Adapter.Status.CONNECTED);
    } catch (error) {
      console.debug("[NFID] Error restoring from storage:", error);
      // Clear potentially invalid state
      this.identity = null;
      this.signerAgent = null;
      this.sessionKey = null;
      await removeDelegationChain("nfid", this.storage);
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
    if (!this.identity) {
      try {
        await this.restoreFromStorage();
        if (this.identity && this.state === Adapter.Status.CONNECTED) {
          return createAccountFromPrincipal(this.identity.getPrincipal());
        }
      } catch (error) {
        console.debug("[NFID] Failed to restore from storage:", error);
      }
    }

    this.setState(Adapter.Status.CONNECTING);

    if (!this.signer || !this.transport || !this.agent) {
      this.setState(Adapter.Status.ERROR);
      throw new Error("NFID Adapter not initialized correctly.");
    }

    try {
      await this.signer.openChannel();
      this.sessionKey = Ed25519KeyIdentity.generate();

      const maxTimeToLiveNs =
        this.adapter.config.delegationTimeout !== undefined
          ? BigInt(Date.now() * 1_000_000) +
            BigInt(this.adapter.config.delegationTimeout)
          : BigInt(Date.now() * 1_000_000) +
            BigInt(48 * 60 * 60 * 1_000_000_000);

      const delegationChain = await this.signer.delegation({
        publicKey: this.sessionKey.getPublicKey().toDer(),
        targets: Array.isArray(this.adapter.config.delegationTargets)
          ? this.adapter.config.delegationTargets
              .filter((target): target is string => typeof target === 'string' && target.length > 0)
              .map(target => Principal.fromText(target))
          : [],
        maxTimeToLive: maxTimeToLiveNs,
      });

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

      if (this.adapter.config.fetchRootKeys) {
        await fetchRootKeysIfNeeded(this.agent, true);
      }

      const principal = delegationIdentity.getPrincipal();

      if (isPrincipalAnonymous(principal)) {
        this.setState(Adapter.Status.READY);
        this.identity = null;
        this.signerAgent = null;
        this.sessionKey = null;
        await removeDelegationChain("nfid", this.storage);
        throw new Error(
          "Failed to authenticate with NFID - got anonymous principal"
        );
      }

      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      console.debug("[NFID] Connection failed:", error);
      this.identity = null;
      this.signerAgent = null;
      this.sessionKey = null;
      await removeDelegationChain("nfid", this.storage);
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
      host: this.adapter.config.hostUrl, // Access global hostUrl
      verifyQuerySignatures: this.adapter.config.verifyQuerySignatures, // Access global verifyQuerySignatures
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
    // Existing logic minus state changes and cleanup
    this.identity = null;
    this.signerAgent = null; // Nullify signer agent specific to connection
    this.sessionKey = null;
    await removeDelegationChain("nfid", this.storage);

    try {
      if (this.signer) {
        this.signer.closeChannel(); // Close the channel if signer exists
      }
    } catch (error) {
      console.error("[NFID] Error during disconnect internal cleanup:", error);
    }
  }

  protected cleanupInternal(): void {
    // Nullify resources specific to the connection/session
    this.transport = null;
    this.signer = null;
  }
}
