import { Adapter } from './types';
import { GlobalPnpConfig } from '.';
type AdapterUserOverride = Partial<Omit<Adapter.Config, 'id' | 'adapter' | 'config'>> & {
    config?: Partial<Adapter.Config['config']>;
    [key: string]: any;
};
export interface CreatePnpArgs {
    dfxNetwork?: string;
    hostUrl?: string;
    delegationTimeout?: bigint;
    delegationTargets?: string[];
    derivationOrigin?: string;
    fetchRootKeys?: boolean;
    verifyQuerySignatures?: boolean;
    localStorageKey?: string;
    siwsProviderCanisterId?: string;
    adapters?: {
        [key: string]: AdapterUserOverride;
    };
}
export declare const defaultCreateArgs: {
    dfxNetwork: string;
    hostUrl: string;
    delegationTimeout: bigint;
    delegationTargets: any[];
    derivationOrigin: string;
    fetchRootKeys: boolean;
    verifyQuerySignatures: boolean;
    localStorageKey: string;
    siwsProviderCanisterId: any;
    adapters: {
        [x: string]: Adapter.Config;
    };
};
export type FullPNPConfig = typeof defaultCreateArgs;
export declare function createPNPConfig(config?: CreatePnpArgs): GlobalPnpConfig;
export {};
