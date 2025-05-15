import { Adapter } from './types';
import { GlobalPnpConfig } from '.';
type AdapterUserOverride = Partial<Omit<Adapter.Config, 'id' | 'adapter' | 'config'>> & {
    config?: Partial<Adapter.Config['config']>;
    [key: string]: any;
};
export interface CreatePnpArgs {
    dfxNetwork?: string;
    replicaPort?: number;
    frontendPort?: number;
    solanaNetwork?: string;
    delegationTimeout?: bigint;
    delegationTargets?: string[];
    frontendCanisterId?: string;
    derivationOrigin?: string;
    fetchRootKey?: boolean;
    verifyQuerySignatures?: boolean;
    localStorageKey?: string;
    siwsProviderCanisterId?: string;
    adapters?: {
        [key: string]: AdapterUserOverride;
    };
}
export declare const defaultCreateArgs: {
    dfxNetwork: string;
    replicaPort: number;
    frontendPort: number;
    solanaNetwork: string;
    delegationTimeout: bigint;
    delegationTargets: any[];
    localStorageKey: string;
    fetchRootKey: any;
    verifyQuerySignatures: any;
    adapters: {
        [x: string]: Adapter.Config;
    };
};
export type FullPNPConfig = typeof defaultCreateArgs;
export declare function createPNPConfig(config?: CreatePnpArgs): GlobalPnpConfig;
export {};
