// src/adapters/ic/IIAdapter.ts

import { Actor, HttpAgent, type ActorSubclass, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { type Wallet, Adapter } from "../../types/index.d";
import { BaseIcAdapter } from "./BaseIcAdapter";
import { 
  handleConnectionError, 
  fetchRootKeysIfNeeded, 
  createAccountFromPrincipal,
  isValidPrincipal
} from "./icUtils"; // Import utility functions

// Extend BaseIcAdapter
export class IIAdapter extends BaseIcAdapter implements Adapter.Interface {
  // II specific properties
  private authClient: AuthClient | null = null;
  private agent: HttpAgent | null = null;

  constructor(args: Adapter.ConstructorArgs) {
    super(args); // Call base constructor with the args object

    // Initialize AuthClient immediately, using nested timeout or fallback
    AuthClient.create({
      idleOptions: {
        // Use adapter-specific timeout from nested config, else default
        idleTimeout: Number(this.adapter.config.timeout ?? 1000 * 60 * 60 * 24), // Default 24 hours
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
    // Agent settings from top-level config and nested adapter config
    this.agent = HttpAgent.createSync({
      identity,
      host: this.adapter.config.hostUrl, 
      // verifyQuerySignatures comes from the nested adapter config, falling back to global
      verifyQuerySignatures: this.adapter.config.verifyQuerySignatures
    });
    
    // Use utility function for fetching root keys if needed
    await fetchRootKeysIfNeeded(
      this.agent,
      this.adapter.config.fetchRootKeys,
    );
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
          this.authClient!.login({
            // Read derivationOrigin from nested config or fallback to global top-level
            derivationOrigin: this.adapter.config.derivationOrigin,
            // Read identityProvider from nested config
            identityProvider: this.adapter.config.identityProvider, 
            // Use timeout from nested config or fallback to default
            maxTimeToLive: BigInt((this.adapter.config.timeout ?? 1 * 24 * 60 * 60) * 1000 * 1000 * 1000), // Default 1 day
            onSuccess: () => {
              this._continueLogin()
                .then(account => {
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

      const account = await this._continueLogin(); 
      this.setState(Adapter.Status.READY);
      return account;
    } catch (error) {
        // Use the utility function
        return handleConnectionError(
          error, 
          "Connect error", 
          (state) => this.setState(state), 
          () => this.disconnect()
        );
    }
  }

  private async _continueLogin(): Promise<Wallet.Account> {
    if (!this.authClient) throw new Error("AuthClient not available in _continueLogin");
    try {        
      const identity = this.authClient.getIdentity();
      const principal = identity.getPrincipal();
      
      if (principal.isAnonymous()) {
        throw new Error("Login resulted in anonymous principal");
      }
      
      await this.initAgent(identity); 
      
      // Use utility to create account from principal
      return createAccountFromPrincipal(principal);
    } catch (error) {
      // Use the utility function
      return handleConnectionError(
        error, 
        "Error during _continueLogin", 
        (state) => this.setState(state), 
        () => this.disconnect()
      );
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