import React, { useState, useEffect, useRef } from 'react';
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

function HomePage({ executeHello, statuses, isConnected }) {
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
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [statuses, setStatuses] = useState({});
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  
  // Track active transactions
  const activeTransactions = useRef(new Set());
  const transactionQueue = useRef([]);
  const isProcessingQueue = useRef(false);

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

  const processTransactionQueue = async () => {
    if (isProcessingQueue.current || transactionQueue.current.length === 0) {
      return;
    }

    isProcessingQueue.current = true;

    while (transactionQueue.current.length > 0) {
      const { network, resolve, reject } = transactionQueue.current.shift();
      
      try {
        await executeHelloInternal(network);
        resolve();
      } catch (error) {
        reject(error);
      }
      
      // Small delay between transactions
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    isProcessingQueue.current = false;
  };

  const executeHello = async (network) => {
    // Check if already processing this network
    if (activeTransactions.current.has(network.id)) {
      updateStatus(network.id, { 
        type: 'error', 
        message: '⏳ Transaction already in progress' 
      });
      return;
    }

    // Add to active transactions
    activeTransactions.current.add(network.id);

    // Add to queue
    return new Promise((resolve, reject) => {
      transactionQueue.current.push({ network, resolve, reject });
      processTransactionQueue();
    }).finally(() => {
      // Remove from active transactions when done
      activeTransactions.current.delete(network.id);
    });
  };

  const executeHelloInternal = async (network) => {
    if (!walletProvider || !address) return;

    let networkChanged = false;
    let isOurNetworkSwitch = false;
    
    const handleChainChanged = () => {
      // Only set networkChanged if it's not our intentional switch
      if (!isOurNetworkSwitch) {
        networkChanged = true;
      }
    };

    try {
      updateStatus(network.id, { type: 'info', message: 'Preparing...' });

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      // Check if we need to switch network
      if (chainId !== network.chainId) {
        updateStatus(network.id, { type: 'info', message: 'Switching network...' });
        
        // Mark that we're intentionally switching
        isOurNetworkSwitch = true;
        
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

        // Wait for network to switch
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Now we can monitor for unexpected changes
        isOurNetworkSwitch = false;
        
        // Add listener AFTER our switch is complete
        if (window.ethereum) {
          window.ethereum.on('chainChanged', handleChainChanged);
        }

        // Verify network switch
        const currentProvider = new BrowserProvider(walletProvider);
        const currentNetwork = await currentProvider.getNetwork();

        if (Number(currentNetwork.chainId) !== network.chainId) {
          throw new Error('Network switch failed');
        }
      } else {
        // Already on correct network, add listener immediately
        if (window.ethereum) {
          window.ethereum.on('chainChanged', handleChainChanged);
        }
      }

      if (networkChanged) {
        throw new Error('Network changed during transaction');
      }

      updateStatus(network.id, { type: 'info', message: 'Checking if you can say hello...' });

      const contract = new Contract(network.contractAddress, CONTRACT_ABI, signer);
      
      const canSay = await contract.canSayHello(address);

      if (networkChanged) {
        throw new Error('Network changed during transaction');
      }

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

      if (networkChanged) {
        throw new Error('Network changed during transaction');
      }

      const tx = await contract.sayHello();

      updateStatus(network.id, { type: 'info', message: 'Confirming transaction...' });

      if (networkChanged) {
        throw new Error('Network changed during transaction');
      }

      await tx.wait();

      if (networkChanged) {
        throw new Error('Network changed during transaction');
      }

      // Delay for RPC node to update state
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
      
      if (networkChanged) {
        errorMessage = 'Network changed during transaction';
      } else if (error.message.includes('Already said hello today')) {
        errorMessage = 'Already said hello today!';
      } else if (error.message.includes('user rejected')) {
        errorMessage = 'Transaction rejected';
      } else if (error.message.includes('network changed')) {
        errorMessage = 'Network changed during transaction';
      } else if (error.message.includes('Network switch failed')) {
        errorMessage = 'Network switch failed. Please try again';
      }
      
      updateStatus(network.id, {
        type: 'error',
        message: `❌ ${errorMessage}`
      });
      
      throw error;
    } finally {
      // Clean up event listener
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
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