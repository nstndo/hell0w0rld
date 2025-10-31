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

// Spinner component
function Spinner() {
  return (
    <div style={{
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid #007bff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginLeft: '8px',
      verticalAlign: 'middle'
    }} />
  );
}

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`, styleSheet.cssRules.length);

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

function HomePage({ executeHello, statuses, isConnected, loadingStates }) {
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
            isLoading={loadingStates[network.id] || false}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [statuses, setStatuses] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  // Queue reference per network to serialize transactions
  const queuesRef = useRef({});
  // Track active request ID per network to ignore stale responses
  const requestIdRef = useRef({});

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateStatus = (networkId, status) => {
    setStatuses(prev => ({ ...prev, [networkId]: status }));
  };

  // Enqueue task to serialize execution per network
  const enqueue = (networkId, task) => {
    if (!queuesRef.current[networkId]) {
      queuesRef.current[networkId] = Promise.resolve();
    }
    queuesRef.current[networkId] = queuesRef.current[networkId]
      .then(() => task())
      .catch(err => {
        console.error(`Error in queue for network ${networkId}:`, err);
      });
    return queuesRef.current[networkId];
  };

  const executeHello = (network) => {
    if (!walletProvider || !address) return;

    // Increment request ID for this network to track stale requests
    if (!requestIdRef.current[network.id]) {
      requestIdRef.current[network.id] = 0;
    }
    requestIdRef.current[network.id]++;
    const currentRequestId = requestIdRef.current[network.id];

    const task = async () => {
      // Check if this request is still current (prevent stale updates)
      if (currentRequestId !== requestIdRef.current[network.id]) {
        return;
      }

      setLoadingStates(prev => ({ ...prev, [network.id]: true }));

      // Declare all resource pointers to ensure cleanup
      let ethersProvider = null;
      let signer = null;
      let contract = null;

      try {
        // Check again before starting (in case request was superseded)
        if (currentRequestId !== requestIdRef.current[network.id]) {
          return;
        }

        updateStatus(network.id, { type: 'info', message: 'Switching network...' });
        
        // Create provider only when needed
        ethersProvider = new BrowserProvider(walletProvider);
        signer = await ethersProvider.getSigner();

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

        // Check again before proceeding
        if (currentRequestId !== requestIdRef.current[network.id]) {
          return;
        }

        updateStatus(network.id, { type: 'info', message: 'Checking if you can say hello...' });
        
        // Create contract instance with explicit cleanup plan
        contract = new Contract(network.contractAddress, CONTRACT_ABI, signer);
        
        // Remove all listeners to prevent memory leak
        contract.removeAllListeners();

        const canSay = await contract.canSayHello(address);

        if (!canSay) {
          const timeUntil = await contract.timeUntilNextHello(address);
          const hours = Math.floor(Number(timeUntil) / 3600);
          const minutes = Math.floor((Number(timeUntil) % 3600) / 60);
          updateStatus(network.id, {
            type: 'error',
            message: `❌ Already said hello today! Try again in ${hours}h ${minutes}m`,
          });
          setLoadingStates(prev => ({ ...prev, [network.id]: false }));
          return;
        }

        // Check again before transaction
        if (currentRequestId !== requestIdRef.current[network.id]) {
          return;
        }

        updateStatus(network.id, { type: 'info', message: 'Sending transaction...' });
        const tx = await contract.sayHello();

        updateStatus(network.id, { type: 'info', message: 'Confirming transaction...' });
        await tx.wait();

        // Delay for state renewal
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check one final time before getting stats
        if (currentRequestId !== requestIdRef.current[network.id]) {
          return;
        }

        // Recreate contract for final stats call (fresh instance)
        if (contract) {
          contract.removeAllListeners();
          contract = null;
        }
        contract = new Contract(network.contractAddress, CONTRACT_ABI, signer);
        contract.removeAllListeners();

        const stats = await contract.getUserStats(address);
        const streak = Number(stats._currentStreak);
        updateStatus(network.id, {
          type: 'success',
          message: `✅ Hello World! Streak: ${streak} day${streak !== 1 ? 's' : ''}!`,
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
          message: `❌ ${errorMessage}`,
        });
      } finally {
        // EXPLICIT CLEANUP - очень важно!
        try {
          if (contract) {
            contract.removeAllListeners();
            contract = null;
          }
          if (signer) {
            signer = null;
          }
          if (ethersProvider) {
            // BrowserProvider не имеет явного destroy, но обнулим ссылку
            ethersProvider = null;
          }
        } catch (cleanupError) {
          console.error('Cleanup error:', cleanupError);
        }

        setLoadingStates(prev => ({ ...prev, [network.id]: false }));

        // Force garbage collection hint (if available)
        if (global.gc) {
          global.gc();
        }
      }
    };

    // Enqueue task for this network
    enqueue(network.id, task).catch(console.error);
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
              loadingStates={loadingStates}
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
