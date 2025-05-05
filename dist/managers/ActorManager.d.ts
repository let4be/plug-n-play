import { ActorSubclass } from '@dfinity/agent';
import { AdapterInterface, GetActorOptions } from '../types/AdapterTypes';
import { GlobalPnpConfig } from '../types/index.d';
import { PnpEventEmitter, PnpEventType, PnpEventListener } from '../events';
export declare class ActorManager implements PnpEventEmitter {
    private config;
    private provider;
    private actorCache;
    private eventEmitter;
    constructor(config: GlobalPnpConfig, provider?: AdapterInterface | null);
    setProvider(provider: AdapterInterface | null): void;
    getActor<T>(options: GetActorOptions): ActorSubclass<T>;
    createAnonymousActor<T>(canisterId: string, idl: any): ActorSubclass<T>;
    clearCache(): void;
    on<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    off<T>(event: PnpEventType, listener: PnpEventListener<T>): void;
    emit<T>(event: PnpEventType, data: T): void;
    removeAllListeners(event?: PnpEventType): void;
}
