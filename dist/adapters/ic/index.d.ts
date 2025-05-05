import { IIAdapter } from './IIAdapter';
import { PlugAdapter } from './PlugAdapter';
import { NFIDAdapter } from './NFIDAdapter';
import { OisyAdapter } from './OisyAdapter';
import { Adapter } from '../../types';
declare const ICAdapters: Record<string, Adapter.Config>;
export { IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter, ICAdapters };
