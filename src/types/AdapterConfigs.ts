import { GlobalPnpConfig } from './index.d';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export interface IIAdapterConfig extends GlobalPnpConfig {
  localIdentityCanisterId?: string;
  maxTimeToLive?: bigint;
  derivationOrigin?: string;
  iiProviderUrl?: string;
  iiProviderOrigin?: string;
  timeout?: number;
}

export interface PlugAdapterConfig extends GlobalPnpConfig {
  whitelist?: string[];
  host?: string;
  timeout?: number;
  dev?: boolean;
}

export interface NFIDAdapterConfig extends GlobalPnpConfig {
  appName?: string;
  logoUrl?: string;
  maxTimeToLive?: bigint;
  derivationOrigin?: string;
  signerUrl?: string;
  transport?: {
    windowOpenerFeatures?: string;
    establishTimeout?: number;
    disconnectTimeout?: number;
    statusPollingRate?: number;
    detectNonClickEstablishment?: boolean;
  };
}

export interface OisyAdapterConfig extends GlobalPnpConfig {
  appName?: string;
  logoUrl?: string;
  maxTimeToLive?: bigint;
  derivationOrigin?: string;
  signerUrl?: string;
  transport?: {
    windowOpenerFeatures?: string;
    establishTimeout?: number;
    disconnectTimeout?: number;
    statusPollingRate?: number;
    detectNonClickEstablishment?: boolean;
  };
}

export interface SiwsAdapterConfig extends GlobalPnpConfig {
  providerCanisterId?: string;
  maxTimeToLive?: bigint;
  derivationOrigin?: string;
  signInMessage?: string;
  signInDomain?: string;
  signInUri?: string;
  signInStatement?: string;
  signInNonce?: string;
  signInExpirationTime?: number;
  solanaNetwork?: WalletAdapterNetwork;
  // WalletConnect specific options
  projectId?: string;
  appName?: string;
  appDescription?: string;
  appUrl?: string;
  appIcons?: string[];
}

// Union type for all adapter configs
export type AdapterSpecificConfig = 
  | IIAdapterConfig 
  | PlugAdapterConfig 
  | NFIDAdapterConfig 
  | OisyAdapterConfig 
  | SiwsAdapterConfig;

export function isPlugAdapterConfig(config: GlobalPnpConfig): config is PlugAdapterConfig {
  return 'whitelist' in config || 'host' in config;
}

export function isNFIDAdapterConfig(config: GlobalPnpConfig): config is NFIDAdapterConfig {
  return 'appName' in config || 'logoUrl' in config;
}

export function isOisyAdapterConfig(config: GlobalPnpConfig): config is OisyAdapterConfig {
  return 'appName' in config || 'logoUrl' in config;
}

export function isSiwsAdapterConfig(config: GlobalPnpConfig): config is SiwsAdapterConfig {
  return 'providerCanisterId' in config || 'signInMessage' in config;
} 