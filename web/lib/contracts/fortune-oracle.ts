import { uintCV } from "@stacks/transactions";
import { CONTRACTS } from "../constants";
import { readContract } from "../stacks";
import { parseContractId } from "../utils";
import { Fortune, PersonalizedFortune } from "@/types";

const { address, name } = parseContractId(CONTRACTS.FORTUNE_ORACLE);

export async function getDailyFortune(): Promise<Fortune | null> {
  try {
    const response = await readContract(
      address,
      name,
      "get-daily-fortune",
      []
    );

    if (response.success && response.value) {
      const data = response.value.value;
      return {
        template: data.template.value,
        outcome: data.outcome.value,
        modifier: data.modifier.value,
        luckyNumber: Number(data['lucky-number'].value),
        blockHeight: Number(data.bh.value),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching daily fortune:", error);
    return null;
  }
}

export async function getPersonalizedFortune(birthBlock: number): Promise<PersonalizedFortune | null> {
  try {
    const response = await readContract(
      address,
      name,
      "get-personalized-fortune",
      [uintCV(birthBlock)]
    );

    if (response.success && response.value) {
      const data = response.value.value;
      return {
        template: data.template.value,
        outcome: data.outcome.value,
        modifier: data.modifier.value,
        luckyNumber: Number(data['lucky-number'].value),
        blockHeight: Number(data.bh.value),
        affinityScore: Number(data['affinity-score'].value),
        isPowerDay: data['is-power-day'].value,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching personalized fortune:", error);
    return null;
  }
}
