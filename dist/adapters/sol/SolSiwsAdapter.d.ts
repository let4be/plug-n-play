import { Adapter, Wallet } from '../../types/index.d';
import { ActorSubclass } from '@dfinity/agent';
export interface TokenInfo {
    symbol: string;
    name: string;
    logoURI?: string;
    decimals: number;
    address: string;
    price?: number;
}
export interface SplTokenBalance {
    mint: string;
    amount: string;
    decimals: number;
    uiAmount: number;
    symbol?: string;
    name?: string;
    logo?: string;
    usdValue?: number;
}
export declare class SolSiwsAdapter implements Adapter.Interface {
    walletName: string;
    logo: string;
    readonly id: string;
    static supportedChains: Adapter.Chain[];
    private config;
    private state;
    private solanaAdapter;
    private solanaConnection;
    private identity;
    private principal;
    private solanaAddress;
    private tokenListCache;
    private tokenPricesTimestamp;
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
    getPrincipal(): Promise<string>;
    getAccountId(): Promise<string>;
    getSolanaAddress(): Promise<string>;
    getAddresses(): Promise<Adapter.Addresses>;
    createActor<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    /**
     * Fetches token prices from Jupiter API
     * @returns A map of token addresses to their USD prices
     */
    private getTokenPrices;
    /**
     * Fetches token metadata from the Solana token list
     * @returns A record mapping token addresses to their metadata
     */
    private getTokenList;
    /**
     * Fetches the native SOL balance for the connected wallet with USD value.
     * @returns The balance in SOL (not lamports) and USD value.
     * @throws If the wallet is not connected or the public key is unavailable.
     */
    getSolBalance(): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    /**
     * Fetches the balances of all SPL tokens owned by the connected wallet.
     * @returns An array of SplTokenBalance objects.
     * @throws If the wallet is not connected or the public key is unavailable.
     */
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
