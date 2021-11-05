import { BigNumber, ethers } from "ethers";
import { OpenEpoch } from "./OpenEpoch";
import { PRICE_SUBMITTER_ABI } from '../../constants/abis';
import { classToPlain } from "class-transformer";

export class AssetSubmission {
  epochNumber: number;
  assetName: string;
  assetIndex: number;
  offsetUsed: number;
  price: BigNumber;
  random: number;

  constructor(epochNumber: number, assetName: string, assetIndex: number, price: number, offsetUsed: number) {
    this.epochNumber = epochNumber;
    this.assetName = assetName;
    this.assetIndex = assetIndex;
    this.offsetUsed = offsetUsed;
    let initialFormat: string = Number.parseFloat(price.toString()).toFixed(5);
    if (initialFormat.includes('.')) {
      initialFormat = initialFormat.replace('.', '')
    }
    this.price = BigNumber.from(initialFormat);
    this.random = this.getRandomInt();
  }

  getRandomInt() {
    let min = Math.ceil(1);
    let max = Math.floor(Number.MAX_SAFE_INTEGER);
    return Math.floor(Math.random() * (max - min));


  }

  saveObject(): Record<string, any> {
    return classToPlain(this);
  }

  getSubmitPriceHash(tsoAddress: string) {
    return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["uint256", "uint256", "address"], [this.price, this.random, tsoAddress]));
  }
}


export class AssetSubmissionFactory {
  static fromFirebaseObject(fbObject: any): AssetSubmission {
    const valueToReturn = new AssetSubmission(fbObject.epochNumber, fbObject.assetName, fbObject.assetIndex, fbObject.price.toNumber(), fbObject.offsetUsed);
    valueToReturn.random = fbObject.random;
    return valueToReturn;
  }


}