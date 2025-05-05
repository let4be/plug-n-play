import { writable, get } from 'svelte/store';
import { Principal } from '@dfinity/principal';
import { pnpInstance } from './pnp';
import { idlFactory as ledgerIdlFactory, canisterId as ledgerCanisterId } from '../idls/ksicp_ledger';
import { type _SERVICE as LedgerService } from '../idls/ksicp_ledger/ksicp_ledger.did';

export const balance = writable<bigint | null>(null);

export const fetchBalance = async () => {
  const auth = get(pnpInstance);
  
  if (!auth) {
    throw new Error('PNP not initialized');
  }
  
  if (!auth.account?.owner) {
    throw new Error('No principal ID available');
  }

  try {
    const actor = auth.getActor<LedgerService>({
      canisterId: ledgerCanisterId, 
      idl: ledgerIdlFactory,
      anon: true 
    });
    
    const result = await actor.icrc1_balance_of({
      owner: Principal.fromText(auth.account?.owner || ''),
      subaccount: [],
    });
    console.log('Fetched balance:', result);
    balance.set(result);
    return result;
  } catch (error) {
    console.error('Failed to fetch balance:', error);
    throw error;
  }
};
