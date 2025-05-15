import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../../types/index.d';
import { BaseAdapter } from '../BaseAdapter';
import { IIAdapterConfig } from '../../types/AdapterConfigs';
export declare class IIAdapter extends BaseAdapter<IIAdapterConfig> implements Adapter.Interface {
    private authClient;
    private agent;
    constructor(args: {
        adapter: any;
        config: IIAdapterConfig;
    });
    private initializeAuthClient;
    private initAgent;
    private getIdentityProvider;
    connect(): Promise<Wallet.Account>;
    private _continueLogin;
    isConnected(): Promise<boolean>;
    protected createActorInternal<T>(canisterId: string, idl: any, options: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    getPrincipal(): Promise<string>;
    private refreshLogin;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
