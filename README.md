# Plug N Play for the Internet Computer

Plug N Play simplifies the integration of Internet Computer wallets into your decentralized applications (dApps). It provides a standardized interface for connecting to various wallets, managing transactions, and interacting with the Internet Computer blockchain.

## Features

- Seamless integration with multiple Internet Computer wallets
- Simplified wallet connection, disconnection, and other functions
- Supports ICRC wallet standards
- Experimental support for Sign-In with Solana (SIWS) via Phantom, Solflare, and WalletConnect
- Lightweight and easy to use

## Supported Wallets

- Internet Identity
- NFID
- Plug
- Oisy
- Phantom (SIWS)
- Solflare (SIWS)
- WalletConnect (SIWS)
- More to be added

## Installation

Install Plug N Play using npm:

```bash
npm install @windoge98/plug-n-play
# or
pnpm add @windoge98/plug-n-play
# or
yarn add @windoge98/plug-n-play
```

Install required peer dependencies for SIWS (if using SIWS adapters):

```bash
pnpm add @solana/wallet-adapter-base @solana/wallet-adapter-phantom @solana/wallet-adapter-solflare @solana/web3.js bs58
# For WalletConnect support, also add:
pnpm add @solana/wallet-adapter-walletconnect
```

## Basic Usage

Here's a minimal example of how to use Plug N Play:

```typescript
import { createPNP } from "@windoge98/plug-n-play";
import { HttpAgent, Actor } from "@dfinity/agent";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Example: Define your SIWS provider actor creation logic (replace with your actual implementation)
// You'll need the candid interface for your SIWS provider canister
import { idlFactory as siwsIdlFactory } from "./path/to/your/ic_siws_provider.did.js"; // Adjust path

const createSiwsActor = (canisterId, options) => {
  return Actor.createActor(siwsIdlFactory, {
    agent: options.agent,
    canisterId,
  });
};

// Initialize PNP with global and adapter-specific settings
const pnp = createPNP({
  // Global settings
  hostUrl: "http://localhost:4943", // Defaults to https://icp0.io, set to your local replica for local dev
  fetchRootKey: false, // Default is false, set true for local dev
  verifyQuerySignatures: false, // Default is true, set false for local dev
  derivationOrigin: "http://localhost:5173", // Optional: Set for local dev (required by II)
  dfxNetwork: "local", // Optional: Set for local dev

  // Adapter-specific configurations
  adapters: {
    // Standard IC Wallets
    oisy: {
      enabled: true,
      config: { /* Oisy specific config */ },
    },
    nfid: {
      enabled: true,
      config: { /* NFID specific config */ },
    },
    ii: {
      enabled: true,
      config: {
        identityProvider: "http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai", // Example for local dev
      },
    },
    plug: {
      enabled: true,
      config: { /* Plug specific config */ },
    },
    // SIWS Adapters (Experimental)
    phantomSiws: { // Use adapter ID from SolAdapters map
      enabled: true, // Must be explicitly enabled
      config: {
        // --- Required SIWS Config ---
        siwsProviderCanisterId: "YOUR_SIWS_PROVIDER_CANISTER_ID", // Replace with your deployed canister ID
        // --- Optional SIWS Config ---
        solanaNetwork: WalletAdapterNetwork.Devnet, // Default: Mainnet
      },
    },
    solflareSiws: { // Use adapter ID from SolAdapters map
      enabled: true, // Must be explicitly enabled
      config: {
        // --- Required SIWS Config ---
        siwsProviderCanisterId: "YOUR_SIWS_PROVIDER_CANISTER_ID",
        // --- Optional SIWS Config ---
        solanaNetwork: WalletAdapterNetwork.Devnet,
      },
    },
    walletconnectSiws: { // WalletConnect support
      enabled: true, // Must be explicitly enabled
      config: {
        // --- Required SIWS Config ---
        siwsProviderCanisterId: "YOUR_SIWS_PROVIDER_CANISTER_ID",
        // --- Required WalletConnect Config ---
        walletConnectProjectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Get from cloud.walletconnect.com
        // --- Optional Config ---
        solanaNetwork: WalletAdapterNetwork.Mainnet,
        appName: "Your App Name",
        appDescription: "Your app description",
        appUrl: "https://yourapp.com",
        appIcons: ["https://yourapp.com/logo.png"],
      },
    },
  },
});

// Get the list of enabled wallets AFTER initialization
const availableWallets = pnp.getEnabledWallets();
console.log("Available wallets:", availableWallets);
// Returns an array of Adapter.Config objects for enabled wallets

// Connect to a wallet (works for both IC and SIWS wallets)
async function connectWallet(walletId: string) {
  try {
    const account = await pnp.connect(walletId);
    console.log("Connected account:", account);
    // For SIWS, account.owner will be the IC Principal derived via SIWS
    // account.subaccount will likely be null
    return account;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
}

// Interact with a canister (works after connecting with any wallet type)
async function interactWithCanister(canisterId: string, idl: any) {
  try {
    // Get an authenticated actor (uses the connected wallet's identity)
    const actor = pnp.getActor(canisterId, idl);
    // Get an anonymous actor
    const anonActor = pnp.getActor(canisterId, idl, { anon: true });
    // Now you can call methods on your actors
    return { actor, anonActor };
  } catch (error) {
    console.error("Failed to get canister actor:", error);
    throw error;
  }
}

// Disconnect wallet
async function disconnectWallet() {
  try {
    await pnp.disconnect();
    console.log("Wallet disconnected");
  } catch (error) {
    console.error("Failed to disconnect wallet:", error);
    throw error;
  }
}
```

## Sign-In with Solana (SIWS) Configuration

The SIWS adapters (`phantomSiws`, `solflareSiws`, `walletconnectSiws`) allow users to authenticate with their Internet Computer application using their Solana wallet.

**Important:** These adapters require specific configuration:

1.  **`siwsProviderCanisterId` (Required):** The canister ID of your deployed [IC SIWS Provider canister](https://github.com/kristoferlund/ic-siws-provider). This canister handles the SIWS verification flow on the IC. The PNP library uses the standard IDL for this canister internally.
2.  **`solanaNetwork` (Optional):** The Solana network to use (`WalletAdapterNetwork.Mainnet` or `WalletAdapterNetwork.Devnet`). Defaults to `Mainnet`.
3.  **For WalletConnect specifically:**
    - **`walletConnectProjectId` (Required):** A project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).
    - **`appName`, `appDescription`, `appUrl`, `appIcons` (Optional):** Metadata for your application that will be shown to users when connecting their wallets.

For more details on using WalletConnect, see the [WalletConnect documentation](docs/walletconnect.md).

Make sure you have installed the necessary peer dependencies for the Solana wallet adapters as shown in the [Installation](#installation) section.

## Working with the ICP Ledger

Example of interacting with the ICP ledger:

```typescript
import { Principal } from "@dfinity/principal";
import { ICRC1_IDL } from "@windoge98/plug-n-play/dist/idls/icrc1.idl"; // Assuming ICRC1 IDL is needed

const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";

// Get account balance
async function getBalance(principal: string) {
  // Ensure pnp is initialized and connected
  const actor = pnp.getActor(LEDGER_CANISTER_ID, ICRC1_IDL);
  const balance = await actor.icrc1_balance_of({
    owner: Principal.fromText(principal),
    subaccount: [],
  });
  console.log(`Balance for ${principal}:`, balance);
  return balance;
}

// Transfer ICP
async function transfer(to: string, amount: bigint) {
  // Ensure pnp is initialized and connected
  const actor = pnp.getActor(LEDGER_CANISTER_ID, ICRC1_IDL);
  const result = await actor.icrc1_transfer({
    to: {
      owner: Principal.fromText(to),
      subaccount: [],
    },
    amount,
    fee: [], // Use default fee
    memo: [],
    from_subaccount: [],
    created_at_time: [],
  });
  console.log("Transfer result:", result);
  return result;
}
```

## Best Practices

1.  Always initialize PNP *before* attempting to connect to a wallet.
2.  Use `try-catch` blocks when calling asynchronous PNP methods (`connect`, `disconnect`, actor calls).
3.  Set appropriate delegation timeouts in your identity provider (like Internet Identity) based on your security requirements.
4.  Implement user-friendly error handling for all wallet operations (connection failures, rejected signatures, etc.).
5.  Clean up resources by calling `disconnect` when the user logs out or closes the application session.
6.  For local development, ensure `hostUrl`, `fetchRootKey`, `verifyQuerySignatures`, and adapter-specific settings (like II `identityProvider`) are configured correctly for your local replica.
7.  When using SIWS adapters, ensure the required peer dependencies are installed and the `siwsProviderCanisterId` and `siwsProviderCreateActor` are correctly configured.
8.  For WalletConnect, always obtain a unique project ID from WalletConnect Cloud and provide it in your configuration.

## License

This project is licensed under the [MIT License](https://github.com/microdao-corporation/plug-n-play/blob/main/LICENSE.txt).

## Support

If you encounter any issues or have questions, please file an issue on our [GitHub issue tracker](https://github.com/microdao-corporation/plug-n-play/issues).

---
