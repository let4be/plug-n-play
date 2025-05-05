import { Adapter, Wallet } from '../../types/index.d';
import { ActorSubclass, Identity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Adapter as SolanaAdapter } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
import { Ed25519KeyIdentity, DelegationIdentity } from '@dfinity/identity';
import { _SERVICE as SiwsProviderService } from '../../did/ic_siws_provider';
import { BaseSolAdapter } from './BaseSolAdapter';
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;
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
export declare class SolSiwsAdapter extends BaseSolAdapter {
    static supportedChains: Adapter.Chain[];
    protected _solanaAdapter: SolanaAdapter | null;
    protected state: Adapter.Status;
    protected identity: Identity | null;
    protected principal: Principal | null;
    protected solanaAddress: string | null;
    protected tokenListCache: Record<string, TokenInfo> | null;
    protected tokenPricesTimestamp: number;
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
    getSolanaAddress(): Promise<string>;
    getAddresses(): Promise<Adapter.Addresses>;
    getAccountId(): Promise<string>;
    createActor<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
        anon: true;
    }): ActorSubclass<T>;
    protected _getConnectedPublicKey(): Promise<PublicKey>;
    protected _fetchTokenPrice(tokenId: string): Promise<number | undefined>;
    protected _processTokenAccount(item: {
        pubkey: PublicKey;
        account: any;
    }): Promise<{
        mint: string;
        account: any;
    } | null>;
    protected _getTokenBalances(publicKey: PublicKey): Promise<{
        solAmount: number;
        solUsdValue?: number;
        tokenAccounts: readonly any[];
    }>;
    getSolBalance(): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    getSplTokenBalances(): Promise<SplTokenBalance[]>;
    protected createSiwsProviderActor(identity?: Identity): SiwsProviderActor;
    protected _signSiwsMessage(siwsMessage: any): Promise<string>;
    protected _prepareLogin(actor: SiwsProviderActor, address: string): Promise<any>;
    protected _generateSessionIdentity(): {
        sessionIdentity: Ed25519KeyIdentity;
        sessionPublicKeyDer: ArrayBuffer;
    };
    protected _loginWithSiws(actor: SiwsProviderActor, signature: string, address: string, sessionPublicKeyDer: ArrayBuffer, nonce: string): Promise<any>;
    protected _getSiwsDelegation(actor: SiwsProviderActor, address: string, sessionPublicKeyDer: ArrayBuffer, expiration: bigint): Promise<any>;
    protected _createDelegationIdentity(signedDelegation: any, sessionIdentity: Ed25519KeyIdentity, userCanisterPublicKeyDer: ArrayBuffer): DelegationIdentity;
    protected performSiwsLogin(address: string): Promise<{
        identity: Identity;
        principal: Principal;
    }>;
    /**
     * Fetches token metadata from the Solana token list
     * @returns A record mapping token addresses to their metadata
     */
    protected getTokenList(): Promise<Record<string, TokenInfo>>;
    /**
     * Fetches token prices from Jupiter API
     * @returns A map of token addresses to their USD prices
     */
    private getTokenPrices;
    protected _cleanupWalletConnectSession(): void;
}
export {};
