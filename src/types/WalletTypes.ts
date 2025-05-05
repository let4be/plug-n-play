export interface WalletAccount {
  owner: string | null;
  subaccount: string | null;
}

export type WalletAdapterConstructor = new (config: any) => any; 