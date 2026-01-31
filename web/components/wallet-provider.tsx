"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface WalletContextValue {
  userData: any | null;
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<any | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnectedState, setIsConnectedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      try {
        const { isConnected, getLocalStorage } = await import("@stacks/connect");
        
        if (isConnected()) {
          const data = getLocalStorage();
          setUserData(data);
          setIsConnectedState(true);
          // Try to get address from new structure
          const stxAddress = data?.addresses?.stx?.[0]?.address;
          if (stxAddress) setAddress(stxAddress);
        }
      } catch (error) {
        console.error("Failed to initialize wallet session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, []);

  const connect = useCallback(async () => {
    try {
      const { connect: connectWallet, getLocalStorage } = await import("@stacks/connect");
      
      const response = await connectWallet();
      console.log("Connect response:", response);

      // Re-fetch data to be sure
      const data = getLocalStorage();
      setUserData(data);
      setIsConnectedState(true);
      
      const stxAddress = data?.addresses?.stx?.[0]?.address;
      if (stxAddress) setAddress(stxAddress);
      
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      const { disconnect: disconnectWallet } = await import("@stacks/connect");
      disconnectWallet();
      setUserData(null);
      setIsConnectedState(false);
      setAddress(null);
      toast.info("Wallet disconnected");
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        userData,
        address,
        isConnected: isConnectedState,
        isLoading,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
