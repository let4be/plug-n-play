import { Adapter, Wallet } from '../../types/index.d';
import { Identity, ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { WalletAdapterNetwork, Adapter as SolanaAdapter } from '@solana/wallet-adapter-base';
import { Connection, PublicKey } from '@solana/web3.js';
import { Ed25519KeyIdentity, DelegationIdentity } from '@dfinity/identity';
import { _SERVICE as SiwsProviderService } from '../../did/ic_siws_provider';
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;
type SignatureRequiredCallback = (adapterConfig: Adapter.Config) => void;
type SignatureCompleteCallback = (adapterConfig: Adapter.Config) => void;
export interface ParsedTokenAccount {
    type: string;
    info: {
        mint: string;
        tokenAmount: {
            amount: string;
            decimals: number;
            uiAmount: number | null;
        };
    };
}
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
export declare abstract class BaseSolAdapter implements Adapter.Interface {
    walletName: string;
    logo: string;
    readonly id: string;
    static supportedChains: Adapter.Chain[];
    protected adapterConfig: Adapter.Config;
    protected solanaNetwork: WalletAdapterNetwork;
    protected solanaConnection: Connection;
    protected _solanaAdapter: SolanaAdapter | null;
    protected state: Adapter.Status;
    protected identity: Identity | null;
    protected principal: Principal | null;
    protected solanaAddress: string | null;
    protected tokenListCache: Record<string, TokenInfo> | null;
    protected tokenPricesTimestamp: number;
    protected onSignatureRequired?: SignatureRequiredCallback;
    protected onSignatureComplete?: SignatureCompleteCallback;
    constructor(args: Adapter.ConstructorArgs);
    protected abstract getSolanaAdapter(): Promise<SolanaAdapter>;
    protected abstract setupWalletListeners(): void;
    protected abstract removeWalletListeners(): void;
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
    protected getTokenList(): Promise<Record<string, TokenInfo>>;
    getAccountId(): Promise<string>;
    abstract isAvailable(): Promise<boolean>;
    abstract isConnected(): Promise<boolean>;
    abstract connect(): Promise<Wallet.Account>;
    abstract disconnect(): Promise<void>;
    abstract getPrincipal(): Promise<string>;
    abstract getSolanaAddress(): Promise<string>;
    abstract getAddresses(): Promise<Adapter.Addresses>;
    abstract createActor<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
        anon: true;
    }): ActorSubclass<T>;
    abstract getSolBalance(): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    abstract getSplTokenBalances(): Promise<SplTokenBalance[]>;
}
export {};
