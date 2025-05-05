import { PnpEvent, PnpEventEmitter, PnpEventType, PnpEventListener } from './types';

export class EventEmitter implements PnpEventEmitter {
  private listeners: Map<PnpEventType, Set<PnpEventListener>> = new Map();

  on<T>(event: PnpEventType, listener: PnpEventListener<T>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as PnpEventListener);
  }

  off<T>(event: PnpEventType, listener: PnpEventListener<T>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener as PnpEventListener);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  emit<T>(event: PnpEventType, data: T): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const pnpEvent: PnpEvent<T> = {
        type: event,
        data,
        timestamp: Date.now()
      };
      eventListeners.forEach(listener => listener(pnpEvent));
    }
  }

  removeAllListeners(event?: PnpEventType): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
} 