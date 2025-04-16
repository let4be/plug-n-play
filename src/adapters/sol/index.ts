import { Adapter } from "../../types/index"; // Adjust path as needed
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SolSiwsAdapter } from "./SolSiwsAdapter"; // Placeholder for the actual adapter
import phantomLogo from "../../../assets/phantom.svg";
import solflareLogo from "../../../assets/solflare.svg";
import backpackLogo from "../../../assets/backpack.png";

// Define the default SOL adapters map, including SIWS config
export const SolAdapters: Record<string, Adapter.Info> = {
  phantomSiws: {
    id: 'phantomSiws',
    walletName: "Phantom",
    logo: phantomLogo,
    adapter: SolSiwsAdapter, // Use the unified SIWS adapter
    config: {
      enabled: false, // Disabled by default, user must enable and configure
      solanaNetwork: WalletAdapterNetwork.Mainnet, // Default to mainnet
    },
  },
  solflareSiws: {
    id: 'solflareSiws',
    walletName: "Solflare",
    logo: solflareLogo,
    adapter: SolSiwsAdapter, // Use the unified SIWS adapter
    config: {
      enabled: false, // Disabled by default, user must enable and configure
      solanaNetwork: WalletAdapterNetwork.Mainnet, // Default to mainnet
    },
  },
  backpackSiws: {
    id: 'backpackSiws',
    walletName: "Backpack",
    logo: backpackLogo,
    adapter: SolSiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
};

export { SolSiwsAdapter }; 