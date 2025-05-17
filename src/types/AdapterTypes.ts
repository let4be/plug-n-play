export interface AdapterConstructor {
  new (config: any): AdapterInterface;
}

export interface AdapterConfig {
  id: string;
  enabled: boolean;
  logo: string;
  walletName: string;
  chain: 'ICP' | 'SOL';
  website?: string;
  adapter: AdapterConstructor;
  config: {
    [key: string]: any;
  };
}

export interface AdapterConstructorArgs {
  adapter: AdapterConfig;
  config: any;
}

export interface GetActorOptions {
  canisterId: string;
  idl: any;
  anon?: boolean;
  requiresSigning?: boolean;
}

export enum AdapterStatus {
  INIT = 'INIT',
  READY = 'READY',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTING = 'DISCONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
}

export enum AdapterChain {
  ICP = 'icp',
  SOL = 'sol',
  ETH = 'eth',
}

export interface AdapterAddresses {
  [key: string]: string | any;
}

export interface AdapterInterface {
  openChannel(): Promise<void>;
  isConnected(): Promise<boolean>;
  connect(): Promise<any>;
  disconnect(): Promise<void>;
  getPrincipal(): Promise<string>;
  getAccountId(): Promise<string>;
  getAddresses(): Promise<AdapterAddresses>;
  createActor<T>(canisterId: string, idl: any, options?: { requiresSigning?: boolean }): any;
  undelegatedActor?<T>(canisterId: string, idlFactory: any, options?: { requiresSigning?: boolean }): any;
}

export interface AdapterWallet {
  adapter: AdapterConstructor;
} 