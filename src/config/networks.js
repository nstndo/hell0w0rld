// Network configurations - easy to extend 
export const NETWORKS = [
  // Testnets
  {
    id: 'sepolia',
    name: 'Sepolia',
    chainId: 11155111,
    contractAddress: '0x8fCA96ae99D575e89f76D7E410A2B66AcfFb9683',
    rpcUrl: 'https://sepolia.infura.io/v3/bf6fd6deeb9d452880797d47f983dbcc',
    icon: 'SEP',
    logo: '/images/networks/ETH.svg',
    explorerUrl: 'https://sepolia.etherscan.io',
    currency: 'ETH',
    isTestnet: true
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    contractAddress: '0x9f27110Ec3b411B44Ec1c7AB9c964cB5eC8d33d2',
    rpcUrl: 'https://sepolia.base.org',
    icon: 'BASE',
    logo: '/images/networks/BASE.svg',
    explorerUrl: 'https://sepolia.basescan.org',
    currency: 'ETH',
    isTestnet: true
  },
  {
    id: 'optimism-sepolia',
    name: 'Optimism Sepolia',
    chainId: 11155420,
    contractAddress: '0x3c071d17561dc12437844575fa2426f8f28173c1',
    rpcUrl: 'https://sepolia.optimism.io',
    icon: 'OP',
    logo: '/images/networks/OP.svg',
    explorerUrl: 'https://sepolia-optimism.etherscan.io',
    currency: 'ETH',
    isTestnet: true
  },
  {
    id: 'monad-testnet',
    name: 'Monad Testnet',
    chainId: 10143,
    contractAddress: '0xC5464A200d5fE26B9EB78A22e0d3df8DF1971beB',
    rpcUrl: 'https://testnet-rpc.monad.xyz',
    icon: 'MON',
    logo: '/images/networks/MON.svg',
    explorerUrl: 'https://testnet.monadscan.com/',
    currency: 'MON',
    isTestnet: true
  },
  {
    id: 'pharos-testnet',
    name: 'Pharos Testnet',
    chainId: 688688,
    contractAddress: '0xa1087a758742C8207Eb547fBC4A5B06d30A8526a',
    rpcUrl: 'https://testnet.dplabs-internal.com',
    icon: 'PHRS',
    logo: '/images/networks/PHRS.svg',
    explorerUrl: 'https://pharos-testnet.socialscan.io/',
    currency: 'PHRS',
    isTestnet: true
  },
  {
    id: 'rise-testnet',
    name: 'Rise Testnet',
    chainId: 11155931,
    contractAddress: '0x370f35A28797A17603E0fbD5df6010272b1006FE',
    rpcUrl: 'https://testnet.riselabs.xyz',
    icon: 'RISE',
    logo: '/images/networks/RISE.svg',
    explorerUrl: 'https://explorer.testnet.riselabs.xyz/',
    currency: 'ETH',
    isTestnet: true
  },
  {
    id: 'megaeth-testnet',
    name: 'Megaeth Testnet',
    chainId: 6342,
    contractAddress: '0xc87347a4e46ad9d0809df41db6802809d7086b2e',
    rpcUrl: 'https://carrot.megaeth.com/rpc',
    icon: 'MEGA',
    logo: '/images/networks/MEGA.svg',
    explorerUrl: 'https://web3.okx.com/ru/explorer/megaeth-testnet',
    currency: 'ETH',
    isTestnet: true
  },
  {
    id: 'kadena-testnet-20',
    name: 'Kadena Chainweb Testnet',
    chainId: 5920,
    contractAddress: '0x7f81BFb73cb29C3725779ec2C060787DaA2f97d4',
    rpcUrl: 'https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc',
    icon: 'KDA',
    logo: '/images/networks/KDA.svg',
    explorerUrl: 'https://chain-20.evm-testnet-blockscout.chainweb.com/',
    currency: 'KDA',
    isTestnet: true
  },
  {
    id: 'kadena-testnet-21',
    name: 'Kadena Chainweb Testnet',
    chainId: 5921,
    contractAddress: '0xd0c205e3C704595113FB8006379EDd1Bc89B2A17',
    rpcUrl: 'https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc',
    icon: 'KDA',
    logo: '/images/networks/KDA.svg',
    explorerUrl: 'https://chain-21.evm-testnet-blockscout.chainweb.com/',
    currency: 'KDA',
    isTestnet: true
  },
  // Mainnets
  {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    contractAddress: '0xefbc854f51cbb80ccbe12c69da179d6901978f6c',
    rpcUrl: 'https://mainnet.base.org',
    icon: 'BASE',
    logo: '/images/networks/BASE.svg',
    explorerUrl: 'https://basescan.org',
    currency: 'ETH',
    isTestnet: false
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    contractAddress: '0xC1225a891ecCEAF5e0899e9656FaeE10D0f62eF7',
    rpcUrl: 'https://optimism-rpc.publicnode.com',
    icon: 'OP',
    logo: '/images/networks/OP.svg',
    explorerUrl: 'https://explorer.optimism.io/',
    currency: 'ETH',
    isTestnet: false
  },
  {
    id: 'unichain',
    name: 'Unichain',
    chainId: 130,
    contractAddress: '0xa7877CDF570BEbdf949CD9eC1147cf5c3241A380',
    rpcUrl: 'https://unichain-rpc.publicnode.com',
    icon: 'UNI',
    logo: '/images/networks/UNI.svg',
    explorerUrl: 'https://uniscan.xyz/',
    currency: 'ETH',
    isTestnet: false
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