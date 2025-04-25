import { Adapter } from "../../types/index"; // Adjust path as needed
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SolSiwsAdapter } from "./SolSiwsAdapter"; // Placeholder for the actual adapter
import phantomLogo from "../../../assets/phantom.svg";
import solflareLogo from "../../../assets/solflare.svg";
import backpackLogo from "../../../assets/backpack.png"; // Removed Backpack

// Define the default SOL adapters map, including SIWS config
export const SolAdapters: Record<string, Adapter.Info> = {
  phantomSiws: {
    enabled: false, // Disabled by default, user must enable and configure
    id: 'phantomSiws',
    walletName: "Phantom",
    logo: phantomLogo,
    website: "https://phantom.app",
    chain: 'SOL',
    adapter: SolSiwsAdapter, // Use the unified SIWS adapter
    config: {
      solanaNetwork: WalletAdapterNetwork.Mainnet, // Default to mainnet
    },
  },
  solflareSiws: {
    enabled: false, // Disabled by default, user must enable and configure
    id: 'solflareSiws',
    walletName: "Solflare",
    logo: solflareLogo,
    website: "https://solflare.com",
    chain: 'SOL',
    adapter: SolSiwsAdapter, // Use the unified SIWS adapter
    config: {
      solanaNetwork: WalletAdapterNetwork.Mainnet, // Default to mainnet
    },
  },
  backpackSiws: {
    enabled: false, // Disabled by default, user must enable and configure
    id: 'backpackSiws',
    walletName: "Backpack",
    logo: backpackLogo,
    website: "https://backpack.app",
    chain: 'SOL',
    adapter: SolSiwsAdapter,
    config: {
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
};

export { SolSiwsAdapter }; 