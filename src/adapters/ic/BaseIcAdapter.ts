// src/adapters/BaseIcAdapter.ts

import { type ActorSubclass } from "@dfinity/agent";
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
      
    console.log("[BaseIcAdapter] Getting account ID for principal:", principal);
    
    // Important: Use subAccount (capital A) as per the correct API
    return AccountIdentifier.fromPrincipal({
      principal: Principal.fromText(principal),
      subAccount: undefined, // Default subaccount
    }).toHex();
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
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    // Generate cache key that doesn't depend on async getPrincipal
    const cacheKey = `${this.walletName}-${canisterId}-${
      options?.requiresSigning || false
    }`;

    // Check if we have a cached actor
    const cachedActor = this.actorCache.get(cacheKey);
    if (cachedActor) {
      return cachedActor;
    }

    // No cached actor, create a new one
    const actor = this.createActorInternal<T>(canisterId, idl, options);
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

      // Common cleanup: remove persisted wallet ID
      if (this.config?.localStorageKey) {
        localStorage.removeItem(this.config.localStorageKey);
      }

      // Clear actor cache on disconnect
      this.actorCache.clear();
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
  }
  protected cleanupInternal(): void {
    /* No-op by default */
  }
}
