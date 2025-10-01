import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { NETWORKS } from './networks';

// Get your project ID from https://cloud.walletconnect.com
export const projectId = '90f5a0d4425e8c5b3c7f51c08ceba705';

// Configure chains for Web3Modal
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
    url: 'https://hell0w0rld.vercel.app/', // Update with your domain
    icons: ['https://your-domain.vercel.app/icon.png']
  }
});

// Initialize Web3Modal
export const initWeb3Modal = () => {
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
};