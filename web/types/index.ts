export interface TraitData {
  bitsign: string;
  element: string;
  energy: string;
  powerNumber: number;
  luckySat: number;
  traitHash: string;
}

export interface AIPromptData {
  style: string;
  archetype: string;
  mood: string;
  seed: number;
  colors: string;
}

export interface NFTData {
  tokenId: number;
  owner: string;
  birthBlock: number;
  imageUri: string | null;
}

export interface Fortune {
  template: string;
  outcome: string;
  modifier: string;
  luckyNumber: number;
  blockHeight: number;
}

export interface PersonalizedFortune extends Fortune {
  affinityScore: number;
  isPowerDay: boolean;
}

export interface CompatibilityResult {
  score: number;
  elementMatch: boolean;
  energyMatch: boolean;
  specialBond: boolean;
  relationshipType: string;
}

export interface TreasuryStats {
  totalRevenue: number;
  communityPool: number;
  ownerAvailable: number;
}
