import { PnpEventEmitter } from '../events';
import { ErrorManager } from './ErrorManager';
import { StatePersistenceOptions } from './StatePersistenceManager';
export declare enum PnpState {
    INITIALIZED = "initialized",
    CONNECTING = "connecting",
    CONNECTED = "connected",
    DISCONNECTING = "disconnecting",
    DISCONNECTED = "disconnected",
    ERROR = "error"
}
export interface StateTransition {
    from: PnpState;
    to: PnpState;
    timestamp: Date;
    context?: Record<string, any>;
}
export interface StateHistory {
    currentState: PnpState;
    transitions: StateTransition[];
    lastError?: Error;
}
export declare class StateManager {
    private state;
    private transitions;
    private lastError?;
    private eventEmitter;
    private errorManager;
    private persistenceManager;
    constructor(eventEmitter: PnpEventEmitter, errorManager: ErrorManager, persistenceOptions?: StatePersistenceOptions);
    private loadState;
    private saveState;
    getCurrentState(): PnpState;
    getStateHistory(): StateTransition[];
    getLastError(): Error | undefined;
    transitionTo(newState: PnpState, context?: Record<string, any>): Promise<void>;
    private isValidTransition;
    setError(error: Error): void;
    clearError(): void;
}
