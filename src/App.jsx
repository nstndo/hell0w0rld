import React, { useState, useEffect } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';
import { NETWORKS, CONTRACT_ABI } from './config/networks';
import Header from './components/Header';
import NetworkCard from './components/NetworkCard';

// Initialize Web3Modal directly here
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
    name: 'GM Daily',
    description: 'Daily blockchain check-in',
    url: 'https://hell0w0rld.vercel.app/',
    icons: ['https://hell0w0rld.vercel.app/icon.png']
  }
});

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

  const executeGM = async (network) => {
    if (!walletProvider || !address) return;

    try {
      updateStatus(network.id, { type: 'info', message: 'Switching network...' });

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

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

      updateStatus(network.id, { type: 'info', message: 'Sending transaction...' });

      const contract = new Contract(network.contractAddress, CONTRACT_ABI, signer);
      const tx = await contract.gm();

      updateStatus(network.id, { type: 'info', message: 'Confirming transaction...' });
      await tx.wait();

      updateStatus(network.id, { type: 'success', message: '✅ GM sent successfully!' });
      setTimeout(() => updateStatus(network.id, null), 5000);

    } catch (error) {
      console.error('GM execution error:', error);
      updateStatus(network.id, {
        type: 'error',
        message: `❌ ${error.message || 'Transaction failed'}`
      });
    }
  };

  return (
    <div className="app">
      <Header theme={theme} onThemeToggle={toggleTheme} />

      <div className="container">
        <div className="intro">
          <h1>Good Morning, Anon! ☀️</h1>
          <p>Connect your wallet and say GM to the blockchain. Check in daily across multiple networks and stay onchain.</p>
        </div>

        <div className="networks-grid">
          {NETWORKS.map(network => (
            <NetworkCard
              key={network.id}
              network={network}
              isConnected={isConnected}
              onExecuteGM={executeGM}
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