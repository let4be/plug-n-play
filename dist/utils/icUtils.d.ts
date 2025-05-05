import { Principal } from '@dfinity/principal';
import { ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Adapter } from '../types/index.d';
/**
 * Derives an account ID (hex string) from a principal
 * @param principal Principal as text string or Principal object
 * @returns Hex string of the account ID
 */
export declare function deriveAccountId(principal: string | Principal): string;
/**
 * Create an anonymous actor for a canister
 * @param canisterId Canister ID
 * @param idl Interface definition
 * @param hostUrl Host URL for the agent
 * @param options Additional options like fetchRootKeys and verifyQuerySignatures
 * @returns Actor instance
 */
export declare function createAnonymousActor<T>(options: {
    canisterId: string;
    idl: any;
    adapter: Adapter.Config;
}): ActorSubclass<T>;
/**
 * Standardized connection error handler for adapters
 * @param error The error that occurred
 * @param contextMessage Additional context message
 * @param adapter The adapter instance
 */
export declare function handleConnectionError(error: unknown, contextMessage: string, setState: (state: Adapter.Status) => void, disconnect: () => Promise<void>): Promise<never>;
/**
 * Creates a standardized error message for IC adapter errors
 * @param walletName Name of the wallet/adapter
 * @param context Error context
 * @param errorDetail Specific error detail
 * @returns Formatted error message
 */
export declare function formatErrorMessage(walletName: string, context: string, errorDetail: string | Error): string;
/**
 * Determines if a principal is anonymous
 * @param principal Principal as string or Principal object
 * @returns True if the principal is anonymous
 */
export declare function isPrincipalAnonymous(principal: string | Principal): boolean;
/**
 * Creates a standard wallet account object from a principal
 * @param principal Principal as string or Principal object
 * @returns Wallet.Account object with owner and subaccount
 */
export declare function createAccountFromPrincipal(principal: string | Principal): Promise<{
    owner: string;
    subaccount: string;
}>;
/**
 * Helper to fetch root keys if configured to do so
 * @param agent HttpAgent to fetch root keys for
 * @param fetchRootKeys Boolean indicating whether to fetch root keys
 * @param logPrefix Optional prefix for log messages
 */
export declare function fetchRootKeysIfNeeded(agent: HttpAgent, fetchRootKeys: boolean | undefined): Promise<void>;
/**
 * Creates a cache key for actor caching
 * @param walletName Wallet name
 * @param canisterId Canister ID
 * @param requiresSigning Whether the actor requires signing
 * @returns Cache key string
 */
export declare function createActorCacheKey(walletName: string, canisterId: string, requiresSigning?: boolean): string;
/**
 * Validates if a provided principal string is valid
 * @param principalText Principal as text string
 * @returns Boolean indicating if principal is valid
 */
export declare function isValidPrincipal(principalText: string | null | undefined): boolean;
/**
 * Common retry logic for IC operations
 * @param operation Function to retry
 * @param maxRetries Maximum number of retries
 * @param delayMs Delay between retries in milliseconds
 * @returns Result of the operation
 */
export declare function withRetry<T>(operation: () => Promise<T>, maxRetries?: number, delayMs?: number): Promise<T>;
