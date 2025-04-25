// A simple script to test II adapter configuration

// Configuration object matching the structure you're using in your app
const testConfig = {
  hostUrl: "https://icp0.io",
  fetchRootKeys: false,
  verifyQuerySignatures: false,
  derivationOrigin: "https://example.com",
  identityProvider: "https://identity.ic0.app",
  // Using the correct adapters format
  adapters: {
    ii: {
      enabled: true,
      config: {
        identityProvider: "https://identity.ic0.app",
        derivationOrigin: "https://example.com"
      }
    }
  }
};

// Log the configuration to see how it's structured
console.log("Full config:", JSON.stringify(testConfig, null, 2));

// Access the values directly as they would be accessed in the IIAdapter
const iiAdapter = testConfig.adapters?.ii;
console.log("II Adapter config:", iiAdapter);

// Test the getter for identityProvider
const identityProvider = 
  testConfig.adapters?.ii?.config?.identityProvider || testConfig.identityProvider;
console.log("identityProvider:", identityProvider);

// Test the getter for derivationOrigin
const derivationOrigin = 
  testConfig.adapters?.ii?.config?.derivationOrigin || testConfig.derivationOrigin;
console.log("derivationOrigin:", derivationOrigin);

// Test hostUrl access
console.log("hostUrl:", testConfig.hostUrl);

// This will help verify that the configuration structure is correct 