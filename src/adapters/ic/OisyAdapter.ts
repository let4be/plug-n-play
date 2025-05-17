import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { type Wallet, Adapter } from "../../types/index.d";
import { PostMessageTransport } from "@slide-computer/signer-web";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { BaseAdapter } from "../BaseAdapter";
import { 
  deriveAccountId, 
  createAccountFromPrincipal, 
  isValidPrincipal,
  withRetry 
} from "../../utils/icUtils"; // Import utility functions
import { OisyAdapterConfig } from "../../types/AdapterConfigs";

export class OisyAdapter extends BaseAdapter<OisyAdapterConfig> implements Adapter.Interface {
  private static readonly OISY_PRINCIPAL_KEY = "oisy_principal"; // Key for localStorage

  private signer: Signer | null = null;
  private agent: HttpAgent | SignerAgent<any> | null = null;
  private signerAgent: SignerAgent<Signer> | null = null;
  private transport: PostMessageTransport | null = null;

  constructor(args: Adapter.ConstructorArgs) {
    super(args);

    const signerUrl = this.adapter.config.signerUrl ?? "https://oisy.com/sign";
    this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
    
    // Get transport config with defaults for missing values
    const transportConfig = {
      ...this.adapter.config.transport
    };
    
    this.transport = new PostMessageTransport({
      url: signerUrl,
      ...transportConfig,
    });
    
    this.signer = new Signer({
      transport: this.transport
    });
    
    this.signerAgent = SignerAgent.createSync({
      signer: this.signer,
      account: Principal.anonymous(),
      agent: this.agent,
    });
  }

  async openChannel(): Promise<void> {
	if (this.signer) {
		await this.signer.openChannel();
	}
  }
  
  async isConnected(): Promise<boolean> {
    return this.agent !== null && this.signer !== null && this.signerAgent !== null;
  }

  async getPrincipal(): Promise<string> {
    if (!this.signerAgent) {
      // If we have existing transport and signer but missing signerAgent, recreate only what's needed
      if (this.transport && this.signer && this.adapter.config.hostUrl) {
        this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
        this.signerAgent = SignerAgent.createSync({
          signer: this.signer,
          account: Principal.anonymous(),
          agent: this.agent,
        });
      } else {
        throw new Error("Oisy signer agent not initialized or connected");
      }
    }
    const principal = await this.signerAgent.getPrincipal();
    return principal.toText();
  }

  // Override the base class method with a specific implementation
  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    return deriveAccountId(principal);
  }

  async connect(): Promise<Wallet.Account> {
    this.setState(Adapter.Status.CONNECTING);
    try {
      // If we don't have a signerAgent but we have transport and signer, recreate signerAgent only
      if (!this.signerAgent && this.transport && this.signer && this.adapter.config.hostUrl) {
        this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
        this.signerAgent = SignerAgent.createSync({
          signer: this.signer,
          account: Principal.anonymous(),
          agent: this.agent,
        });
      } else if (!this.signerAgent || !this.signerAgent.signer) {
        throw new Error("Oisy signer agent not initialized. Was the constructor called with config?");
      }
            
      let principal: Principal;
      const storedPrincipal = localStorage.getItem(OisyAdapter.OISY_PRINCIPAL_KEY);

      if (storedPrincipal && isValidPrincipal(storedPrincipal)) {
        try {
          principal = Principal.fromText(storedPrincipal);
          this.signerAgent.replaceAccount(principal);
        } catch (e) {
          localStorage.removeItem(OisyAdapter.OISY_PRINCIPAL_KEY);
          // Fall through to normal connection flow if parsing fails
          const accounts = await this.signerAgent.signer.accounts();
          if (!accounts || accounts.length === 0) {
            await this.disconnect();
            throw new Error("No accounts returned from Oisy");
          }
          principal = accounts[0].owner;
          localStorage.setItem(OisyAdapter.OISY_PRINCIPAL_KEY, principal.toText());
          this.signerAgent.replaceAccount(principal); // Ensure agent has the correct account even after fallback
        }
      } else {
        const accounts = await withRetry(() => this.signerAgent!.signer.accounts());
        if (!accounts || accounts.length === 0) {
          await this.disconnect();
          throw new Error("No accounts returned from Oisy");
        }

        principal = accounts[0].owner;
        localStorage.setItem(OisyAdapter.OISY_PRINCIPAL_KEY, principal.toText());
        // No need to call replaceAccount here as the agent is likely fresh or will be handled below
        // If the agent existed before, it might need replacement, let's ensure it.
        this.signerAgent.replaceAccount(principal);
      }

      if (principal.isAnonymous()) {
        this.setState(Adapter.Status.READY);
        throw new Error(
          "Failed to authenticate with Oisy - got anonymous principal"
        );
      }

      if (this.adapter.config.fetchRootKey) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKey");
        // Direct call to fetchRootKey for Signer Agent
        await this.signerAgent.fetchRootKey();
      }
      
      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      console.error("[Oisy] Connection error:", error);
      await this.disconnect();
      throw error;
    }
  }

  // Use BaseIcAdapter's actor caching by implementing createActorInternal
  protected createActorInternal<T>(
    canisterId: string,
    idlFactory: any,
  ): ActorSubclass<T> {
    if (!this.signerAgent) {
      throw new Error("No signer agent available. Please connect first.");
    }
    try {
      const agentToUse = this.signerAgent;
      
      return Actor.createActor<T>(idlFactory, {
        agent: agentToUse, 
        canisterId,
      });
    } catch (error) {
      console.error("[Oisy] Actor creation error:", error);
      throw error;
    }
  }

  protected async disconnectInternal(): Promise<void> {
    if (this.signer) {
      try {
        this.signer.closeChannel();
      } catch (error) {
        console.warn("[Oisy] Error closing signer channel:", error);
      }
    }
    // Clear stored principal on disconnect
    localStorage.removeItem(OisyAdapter.OISY_PRINCIPAL_KEY);
  }

  protected cleanupInternal(): void {
    // Reset agents but keep transport and signer for faster reconnection
    this.agent = null;
    this.signerAgent = null;
  }
}
