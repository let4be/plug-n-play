import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter, GlobalPnpConfig } from '../../types/index.d';
/**
 * Abstract base class for adapters implementing Adapter.Interface
 */
export declare abstract class BaseIcAdapter implements Adapter.Interface {
    static supportedChains: Adapter.Chain[];
    protected state: Adapter.Status;
    protected config: GlobalPnpConfig;
    protected adapter: Adapter.Config;
    protected actorCache: Map<string, ActorSubclass<any>>;
    constructor(args: Adapter.ConstructorArgs);
    protected setState(newState: Adapter.Status): void;
    getState(): Adapter.Status;
    getAccountId(): Promise<string>;
    abstract isAvailable(): Promise<boolean>;
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
