import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SocialAuth from "../components/SocialAuth";
import SiweAuth from "../components/SiweAuth";
import { useAuth } from "../hooks/useAuth";

export default function TestAuth() {
  const { 
    isWalletConnected, 
    isSocialAuthenticated, 
    isFullyAuthenticated,
    getDisplayName,
    getAuthProvider
  } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Deeds3 - Authentication Test
        </h1>
        
        {/* Status Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Wallet Status</h3>
            <p className={`text-lg ${isWalletConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isWalletConnected ? '✅ Connected' : '❌ Disconnected'}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Social Auth</h3>
            <p className={`text-lg ${isSocialAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
              {isSocialAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Combined Status</h3>
            <p className={`text-lg ${isFullyAuthenticated ? 'text-green-600' : 'text-yellow-600'}`}>
              {isFullyAuthenticated ? '✅ Fully Authenticated' : '⚠️ Partial'}
            </p>
            <p className="text-sm text-gray-500">
              Provider: {getAuthProvider()}
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p className="text-gray-700">
            Display Name: <span className="font-medium">{getDisplayName()}</span>
          </p>
        </div>

        {/* Authentication Options */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Authentication Options</h2>
          
          {/* RainbowKit Connect Button */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Wallet Connection</h3>
            <ConnectButton />
          </div>
          
          {/* SIWE Authentication */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">SIWE (Sign-In with Ethereum)</h3>
            <SiweAuth 
              onSuccess={(result) => {
                console.log('SIWE success:', result);
                alert('SIWE authentication successful!');
              }}
              onError={(error) => {
                console.error('SIWE error:', error);
                alert(`SIWE error: ${error.error}`);
              }}
            />
          </div>
          
          {/* Social Authentication Component */}
          <div>
            <h3 className="text-lg font-medium mb-2">Social & Combined Authentication</h3>
            <SocialAuth 
              showWalletConnect={false} // Hide wallet since we show it above
              showSocialOptions={true}
              onAuthSuccess={(result) => {
                console.log('Auth success:', result);
              }}
              onAuthError={(error) => {
                console.error('Auth error:', error);
              }}
            />
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-50 p-4 rounded-lg mt-8">
          <h3 className="text-lg font-medium mb-2">Debug Information</h3>
          <pre className="text-xs text-gray-600 whitespace-pre-wrap">
            {JSON.stringify({
              isWalletConnected,
              isSocialAuthenticated,
              isFullyAuthenticated,
              authProvider: getAuthProvider(),
              displayName: getDisplayName(),
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
