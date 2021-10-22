import { BigNumber, ethers } from "ethers";
import { PRICE_SUBMITTER_ABI, TEST_MNEMONIC } from '../../constants/abis';

export class FTSOVoterWhitelister {
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
  async requestWhitelistingVoter(signer: ethers.Signer): Promise<any> {
    const testWallet: ethers.Wallet = ethers.Wallet.fromMnemonic(TEST_MNEMONIC);
    const abi = ["function requestWhitelistingVoter(address _voter, uint256 _ftsoIndex) public"];
   // const whitelisterContract = new ethers.Contract(FTSO_REGISTRY_ADDRESS, abi, testWallet);
  //  return await whitelisterContract.requestWhitelistingVoter(this.voterAddress, this.ftsoIndex);
  }


  async getMaxVoters  (contractAddress: string, provider: ethers.providers.JsonRpcProvider): Promise<BigNumber> {
    const abi = ["function maxVotersForFtso(uint256 _ftsoIndex) external view returns (uint256)"];
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const result: BigNumber = await contract.maxVotersForFtso(0);
      return result;
    } catch (error) {
      console.log('Error ', error)
      return BigNumber.from(0);
    }
  };
  async getDefaultMaxVoters(contractAddress: string, provider: ethers.providers.JsonRpcProvider): Promise<BigNumber> {
    const abi = ["function defaultMaxVotersForFtso() external view returns (uint256)"];
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const result: BigNumber = await contract.defaultMaxVotersForFtso();
      return result;
    } catch (error) {
      console.log('Error ', error)
      return BigNumber.from(0);
    }
  };



  async getFtsoManager (contractAddress: string, provider: ethers.providers.JsonRpcProvider): Promise<string> {
    const abi = ["function getFtsoManager() external view returns (address)"];
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const result = await contract.getFtsoManager();
      return result;
    } catch (error) {
      console.log('Error ', error)
      return '';
    }
  };
}
