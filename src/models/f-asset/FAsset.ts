import { ethers, Contract, ContractFactory } from 'ethers';
import { FTSO_REGISTRY_ABI } from '../../constants/abis';
//import { FTSO_REGISTRY_ADDRESS } from '../../constants/addresses';

export class FAsset {
  ftsoRegistryAddress: Contract;
  ftsoRegistryContract: Contract;
  //voterWhitelister: Contract;
  tsoAddress?: string;
  assetName: string;
  // getFtsoBySymbol("FXRP");
  assetSymbol: string;
  assetAddress: string;
  priceProviderAddress?: string;

  constructor(assetName: string, assetSymbol: string, assetAddress: string, priceProviderAddress: string, ethersProvider: ethers.providers.Provider) {
    this.assetName = assetName;
    this.assetSymbol = assetSymbol;
    this.assetAddress = assetAddress;
    this.priceProviderAddress = priceProviderAddress;
    //  this.ftsoRegistryContract = new Contract(FTSO_REGISTRY_ADDRESS, FTSO_REGISTRY_ABI, ethersProvider)
  }

  async setRegisteredTSO() {
    this.tsoAddress = await this.ftsoRegistryContract.getFtsoBySymbol(this.assetSymbol);
  }


}
