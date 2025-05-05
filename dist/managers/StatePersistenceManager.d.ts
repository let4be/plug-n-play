import { StateHistory } from './StateManager';
import { ErrorManager } from './ErrorManager';
export interface StatePersistenceOptions {
    key: string;
    storage?: Storage;
    maxHistorySize?: number;
    autoRecover?: boolean;
    validateOnLoad?: boolean;
}
export declare class StatePersistenceManager {
    private options;
    private errorManager;
    constructor(errorManager: ErrorManager, options: StatePersistenceOptions);
    saveState(history: StateHistory): void;
    loadState(): StateHistory | null;
    clearState(): void;
    private validateStateHistory;
    private validateTransition;
    getStateKey(): string;
    setOptions(options: Partial<StatePersistenceOptions>): void;
}
