import { Adapter } from "./types";
import { Adapters } from "./adapters"; // Removed defaultICAdapterConfigs import
import { GlobalPnpConfig } from ".";

// Type for user-provided adapter overrides
// Allows overriding top-level metadata (enabled, name, logo) and specific config properties.
// Also allows passing adapter-specific properties (like projectId) directly.
type AdapterUserOverride = Partial<Omit<Adapter.Config, 'id' | 'adapter' | 'config'>> & {
  config?: Partial<Adapter.Config['config']>;
  [key: string]: any; // Allows arbitrary keys like projectId, appName etc.
};

// Main configuration for the PNP library
export interface CreatePnpArgs {
  dfxNetwork?: string; // Useful for determining dev environment
  solanaNetwork?: string;
  hostUrl?: string;
  delegationTimeout?: bigint;
  delegationTargets?: string[];
  derivationOrigin?: string;
  fetchRootKeys?: boolean; // Common agent setting
  verifyQuerySignatures?: boolean; // Common agent setting
  localStorageKey?: string;
  siwsProviderCanisterId?: string; // Add SIWS provider Canister ID here
  adapters?: {
    [key: string]: AdapterUserOverride; // Use the override type here
  };
}

// Default values for the main configuration
export const defaultCreateArgs = {
  // Global defaults matching user's updated PnpConfig
  dfxNetwork: "ic",
  solanaNetwork: "mainnet",
  hostUrl: "https://icp0.io",
  delegationTimeout: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000), // 1 day
  delegationTargets: [],
  derivationOrigin: typeof window !== "undefined" ? window.location.origin : "",
  fetchRootKeys: false, // Default for global setting
  verifyQuerySignatures: true, // Default for global setting
  localStorageKey: "pnpConnectedWallet",
  siwsProviderCanisterId: undefined,
  adapters: {
    ...Adapters,
  },
};

// Define the return type more explicitly to include adapters (which now contain config)
export type FullPNPConfig = typeof defaultCreateArgs;

// Function to create a complete configuration object by merging user input with defaults
export function createPNPConfig(config: CreatePnpArgs = {}): GlobalPnpConfig {
  const finalAdapters: Record<string, Adapter.Config> = {};

  // Iterate over the DEFAULT adapters defined in Adapters and SolAdapters
  for (const adapterId in defaultCreateArgs.adapters) {
      const defaultAdapterInfo = defaultCreateArgs.adapters[adapterId];
      const userAdapterOverride = config.adapters?.[adapterId]; // This is now of type AdapterUserOverride | undefined

      if (!defaultAdapterInfo) continue; // Skip if somehow iterating a key not in defaults

      // Start building the final config for this adapter
      const finalAdapterConfig: Adapter.Config = {
          // Start with the default metadata (id, walletName, logo, adapter constructor)
          ...defaultAdapterInfo,

          // Override 'enabled' status if provided by user, otherwise use default
          enabled: userAdapterOverride?.enabled ?? defaultAdapterInfo.enabled,

          // Build the nested 'config' object
          config: {
              // 1. Start with the default adapter's config
              ...defaultAdapterInfo.config,

              // 2. Apply global overrides from the main config object
              hostUrl: config.hostUrl || defaultCreateArgs.hostUrl,
              // Use nullish coalescing (??) for booleans to allow 'false' override
              fetchRootKeys: config.fetchRootKeys ?? defaultCreateArgs.fetchRootKeys,
              verifyQuerySignatures: config.verifyQuerySignatures ?? defaultCreateArgs.verifyQuerySignatures,
              delegationTimeout: config.delegationTimeout || defaultCreateArgs.delegationTimeout,
              delegationTargets: config.delegationTargets || defaultCreateArgs.delegationTargets,
              derivationOrigin: config.derivationOrigin || defaultCreateArgs.derivationOrigin,
              localStorageKey: config.localStorageKey || defaultCreateArgs.localStorageKey,
              // Merge global SIWS ID if provided, otherwise use default adapter config's value (if any) or default global
              siwsProviderCanisterId: config.siwsProviderCanisterId || defaultAdapterInfo.config?.siwsProviderCanisterId || defaultCreateArgs.siwsProviderCanisterId,

              // 3. Apply adapter-specific overrides provided DIRECTLY by the user (e.g., projectId, appName)
              // Filter out 'enabled' and 'config' as they are handled separately/next
              ...Object.fromEntries(
                Object.entries(userAdapterOverride || {}).filter(
                  ([key]) => key !== 'enabled' && key !== 'config'
                )
              ),

              // 4. Apply overrides provided WITHIN the user's 'config' object (highest precedence for specific config keys)
              ...(userAdapterOverride?.config || {}),
          },
      };

      // Allow overriding top-level metadata like walletName, logo, etc. if user provided them
      if (userAdapterOverride?.walletName) finalAdapterConfig.walletName = userAdapterOverride.walletName;
      if (userAdapterOverride?.logo) finalAdapterConfig.logo = userAdapterOverride.logo;
      if (userAdapterOverride?.website) finalAdapterConfig.website = userAdapterOverride.website;
      // chain and id are generally fixed by the default config

      finalAdapters[adapterId] = finalAdapterConfig;
  }

  // Final global config structure
  const finalGlobalConfig: GlobalPnpConfig = {
    // Global settings merged from user input and defaults
    dfxNetwork: config.dfxNetwork || defaultCreateArgs.dfxNetwork,
    hostUrl: config.hostUrl || defaultCreateArgs.hostUrl,
    delegationTimeout: config.delegationTimeout || defaultCreateArgs.delegationTimeout,
    delegationTargets: config.delegationTargets || defaultCreateArgs.delegationTargets,
    derivationOrigin: config.derivationOrigin || defaultCreateArgs.derivationOrigin,
    fetchRootKeys: config.fetchRootKeys ?? defaultCreateArgs.fetchRootKeys,
    verifyQuerySignatures: config.verifyQuerySignatures ?? defaultCreateArgs.verifyQuerySignatures,
    localStorageKey: config.localStorageKey || defaultCreateArgs.localStorageKey,
    siwsProviderCanisterId: config.siwsProviderCanisterId || defaultCreateArgs.siwsProviderCanisterId,
    // The processed adapters map
    adapters: finalAdapters,
  };
  
  return finalGlobalConfig;
}
