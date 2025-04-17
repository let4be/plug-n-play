// Placeholder for the Solana SIWS Adapter
import { Adapter, Wallet } from "../../types/index.d";
import {
  HttpAgent,
  ActorSubclass,
  AnonymousIdentity,
  Identity,
  Actor,
} from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  WalletAdapterNetwork,
  WalletReadyState,
  type Adapter as SolanaAdapter,
  type MessageSignerWalletAdapterProps,
} from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Ed25519KeyIdentity,
  DelegationIdentity,
  DelegationChain,
  Delegation,
} from "@dfinity/identity";
import bs58 from "bs58";
import { formatSiwsMessage } from "./utils";
import type { _SERVICE as SiwsProviderService } from "../../did/ic_siws_provider";
import { idlFactory as siwsProviderIdlFactory } from "../../did/ic_siws_provider.did.js";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { hexStringToUint8Array } from "@dfinity/utils";
import {
  TOKEN_PROGRAM_ID,
  getAccount,
  type Account as TokenAccount,
} from "@solana/spl-token";

// Define SIWS Provider Actor interface using generated types
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;

// Define the shape of the config object the adapter expects
// This combines global PNPConfig and specific adapter config
type SolSiwsAdapterConfig = Wallet.PNPConfig & Adapter.Info["config"];

// Add TokenInfo interface 
export interface TokenInfo {
  symbol: string;
  name: string;
  logoURI?: string;
  decimals: number;
  address: string;
  price?: number; // USD price
}

export interface SplTokenBalance {
    mint: string; // The token mint address (identifier)
    amount: string; // The raw token amount (smallest unit)
    decimals: number; // Number of decimals for the token
    uiAmount: number; // The user-friendly amount (amount / 10^decimals)
    symbol?: string; // Optional: Token symbol (if known)
    name?: string; // Optional: Token name (if known)
    logo?: string; // Optional: Token logo URL (if known)
    usdValue?: number; // Optional: Value in USD
}

export class SolSiwsAdapter implements Adapter.Interface {
  public walletName: string;
  public logo: string;
  public readonly id: string;
  static supportedChains: Adapter.Chain[] = [Adapter.Chain.ICP, Adapter.Chain.SOL];


  private config: SolSiwsAdapterConfig;
  private state: Adapter.Status = Adapter.Status.INIT;
  private solanaAdapter: SolanaAdapter;
  private solanaConnection: Connection;
  private identity: Identity | null = null; // Holds the DelegationIdentity after SIWS flow
  private principal: Principal | null = null;
  private solanaAddress: string | null = null;

  // Add a private property to cache token list
  private tokenListCache: Record<string, TokenInfo> | null = null;
  // Add a private property to cache token prices
  private tokenPricesTimestamp: number = 0;

  constructor(adapterInfo: Adapter.Info, pnpConfig: Wallet.PNPConfig) {
    this.id = adapterInfo.id;
    this.walletName = adapterInfo.walletName;
    this.logo = adapterInfo.logo;

    // Merge global and adapter-specific configs
    this.config = {
      ...pnpConfig,
      ...adapterInfo.config,
    };

    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    const endpoint =
      network === WalletAdapterNetwork.Mainnet
        ? "https://wiser-omniscient-thunder.solana-mainnet.quiknode.pro/c3a27d9cb72eb335a30e3407d576ef64e61b4e8d" // Replace with preferred mainnet endpoint if needed
        : "https://api.devnet.solana.com";
    this.solanaConnection = new Connection(endpoint);

    // Instantiate the correct Solana adapter based on the ID
    if (this.id === "phantomSiws") {
      this.solanaAdapter = new PhantomWalletAdapter();
    } else if (this.id === "solflareSiws") {
      this.solanaAdapter = new SolflareWalletAdapter({ network });
    } else if (this.id === "backpackSiws") {
      this.solanaAdapter = new BackpackWalletAdapter();
    } else {
      throw new Error(
        `Unsupported SIWS adapter ID: ${this.id}. Expected 'phantomSiws', 'solflareSiws', or 'backpackSiws'.`
      );
    }

    this.setupWalletListeners();
    this.state = Adapter.Status.READY;
  }

  private setupWalletListeners(): void {
    this.solanaAdapter.on("connect", this.handleSolanaConnect);
    this.solanaAdapter.on("disconnect", this.handleSolanaDisconnect);
    this.solanaAdapter.on("error", this.handleSolanaError);
  }

  private removeWalletListeners(): void {
    this.solanaAdapter.off("connect", this.handleSolanaConnect);
    this.solanaAdapter.off("disconnect", this.handleSolanaDisconnect);
    this.solanaAdapter.off("error", this.handleSolanaError);
  }

  // Bound event handlers to maintain `this` context
  private handleSolanaConnect = (publicKey: PublicKey): void => {
    console.log(
      `[${this.walletName}] Solana wallet connected:`,
      publicKey.toBase58()
    );
    this.solanaAddress = publicKey.toBase58();
    // Connection established, SIWS flow will happen in `connect` method
  };

  private handleSolanaDisconnect = (): void => {
    console.log(`[${this.walletName}] Solana wallet disconnected.`);
    // If the wallet disconnects externally, trigger a full disconnect/cleanup
    if (
      this.state !== Adapter.Status.DISCONNECTING &&
      this.state !== Adapter.Status.DISCONNECTED
    ) {
      this.disconnect();
    }
  };

  private handleSolanaError = (error: any): void => {
    console.error(`[${this.walletName}] Solana wallet error:`, error);
    this.state = Adapter.Status.ERROR;
    // Optionally trigger disconnect on error
    this.disconnect();
  };

  // --- Adapter.Interface Implementation ---

  async isAvailable(): Promise<boolean> {
    // Check if the selected Solana adapter is ready
    return (
      this.solanaAdapter.readyState === WalletReadyState.Installed ||
      this.solanaAdapter.readyState === WalletReadyState.Loadable
    );
  }

  async isConnected(): Promise<boolean> {
    // Check both Solana wallet connection and successful SIWS delegation
    return (
      this.solanaAdapter.connected &&
      this.identity !== null &&
      !this.identity.getPrincipal().isAnonymous()
    );
  }

  async connect(): Promise<Wallet.Account> {
    if (
      this.state === Adapter.Status.CONNECTING ||
      this.state === Adapter.Status.CONNECTED
    ) {
      // Already connecting or connected
      return { owner: this.principal?.toText(), subaccount: null };
    }
    if (
      this.state !== Adapter.Status.READY &&
      this.state !== Adapter.Status.DISCONNECTED
    ) {
      throw new Error(`Cannot connect while in state: ${this.state}`);
    }

    this.state = Adapter.Status.CONNECTING;

    try {
      // 1. Ensure Solana Wallet is Connected
      if (!this.solanaAdapter.connected) {
        console.log(`[${this.walletName}] Connecting Solana wallet...`);
        await this.solanaAdapter.connect(); // This triggers the 'connect' listener if successful
      }
      // Ensure address is set (might happen via listener or if already connected)
      if (!this.solanaAdapter.publicKey) {
        throw new Error(
          "Solana wallet connected but public key not available."
        );
      }
      this.solanaAddress = this.solanaAdapter.publicKey.toBase58();
      console.log(
        `[${this.walletName}] Using Solana address:`,
        this.solanaAddress
      );

      // 2. Perform SIWS Flow
      console.log(`[${this.walletName}] Starting SIWS flow...`);
      const siwsResult = await this.performSiwsLogin(this.solanaAddress);
      this.identity = siwsResult.identity;
      this.principal = siwsResult.principal;

      if (!this.principal || this.principal.isAnonymous()) {
        throw new Error(
          "SIWS flow completed but resulted in an anonymous principal."
        );
      }

      this.state = Adapter.Status.CONNECTED;
      console.log(
        `[${
          this.walletName
        }] SIWS Connect successful. Principal: ${this.principal.toText()}`
      );

      // Return the IC account details
      return { owner: this.principal?.toText(), subaccount: null }; // SIWS typically doesn't involve subaccounts
    } catch (error) {
      console.error(`[${this.walletName}] Connect failed:`, error);
      this.state = Adapter.Status.ERROR;
      await this.disconnect(); // Attempt cleanup on failure
      throw error; // Re-throw the error for PNP core to handle
    }
  }

  async disconnect(): Promise<void> {
    if (
      this.state === Adapter.Status.DISCONNECTING ||
      this.state === Adapter.Status.DISCONNECTED
    ) {
      return;
    }
    const previousState = this.state;
    this.state = Adapter.Status.DISCONNECTING;
    console.log(`[${this.walletName}] Disconnecting...`);

    try {
      // Disconnect Solana wallet if connected
      if (this.solanaAdapter.connected) {
        // Temporarily remove listener to prevent disconnect loop if disconnect() triggers event
        this.removeWalletListeners();
        await this.solanaAdapter.disconnect();
        this.setupWalletListeners(); // Re-attach listeners
      }
    } catch (error) {
      console.warn(
        `[${this.walletName}] Error during Solana disconnect:`,
        error
      );
      // Continue cleanup even if Solana disconnect fails
    } finally {
      // Clear internal state
      this.identity = null;
      this.principal = null;
      this.solanaAddress = null;
      // Clear localStorage persistence (assuming PNP core handles this based on activeWallet)
      this.state = Adapter.Status.DISCONNECTED;
      console.log(`[${this.walletName}] Disconnected.`);
    }
  }

  async getPrincipal(): Promise<string> {
    if (!this.principal) {
      throw new Error("Not connected or SIWS flow not completed.");
    }
    return this.principal.toText();
  }

  // Standard implementation for getAccountId, can be overridden by subclasses if needed
  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    if (!principal)
      throw new Error("Principal not available to derive account ID");
    return AccountIdentifier.fromPrincipal({
      principal: Principal.fromText(principal),
      subAccount: undefined, // Default subaccount
    }).toHex();
  }

  async getSolanaAddress(): Promise<string> {
    // For SIWS, the primary identifier is the Solana address
    if (!this.solanaAddress) {
      throw new Error("Not connected or Solana address not available.");
    }
    return this.solanaAddress;
  }

  async getAddresses(): Promise<Adapter.Addresses> {
    return {
      sol: this.solanaAddress,
      icp: {
        owner: this.principal?.toText(),
        subaccount: this.getAccountId(),
      },
    };
  }

  createActor<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning ?? true;
    if (requiresSigning && !this.identity) {
      throw new Error(
        "Cannot create signed actor: Not connected or SIWS flow not completed."
      );
    }

    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity: this.identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });

    return Actor.createActor<T>(idl, { agent, canisterId });
  }

  // --- Balance Fetching Methods ---

  /**
   * Fetches token prices from Jupiter API
   * @returns A map of token addresses to their USD prices
   */
  private async getTokenPrices(): Promise<Record<string, number>> {
    try {
      // Check if we've fetched prices recently (within last 2 minutes)
      const now = Date.now();
      if (this.tokenListCache && this.tokenPricesTimestamp > 0 && 
          now - this.tokenPricesTimestamp < 2 * 60 * 1000) {
        // Return cached prices
        const priceMap: Record<string, number> = {};
        for (const [address, tokenInfo] of Object.entries(this.tokenListCache)) {
          if (tokenInfo.price) {
            priceMap[address] = tokenInfo.price;
          }
        }
        return priceMap;
      }
      
      // Get a list of token addresses from our token list
      const tokenMap = await this.getTokenList();
      
      // Create request URL with token addresses
      const tokenAddresses = Object.keys(tokenMap);
      
      // Split into smaller chunks to avoid URL length limits
      const tokenChunks = [];
      for (let i = 0; i < tokenAddresses.length; i += 50) {
        tokenChunks.push(tokenAddresses.slice(i, i + 50));
      }
      
      const priceMap: Record<string, number> = {};
      
      // Process each chunk
      for (const chunk of tokenChunks) {
        try {
          // Always include SOL in each request
          const requestIds = ['SOL', ...chunk].join(',');
          const response = await fetch(`https://price.jup.ag/v4/price?ids=${requestIds}`);
          
          if (!response.ok) {
            console.warn(`Failed to fetch Jupiter prices for chunk, status: ${response.status}`);
            continue;
          }
          
          const priceData = await response.json();
          
          // Process Jupiter response data
          if (priceData.data) {
            for (const [address, data] of Object.entries(priceData.data)) {
              if (data && typeof data === 'object' && 'price' in data && data.price !== null) {
                const price = Number(data.price);
                if (!isNaN(price) && price > 0) {
                  priceMap[address] = price;
                  
                  // Update price in token cache
                  if (this.tokenListCache && this.tokenListCache[address]) {
                    this.tokenListCache[address].price = price;
                  }
                }
              }
            }
          }
        } catch (chunkError) {
          console.warn(`Error fetching prices for token chunk:`, chunkError);
          // Continue with next chunk
        }
      }
      
      // Update timestamp
      this.tokenPricesTimestamp = now;
      
      console.log(`[${this.walletName}] Loaded prices for ${Object.keys(priceMap).length} tokens`);
      return priceMap;
    } catch (error) {
      console.warn(`[${this.walletName}] Failed to fetch token prices:`, error);
      return {}; // Return empty object on error
    }
  }

  /**
   * Fetches token metadata from the Solana token list
   * @returns A record mapping token addresses to their metadata
   */
  private async getTokenList(): Promise<Record<string, TokenInfo>> {
    if (this.tokenListCache) {
      return this.tokenListCache;
    }
    
    try {
      // First try the Jupiter token list which is well-maintained
      const response = await fetch('https://token.jup.ag/all');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Jupiter token list: ${response.status}`);
      }
      
      const tokenList = await response.json();
      const tokenMap: Record<string, TokenInfo> = {};
      
      // Process and cache the token list
      for (const token of tokenList) {
        if (token.address && token.symbol) {
          tokenMap[token.address] = {
            symbol: token.symbol,
            name: token.name || token.symbol,
            logoURI: token.logoURI,
            decimals: token.decimals || 0,
            address: token.address
          };
        }
      }
      
      this.tokenListCache = tokenMap;
      console.log(`[${this.walletName}] Loaded metadata for ${Object.keys(tokenMap).length} tokens`);
      return tokenMap;
    } catch (error) {
      console.warn(`[${this.walletName}] Failed to fetch token list:`, error);
      // Return empty object on error
      return {};
    }
  }

  /**
   * Fetches the native SOL balance for the connected wallet with USD value.
   * @returns The balance in SOL (not lamports) and USD value.
   * @throws If the wallet is not connected or the public key is unavailable.
   */
  async getSolBalance(): Promise<{ amount: number; usdValue?: number }> {
    if (!this.solanaAdapter.connected || !this.solanaAdapter.publicKey) {
      throw new Error(
        "Solana wallet not connected or public key unavailable to fetch SOL balance."
      );
    }
    const lamports = await this.solanaConnection.getBalance(
      this.solanaAdapter.publicKey
    );
    const solAmount = lamports / LAMPORTS_PER_SOL;
    
    try {
      // Get SOL price directly with a dedicated call
      const response = await fetch('https://price.jup.ag/v4/price?ids=SOL');
      if (!response.ok) {
        throw new Error(`Failed to fetch SOL price, status: ${response.status}`);
      }
      
      const priceData = await response.json();
      // Extract SOL price - add more detailed logging
      console.log("SOL price data:", JSON.stringify(priceData, null, 2));
      
      if (priceData?.data?.SOL?.price) {
        const solPrice = Number(priceData.data.SOL.price);
        if (!isNaN(solPrice) && solPrice > 0) {
          return {
            amount: solAmount,
            usdValue: solAmount * solPrice
          };
        }
      }
    } catch (error) {
      console.warn(`[${this.walletName}] Failed to fetch SOL price:`, error);
    }
    
    return { amount: solAmount };
  }

  /**
   * Fetches the balances of all SPL tokens owned by the connected wallet.
   * @returns An array of SplTokenBalance objects.
   * @throws If the wallet is not connected or the public key is unavailable.
   */
  async getSplTokenBalances(): Promise<SplTokenBalance[]> {
    if (!this.solanaAdapter.connected || !this.solanaAdapter.publicKey) {
      throw new Error(
        "Solana wallet not connected or public key unavailable to fetch SPL token balances."
      );
    }

    try {
      // Fetch SOL balance first
      const lamports = await this.solanaConnection.getBalance(
        this.solanaAdapter.publicKey
      );
      const solAmount = lamports / LAMPORTS_PER_SOL;
      
      // Make a specific request for SOL price
      let solUsdValue: number | undefined = undefined;
      try {
        const solPriceResponse = await fetch('https://price.jup.ag/v4/price?ids=SOL');
        if (solPriceResponse.ok) {
          const solPriceData = await solPriceResponse.json();
          console.log("SOL price data:", JSON.stringify(solPriceData, null, 2));
          
          if (solPriceData?.data?.SOL?.price) {
            const solPrice = Number(solPriceData.data.SOL.price);
            if (!isNaN(solPrice) && solPrice > 0) {
              solUsdValue = solAmount * solPrice;
              console.log(`SOL price: $${solPrice}, USD value: $${solUsdValue}`);
            }
          }
        }
      } catch (solPriceError) {
        console.error("Error fetching SOL price:", solPriceError);
      }
      
      // Fetch token accounts
      const tokenAccounts = await this.solanaConnection.getTokenAccountsByOwner(
        this.solanaAdapter.publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
      
      // Extract mint addresses to use for price fetching
      const mintAddresses: string[] = [];
      const accountsToProcess: Array<{pubkey: PublicKey, account: any}> = [];
      
      for (const item of tokenAccounts.value) {
        try {
          const accountInfo = await this.solanaConnection.getParsedAccountInfo(item.pubkey);
          
          if (!accountInfo.value) continue;
          
          const parsedData = 'parsed' in accountInfo.value.data ? 
            accountInfo.value.data.parsed : null;
            
          if (!parsedData || parsedData.type !== 'account') continue;
          
          const info = parsedData.info;
          if (!info || !info.mint) continue;
          
          mintAddresses.push(info.mint);
          accountsToProcess.push(item);
        } catch (error) {
          console.error(`Failed to pre-process token account ${item.pubkey.toBase58()}:`, error);
        }
      }
      
      // Now fetch token list and prices with the specific mint addresses we need
      const tokenMap = await this.getTokenList();
      
      const priceMap: Record<string, number> = {};
      
      if (mintAddresses.length > 0) {
        // Split into chunks of 50 to avoid URL length limits
        for (let i = 0; i < mintAddresses.length; i += 50) {
          const chunk = mintAddresses.slice(i, i + 50);
          try {
            const response = await fetch(`https://price.jup.ag/v4/price?ids=${chunk.join(',')}`);
            
            if (!response.ok) {
              console.warn(`Failed to fetch prices for token chunk, status: ${response.status}`);
              continue;
            }
            
            const priceData = await response.json();
            
            if (priceData.data) {
              for (const [address, data] of Object.entries(priceData.data)) {
                if (data && typeof data === 'object' && 'price' in data && data.price !== null) {
                  const price = Number(data.price);
                  if (!isNaN(price) && price > 0) {
                    priceMap[address] = price;
                  }
                }
              }
            }
          } catch (error) {
            console.warn(`Error fetching prices for token chunk:`, error);
          }
        }
      }
      
      // Add special handling for well-known tokens
      if (!priceMap['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v']) {  // USDC address
        priceMap['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'] = 1;  // USDC is 1 USD
      }

      // Use a typical SOL price if we didn't get one (fallback)
      if (solUsdValue === undefined && solAmount > 0) {
        // Try to estimate using a reasonable recent SOL price
        const estimatedSolPrice = 150; // Fallback approximate price
        solUsdValue = solAmount * estimatedSolPrice;
        console.log(`Using estimated SOL price: $${estimatedSolPrice}, USD value: $${solUsdValue}`);
      }

      console.log(`Fetched ${Object.keys(priceMap).length} token prices`);

      const balances: SplTokenBalance[] = [];
      
      // Add SOL as first token in the list
      balances.push({
        mint: 'SOL', // Use SOL as the mint address identifier
        amount: lamports.toString(),
        decimals: 9, // SOL has 9 decimals
        uiAmount: solAmount,
        symbol: 'SOL',
        name: 'Solana',
        logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', // Official SOL logo
        usdValue: solUsdValue
      });

      for (const { pubkey } of accountsToProcess) {
        try {
          // Use getParsedAccountInfo instead of getAccount for better browser compatibility
          const accountInfo = await this.solanaConnection.getParsedAccountInfo(pubkey);
          
          if (!accountInfo.value) continue;
          
          // Handle parsed account data
          const parsedData = 'parsed' in accountInfo.value.data ? 
            accountInfo.value.data.parsed : null;
            
          if (!parsedData || parsedData.type !== 'account') continue;
          
          const info = parsedData.info;
          if (!info || !info.mint || !info.tokenAmount) continue;
          
          const mintAddress = info.mint;
          const amount = info.tokenAmount.amount;
          const decimals = info.tokenAmount.decimals || 0;
          const uiAmount = info.tokenAmount.uiAmount || 
            (Number(amount) / Math.pow(10, decimals));
          
          // Look up token metadata if available
          const metadata = tokenMap[mintAddress];
          
          // Get USD value if price is available
          let usdValue: number | undefined = undefined;
          const price = priceMap[mintAddress];
          
          if (price && !isNaN(price) && price > 0) {
            usdValue = uiAmount * price;
          }
          
          // Special case for USDC and other stablecoins
          if (mintAddress === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' && usdValue === undefined) {
            usdValue = uiAmount; // USDC is 1:1 with USD
          }
            
          balances.push({
            mint: mintAddress,
            amount: amount.toString(),
            decimals: decimals,
            uiAmount: uiAmount,
            symbol: metadata?.symbol,
            name: metadata?.name,
            logo: metadata?.logoURI,
            usdValue
          });
          
        } catch (error) {
          console.error(
            `[${
              this.walletName
            }] Failed to process token account ${pubkey.toBase58()}:`,
            error
          );
          // Skip this token account if parsing fails
        }
      }

      return balances;
    } catch (error) {
      console.error(`[${this.walletName}] Error fetching SPL token balances:`, error);
      return []; // Return empty array on error to be resilient
    }
  }

  // --- SIWS Specific Methods ---

  private createSiwsProviderActor(identity?: Identity): SiwsProviderActor {
    console.log("Creating SIWS provider actor with canister ID:", this.config);
    if (!this.config.siwsProviderCanisterId) {
      throw new Error("SIWS provider canister ID not configured.");
    }
    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity: identity ?? new AnonymousIdentity(), // Use provided identity or anonymous
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });
    return Actor.createActor<SiwsProviderService>(siwsProviderIdlFactory, {
      agent,
      canisterId: this.config.siwsProviderCanisterId,
    });
  }

  private async _prepareLogin(
    actor: SiwsProviderActor,
    address: string
  ): Promise<any> {
    const prepareResult = await actor.siws_prepare_login(address);
    if ("Err" in prepareResult)
      throw new Error(
        `SIWS Prepare Login failed: ${JSON.stringify(prepareResult.Err)}`
      );
    return prepareResult.Ok;
  }

  private async _signSiwsMessage(siwsMessage: any): Promise<string> {
    const messageText = formatSiwsMessage(siwsMessage);
    const messageBytes = new TextEncoder().encode(messageText);

    if (!("signMessage" in this.solanaAdapter)) {
      throw new Error(
        `Connected Solana adapter '${this.walletName}' does not support signMessage.`
      );
    }

    const signerAdapter = this.solanaAdapter as typeof this.solanaAdapter &
      MessageSignerWalletAdapterProps<string>;
    const signatureBytes = await signerAdapter.signMessage(messageBytes);

    // Handle different signature byte formats from various Solana wallets
    try {
      // Special case for Backpack wallet which returns {signature: Uint8Array}
      if (
        typeof signatureBytes === "object" &&
        "signature" in signatureBytes &&
        signatureBytes.signature instanceof Uint8Array
      ) {
        return bs58.encode(signatureBytes.signature);
      }

      // First case: signatureBytes is already a Uint8Array
      if (signatureBytes instanceof Uint8Array) {
        return bs58.encode(signatureBytes);
      }

      // Second case: signatureBytes is an ArrayBuffer
      if ((signatureBytes as any) instanceof ArrayBuffer) {
        return bs58.encode(new Uint8Array(signatureBytes as any));
      }

      // Third case: signatureBytes is array-like but not a typed array
      if (
        Array.isArray(signatureBytes) ||
        (typeof signatureBytes === "object" && "length" in signatureBytes)
      ) {
        return bs58.encode(new Uint8Array(signatureBytes as any));
      }

      // If we get here, log the actual type and try a last resort conversion
      console.warn(
        `[${this.walletName}] Unexpected signature bytes type:`,
        typeof signatureBytes,
        signatureBytes
      );

      // Last resort: try to convert using a simplified approach
      const fallbackArray = Object.values(signatureBytes as any).map((val) =>
        Number(val)
      );
      return bs58.encode(Uint8Array.from(fallbackArray));
    } catch (e) {
      console.error(`[${this.walletName}] Error encoding signature:`, e);
      throw new Error(
        `Failed to encode signature from ${this.walletName}: ${e.message}`
      );
    }
  }

  private _generateSessionIdentity(): {
    sessionIdentity: Ed25519KeyIdentity;
    sessionPublicKeyDer: ArrayBuffer;
  } {
    const sessionIdentity = Ed25519KeyIdentity.generate();
    const sessionPublicKeyDer = sessionIdentity.getPublicKey().toDer();
    return { sessionIdentity, sessionPublicKeyDer };
  }

  private async _loginWithSiws(
    actor: SiwsProviderActor,
    signature: string,
    address: string,
    sessionPublicKeyDer: ArrayBuffer
  ): Promise<any> {
    const loginResult = await actor.siws_login(
      signature,
      address,
      new Uint8Array(sessionPublicKeyDer)
    );
    if ("Err" in loginResult)
      throw new Error(`SIWS Login failed: ${JSON.stringify(loginResult.Err)}`);
    return loginResult.Ok;
  }

  private async _getSiwsDelegation(
    actor: SiwsProviderActor,
    address: string,
    sessionPublicKeyDer: ArrayBuffer,
    expiration: bigint
  ): Promise<any> {
    const delegationResult = await actor.siws_get_delegation(
      address,
      new Uint8Array(sessionPublicKeyDer),
      expiration
    );
    if ("Err" in delegationResult)
      throw new Error(
        `SIWS Get Delegation failed: ${JSON.stringify(delegationResult.Err)}`
      );
    return delegationResult.Ok;
  }

  private _createDelegationIdentity(
    signedDelegation: any,
    sessionIdentity: Ed25519KeyIdentity,
    userCanisterPublicKeyDer: ArrayBuffer
  ): DelegationIdentity {
    const delegation = new Delegation(
      signedDelegation.delegation.pubkey.slice().buffer,
      signedDelegation.delegation.expiration,
      signedDelegation.delegation.targets.length > 0
        ? signedDelegation.delegation.targets[0]
        : undefined
    );

    const delegations = [
      {
        delegation: delegation,
        signature: signedDelegation.signature.slice().buffer as any,
      },
    ];

    const delegationChain = DelegationChain.fromDelegations(
      delegations,
      userCanisterPublicKeyDer
    );

    const identity = DelegationIdentity.fromDelegation(
      sessionIdentity,
      delegationChain
    );

    // Log delegation targets (optional)
    try {
      const chain = identity.getDelegation();
      const targets = chain.delegations.map((d) => d.delegation.targets);
      console.log(
        `[${this.walletName}] DelegationIdentity created with targets:`,
        targets
      );
    } catch (e) {
      console.warn(`[${this.walletName}] Could not log delegation targets:`, e);
    }

    return identity;
  }

  private async performSiwsLogin(
    address: string
  ): Promise<{ identity: Identity; principal: Principal }> {
    const anonSiwsActor = this.createSiwsProviderActor();

    // Step 1: Prepare login
    const siwsMessage = await this._prepareLogin(anonSiwsActor, address);

    // Step 2: Sign message
    const signature = await this._signSiwsMessage(siwsMessage);

    // Step 3: Generate session identity
    const { sessionIdentity, sessionPublicKeyDer } =
      this._generateSessionIdentity();

    // Step 4: Login
    const loginDetails = await this._loginWithSiws(
      anonSiwsActor,
      signature,
      address,
      sessionPublicKeyDer
    );

    // Step 5: Get delegation
    const signedDelegation = await this._getSiwsDelegation(
      anonSiwsActor,
      address,
      sessionPublicKeyDer,
      loginDetails.expiration
    );

    // Step 6: Create delegation identity
    const identity = this._createDelegationIdentity(
      signedDelegation,
      sessionIdentity,
      loginDetails.user_canister_pubkey.slice().buffer // Ensure ArrayBuffer
    );

    const principal = identity.getPrincipal();

    return { identity, principal };
  }
}
