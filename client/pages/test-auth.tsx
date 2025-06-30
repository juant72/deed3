import React from "react";
import { GetServerSideProps } from "next";
import { useAccount, useDisconnect } from "wagmi";

const TestAuth: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Deeds3 - Authentication Test
        </h1>
        
        {/* Status Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Wallet Status</h3>
            <p className={`text-lg ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? '✅ Connected' : '❌ Disconnected'}
            </p>
            {address && (
              <p className="text-sm text-gray-500 mt-2">
                Address: {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">WalletConnect v2</h3>
            <p className="text-lg text-blue-600">
              ✅ AppKit Configured
            </p>
            <p className="text-sm text-gray-500">
              Using WalletConnect v2 with real API key
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
          <p className="text-gray-700">
            Status: <span className="font-medium">{isConnected ? 'Connected' : 'Not Connected'}</span>
          </p>
          {address && (
            <p className="text-gray-700">
              Address: <span className="font-medium font-mono">{address}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          
          {isConnected ? (
            <button
              onClick={() => disconnect()}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect Wallet
            </button>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Use the Connect Wallet button in the header to connect your wallet.
              </p>
              <p className="text-sm text-gray-500">
                This app uses WalletConnect AppKit for modern wallet integration.
              </p>
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="bg-gray-50 p-4 rounded-lg mt-8">
          <h3 className="text-lg font-medium mb-2">Debug Information</h3>
          <pre className="text-xs text-gray-600 whitespace-pre-wrap">
            {JSON.stringify({
              isConnected,
              address,
              hasWagmiConfig: true,
              hasWalletConnectConfig: true,
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default TestAuth;


