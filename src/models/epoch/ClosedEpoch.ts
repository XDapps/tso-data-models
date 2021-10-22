import { BigNumber } from "ethers";

export class ClosedEpoch {
  epochNumber: number;
  epochEnd: number;
  outputPrice?: number;
  rewardsReceived?: boolean;

  constructor(epochNumber: number, epochStart: number) {
    this.epochNumber = epochNumber;
    const tempEnd: Date = new Date(epochStart * 1000);
    const timeToAdd = 120 * 1000;
    this.epochEnd = tempEnd.getMilliseconds() + timeToAdd;
  }


}
