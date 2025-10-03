// Network configurations - easy to extend 
export const NETWORKS = [
  {
    id: 'sepolia',
    name: 'Sepolia',
    chainId: 11155111,
    contractAddress: '0x8fCA96ae99D575e89f76D7E410A2B66AcfFb9683',
    rpcUrl: 'https://sepolia.infura.io/v3/bf6fd6deeb9d452880797d47f983dbcc',
    icon: 'SEP',
    explorerUrl: 'https://sepolia.etherscan.io',
    currency: 'ETH'
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    contractAddress: '0x9f27110Ec3b411B44Ec1c7AB9c964cB5eC8d33d2',
    rpcUrl: 'https://sepolia.base.org',
    icon: 'BASE',
    explorerUrl: 'https://sepolia.basescan.org',
    currency: 'ETH'
  }
  {
    id: 'optimism-sepolia',
    name: 'Optimism Sepolia',
    chainId: 11155420,
    contractAddress: '0x3c071d17561dc12437844575fa2426f8f28173c1',
    rpcUrl: 'https://sepolia.optimism.io',
    icon: 'OP',
    explorerUrl: 'https://sepolia-optimism.etherscan.io',
    currency: 'ETH'
  }
];

// Updated ABI for HelloWorld contract
export const CONTRACT_ABI = [
  "function sayHello() external",
  "function canSayHello(address user) external view returns (bool)",
  "function getCurrentDay() external view returns (uint256)",
  "function lastHelloDay(address) external view returns (uint256)",
  "function lastHello(address) external view returns (uint256)",
  "function totalHellos(address) external view returns (uint256)",
  "function currentStreak(address) external view returns (uint256)",
  "function getUserStats(address user) external view returns (uint256 _lastHello, uint256 _totalHellos, uint256 _currentStreak, bool _canSayHello)",
  "function getUserInfo(address user) external view returns (uint256 _lastHelloDay, uint256 _currentDay, uint256 _lastHello, uint256 _totalHellos, uint256 _currentStreak, bool _canSayHello)",
  "function timeUntilNextHello(address user) external view returns (uint256)",
  "function timeUntilMidnight() external view returns (uint256)"
];