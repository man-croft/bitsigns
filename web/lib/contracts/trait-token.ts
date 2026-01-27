import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { CONTRACTS } from "../constants";
import { readContract } from "../stacks";
import { parseContractId } from "../utils";

const { address, name } = parseContractId(CONTRACTS.TRAIT_TOKEN);

export async function getBalance(tokenId: number, owner: string): Promise<number> {
  try {
    const response = await readContract(
      address,
      name,
      "get-balance",
      [uintCV(tokenId), standardPrincipalCV(owner)]
    );

    if (response.success) {
      return Number(response.value.value);
    }
    return 0;
  } catch (error) {
    console.error("Error fetching trait balance:", error);
    return 0;
  }
}

export async function getTraitName(tokenId: number): Promise<string> {
  try {
    const response = await readContract(
      address,
      name,
      "get-trait-name",
      [uintCV(tokenId)]
    );

    // It returns a string-ascii directly
    return response.value || "Unknown";
  } catch (error) {
    return "Unknown";
  }
}
