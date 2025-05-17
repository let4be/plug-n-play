import { ActorSubclass } from '@dfinity/agent';
import { Adapter, GlobalPnpConfig } from './types/index.d';
import { AdapterConfig, GetActorOptions } from './types/AdapterTypes';
import { WalletAccount } from './types/WalletTypes';
import { createPNPConfig } from './config';
import { PnpState, StateResponse, StateTransition } from './managers/StateManager';
import { PnpEventEmitter, PnpEventType, PnpEvent, PnpEventListener } from './events';
export { createPNPConfig, PnpState, PnpEventType };
export type { GlobalPnpConfig, PnpEventListener, StateResponse, StateTransition, PnpEvent };
export type { ActorSubclass, Adapter, GetActorOptions };
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
export declare class PNP implements PnpInterface {
    private configManager;
    private connectionManager;
    private actorManager;
    private errorManager;
    private stateManager;
    private eventEmitter;
    private static adapterRegistry;
    /**
     * Register a new adapter globally. Call before PNP instantiation to make available to all instances.
     * @param id Adapter id (unique key)
     * @param config AdapterConfig
     */
    static registerAdapter(id: string, config: AdapterConfig): void;
    /**
     * Unregister an adapter by id.
     * @param id Adapter id
     */
    static unregisterAdapter(id: string): void;
    /**
     * Get all registered adapters.
     */
    static getRegisteredAdapters(): Record<string, AdapterConfig>;
    constructor(config?: GlobalPnpConfig);
    openChannel(): Promise<void>;
    on<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    off<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    emit<T>(event: PnpEventType, data: T): void;
    removeAllListeners(event?: PnpEventType): void;
    get config(): GlobalPnpConfig;
    get adapter(): AdapterConfig;
    get provider(): import('./types/AdapterTypes').AdapterInterface;
    get account(): WalletAccount;
    get status(): import('./types/AdapterTypes').AdapterStatus;
    connect(walletId?: string): Promise<WalletAccount>;
    disconnect(): Promise<void>;
    getActor<T>(options: GetActorOptions): ActorSubclass<T>;
    isAuthenticated(): boolean;
    getEnabledWallets(): AdapterConfig[];
}
export declare const createPNP: (config?: GlobalPnpConfig) => PNP;
