import React from 'react';

const NetworkTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="network-tabs">
      <button 
        className={`tab ${activeTab === 'mainnet' ? 'active' : ''}`}
        onClick={() => onTabChange('mainnet')}
      >
        MAINNET
      </button>
      <button 
        className={`tab ${activeTab === 'testnet' ? 'active' : ''}`}
        onClick={() => onTabChange('testnet')}
      >
        TESTNET
      </button>
    </div>
  );
};

export default NetworkTabs;