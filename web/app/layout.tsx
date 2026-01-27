import type { Metadata } from "next";
import { Comfortaa, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const headingFont = Comfortaa({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = Patrick_Hand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "BitSigns | Bitcoin Astrology",
  description: "Your Bitcoin birthday reveals your destiny. Mint your BitSign avatar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body
        className="antialiased bg-[#fdf6e3] text-[#586e75] min-h-screen font-body selection:bg-[#b58900] selection:text-white"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
