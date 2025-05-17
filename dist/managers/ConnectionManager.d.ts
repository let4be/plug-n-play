import { AdapterConfig, AdapterInterface, AdapterStatus } from '../types/AdapterTypes';
import { WalletAccount } from '../types/WalletTypes';
import { GlobalPnpConfig } from '../types/index.d';
import { PnpEventEmitter, PnpEventType, PnpEventListener } from '../events';
import { ErrorManager } from './ErrorManager';
export declare class ConnectionManager implements PnpEventEmitter {
    config: GlobalPnpConfig;
    adapter: AdapterConfig | null;
    provider: AdapterInterface | null;
    account: WalletAccount | null;
    status: AdapterStatus;
    private eventEmitter;
    private logger;
    constructor(config: GlobalPnpConfig, logger?: ErrorManager);
    private _resetState;
    openChannel(): Promise<void>;
    connect(walletId?: string): Promise<WalletAccount | null>;
    disconnect(): Promise<void>;
    isAuthenticated(): boolean;
    on<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    off<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    emit<T>(event: PnpEventType, data: T): void;
    removeAllListeners(event?: PnpEventType): void;
}
