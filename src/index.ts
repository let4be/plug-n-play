import { ActorSubclass } from "@dfinity/agent";
import { Adapter, GlobalPnpConfig } from "./types/index.d";
import { AdapterConfig, GetActorOptions } from './types/AdapterTypes';
import { WalletAccount } from './types/WalletTypes';
import { createPNPConfig } from "./config";
import { ConnectionManager } from './managers/ConnectionManager';
import { ActorManager } from './managers/ActorManager';
import { ConfigManager } from './managers/ConfigManager';
import { ErrorManager, LogLevel } from './managers/ErrorManager';
import { StateManager, PnpState, StateResponse, StateTransition } from './managers/StateManager';
import { EventEmitter, PnpEventEmitter, PnpEventType } from './events';
import type { PnpEvent, PnpEventListener } from './events';

// Re-export config types and creation function for easier consumption
export { createPNPConfig, PnpState, PnpEventType };
export type { GlobalPnpConfig, PnpEventListener, StateResponse, StateTransition, PnpEvent };
export type { ActorSubclass, Adapter, GetActorOptions};

// Define the PNP class directly here
export interface PnpInterface extends PnpEventEmitter {
  config: GlobalPnpConfig;
  adapter: AdapterConfig | null;
  provider: any;
  account: WalletAccount | null;
  status: any;
  connect: (walletId?: string) => Promise<WalletAccount | null>;
  disconnect: () => Promise<void>;
  getActor: <T>(options: any) => ActorSubclass<T>;
  isAuthenticated: () => boolean;
  getEnabledWallets: () => AdapterConfig[];
}

export class PNP implements PnpInterface {
  private configManager: ConfigManager;
  private connectionManager: ConnectionManager;
  private actorManager: ActorManager;
  private errorManager: ErrorManager;
  private stateManager: StateManager;
  private eventEmitter: PnpEventEmitter;

  // Static registry for adapters
  private static adapterRegistry: Record<string, AdapterConfig> = {};

  /**
   * Register a new adapter globally. Call before PNP instantiation to make available to all instances.
   * @param id Adapter id (unique key)
   * @param config AdapterConfig
   */
  static registerAdapter(id: string, config: AdapterConfig) {
    PNP.adapterRegistry[id] = config;
  }

  /**
   * Unregister an adapter by id.
   * @param id Adapter id
   */
  static unregisterAdapter(id: string) {
    delete PNP.adapterRegistry[id];
  }

  /**
   * Get all registered adapters.
   */
  static getRegisteredAdapters(): Record<string, AdapterConfig> {
    return { ...PNP.adapterRegistry };
  }

  constructor(config: GlobalPnpConfig = {}) {
    // Merge registered adapters with config.adapters
    const mergedAdapters = {
      ...PNP.adapterRegistry,
      ...(config.adapters || {})
    };
    const mergedConfig = { ...config, adapters: mergedAdapters };
    
    this.eventEmitter = new EventEmitter();
    this.errorManager = new ErrorManager(
      this.eventEmitter,
      config.logLevel || LogLevel.INFO
    );
    this.stateManager = new StateManager(
      this.eventEmitter,
      this.errorManager,
      {
        key: config.persistenceKey || 'pnp-state',
        storage: config.storage,
        maxHistorySize: config.maxStateHistorySize,
        autoRecover: config.autoRecoverState,
        validateOnLoad: config.validateStateOnLoad
      }
    );

    this.configManager = new ConfigManager(mergedConfig);
    const finalConfig = this.configManager.getConfig();
    this.connectionManager = new ConnectionManager(finalConfig, this.errorManager);
    this.actorManager = new ActorManager(finalConfig, null);

    // Keep actorManager's provider in sync with connectionManager
    this.connectionManager.on(PnpEventType.CONNECTED, async () => {
      try {
        await this.stateManager.transitionTo(PnpState.CONNECTED);
        this.actorManager.setProvider(this.connectionManager.provider);
        this.emit(PnpEventType.CONNECTED, { account: this.account });
      } catch (error) {
        this.errorManager.handleError(error as Error);
      }
    });

    this.connectionManager.on(PnpEventType.DISCONNECTED, async () => {
      try {
        await this.stateManager.transitionTo(PnpState.DISCONNECTED);
        this.actorManager.setProvider(null);
        this.actorManager.clearCache();
        this.emit(PnpEventType.DISCONNECTED, {});
      } catch (error) {
        this.errorManager.handleError(error as Error);
      }
    });

    // Initialize state
    this.stateManager.transitionTo(PnpState.INITIALIZED).catch(error => {
      this.errorManager.handleError(error);
    });
  }

  async openChannel(): Promise<void> {
      await this.connectionManager.openChannel();
  }

  // Event emitter methods
  on<T>(event: PnpEventType, listener: PnpEventListener<T>): void {
    this.eventEmitter.on(event, listener);
  }

  off<T>(event: PnpEventType, listener: PnpEventListener<T>): void {
    this.eventEmitter.off(event, listener);
  }

  emit<T>(event: PnpEventType, data: T): void {
    this.eventEmitter.emit(event, data);
  }

  removeAllListeners(event?: PnpEventType): void {
    this.eventEmitter.removeAllListeners(event);
  }

  get config() {
    return this.configManager.getConfig();
  }

  get adapter() {
    return this.connectionManager.adapter;
  }

  get provider() {
    return this.connectionManager.provider;
  }

  get account() {
    return this.connectionManager.account;
  }

  get status() {
    return this.connectionManager.status;
  }

  async connect(walletId?: string) {
    try {
      if (this.stateManager.getCurrentState() === PnpState.CONNECTED) {
        // Already connected, return current account or handle as appropriate
        this.errorManager.info("Already connected.");
        return this.account;
      }
      await this.stateManager.transitionTo(PnpState.CONNECTING);
      const account = await this.connectionManager.connect(walletId);
      this.actorManager.setProvider(this.connectionManager.provider);
      return account;
    } catch (error) {
      await this.stateManager.transitionTo(PnpState.ERROR, { error });
      this.errorManager.handleError(error as Error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.stateManager.transitionTo(PnpState.DISCONNECTING);
      await this.connectionManager.disconnect();
      this.actorManager.setProvider(null);
      this.actorManager.clearCache();
    } catch (error) {
      await this.stateManager.transitionTo(PnpState.ERROR, { error });
      this.errorManager.handleError(error as Error);
      throw error;
    }
  }

  getActor<T>(options: GetActorOptions): ActorSubclass<T> {
    return this.actorManager.getActor<T>(options);
  }

  isAuthenticated(): boolean {
    return this.connectionManager.isAuthenticated();
  }

  getEnabledWallets(): AdapterConfig[] {
    return Object.entries(this.config.adapters)
      .filter(([_, wallet]) => wallet?.enabled !== false)
      .map(([id, wallet]) => ({
        ...wallet,
        id: wallet.id || id // Ensure id is always present
      })) as AdapterConfig[];
  }
}

// Export the factory function and wallet list
export const createPNP = (config: GlobalPnpConfig = {}) => new PNP(config);
