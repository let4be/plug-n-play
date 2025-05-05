# Using WalletConnect with Solana SIWS

This document explains how to use WalletConnect with the Solana SIWS (Sign-In With Solana) adapter in the Plug-n-Play wallet library.

## Prerequisites

Before you can use WalletConnect with Solana SIWS, you need to:

1. Install the WalletConnect adapter:
   ```bash
   npm install @solana/wallet-adapter-walletconnect
   ```

2. Get a WalletConnect Project ID from the [WalletConnect Cloud](https://cloud.walletconnect.com/). This is required for WalletConnect v2.

## Configuration

To enable the WalletConnect adapter in your application:

```typescript
import { PnpConfig } from "@windoge98/plug-n-play";

// Configure Plug-n-Play with WalletConnect
const config: PnpConfig = {
  adapters: {
    walletconnectSiws: {
      enabled: true,
      config: {
        solanaNetwork: "mainnet", // or "devnet"
        walletConnectProjectId: "YOUR_PROJECT_ID", // Required
        // Optional metadata for your app
        appName: "Your App Name",
        appDescription: "Your app description",
        appUrl: "https://yourapp.com",
        appIcons: ["https://yourapp.com/logo.png"],
      }
    }
  }
};
```

## Usage Example

Here's a complete example of how to use WalletConnect with Solana SIWS:

```typescript
import { PlugNPlay, Adapter } from "@windoge98/plug-n-play";

// Initialize Plug-n-Play
const pnp = new PlugNPlay({
  adapters: {
    walletconnectSiws: {
      enabled: true,
      config: {
        solanaNetwork: "mainnet",
        walletConnectProjectId: "YOUR_PROJECT_ID",
        appName: "Your App Name",
        appDescription: "Your app description",
        appUrl: "https://yourapp.com",
        appIcons: ["https://yourapp.com/logo.png"],
        // SIWS provider canister ID (required for SIWS functionality)
        siwsProviderCanisterId: "YOUR_SIWS_PROVIDER_CANISTER_ID",
      }
    }
  }
});

// Connect with WalletConnect
async function connectWalletConnect() {
  try {
    // Get WalletConnect adapter
    const adapter = await pnp.getAdapter('walletconnectSiws');
    
    // Check if adapter is available
    if (!(await adapter.isAvailable())) {
      console.error("WalletConnect adapter is not available");
      return;
    }
    
    // Connect to the wallet
    const account = await adapter.connect();

    // Now you can use the adapter to interact with Solana and Internet Computer
    const principalId = await adapter.getPrincipal();
    
    // Get Solana address
    const solanaAddress = await adapter.getSolanaAddress();

    // Get balances
    const solBalance = await adapter.getSolBalance();
    
    const splTokenBalances = await adapter.getSplTokenBalances();
  } catch (error) {
    console.error("Error connecting with WalletConnect:", error);
  }
}
```

## How It Works

The WalletConnect Solana adapter allows users to connect their mobile wallets to your web application using a QR code or deep link. When a user connects, they can:

1. Sign transactions and messages from your application
2. Perform the SIWS flow to get Internet Computer identity
3. Access both Solana and Internet Computer resources with a single wallet connection

## Troubleshooting

If you encounter issues with WalletConnect:

1. Ensure your WalletConnect Project ID is correct
2. Check that you have the latest version of `@solana/wallet-adapter-walletconnect`
3. Make sure the user's wallet supports WalletConnect v2 protocol
4. Check browser console for specific error messages

## Compatibility

The WalletConnect adapter is compatible with many mobile wallets that support Solana and the WalletConnect protocol, including:

- Solflare Mobile
- Phantom Mobile
- Trust Wallet
- And many other WalletConnect v2 compatible wallets

Note that not all wallets support all features, particularly on testnets. 