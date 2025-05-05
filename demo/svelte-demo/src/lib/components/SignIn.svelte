<script lang="ts">
  import {
    availableWallets,
    isConnected,
    principalId,
    connectWallet,
    disconnectWallet,
    pnpInstance,
    selectedWalletId,
    lastEvent,
  } from "../stores/pnp";
  import { balance, fetchBalance } from "../stores/ledger";
  import { get } from "svelte/store";
  import { writable } from 'svelte/store';

  let error: string | null = null;
  let userBalance: bigint | null = null;
  let wallets = [];
  let connectingWalletId: string | null = null;

  // Subscribe to availableWallets store
  availableWallets.subscribe((value) => {
    wallets = value;
  });

  // Subscribe to events to manage connecting state
  lastEvent.subscribe((event) => {
    if (!event) return;

    switch (event.type) {
      case 'statusChange':
        if (event.data.newStatus === 'CONNECTING') {
          connectingWalletId = event.data.walletId;
        } else if (event.data.newStatus === 'CONNECTED' || event.data.newStatus === 'ERROR') {
          connectingWalletId = null;
        }
        break;
      case 'error':
        connectingWalletId = null;
        break;
    }
  });

  function formatICPBalance(balance: bigint | null): string {
    if (!balance) return "...";
    const decimals = 8;
    const balanceStr = balance.toString().padStart(decimals + 1, "0");
    const integerPart = balanceStr.slice(0, -decimals) || "0";
    const decimalPart = balanceStr.slice(-decimals);
    const trimmedDecimalPart = decimalPart.replace(/0+$/, "");
    return trimmedDecimalPart 
      ? `${integerPart}.${trimmedDecimalPart}`
      : integerPart;
  }

  function formatEvent(event: any): string {
    if (!event) return 'No events yet';
    return JSON.stringify(event, null, 2);
  }

  async function handleConnect(walletId: string) {
    error = null;
    try {
      const pnp = get(pnpInstance);
      if (!pnp) {
        throw new Error('PNP not initialized');
      }

      const account = await connectWallet(walletId);
      console.log("account", account);
      await fetchBalance();
    } catch (e) {
      error = e.message;
      console.error('Failed to connect:', e);
    }
  }

  balance.subscribe((value) => {
    if (value) {
      userBalance = value;
    }
  });
</script>

<div class="sign-in">
  {#if $isConnected}
    <div class="connected-info">
      <div class="status connected">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Connected</span>
      </div>
      <div class="principal">
        <h3>Principal ID</h3>
        <code>{$principalId}</code>
      </div>
      <div class="balance">
        <h3>ICP Balance</h3>
        <code>{formatICPBalance(userBalance)} ICP</code>
      </div>
      <button class="disconnect" on:click={disconnectWallet}>
        Disconnect Wallet
      </button>
    </div>
  {:else}
    <div class="wallet-options">
      <h2>Connect Wallet</h2>
      <p class="subtitle">Choose your preferred wallet to sign in</p>

      <div class="wallet-list">
        <h2>Connect your wallet</h2>
        <div class="wallets">
          {#each wallets as wallet}
            <button
              class="wallet-button"
              disabled={connectingWalletId === wallet.id}
              on:click|preventDefault={() => handleConnect(wallet.id)}
            >
              <img src={wallet.logo} alt={wallet.walletName} />
              {#if connectingWalletId === wallet.id}
                <div class="connecting-spinner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                </div>
              {/if}
            </button>
          {/each}
        </div>
        {#if error}
          <div class="error">{error}</div>
        {/if}
      </div>
    </div>
  {/if}

  <div class="events-panel">
    <h3>Latest Event</h3>
    <pre class="event-data">{formatEvent($lastEvent)}</pre>
  </div>
</div>

<style>
  .sign-in {
    max-width: 480px;
    margin: 0 auto;
    padding: 2rem;
  }

  .wallet-options {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
  }

  .subtitle {
    margin: 0.5rem 0 1.5rem;
    color: #4a5568;
    font-size: 0.875rem;
  }

  .wallet-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .wallet-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
  }

  .wallet-button:hover:not(:disabled) {
    background: #edf2f7;
    border-color: #cbd5e0;
  }

  .wallet-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .wallet-arrow {
    color: #718096;
  }

  .error {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #fff5f5;
    border: 1px solid #feb2b2;
    border-radius: 6px;
    color: #c53030;
    font-size: 0.875rem;
  }

  .connected-info {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .status.connected {
    color: #2f855a;
  }

  .principal {
    background: #f7fafc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .principal h3 {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    color: #4a5568;
  }

  code {
    display: block;
    word-break: break-all;
    font-size: 0.875rem;
    color: #2d3748;
  }

  .disconnect {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #fff5f5;
    border: 1px solid #feb2b2;
    border-radius: 8px;
    color: #c53030;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .disconnect:hover {
    background: #fed7d7;
    border-color: #fc8181;
  }

  .events-panel {
    margin-top: 2rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .events-panel h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: #1a202c;
  }

  .event-data {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    font-family: monospace;
    font-size: 0.875rem;
    color: #2d3748;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 200px;
    overflow-y: auto;
  }

  .connecting-spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
