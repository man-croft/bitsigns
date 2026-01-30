"use client";

import { useEffect, useState } from "react";
import { GalleryItem } from "./gallery-item";
import { getRecentMints } from "@/lib/stacks";
import { CONTRACTS } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { getTokenData } from "@/lib/contracts/bitsign-nft";

export function GalleryGrid() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const mints = await getRecentMints(CONTRACTS.BITSIGN_NFT, 12);
        
        // Enhance with metadata
        const enhancedItems = await Promise.all(
          mints.map(async (mint: any) => {
            try {
              const data = await getTokenData(mint.tokenId);
              return { ...mint, ...data };
            } catch (e) {
              return mint;
            }
          })
        );
        
        setItems(enhancedItems);
      } catch (error) {
        console.error("Failed to load gallery", error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-body animate-pulse">Consulting the chain...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">The gallery is empty. Be the first to mint!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <GalleryItem
          key={item.tokenId}
          tokenId={item.tokenId}
          imageUri={item.imageUri}
          owner={item.principal} // Changed from owner to principal based on stacks.ts update
        />
      ))}
    </div>
  );
}
