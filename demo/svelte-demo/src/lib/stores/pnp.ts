import { writable, derived, get } from 'svelte/store';
import { createPNP, type PNP, type Wallet, type Adapter, type ActorSubclass } from '../../../../../src'; // Keep relative path for now

// Create stores
export const selectedWalletId = writable<string | null>(null);
export const pnpInstance = writable<PNP | null>(null); // Store the actual PNP instance
export const isConnected = writable(false);
export const principalId = writable<string | null>(null); // Store Principal object
export const accountId = writable<string | null>(null); // Store Account ID string

// Derived store for available wallets from the initialized instance
export const availableWallets = derived(pnpInstance, ($pnp) => {
    return $pnp ? $pnp.getEnabledWallets() : [];
});

// Initialize PNP
export const initializePNP = () => {
    // Use default config for the demo for now
    const pnp = createPNP({
        hostUrl: 'https://icp0.io',
        // Example of new adapter config (if needed later):
        /*
        adapters: {
            ii: {
                identityProvider: 'https://identity.ic0.app'
            }
        }
        */
    });

    // Set the actual instance, no wrapper needed
    pnpInstance.set(pnp);

    // Check for existing connection on init
    const storedWalletId = localStorage.getItem(pnp.config.localStorageKey);
    if (storedWalletId && !get(isConnected)) { // Check if not already connected
        pnp.connect().then(async account => { // Make callback async
            if (account && pnp.provider) { // Check for provider too
                selectedWalletId.set(storedWalletId);
                isConnected.set(true);
                principalId.set(account.owner);
                try {
                    const accId = await pnp.provider.getAccountId(); // Fetch accountId
                    accountId.set(accId);
                } catch (accIdError) {
                    console.error("Failed to get accountId after reconnect:", accIdError);
                    accountId.set(null); // Reset on error
                }
            }
        }).catch(err => {
             console.warn("Failed to auto-reconnect:", err);
             localStorage.removeItem(pnp.config.localStorageKey); // Clear invalid storage
             // Ensure state is reset if auto-reconnect fails
             selectedWalletId.set(null);
             isConnected.set(false);
             principalId.set(null);
             accountId.set(null);
        });
    }

    return pnp;
};

// Connect wallet
export const connectWallet = async (walletId: string) => {
    const pnp = get(pnpInstance);
    if (!pnp) {
        throw new Error('PNP not initialized');
    }

    // Reset state before attempting connection
    selectedWalletId.set(null);
    isConnected.set(false);
    principalId.set(null);
    accountId.set(null);

    try {
        const account = await pnp.connect(walletId);
        if (!account || !pnp.provider) { // Check for provider too
            throw new Error("Connection failed, was cancelled, or provider is missing.");
        }
        selectedWalletId.set(walletId);
        isConnected.set(true);
        principalId.set(account.owner);
        
        // Fetch account ID after successful connection
        try {
            const accId = await pnp.provider.getAccountId();
            accountId.set(accId);
        } catch (accIdError) {
             console.error("Failed to get accountId after connect:", accIdError);
             accountId.set(null); // Set accountId to null if fetch fails
             // Decide if this error should disconnect the user or just log
             // For now, we stay connected but without accountId
        }

        return account;
    } catch (error) {
        console.error('Failed to connect wallet:', error);
        // Ensure state is reset on any connection error
        selectedWalletId.set(null);
        isConnected.set(false);
        principalId.set(null);
        accountId.set(null);
        if (pnp.provider) {
           try { await pnp.disconnect(); } catch (_) {} // Attempt cleanup
        }
        throw error;
    }
};

// Disconnect wallet
export const disconnectWallet = async () => {
    const pnp = get(pnpInstance);
    if (!pnp) return;

    try {
        await pnp.disconnect();
        selectedWalletId.set(null);
        isConnected.set(false);
        principalId.set(null);
        accountId.set(null);
    } catch (error) {
        console.error('Failed to disconnect wallet:', error);
        // Optionally reset state even on disconnect error
        selectedWalletId.set(null);
        isConnected.set(false);
        principalId.set(null);
        accountId.set(null);
        throw error;
    }
};

// Initialize PNP on load
initializePNP();
