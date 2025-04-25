// Path: src/adapters/ic/index.ts
// Import adapters
import { IIAdapter } from "./IIAdapter";
import { PlugAdapter } from "./PlugAdapter";
import { NFIDAdapter } from "./NFIDAdapter";
import { OisyAdapter } from "./OisyAdapter";
import { Adapter } from "../../types";

// Common default config for adapters
const commonDefaultConfig = {
  timeout: 1000 * 60 * 60 * 24, // 1 day
  enabled: true,
};

// Define the default adapters map, now including default config
const ICAdapters: Record<string, Adapter.Info> = {
  'oisy': {
    id: 'oisy',
    walletName: OisyAdapter.walletName,
    logo: OisyAdapter.logo, 
    website: "https://oisy.com",
    chain: 'ICP',
    adapter: OisyAdapter,
    config: {
      ...commonDefaultConfig,
      signerUrl: "https://oisy.com/sign", // Default Oisy sign URL
    },
  },
  'nfid': {
    id: 'nfid',
    walletName: NFIDAdapter.walletName,
    logo: NFIDAdapter.logo, 
    website: "https://nfid.one",
    chain: 'ICP',
    adapter: NFIDAdapter,
    config: {
      ...commonDefaultConfig,
      rpcUrl: "https://nfid.one/rpc", // Default NFID RPC endpoint
    },
  },
  'ii': {
    id: 'ii',
    walletName: IIAdapter.walletName,
    logo: IIAdapter.logo,
    website: "https://internetcomputer.org",
    chain: 'ICP',
    adapter: IIAdapter,
    config: {
      ...commonDefaultConfig,
      identityProvider: "https://identity.ic0.app",
    },
  },
  'plug': {
    id: 'plug',
    walletName: PlugAdapter.walletName,
    logo: PlugAdapter.logo, 
    website: "https://plugwallet.io",
    chain: 'ICP',
    adapter: PlugAdapter,
    config: {
      ...commonDefaultConfig,
      identityProvider: "https://identity.ic0.app",
    },
  },
};

export { IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter, ICAdapters };
