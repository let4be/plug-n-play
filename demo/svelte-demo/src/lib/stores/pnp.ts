import { writable, derived, get } from 'svelte/store';
import { createPNP, type PNP, type ActorSubclass } from '../../../../../src'; // Only import what's exported
import { PnpEventType, type PnpEvent } from '../../../../../src/events';

// Create stores
export const selectedWalletId = writable<string | null>(null);
export const pnpInstance = writable<PNP | null>(null); // Store the actual PNP instance
export const isConnected = writable(false);
export const principalId = writable<string | null>(null); // Store Principal object
export const accountId = writable<string | null>(null); // Store Account ID string
export const lastEvent = writable<PnpEvent | null>(null);

// Derived store for available wallets from the initialized instance
export const availableWallets = derived(pnpInstance, ($pnp) => {
    return $pnp ? $pnp.getEnabledWallets() : [];
});

// Initialize PNP
export const initializePNP = () => {
    // Comprehensive configuration example
    const pnp = createPNP({
        // Network configuration
        dfxNetwork: 'ic', // 'ic' for mainnet, 'local' for local development
        hostUrl: 'https://icp0.io', // Mainnet endpoint
        
        // Security settings
        fetchRootKeys: false, // Set to true only for local development
        verifyQuerySignatures: true,
        
        // Delegation settings
        delegationTimeout: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000), // 24 hours in nanoseconds
        delegationTargets: [], // Add canister IDs that need delegation
        derivationOrigin: typeof window !== 'undefined' ? window.location.origin : '',
        
        // Storage settings
        localStorageKey: 'pnpConnectedWallet',
        
        // SIWS (Sign In With Service) settings
        siwsProviderCanisterId: undefined, // Add your SIWS provider canister ID if using SIWS
        
        // Adapter configurations
        adapters: {
            // Plug wallet adapter
            plug: {
                enabled: true,
                config: {
                    whitelist: [], // Add canister IDs that need to be whitelisted
                    host: 'https://icp0.io',
                    // Add any Plug-specific config here
                }
            },
            // Internet Identity adapter
            ii: {
                enabled: true,
                config: {
                    identityProvider: 'https://identity.ic0.app',
                    // Add any II-specific config here
                }
            }
        }
    });

    // Set up event listeners
    pnp.on(PnpEventType.CONNECTED, (event) => {
        console.log('Connected event:', event);
        lastEvent.set(event);
    });

    pnp.on(PnpEventType.DISCONNECTED, (event) => {
        console.log('Disconnected event:', event);
        lastEvent.set(event);
    });

    pnp.on(PnpEventType.ERROR, (event) => {
        console.error('Error event:', event);
        lastEvent.set(event);
    });

    pnp.on(PnpEventType.ACCOUNT_CHANGE, (event) => {
        console.log('Account changed event:', event);
        lastEvent.set(event);
    });

    pnp.on(PnpEventType.STATUS_CHANGE, (event) => {
        console.log('Status change event:', event);
        lastEvent.set(event);
    });

    // Set the actual instance
    pnpInstance.set(pnp);

    // Check for existing connection on init
    const storedWalletId = localStorage.getItem(pnp.config.localStorageKey || '');
    if (storedWalletId && !get(isConnected)) {
        pnp.connect().then(async account => {
            if (account && pnp.provider) {
                selectedWalletId.set(storedWalletId);
                isConnected.set(true);
                principalId.set(account.owner);
                try {
                    const accId = await pnp.provider.getAccountId();
                    accountId.set(accId);
                } catch (accIdError) {
                    console.error("Failed to get accountId after reconnect:", accIdError);
                    accountId.set(null);
                }
            }
        }).catch(err => {
            console.warn("Failed to auto-reconnect:", err);
            localStorage.removeItem(pnp.config.localStorageKey || '');
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
