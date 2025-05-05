import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export interface TokenInfo {
  symbol: string;
  name: string;
  logoURI?: string;
  decimals: number;
  address: string;
  price?: number;
}

export interface SplTokenBalance {
  mint: string;
  amount: string;
  decimals: number;
  uiAmount: number;
  symbol?: string;
  name?: string;
  logo?: string;
  usdValue?: number;
}

export class TokenManager {
  private connection: Connection;
  private tokenListCache: Record<string, TokenInfo> | null = null;
  private tokenPricesTimestamp: number = 0;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async getTokenPrices(): Promise<Record<string, number>> {
    try {
      const now = Date.now();
      if (this.tokenListCache && this.tokenPricesTimestamp > 0 && 
          now - this.tokenPricesTimestamp < 2 * 60 * 1000) {
        const priceMap: Record<string, number> = {};
        for (const [address, tokenInfo] of Object.entries(this.tokenListCache)) {
          if (tokenInfo.price) {
            priceMap[address] = tokenInfo.price;
          }
        }
        return priceMap;
      }
      
      const tokenMap = await this.getTokenList();
      const tokenAddresses = Object.keys(tokenMap);
      const tokenChunks = [];
      for (let i = 0; i < tokenAddresses.length; i += 50) {
        tokenChunks.push(tokenAddresses.slice(i, i + 50));
      }
      
      const priceMap: Record<string, number> = {};
      
      for (const chunk of tokenChunks) {
        try {
          const requestIds = ['SOL', ...chunk].join(',');
          const response = await fetch(`https://price.jup.ag/v4/price?ids=${requestIds}`);
          
          if (!response.ok) {
            console.warn(`Failed to fetch Jupiter prices for chunk, status: ${response.status}`);
            continue;
          }
          
          const priceData = await response.json();
          
          if (priceData.data) {
            for (const [address, data] of Object.entries(priceData.data)) {
              if (data && typeof data === 'object' && 'price' in data && data.price !== null) {
                const price = Number(data.price);
                if (!isNaN(price) && price > 0) {
                  priceMap[address] = price;
                  if (this.tokenListCache && this.tokenListCache[address]) {
                    this.tokenListCache[address].price = price;
                  }
                }
              }
            }
          }
        } catch (chunkError) {
          console.warn(`Error fetching prices for token chunk:`, chunkError);
        }
      }
      
      this.tokenPricesTimestamp = now;
      return priceMap;
    } catch (error) {
      console.warn(`Failed to fetch token prices:`, error);
      return {};
    }
  }

  async getTokenList(): Promise<Record<string, TokenInfo>> {
    if (this.tokenListCache) {
      return this.tokenListCache;
    }
    
    try {
      const response = await fetch('https://token.jup.ag/all');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Jupiter token list: ${response.status}`);
      }
      
      const tokenList = await response.json();
      const tokenMap: Record<string, TokenInfo> = {};
      
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
      return tokenMap;
    } catch (error) {
      console.warn(`Failed to fetch token list:`, error);
      return {};
    }
  }

  async getSolBalance(publicKey: PublicKey): Promise<{ amount: number; usdValue?: number }> {
    const lamports = await this.connection.getBalance(publicKey);
    const solAmount = lamports / LAMPORTS_PER_SOL;
    
    try {
      const response = await fetch('https://price.jup.ag/v4/price?ids=SOL');
      if (!response.ok) {
        throw new Error(`Failed to fetch SOL price, status: ${response.status}`);
      }
      
      const priceData = await response.json();
      
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
      console.warn(`Failed to fetch SOL price:`, error);
    }
    
    return { amount: solAmount };
  }

  async getSplTokenBalances(publicKey: PublicKey): Promise<SplTokenBalance[]> {
    try {
      const lamports = await this.connection.getBalance(publicKey);
      const solAmount = lamports / LAMPORTS_PER_SOL;
      
      let solUsdValue: number | undefined = undefined;
      try {
        const solPriceResponse = await fetch('https://price.jup.ag/v4/price?ids=SOL');
        if (solPriceResponse.ok) {
          const solPriceData = await solPriceResponse.json();
          if (solPriceData?.data?.SOL?.price) {
            const solPrice = Number(solPriceData.data.SOL.price);
            if (!isNaN(solPrice) && solPrice > 0) {
              solUsdValue = solAmount * solPrice;
            }
          }
        }
      } catch (solPriceError) {
        console.error("Error fetching SOL price:", solPriceError);
      }
      
      const tokenAccounts = await this.connection.getTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );
      
      const mintAddresses: string[] = [];
      const accountsToProcess: Array<{pubkey: PublicKey, account: any}> = [];
      
      for (const item of tokenAccounts.value) {
        try {
          const accountInfo = await this.connection.getParsedAccountInfo(item.pubkey);
          
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
      
      const tokenMap = await this.getTokenList();
      const priceMap = await this.getTokenPrices();
      
      const balances: SplTokenBalance[] = [];
      
      balances.push({
        mint: 'SOL',
        amount: lamports.toString(),
        decimals: 9,
        uiAmount: solAmount,
        symbol: 'SOL',
        name: 'Solana',
        logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
        usdValue: solUsdValue
      });

      for (const { pubkey } of accountsToProcess) {
        try {
          const accountInfo = await this.connection.getParsedAccountInfo(pubkey);
          
          if (!accountInfo.value) continue;
          
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
          
          const metadata = tokenMap[mintAddress];
          let usdValue: number | undefined = undefined;
          const price = priceMap[mintAddress];
          
          if (price && !isNaN(price) && price > 0) {
            usdValue = uiAmount * price;
          }
          
          if (mintAddress === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' && usdValue === undefined) {
            usdValue = uiAmount;
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
          console.error(`Failed to process token account ${pubkey.toBase58()}:`, error);
        }
      }

      return balances;
    } catch (error) {
      console.error(`Error fetching SPL token balances:`, error);
      return [];
    }
  }
} 