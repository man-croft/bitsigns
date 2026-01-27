import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';
import { fetchCallReadOnlyFunction, cvToJSON, ClarityValue } from '@stacks/transactions';
import { APP_CONFIG } from './constants';

export const network = APP_CONFIG.NETWORK === 'mainnet'
  ? STACKS_MAINNET
  : STACKS_TESTNET;

export const getExplorerUrl = (txId: string) =>
  `https://explorer.hiro.so/txid/${txId}?chain=${APP_CONFIG.NETWORK}`;

export const getExplorerAddressUrl = (address: string) =>
  `https://explorer.hiro.so/address/${address}?chain=${APP_CONFIG.NETWORK}`;

export const getExplorerBlockUrl = (blockHeight: number) =>
  `https://explorer.hiro.so/block/${blockHeight}?chain=${APP_CONFIG.NETWORK}`;

export async function readContract(
  contractAddress: string,
  contractName: string,
  functionName: string,
  functionArgs: ClarityValue[],
  senderAddress: string = contractAddress
) {
  const result = await fetchCallReadOnlyFunction({
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    network,
    senderAddress,
  });

  return cvToJSON(result);
}
