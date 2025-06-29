import { useState, useEffect, useCallback, useRef } from 'react';

export const useImageOptimization = () => {
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    supportsWebP: false,
    supportsAVIF: false,
    connectionSpeed: 'unknown',
    deviceMemory: 'unknown',
    screenDensity: 1
  });

  useEffect(() => {
    const detectCapabilities = async () => {
      const capabilities = {
        supportsWebP: false,
        supportsAVIF: false,
        connectionSpeed: 'unknown',
        deviceMemory: 'unknown',
        screenDensity: window.devicePixelRatio || 1
      };

      // Detect WebP support
      const webpSupport = await new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => resolve(webP.height === 2);
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      });
      capabilities.supportsWebP = webpSupport;

      // Detect AVIF support
      const avifSupport = await new Promise((resolve) => {
        const avif = new Image();
        avif.onload = avif.onerror = () => resolve(avif.height === 2);
        avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      });
      capabilities.supportsAVIF = avifSupport;

      // Detect connection speed
      if ('connection' in navigator) {
        const connection = navigator.connection;
        capabilities.connectionSpeed = connection.effectiveType || 'unknown';
      }

      // Detect device memory
      if ('deviceMemory' in navigator) {
        capabilities.deviceMemory = navigator.deviceMemory;
      }

      setDeviceCapabilities(capabilities);
    };

    detectCapabilities();
  }, []);

  const getOptimalImageFormat = useCallback((originalUrl) => {
    if (!originalUrl) return originalUrl;

    // Priority: AVIF > WebP > Original
    if (deviceCapabilities.supportsAVIF) {
      return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    } else if (deviceCapabilities.supportsWebP) {
      return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    return originalUrl;
  }, [deviceCapabilities]);

  const getOptimalImageSize = useCallback((baseWidth, baseHeight) => {
    const { screenDensity, connectionSpeed, deviceMemory } = deviceCapabilities;
    
    let qualityMultiplier = 1;
    
    // Adjust based on connection speed
    switch (connectionSpeed) {
      case 'slow-2g':
      case '2g':
        qualityMultiplier = 0.5;
        break;
      case '3g':
        qualityMultiplier = 0.75;
        break;
      case '4g':
      default:
        qualityMultiplier = 1;
        break;
    }
    
    // Adjust based on device memory
    if (typeof deviceMemory === 'number') {
      if (deviceMemory <= 2) {
        qualityMultiplier *= 0.7;
      } else if (deviceMemory <= 4) {
        qualityMultiplier *= 0.85;
      }
    }
    
    // Consider screen density but cap at 2x for performance
    const densityMultiplier = Math.min(screenDensity, 2);
    
    return {
      width: Math.round(baseWidth * qualityMultiplier * densityMultiplier),
      height: Math.round(baseHeight * qualityMultiplier * densityMultiplier),
      quality: Math.round(80 * qualityMultiplier)
    };
  }, [deviceCapabilities]);

  return {
    deviceCapabilities,
    getOptimalImageFormat,
    getOptimalImageSize
  };
};

export const useLazyLoading = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  const { threshold = 0.1, rootMargin = '50px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    console.warn('Image failed to load');
  }, []);

  return {
    ref,
    isVisible,
    isLoaded,
    handleLoad,
    handleError
  };
};

export const useImagePreloader = () => {
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());

  const preloadImage = useCallback((src) => {
    if (preloadedImages.has(src) || loadingImages.has(src)) {
      return Promise.resolve();
    }

    setLoadingImages(prev => new Set([...prev, src]));

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, src]));
        setLoadingImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(src);
          return newSet;
        });
        resolve();
      };
      
      img.onerror = () => {
        setLoadingImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(src);
          return newSet;
        });
        reject(new Error(`Failed to preload image: ${src}`));
      };
      
      img.src = src;
    });
  }, [preloadedImages, loadingImages]);

  const preloadImages = useCallback(async (srcArray) => {
    const promises = srcArray.map(src => preloadImage(src));
    return Promise.allSettled(promises);
  }, [preloadImage]);

  return {
    preloadImage,
    preloadImages,
    isPreloaded: (src) => preloadedImages.has(src),
    isLoading: (src) => loadingImages.has(src)
  };
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });

  useEffect(() => {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observer not supported');
    }

    // Time to First Byte
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0];
      setMetrics(prev => ({ ...prev, ttfb: nav.responseStart - nav.requestStart }));
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  const getPerformanceScore = useCallback(() => {
    const { lcp, fid, cls } = metrics;
    
    let score = 100;
    
    // LCP scoring (target: <2.5s)
    if (lcp !== null) {
      if (lcp > 4000) score -= 30;
      else if (lcp > 2500) score -= 15;
    }
    
    // FID scoring (target: <100ms)
    if (fid !== null) {
      if (fid > 300) score -= 30;
      else if (fid > 100) score -= 15;
    }
    
    // CLS scoring (target: <0.1)
    if (cls !== null) {
      if (cls > 0.25) score -= 30;
      else if (cls > 0.1) score -= 15;
    }
    
    return Math.max(0, score);
  }, [metrics]);

  return {
    metrics,
    getPerformanceScore
  };
};
