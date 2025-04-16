// Adapters
import { InternetIdentity } from "./src/adapters/InternetIdentity";
import { PlugAdapter } from "./src/adapters/PlugAdapter";
import { BitfinityAdapter } from "./src/adapters/BitfinityAdapter";
import { BatchTransact } from "./src/utils/batchTransact";
import { AnonymousIdentity, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { ActorSubclass } from "@dfinity/agent";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

export namespace Wallet {
  export interface PNPConfig {
    hostUrl?: string;
    localStorageKey?: string;
    defaultCanisterId?: string;
    delegationTargets?: Principal[] | string[];
    delegationTimeout?: bigint;
    derivationOrigin?: string;
    dfxNetwork?: string;
    fetchRootKeys?: boolean;
    verifyQuerySignatures?: boolean;
    adapters?: Record<string, Adapter.Info>;
    identityProvider?: string;
    timeout?: number;
  }

  export interface Account {
    subaccount: Uint8Array | null;
    owner: Principal | null;
    hasDelegation?: boolean;
  }

  export type AdapterConstructor = new (config: Wallet.PNPConfig) => Adapter.Interface;
}

export namespace Adapter {
  // deprecated
  export interface Info {
    id: string;
    logo: string;
    walletName: string;
    adapter: AdapterConstructor;
    config: {
      identityProvider?: string;
      signerUrl?: string;
      rpcUrl?: string;
      timeout?: number;
      enabled?: boolean;
      siwsProviderCanisterId?: string;
      solanaNetwork?: WalletAdapterNetwork | undefined;
    };
    rpcUrl?: string;
    timeout?: number;
    enabled?: boolean;
  }

  // replaces Info
  export interface Wallet {
    id: string;
    logo: string;
    walletName: string;
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

  export interface Interface {
    // Core wallet functionality
    isAvailable(): Promise<boolean>;
    isConnected(): Promise<boolean>;
    connect(): Promise<Wallet.Account>;
    disconnect(): Promise<void>;
    getPrincipal(): Promise<Principal>;
    getAccountId(): Promise<string>;

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
  config: Wallet.PNPConfig;
  actorCache: Map<string, ActorSubclass<any>>;
  fetchRootKeys: boolean;

  constructor(config?: Wallet.PNPConfig);

  connect(walletId: string): Promise<Wallet.Account>;
  disconnect(): Promise<void>;
  isWalletConnected(): boolean;
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
