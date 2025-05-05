// src/adapters/BaseAdapter.ts

import { type ActorSubclass } from "@dfinity/agent";
import { type Wallet, Adapter } from "../types/index.d";
import { AdapterSpecificConfig } from "../types/AdapterConfigs";
import { 
  deriveAccountId, 
  createActorCacheKey, 
  createAccountFromPrincipal
} from "../utils/icUtils"; // Import utility functions

/**
 * Abstract base class for adapters implementing Adapter.Interface
 */
export abstract class BaseAdapter<T extends AdapterSpecificConfig = AdapterSpecificConfig> implements Adapter.Interface {
  static supportedChains: Adapter.Chain[] = [Adapter.Chain.ICP];
  protected state: Adapter.Status = Adapter.Status.INIT;
  protected config: T;
  protected adapter: Adapter.Config;
  protected actorCache: Map<string, ActorSubclass<any>> = new Map();

  constructor(args: Adapter.ConstructorArgs & { config: T }) {
    this.config = args.config; // Store global config
    this.adapter = args.adapter; // Store adapter-specific config
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
    
    return deriveAccountId(principal);
  }

  // Abstract methods to be implemented by subclasses
  abstract isConnected(): Promise<boolean>;
  abstract connect(): Promise<Wallet.Account>; // Config is available via this.config
  abstract getPrincipal(): Promise<string>; // Subclasses must implement how to get the principal

  async getAddresses(): Promise<Adapter.Addresses> {
    const principal = await this.getPrincipal();
    const account = await createAccountFromPrincipal(principal);
    
    return {
      icp: {
        owner: account.owner,
        subaccount: account.subaccount,
      },
    };
  }
  
  // Base implementation of createActor with caching
  createActor<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    const { requiresSigning = false } = options || {};
    
    // Use utility to create cache key
    const cacheKey = createActorCacheKey(
      this.adapter.walletName,
      canisterId,
      requiresSigning
    );

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
    } catch (error) {
      console.error(`[${this.adapter.walletName}] Error during disconnect:`, error);
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
    this.actorCache.clear();
  }
  protected cleanupInternal(): void {
    /* No-op by default */
  }
}
