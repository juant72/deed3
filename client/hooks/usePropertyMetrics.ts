import { useState, useEffect, useMemo, useCallback } from 'react';

interface PropertyMetrics {
  tokenPrice: number;
  priceChange24h: number;
  totalValue: number;
  liquidityPool: number;
  tradingVolume: number;
  holders: number;
  marketCap: number;
  apy: number;
  isLoading: boolean;
  lastUpdate: Date | null;
}

interface Property {
  id: string;
  title: string;
  type: string;
  status: string;
  price: string;
  location: string;
  views: number;
  likes: number;
  image: string;
}

// Hook para métricas de propiedades en tiempo real
export const usePropertyMetrics = (propertyId?: string) => {
  const [metrics, setMetrics] = useState<PropertyMetrics>({
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

  // Analyze property data and calculate metrics
  const getTotalViews = useCallback((properties: Property[]): number => {
    return properties.reduce((total, property) => total + property.views, 0);
  }, []);

  const getTotalLikes = useCallback((properties: Property[]): number => {
    return properties.reduce((total, property) => total + property.likes, 0);
  }, []);

  const getAveragePrice = useCallback((properties: Property[]): string => {
    if (properties.length === 0) return '$0';
    
    const totalPrice = properties.reduce((total, property) => {
      // Remove $ and comma and parse as float
      const price = parseFloat(property.price.replace('$', '').replace(/,/g, ''));
      return total + price;
    }, 0);
    
    const avgPrice = totalPrice / properties.length;
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(avgPrice);
  }, []);

  const getEngagementRate = useCallback((properties: Property[]): string => {
    if (properties.length === 0) return '0%';
    
    const totalViews = getTotalViews(properties);
    const totalLikes = getTotalLikes(properties);
    
    if (totalViews === 0) return '0%';
    
    const engagementRate = (totalLikes / totalViews) * 100;
    return `${engagementRate.toFixed(1)}%`;
  }, [getTotalViews, getTotalLikes]);

  const getTopPerformingProperty = useCallback((properties: Property[]): Property | null => {
    if (properties.length === 0) return null;
    
    return properties.reduce((top, property) => {
      return property.views > top.views ? property : top;
    }, properties[0]);
  }, []);

  const getPropertiesByType = useCallback((properties: Property[]): Record<string, number> => {
    return properties.reduce((types, property) => {
      types[property.type] = (types[property.type] || 0) + 1;
      return types;
    }, {} as Record<string, number>);
  }, []);

  const getPropertiesByStatus = useCallback((properties: Property[]): Record<string, number> => {
    return properties.reduce((statuses, property) => {
      statuses[property.status] = (statuses[property.status] || 0) + 1;
      return statuses;
    }, {} as Record<string, number>);
  }, []);

  useEffect(() => {
    // Simular conexión WebSocket para datos en tiempo real
    const connectWebSocket = () => {
      setIsConnected(true);
      
      // Simular datos iniciales
      const initialData: PropertyMetrics = {
        tokenPrice: parseFloat((Math.random() * 0.01 + 0.001).toFixed(6)),
        priceChange24h: parseFloat((Math.random() * 20 - 10).toFixed(2)),
        totalValue: parseFloat((Math.random() * 1000000 + 500000).toFixed(0)),
        liquidityPool: parseFloat((Math.random() * 50000 + 10000).toFixed(0)),
        tradingVolume: parseFloat((Math.random() * 100000 + 5000).toFixed(0)),
        holders: Math.floor(Math.random() * 500 + 100),
        marketCap: parseFloat((Math.random() * 5000000 + 1000000).toFixed(0)),
        apy: parseFloat((Math.random() * 15 + 5).toFixed(1)),
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
          tokenPrice: parseFloat((prev.tokenPrice * (1 + (Math.random() * 0.02 - 0.01))).toFixed(6)),
          priceChange24h: parseFloat((prev.priceChange24h + (Math.random() * 0.4 - 0.2)).toFixed(2)),
          tradingVolume: parseFloat((prev.tradingVolume * (1 + (Math.random() * 0.01 - 0.005))).toFixed(0)),
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
    const roi = ((metrics.tokenPrice * 1000 - 1000) / 1000 * 100).toFixed(1);
    const momentum = metrics.priceChange24h > 0 ? 'bullish' : 'bearish';
    const liquidityRatio = (metrics.liquidityPool / metrics.totalValue * 100).toFixed(1);
    
    return {
      ...metrics,
      roi,
      momentum,
      liquidityRatio,
      isPositiveChange: metrics.priceChange24h >= 0
    };
  }, [metrics]);

  // Generate historical data for charts
  const generateHistoricalData = useCallback((days: number) => {
    const now = new Date();
    const data = [];
    
    let lastValue = metrics.tokenPrice * 1000; // Convert to base value
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      // Add some randomness but keep a trend
      const change = (Math.random() * 0.08) - 0.03; // -3% to +5% daily change
      lastValue = lastValue * (1 + change);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: lastValue.toFixed(2)
      });
    }
    
    return data;
  }, [metrics.tokenPrice]);

  return {
    metrics: calculatedMetrics,
    isConnected,
    refreshMetrics: () => setMetrics(prev => ({ ...prev, lastUpdate: new Date() })),
    getTotalViews,
    getTotalLikes,
    getAveragePrice,
    getEngagementRate,
    getTopPerformingProperty,
    getPropertiesByType,
    getPropertiesByStatus,
    generateHistoricalData
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

      // Type assertion for WebGL context
      const webglContext = gl as WebGLRenderingContext;
      const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      
      // Detectar dispositivos móviles o GPUs de bajo rendimiento
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      const isLowEndGPU = /PowerVR|Adreno [1-4]|Mali-[1-4]/i.test(String(renderer));
      
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
