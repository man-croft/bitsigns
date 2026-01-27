"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Loader2, Wallet } from "lucide-react";

export function WalletConnectButton() {
  const { isConnected, isLoading: isSessionLoading, connect, disconnect, address } = useWallet();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
    }
  };

  // Show skeleton while session is initializing
  if (isSessionLoading) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <Button variant="outline" onClick={disconnect}>
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="mr-2 h-4 w-4" />
      )}
      Connect Wallet
    </Button>
  );
}
