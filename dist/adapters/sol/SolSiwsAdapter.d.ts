import { Adapter, Wallet } from '../../types/index.d';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
export declare class SolSiwsAdapter implements Adapter.Interface {
    walletName: string;
    logo: string;
    readonly id: string;
    private config;
    private state;
    private solanaAdapter;
    private solanaConnection;
    private identity;
    private principal;
    private solanaAddress;
    constructor(adapterInfo: Adapter.Info, pnpConfig: Wallet.PNPConfig);
    private setupWalletListeners;
    private removeWalletListeners;
    private handleSolanaConnect;
    private handleSolanaDisconnect;
    private handleSolanaError;
    isAvailable(): Promise<boolean>;
    isConnected(): Promise<boolean>;
    connect(): Promise<Wallet.Account>;
    disconnect(): Promise<void>;
    getPrincipal(): Promise<Principal>;
    getAccountId(): Promise<string>;
    createActor<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    private createSiwsProviderActor;
    private performSiwsLogin;
}
