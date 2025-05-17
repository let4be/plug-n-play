import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../../types/index.d';
import { BaseAdapter } from '../BaseAdapter';
import { OisyAdapterConfig } from '../../types/AdapterConfigs';
export declare class OisyAdapter extends BaseAdapter<OisyAdapterConfig> implements Adapter.Interface {
    private static readonly OISY_PRINCIPAL_KEY;
    private signer;
    private agent;
    private signerAgent;
    private transport;
    constructor(args: Adapter.ConstructorArgs);
    openChannel(): Promise<void>;
    isConnected(): Promise<boolean>;
    getPrincipal(): Promise<string>;
    getAccountId(): Promise<string>;
    connect(): Promise<Wallet.Account>;
    protected createActorInternal<T>(canisterId: string, idlFactory: any): ActorSubclass<T>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
