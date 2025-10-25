import React, { useEffect } from 'react';

const Docs = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>Documentation</h1>
        <p>Contract addresses, ABI, and technical information</p>
      </div>

      <div className="docs-section">

        <h2>Deployed Contracts</h2>
        <p>Hello World contracts are deployed on the following networks:</p>

        <div className="contracts-table">
          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/BASE.svg" alt="Base" className="badge-logo" />
              </div>
              <div>
                <h3>Base</h3>
                <p className="chain-id">Chain ID: 8453</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://basescan.org/address/0xefbc854f51cbb80ccbe12c69da179d6901978f6c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                BASE_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/OP.svg" alt="Optimism" className="badge-logo" />
              </div>
              <div>
                <h3>Optimism</h3>
                <p className="chain-id">Chain ID: 10</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://explorer.optimism.io/address/0xC1225a891ecCEAF5e0899e9656FaeE10D0f62eF7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                OPTIMISM_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/UNI.svg" alt="Unichain" className="badge-logo" />
              </div>
              <div>
                <h3>Unichain</h3>
                <p className="chain-id">Chain ID: 130</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://uniscan.xyz/address/0xa7877cdf570bebdf949cd9ec1147cf5c3241a380" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                UNICHAIN_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/CELO.svg" alt="Celo" className="badge-logo" />
              </div>
              <div>
                <h3>Celo</h3>
                <p className="chain-id">Chain ID: 42220</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://celoscan.io/address/0xb2bcf4f2fed7f933255a604f36e5a713dd30425e" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                CELO_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/INK.svg" alt="Inkchain" className="badge-logo" />
              </div>
              <div>
                <h3>Ink</h3>
                <p className="chain-id">Chain ID: 57073</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://explorer.inkonchain.com/address/0x2b426387571C3e31b3C9A3C5A91dbeF5CEa64143" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                INKCHAIN_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/WORLD.svg" alt="World Chain" className="badge-logo" />
              </div>
              <div>
                <h3>World Chain</h3>
                <p className="chain-id">Chain ID: 480</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://worldscan.org/address/0x55c7d6ce1d1f55d332b225002d71933c8ab18772" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                WORLD_CHAIN_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/LISK.svg" alt="Lisk" className="badge-logo" />
              </div>
              <div>
                <h3>Lisk</h3>
                <p className="chain-id">Chain ID: 1135</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://blockscout.lisk.com/address/0x551872486F03DD194c40c2249a79f080c1e7Cd13" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                LISK_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/LINEA.svg" alt="Linea" className="badge-logo" />
              </div>
              <div>
                <h3>Linea</h3>
                <p className="chain-id">Chain ID: 59144</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://lineascan.build/address/0xda634574ea8b5ae57d3baf4744c50b78653aaf25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                LINEA_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/ARB.svg" alt="Arbitrum" className="badge-logo" />
              </div>
              <div>
                <h3>Arbitrum</h3>
                <p className="chain-id">Chain ID: 42161</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://arbiscan.io/address/0x4b1b3c8A09B82aDbC93d8f3897B384b5f55A2B7a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                ARBITRUM_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/PLUME.svg" alt="Plume" className="badge-logo" />
              </div>
              <div>
                <h3>Plume</h3>
                <p className="chain-id">Chain ID: 98866</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://explorer.plume.org/address/0x4A6814b1E0c0EE505665E819a4317cc12C72DeBF" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                PLUME_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/HYPE.svg" alt="HyperEVM" className="badge-logo" />
              </div>
              <div>
                <h3>HyperEVM</h3>
                <p className="chain-id">Chain ID: 999</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://www.hyperscan.com/address/0x790b0C531889e8B5E8dAE48914CB33fc90b7E3a6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                HYPEREVM_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/SONEIUM.svg" alt="Soneium" className="badge-logo" />
              </div>
              <div>
                <h3>SONEIUM</h3>
                <p className="chain-id">Chain ID: 1868</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://soneium.blockscout.com/address/0x6732D612b2e9DeEb3DA2BB1221fBe6d2428175E1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                SONEIUM_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/KAT.svg" alt="Katana" className="badge-logo" />
              </div>
              <div>
                <h3>KATANA</h3>
                <p className="chain-id">Chain ID: 747474</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://explorer.katanarpc.com/address/0x200A33143a4867c292fc8686E0B44dBe30Da6E5d" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                KATANA_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/LENS.svg" alt="Lens Chain" className="badge-logo" />
              </div>
              <div>
                <h3>Lens Chain</h3>
                <p className="chain-id">Chain ID: 232</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://explorer.lens.xyz/address/0xC383EA1256c8E04b3973B872d469888D47B19c34" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                LENS_CHAIN_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/ZORA.svg" alt="Zora" className="badge-logo" />
              </div>
              <div>
                <h3>Zora</h3>
                <p className="chain-id">Chain ID: 7777777</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://zorascan.xyz/address/0x6eF5A563e26a7C898014C15ad866e75014E3A8BE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                ZORA_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/XPL.svg" alt="Plasma" className="badge-logo" />
              </div>
              <div>
                <h3>XPL</h3>
                <p className="chain-id">Chain ID: 9745</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://plasmascan.to/address/0xa68C670133b7b8178ec43Eb01d93be6E5C3B65A8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                PLASMA_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge">
                <img src="/images/networks/0G.svg" alt="0G" className="badge-logo" />
              </div>
              <div>
                <h3>0G</h3>
                <p className="chain-id">Chain ID: 16661</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://chainscan.0g.ai/address/0xd71cae47f4b4c800e82d9613bce0f1e40ae4932e" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                0G_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>
     
      </div>    
      <div className="docs-section"></div>
        <h2>Deployed Testnet Contracts</h2>
        <p>Hello World contracts are deployed on the following testnets networks:</p>

        <div className="contracts-table">
          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/ETH.svg" alt="Ethereum Sepolia" className="badge-logo" />
              </div>
              <div>
                <h3>Sepolia Testnet</h3>
                <p className="chain-id">Chain ID: 11155111</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://sepolia.etherscan.io/address/0x22763E02342c2959859Afe7FF5c2a58Bb39F1D5C" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                SEPOLIA_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/BASE.svg" alt="Base Sepolia" className="badge-logo" />
              </div>
              <div>
                <h3>Base Sepolia Testnet</h3>
                <p className="chain-id">Chain ID: 84532</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://sepolia.basescan.org/address/0x9f27110Ec3b411B44Ec1c7AB9c964cB5eC8d33d2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                BASE_SEPOLIA_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/OP.svg" alt="Optimism Sepolia" className="badge-logo" />
              </div>
              <div>
                <h3>Optimism Sepolia Testnet</h3>
                <p className="chain-id">Chain ID: 11155420</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://sepolia-optimism.etherscan.io/address/0x3c071d17561dc12437844575fa2426f8f28173c1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                OPTIMISM_SEPOLIA_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/MON.svg" alt="Monad Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Monad Testnet</h3>
                <p className="chain-id">Chain ID: 10143</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://testnet.monadscan.com/address/0xc5464a200d5fe26b9eb78a22e0d3df8df1971beb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                MONAD_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/PHRS.svg" alt="Pharos Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Pharos Testnet</h3>
                <p className="chain-id">Chain ID: 688688</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://pharos-testnet.socialscan.io/address/0xa1087a758742c8207eb547fbc4a5b06d30a8526a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                PHAROS_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/PHRS.svg" alt="Pharos Atlantic Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Pharos Atlantic Testnet</h3>
                <p className="chain-id">Chain ID: 688689</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://atlantic.pharosscan.xyz/address/0x00bf43d03867434636c2397ada3d3f6d01f9d53b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                PHAROS_ATLANTIC_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/RISE.svg" alt="Rise Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Rise Testnet</h3>
                <p className="chain-id">Chain ID: 11155931</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://explorer.testnet.riselabs.xyz/address/0x370f35A28797A17603E0fbD5df6010272b1006FE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                RISE_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/MEGA.svg" alt="Megaeth Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Megaeth Testnet</h3>
                <p className="chain-id">Chain ID: 6342</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://web3.okx.com/ru/explorer/megaeth-testnet/address/0xc87347a4e46ad9d0809df41db6802809d7086b2e" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                MEGAETH_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/ANKR.svg" alt="Neura Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Neura Testnet</h3>
                <p className="chain-id">Chain ID: 267</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://testnet-blockscout.infra.neuraprotocol.io/address/0xD71caE47F4B4C800E82d9613BCe0f1E40Ae4932e" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                NEURA_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/HAUST.svg" alt="Haust Network Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Haust Network Testnet</h3>
                <p className="chain-id">Chain ID: 1523903251</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://explorer-testnet.haust.app/address/0x3480fF98c739cFA0015C5f02fbe37C7C92E04D10" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                HAUST_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">
                <img src="/images/networks/JOVAY.svg" alt="Jovay Testnet" className="badge-logo" />
              </div>
              <div>
                <h3>Jovay Testnet</h3>
                <p className="chain-id">Chain ID: 2019775</p>
              </div>
            </div>
            <div className="contract-address-block">
              <a 
                href="https://sepolia-explorer.jovay.io/l2/address/0xd0c205e3c704595113fb8006379edd1bc89b2a17" 
                target="_blank" 
                rel="noopener noreferrer"
                className="address-link"
              >
                JOVAY_TESTNET_CONTRACT
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="docs-section">
        <h2>Contract ABI</h2>
        <p>Use this ABI to interact with the contract programmatically:</p>
        <pre className="code-block">
{`[
  "function sayHello() external",
  "function canSayHello(address user) external view returns (bool)",
  "function lastHello(address) external view returns (uint256)",
  "function totalHellos(address) external view returns (uint256)",
  "function currentStreak(address) external view returns (uint256)",
  "function getUserStats(address user) external view returns (
    uint256 _lastHello,
    uint256 _totalHellos,
    uint256 _currentStreak,
    bool _canSayHello
  )",
  "function timeUntilNextHello(address user) external view returns (uint256)"
]`}
        </pre>
      </div>

      <div className="docs-section">
        <h2>How It Works</h2>
        <div className="how-it-works">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Connect Wallet</h3>
              <p>Connect your Web3 wallet using WalletConnect or MetaMask</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Say Hello</h3>
              <p>Click "Hello World!" once per day on any supported network</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Build Streak</h3>
              <p>Check in daily to build your streak and track your progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>Security</h2>
        <ul className="security-list">
          <li>- All contracts are verified on block explorers</li>
          <li>- Built with Solidity 0.8.20+ (built-in overflow protection)</li>
          <li>- No admin functions or upgrade mechanisms</li>
          <li>- Fully decentralized and immutable</li>
          <li>- Gas-optimized for cost-effective interactions</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Integration Example</h2>
        <p>Example code for integrating Hello World into your dApp:</p>
        <pre className="code-block">
{`import { ethers } from 'ethers';

const contractAddress = '0x...';
const abi = [...]; // ABI from above

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

// Check if user can say hello
const canSay = await contract.canSayHello(userAddress);

// Say hello 
if (canSay) {
  const tx = await contract.sayHello();
  await tx.wait();
  console.log('Hello sent!');
}

// Get user stats
const stats = await contract.getUserStats(userAddress);
console.log('Streak:', stats._currentStreak);`}
        </pre>
      </div>

      <div className="docs-section">
        <h2>FAQ</h2>
        <div className="faq">
          <div className="faq-item">
            <h3>How often can I say hello?</h3>
            <p>You can say hello once per day (resets at 00:00 UTC / 03:00 Moscow time)</p>
          </div>
          <div className="faq-item">
            <h3>What happens if I miss a day?</h3>
            <p>Your streak will reset to 1 when you check in again</p>
          </div>
          <div className="faq-item">
            <h3>Is there a cost?</h3>
            <p>Only network gas fees apply. The contract itself is free to use</p>
          </div>
          <div className="faq-item">
            <h3>Can I use multiple networks?</h3>
            <p>Yes! Each network has its own contract and independent streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;