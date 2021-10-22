import { BigNumber, ethers } from "ethers";
import { classToPlain, plainToClass } from 'class-transformer';
import { AssetSubmission } from "./AssetSubmission";
import moment from "moment";
import { FTSO_MANAGER_ABI } from "../../constants/abis";

export class OpenEpoch {
  number = 0;
  start = 0;
  end: number;
  revealEnd: number;

  constructor() {
    // this.setCurrentEpochDataFromChain(ftsoManagerAddress, provider);
  }

  calculateSubmitTime(secondsBeforeEpochEnd: number): number {
    const submitBuffer = secondsBeforeEpochEnd * 1000;
    return this.end - submitBuffer;
  }

  isOpen(): boolean {
    return this.msUntilEnd() > 0;
  }

  msUntilEnd(): number {
    const now = Date.now();
    return this.end - now;
  }

  saveObject(): Record<string, any> {
    return classToPlain(this);
  }

  async setCurrentEpochDataFromChain(ftsoManagerAddress: string, provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider): Promise<void> {
    const managerContract = new ethers.Contract(ftsoManagerAddress, FTSO_MANAGER_ABI, provider);
    const chainData = await managerContract.getCurrentPriceEpochData();
    this.number = chainData._priceEpochId.toNumber();
    this.start = (chainData._priceEpochStartTimestamp.toNumber() * 1000);
    this.end = (chainData._priceEpochEndTimestamp.toNumber() * 1000);
    this.revealEnd = (chainData._priceEpochRevealEndTimestamp.toNumber() * 1000);
  }

}

export class OpenEpochFactory {
  static fromFirebaseObject(fbObject: Record<string, any>): OpenEpoch {
    const epoch = new OpenEpoch();
    epoch.number = fbObject.number;
    epoch.start = fbObject.start;
    epoch.end = fbObject.end;
    epoch.revealEnd = fbObject.revealEnd;
    return epoch;
   }

  static async fromChain(ftsoManagerAddress: string, provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider): Promise<OpenEpoch> {
    const epoch = new OpenEpoch();
    await epoch.setCurrentEpochDataFromChain(ftsoManagerAddress, provider);
    return epoch;
  }
}