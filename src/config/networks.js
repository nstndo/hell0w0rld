// Network configurations - easy to extend
export const NETWORKS = [
  {
    id: 'sepolia',
    name: 'Sepolia',
    chainId: 11155111,
    contractAddress: '0x22763E02342c2959859Afe7FF5c2a58Bb39F1D5C',
    rpcUrl: 'https://sepolia.infura.io/v3/bf6fd6deeb9d452880797d47f983dbcc',
    icon: 'SEP',
    explorerUrl: 'https://sepolia.etherscan.io',
    currency: 'ETH'
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    contractAddress: '0x0000000000000000000000000000000000000000',
    rpcUrl: 'https://sepolia.base.org',
    icon: 'BASE',
    explorerUrl: 'https://sepolia.basescan.org',
    currency: 'ETH'
  }
];

// Updated ABI for HelloWorld contract
export const CONTRACT_ABI = [
  "function sayHello() external",
  "function canSayHello(address user) external view returns (bool)",
  "function lastHello(address) external view returns (uint256)",
  "function totalHellos(address) external view returns (uint256)",
  "function currentStreak(address) external view returns (uint256)",
  "function getUserStats(address user) external view returns (uint256 _lastHello, uint256 _totalHellos, uint256 _currentStreak, bool _canSayHello)",
  "function timeUntilNextHello(address user) external view returns (uint256)"
];