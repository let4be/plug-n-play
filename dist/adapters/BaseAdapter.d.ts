import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../types/index.d';
import { AdapterSpecificConfig } from '../types/AdapterConfigs';
import { ErrorManager } from '../managers/ErrorManager';
/**
 * Abstract base class for adapters implementing Adapter.Interface
 */
export declare abstract class BaseAdapter<T extends AdapterSpecificConfig = AdapterSpecificConfig> implements Adapter.Interface {
    static supportedChains: Adapter.Chain[];
    protected state: Adapter.Status;
    protected config: T;
    protected adapter: Adapter.Config;
    protected actorCache: Map<string, ActorSubclass<any>>;
    protected logger: ErrorManager;
    constructor(args: Adapter.ConstructorArgs & {
        config: T;
        logger?: ErrorManager;
    });
    protected setState(newState: Adapter.Status): void;
    openChannel(): Promise<void>;
    getState(): Adapter.Status;
    getAccountId(): Promise<string>;
    abstract isConnected(): Promise<boolean>;
    abstract connect(): Promise<Wallet.Account>;
    abstract getPrincipal(): Promise<string>;
    getAddresses(): Promise<Adapter.Addresses>;
    createActor<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    protected abstract createActorInternal<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    disconnect(): Promise<void>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
