import React from 'react';
import { motion } from 'framer-motion';
import { usePropertyMetrics } from '../../hooks/usePropertyMetrics';

const RealTimeMetrics = ({ propertyId, compact = false }) => {
  const { metrics, isConnected } = usePropertyMetrics(propertyId);

  const MetricCard = ({ icon, label, value, change, suffix = '', isPositive = null }) => (
    <motion.div
      className={`${compact ? 'p-2' : 'p-3'} bg-slate-800/50 backdrop-blur-sm rounded-lg border border-white/10`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{icon}</span>
          <div>
            <div className={`font-medium text-white ${compact ? 'text-xs' : 'text-sm'}`}>
              {label}
            </div>
            <div className={`font-bold ${compact ? 'text-sm' : 'text-lg'} text-white`}>
              {value}{suffix}
            </div>
          </div>
        </div>
        
        {change && (
          <motion.div
            className={`text-xs px-2 py-1 rounded-full ${
              isPositive 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/20 text-red-400'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isPositive ? '+' : ''}{change}%
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const PulsingDot = () => (
    <motion.div
      className="w-2 h-2 bg-emerald-400 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  if (metrics.isLoading) {
    return (
      <div className={`space-y-3 ${compact ? 'p-2' : 'p-4'}`}>
        <div className="flex items-center space-x-2 text-slate-400">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading real-time data...</span>
        </div>
        {[...Array(compact ? 2 : 4)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-800/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`space-y-3 ${compact ? 'p-2' : 'p-4'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <PulsingDot />
          <span className="text-sm text-emerald-400 font-medium">
            Live Data {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        {metrics.lastUpdate && (
          <span className="text-xs text-slate-400">
            Updated {Math.floor((new Date() - metrics.lastUpdate) / 1000)}s ago
          </span>
        )}
      </div>

      {/* Main Metrics Grid */}
      <div className={`grid ${compact ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'}`}>
        <MetricCard
          icon="💰"
          label="Token Price"
          value={`$${metrics.tokenPrice}`}
          change={metrics.priceChange24h}
          isPositive={metrics.isPositiveChange}
        />
        
        <MetricCard
          icon="📈"
          label="Market Cap"
          value={`$${(metrics.marketCap / 1000000).toFixed(1)}`}
          suffix="M"
        />

        {!compact && (
          <>
            <MetricCard
              icon="💧"
              label="Liquidity"
              value={`$${(metrics.liquidityPool / 1000).toFixed(0)}`}
              suffix="K"
            />
            
            <MetricCard
              icon="📊"
              label="24h Volume"
              value={`$${(metrics.tradingVolume / 1000).toFixed(0)}`}
              suffix="K"
            />
          </>
        )}
      </div>

      {/* ROI and Performance */}
      {!compact && (
        <motion.div
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-white font-semibold">Investment Performance</h4>
            <span className={`text-sm px-2 py-1 rounded-full ${
              metrics.momentum === 'bullish' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {metrics.momentum === 'bullish' ? '🐂' : '🐻'} {metrics.momentum}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{metrics.apy}%</div>
              <div className="text-xs text-slate-400">APY</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{metrics.roi}%</div>
              <div className="text-xs text-slate-400">ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{metrics.holders}</div>
              <div className="text-xs text-slate-400">Holders</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Progress Bar for Liquidity */}
      <motion.div
        className="bg-slate-800/50 rounded-lg p-3"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-300">Liquidity Ratio</span>
          <span className="text-sm font-bold text-white">{metrics.liquidityRatio}%</span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${metrics.liquidityRatio}%` }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Componente para mostrar métricas en forma de badges/chips
export const MetricsBadges = ({ propertyId }) => {
  const { metrics } = usePropertyMetrics(propertyId);

  if (metrics.isLoading) {
    return (
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-16 bg-slate-700 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <motion.span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          metrics.isPositiveChange
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-red-500/20 text-red-400'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        {metrics.isPositiveChange ? '+' : ''}{metrics.priceChange24h}%
      </motion.span>
      
      <motion.span
        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        APY {metrics.apy}%
      </motion.span>
      
      <motion.span
        className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {metrics.holders} holders
      </motion.span>
    </div>
  );
};

export default RealTimeMetrics;
