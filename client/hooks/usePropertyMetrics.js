import { useState, useEffect, useMemo } from 'react';

// Hook para métricas de propiedades en tiempo real
export const usePropertyMetrics = (propertyId) => {
  const [metrics, setMetrics] = useState({
    tokenPrice: 0,
    priceChange24h: 0,
    totalValue: 0,
    liquidityPool: 0,
    tradingVolume: 0,
    holders: 0,
    marketCap: 0,
    apy: 0,
    isLoading: true,
    lastUpdate: null
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simular conexión WebSocket para datos en tiempo real
    const connectWebSocket = () => {
      setIsConnected(true);
      
      // Simular datos iniciales
      const initialData = {
        tokenPrice: (Math.random() * 0.01 + 0.001).toFixed(6),
        priceChange24h: (Math.random() * 20 - 10).toFixed(2),
        totalValue: (Math.random() * 1000000 + 500000).toFixed(0),
        liquidityPool: (Math.random() * 50000 + 10000).toFixed(0),
        tradingVolume: (Math.random() * 100000 + 5000).toFixed(0),
        holders: Math.floor(Math.random() * 500 + 100),
        marketCap: (Math.random() * 5000000 + 1000000).toFixed(0),
        apy: (Math.random() * 15 + 5).toFixed(1),
        isLoading: false,
        lastUpdate: new Date()
      };

      setMetrics(initialData);
    };

    // Simular updates en tiempo real cada 3 segundos
    const interval = setInterval(() => {
      if (isConnected) {
        setMetrics(prev => ({
          ...prev,
          tokenPrice: (parseFloat(prev.tokenPrice) * (1 + (Math.random() * 0.02 - 0.01))).toFixed(6),
          priceChange24h: (parseFloat(prev.priceChange24h) + (Math.random() * 0.4 - 0.2)).toFixed(2),
          tradingVolume: (parseFloat(prev.tradingVolume) * (1 + (Math.random() * 0.01 - 0.005))).toFixed(0),
          lastUpdate: new Date()
        }));
      }
    }, 3000);

    // Conectar después de 500ms para simular carga
    const connectTimeout = setTimeout(connectWebSocket, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(connectTimeout);
      setIsConnected(false);
    };
  }, [propertyId]);

  // Métricas calculadas
  const calculatedMetrics = useMemo(() => {
    const roi = ((parseFloat(metrics.tokenPrice) * 1000 - 1000) / 1000 * 100).toFixed(1);
    const momentum = parseFloat(metrics.priceChange24h) > 0 ? 'bullish' : 'bearish';
    const liquidityRatio = (parseFloat(metrics.liquidityPool) / parseFloat(metrics.totalValue) * 100).toFixed(1);
    
    return {
      ...metrics,
      roi,
      momentum,
      liquidityRatio,
      isPositiveChange: parseFloat(metrics.priceChange24h) >= 0
    };
  }, [metrics]);

  return {
    metrics: calculatedMetrics,
    isConnected,
    refreshMetrics: () => setMetrics(prev => ({ ...prev, lastUpdate: new Date() }))
  };
};

// Hook para datos de blockchain en tiempo real
export const useBlockchainStatus = (contractAddress) => {
  const [status, setStatus] = useState({
    isVerified: false,
    lastBlock: 0,
    gasPrice: 0,
    transactionCount: 0,
    isLoading: true
  });

  useEffect(() => {
    const fetchBlockchainData = async () => {
      // Simular fetch de datos blockchain
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStatus({
        isVerified: true,
        lastBlock: Math.floor(Math.random() * 1000000 + 18000000),
        gasPrice: Math.floor(Math.random() * 50 + 20),
        transactionCount: Math.floor(Math.random() * 10000 + 1000),
        isLoading: false
      });
    };

    fetchBlockchainData();
  }, [contractAddress]);

  return status;
};

// Hook para animaciones de performance
export const usePerformanceOptimization = () => {
  const [isHighPerformance, setIsHighPerformance] = useState(true);

  useEffect(() => {
    // Detectar performance del dispositivo
    const checkPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsHighPerformance(false);
        return;
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      
      // Detectar dispositivos móviles o GPUs de bajo rendimiento
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      const isLowEndGPU = /PowerVR|Adreno [1-4]|Mali-[1-4]/i.test(renderer);
      
      setIsHighPerformance(!isMobile && !isLowEndGPU);
    };

    checkPerformance();
  }, []);

  return {
    isHighPerformance,
    animationConfig: isHighPerformance 
      ? { duration: 0.3, ease: "easeOut" }
      : { duration: 0.6, ease: "easeInOut" }
  };
};
