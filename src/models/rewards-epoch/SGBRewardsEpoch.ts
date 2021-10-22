import { BigNumber, ethers } from "ethers";
import { FTSOVotePower, FTSO_MANAGER_ABI, sbFTSOManagerAddress, sbRewardsManagerAddress, wSGBAddress } from "../..";

export class UserRewardsEpoch {
  rewardsEpochNumber: number;
  votePowerBlock: number;
  votePowerAtBlock: number;
  userAddress: string;
  claimedRewards: number;
  claimableRewards: number;
  pendingRewards: number;
  votePowerReader: FTSOVotePower;

  constructor(rewardsEpochNumber: number, userAddress: string, tsoAddress: string, provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider) {
    this.rewardsEpochNumber = rewardsEpochNumber;
    this.userAddress = userAddress;
    this.setVoteBlock(provider);
    this.setVotePowerAtBlock(tsoAddress);
    this.votePowerReader = new FTSOVotePower(wSGBAddress, sbRewardsManagerAddress, provider)
  }

  async setVoteBlock(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider) {
    const managerContract = new ethers.Contract(sbFTSOManagerAddress, FTSO_MANAGER_ABI, provider);
    const vpBlock = await managerContract.getRewardEpochVotePowerBlock(this.rewardsEpochNumber);
    this.votePowerBlock = vpBlock.toNumber();
    }  

  async setVotePowerAtBlock(tsoAddress: string) {
    const bnVotePower = await this.votePowerReader.getVotePowerDelegatedFromAnAddressAtBlock(this.userAddress, tsoAddress, this.votePowerBlock);
    this.votePowerAtBlock = parseFloat(ethers.utils.formatUnits(bnVotePower.toHexString()));
  }

  setUnClaimedRewards() {
    this.claimedRewards = 0;
  }

  setClaimableRewards() {
    this.claimableRewards = 0;
  }
  
  setPendingRewards() {
    this.pendingRewards = 0;
  }

}
