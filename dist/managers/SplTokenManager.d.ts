import { Connection, PublicKey } from '@solana/web3.js';
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
export declare class TokenManager {
    private connection;
    private tokenListCache;
    private tokenPricesTimestamp;
    constructor(connection: Connection);
    getTokenPrices(): Promise<Record<string, number>>;
    getTokenList(): Promise<Record<string, TokenInfo>>;
    getSolBalance(publicKey: PublicKey): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    getSplTokenBalances(publicKey: PublicKey): Promise<SplTokenBalance[]>;
}
