// Path: src/adapters/ic/index.ts
// Import adapters
import { IIAdapter } from "./IIAdapter";
import { PlugAdapter } from "./PlugAdapter";
import { NFIDAdapter } from "./NFIDAdapter";
import { OisyAdapter } from "./OisyAdapter";
import { Adapter } from "../../types";
import oisyLogo from "../../../assets/oisy_logo.webp";
import nfidLogo from "../../../assets/nfid.webp";
import dfinityLogo from "../../../assets/dfinity.webp";
import plugLogo from "../../../assets/plug.webp";

// Define the default adapters map using the NESTED config structure again
const ICAdapters: Record<string, Adapter.Config> = {
  'oisy': {
    id: 'oisy',
    enabled: true,  
    walletName: "OISY Wallet",
    logo: oisyLogo, 
    website: "https://oisy.com",
    chain: 'ICP',
    adapter: OisyAdapter,
    // Use nested config
    config: {
      signerUrl: "https://oisy.com/sign", 
    },
  },
  'nfid': {
    id: 'nfid',
    enabled: true,
    walletName: "NFID",
    logo: nfidLogo, 
    website: "https://nfid.one",
    chain: 'ICP',
    adapter: NFIDAdapter,
    // Use nested config
    config: {
      signerUrl: "https://nfid.one/rpc",
      fetchRootKeys: false,
      verifyQuerySignatures: true,
    },
  },
  'ii': {
    id: 'ii',
    enabled: true,
    walletName: "Internet Identity",
    logo: dfinityLogo,
    website: "https://internetcomputer.org",
    chain: 'ICP',
    adapter: IIAdapter,
    // Use nested config
    config: {
      identityProvider: "https://identity.ic0.app",
      fetchRootKeys: false, // Default based on global config
      verifyQuerySignatures: true, // Default based on global config
      derivationOrigin: undefined, // Default based on global config
    },
  },
  'plug': {
    id: 'plug',
    enabled: true,
    walletName: "Plug",
    logo: plugLogo, 
    website: "https://plugwallet.ooo",
    chain: 'ICP',
    adapter: PlugAdapter,
    config: {
      delegationTargets: [],
      delegationTimeout: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
    },
  },
};

export { IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter, ICAdapters };
