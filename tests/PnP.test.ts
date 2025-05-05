import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IIAdapter } from '../src/adapters/ic/IIAdapter';
import { AuthClient } from "@dfinity/auth-client";
import { vi } from 'vitest';
import { type Wallet } from '../src/types'; // Corrected path for types

// Define a basic mock config
const mockConfig: PnpConfig = {
  hostUrl: "http://localhost:4943",
  verifyQuerySignatures: false,
  fetchRootKeys: false,
  // Add other necessary fields if required by BaseIcAdapter or IIAdapter
};

describe('IIAdapter', () => {
  let adapter: IIAdapter;

  beforeEach(() => {
    // Mock AuthClient.create
    vi.spyOn(AuthClient, 'create').mockResolvedValue({
      isAuthenticated: () => Promise.resolve(false),
      login: () => {},
      logout: () => Promise.resolve(),
      getIdentity: () => ({
        getPrincipal: () => ({ toString: () => 'test-principal' })
      }),
      idleManager: {
        registerCallback: () => {}
      }
    } as any);
    
    adapter = new IIAdapter(mockConfig);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize the auth client', async () => {
    // Wait for the next tick to allow async initialization
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(AuthClient.create).toHaveBeenCalled();
  });

  it('should not have agent initially', () => {
    expect(adapter['agent']).toBeNull();
  });
});
