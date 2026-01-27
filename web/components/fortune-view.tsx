"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { getDailyFortune, getPersonalizedFortune } from "@/lib/contracts/fortune-oracle";
import { getUserBirthBlock } from "@/lib/contracts/trait-engine";
import { Fortune, PersonalizedFortune } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Calendar, Star, AlertCircle } from "lucide-react";
import Link from "next/link";

export function FortuneView() {
  const { address, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState<Fortune | PersonalizedFortune | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);

  useEffect(() => {
    const fetchFortune = async () => {
      setLoading(true);
      try {
        let currentFortune: Fortune | PersonalizedFortune | null = null;
        let personalized = false;

        if (isConnected && address) {
          const birthBlock = await getUserBirthBlock(address);
          if (birthBlock) {
            currentFortune = await getPersonalizedFortune(birthBlock);
            personalized = true;
          }
        }

        if (!currentFortune) {
          currentFortune = await getDailyFortune();
        }

        setFortune(currentFortune);
        setIsPersonalized(personalized);
      } catch (error) {
        console.error("Error fetching fortune:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFortune();
  }, [isConnected, address]);

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!fortune) {
    return (
      <Card className="w-full max-w-2xl mx-auto text-center">
        <CardHeader>
          <CardTitle>The Oracle is Silent</CardTitle>
          <CardDescription>Could not retrieve a fortune at this time.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-none shadow-xl bg-white/90 backdrop-blur-md">
      <div className={`h-3 ${isPersonalized ? "bg-primary" : "bg-muted"}`} />
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-heading text-primary">
              <Sparkles className={`h-6 w-6 ${isPersonalized ? "text-primary fill-primary/20" : "text-muted-foreground"}`} />
              {isPersonalized ? "Your Personal Fortune" : "Daily Chain Fortune"}
            </CardTitle>
            <CardDescription className="text-lg font-body mt-1">
              Block Height: <span className="font-bold text-accent">{fortune.blockHeight}</span>
            </CardDescription>
          </div>
          {isPersonalized && (
            <Badge variant="outline" className="border-primary text-primary px-4 py-1 rounded-full bg-primary/5">
              Personalized
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="text-center py-10 px-6 bg-secondary/30 rounded-3xl border border-secondary">
          <p className="text-2xl md:text-3xl font-heading leading-relaxed text-foreground">
            "{fortune.template} <span className="text-primary font-bold">{fortune.outcome}</span> {fortune.modifier}"
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
            <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-bold">Lucky Number</span>
            <span className="text-3xl font-heading font-bold text-accent">{fortune.luckyNumber}</span>
          </div>

          {'affinityScore' in fortune && (
             <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-bold">Affinity</span>
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-heading font-bold text-primary">{fortune.affinityScore}%</span>
                </div>
             </div>
          )}

          {'isPowerDay' in fortune && fortune.isPowerDay && (
             <div className="flex flex-col items-center p-4 rounded-2xl bg-yellow-50/50 border border-yellow-200 shadow-sm">
                <span className="text-xs uppercase tracking-widest text-yellow-600 mb-1 font-bold">Power Day</span>
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 animate-pulse-slow" />
             </div>
          )}
        </div>
      </CardContent>

      {!isPersonalized && isConnected && (
        <CardFooter className="bg-secondary/30 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="bg-white p-2 rounded-full shadow-sm">
                <AlertCircle className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm font-medium text-muted-foreground flex-1 text-center sm:text-left">
              Mint a BitSign to unlock personalized fortunes based on your Bitcoin birthday.
            </p>
            <Link href="/mint">
              <Button size="lg" className="rounded-full shadow-md">Mint Now</Button>
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
