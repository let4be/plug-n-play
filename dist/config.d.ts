import { Adapter } from './types';
export interface PNPConfig {
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
        [key: string]: Partial<Omit<Adapter.Info, 'config'>> & {
            config?: Partial<Adapter.Info['config']>;
        };
    };
}
export declare const defaultPNPConfig: Required<Omit<PNPConfig, 'adapters' | 'siwsProviderCanisterId'>> & {
    adapters: Record<string, Adapter.Info>;
    siwsProviderCanisterId: string | undefined;
};
export type FullPNPConfig = typeof defaultPNPConfig;
export declare function createPNPConfig(config?: PNPConfig): FullPNPConfig;
