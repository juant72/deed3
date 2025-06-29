import React from "react";
import { motion } from "framer-motion";

// Create a simple, stable tokenomics component without charts to avoid the infinite loop
const TokenomicsSection = React.memo(() => {
  const [activeTab, setActiveTab] = useState("overview");

  // Memoize data to prevent re-renders
  const tokenMetrics = useMemo(() => [
    { label: "Total Supply", value: "1,000,000,000 DEED", icon: "💎" },
    { label: "Circulating Supply", value: "450,000,000 DEED", icon: "🔄" },
    { label: "Market Cap", value: "$89.5M", icon: "📈" },
    { label: "Total Value Locked", value: "$234.8M", icon: "🔒" }
  ], []);

  const stakingOptions = useMemo(() => [
    { period: '30 Days', apy: '8.5%', locked: '$2.4M' },
    { period: '90 Days', apy: '12.3%', locked: '$5.8M' },
    { period: '180 Days', apy: '18.7%', locked: '$12.1M' },
    { period: '365 Days', apy: '25.2%', locked: '$18.9M' }
  ], []);

  const deFiFeatures = useMemo(() => [
    {
      title: "Liquidity Staking",
      description: "Earn rewards by providing liquidity to property token pools",
      apy: "15.6%",
      icon: "💧",
      totalLocked: "$45.2M"
    },
    {
      title: "Governance Voting",
      description: "Vote on property acquisitions and platform improvements", 
      apy: "8.3%",
      icon: "🗳️",
      totalLocked: "$12.8M"
    },
    {
      title: "Yield Farming",
      description: "Farm DEED tokens by staking LP tokens from property pools",
      apy: "22.4%",
      icon: "🌾",
      totalLocked: "$67.1M"
    },
    {
      title: "Real Estate Bonds",
      description: "Fixed-yield bonds backed by property rental income",
      apy: "12.8%",
      icon: "📊",
      totalLocked: "$89.3M"
    }
  ], []);

  const tokenDistribution = useMemo(() => [
    { name: 'Property Tokens', value: '40%', color: 'bg-blue-500' },
    { name: 'Staking Rewards', value: '25%', color: 'bg-emerald-500' },
    { name: 'Development', value: '15%', color: 'bg-purple-500' },
    { name: 'Team & Advisors', value: '10%', color: 'bg-amber-500' },
    { name: 'Marketing', value: '10%', color: 'bg-red-500' }
  ], []);

  // Memoize the tab change handler
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DeFi <span className="text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">Tokenomics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing real estate investment through advanced DeFi mechanisms and sustainable tokenomics
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
            {["overview", "staking", "defi"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Token Metrics */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Token Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tokenMetrics.map((metric, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{metric.icon}</span>
                      <div>
                        <div className="text-gray-400 text-sm">{metric.label}</div>
                        <div className="text-white font-bold text-lg">{metric.value}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Token Distribution */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Token Distribution</h3>
              <div className="space-y-4">
                {tokenDistribution.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Visual Distribution Bar */}
              <div className="mt-8">
                <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden flex">
                  <div className="w-[40%] bg-blue-500"></div>
                  <div className="w-[25%] bg-emerald-500"></div>
                  <div className="w-[15%] bg-purple-500"></div>
                  <div className="w-[10%] bg-amber-500"></div>
                  <div className="w-[10%] bg-red-500"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Staking Tab */}
        {activeTab === "staking" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Staking Rewards</h3>
              <p className="text-gray-300 text-lg">Lock your DEED tokens and earn attractive yields</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stakingOptions.map((option, i) => (
                <motion.div
                  key={i}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-center">
                    <div className="text-emerald-400 text-3xl font-bold mb-2">{option.apy}</div>
                    <div className="text-white font-semibold mb-1">{option.period}</div>
                    <div className="text-gray-400 text-sm mb-4">APY</div>
                    <div className="text-gray-300 text-sm">Total Locked: {option.locked}</div>
                    <button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200">
                      Stake Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 inline-block">
                <h4 className="text-xl font-bold text-white mb-4">Your Staking Stats</h4>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">0 DEED</div>
                    <div className="text-gray-400 text-sm">Staked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">0 DEED</div>
                    <div className="text-gray-400 text-sm">Rewards</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">0%</div>
                    <div className="text-gray-400 text-sm">Your APY</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* DeFi Tab */}
        {activeTab === "defi" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">DeFi Ecosystem</h3>
              <p className="text-gray-300 text-lg">Advanced financial instruments for real estate investment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {deFiFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-emerald-400 font-bold text-lg">{feature.apy}</div>
                          <div className="text-gray-400 text-sm">Current APY</div>
                        </div>
                        <div>
                          <div className="text-blue-400 font-bold text-lg">{feature.totalLocked}</div>
                          <div className="text-gray-400 text-sm">TVL</div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200">
                        Participate
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
});

TokenomicsSection.displayName = 'TokenomicsSection';

export default TokenomicsSection;
