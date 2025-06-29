import { useCallback, useRef, useEffect, useState, useMemo } from 'react';

// Hook para optimizaciones GPU y micro-interacciones
export const useGPUOptimization = () => {
  const elementRef = useRef<HTMLElement | null>(null);

  // Forzar aceleración GPU
  const enableGPUAcceleration = useCallback((element: HTMLElement) => {
    if (element) {
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'transform';
      element.style.backfaceVisibility = 'hidden';
    }
  }, []);

  // Deshabilitar aceleración GPU
  const disableGPUAcceleration = useCallback((element: HTMLElement) => {
    if (element) {
      element.style.transform = '';
      element.style.willChange = '';
      element.style.backfaceVisibility = '';
    }
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      enableGPUAcceleration(elementRef.current);
      return () => {
        if (elementRef.current) {
          disableGPUAcceleration(elementRef.current);
        }
      };
    }
  }, [enableGPUAcceleration, disableGPUAcceleration]);

  return {
    elementRef,
    enableGPUAcceleration,
    disableGPUAcceleration
  };
};

// Hook para micro-interacciones
export const useMicroInteractions = () => {
  const patterns = {
    light: [10],
    medium: [10, 5, 10],
    heavy: [20, 10, 20],
    success: [5, 5, 5],
    error: [50, 25, 50]
  };

  const sounds = {
    click: '/sounds/click.mp3',
    hover: '/sounds/hover.mp3',
    success: '/sounds/success.mp3',
    error: '/sounds/error.mp3'
  };

  const vibrate = useCallback((type: keyof typeof patterns = 'light') => {
    if (navigator.vibrate) {
      navigator.vibrate(patterns[type] || patterns.light);
    }
  }, []);

  const playSound = useCallback((type: keyof typeof sounds = 'click') => {
    try {
      if (sounds[type]) {
        const audio = new Audio(sounds[type]);
        audio.volume = 0.1;
        audio.play().catch(() => {
          // Silently fail if audio can't play
        });
      }
    } catch (error) {
      // Silently fail
    }
  }, []);

  const createRipple = useCallback((event: MouseEvent | TouchEvent, element: HTMLElement) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = ('clientX' in event ? event.clientX : event.touches[0].clientX) - rect.left - size / 2;
    const y = ('clientY' in event ? event.clientY : event.touches[0].clientY) - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
    `;

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  return {
    vibrate,
    playSound,
    createRipple
  };
};

// Hook para estados de carga
export const useLoadingStates = () => {
  const createSkeletonLoader = useCallback((width = '100%', height = '20px', className = '') => {
    // Return configuration object instead of JSX
    return {
      width,
      height,
      className: `animate-pulse bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] rounded ${className}`
    };
  }, []);

  const createShimmerEffect = useCallback((isLoading = false) => {
    if (!isLoading) return { isLoading: false };
    
    return {
      isLoading: true,
      className: "relative overflow-hidden",
      shimmerClassName: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
    };
  }, []);

  return {
    createSkeletonLoader,
    createShimmerEffect
  };
};

// Hook para optimización de imágenes
export const useImageOptimization = () => {
  const createOptimizedImageUrl = useCallback((src: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  } = {}) => {
    const {
      width = 800,
      height = 600,
      quality = 80,
      format = 'webp'
    } = options;

    // Simple implementation - in production, you'd use a service like Cloudinary
    const url = new URL(src, window.location.origin);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('f', format);
    
    return url.toString();
  }, []);

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const preloadImage = useCallback((src: string) => {
    if (loadedImages.has(src)) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src));
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, [loadedImages]);

  const createResponsiveImageSet = useCallback((baseSrc: string) => {
    const sizes = [480, 768, 1024, 1280, 1920];
    return sizes.map(size => ({
      src: createOptimizedImageUrl(baseSrc, { width: size }),
      width: size
    }));
  }, [createOptimizedImageUrl]);

  return {
    createOptimizedImageUrl,
    preloadImage,
    createResponsiveImageSet,
    isImageLoaded: (src: string) => loadedImages.has(src)
  };
};

// Hook principal que combina todas las optimizaciones
export const useUIOptimizations = () => {
  const gpu = useGPUOptimization();
  const interactions = useMicroInteractions();
  const loading = useLoadingStates();
  const images = useImageOptimization();
  
  // Detectar preferencias del usuario
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    setShouldReduceMotion(motionQuery.matches);
    setPrefersHighContrast(contrastQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    const handleContrastChange = (e: MediaQueryListEvent) => setPrefersHighContrast(e.matches);

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);
  
  return {
    ...gpu,
    ...interactions,
    ...loading,
    ...images,
    shouldReduceMotion,
    prefersHighContrast
  };
};
