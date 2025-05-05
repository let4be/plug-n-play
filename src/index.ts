// Add buffer polyfill for browser environment
import 'buffer';
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { Wallet, Adapter, GlobalPnpConfig } from "./types/index.d";
import { createPNPConfig } from "./config";

// Re-export config types and creation function for easier consumption
export { createPNPConfig, type GlobalPnpConfig };
export type { Wallet, Adapter, ActorSubclass };

// Define the PNP class directly here
export interface PnpInterface {
  config: GlobalPnpConfig;
  adapter: Adapter.Config | null;
  provider: Adapter.Interface | null;
  account: Wallet.Account | null;
  actorCache: Map<string, ActorSubclass<any>>;
  status: Adapter.Status;
  connect: (walletId?: string) => Promise<Wallet.Account | null>;
  disconnect: () => Promise<void>;
  getActor: <T>(options: Adapter.GetActorOptions) => ActorSubclass<T>;
  isAuthenticated: () => boolean;
  getEnabledWallets: () => Adapter.Config[];
}

export class PNP implements PnpInterface {
  config: ReturnType<typeof createPNPConfig>;
  adapter: Adapter.Config | null = null;
  provider: Adapter.Interface | null = null;
  account: Wallet.Account | null = null;
  actorCache: Map<string, ActorSubclass<any>> = new Map();
  status: Adapter.Status = Adapter.Status.INIT;

  constructor(config: GlobalPnpConfig = {}) {
    this.config = createPNPConfig(config);
    this.status = Adapter.Status.READY;
  }

  // Helper method to reset connection state
  private _resetState(): void {
    this.account = null;
    this.provider = null;
    this.adapter = null;
    this.actorCache.clear();
    localStorage.removeItem(this.adapter?.config?.localStorageKey);
    this.status = Adapter.Status.READY;
  }

  async connect(walletId?: string): Promise<Wallet.Account | null> {
    if (this.status === Adapter.Status.CONNECTING) return null;
    this.status = Adapter.Status.CONNECTING;
    let instance: Adapter.Interface | null = null;

    try {
      const targetWalletId =
        walletId || localStorage.getItem(this.adapter?.config?.localStorageKey);
      if (!targetWalletId) return null;
      if (!this.config.adapters[targetWalletId]) throw new Error(`Invalid adapter id: ${targetWalletId}.`);

      localStorage.setItem(this.adapter?.config?.localStorageKey, targetWalletId);
      const adapterInfo = this.config.adapters[targetWalletId];

      // Get adapter constructor args
      instance = new adapterInfo.adapter({
        adapter: adapterInfo,
        pnpConfig: this.config
      });
      const account = await instance.connect();
      this.account = account;
      this.adapter = adapterInfo;
      this.provider = instance;
      this.status = Adapter.Status.CONNECTED;
      return account;
    } catch (error) {
      console.warn(
        `[PNP] Connection failed for ${walletId || "stored wallet"}:`,
        error
      );
      if (instance) {
        try {
          await instance.disconnect();
        } catch (disconnectError) {
          console.warn("[PNP] Disconnect error:", disconnectError);
        }
      }
      this._resetState();
      this.status = Adapter.Status.ERROR;
      return null;
    } 
  }

  async disconnect(): Promise<void> {
    this.status = Adapter.Status.DISCONNECTING;
    try {
      if (this.provider) await this.provider.disconnect();
      this._resetState();
      this.status = Adapter.Status.DISCONNECTED;
    } catch (error) {
      console.warn("[PNP] Disconnect error:", error);
      this._resetState();
      this.status = Adapter.Status.ERROR;
    }
  }
  
  // Updated method with better type inference
  getActor<T>(
    options: Adapter.GetActorOptions
  ): ActorSubclass<T> {
    const { canisterId, idl, anon = false, requiresSigning = false } = options;

    if (anon) {
      return this.createAnonymousActor<T>(canisterId, idl);
    }

    if (!this.provider) {
      throw new Error(
        "Cannot create signed actor. No wallet provider connected."
      );
    }

    return this.provider.createActor<T>(canisterId, idl, { requiresSigning });
  }

  createAnonymousActor<T>(canisterId: string, idl: any): ActorSubclass<T> {
    const cacheKey = `anon-${canisterId}-${this.adapter?.id}`;
    const cachedActor = this.actorCache.get(cacheKey);
    if (cachedActor) return cachedActor;

    const actor = Actor.createActor<T>(idl, {
      agent: HttpAgent.createSync({
        host: this.config.hostUrl,
        verifyQuerySignatures: this.adapter?.config?.verifyQuerySignatures,
      }),
      canisterId,
    });

    this.actorCache.set(cacheKey, actor);
    return actor;
  }

  isAuthenticated(): boolean {
    return (
      this.adapter !== null &&
      this.provider !== null &&
      this.account !== null &&
      this.status === Adapter.Status.CONNECTED
    );
  }

  getEnabledWallets(): Adapter.Config[] {
    return Object.values(this.config.adapters).filter((wallet) => {
      // Check if the adapter is explicitly enabled in its config
      return wallet?.enabled !== false;
    });
  }
}

// Export the factory function and wallet list
export const createPNP = (config: GlobalPnpConfig = {}) => new PNP(config);
