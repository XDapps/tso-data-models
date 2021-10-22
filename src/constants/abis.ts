export const FTSO_REGISTRY_ABI = ["function getSupportedIndices() external view returns(uint256[] memory _supportedIndices)", 'function getFtso(uint256 _assetIndex) external view returns(IIFtso _activeFtso)', 'function getSupportedSymbols() external view returns(string[] memory _supportedSymbols)', 'function getFtsos(uint256[] memory _assetIndices) external view returns(IFtsoGenesis[] memory _ftsos)', "function getCurrentPrice(uint256 _assetIndex) external view returns(uint256 _price, uint256 _timestamp)"];
export const PRICE_SUBMITTER_ABI = ["function submitPriceHashes(uint256[] memory _ftsoIndices, bytes32[] memory _hashes) external", "function revealPrices(uint256 _epochId, uint256[] memory _ftsoIndices, uint256[] memory _prices, uint256[] memory _randoms) external",];
export const TEST_MNEMONIC = "riot bitter fish try tiger crystal banana picture inherit sort snow picture";
export const WVP_TOKEN_API = [
  "function undelegateAll() external",
  "function votePowerOfAt(address _owner, uint256 _blockNumber) external view returns(uint256)",
  "function totalVotePower() external view returns(uint256)",
  "function votePowerOf(address _owner) external view returns(uint256)",
  "function delegate(address _to, uint256 _bips) external",
  "function withdraw(uint256 _amount) external",
  "function deposit() external payable",
  "function undelegatedVotePowerOf(address _owner) external view returns(uint256)",
  "function votePowerFromTo(address _from, address _to) external view returns(uint256)",
  "function votePowerFromToAt(address _from, address _to, uint _blockNumber) external view returns(uint256)",
  "function delegatesOf(address _who) external view returns (address[] memory _delegateAddresses, uint256[] memory _bips, uint256 _count, uint256 _delegationMode)"
];
export const FTSO_REWARDS_MANAGER_API = [
  "function claimReward(address payable _recipient, uint256[] memory _rewardEpochs)external returns(uint256 _rewardAmount)",
  "function getStateOfRewards(address _beneficiary, uint256 _rewardEpoch) external view returns(address[] memory _dataProviders,uint256[] memory _rewardAmounts, bool[] memory _claimed,bool _claimable)"
];
export const FTSO_MANAGER_ABI = ["function active() external view returns (bool)", 'function getPriceSubmitter() external view returns (IPriceSubmitter)', 'function getCurrentRewardEpoch() external view returns (uint256)', 'function getRewardEpochVotePowerBlock(uint256 _rewardEpoch) external view returns (uint256)', "function getCurrentPriceEpochData() external view returns(uint256 _priceEpochId, uint256 _priceEpochStartTimestamp, uint256 _priceEpochEndTimestamp, uint256 _priceEpochRevealEndTimestamp, uint256 _currentTimestamp)"];