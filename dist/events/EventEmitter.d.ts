import { PnpEventEmitter, PnpEventType, PnpEventListener } from './types';
export declare class EventEmitter implements PnpEventEmitter {
    private listeners;
    on<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    off<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    emit<T>(event: PnpEventType, data: T): void;
    removeAllListeners(event?: PnpEventType): void;
}
