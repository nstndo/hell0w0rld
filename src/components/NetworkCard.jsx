import React from 'react';

const NetworkCard = ({ network, isConnected, onExecuteHello, status, isLoading }) => {
  return (
    <div className="network-card">
      <div className="network-header">
        <div className="network-icon">
          {network.logo ? (
            <img src={network.logo} alt={network.name} className="network-logo" />
          ) : (
            network.icon
          )}
        </div>
        <div className="network-info">
          <h3>{network.name}</h3>
          <div className="chain-id">Chain ID: {network.chainId}</div>
        </div>
      </div>
      <button
        className="gm-button"
        disabled={!isConnected || isLoading}
        onClick={() => onExecuteHello(network)}
      >
        {isLoading ? (
          <>
            Processing...
            <span className="button-spinner" />
          </>
        ) : isConnected ? (
          'Hello World!'
        ) : (
          'Connect Wallet First'
        )}
      </button>
      {status && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
      
      {/* Inline styles for spinner animation */}
      <style jsx>{`
        .button-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-left: 8px;
          vertical-align: middle;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .gm-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default NetworkCard;
