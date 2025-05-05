import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../../types/index.d';
import { BaseIcAdapter } from './BaseIcAdapter';
export declare class IIAdapter extends BaseIcAdapter implements Adapter.Interface {
    private authClient;
    private agent;
    constructor(args: Adapter.ConstructorArgs);
    private initAgent;
    isAvailable(): Promise<boolean>;
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
