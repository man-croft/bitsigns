"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletConnectButton } from "./wallet-connect-button";
import { cn } from "@/lib/utils";
import { Sun, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/mint", label: "Mint" },
    { href: "/profile", label: "Profile" },
    { href: "/gallery", label: "Gallery" },
    { href: "/fortune", label: "Fortune" },
    { href: "/compatibility", label: "Compatibility" },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <div className="container mx-auto flex h-16 items-center justify-between rounded-full border border-primary/20 bg-background/80 px-6 shadow-lg backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-primary hover:text-accent transition-colors">
          <Sun className="h-6 w-6 animate-pulse-slow" />
          <span className="hidden sm:inline">BitSigns</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition-all hover:bg-secondary hover:text-primary",
                pathname === link.href
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WalletConnectButton />
          
          {/* Mobile Nav */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {links.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className={cn(
                      "w-full cursor-pointer",
                      pathname === link.href ? "font-bold text-primary" : ""
                    )}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
