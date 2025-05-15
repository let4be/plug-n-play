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
  replicaPort?: number;
  frontendPort?: number;
  solanaNetwork?: string;
  delegationTimeout?: bigint;
  delegationTargets?: string[];
  frontendCanisterId?: string;
  derivationOrigin?: string;
  fetchRootKey?: boolean; // Common agent setting
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
  replicaPort: 8080,
  frontendPort: 3000,
  solanaNetwork: "mainnet",
  delegationTimeout: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000), // 1 day
  delegationTargets: [],
  localStorageKey: "pnpState",
  fetchRootKey: undefined,
  verifyQuerySignatures: undefined,
  adapters: {
    ...Adapters,
  },
};

// Define the return type more explicitly to include adapters (which now contain config)
export type FullPNPConfig = typeof defaultCreateArgs;

function getHostUrl(dfxNetwork: string, replicaPort: number): string {
  if (dfxNetwork === "local") {
    return `http://127.0.0.1:${replicaPort || defaultCreateArgs.replicaPort}`;
  }
  return "https://icp0.io";
}

// Function to create a complete configuration object by merging user input with defaults
export function createPNPConfig(config: CreatePnpArgs = {}): GlobalPnpConfig {
  const finalAdapters: Record<string, Adapter.Config> = {};
  const hostUrl = getHostUrl(config.dfxNetwork, config.replicaPort);

  function getDerivationOrigin(): string {
    if (config.frontendCanisterId && hostUrl.includes("icp0.io")) {
      return `https://${config.frontendCanisterId}.icp0.io`;
    }
  
    return `http://localhost:${config.frontendPort || defaultCreateArgs.frontendPort}`;
  }
  
  const derivationOrigin = getDerivationOrigin();

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
              hostUrl: hostUrl,
              // Use nullish coalescing (??) for booleans to allow 'false' override
              fetchRootKey: config.fetchRootKey ?? config.dfxNetwork === "local" ? true : false,
              verifyQuerySignatures: config.verifyQuerySignatures ?? config.dfxNetwork === "local" ? false : true,
              delegationTimeout: config.delegationTimeout || defaultCreateArgs.delegationTimeout,
              delegationTargets: config.delegationTargets || defaultCreateArgs.delegationTargets,
              frontendCanisterId: config.frontendCanisterId,
              derivationOrigin: config.derivationOrigin || derivationOrigin,
              localStorageKey: config.localStorageKey || defaultCreateArgs.localStorageKey,
              // Merge global SIWS ID if provided, otherwise use default adapter config's value (if any) or default global
              siwsProviderCanisterId: config.siwsProviderCanisterId,

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
    replicaPort: config.replicaPort || defaultCreateArgs.replicaPort,
    hostUrl: hostUrl,
    delegationTimeout: config.delegationTimeout || defaultCreateArgs.delegationTimeout,
    delegationTargets: config.delegationTargets || defaultCreateArgs.delegationTargets,
    derivationOrigin: config.derivationOrigin || derivationOrigin,
    fetchRootKey: config.fetchRootKey ?? config.dfxNetwork === "local" ? true : false,
    verifyQuerySignatures: config.verifyQuerySignatures ?? config.dfxNetwork === "local" ? false : true,
    localStorageKey: config.localStorageKey || defaultCreateArgs.localStorageKey,
    siwsProviderCanisterId: config.siwsProviderCanisterId,
    // The processed adapters map
    adapters: finalAdapters,
  };

  return finalGlobalConfig;
}
