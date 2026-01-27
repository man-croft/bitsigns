export const CONTRACTS = {
  BITSIGN_NFT: process.env.NEXT_PUBLIC_BITSIGN_NFT_ADDRESS!,
  TRAIT_ENGINE: process.env.NEXT_PUBLIC_TRAIT_ENGINE_ADDRESS!,
  FORTUNE_ORACLE: process.env.NEXT_PUBLIC_FORTUNE_ORACLE_ADDRESS!,
  COMPATIBILITY: process.env.NEXT_PUBLIC_COMPATIBILITY_ADDRESS!,
  TRAIT_TOKEN: process.env.NEXT_PUBLIC_TRAIT_TOKEN_ADDRESS!,
  TREASURY: process.env.NEXT_PUBLIC_TREASURY_ADDRESS!,
};

export const MINT_PRICE = 5000000; // 5 STX in microSTX

export const APP_CONFIG = {
  NETWORK: process.env.NEXT_PUBLIC_STACKS_NETWORK || "mainnet",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const BITSSIGNS = [
  "The Miner",
  "The Holder",
  "The Whale",
  "The Degen",
  "The Builder",
  "The Oracle",
  "The Pioneer",
  "The Guardian",
  "The Rebel",
  "The Sage",
  "The Phoenix",
  "The Cipher",
];

export const ELEMENTS = ["Fire", "Water", "Earth", "Air", "Ether"];

export const ENERGIES = ["Yang", "Yin", "Neutral"];
