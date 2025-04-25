import { Adapter } from './types';
import { ICAdapters } from './adapters/ic'; // Removed defaultICAdapterConfigs import
import { SolAdapters } from './adapters/sol'; // Added import for SolAdapters

// Main configuration for the PNP library
export interface PNPConfig {
  dfxNetwork?: string; // Useful for determining dev environment
  hostUrl?: string;
  delegationTimeout?: bigint;
  delegationTargets?: string[];
  derivationOrigin?: string;
  fetchRootKeys?: boolean; // Common agent setting
  verifyQuerySignatures?: boolean; // Common agent setting
  localStorageKey?: string;
  siwsProviderCanisterId?: string; // Add SIWS provider Canister ID here
  // Allow partial overrides for Adapter.Info, including its nested config
  adapters?: { [key: string]: Partial<Omit<Adapter.Info, 'config'>> & { config?: Partial<Adapter.Info['config']> } };
}

// Default values for the main configuration
// Update the type to reflect that 'adapters' now holds config and removed adapterConfigs
export const defaultPNPConfig: Required<Omit<PNPConfig, 'adapters' | 'siwsProviderCanisterId'>> & {
  adapters: Record<string, Adapter.Info>; // 'adapters' now holds the complete, configured adapter info
  siwsProviderCanisterId: string | undefined; // Add default value type
} = {
  // Global defaults
  hostUrl: "https://icp0.io",
  delegationTimeout: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000), // 1 day
  delegationTargets: [],
  derivationOrigin: typeof window !== 'undefined' ? window.location.origin : "", // Default to browser origin
  dfxNetwork: "ic",
  fetchRootKeys: false,
  verifyQuerySignatures: true,
  localStorageKey: "pnpConnectedWallet",
  siwsProviderCanisterId: undefined, // Default to undefined
  adapters: {
    ...ICAdapters,
    ...SolAdapters, // Merge SolAdapters into the defaults
  },
};

// Define the return type more explicitly to include adapters (which now contain config)
export type FullPNPConfig = typeof defaultPNPConfig;

// Function to create a complete configuration object by merging user input with defaults
export function createPNPConfig(config: PNPConfig = {}): FullPNPConfig { 
  const mergedAdapters = { ...defaultPNPConfig.adapters };

  if (config.adapters) {
    for (const adapterId in config.adapters) {
      const userAdapterOverride = config.adapters[adapterId];
      if (!userAdapterOverride) continue; // Skip if override is null/undefined

      const defaultAdapterInfo = mergedAdapters[adapterId];

      if (!defaultAdapterInfo) {
        // Handle case where user provides an adapter ID not in defaults
        console.warn(`[PNP Config] Adapter ID '${adapterId}' provided by user not found in defaults. Skipping merge for this adapter.`);
        // Optionally, you could attempt to construct a default-less adapter info here,
        // but it's safer to warn and potentially skip if the base adapter is unknown.
        continue;
      }

      // Perform a more robust merge
      mergedAdapters[adapterId] = {
        // Start with default Adapter.Info properties (id, logo, name, adapter constructor)
        ...defaultAdapterInfo,
        // Override top-level Adapter.Info properties from user (like enabled)
        // Use nullish coalescing to ensure user's value is taken if provided
        id: userAdapterOverride.id ?? defaultAdapterInfo.id,
        logo: userAdapterOverride.logo ?? defaultAdapterInfo.logo,
        walletName: userAdapterOverride.walletName ?? defaultAdapterInfo.walletName,
        adapter: userAdapterOverride.adapter ?? defaultAdapterInfo.adapter,
        enabled: userAdapterOverride.enabled ?? defaultAdapterInfo.enabled,
        // Deep merge the 'config' object explicitly
        config: {
          ...defaultAdapterInfo.config,      // Start with default config
          ...(userAdapterOverride.config), // Override with user's partial config
        },
      };
    }
  }

  // Merge global settings: User's global settings override defaults
  const mergedConfig: FullPNPConfig = {
    ...defaultPNPConfig,
    ...config,
    adapters: mergedAdapters, // Use the adapters map with refined merging
  };

  return mergedConfig;
}
