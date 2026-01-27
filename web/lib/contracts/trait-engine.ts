import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { CONTRACTS } from "../constants";
import { readContract } from "../stacks";
import { parseContractId } from "../utils";
import { TraitData, AIPromptData } from "@/types";

const { address, name } = parseContractId(CONTRACTS.TRAIT_ENGINE);

export async function getFullTraits(blockHeight: number): Promise<TraitData | null> {
  try {
    const response = await readContract(
      address,
      name,
      "get-full-traits",
      [uintCV(blockHeight)]
    );

    if (response.success && response.value) {
      const data = response.value.value;
      return {
        bitsign: data.bitsign.value,
        element: data.element.value,
        energy: data.energy.value,
        powerNumber: Number(data['power-number'].value),
        luckySat: Number(data['lucky-sat'].value),
        traitHash: data['trait-hash'].value,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching traits:", error);
    return null;
  }
}

export async function getAIPromptData(blockHeight: number): Promise<AIPromptData | null> {
  try {
    const response = await readContract(
      address,
      name,
      "get-ai-prompt-data",
      [uintCV(blockHeight)]
    );

    if (response.success && response.value) {
      const data = response.value.value;
      return {
        style: data.style.value,
        archetype: data.archetype.value,
        mood: data.mood.value,
        seed: Number(data.seed.value),
        colors: data.colors.value,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching AI prompt data:", error);
    return null;
  }
}


export async function getUserBirthBlock(userAddress: string): Promise<number | null> {
  try {
    const response = await readContract(
      address,
      name,
      "get-user-birth-block",
      [standardPrincipalCV(userAddress)]
    );

    if (response.success && response.value) {
      return Number(response.value.value);
    }
    return null;
  } catch (error) {
    console.error("Error fetching user birth block:", error);
    return null;
  }
}

export async function getUserTraits(userAddress: string): Promise<TraitData | null> {
  try {
    // First get birth block
    const birthBlockResponse = await readContract(
      address,
      name,
      "get-user-birth-block",
      [standardPrincipalCV(userAddress)] // Wait, need to import standardPrincipalCV
    );
    
    // ... logic continues ...
    // Actually, there is a direct function get-user-traits in contract
    
    const response = await readContract(
        address,
        name,
        "get-user-traits",
        [standardPrincipalCV(userAddress)]
    );

    if (response.success && response.value) {
        const data = response.value.value;
        return {
            bitsign: data.bitsign.value,
            element: data.element.value,
            energy: data.energy.value,
            powerNumber: Number(data['power-number'].value),
            luckySat: Number(data['lucky-sat'].value),
            traitHash: data['trait-hash'].value,
        };
    }
    return null;

  } catch (error) {
    console.error("Error fetching user traits:", error);
    return null;
  }
}
