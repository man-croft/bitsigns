"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface GalleryItemProps {
  tokenId: number;
  imageUri?: string;
  name?: string;
  owner?: string;
}

export function GalleryItem({ tokenId, imageUri, name, owner }: GalleryItemProps) {
  // Placeholder image if none provided
  const displayImage = imageUri 
    ? imageUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") 
    : `https://avatar.vercel.sh/${tokenId}?text=BS`;

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary/20 transition-all duration-300 group bg-white cursor-pointer">
      <div className="relative aspect-square w-full bg-secondary/20">
        <Image
          src={displayImage}
          alt={name || `BitSign #${tokenId}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <Link href={`/profile/${tokenId}`} className="text-white text-sm font-bold hover:underline">
            View Details
          </Link>
        </div>
      </div>
      <div className="p-4 bg-white/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading font-bold text-primary truncate">
            {name || `BitSign #${tokenId}`}
          </span>
          <Badge variant="outline" className="border-accent text-accent text-[10px]">
            #{tokenId}
          </Badge>
        </div>
        {owner && (
          <p className="text-xs text-muted-foreground font-mono truncate">
            {owner}
          </p>
        )}
      </div>
    </Card>
  );
}
