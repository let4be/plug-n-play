import { GlobalPnpConfig } from '../types/index.d';
import { ConfigValidationError } from '../managers/ConfigManager';

export enum PnpEventType {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
  LOG = 'log',
  STATE_CHANGE = 'stateChange',
  STATUS_CHANGE = 'statusChange',
  ACCOUNT_CHANGE = 'accountChange',
  ADAPTER_CHANGE = 'adapterChange',
  CONFIG_CHANGE = 'configChange',
  CONFIG_VALIDATION = 'configValidation',
  CACHE_CLEARED = 'cacheCleared',
  PROVIDER_CHANGED = 'providerChanged',
  ACTOR_CREATED = 'actorCreated'
}

export interface PnpEventData {
  [PnpEventType.CONNECTED]: { account: any };
  [PnpEventType.DISCONNECTED]: {};
  [PnpEventType.ERROR]: { error: Error };
  [PnpEventType.LOG]: { level: string; message: string; timestamp: Date; context?: Record<string, any>; error?: Error };
  [PnpEventType.STATE_CHANGE]: { from: string; to: string; context?: Record<string, any> };
}

export interface PnpEvent<T = any> {
  type: PnpEventType;
  data: T;
  timestamp: number;
}

export interface PnpEventListener<T = any> {
  (event: PnpEvent<T>): void;
}

export interface PnpEventEmitter {
  on<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
  off<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
  emit<T>(event: PnpEventType, data: T): void;
  removeAllListeners(event?: PnpEventType): void;
}

// Event data types
export interface ConfigChangedEventData {
  oldConfig: GlobalPnpConfig;
  newConfig: GlobalPnpConfig;
  changes: Partial<GlobalPnpConfig>;
}

export interface ConfigValidationEventData {
  config: GlobalPnpConfig;
  isValid: boolean;
  errors: ConfigValidationError[];
}

export interface ErrorEventData {
  error: Error;
  operation?: string;
  walletId?: string;
}

export interface StatusChangeEventData {
  oldStatus: string;
  newStatus: string;
}

export interface AccountChangedEventData {
  oldAccount: any | null;
  newAccount: any | null;
}

export interface AdapterChangedEventData {
  oldAdapter: any | null;
  newAdapter: any | null;
}

export interface ConnectedEventData {
  account: any;
}

export interface DisconnectedEventData {
  // Empty for now, can be extended if needed
}

export interface ActorCreatedEventData {
  canisterId: string;
  idl: any;
  isAnonymous: boolean;
  requiresSigning: boolean;
}

export interface CacheClearedEventData {
  clearedEntries: number;
  timestamp: number;
}

export interface ProviderChangedEventData {
  oldProvider: any | null;
  newProvider: any | null;
} 