import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../../types/index.d';
/**
 * Abstract base class for adapters implementing Adapter.Interface
 */
export declare abstract class BaseIcAdapter implements Adapter.Interface {
    abstract walletName: string;
    abstract logo: string;
    static supportedChains: Adapter.Chain[];
    protected state: Adapter.Status;
    protected config: Wallet.PNPConfig;
    protected actorCache: Map<string, ActorSubclass<any>>;
    constructor(config: Wallet.PNPConfig);
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
        anon?: boolean;
    }): ActorSubclass<T>;
    protected abstract createActorInternal<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    disconnect(): Promise<void>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
