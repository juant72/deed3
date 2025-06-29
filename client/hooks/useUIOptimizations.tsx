import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Hook para optimizaciones GPU y micro-interacciones
export const useGPUOptimization = () => {
  const elementRef = useRef<HTMLElement | null>(null);

  // Forzar aceleración GPU
  const enableGPUAcceleration = useCallback((element: HTMLElement) => {
    if (element) {
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'transform, opacity';
      element.style.backfaceVisibility = 'hidden';
      element.style.perspective = '1000px';
    }
  }, []);

  // Limpiar optimizaciones GPU cuando no se necesiten
  const disableGPUAcceleration = useCallback((element: HTMLElement) => {
    if (element) {
      element.style.willChange = 'auto';
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      enableGPUAcceleration(element);
      
      return () => {
        disableGPUAcceleration(element);
      };
    }
  }, [enableGPUAcceleration, disableGPUAcceleration]);

  return {
    elementRef,
    enableGPUAcceleration,
    disableGPUAcceleration
  };
};

// Hook para micro-interacciones avanzadas
export const useMicroInteractions = () => {
  // Haptic feedback para dispositivos compatibles
  const triggerHaptic = useCallback((type: string = 'light') => {
    if (navigator.vibrate) {
      const patterns: Record<string, number[]> = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        error: [100, 50, 100]
      };
      navigator.vibrate(patterns[type] || patterns.light);
    }
  }, []);

  // Sound feedback
  const playSound = useCallback((type: string = 'click') => {
    if (typeof Audio !== 'undefined') {
      const sounds: Record<string, string> = {
        click: '/sounds/click.mp3',
        hover: '/sounds/hover.mp3',
        success: '/sounds/success.mp3',
        error: '/sounds/error.mp3'
      };
      
      try {
        const audio = new Audio(sounds[type]);
        audio.volume = 0.1;
        audio.play().catch(() => {
          // Silently fail if audio doesn't work
        });
      } catch (error) {
        // Silently fail if Audio is not supported
      }
    }
  }, []);

  // Ripple effect
  const createRipple = useCallback((event: React.MouseEvent | MouseEvent, element?: HTMLElement) => {
    const button = element || (event.currentTarget as HTMLElement);
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = ('clientX' in event ? event.clientX : 0) - rect.left - size / 2;
    const y = ('clientY' in event ? event.clientY : 0) - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  return {
    triggerHaptic,
    playSound,
    createRipple
  };
};

// Hook para animaciones de carga y estados
export const useLoadingStates = () => {
  const createSkeletonLoader = useCallback((width: string = '100%', height: string = '20px', className: string = '') => {
    return (
      <div 
        className={`animate-pulse bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] rounded ${className}`}
        style={{ width, height }}
      />
    );
  }, []);

  const createShimmerEffect = useCallback((children: React.ReactNode, isLoading: boolean = false) => {
    if (!isLoading) return children;
    
    return (
      <div className="relative overflow-hidden">
        {children}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
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
    
    // Si es una URL externa o ya está optimizada, devolverla tal como está
    if (src.startsWith('http') || src.includes('/_next/image')) {
      return src;
    }
    
    // Crear URL optimizada para Next.js Image
    const params = new URLSearchParams({
      url: src,
      w: width.toString(),
      h: height.toString(),
      q: quality.toString()
    });
    
    return `/_next/image?${params.toString()}`;
  }, []);

  const preloadImage = useCallback((src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const createResponsiveImageSet = useCallback((baseSrc: string) => {
    return {
      mobile: createOptimizedImageUrl(baseSrc, { width: 400, height: 300 }),
      tablet: createOptimizedImageUrl(baseSrc, { width: 800, height: 600 }),
      desktop: createOptimizedImageUrl(baseSrc, { width: 1200, height: 900 }),
      retina: createOptimizedImageUrl(baseSrc, { width: 2400, height: 1800 })
    };
  }, [createOptimizedImageUrl]);

  return {
    createOptimizedImageUrl,
    preloadImage,
    createResponsiveImageSet
  };
};

// Componente para animaciones de entrada
interface AnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'scaleIn';
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ children, delay = 0, duration = 0.5, type = 'fadeUp' }) => {
  const animations: Record<string, any> = {
    fadeUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    }
  };

  return (
    <motion.div
      variants={animations[type]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

// CSS personalizado para animaciones adicionales
export const additionalAnimations = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  
  @keyframes pulse-subtle {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .gpu-optimized {
    transform: translateZ(0);
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  
  .smooth-scroll {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
`;

// Combined hook that exports all UI optimizations
export const useUIOptimizations = () => {
  const gpu = useGPUOptimization();
  const interactions = useMicroInteractions();
  const loading = useLoadingStates();
  const images = useImageOptimization();
  
  return {
    ...gpu,
    ...interactions,
    ...loading,
    ...images,
    shouldReduceMotion: false, // Default value
    vibrate: () => {}, // Default function
    prefersHighContrast: false // Default value
  };
};
