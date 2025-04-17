// src/adapters/IIAdapter.ts

import { Actor, HttpAgent, type ActorSubclass, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { type Wallet, Adapter } from "../../types/index.d";
import { Principal } from "@dfinity/principal";
import { hexStringToUint8Array } from "@dfinity/utils";
import dfinityLogo from "../../../assets/dfinity.webp";
import { BaseIcAdapter } from "./BaseIcAdapter";

// Extend BaseIcAdapter
export class IIAdapter extends BaseIcAdapter implements Adapter.Interface {
  static readonly logo: string = dfinityLogo;
  static readonly walletName: string = "Internet Identity";
  walletName: string = IIAdapter.walletName;
  logo: string = IIAdapter.logo;
  
  // II specific properties
  private authClient: AuthClient | null = null;
  private agent: HttpAgent | null = null;

  // Constructor calls super and does II specific initialization
  constructor(config: Wallet.PNPConfig) {
    super(config); // Call base constructor
    
    // Initialize AuthClient immediately, using this.config
    AuthClient.create({
      idleOptions: {
        idleTimeout: Number(this.config.adapters?.ii?.config?.timeout || this.config.timeout || 1000 * 60 * 60 * 24),
        disableDefaultIdleCallback: true,
      },
    }).then(client => {
      this.authClient = client;
      this.authClient.idleManager?.registerCallback?.(() => this.refreshLogin());
    }).catch(err => {
        console.error("[II] Failed to create AuthClient:", err);
        this.setState(Adapter.Status.ERROR); // Use inherited setState
    });
  }

  // Use the resolved config for agent initialization
  private async initAgent(identity: Identity): Promise<void> {
    this.agent = HttpAgent.createSync({
      identity,
      host: this.config.hostUrl, 
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    if (this.config.fetchRootKeys) { 
      try {
        await this.agent.fetchRootKey();
      } catch (e) {
        console.warn("[II] Unable to fetch root key. Check replica status.", e);
      }
    }
  }

  // Implement abstract methods
  async isAvailable(): Promise<boolean> {
    return true; // Always available
  }

  async connect(): Promise<Wallet.Account> {
    try {
      this.setState(Adapter.Status.CONNECTING);
      
      if (!this.authClient) {
         await new Promise(resolve => setTimeout(resolve, 500)); 
         if (!this.authClient) throw new Error("AuthClient failed to initialize.");
      }

      const isAuthenticated = await this.authClient.isAuthenticated();

      if (!isAuthenticated) {
        return new Promise<Wallet.Account>((resolve, reject) => {
          console.log("[II] Login with AuthClient", this.config);
          this.authClient!.login({
            derivationOrigin: this.config.derivationOrigin,
            identityProvider: this.config.adapters?.ii?.config?.identityProvider || this.config.identityProvider, 
            maxTimeToLive: this.config.delegationTimeout || BigInt(1 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 1 day
            onSuccess: () => {
              this._continueLogin(this.config.hostUrl)
                .then(account => {
                  console.log("[II] Account", account);
                  this.setState(Adapter.Status.READY);
                  resolve(account);
                })
                .catch(reject);
            },
            onError: (error) => {
              console.error("[II] Login error:", error);
              this.disconnect().catch(() => {}); // Use inherited disconnect
              this.setState(Adapter.Status.ERROR); 
              reject(new Error("II Authentication failed: " + error));
            },
          });
        });
      }

      const account = await this._continueLogin(this.config.hostUrl); 
      console.log("[II] Account", account);
      this.setState(Adapter.Status.READY);
      return account;
    } catch (error) {
        console.error("[II] Connect error:", error);
        this.setState(Adapter.Status.ERROR);
        await this.disconnect().catch(() => {}); // Use inherited disconnect
        throw error;
    }
  }

  private async _continueLogin(host: string): Promise<Wallet.Account> {
    if (!this.authClient) throw new Error("AuthClient not available in _continueLogin");
    try {
      const identity = this.authClient.getIdentity();
      const principal = identity.getPrincipal();
      
      // Add debugging to see what's happening
      console.log("[II] Raw Principal:", principal);
      console.log("[II] Principal Text:", principal.toText());
      
      if (principal.isAnonymous()) {
        throw new Error("Login resulted in anonymous principal");
      }
      
      await this.initAgent(identity); 
      
      // Get the account ID using the base method which derives from principal
      const accountId = await this.getAccountId();
      console.log("[II] Derived Account ID:", accountId);
      
      return {
        owner: principal.toText(),
        // Use the derived account ID
        subaccount: accountId,
      };
    } catch (error) {
      console.error("[II] Error during _continueLogin:", error);
      this.setState(Adapter.Status.ERROR);
      await this.disconnect().catch(() => {});
      throw error;
    }
  }

  async isConnected(): Promise<boolean> {
    return this.authClient ? await this.authClient.isAuthenticated() : false;
  }

  // Implementation for BaseIcAdapter actor caching
  protected createActorInternal<T>(
    canisterId: string, 
    idl: any, 
  ): ActorSubclass<T> {
    if (!this.agent) {
      throw new Error("Agent not initialized. Connect first.");
    }
    return Actor.createActor(idl, {
      agent: this.agent,
      canisterId,
    });
  }

  async getPrincipal(): Promise<string> {
    if (!this.authClient) throw new Error("Not connected");
    const identity = this.authClient.getIdentity();
    if (!identity) throw new Error("Identity not available");
    return identity.getPrincipal()?.toText() || "";
  }

  private async refreshLogin(): Promise<void> {
    console.debug("[II] Refreshing login due to idle timeout.");
    try {
      await this.connect(); 
    } catch (error) {
      console.error("[II] Failed to refresh login:", error);
      await this.disconnect().catch(() => {}); 
    }
  }

  // Disconnect logic specific to II
  protected async disconnectInternal(): Promise<void> {
    if (this.authClient) { 
        await this.authClient.logout();
    } 
  }

  // Cleanup logic specific to II
  protected cleanupInternal(): void {
      this.authClient = null;
      this.agent = null;
  }
}