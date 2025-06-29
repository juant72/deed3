import { useMemo } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';

export const useWeb3Status = () => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  const status = useMemo(() => {
    if (isConnecting || isReconnecting) return 'connecting';
    if (isConnected && address) return 'connected';
    return 'disconnected';
  }, [isConnecting, isReconnecting, isConnected, address]);

  const networkInfo = useMemo(() => {
    const networks = {
      1: { name: 'Ethereum', color: '#627eea' },
      137: { name: 'Polygon', color: '#8247e5' },
      42161: { name: 'Arbitrum', color: '#28a0f0' },
      8453: { name: 'Base', color: '#0052ff' }
    };
    
    return networks[chainId] || { name: 'Unknown', color: '#gray' };
  }, [chainId]);

  const formattedBalance = useMemo(() => {
    if (!balance) return '0';
    return parseFloat(balance.formatted).toFixed(4);
  }, [balance]);

  return {
    address,
    isConnected,
    status,
    chainId,
    network: networkInfo,
    balance: formattedBalance,
    symbol: balance?.symbol || 'ETH'
  };
};
