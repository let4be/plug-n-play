import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { DelegationIdentity, Ed25519KeyIdentity } from "@dfinity/identity";
import { type Wallet, Adapter } from "../../types/index.d";
import { PostMessageTransport } from "@slide-computer/signer-web";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { SignerError } from "@slide-computer/signer";
import { BaseIcAdapter } from "./BaseIcAdapter"; // Add BaseIcAdapter import
import { 
  createAccountFromPrincipal, 
  isPrincipalAnonymous,
  fetchRootKeysIfNeeded
} from "./icUtils"; // Import utility functions

// Extend BaseIcAdapter instead of just implementing Adapter.Interface
export class NFIDAdapter extends BaseIcAdapter implements Adapter.Interface {
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

  constructor(args: Adapter.ConstructorArgs) {
    super(args); // Call BaseIcAdapter constructor with args

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
  }

  async isAvailable(): Promise<boolean> {
    return true; // NFID is web-based, so it's always available
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
    this.setState(Adapter.Status.CONNECTING);

    // --- Connection Flow (Handles both initial and potential re-establishment) ---
    if (!this.signer || !this.transport || !this.agent) {
      this.setState(Adapter.Status.ERROR);
      throw new Error("NFID Adapter not initialized correctly.");
    }

    try {
      await this.signer.openChannel();
      // Generate a new session key for each connection attempt
      this.sessionKey = Ed25519KeyIdentity.generate();

      // maxTimeToLive is expected in nanoseconds from Date.now() epoch
      const maxTimeToLiveNs =
        this.adapter.config.delegationTimeout !== undefined // Access global config
          ? BigInt(Date.now() * 1_000_000) +
            BigInt(this.adapter.config.delegationTimeout) // Convert Date.now() (ms) to ns and add timeout (ns)
          : BigInt(Date.now() * 1_000_000) +
            BigInt(48 * 60 * 60 * 1_000_000_000); // Default: Now + 24h in ns

      // This call will prompt the user if necessary or use existing session
      const delegationChain = await this.signer.delegation({
        publicKey: this.sessionKey.getPublicKey().toDer(),
        targets: Array.isArray(this.adapter.config.delegationTargets) // Access global config
          ? this.adapter.config.delegationTargets
              .filter((target): target is string => typeof target === 'string' && target.length > 0)
              .map(target => Principal.fromText(target))
          : [],
        maxTimeToLive: maxTimeToLiveNs,
      });

      const delegationIdentity = DelegationIdentity.fromDelegation(
        this.sessionKey,
        delegationChain
      );

      // Create/Update SignerAgent with the new principal
      this.signerAgent = SignerAgent.createSync({
        signer: this.signer,
        account: delegationIdentity.getPrincipal(),
        agent: HttpAgent.createSync({ host: this.adapter.config.hostUrl }), // Use RPC URL for the signer agent
      });

      this.identity = delegationIdentity;

      if (this.adapter.config.fetchRootKeys) { // Access global config
        await fetchRootKeysIfNeeded(this.agent, true);
      }

      const principal = delegationIdentity.getPrincipal();

      if (isPrincipalAnonymous(principal)) {
        this.setState(Adapter.Status.READY);
        // Clear potentially invalid state
        this.identity = null;
        this.signerAgent = null;
        this.sessionKey = null;
        throw new Error(
          "Failed to authenticate with NFID - got anonymous principal"
        );
      }

      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      // Attempt cleanup on error
      this.identity = null;
      this.signerAgent = null;
      this.sessionKey = null;
      if (this.signer) {
        try {
          this.signer.closeChannel();
        } catch (e) {
          console.debug("Error closing channel on connect failure:", e);
        }
      }
      this.setState(Adapter.Status.READY); // Or Adapter.Status.ERROR ?
      throw error; // Re-throw original error
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
