// src/adapters/BaseIcAdapter.ts

import { Actor, type ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { type Wallet, Adapter } from "../../types/index.d"; // Adjusted path
import { AccountIdentifier } from "@dfinity/ledger-icp";

/**
 * Abstract base class for adapters implementing Adapter.Interface
 */
export abstract class BaseIcAdapter implements Adapter.Interface {
  // Abstract properties to be implemented by subclasses
  abstract walletName: string;
  abstract logo: string;
  static supportedChains: Adapter.Chain[] = [Adapter.Chain.ICP];
  protected state: Adapter.Status = Adapter.Status.INIT;
  protected config: Wallet.PNPConfig;
  protected actorCache: Map<string, ActorSubclass<any>> = new Map();

  constructor(config: Wallet.PNPConfig) {
    this.config = config; // Store config
  }

  // Common state management
  protected setState(newState: Adapter.Status): void {
    this.state = newState;
  }

  getState(): Adapter.Status {
    return this.state;
  }

  // Standard implementation for getAccountId, can be overridden by subclasses if needed
  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    if (!principal)
      throw new Error("Principal not available to derive account ID");
    
    try {
      const principalObj = Principal.fromText(principal);
      
      const accountId = AccountIdentifier.fromPrincipal({
        principal: principalObj,
        subAccount: undefined, // Default subaccount
      }).toHex();
      
      return accountId;
    } catch (err) {
      console.error("[BaseIcAdapter] Error deriving account ID:", err);
      throw err;
    }
  }

  // Abstract methods to be implemented by subclasses
  abstract isAvailable(): Promise<boolean>;
  abstract isConnected(): Promise<boolean>;
  abstract connect(): Promise<Wallet.Account>; // Config is available via this.config
  abstract getPrincipal(): Promise<string>; // Subclasses must implement how to get the principal

  async getAddresses(): Promise<Adapter.Addresses> {
    return {
      icp: {
        owner: await this.getPrincipal(),
        subaccount: await this.getAccountId(),
      },
    };
  }
  // Base implementation of createActor with caching
  createActor<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean, anon?: boolean }
  ): ActorSubclass<T> {
    const { anon = false, requiresSigning = false } = options;
    // Generate cache key that doesn't depend on async getPrincipal
    const cacheKey = `${this.walletName}-${canisterId}-${
      requiresSigning
    }-${anon}`;

    // Check if we have a cached actor
    const cachedActor = this.actorCache.get(cacheKey);
    if (cachedActor) {
      return cachedActor;
    }

    // No cached actor, create a new one
    let actor: ActorSubclass<T>;
    if (anon) {
      actor = Actor.createActor<T>(idl, {
        canisterId,
      });
    } else {
      actor = this.createActorInternal<T>(canisterId, idl, options);
    }
    this.actorCache.set(cacheKey, actor);
    return actor;
  }

  // Abstract method for adapter-specific actor creation
  protected abstract createActorInternal<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T>;

  // Base disconnect logic
  async disconnect(): Promise<void> {
    if (
      this.state === Adapter.Status.DISCONNECTING ||
      this.state === Adapter.Status.CONNECTING ||
      this.state === Adapter.Status.DISCONNECTED
    ) {
      return;
    }
    this.setState(Adapter.Status.DISCONNECTING);
    try {
      await this.disconnectInternal(); // Call subclass-specific logic
    } catch (error) {
      console.error(`[${this.walletName}] Error during disconnect:`, error);
      // Ensure state is set even on error, but maybe log or handle differently
    } finally {
      this.cleanupInternal(); // Allow subclasses for further cleanup
      this.setState(Adapter.Status.DISCONNECTED);
    }
  }

  // Abstract methods for subclass-specific disconnect logic and resource cleanup
  // Default implementations do nothing, subclasses can override if needed.
  protected async disconnectInternal(): Promise<void> {
    /* No-op by default */
    console.log(`[${this.walletName}] Disconnecting...`);

    // Clear actor cache on disconnect
    this.actorCache.clear();

    // Clear localStorage on disconnect   
    if (this.config?.localStorageKey) {
      localStorage.removeItem(this.config.localStorageKey);
    }
  }
  protected cleanupInternal(): void {
    /* No-op by default */
  }
}
