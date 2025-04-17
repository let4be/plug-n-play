import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { type Wallet, Adapter } from "../../types/index.d";
import oisyLogo from "../../../assets/oisy_logo.webp";
import { PostMessageTransport } from "@slide-computer/signer-web";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { hexStringToUint8Array } from "@dfinity/utils";
import { BaseIcAdapter } from "./BaseIcAdapter";

export class OisyAdapter extends BaseIcAdapter implements Adapter.Interface {
  private static readonly TRANSPORT_CONFIG = {
    windowOpenerFeatures: "width=525,height=705",
    establishTimeout: 45000,
    disconnectTimeout: 45000,
    statusPollingRate: 500,
    detectNonClickEstablishment: false,
  };

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
      throw new Error("Oisy signer agent not initialized or connected");
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
      if (!this.signerAgent || !this.signerAgent.signer) {
        throw new Error("Oisy signer agent not initialized. Was the constructor called with config?");
      }
            
      const accounts = await this.signerAgent.signer.accounts();
      if (!accounts || accounts.length === 0) {
        this.disconnect();
        throw new Error("No accounts returned from Oisy");
      }

      const principal = accounts[0].owner;
      if (principal.isAnonymous()) {
        this.setState(Adapter.Status.READY);
        throw new Error("Failed to authenticate with Oisy - got anonymous principal");
      }

      this.signerAgent.replaceAccount(principal);

      if (this.config.fetchRootKeys) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKeys");
        await this.signerAgent.fetchRootKey();
      }
      
      this.setState(Adapter.Status.CONNECTED);
      return {
        owner: principal.toText(),
        subaccount: await this.getAccountId(),
        hasDelegation: false,
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
  }

  protected cleanupInternal(): void {
    this.signer = null;
    this.agent = null;
    this.signerAgent = null;
    this.transport = null;
  }
}
