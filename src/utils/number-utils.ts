import { BigNumber } from 'ethers';


export const truncate = (num, places): number => {
  return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

export const toBN = (numberToConvert: number): BigNumber => {
  return BigNumber.from(numberToConvert.toString());
}

export const fromBN = (numberToConvert: BigNumber): number => {
  return numberToConvert.toNumber();
}