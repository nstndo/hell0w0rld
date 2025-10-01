// Network configurations - easy to extend
export const NETWORKS = [
  {
    id: 'sepolia',
    name: 'Sepolia',
    chainId: 11155111,
    contractAddress: '0xd807f615b5f25ecf5220c77b790850e09a3fc21c', // Replace with actual contract
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
    icon: 'SEP',
    explorerUrl: 'https://sepolia.etherscan.io',
    currency: 'ETH'
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    contractAddress: '0x0000000000000000000000000000000000000000', // Replace with actual contract
    rpcUrl: 'https://sepolia.base.org',
    icon: 'BASE',
    explorerUrl: 'https://sepolia.basescan.org',
    currency: 'ETH'
  }
];

// Contract ABI
export const CONTRACT_ABI = [
  "function gm() public",
  "function lastGM(address) public view returns (uint256)"
];