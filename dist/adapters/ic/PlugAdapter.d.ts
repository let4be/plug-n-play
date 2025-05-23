import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Adapter, Wallet } from '../../types/index.d';
import { BaseIcAdapter } from './BaseIcAdapter';
export declare class PlugAdapter extends BaseIcAdapter implements Adapter.Interface {
    static readonly logo: string;
    static readonly walletName: string;
    walletName: string;
    logo: string;
    private readyState;
    private _connectionState;
    private _connectionStateTimestamp;
    private _connectionStateUpdateInterval;
    constructor(config: Wallet.PNPConfig);
    private initPlug;
    isAvailable(): Promise<boolean>;
    connect(): Promise<Wallet.Account>;
    getPrincipal(): Promise<Principal>;
    protected createActorInternal<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    private updateConnectionState;
    isConnected(): Promise<boolean>;
    private handleConnectionUpdate;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
