import { Adapter } from "../../types/index"; // Adjust path as needed
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SolSiwsAdapter } from "./SolSiwsAdapter"; // Placeholder for the actual adapter
import phantomLogo from "../../../assets/phantom.webp";
import solflareLogo from "../../../assets/solflare.svg";
import backpackLogo from "../../../assets/backpack.webp"; // Removed Backpack
import walletconnectLogo from "../../../assets/walletconnect.webp";

// Define the default SOL adapters map, including SIWS config
export const SolAdapters: Record<string, Adapter.Config> = {
  phantomSiws: {
    id: 'phantomSiws',
    enabled: false,
    walletName: "Phantom",
    logo: phantomLogo,
    website: "https://phantom.app",
    chain: 'SOL',
    adapter: SolSiwsAdapter, // Use the unified SIWS adapter
    config: {
      enabled: false, // Disabled by default, user must enable and configure
      solanaNetwork: WalletAdapterNetwork.Mainnet, // Default to mainnet
    },
  },
  solflareSiws: {
    id: 'solflareSiws',
    enabled: false,
    walletName: "Solflare",
    logo: solflareLogo,
    website: "https://solflare.com",
    chain: 'SOL',
    adapter: SolSiwsAdapter, // Use the unified SIWS adapter
    config: {
      enabled: false, // Disabled by default, user must enable and configure  
      solanaNetwork: WalletAdapterNetwork.Mainnet, // Default to mainnet
    },
  },
  backpackSiws: {
    id: 'backpackSiws',
    enabled: false,
    walletName: "Backpack",
    logo: backpackLogo,
    website: "https://backpack.app",
    chain: 'SOL',
    adapter: SolSiwsAdapter,
    config: {
      enabled: false, // Disabled by default, user must enable and configure
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
  walletconnectSiws: {
    id: 'walletconnectSiws',
    enabled: false, // Will be enabled by the app if configured
    walletName: "WalletConnect",
    logo: walletconnectLogo,
    website: "https://walletconnect.com",
    chain: 'SOL',
    adapter: SolSiwsAdapter, // Use SolSiwsAdapter for WalletConnect SIWS
    config: {
      // These are default values that will be overridden by app configuration
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      projectId: '', // Will be provided by the app
      // App metadata
      appName: 'W98 dApp', 
      appDescription: 'A dApp using WalletConnect for Solana',
      appUrl: 'https://w98.io',
      appIcons: ['https://w98.io/logo.png'],
    },
  },
};

export { SolSiwsAdapter }; 