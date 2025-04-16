/**
 * Format a SIWS message object from canister into a string for signing
 * @param message The SIWS message object from the canister (expected fields based on spec)
 * @returns Formatted message string for signing
 */
export declare function formatSiwsMessage(message: any): string;
