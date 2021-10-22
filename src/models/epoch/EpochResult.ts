import { BigNumber } from "ethers";
import { classToPlain } from "class-transformer";

export class EpochResult {
  number: number;
  start: number;
  end: number;
  submitPrice: number;
  submitTime: number;
  outputPrice: number;
  rewardsReceived: boolean;

  constructor(epochNumber: number, start: number, end: number, submitPrice: number, submitTime: number, outputPrice: number, rewardsReceived: boolean) {
    this.number = epochNumber;
    this.start = start;
    this.end = end;
    this.submitPrice = submitPrice;
    this.submitTime = submitTime;
    this.outputPrice = outputPrice;
    this.rewardsReceived = rewardsReceived;
  }
  saveObject(): Record<string, any> {
    return classToPlain(this);
  }
}
