import { BigNumber, ethers } from "ethers";
import { PRICE_SUBMITTER_ABI, TEST_MNEMONIC } from '../../constants/abis'

export class FTSOPriceSubmitter {
  ftsoIndex: number;
  voterAddress: string;
  whitelisterContractAddress: string;



  constructor(voterAddress: string, whitelisterContractAddress: string, ftsoIndex: number) {
    this.voterAddress = voterAddress;
    this.whitelisterContractAddress = whitelisterContractAddress;
    this.ftsoIndex = ftsoIndex;
  }






  async requestFullVoterWhitelisting(): Promise<any> {
    const testWallet: ethers.Wallet = ethers.Wallet.fromMnemonic(TEST_MNEMONIC);
    const abi = ["requestFullVoterWhitelisting(address _voter) external"];
    const whitelisterContract = new ethers.Contract(this.whitelisterContractAddress, abi, testWallet);
    return await whitelisterContract.requestFullVoterWhitelisting(this.voterAddress);
  }

}
