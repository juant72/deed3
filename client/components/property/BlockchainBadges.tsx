import React from 'react';
import { motion } from 'framer-motion';
import { useBlockchainStatus } from '../../hooks/usePropertyMetrics';

const BlockchainBadges: React.FC<any> = ({ contractAddress, tokenStandard = 'ERC-1155', compact = false }) => {
  const blockchainStatus = useBlockchainStatus(contractAddress);

  const badges = [
    {
      id: 'verified',
      label: 'Verified Contract',
      icon: '✓',
      status: blockchainStatus.isVerified,
      color: 'emerald',
      description: 'Smart contract audited and verified'
    },
    {
      id: 'standard',
      label: tokenStandard,
      icon: '🏷️',
      status: true,
      color: 'blue',
      description: 'Token standard compliance'
    },
    {
      id: 'security',
      label: 'Security+',
      icon: '🛡️',
      status: true,
      color: 'purple',
      description: 'Enhanced security protocols'
    },
    {
      id: 'liquidity',
      label: 'High Liquidity',
      icon: '💧',
      status: true,
      color: 'cyan',
      description: 'Sufficient liquidity pool'
    }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      emerald: isActive 
        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
        : 'bg-slate-700/50 text-slate-500 border-slate-600/30',
      blue: isActive 
        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
        : 'bg-slate-700/50 text-slate-500 border-slate-600/30',
      purple: isActive 
        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
        : 'bg-slate-700/50 text-slate-500 border-slate-600/30',
      cyan: isActive 
        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' 
        : 'bg-slate-700/50 text-slate-500 border-slate-600/30'
    };
    return colors[color];
  };

  if (blockchainStatus.isLoading) {
    return (
      <div className={`flex ${compact ? 'flex-wrap gap-1' : 'flex-wrap gap-2'}`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`${
              compact ? 'h-6 w-12' : 'h-8 w-20'
            } bg-slate-700/50 rounded-full animate-pulse`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex ${compact ? 'flex-wrap gap-1' : 'flex-wrap gap-2'}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          className={`
            ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
            rounded-full border backdrop-blur-sm font-medium
            transition-all duration-300 cursor-help
            ${getColorClasses(badge.color, badge.status)}
          `}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          title={badge.description}
        >
          <div className="flex items-center space-x-1">
            <span>{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Componente para mostrar información detallada del contrato
export const ContractInfo: React.FC<any> = ({ contractAddress, compact = false }) => {
  const blockchainStatus = useBlockchainStatus(contractAddress);

  if (blockchainStatus.isLoading) {
    return (
      <div className="space-y-2">
        <div className="h-4 bg-slate-700 rounded animate-pulse" />
        <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4" />
      </div>
    );
  }

  const contractData = [
    {
      label: 'Contract',
      value: `${contractAddress?.slice(0, 6)}...${contractAddress?.slice(-4)}`,
      icon: '📄'
    },
    {
      label: 'Last Block',
      value: `#${blockchainStatus.lastBlock?.toLocaleString()}`,
      icon: '🔗'
    },
    {
      label: 'Gas Price',
      value: `${blockchainStatus.gasPrice} gwei`,
      icon: '⛽'
    },
    {
      label: 'Transactions',
      value: blockchainStatus.transactionCount?.toLocaleString(),
      icon: '📊'
    }
  ];

  return (
    <motion.div
      className={`bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-lg ${
        compact ? 'p-3' : 'p-4'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className={`text-white font-semibold mb-3 ${compact ? 'text-sm' : 'text-base'}`}>
        🔗 Blockchain Details
      </h4>
      
      <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-2 gap-3'}`}>
        {contractData.map((item, index) => (
          <motion.div
            key={item.label}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={compact ? 'text-sm' : 'text-base'}>{item.icon}</span>
            <div>
              <div className={`text-slate-400 ${compact ? 'text-xs' : 'text-sm'}`}>
                {item.label}
              </div>
              <div className={`text-white font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
                {item.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Network Status Indicator */}
      <motion.div
        className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-2">
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
          <span className={`text-emerald-400 font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
            Network Active
          </span>
        </div>
        
        <button
          className={`text-blue-400 hover:text-blue-300 transition-colors ${
            compact ? 'text-xs' : 'text-sm'
          }`}
          onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
        >
          View on Explorer →
        </button>
      </motion.div>
    </motion.div>
  );
};

// Componente para mostrar estado de verificación simple
export const VerificationBadge: React.FC<any> = ({ isVerified = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]}
        inline-flex items-center justify-center
        rounded-full font-bold
        ${isVerified 
          ? 'bg-emerald-500 text-white' 
          : 'bg-slate-600 text-slate-400'
        }
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      whileHover={{ scale: 1.1 }}
      title={isVerified ? 'Verified Contract' : 'Unverified'}
    >
      {isVerified ? '✓' : '?'}
    </motion.div>
  );
};

export default BlockchainBadges;
