import { Adapter, Wallet } from '../../types/index.d';
import { ActorSubclass } from '@dfinity/agent';
import { BaseAdapter } from '../BaseAdapter';
import { SiwsAdapterConfig } from '../../types/AdapterConfigs';
import { SplTokenBalance } from '../../managers/SplTokenManager';
export declare class SiwsAdapter extends BaseAdapter<SiwsAdapterConfig> implements Adapter.Interface {
    walletName: string;
    logo: string;
    readonly id: string;
    static supportedChains: Adapter.Chain[];
    protected state: Adapter.Status;
    private solanaAdapter;
    private solanaConnection;
    private identity;
    private principal;
    private solanaAddress;
    private tokenManager;
    private storage;
    private sessionKey;
    constructor(args: Adapter.ConstructorArgs & {
        config: SiwsAdapterConfig;
    });
    private restoreFromStorage;
    private clearStoredSession;
    private createSolanaAdapter;
    private setupWalletListeners;
    private removeWalletListeners;
    private handleSolanaConnect;
    private handleSolanaDisconnect;
    private handleSolanaError;
    isConnected(): Promise<boolean>;
    connect(): Promise<Wallet.Account>;
    disconnect(): Promise<void>;
    getPrincipal(): Promise<string>;
    getAccountId(): Promise<string>;
    getSolanaAddress(): Promise<string>;
    getAddresses(): Promise<Adapter.Addresses>;
    protected createActorInternal<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    getSolBalance(): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    getSplTokenBalances(): Promise<SplTokenBalance[]>;
    private createSiwsProviderActor;
    private _prepareLogin;
    private _signSiwsMessage;
    private _generateSessionIdentity;
    private _loginWithSiws;
    private _getSiwsDelegation;
    private _createDelegationIdentity;
    private performSiwsLogin;
}
