import { PnpEventEmitter, PnpEventType } from '../events';
import { ErrorManager, PnpError } from './ErrorManager';
import { StatePersistenceManager, StatePersistenceOptions } from './StatePersistenceManager';

export enum PnpState {
  INITIALIZED = 'initialized',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTING = 'disconnecting',
  DISCONNECTED = 'disconnected',
  ERROR = 'error'
}

export interface StateTransition {
  from: PnpState;
  to: PnpState;
  timestamp: Date;
  context?: Record<string, any>;
}

export interface StateResponse {
  type: "stateChange";
  data: StateTransition;
  timestamp: number;
}

export interface StateHistory {
  currentState: PnpState;
  transitions: StateTransition[];
  lastError?: Error;
}

export class StateManager {
  private state: PnpState = PnpState.INITIALIZED;
  private transitions: StateTransition[] = [];
  private lastError?: Error;
  private eventEmitter: PnpEventEmitter;
  private errorManager: ErrorManager;
  private persistenceManager: StatePersistenceManager;

  constructor(
    eventEmitter: PnpEventEmitter,
    errorManager: ErrorManager,
    persistenceOptions?: StatePersistenceOptions
  ) {
    this.eventEmitter = eventEmitter;
    this.errorManager = errorManager;
    this.persistenceManager = new StatePersistenceManager(errorManager, {
      key: persistenceOptions?.key || 'pnp-state',
      ...persistenceOptions
    });
    this.loadState();
  }

  private loadState(): void {
    const savedState = this.persistenceManager.loadState();
    if (savedState) {
      this.state = savedState.currentState;
      this.transitions = savedState.transitions;
      this.lastError = savedState.lastError;
    }
  }

  private saveState(): void {
    const stateHistory: StateHistory = {
      currentState: this.state,
      transitions: this.transitions,
      lastError: this.lastError
    };
    this.persistenceManager.saveState(stateHistory);
  }

  getCurrentState(): PnpState {
    return this.state;
  }

  getStateHistory(): StateTransition[] {
    return [...this.transitions];
  }

  getLastError(): Error | undefined {
    return this.lastError;
  }

  async transitionTo(
    newState: PnpState,
    context?: Record<string, any>
  ): Promise<void> {
    const transition: StateTransition = {
      from: this.state,
      to: newState,
      timestamp: new Date(),
      context
    };

    // Validate state transition
    if (!this.isValidTransition(this.state, newState)) {
      const error = new PnpError(
        `Invalid state transition from ${this.state} to ${newState}`,
        'INVALID_STATE_TRANSITION',
        { transition }
      );
      this.errorManager.handleError(error);
      throw error;
    }

    this.state = newState;
    this.transitions.push(transition);
    this.saveState();

    this.eventEmitter.emit(PnpEventType.STATE_CHANGE, {
      from: transition.from,
      to: transition.to,
      context: transition.context
    });

    this.errorManager.info(`State changed from ${transition.from} to ${transition.to}`, {
      context: transition.context
    });
  }

  private isValidTransition(from: PnpState, to: PnpState): boolean {
    const validTransitions: Record<PnpState, PnpState[]> = {
      [PnpState.INITIALIZED]: [PnpState.CONNECTING, PnpState.ERROR],
      [PnpState.CONNECTING]: [PnpState.CONNECTED, PnpState.ERROR],
      [PnpState.CONNECTED]: [PnpState.DISCONNECTING, PnpState.ERROR],
      [PnpState.DISCONNECTING]: [PnpState.DISCONNECTED, PnpState.ERROR],
      [PnpState.DISCONNECTED]: [PnpState.CONNECTING, PnpState.ERROR],
      [PnpState.ERROR]: [PnpState.INITIALIZED, PnpState.CONNECTING]
    };

    return validTransitions[from]?.includes(to) ?? false;
  }

  setError(error: Error): void {
    this.lastError = error;
    this.saveState();
  }

  clearError(): void {
    this.lastError = undefined;
    this.saveState();
  }
} 