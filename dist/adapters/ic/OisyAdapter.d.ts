import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../../types/index.d';
import { BaseIcAdapter } from './BaseIcAdapter';
export declare class OisyAdapter extends BaseIcAdapter implements Adapter.Interface {
    private static readonly TRANSPORT_CONFIG;
    private static readonly OISY_PRINCIPAL_KEY;
    private signer;
    private agent;
    private signerAgent;
    private transport;
    static readonly logo: string;
    static readonly walletName: string;
    walletName: string;
    logo: string;
    constructor(config: Wallet.PNPConfig);
    isAvailable(): Promise<boolean>;
    isConnected(): Promise<boolean>;
    getPrincipal(): Promise<string>;
    getAccountId(): Promise<string>;
    connect(): Promise<Wallet.Account>;
    protected createActorInternal<T>(canisterId: string, idlFactory: any): ActorSubclass<T>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
