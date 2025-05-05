import { Adapter } from "../types";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SiwsAdapter } from "./ic/SiwsAdapter";
import { IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter } from "./ic";

// Import logos
import phantomLogo from "../../assets/phantom.webp";
import solflareLogo from "../../assets/solflare.svg";
import backpackLogo from "../../assets/backpack.webp";
import walletconnectLogo from "../../assets/walletconnect.webp";
import oisyLogo from "../../assets/oisy_logo.webp";
import nfidLogo from "../../assets/nfid.webp";
import dfinityLogo from "../../assets/dfinity.webp";
import plugLogo from "../../assets/plug.webp";

// Define the unified adapters map
export const Adapters: Record<string, Adapter.Config> = {
  // Solana Adapters
  phantomSiws: {
    id: 'phantomSiws',
    enabled: false,
    walletName: "Phantom",
    logo: phantomLogo,
    website: "https://phantom.app",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
  solflareSiws: {
    id: 'solflareSiws',
    enabled: false,
    walletName: "Solflare",
    logo: solflareLogo,
    website: "https://solflare.com",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
  backpackSiws: {
    id: 'backpackSiws',
    enabled: false,
    walletName: "Backpack",
    logo: backpackLogo,
    website: "https://backpack.app",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
  walletconnectSiws: {
    id: 'walletconnectSiws',
    enabled: false,
    walletName: "WalletConnect",
    logo: walletconnectLogo,
    website: "https://walletconnect.com",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      projectId: 'YOUR_PROJECT_ID',
      appName: 'Windoge98',
      appDescription: 'A dApp using WalletConnect for Solana',
      appUrl: 'https://desktop.windoge98.com',
      appIcons: ['https://desktop.windoge98.com/logo.png'],
    },
  },

  // Internet Computer Adapters
  oisy: {
    id: 'oisy',
    enabled: true,
    walletName: "OISY Wallet",
    logo: oisyLogo,
    website: "https://oisy.com",
    chain: 'ICP',
    adapter: OisyAdapter,
    config: {
      signerUrl: "https://oisy.com/sign",
    },
  },
  nfid: {
    id: 'nfid',
    enabled: true,
    walletName: "NFID",
    logo: nfidLogo,
    website: "https://nfid.one",
    chain: 'ICP',
    adapter: NFIDAdapter,
    config: {
      signerUrl: "https://nfid.one/rpc",
      fetchRootKeys: false,
      verifyQuerySignatures: true,
    },
  },
  ii: {
    id: 'ii',
    enabled: true,
    walletName: "Internet Identity",
    logo: dfinityLogo,
    website: "https://internetcomputer.org",
    chain: 'ICP',
    adapter: IIAdapter,
    config: {
      identityProvider: "https://identity.ic0.app",
      fetchRootKeys: false,
      verifyQuerySignatures: true,
      derivationOrigin: undefined,
    },
  },
  plug: {
    id: 'plug',
    enabled: true,
    walletName: "Plug",
    logo: plugLogo,
    website: "https://plugwallet.ooo",
    chain: 'ICP',
    adapter: PlugAdapter,
    config: {
      delegationTargets: [],
      delegationTimeout: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
    },
  },
};

// Export all adapters for direct use
export { SiwsAdapter, IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter }; 