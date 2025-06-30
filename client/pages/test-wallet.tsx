import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../components/layout";
import { useStateContext } from "../context";

const TestWalletConnection: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connectWallet, currentAccount, userBlance } = useStateContext();

  const [testResult, setTestResult] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResult(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testWagmiConnection = async () => {
    try {
      addResult("Testing Wagmi connection...");
      addResult(`Wagmi connected: ${isConnected}`);
      addResult(`Wagmi address: ${address || 'Not connected'}`);
      addResult("✅ Wagmi test completed");
    } catch (error) {
      addResult(`❌ Wagmi error: ${error}`);
    }
  };

  const testContextConnection = async () => {
    try {
      addResult("Testing Context connection...");
      if (connectWallet) {
        await connectWallet();
        addResult("Context connect function called successfully");
        addResult(`Context account: ${currentAccount || 'Not connected'}`);
        addResult(`Context balance: ${userBlance || 'Not available'}`);
      } else {
        addResult("Connect wallet function not available");
      }
      addResult("✅ Context test completed");
    } catch (error) {
      addResult(`❌ Context error: ${error}`);
    }
  };

  const clearResults = () => {
    setTestResult([]);
  };

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />

      <div className="rn-author-bg-area bg_image--9 bg_image ptb--150">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2 className="title">Wallet Connection Test</h2>
                <p className="description">
                  Test page to verify Web3 functionality after TypeScript migration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rn-author-area rn-section-gapTop">
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-6">
              <div className="wallet-test-section">
                <h3>Connection Status</h3>
                <div className="connection-info">
                  <p><strong>Wagmi Connected:</strong> {isConnected ? '✅ Yes' : '❌ No'}</p>
                  <p><strong>Wagmi Address:</strong> {address || 'Not connected'}</p>
                  <p><strong>Context Account:</strong> {currentAccount || 'Not connected'}</p>
                  <p><strong>Context Balance:</strong> {userBlance || 'Not available'}</p>
                </div>

                <div className="wallet-buttons mt-4">
                  <h4>RainbowKit Connect Button:</h4>
                  <ConnectButton />

                  <div className="mt-3">
                    <h4>Manual Connection Tests:</h4>
                    <button
                      className="btn btn-primary mr-3 mb-2"
                      onClick={testWagmiConnection}
                    >
                      Test Wagmi
                    </button>
                    <button
                      className="btn btn-secondary mr-3 mb-2"
                      onClick={testContextConnection}
                    >
                      Test Context
                    </button>
                    <button
                      className="btn btn-danger mb-2"
                      onClick={clearResults}
                    >
                      Clear Results
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="test-results">
                <h3>Test Results</h3>
                <div
                  className="results-log bg-light p-3 rounded"
                  style={{ height: '400px', overflowY: 'auto', fontFamily: 'monospace' }}
                >
                  {testResult.length === 0 ? (
                    <p className="text-muted">No tests run yet. Click the test buttons to start.</p>
                  ) : (
                    testResult.map((result, index) => (
                      <div key={index} className="mb-1">
                        {result}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Copyright />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default TestWalletConnection;
