import { Adapter, Wallet } from "../../types/index.d";
import { 
  type Adapter as SolanaAdapter,
  WalletNotReadyError,
  WalletNotConnectedError,
  WalletReadyState
} from "@solana/wallet-adapter-base";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BaseSolAdapter, SplTokenBalance, ParsedTokenAccount } from "./BaseSolAdapter";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { 
  isPrincipalAnonymous, 
  createAccountFromPrincipal,
  deriveAccountId,
  fetchRootKeysIfNeeded
} from "../ic/icUtils";
import { HttpAgent, Actor, ActorSubclass, AnonymousIdentity } from "@dfinity/agent";

export class PhantomAdapter extends BaseSolAdapter {
  constructor(args: Adapter.ConstructorArgs) {
    super(args);
  }

  protected async getSolanaAdapter(): Promise<SolanaAdapter> {
    if (this._solanaAdapter) return this._solanaAdapter;
    if (typeof window === 'undefined') {
      throw new Error('Solana wallet adapters cannot be used during SSR');
    }

    try {
      const adapter = new PhantomWalletAdapter();
      this._solanaAdapter = adapter;
      this.setupWalletListeners();
      return adapter;
    } catch (error) {
      console.error(`[${this.walletName}] Failed to load wallet adapter:`, error);
      if (error instanceof TypeError && error.message.includes('undefined')) {
        throw new Error(`Failed to load ${this.walletName} adapter. This may be due to static site deployment issues.`);
      }
      throw error;
    }
  }

  protected setupWalletListeners(): void {
    const adapter = this._solanaAdapter;
    if (!adapter) return;
    adapter.on("connect", this.handleSolanaConnect);
    adapter.on("disconnect", this.handleSolanaDisconnect);
    adapter.on("error", this.handleSolanaError);
  }

  protected removeWalletListeners(): void {
    const adapter = this._solanaAdapter;
    if (!adapter) return;
    adapter.off("connect", this.handleSolanaConnect);
    adapter.off("disconnect", this.handleSolanaDisconnect);
    adapter.off("error", this.handleSolanaError);
  }

  private handleSolanaConnect = (publicKey: PublicKey): void => {
    this.solanaAddress = publicKey.toBase58();
  };

  private handleSolanaDisconnect = (): void => {
    if (this.state !== Adapter.Status.DISCONNECTING && this.state !== Adapter.Status.DISCONNECTED) {
      this.removeWalletListeners();
      this._solanaAdapter = null;
      this.identity = null;
      this.principal = null;
      this.solanaAddress = null;
      this.state = Adapter.Status.DISCONNECTED;
    }
  };

  private handleSolanaError = (error: any): void => {
    console.error(`[${this.walletName}] Solana wallet error:`, error);
    if (!(error instanceof WalletNotConnectedError) && !(error instanceof WalletNotReadyError)) {
      this.state = Adapter.Status.ERROR;
    }
  };

  async isAvailable(): Promise<boolean> {
    try {
      const adapter = await this.getSolanaAdapter();
      return adapter.readyState === WalletReadyState.Installed || adapter.readyState === WalletReadyState.Loadable;
    } catch (e) {
      console.warn(`[${this.walletName}] Error checking availability:`, e);
      return false;
    }
  }

  async isConnected(): Promise<boolean> {
    const adapter = this._solanaAdapter;
    return !!adapter && adapter.connected && this.identity !== null && !isPrincipalAnonymous(this.identity.getPrincipal());
  }

  async connect(): Promise<Wallet.Account> {
    if (this.state === Adapter.Status.CONNECTING) {
      throw new Error("Already connecting.");
    }
    if (await this.isConnected()) {
      if (this.principal) {
        return createAccountFromPrincipal(this.principal);
      }
      console.warn(`[${this.walletName}] isConnected is true but principal is missing. Attempting to disconnect and reconnect.`);
      await this.disconnect();
    }

    if (this.state !== Adapter.Status.READY && this.state !== Adapter.Status.DISCONNECTED) {
      console.warn(`[${this.walletName}] Attempting to connect from state: ${this.state}`);
      this.state = Adapter.Status.READY;
    }

    this.state = Adapter.Status.CONNECTING;

    try {
      const adapter = await this.getSolanaAdapter();
      
      if (adapter.readyState !== WalletReadyState.Installed && adapter.readyState !== WalletReadyState.Loadable) {
        throw new WalletNotReadyError(`Wallet ${this.walletName} is not installed or ready.`);
      }

      if (!adapter.connected) {
        await adapter.connect();
      }
      
      if (!adapter.publicKey) {
        throw new WalletNotConnectedError(
          `Solana wallet connected via ${this.walletName} but public key not available.`
        );
      }

      if (!this.solanaAddress || this.solanaAddress !== adapter.publicKey.toBase58()) {
        console.warn(`[${this.walletName}] Solana address mismatch or not set by listener, setting now.`);
        this.solanaAddress = adapter.publicKey.toBase58();
      }

      const siwsResult = await this.performSiwsLogin(this.solanaAddress);
      this.identity = siwsResult.identity;
      this.principal = siwsResult.principal;

      if (!this.principal || isPrincipalAnonymous(this.principal)) {
        console.error(`[${this.walletName}] SIWS flow completed but resulted in an anonymous principal. Aborting connection.`);
        throw new Error(
          `SIWS flow completed for ${this.walletName} but resulted in an anonymous principal.`
        );
      }

      this.state = Adapter.Status.CONNECTED;
      return createAccountFromPrincipal(this.principal);
    } catch (error) {
      console.error(`[${this.walletName}] Connect failed:`, error);
      this.state = Adapter.Status.ERROR;
      await this.disconnect();
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.state === Adapter.Status.DISCONNECTING || this.state === Adapter.Status.DISCONNECTED) {
      return;
    }
    const prevState = this.state;
    this.state = Adapter.Status.DISCONNECTING;

    const adapter = this._solanaAdapter;

    try {
      if (adapter && adapter.connected) {
        await adapter.disconnect();
      }
    } catch (error) {
      console.warn(`[${this.walletName}] Error during Solana adapter disconnect:`, error);
    } finally {
      this.removeWalletListeners();
      this._solanaAdapter = null;
      this.identity = null;
      this.principal = null;
      this.solanaAddress = null;
      this.state = Adapter.Status.DISCONNECTED;
    }
  }

  async getPrincipal(): Promise<string> {
    if (!this.principal || !(await this.isConnected())) {
      throw new Error("Not connected or SIWS flow not completed.");
    }
    return this.principal.toText();
  }

  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    return deriveAccountId(principal);
  }

  async getSolanaAddress(): Promise<string> {
    if (!this.solanaAddress || !(await this.isConnected())) {
      throw new Error("Not connected or Solana address not available.");
    }
    return this.solanaAddress;
  }

  async getAddresses(): Promise<Adapter.Addresses> {
    if (!this.principal || !this.solanaAddress || !(await this.isConnected())) {
      throw new Error("Not connected or required addresses not available");
    }
    const account = await createAccountFromPrincipal(this.principal);    
    return {
      sol: this.solanaAddress,
      icp: {
        owner: account.owner,
        subaccount: account.subaccount,
      },
    };
  }

  createActor<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean, anon: true }
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning ?? true;
    if (requiresSigning && (!this.identity || isPrincipalAnonymous(this.identity.getPrincipal()))) {
      throw new Error(
        "Cannot create signed actor: Not connected or SIWS flow not completed successfully."
      );
    }

    const agent = HttpAgent.createSync({
      host: this.adapterConfig.config.hostUrl,
      identity: options?.anon ? new AnonymousIdentity() : this.identity,
      verifyQuerySignatures: this.adapterConfig.config.verifyQuerySignatures,
    });
    
    if (this.adapterConfig.config.fetchRootKeys) {
      fetchRootKeysIfNeeded(agent, true);
    }

    return Actor.createActor<T>(idl, { agent, canisterId });
  }

  async getSolBalance(): Promise<{ amount: number; usdValue?: number }> {
    const publicKey = await this._getConnectedPublicKey();
    const { solAmount, solUsdValue } = await this._getTokenBalances(publicKey);
    return { amount: solAmount, usdValue: solUsdValue };
  }

  async getSplTokenBalances(): Promise<SplTokenBalance[]> {
    const publicKey = await this._getConnectedPublicKey();
    const { solAmount, solUsdValue, tokenAccounts } = await this._getTokenBalances(publicKey);

    const processedAccounts = await Promise.all(tokenAccounts.map(item => this._processTokenAccount(item)));
    const validAccounts = processedAccounts.filter((account): account is { mint: string; account: any } => account !== null);
    const mintAddresses = validAccounts.map(account => account.mint);
    const tokenMap = await this.getTokenList();
    const priceMap: Record<string, number> = {};

    for (let i = 0; i < mintAddresses.length; i += 50) {
      const chunk = mintAddresses.slice(i, i + 50);
      const prices = await Promise.all(chunk.map(mint => this._fetchTokenPrice(mint)));
      chunk.forEach((mint, index) => {
        if (prices[index]) priceMap[mint] = prices[index]!;
      });
    }

    const balances: SplTokenBalance[] = [{
      mint: 'SOL',
      amount: (solAmount * LAMPORTS_PER_SOL).toString(),
      decimals: 9,
      uiAmount: solAmount,
      symbol: 'SOL',
      name: 'Solana',
      logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      usdValue: solUsdValue
    }];

    for (const { mint, account } of validAccounts) {
      const accountInfo = await this.solanaConnection.getParsedAccountInfo(account.pubkey);
      const parsedData = accountInfo.value?.data as { parsed: ParsedTokenAccount };
      if (!parsedData?.parsed || parsedData.parsed.type !== 'account' || !parsedData.parsed.info?.mint || !parsedData.parsed.info?.tokenAmount) continue;

      const { amount, decimals = 0, uiAmount = Number(amount) / Math.pow(10, decimals) } = parsedData.parsed.info.tokenAmount;
      const metadata = tokenMap[mint];
      const usdValue = priceMap[mint] ? uiAmount * priceMap[mint] : undefined;

      balances.push({
        mint,
        amount: amount.toString(),
        decimals,
        uiAmount,
        symbol: metadata?.symbol,
        name: metadata?.name,
        logo: metadata?.logoURI,
        usdValue
      });
    }

    return balances;
  }
} 