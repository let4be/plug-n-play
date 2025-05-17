import { AdapterConfig, AdapterInterface, AdapterStatus } from '../types/AdapterTypes';
import { WalletAccount } from '../types/WalletTypes';
import { GlobalPnpConfig } from '../types/index.d';
import { PnpEventEmitter, PnpEventType, PnpEventListener, EventEmitter, PnpEvent } from '../events';
import { ErrorManager } from './ErrorManager';

export class ConnectionManager implements PnpEventEmitter {
  config: GlobalPnpConfig;
  adapter: AdapterConfig | null = null;
  provider: AdapterInterface | null = null;
  account: WalletAccount | null = null;
  status: AdapterStatus = AdapterStatus.INIT;
  private eventEmitter: EventEmitter;
  private logger: ErrorManager;

  constructor(config: GlobalPnpConfig, logger?: ErrorManager) {
    this.config = config;
    this.status = AdapterStatus.READY;
    this.eventEmitter = new EventEmitter();
    this.logger = logger || new ErrorManager(this.eventEmitter);
  }

  private _resetState(): void {
    const oldAccount = this.account;
    const oldProvider = this.provider;
    const oldAdapter = this.adapter;
    const oldStatus = this.status;

    this.account = null;
    this.provider = null;
    this.adapter = null;
    this.status = AdapterStatus.READY;

    this.emit(PnpEventType.STATUS_CHANGE, { 
      oldStatus, 
      newStatus: this.status 
    });
    this.emit(PnpEventType.ACCOUNT_CHANGE, { 
      oldAccount, 
      newAccount: null 
    });
    this.emit(PnpEventType.ADAPTER_CHANGE, { 
      oldAdapter, 
      newAdapter: null 
    });
  }

  async openChannel(): Promise<void> {
    if (this.provider) {
      await this.provider.openChannel();
    }
  }

  async connect(walletId?: string): Promise<WalletAccount | null> {
    if (this.status === AdapterStatus.CONNECTING) {
      // If already connecting, wait for the current attempt to complete
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          this.off(PnpEventType.CONNECTED, onConnected);
          this.off(PnpEventType.ERROR, onError);
          reject(new Error('Connection attempt timed out'));
        }, 30000); // 30 second timeout

        const onConnected = (event: PnpEvent<{ account: WalletAccount }>) => {
          clearTimeout(timeout);
          this.off(PnpEventType.CONNECTED, onConnected);
          this.off(PnpEventType.ERROR, onError);
          resolve(event.data.account);
        };

        const onError = (event: PnpEvent<{ error: Error }>) => {
          clearTimeout(timeout);
          this.off(PnpEventType.CONNECTED, onConnected);
          this.off(PnpEventType.ERROR, onError);
          reject(event.data.error);
        };

        this.on(PnpEventType.CONNECTED, onConnected);
        this.on(PnpEventType.ERROR, onError);
      });
    }
    
    const oldStatus = this.status;
    this.status = AdapterStatus.CONNECTING;
    this.emit(PnpEventType.STATUS_CHANGE, { 
      oldStatus, 
      newStatus: AdapterStatus.CONNECTING,
      walletId 
    });

    let instance: AdapterInterface | null = null;
    try {
      const targetWalletId = walletId;
      if (!targetWalletId) {
        throw new Error('No wallet ID provided');
      }
      if (!this.config.adapters[targetWalletId]) {
        throw new Error(`Invalid adapter id: ${targetWalletId}`);
      }
      
      const adapterInfo = this.config.adapters[targetWalletId];
      instance = new adapterInfo.adapter({ 
        adapter: adapterInfo,
        config: {
          ...this.config,
          ...adapterInfo.config
        },
        logger: this.logger
      });
      
      // Validate adapter instance
      if (!instance || typeof instance.connect !== 'function') {
        throw new Error('Invalid adapter instance');
      }

      const account = await instance.connect();
      
      // Validate connection result
      if (!account || !account.owner) {
        throw new Error('Invalid connection result: Missing account or owner');
      }

      const oldAccount = this.account;
      const oldAdapter = this.adapter;
      const oldStatus = this.status;

      this.account = account;
      this.adapter = {
        id: adapterInfo.id || targetWalletId,
        enabled: adapterInfo.enabled ?? true,
        logo: adapterInfo.logo || '',
        walletName: adapterInfo.walletName || targetWalletId,
        chain: adapterInfo.chain || 'ICP',
        adapter: adapterInfo.adapter,
        config: adapterInfo.config || {}
      } as AdapterConfig;
      this.provider = instance;
      this.status = AdapterStatus.CONNECTED;

      this.emit(PnpEventType.CONNECTED, { account });
      this.emit(PnpEventType.STATUS_CHANGE, { 
        oldStatus, 
        newStatus: this.status,
        walletId 
      });
      this.emit(PnpEventType.ACCOUNT_CHANGE, { 
        oldAccount, 
        newAccount: account 
      });
      this.emit(PnpEventType.ADAPTER_CHANGE, { 
        oldAdapter, 
        newAdapter: adapterInfo 
      });

      return account;
    } catch (error) {
      // First transition to ERROR state
      this.status = AdapterStatus.ERROR;
      this.emit(PnpEventType.STATUS_CHANGE, { 
        oldStatus, 
        newStatus: AdapterStatus.ERROR,
        walletId 
      });
      
      // Emit error with more context
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const enhancedError = new Error(`Connection failed: ${errorMessage}`);
      // Preserve the original error name if it exists
      if (error instanceof Error && error.name) {
        enhancedError.name = error.name; 
      }
      this.emit(PnpEventType.ERROR, { 
        error: enhancedError, 
        operation: 'connect',
        walletId 
      });

      // Then attempt to disconnect if we have an instance
      if (instance) {
        try {
          await instance.disconnect();
        } catch (disconnectError) {
          this.logger.error('Error during disconnect after failed connect', disconnectError as Error);
        }
      }

      // Finally reset the state
      this._resetState();
      throw enhancedError; // Re-throw the enhanced error
    }
  }

  async disconnect(): Promise<void> {
    const oldStatus = this.status;
    this.status = AdapterStatus.DISCONNECTING;
    this.emit(PnpEventType.STATUS_CHANGE, { 
      oldStatus, 
      newStatus: AdapterStatus.DISCONNECTING 
    });

    try {
      if (this.provider) await this.provider.disconnect();
      this._resetState();
      this.status = AdapterStatus.DISCONNECTED;
      this.emit(PnpEventType.DISCONNECTED, {});
      this.emit(PnpEventType.STATUS_CHANGE, { 
        oldStatus, 
        newStatus: AdapterStatus.DISCONNECTED 
      });
    } catch (error) {
      this.emit(PnpEventType.ERROR, { 
        error, 
        operation: 'disconnect' 
      });
      this._resetState();
      this.status = AdapterStatus.ERROR;
      this.emit(PnpEventType.STATUS_CHANGE, { 
        oldStatus, 
        newStatus: AdapterStatus.ERROR 
      });
    }
  }

  isAuthenticated(): boolean {
    return (
      this.adapter !== null &&
      this.provider !== null &&
      this.account !== null &&
      this.status === AdapterStatus.CONNECTED
    );
  }

  // Event emitter methods
  on<T>(event: PnpEventType, listener: PnpEventListener<T>): void {
    this.eventEmitter.on(event, listener);
  }

  off<T>(event: PnpEventType, listener: PnpEventListener<T>): void {
    this.eventEmitter.off(event, listener);
  }

  emit<T>(event: PnpEventType, data: T): void {
    this.eventEmitter.emit(event, data);
  }

  removeAllListeners(event?: PnpEventType): void {
    this.eventEmitter.removeAllListeners(event);
  }
} 