import React from 'react';

const Docs = () => {
  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>📚 Documentation</h1>
        <p>Contract addresses, ABI, and technical information</p>
      </div>

      <div className="docs-section">
        <h2>🔗 Deployed Contracts</h2>
        <p>Hello World contracts are deployed on the following networks:</p>

        <div className="contracts-table">
          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge sepolia">SEP</div>
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
                YOUR_SEPOLIA_ADDRESS
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>

          <div className="contract-row">
            <div className="contract-network">
              <div className="network-badge base">BASE</div>
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
                YOUR_BASE_SEPOLIA_ADDRESS
                <span className="external-icon">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>📝 Contract ABI</h2>
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
        <h2>⚙️ How It Works</h2>
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
              <h3>Say Hello World</h3>
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
        <h2>🔒 Security</h2>
        <ul className="security-list">
          <li>✅ All contracts are verified on block explorers</li>
          <li>✅ Built with Solidity 0.8.30+ (built-in overflow protection)</li>
          <li>✅ No admin functions or upgrade mechanisms</li>
          <li>✅ Fully decentralized and immutable</li>
          <li>✅ Gas-optimized for cost-effective interactions</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>🛠️ Integration Example</h2>
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
        <h2>❓ FAQ</h2>
        <div className="faq">
          <div className="faq-item">
            <h3>How often can I say hello?</h3>
            <p>You can say hello once per day (resets at 00:00 UTC)</p>
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