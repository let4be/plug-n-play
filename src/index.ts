import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import type { Wallet, Adapter } from "./types";
import { createPNPConfig, type PNPConfig } from "./config";

// Re-export config types and creation function for easier consumption
export { createPNPConfig, type PNPConfig };
// Re-export core types
export type { Wallet, Adapter, ActorSubclass };

// Define the PNP class directly here
export class PNP {
  account: Wallet.Account | null = null;
  activeWallet: Adapter.Info | null = null;
  provider: Adapter.Interface | null = null;
  config: ReturnType<typeof createPNPConfig>;
  actorCache: Map<string, ActorSubclass<any>> = new Map();
  isConnecting: boolean = false;
  adapters: Record<string, Adapter.Info>;

  constructor(config: PNPConfig = {}) {
    this.config = createPNPConfig(config);
    this.adapters = this.config.adapters || {};
  }

  private getAdapterConfig(adapterId: string): Adapter.Info {
    return this.config.adapters?.[adapterId];
  }

  private mergeAdapterConfig(adapterId: string): Wallet.PNPConfig {
    const specificConfig = this.getAdapterConfig(adapterId);
    return {
      ...this.config,
      ...specificConfig,
    };
  }

  async connect(walletId?: string): Promise<Wallet.Account | null> {
    if (this.isConnecting) return null;
    this.isConnecting = true;
    let instance: Adapter.Interface | null = null;

    try {
      const targetWalletId =
        walletId || localStorage.getItem(this.config.localStorageKey);
      if (!targetWalletId) return null;

      localStorage.setItem(this.config.localStorageKey, targetWalletId);

      const adapterInfo = this.adapters[targetWalletId];
      if (!adapterInfo)
        throw new Error(
          `Wallet ${targetWalletId} not found in provided adapters`
        );

      const adapterConfig = this.mergeAdapterConfig(targetWalletId);

      instance = new adapterInfo.adapter(adapterInfo, this.config);
      const account = await instance.connect();

      this.account = account;
      this.activeWallet = adapterInfo;
      this.provider = instance;
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
      this.account = null;
      this.provider = null;
      this.activeWallet = null;
      localStorage.removeItem(this.config.localStorageKey);
      return null;
    } finally {
      this.isConnecting = false;
    }
  }

  getAdapter(walletId: string): Adapter.Interface {
    const wallet = this.adapters[walletId];
    if (!wallet)
      throw new Error(`Wallet ${walletId} not found in provided adapters`);
    const adapterConfig = this.mergeAdapterConfig(walletId);
    return new wallet.adapter(wallet, this.config);
  }

  async disconnect(): Promise<void> {
    this.isConnecting = false;
    try {
      if (this.provider) await this.provider.disconnect();
      this.account = null;
      this.provider = null;
      this.activeWallet = null;
      this.actorCache.clear();
      localStorage.removeItem(this.config.localStorageKey);
    } catch (error) {
      console.warn("[PNP] Disconnect error:", error);
      this.account = null;
      this.provider = null;
      this.activeWallet = null;
      this.actorCache.clear();
      localStorage.removeItem(this.config.localStorageKey);
    } finally {
      this.isConnecting = false;
    }
  }

  getActor<T>(
    canisterId: string,
    idl: any,
    options?: {
      anon?: boolean;
      requiresSigning?: boolean;
    }
  ): ActorSubclass<T> {
    const { anon = false, requiresSigning = true } = options || {};

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
    const cacheKey = `anon-${canisterId}`;
    const cachedActor = this.actorCache.get(cacheKey);
    if (cachedActor) return cachedActor;

    const actor = Actor.createActor<T>(idl, {
      agent: HttpAgent.createSync({
        host: this.config.hostUrl,
        verifyQuerySignatures: this.config.verifyQuerySignatures,
      }),
      canisterId,
    });

    this.actorCache.set(cacheKey, actor);
    return actor;
  }

  isWalletConnected(): boolean {
    return (
      this.activeWallet !== null &&
      this.provider !== null &&
      this.account !== null
    );
  }

  getEnabledWallets(): Adapter.Info[] {
    return Object.values(this.adapters).filter((wallet) => {
      const adapterConfig = this.config.adapters[wallet.id];
      // Enabled if explicitly true or not defined (defaults to true implicitly)
      return adapterConfig?.enabled !== false;
    });
  }
}

// Export the factory function and wallet list
export const createPNP = (config: PNPConfig = {}) => new PNP(config);
