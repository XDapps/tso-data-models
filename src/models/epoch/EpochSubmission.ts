import { BigNumber, ethers } from "ethers";
import { OpenEpoch } from "./OpenEpoch";
import { PRICE_SUBMITTER_ABI } from '../../constants/abis'
import { AssetSubmission } from "../..";

export class EpochSubmission {
  epochNumber: number;
  registryAddress = '';
  providerAddress: string;
  listOfHashes: any[] = [];
  listOfPrices: any[] = [];
  listOfRandoms: any[] = [];
  targetSubmitTime?: number;
  actualSubmitTime?: number;
  submitTxId?: string;
  submitBlockNumber?: number;
  revealTxId?: string;
  revealBlockNumber?: number;
  revealTime?: number;

  constructor(submitterAddress: string, epochData: OpenEpoch, submitDelay: number) {
    this.providerAddress = submitterAddress;
    this.initializeSubmissionData(epochData, submitDelay);
  }

  setSubmissionData(submissionPrice: number) {
    this.actualSubmitTime = Date.now();
  }

  initializeSubmissionData(epochData: OpenEpoch, submitDelay: number) {
    this.epochNumber = epochData.number;
    this.targetSubmitTime = epochData.calculateSubmitTime(submitDelay);
  }

  isTargetSubmitTime() {
    return Date.now() >= this.targetSubmitTime;
  }

  preparePriceHashesForSubmission(listOfFTSOs: string[], listOfPrices: AssetSubmission[], providerAddress: string) {
    this.listOfHashes = [];
    for (let i = 0; i < listOfFTSOs.length; i++) {
      const ftso = listOfFTSOs[i];
//console.log('FTS ', ftso)
      const sub: AssetSubmission = listOfPrices[i];
    //  console.log('sub ', sub)
      const hash = sub.getSubmitPriceHash(providerAddress);
      this.listOfHashes.push(hash);
    }
  }


  async submitPriceHashes(contractAddress: string, provider: ethers.providers.JsonRpcProvider, listOfIndices: number[]): Promise<any> {
    const abi = ["function submitPriceHashes(uint256[] memory _ftsoIndices, bytes32[] memory _hashes) external"];
    const submitterContract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    return await submitterContract.submitPriceHashes(listOfIndices, this.listOfHashes);
  }


  async revealPrices(contractAddress: string, provider: ethers.providers.JsonRpcProvider, epochId: number, listOfIndices: number[]): Promise<any> {
    const abi = ["function revealPrices(uint256 _epochId, uint256[] memory _ftsoIndices, uint256[] memory _prices, uint256[] memory _randoms) external"];
    const submitterContract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    return await submitterContract.revealPrices(epochId, listOfIndices,  );
  }

}
