// Adapters
import { InternetIdentity } from "./src/adapters/InternetIdentity";
import { PlugAdapter } from "./src/adapters/PlugAdapter";
import { BitfinityAdapter } from "./src/adapters/BitfinityAdapter";
import { BatchTransact } from "./src/utils/batchTransact";
import { AnonymousIdentity, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { ActorSubclass } from "@dfinity/agent";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { IIAdapterConfig, SolanaAdapterConfig, OisyAdapterConfig, PlugAdapterConfig, NFIDAdapterConfig } from "./AdapterTypes";

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

export interface PnpConfig {
  delegationTargets: string[];
  delegationTimeout: bigint;
  derivationOrigin: string;
  dfxNetwork: string;
  fetchRootKey: boolean;
  hostUrl: string;
  localStorageKey: string;
  siwsProviderCanisterId: string;
  verifyQuerySignatures: boolean;
}

export namespace Wallet {
  export interface Account {
    owner: string | null;
    subaccount: string | null;
  }

  export type AdapterConstructor = new (config: PnpConfig) => Adapter.Interface;
}


export interface GlobalPnpConfig {
  dfxNetwork?: string; // Useful for determining dev environment
  replicaPort?: number;
  solanaNetwork?: string;
  hostUrl?: string;
  delegationTimeout?: bigint;
  delegationTargets?: string[];
  derivationOrigin?: string;
  fetchRootKey?: boolean;
  verifyQuerySignatures?: boolean;
  localStorageKey?: string;
  siwsProviderCanisterId?: string;
  adapters?: Record<string, IIAdapterConfig | PlugAdapterConfig | NFIDAdapterConfig | OisyAdapterConfig | SiwsAdapterConfig>;
  logLevel?: LogLevel;
  persistenceKey?: string;
  storage?: Storage;
  maxStateHistorySize?: number;
  autoRecoverState?: boolean;
  validateStateOnLoad?: boolean;
}

export namespace Adapter {

  export interface ConstructorArgs { 
    adapter: Adapter.Config;
    config: GlobalPnpConfig;
  }

  export interface GetActorOptions {
    canisterId: string;
    idl: IDL.InterfaceFactory;
    anon?: boolean;
    requiresSigning?: boolean;
  }
  
  // deprecated
  export interface Config {
    id?: string;
    enabled?: boolean;
    logo?: string;
    walletName?: string;
    chain?: 'ICP' | 'SOL';
    website?: string;
    adapter?: AdapterConstructor;
    config?: {
      [key: string]: any;
    }
  }

  // replaces Info
  export interface Wallet {
    adapter: AdapterConstructor;
  }

  export enum Status {
    INIT = "INIT",
    READY = "READY",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    DISCONNECTING = "DISCONNECTING",
    DISCONNECTED = "DISCONNECTED",
    ERROR = "ERROR",
  }

  export enum Chain {
    ICP = "icp",
    SOL = "sol",
    ETH = "eth",
  }

  export interface Addresses {
    [key in Chain]?: string | Wallet.Account;
  }

  export interface Interface {
    // Core wallet functionality
    openChannel(): Promise<void>;
    isConnected(): Promise<boolean>;
    connect(): Promise<Wallet.Account>;
    disconnect(): Promise<void>;
    getPrincipal(): Promise<string>;
    getAccountId(): Promise<string>;
    getAddresses(): Promise<Addresses>;
    // Actor creation
    createActor<T>(
      canisterId: string,
      idl: any,
      options?: { requiresSigning?: boolean },
    ): ActorSubclass<T>;
    undelegatedActor?<T>(
      canisterId: string,
      idlFactory: any,
      options?: { requiresSigning?: boolean },
    ): ActorSubclass<T>;
  }
}

export class PNP {
  account: Wallet.Account | null;
  provider: Adapter.Interface | null;
  config: PnpConfig;
  actorCache: Map<string, ActorSubclass<any>>;
  fetchRootKey: boolean;

  constructor(config?: PnpConfig);

  connect(walletId: string): Promise<Wallet.Account>;
  disconnect(): Promise<void>;
  isAuthenticated(): boolean;
  getActor<T>(canisterId: string, idl: any, isAnon?: boolean): ActorSubclass<T>;
  createAnonymousActor<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean },
  ): ActorSubclass<T>;
}

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: (options?: {
          whitelist?: string[];
          host?: string;
          timeout?: number;
          onConnectionUpdate?: () => void;
        }) => Promise<boolean>;
        isConnected: () => Promise<boolean>;
        createActor: <T>(options: {
          canisterId: string;
          interfaceFactory: any;
        }) => Promise<ActorSubclass<T>>;
        disconnect: () => Promise<void>;
        onExternalDisconnect: (callback: () => void) => void;
        principalId?: string;
        accountId?: string;
      };
    };
  }
}
