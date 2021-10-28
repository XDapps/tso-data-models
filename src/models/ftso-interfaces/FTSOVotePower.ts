import { BigNumber, ethers } from "ethers";
import { FTSO_REWARDS_MANAGER_API, PRICE_SUBMITTER_ABI } from '../../constants/abis'
import { WVP_TOKEN_API } from "../../";


export class FTSOVotePower {
  votingTokenAddress: string;
  rewardsManagerAddress: string;
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  wrappedTokenContract: ethers.Contract;
  rewardsManagerContract: ethers.Contract;

  constructor(votingTokenAddress: string, rewardsManagerAddress: string, provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider) {
    this.votingTokenAddress = votingTokenAddress;
    this.rewardsManagerAddress = rewardsManagerAddress;
    this.provider = provider;
    this.wrappedTokenContract = new ethers.Contract(this.votingTokenAddress, WVP_TOKEN_API, this.provider.getSigner());;
    this.rewardsManagerContract = new ethers.Contract(this.rewardsManagerAddress, FTSO_REWARDS_MANAGER_API, this.provider.getSigner());;
  }

  getTotalVotePower = async (): Promise<BigNumber> => {
    let valueToReturn: BigNumber = BigNumber.from(0);
    try {
      valueToReturn = await this.wrappedTokenContract.totalVotePower();
      return valueToReturn;
    } catch (error) {
      console.log('error ', error);
      return valueToReturn;
    }
  }
  getTotalVotePowerOfAnAddress = async (addressToCheck: string): Promise<BigNumber> => {
    let valueToReturn: BigNumber = BigNumber.from(0);
    try {
      valueToReturn = await this.wrappedTokenContract.votePowerOf(addressToCheck);
      return valueToReturn;
    } catch (error) {
      console.log('error ', error);
      return valueToReturn;
    }
  }

  getVotePowerDelegatedFromAnAddress = async (fromAddress: string, toAddress: string): Promise<BigNumber> => {
    let valueToReturn: BigNumber = BigNumber.from(0);
    try {
      valueToReturn = await this.wrappedTokenContract.votePowerFromTo(fromAddress, toAddress);
      return valueToReturn;
    } catch (error) {
      console.log('error ', error);
      return valueToReturn;
    }
  }

  getVotePowerDelegatedFromAnAddressAtBlock = async (fromAddress: string, toAddress: string, block: number): Promise<BigNumber> => {
    let valueToReturn: BigNumber = BigNumber.from(0);
    try {
      valueToReturn = await this.wrappedTokenContract.votePowerFromToAt(fromAddress, toAddress, block);
      return valueToReturn;
    } catch (error) {
      console.log('error ', error);
      return valueToReturn;
    }
  }
  getAddressesDelegatedTo = async (addressToGet: string): Promise<string[]> => {
    let valueToReturn: string[] = [];
    try {
      valueToReturn = await this.wrappedTokenContract.delegatesOf(addressToGet);
      return valueToReturn;
    } catch (error) {
      console.log('error ', error);
      return valueToReturn;
    }
  }
  unDelegateAll = async (addressToGet: string): Promise<string[]> => {
    let valueToReturn: string[] = [];
    try {
      valueToReturn = await this.wrappedTokenContract.delegatesOf(addressToGet);
      return valueToReturn;
    } catch (error) {
      console.log('error ', error);
      return valueToReturn;
    }
  }

  handleDelegation = async (tsoAddress: string, percentage: number): Promise<any> => {
    try {
      const formattedPercentage: number = percentage * 100;
      return await this.wrappedTokenContract.delegate(tsoAddress, formattedPercentage);
    } catch (error) {
      console.log('error ', error);
      return;
    }
  }
  async getUnDelegatedVotePowerOf(addressToCheck: string): Promise<BigNumber> {
    try {
      return await this.wrappedTokenContract.undelegatedVotePowerOf(addressToCheck);
    } catch (error) {
      console.log('Error ', error)
      return BigNumber.from(0);
    }
  };

  wrapTokensDeposit = async (addressToGet: string, amountToDeposit: BigNumber): Promise<any> => {
    try {
      return await this.wrappedTokenContract.deposit({ value: amountToDeposit });
    } catch (error) {
      console.log('error ', error);
      return;
    }
  }

  unWrapTokensWithdraw = async (amountToWd: BigNumber): Promise<any> => {
    try {
      return await this.wrappedTokenContract.withdraw(amountToWd);
    } catch (error) {
      console.log('error ', error);
      return;
    }
  }

  claimRewards = async (addressToClaim: string, epochsToClaim: number[],): Promise<BigNumber> => {
    try {
      return await this.rewardsManagerContract.claimReward(addressToClaim, epochsToClaim);
    } catch (error) {
      console.log('error ', error);
      return;
    }
  }


  // getVotePowerBlockForEpoch = async (votePowerBlock: number): Promise<BigNumber> => {
  //   try {
  //     return await this.rewardsManagerContract.claimReward(addressToClaim, epochsToClaim);
  //   } catch (error) {
  //     console.log('error ', error);
  //     return;
  //   }
  // }



}
