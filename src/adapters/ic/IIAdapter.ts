// src/adapters/ic/IIAdapter.ts

import { Actor, HttpAgent, type ActorSubclass, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { type Wallet, Adapter } from "../../types/index.d";
import { BaseAdapter } from "../BaseAdapter";
import { 
  fetchRootKeyIfNeeded, 
  createAccountFromPrincipal,
} from "../../utils/icUtils"; // Import utility functions
import { IIAdapterConfig } from '../../types/AdapterConfigs';

// Extend BaseIcAdapter
export class IIAdapter extends BaseAdapter<IIAdapterConfig> implements Adapter.Interface {
  // II specific properties
  private authClient: AuthClient | null = null;
  private agent: HttpAgent | null = null;

  constructor(args: { adapter: any; config: IIAdapterConfig }) {
    super(args);
    this.initializeAuthClient();
  }

  private async initializeAuthClient(): Promise<void> {
    try {
      const client = await AuthClient.create({
        idleOptions: {
          idleTimeout: Number(this.config.timeout ?? 1000 * 60 * 60 * 24), // Default 24 hours
          disableDefaultIdleCallback: true,
        },
      });
      this.authClient = client;
      this.authClient.idleManager?.registerCallback?.(() => this.refreshLogin());
    } catch (err) {
      console.error("[II] Failed to create AuthClient:", err);
      this.setState(Adapter.Status.ERROR);
      throw err;
    }
  }

  // Use the resolved config for agent initialization
  private async initAgent(identity: Identity): Promise<void> {    
    // Agent settings from top-level config and nested adapter config
    this.agent = HttpAgent.createSync({
      identity,
      host: this.config.hostUrl, 
      // verifyQuerySignatures comes from the nested adapter config, falling back to global
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    
    // Use utility function for fetching root keys if needed
    console.log("fetchRootKey", this.config.fetchRootKey);
    await fetchRootKeyIfNeeded(
      this.agent,
      this.config.fetchRootKey,
    );
  }

  private getIdentityProvider(): string {
    if (this.config.dfxNetwork === "local") {
      return `${this.config.hostUrl}/?canisterId=${this.config.localIdentityCanisterId}`;
    }
    return "https://identity.ic0.app";
  }

  async connect(): Promise<Wallet.Account> {
    try {
      this.setState(Adapter.Status.CONNECTING);
      
      // Ensure AuthClient is initialized
      if (!this.authClient) {
        await this.initializeAuthClient();
      }

      const isAuthenticated = await this.authClient!.isAuthenticated();
      if (!isAuthenticated) {
        console.log("idprovider", this.getIdentityProvider());
        return new Promise<Wallet.Account>((resolve, reject) => {
          this.authClient!.login({
            derivationOrigin: this.config.derivationOrigin,
            identityProvider: this.getIdentityProvider(), 
            maxTimeToLive: BigInt((this.config.timeout ?? 1 * 24 * 60 * 60) * 1000 * 1000 * 1000), // Default 1 day
            onSuccess: async () => {
              try {
                const account = await this._continueLogin();
                this.setState(Adapter.Status.CONNECTED);
                resolve(account);
              } catch (error) {
                this.setState(Adapter.Status.ERROR);
                reject(error);
              }
            },
            onError: (error) => {
              console.error("[II] Login error:", error);
              this.setState(Adapter.Status.ERROR);
              reject(new Error(`II Authentication failed: ${error}`));
            },
          });
        });
      }

      const account = await this._continueLogin();
      this.setState(Adapter.Status.CONNECTED);
      return account;
    } catch (error) {
      this.setState(Adapter.Status.ERROR);
      throw error;
    }
  }

  private async _continueLogin(): Promise<Wallet.Account> {
    if (!this.authClient) {
      throw new Error("AuthClient not available in _continueLogin");
    }

    try {        
      const identity = this.authClient.getIdentity();
      if (!identity) {
        throw new Error("No identity available after login");
      }

      const principal = identity.getPrincipal();

      if (principal.isAnonymous()) {
        throw new Error("Login resulted in anonymous principal");
      }
      
      await this.initAgent(identity);
      
      const account = await createAccountFromPrincipal(principal);
      if (!account || !account.owner) {
        throw new Error("Failed to create valid account from principal");
      }
      
      return account;
    } catch (error) {
      console.error("[II] Error in _continueLogin:", error);
      this.setState(Adapter.Status.ERROR);
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
    options: {
      requiresSigning?: boolean;
    }
  ): ActorSubclass<T> {
    if (!this.agent) {
      throw new Error("Agent not initialized. Connect first.");
    }

    return Actor.createActor<T>(idl, {
      agent: this.agent,
      canisterId,
    });
  }

  async getPrincipal(): Promise<string> {
    if (!this.authClient) throw new Error("Not connected");
    const identity = this.authClient.getIdentity();
    if (!identity) throw new Error("Identity not available");
    const principal = identity.getPrincipal();
    return principal.toText();
  }

  private async refreshLogin(): Promise<void> {
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