import { Principal } from "@dfinity/principal";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { ActorSubclass, HttpAgent, Actor, AnonymousIdentity } from "@dfinity/agent";
import { Adapter } from "../../types/index.d";

/**
 * Derives an account ID (hex string) from a principal
 * @param principal Principal as text string or Principal object
 * @returns Hex string of the account ID
 */
export function deriveAccountId(principal: string | Principal): string {
  try {
    const principalObj = typeof principal === "string" 
      ? Principal.fromText(principal)
      : principal;
    
    const accountId = AccountIdentifier.fromPrincipal({
      principal: principalObj,
      subAccount: undefined, // Default subaccount
    }).toHex();
    
    return accountId;
  } catch (err) {
    console.error("[IcUtils] Error deriving account ID:", err);
    throw err;
  }
}

/**
 * Create an anonymous actor for a canister
 * @param canisterId Canister ID
 * @param idl Interface definition
 * @param hostUrl Host URL for the agent
 * @param options Additional options like fetchRootKeys and verifyQuerySignatures
 * @returns Actor instance
 */
export function createAnonymousActor<T>(options: {
  canisterId: string,
  idl: any,
  adapter: Adapter.Config
}): ActorSubclass<T> {
  const { canisterId, idl, adapter } = options;
  const agent = HttpAgent.createSync({
    identity: new AnonymousIdentity(),
    host: adapter.config.hostUrl,
    verifyQuerySignatures: adapter.config.verifyQuerySignatures,
  });
  
  if (adapter.config.fetchRootKeys) {
    agent.fetchRootKey();
  }

  return Actor.createActor<T>(idl, {
    agent,
    canisterId,
  });
}

/**
 * Standardized connection error handler for adapters
 * @param error The error that occurred
 * @param contextMessage Additional context message
 * @param adapter The adapter instance
 */
export async function handleConnectionError(
  error: unknown, 
  contextMessage: string,
  setState: (state: Adapter.Status) => void,
  disconnect: () => Promise<void>
): Promise<never> {
  setState(Adapter.Status.ERROR);
  
  // Attempt to disconnect, but don't let disconnect errors mask the original error
  await disconnect().catch(disconnectError => {
    console.error(`[IcUtils] Error during disconnect after handling error:`, disconnectError);
  });
  
  // Re-throw the original error to propagate it
  throw error;
}

/**
 * Creates a standardized error message for IC adapter errors
 * @param walletName Name of the wallet/adapter
 * @param context Error context
 * @param errorDetail Specific error detail
 * @returns Formatted error message
 */
export function formatErrorMessage(
  walletName: string,
  context: string,
  errorDetail: string | Error
): string {
  const detail = errorDetail instanceof Error ? errorDetail.message : errorDetail;
  return `[${walletName}] ${context}: ${detail}`;
}

/**
 * Determines if a principal is anonymous
 * @param principal Principal as string or Principal object
 * @returns True if the principal is anonymous
 */
export function isPrincipalAnonymous(principal: string | Principal): boolean {
  try {
    const principalObj = typeof principal === "string"
      ? Principal.fromText(principal)
      : principal;
    return principalObj.isAnonymous();
  } catch (err) {
    console.error("[IcUtils] Error checking anonymous principal:", err);
    // If there's an error parsing the principal, it's not a valid principal
    return true;
  }
}

/**
 * Creates a standard wallet account object from a principal
 * @param principal Principal as string or Principal object
 * @returns Wallet.Account object with owner and subaccount
 */
export async function createAccountFromPrincipal(principal: string | Principal): Promise<{
  owner: string,
  subaccount: string
}> {
  const principalText = typeof principal === "string" ? principal : principal.toText();
  return {
    owner: principalText,
    subaccount: deriveAccountId(principal)
  };
}

/**
 * Helper to fetch root keys if configured to do so
 * @param agent HttpAgent to fetch root keys for
 * @param fetchRootKeys Boolean indicating whether to fetch root keys
 * @param logPrefix Optional prefix for log messages
 */
export async function fetchRootKeysIfNeeded(
  agent: HttpAgent,
  fetchRootKeys: boolean | undefined,
): Promise<void> {
  if (fetchRootKeys) {
    try {
      await agent.fetchRootKey();
    } catch (e) {
      console.warn(`Adapter unable to fetch root key. Check replica status.`, e);
    }
  }
}

/**
 * Creates a cache key for actor caching
 * @param walletName Wallet name
 * @param canisterId Canister ID
 * @param requiresSigning Whether the actor requires signing
 * @returns Cache key string
 */
export function createActorCacheKey(
  walletName: string,
  canisterId: string,
  requiresSigning: boolean = false
): string {
  return `${walletName}-${canisterId}-${requiresSigning}`;
}

/**
 * Validates if a provided principal string is valid
 * @param principalText Principal as text string
 * @returns Boolean indicating if principal is valid
 */
export function isValidPrincipal(principalText: string | null | undefined): boolean {
  if (!principalText) return false;
  
  try {
    const principal = Principal.fromText(principalText);
    return !principal.isAnonymous();
  } catch (e) {
    return false;
  }
}

/**
 * Common retry logic for IC operations
 * @param operation Function to retry
 * @param maxRetries Maximum number of retries
 * @param delayMs Delay between retries in milliseconds
 * @returns Result of the operation
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxRetries - 1) {
        console.warn(`[IC] Operation failed, retrying (${attempt + 1}/${maxRetries})`, error);
        await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
  }
  
  throw lastError;
} 