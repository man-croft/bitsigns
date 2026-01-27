import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseContractId(contractId: string) {
  const [address, name] = contractId.split('.');
  return { address, name };
}
