import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';
import { NETWORKS, CONTRACT_ABI } from './config/networks';
import Header from './components/Header';
import NetworkCard from './components/NetworkCard';
import NetworkTabs from './components/NetworkTabs';
import Footer from './components/Footer';
import Docs from './components/Docs';

// --- Spinner ---
function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner" />
      <span>Загрузка...</span>
      <style>{`
        .spinner-overlay {
          position: fixed; z-index: 30;
          top:0; left:0; right:0; bottom:0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: rgba(255,255,255,0.5);
        }
        .spinner {
          width:40px; height:40px;
          border:5px solid #007bff;
          border-radius:50%;
          border-top:5px solid transparent;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        @keyframes spin {
          0% {transform:rotate(0deg);}
          100% {transform:rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

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
    url: 'https://hell0w0rld.xyz',
    icons: ['https://hell0w0rld.xyz/icon.png']
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

function HomePage({ executeHello, statuses, isConnected, isLoading }) {
  const [activeTab, setActiveTab] = useState('mainnet');

  const filteredNetworks = NETWORKS.filter(network =>
    activeTab === 'testnet' ? network.isTestnet : !network.isTestnet
  );

  return (
    <div className="container">
      <div className="intro">
        <h1>HELLO WORLD!</h1>
        <p>Connect your wallet and say Hello World daily. Build your onchain streak across multiple networks. Free. Just gas fee.</p>
      </div>

      <NetworkTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="networks-grid">
        {filteredNetworks.map(network => (
          <NetworkCard
            key={network.id}
            network={network}
            isConnected={isConnected}
            onExecuteHello={executeHello}
            status={statuses[network.id]}
            disabled={isLoading}
          />
        ))}
      </div>
      {isLoading && <Spinner />}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [statuses, setStatuses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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

      updateStatus(network.id, { type: 'info', message: 'Checking if you can say hello...' });
      const contract = new Contract(network.contractAddress, CONTRACT_ABI, signer);
      const canSay = await contract.canSayHello(address);
      
      if (!canSay) {
        const timeUntil = await contract.timeUntilNextHello(address);
        const hours = Math.floor(Number(timeUntil) / 3600);
        const minutes = Math.floor((Number(timeUntil) % 3600) / 60);
        updateStatus(network.id, { 
          type: 'error', 
          message: `❌ Already said hello today! Try again in ${hours}h ${minutes}m` 
        });
        setIsLoading(false);
        return;
      }

      updateStatus(network.id, { type: 'info', message: 'Sending transaction...' });
      const tx = await contract.sayHello();

      updateStatus(network.id, { type: 'info', message: 'Confirming transaction...' });
      await tx.wait();

      await new Promise(resolve => setTimeout(resolve, 1500));
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header theme={theme} onThemeToggle={toggleTheme} />

      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              executeHello={executeHello} 
              statuses={statuses} 
              isConnected={isConnected} 
              isLoading={isLoading}
            />
          } 
        />
        <Route path="/docs" element={<Docs />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
