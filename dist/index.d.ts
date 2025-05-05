import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter, GlobalPnpConfig } from './types/index.d';
import { createPNPConfig } from './config';
export { createPNPConfig, type GlobalPnpConfig };
export type { Wallet, Adapter, ActorSubclass };
export interface PnpInterface {
    config: GlobalPnpConfig;
    adapter: Adapter.Config | null;
    provider: Adapter.Interface | null;
    account: Wallet.Account | null;
    actorCache: Map<string, ActorSubclass<any>>;
    status: Adapter.Status;
    connect: (walletId?: string) => Promise<Wallet.Account | null>;
    disconnect: () => Promise<void>;
    getActor: <T>(options: Adapter.GetActorOptions) => ActorSubclass<T>;
    isAuthenticated: () => boolean;
    getEnabledWallets: () => Adapter.Config[];
}
export declare class PNP implements PnpInterface {
    config: ReturnType<typeof createPNPConfig>;
    adapter: Adapter.Config | null;
    provider: Adapter.Interface | null;
    account: Wallet.Account | null;
    actorCache: Map<string, ActorSubclass<any>>;
    status: Adapter.Status;
    constructor(config?: GlobalPnpConfig);
    private _resetState;
    connect(walletId?: string): Promise<Wallet.Account | null>;
    disconnect(): Promise<void>;
    getActor<T>(options: Adapter.GetActorOptions): ActorSubclass<T>;
    createAnonymousActor<T>(canisterId: string, idl: any): ActorSubclass<T>;
    isAuthenticated(): boolean;
    getEnabledWallets(): Adapter.Config[];
}
export declare const createPNP: (config?: GlobalPnpConfig) => PNP;
