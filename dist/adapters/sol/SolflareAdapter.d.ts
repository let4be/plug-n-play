import { Adapter, Wallet } from '../../types/index.d';
import { Adapter as SolanaAdapter } from '@solana/wallet-adapter-base';
import { BaseSolAdapter, SplTokenBalance } from './BaseSolAdapter';
import { ActorSubclass } from '@dfinity/agent';
export declare class SolflareAdapter extends BaseSolAdapter {
    constructor(args: Adapter.ConstructorArgs);
    protected getSolanaAdapter(): Promise<SolanaAdapter>;
    protected setupWalletListeners(): void;
    protected removeWalletListeners(): void;
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
        anon: true;
    }): ActorSubclass<T>;
    getSolBalance(): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    getSplTokenBalances(): Promise<SplTokenBalance[]>;
}
