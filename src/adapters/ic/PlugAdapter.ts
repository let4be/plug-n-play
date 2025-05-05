// src/adapters/PlugAdapter.ts

import { ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { Adapter, Wallet } from "../../types/index.d";
import { BaseAdapter } from "../BaseAdapter";
import { createAccountFromPrincipal } from "../../utils/icUtils";
import { PlugAdapterConfig } from "../../types/AdapterConfigs";

// Extend BaseIcAdapter
export class PlugAdapter extends BaseAdapter<PlugAdapterConfig> implements Adapter.Interface {
  // Plug specific properties
  private readyState:
    | "NotDetected"
    | "Installed"
    | "Connected" = "NotDetected"; // Removed "Disconnected" as it's handled by BaseIcAdapter state
  
  private _connectionState: boolean = false;
  private _connectionStateTimestamp: number = 0;
  private _connectionStateUpdateInterval: number = 2000; // Update every 2 seconds
  // state and config are inherited

  // Constructor calls super and does Plug specific initialization
  constructor(args: Adapter.ConstructorArgs) {
    super(args); // Call base constructor with args
    this.initPlug();
    this.updateConnectionState();
  }

  // Initialize Plug and set readyState accordingly
  private initPlug(): void {
    if (typeof window !== "undefined" && window.ic?.plug) {
      window.ic.plug.isConnected().then((connected) => {
        this.readyState = connected ? "Connected" : "Installed";
        if (connected) {
            this.setState(Adapter.Status.CONNECTED); // Set base state if already connected
        } else {
            this.setState(Adapter.Status.READY); // Set base state if installed but not connected
        }
      });
    } else {
      this.readyState = "NotDetected";
      this.setState(Adapter.Status.INIT); // Or perhaps ERROR/UNAVAILABLE?
    }
  }

  async connect(): Promise<Wallet.Account> {
    this.setState(Adapter.Status.CONNECTING);
    const isConnected = await this.isConnected();

    if (!isConnected) {
      if (!window.ic?.plug) {
          this.setState(Adapter.Status.ERROR);
          throw new Error("Plug Wallet extension not detected.");
      }
      try {
        const connected = await window.ic.plug.requestConnect({
          whitelist: this.adapter.config.delegationTargets?.filter(p => p != null) || [], 
          host: this.adapter.config.hostUrl, 
          timeout: this.adapter.config.timeout || 1000 * 60 * 60 * 24 * 7, 
          onConnectionUpdate: () => this.handleConnectionUpdate(),
        });
        if (!connected) {
          this.setState(Adapter.Status.READY);
          throw new Error("User declined the connection request");
        }
        this.readyState = "Connected";
      } catch (e) {
        this.setState(Adapter.Status.READY);
        console.error("Failed to connect to Plug wallet:", e);
        throw e;
      }
    } else {
      this.readyState = "Connected";
    }

    this._connectionState = true;
    this._connectionStateTimestamp = Date.now();
    this.setState(Adapter.Status.CONNECTED);
    
    const principal = await this.getPrincipal();
    return createAccountFromPrincipal(principal);
  }
  
  // disconnect method is inherited, uses disconnectInternal and cleanupInternal

  async getPrincipal(): Promise<string> {
    // Ensure Plug is available and we have a principal ID
    if (this.readyState === "Connected" && window.ic?.plug?.principalId) {
      return Principal.fromText(window.ic.plug.principalId).toText();
    } else if (this.readyState === "Installed") {
        // Try connecting silently if installed but not connected? Or just throw?
        throw new Error("Plug wallet is installed but not connected.");
    } else {
        throw new Error("Plug wallet is not available or principal ID is unavailable");
    }
  }

  // getAccountId is inherited

  // Implementation of the required abstract method from BaseIcAdapter
  protected createActorInternal<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    if (!window.ic?.plug?.createActor) {
        throw new Error("Plug wallet is not available or not connected to create actor.");
    }
    if (!canisterId || !idl) {
      throw new Error("Canister ID and IDL factory are required");
    }

    try {
      // Plug's createActor returns a Promise<ActorSubclass<T>>
      const actorPromise = window.ic.plug.createActor<T>({
        canisterId,
        interfaceFactory: idl,
      });

      // Use a proxy to handle the promise resolution smoothly
      const proxy = new Proxy({}, {
        get: (_, prop) => {
          if (prop === 'then') {
            return undefined;
          }
          return (...args: any[]) => {
            return actorPromise.then(actor => {
              const value = actor[prop];
              if (typeof value === 'function') {
                return value.apply(actor, args);
              }
              return value;
            });
          };
        }
      }) as ActorSubclass<T>;

      return proxy;
    } catch (e) {
      console.error("Failed to create actor through Plug:", e);
      throw e;
    }
  }
  
  // Plug specific connection state update
  private async updateConnectionState(): Promise<void> {
    if (window.ic?.plug?.isConnected) {
      this._connectionState = await window.ic.plug.isConnected();
      this._connectionStateTimestamp = Date.now();
      this.readyState = this._connectionState ? "Connected" : "Installed";
      if (this._connectionState && this.state !== Adapter.Status.CONNECTED) {
          this.setState(Adapter.Status.CONNECTED);
      } else if (!this._connectionState && this.state === Adapter.Status.CONNECTED){
          // If Plug reports disconnected but base state is connected, update base state
          this.setState(Adapter.Status.READY); // Or DISCONNECTED?
      }
    } else {
      this._connectionState = false;
      this.readyState = "NotDetected";
      this.setState(Adapter.Status.INIT);
    }
  }

  // Use polling check for synchronous isConnected
  async isConnected(): Promise<boolean> {
    if (Date.now() - this._connectionStateTimestamp > this._connectionStateUpdateInterval) {
      // Don't await, let it run in background
      this.updateConnectionState().catch(err => console.error("[Plug] Failed background connection state update:", err));
    }
    return this._connectionState;
  }

  // Handle Plug's connection updates
  private handleConnectionUpdate(): void {
    // Trigger a state update
    this.updateConnectionState().then(() => {
        // Potentially emit a custom event for the dapp
        window.dispatchEvent(new CustomEvent('pnp:connectionUpdate', { detail: { adapterId: 'plug', state: this.state } }));
    }).catch(err => console.error("[Plug] Error handling connection update:", err));
  }

  // Plug specific disconnect logic
  protected async disconnectInternal(): Promise<void> {
    if (window.ic?.plug?.disconnect) {
      await window.ic.plug.disconnect();
    } else {
      console.warn("Plug wallet is not available for disconnect");
    }
  }

  // Plug specific cleanup (resetting internal state)
  protected cleanupInternal(): void {
      this.readyState = this._connectionState ? "Installed" : "NotDetected"; // Reset readyState based on installation
      this._connectionState = false;
      this._connectionStateTimestamp = 0;
  }

}