import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { CONTRACTS } from "../constants";
import { readContract } from "../stacks";
import { parseContractId } from "../utils";
import { NFTData } from "@/types";

const { address, name } = parseContractId(CONTRACTS.BITSIGN_NFT);

export async function getTokenData(tokenId: number): Promise<NFTData | null> {
  try {
    const response = await readContract(
      address,
      name,
      "get-token-data",
      [uintCV(tokenId)]
    );

    if (response.success && response.value) {
      const data = response.value.value;
      return {
        tokenId: Number(data['token-id'].value),
        owner: data.owner.value || null, // Optional principal
        birthBlock: Number(data['birth-block'].value),
        imageUri: data['image-uri'].value || null, // Optional string
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
}

export async function hasUserMinted(userAddress: string): Promise<boolean> {
  try {
    const response = await readContract(
      address,
      name,
      "has-minted",
      [standardPrincipalCV(userAddress)]
    );

    // Returns (optional bool) -> some true, or none
    return response.value !== null;
  } catch (error) {
    console.error("Error checking mint status:", error);
    return false;
  }
}

export async function getMintPrice(): Promise<number> {
  try {
    const response = await readContract(
      address,
      name,
      "get-mint-price",
      []
    );

    if (response.success) {
      return Number(response.value.value);
    }
    return 5000000; // Fallback
  } catch (error) {
    return 5000000;
  }
}

export async function getLastTokenId(): Promise<number> {
  try {
    const response = await readContract(
        address,
        name,
        "get-last-token-id",
        []
    );
    if(response.success) {
        return Number(response.value.value);
    }
    return 0;
  } catch (error) {
      return 0;
  }
}
