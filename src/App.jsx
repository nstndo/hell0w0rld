import React, { useState, useEffect } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';
import { NETWORKS, CONTRACT_ABI } from './config/networks';
import Header from './components/Header';
import NetworkCard from './components/NetworkCard';

// Web3Modal configuration
const projectId = '90f5a0d4425e8c5b3c7f51c08ceba705';

const chains = NETWORKS.map(network => ({
  chainId: network.chainId,
  name: network.name,
  currency: network.currency,
  explorerUrl: network.explorerUrl,
  rpcUrl: network.rpcUrl
}));

const ethersConfig = defaultConfig({
  metadata: {
    name: 'Hello World',
    description: 'Daily blockchain check-in',
    url: 'https://hell0w0rld.vercel.app',
    icons: ['https://hell0w0rld.vercel.app/icon.png']
  }
});

// Initialize Web3Modal
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: false,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#007bff'
  }
});

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [statuses, setStatuses] = useState({});
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateStatus = (networkId, status) => {
    setStatuses(prev => ({ ...prev, [networkId]: status }));
  };

  const executeHello = async (network) => {
    if (!walletProvider || !address) return;

    try {
      updateStatus(network.id, { type: 'info', message: 'Switching network...' });

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      // Switch network if needed
      if (chainId !== network.chainId) {
        try {
          await walletProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${network.chainId.toString(16)}` }],
          });
        } catch (error) {
          if (error.code === 4902) {
            await walletProvider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${network.chainId.toString(16)}`,
                chainName: network.name,
                nativeCurrency: {
                  name: network.currency,
                  symbol: network.currency,
                  decimals: 18
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.explorerUrl]
              }]
            });
          } else {
            throw error;
          }
        }
      }

      updateStatus(network.id, { type: 'info', message: 'Checking if you can say hello...' });

      const contract = new Contract(network.contractAddress, CONTRACT_ABI, signer);
      
      // Check if user can say hello
      const canSay = await contract.canSayHello(address);
      if (!canSay) {
        const timeUntil = await contract.timeUntilNextHello(address);
        const hours = Math.floor(Number(timeUntil) / 3600);
        const minutes = Math.floor((Number(timeUntil) % 3600) / 60);
        updateStatus(network.id, { 
          type: 'error', 
          message: `❌ Already said hello today! Try again in ${hours}h ${minutes}m` 
        });
        return;
      }

      updateStatus(network.id, { type: 'info', message: 'Sending transaction...' });

      const tx = await contract.sayHello();

      updateStatus(network.id, { type: 'info', message: 'Confirming transaction...' });
      await tx.wait();

      // Get updated stats
      const stats = await contract.getUserStats(address);
      const streak = Number(stats._currentStreak);

      updateStatus(network.id, { 
        type: 'success', 
        message: `✅ Hello World! Streak: ${streak} day${streak !== 1 ? 's' : ''}!` 
      });
      
      setTimeout(() => updateStatus(network.id, null), 8000);

    } catch (error) {
      console.error('Hello execution error:', error);
      let errorMessage = 'Transaction failed';
      
      if (error.message.includes('Already said hello today')) {
        errorMessage = 'Already said hello today!';
      } else if (error.message.includes('user rejected')) {
        errorMessage = 'Transaction rejected';
      }
      
      updateStatus(network.id, {
        type: 'error',
        message: `❌ ${errorMessage}`
      });
    }
  };

  return (
    <div className="app">
      <Header theme={theme} onThemeToggle={toggleTheme} />

      <div className="container">
        <div className="intro">
          <h1>Hello World! 👋</h1>
          <p>Connect your wallet and say Hello to the blockchain. Check in daily across multiple networks and build your streak!</p>
        </div>

        <div className="networks-grid">
          {NETWORKS.map(network => (
            <NetworkCard
              key={network.id}
              network={network}
              isConnected={isConnected}
              onExecuteHello={executeHello}
              status={statuses[network.id]}
            />
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>Built with ❤️ for the onchain community</p>
      </footer>
    </div>
  );
}

export default App;