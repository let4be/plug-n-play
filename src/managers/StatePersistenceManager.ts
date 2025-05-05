import { PnpState, StateHistory, StateTransition } from './StateManager';
import { ErrorManager } from './ErrorManager';

export interface StatePersistenceOptions {
  key: string;
  storage?: Storage;
  maxHistorySize?: number;
  autoRecover?: boolean;
  validateOnLoad?: boolean;
}

export class StatePersistenceManager {
  private options: Required<StatePersistenceOptions>;
  private errorManager: ErrorManager;

  constructor(errorManager: ErrorManager, options: StatePersistenceOptions) {
    this.errorManager = errorManager;
    this.options = {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      maxHistorySize: 100,
      autoRecover: true,
      validateOnLoad: true,
      ...options
    };
  }

  saveState(history: StateHistory): void {
    if (!this.options.storage) return;

    try {
      const serialized = JSON.stringify({
        ...history,
        transitions: history.transitions.map(t => ({
          ...t,
          timestamp: t.timestamp.toISOString()
        }))
      });
      this.options.storage.setItem(this.options.key, serialized);
    } catch (error) {
      this.errorManager.warn('Failed to persist state', { error });
    }
  }

  loadState(): StateHistory | null {
    if (!this.options.storage) return null;

    try {
      const serialized = this.options.storage.getItem(this.options.key);
      if (!serialized) return null;

      const parsed = JSON.parse(serialized) as StateHistory;
      const history: StateHistory = {
        ...parsed,
        transitions: parsed.transitions.map(t => ({
          ...t,
          timestamp: new Date(t.timestamp)
        }))
      };

      if (this.options.validateOnLoad && !this.validateStateHistory(history)) {
        this.errorManager.warn('Invalid state history loaded', { history });
        return null;
      }

      return history;
    } catch (error) {
      this.errorManager.warn('Failed to load persisted state', { error });
      return null;
    }
  }

  clearState(): void {
    if (!this.options.storage) return;
    try {
      this.options.storage.removeItem(this.options.key);
    } catch (error) {
      this.errorManager.warn('Failed to clear persisted state', { error });
    }
  }

  private validateStateHistory(history: StateHistory): boolean {
    if (!history.currentState || !history.transitions) return false;
    
    // Validate current state is a valid PnpState
    if (!Object.values(PnpState).includes(history.currentState)) return false;

    // Validate transitions
    for (const transition of history.transitions) {
      if (!this.validateTransition(transition)) return false;
    }

    return true;
  }

  private validateTransition(transition: StateTransition): boolean {
    return (
      Object.values(PnpState).includes(transition.from) &&
      Object.values(PnpState).includes(transition.to) &&
      transition.timestamp instanceof Date &&
      !isNaN(transition.timestamp.getTime())
    );
  }

  getStateKey(): string {
    return this.options.key;
  }

  setOptions(options: Partial<StatePersistenceOptions>): void {
    this.options = { ...this.options, ...options };
  }
} 