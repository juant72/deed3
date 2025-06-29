import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdvancedWalletConnect = React.memo(({ onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const supportedNetworks = useMemo(() => [
    { 
      id: 137, 
      name: 'Polygon', 
      icon: '🟣', 
      gasSymbol: 'MATIC',
      avgGas: '0.001',
      features: ['Low Fees', 'Fast Transactions', 'Eco-Friendly']
    },
    { 
      id: 1, 
      name: 'Ethereum', 
      icon: '⟠', 
      gasSymbol: 'ETH',
      avgGas: '0.005',
      features: ['Most Secure', 'Largest Ecosystem', 'DeFi Hub']
    },
    { 
      id: 56, 
      name: 'BSC', 
      icon: '🟡', 
      gasSymbol: 'BNB',
      avgGas: '0.002',
      features: ['Low Fees', 'Fast', 'Wide Adoption']
    }
  ], []);

  const walletOptions = useMemo(() => [
    { 
      name: 'MetaMask', 
      icon: '🦊', 
      description: 'Most popular Web3 wallet',
      features: ['Browser Extension', 'Mobile App', 'Hardware Support']
    },
    { 
      name: 'WalletConnect', 
      icon: '🔗', 
      description: 'Connect any mobile wallet',
      features: ['Mobile First', '300+ Wallets', 'QR Code']
    },
    { 
      name: 'Coinbase Wallet', 
      icon: '🔵', 
      description: 'User-friendly and secure',
      features: ['Easy Onboarding', 'DApp Browser', 'Recovery']
    }
  ], []);

  const handleConnect = useCallback(async (walletName) => {
    setIsConnecting(true);
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowModal(false);
      onClose?.();
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [onClose]);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    onClose?.();
  }, [onClose]);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
      >
        <span>Connect Wallet</span>
        <span className="text-lg">🔗</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl p-8 max-w-lg w-full border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {walletOptions.map((wallet, index) => (
                  <motion.button
                    key={wallet.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleConnect(wallet.name)}
                    disabled={isConnecting}
                    className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{wallet.icon}</div>
                      <div className="flex-1 text-left">
                        <h3 className="text-white font-semibold">{wallet.name}</h3>
                        <p className="text-gray-400 text-sm">{wallet.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {wallet.features.map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      {isConnecting && (
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-white/10">
                <h4 className="text-white font-semibold mb-3">Supported Networks</h4>
                <div className="grid grid-cols-3 gap-3">
                  {supportedNetworks.map((network, index) => (
                    <div key={network.id} className="text-center">
                      <div className="text-2xl mb-1">{network.icon}</div>
                      <div className="text-white text-sm font-medium">{network.name}</div>
                      <div className="text-gray-400 text-xs">{network.avgGas} {network.gasSymbol}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>By connecting, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

AdvancedWalletConnect.displayName = 'AdvancedWalletConnect';

export default AdvancedWalletConnect;
