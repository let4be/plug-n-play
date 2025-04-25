import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from './types';
import { createPNPConfig, PNPConfig } from './config';
export { createPNPConfig, type PNPConfig };
export type { Wallet, Adapter, ActorSubclass };
export declare class PNP {
    account: Wallet.Account | null;
    activeWallet: Adapter.Info | null;
    provider: Adapter.Interface | null;
    config: ReturnType<typeof createPNPConfig>;
    actorCache: Map<string, ActorSubclass<any>>;
    isConnecting: boolean;
    adapters: Record<string, Adapter.Info>;
    constructor(config?: PNPConfig);
    private getAdapterConfig;
    private mergeAdapterConfig;
    private _resetState;
    connect(walletId?: string): Promise<Wallet.Account | null>;
    getAdapter(walletId: string): Adapter.Interface;
    disconnect(): Promise<void>;
    getActor<T>(canisterId: string, idl: any, options?: {
        anon?: boolean;
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    createAnonymousActor<T>(canisterId: string, idl: any): ActorSubclass<T>;
    isWalletConnected(): boolean;
    getEnabledWallets(): Adapter.Info[];
}
export declare const createPNP: (config?: PNPConfig) => PNP;
