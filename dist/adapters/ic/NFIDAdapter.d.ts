import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../../types/index.d';
import { BaseAdapter } from '../BaseAdapter';
import { NFIDAdapterConfig } from '../../types/AdapterConfigs';
export declare class NFIDAdapter extends BaseAdapter<NFIDAdapterConfig> implements Adapter.Interface {
    private agent;
    private identity;
    private sessionKey;
    private signerAgent;
    private signer;
    private transport;
    private storage;
    constructor(args: Adapter.ConstructorArgs);
    private clearStoredSession;
    private restoreFromStorage;
    openChannel(): Promise<void>;
    isConnected(): Promise<boolean>;
    getPrincipal(): Promise<string>;
    unwrapResponse: <T extends any>(response: any) => T;
    connect(): Promise<Wallet.Account>;
    undelegatedActor<T>(canisterId: string, idlFactory: any): ActorSubclass<T>;
    protected createActorInternal<T>(canisterId: string, idlFactory: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
