import { GlobalPnpConfig } from '../types/index.d';
import { PnpEventEmitter, PnpEventType, PnpEventListener } from '../events';
export interface ConfigValidationError {
    field: string;
    message: string;
}
export declare class ConfigManager implements PnpEventEmitter {
    private config;
    private eventEmitter;
    constructor(userConfig?: GlobalPnpConfig);
    getConfig(): GlobalPnpConfig;
    updateConfig(partialConfig: Partial<GlobalPnpConfig>): void;
    validateConfig(config: GlobalPnpConfig): {
        isValid: boolean;
        errors: ConfigValidationError[];
    };
    getAdapterConfig(id: string): any;
    isAdapterEnabled(id: string): boolean;
    enableAdapter(id: string): void;
    disableAdapter(id: string): void;
    on<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    off<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    emit<T>(event: PnpEventType, data: T): void;
    removeAllListeners(event?: PnpEventType): void;
}
