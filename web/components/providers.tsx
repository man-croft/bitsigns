"use client";

import * as React from "react";
import { WalletProvider } from "./wallet-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  );
}
