import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { type Wallet, Adapter } from "../../types/index.d";
import oisyLogo from "../../../assets/oisy_logo.webp";
import { PostMessageTransport } from "@slide-computer/signer-web";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { BaseIcAdapter } from "./BaseIcAdapter";

export class OisyAdapter extends BaseIcAdapter implements Adapter.Interface {
  private static readonly TRANSPORT_CONFIG = {
    windowOpenerFeatures: "width=525,height=705",
    establishTimeout: 45000,
    disconnectTimeout: 45000,
    statusPollingRate: 500,
    detectNonClickEstablishment: false,
  };

  private static readonly OISY_PRINCIPAL_KEY = "oisy_principal"; // Key for localStorage

  private signer: Signer | null = null;
  private agent: HttpAgent | SignerAgent<any> | null = null;
  private signerAgent: SignerAgent<Signer> | null = null;
  private transport: PostMessageTransport | null = null;

  static readonly logo: string = oisyLogo;
  static readonly walletName: string = "OISY Wallet";
  walletName: string = OisyAdapter.walletName;
  logo: string = OisyAdapter.logo;

  constructor(config: Wallet.PNPConfig) {
    super(config);

    const signerUrl = this.config.adapters?.oisy?.config?.signerUrl || "https://oisy.com/sign";    
    this.agent = HttpAgent.createSync({ host: this.config.hostUrl });
    
    this.transport = new PostMessageTransport({
      url: signerUrl,
      ...OisyAdapter.TRANSPORT_CONFIG,
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

  async isAvailable(): Promise<boolean> {
    return true; // Oisy is web-based
  }

  async isConnected(): Promise<boolean> {
    return this.agent !== null && this.signer !== null && this.signerAgent !== null;
  }

  async getPrincipal(): Promise<string> {
    if (!this.signerAgent) {
      // If we have existing transport and signer but missing signerAgent, recreate only what's needed
      if (this.transport && this.signer) {
        this.agent = HttpAgent.createSync({ host: this.config.hostUrl });
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

  async getAccountId(): Promise<string> {
    return AccountIdentifier.fromPrincipal({
      principal: Principal.fromText(await this.getPrincipal()),
      subAccount: undefined, // This will use the default subaccount
    }).toHex();
  }

  async connect(): Promise<Wallet.Account> {
    this.setState(Adapter.Status.CONNECTING);
    try {
      // If we don't have a signerAgent but we have transport and signer, recreate signerAgent only
      if (!this.signerAgent && this.transport && this.signer) {
        this.agent = HttpAgent.createSync({ host: this.config.hostUrl });
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

      if (storedPrincipal && storedPrincipal !== "null" && storedPrincipal !== "undefined") {
        console.debug("[Oisy] Attempting to use stored principal:", storedPrincipal);
        try {
          principal = Principal.fromText(storedPrincipal);
          // Assume the stored principal is valid for now to avoid the popup.
          // If it's invalid, subsequent agent operations will likely fail.
          this.signerAgent.replaceAccount(principal);
          console.debug("[Oisy] Replaced account with stored principal.");
        } catch (e) {
          console.warn("[Oisy] Failed to parse stored principal, proceeding with normal flow:", e);
          localStorage.removeItem(OisyAdapter.OISY_PRINCIPAL_KEY);
          // Fall through to normal connection flow if parsing fails
          const accounts = await this.signerAgent.signer.accounts();
          if (!accounts || accounts.length === 0) {
            this.disconnect();
            throw new Error("No accounts returned from Oisy");
          }
          principal = accounts[0].owner;
          localStorage.setItem(OisyAdapter.OISY_PRINCIPAL_KEY, principal.toText());
          this.signerAgent.replaceAccount(principal); // Ensure agent has the correct account even after fallback
        }
      } else {
        const accounts = await this.signerAgent.signer.accounts();
        if (!accounts || accounts.length === 0) {
          this.disconnect();
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
        throw new Error("Failed to authenticate with Oisy - got anonymous principal");
      }

      if (this.config.fetchRootKeys) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKeys");
        await this.signerAgent.fetchRootKey();
      }
      
      this.setState(Adapter.Status.CONNECTED);
      return {
        owner: principal.toText(),
        subaccount: await this.getAccountId(),
      };
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
        console.debug("[Oisy] Closing signer channel");
        this.signer.closeChannel();
      } catch (error) {
        console.debug("[Oisy] Error closing signer channel:", error);
      }
    }
    // Clear stored principal on disconnect
    localStorage.removeItem(OisyAdapter.OISY_PRINCIPAL_KEY);
    console.debug("[Oisy] Cleared stored principal from localStorage.");
  }

  protected cleanupInternal(): void {
    // Reset agents but keep transport and signer for faster reconnection
    this.agent = null;
    this.signerAgent = null;
    // Don't reset transport or signer: this.transport = null; this.signer = null;
  }
}
