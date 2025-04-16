// Utility functions for SIWS 

/**
 * Format a SIWS message object from canister into a string for signing
 * @param message The SIWS message object from the canister (expected fields based on spec)
 * @returns Formatted message string for signing
 */
export function formatSiwsMessage(message: any): string {
    // Convert timestamps from nanoseconds (BigInt) to ISO string
    // Assuming message.issued_at and message.expiration_time are BigInts
    const issuedAtDate = new Date(Number(message.issued_at / BigInt(1_000_000)));
    const expirationDate = new Date(Number(message.expiration_time / BigInt(1_000_000)));
    
    // Format according to SIWS spec EIP-4361 (with Solana specifics)
    let formattedMessage = `${message.domain} wants you to sign in with your Solana account:\n`;
    formattedMessage += `${message.address}\n\n`; // Solana address
    formattedMessage += (message.statement || "") + "\n\n"; // Optional statement
    formattedMessage += `URI: ${message.uri}\n`;
    formattedMessage += `Version: ${message.version}\n`; 
    formattedMessage += `Chain ID: ${message.chain_id || 'solana'}\n`; // Solana Chain ID might vary
    formattedMessage += `Nonce: ${message.nonce}\n`;
    formattedMessage += `Issued At: ${issuedAtDate.toISOString()}\n`;
    formattedMessage += `Expiration Time: ${expirationDate.toISOString()}`;
    
    // Optional fields according to EIP-4361, add if present in `message`
    if (message.request_id) formattedMessage += `\nRequest ID: ${message.request_id}`;
    if (message.resources) {
      formattedMessage += `\nResources:`;
      message.resources.forEach((resource: string) => {
        formattedMessage += `\n- ${resource}`;
      });
    }
    
    return formattedMessage;
  } 