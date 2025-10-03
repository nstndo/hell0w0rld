import React from 'react';

const NetworkCard = ({ network, isConnected, onExecuteHello, status }) => {
  return (
    <div className="network-card">
      <div className="network-header">
        <div className="network-icon">{network.icon}</div>
        <div className="network-info">
          <h3>{network.name}</h3>
          <div className="chain-id">Chain ID: {network.chainId}</div>
        </div>
      </div>
      <button
        className="gm-button"
        disabled={!isConnected}
        onClick={() => onExecuteHello(network)}
      >
        {isConnected ? 'Hello World!' : 'Connect Wallet First'}
      </button>
      {status && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default NetworkCard;