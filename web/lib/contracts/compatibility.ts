import { uintCV } from "@stacks/transactions";
import { CONTRACTS } from "../constants";
import { readContract } from "../stacks";
import { parseContractId } from "../utils";
import { CompatibilityResult } from "@/types";

const { address, name } = parseContractId(CONTRACTS.COMPATIBILITY);

export async function checkCompatibility(blockA: number, blockB: number): Promise<CompatibilityResult | null> {
  try {
    const response = await readContract(
      address,
      name,
      "check-compatibility",
      [uintCV(blockA), uintCV(blockB)]
    );

    if (response.success && response.value) {
      const data = response.value.value;
      return {
        score: Number(data.score.value),
        elementMatch: data['element-match'].value,
        energyMatch: data['energy-match'].value,
        specialBond: data['special-bond'].value,
        relationshipType: data['relationship-type'].value,
      };
    }
    return null;
  } catch (error) {
    console.error("Error checking compatibility:", error);
    return null;
  }
}
