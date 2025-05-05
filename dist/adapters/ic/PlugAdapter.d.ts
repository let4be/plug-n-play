import { ActorSubclass } from '@dfinity/agent';
import { Adapter, Wallet } from '../../types/index.d';
import { BaseIcAdapter } from './BaseIcAdapter';
export declare class PlugAdapter extends BaseIcAdapter implements Adapter.Interface {
    private readyState;
    private _connectionState;
    private _connectionStateTimestamp;
    private _connectionStateUpdateInterval;
    constructor(args: Adapter.ConstructorArgs);
    private initPlug;
    isAvailable(): Promise<boolean>;
    connect(): Promise<Wallet.Account>;
    getPrincipal(): Promise<string>;
    protected createActorInternal<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    private updateConnectionState;
    isConnected(): Promise<boolean>;
    private handleConnectionUpdate;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
