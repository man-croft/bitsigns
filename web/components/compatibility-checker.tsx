"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { checkCompatibility } from "@/lib/contracts/compatibility";
import { getUserBirthBlock } from "@/lib/contracts/trait-engine";
import { CompatibilityResult } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, AlertCircle, Sparkles } from "lucide-react";

export function CompatibilityChecker() {
  const { address, isConnected } = useWallet();
  const [partnerAddress, setPartnerAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!address || !partnerAddress) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const [userBlock, partnerBlock] = await Promise.all([
        getUserBirthBlock(address),
        getUserBirthBlock(partnerAddress)
      ]);

      if (!userBlock) {
        setError("You haven't minted a BitSign yet. Mint one to check compatibility!");
        setLoading(false);
        return;
      }

      if (!partnerBlock) {
        setError("The partner address hasn't minted a BitSign yet.");
        setLoading(false);
        return;
      }

      const compatibility = await checkCompatibility(userBlock, partnerBlock);
      setResult(compatibility);

    } catch (e) {
      console.error(e);
      setError("Failed to check compatibility. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>Connect your wallet to find your on-chain soulmate.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md mx-auto border-none shadow-xl bg-white/80 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-primary">Check Compatibility</CardTitle>
          <CardDescription className="font-body text-lg">
            Enter a Stacks address to analyze your elemental synergy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="partner-address" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Partner Address</Label>
            <div className="flex gap-2">
              <Input
                id="partner-address"
                placeholder="SP..."
                value={partnerAddress}
                onChange={(e) => setPartnerAddress(e.target.value)}
                className="h-12 text-lg shadow-inner bg-secondary/20 border-transparent focus:bg-white transition-all"
              />
              <Button onClick={handleCheck} disabled={loading || !partnerAddress} className="h-12 w-12 rounded-full shadow-md p-0">
                {loading ? <Sparkles className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
          <CardHeader className="text-center pb-4 pt-8">
            <div className="mx-auto bg-red-50 p-4 rounded-full w-fit mb-4 shadow-sm animate-pulse-slow">
              <Heart className="h-10 w-10 text-red-500 fill-red-500" />
            </div>
            <CardTitle className="text-5xl font-heading font-bold text-foreground">{result.score}%</CardTitle>
            <CardDescription className="text-xl font-bold text-primary mt-2 uppercase tracking-wide">
              {result.relationshipType}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className="text-xs uppercase text-muted-foreground mb-2 font-bold tracking-widest">Element Match</span>
                <span className="font-bold text-lg text-accent">{result.elementMatch ? "Yes" : "No"}</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className="text-xs uppercase text-muted-foreground mb-2 font-bold tracking-widest">Energy Match</span>
                <span className="font-bold text-lg text-primary">{result.energyMatch ? "Yes" : "No"}</span>
              </div>
            </div>

            {result.specialBond && (
              <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-700 font-bold shadow-sm">
                <Sparkles className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                Special Cosmic Bond Detected!
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
