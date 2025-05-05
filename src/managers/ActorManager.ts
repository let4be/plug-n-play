import { Actor, HttpAgent, ActorSubclass } from '@dfinity/agent';
import { AdapterInterface, GetActorOptions } from '../types/AdapterTypes';
import { GlobalPnpConfig } from '../types/index.d';
import { PnpEventEmitter, PnpEventType, PnpEventListener, EventEmitter } from '../events';

export class ActorManager implements PnpEventEmitter {
  private config: GlobalPnpConfig;
  private provider: AdapterInterface | null;
  private actorCache: Map<string, ActorSubclass<any>> = new Map();
  private eventEmitter: EventEmitter;

  constructor(config: GlobalPnpConfig, provider: AdapterInterface | null = null) {
    this.config = config;
    this.provider = provider;
    this.eventEmitter = new EventEmitter();
  }

  setProvider(provider: AdapterInterface | null) {
    const oldProvider = this.provider;
    this.provider = provider;
    this.emit(PnpEventType.PROVIDER_CHANGED, { oldProvider, newProvider: provider });
  }

  getActor<T>(options: GetActorOptions): ActorSubclass<T> {
    const { canisterId, idl, anon = false, requiresSigning = false } = options;
    if (anon) {
      return this.createAnonymousActor<T>(canisterId, idl);
    }
    if (!this.provider) {
      throw new Error('Cannot create signed actor. No wallet provider connected.');
    }
    const actor = this.provider.createActor<T>(canisterId, idl, { requiresSigning });
    this.emit(PnpEventType.ACTOR_CREATED, { 
      canisterId, 
      idl, 
      isAnonymous: false,
      requiresSigning 
    });
    return actor;
  }

  createAnonymousActor<T>(canisterId: string, idl: any): ActorSubclass<T> {
    const cacheKey = `anon-${canisterId}`;
    const cachedActor = this.actorCache.get(cacheKey);
    if (cachedActor) return cachedActor;
    const actor = Actor.createActor<T>(idl, {
      agent: HttpAgent.createSync({
        host: this.config.hostUrl,
        verifyQuerySignatures: this.config.verifyQuerySignatures,
      }),
      canisterId,
    });
    this.actorCache.set(cacheKey, actor);
    this.emit(PnpEventType.ACTOR_CREATED, { 
      canisterId, 
      idl, 
      isAnonymous: true,
      requiresSigning: false 
    });
    return actor;
  }

  clearCache() {
    const cacheSize = this.actorCache.size;
    this.actorCache.clear();
    this.emit(PnpEventType.CACHE_CLEARED, { 
      clearedEntries: cacheSize,
      timestamp: Date.now() 
    });
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