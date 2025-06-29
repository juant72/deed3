/**
 * MobileLighthouseOptimizer - Optimizaciones específicas para Lighthouse Mobile
 * Sprint 4: Mobile-First Optimization
 */

import React from "react";
import { useImageOptimization } from '@/hooks/useImageOptimization';
import { usePerformance } from '@/hooks/usePerformance';

const MobileLighthouseOptimizer: React.FC<{ children }> = ({ children }) => {
  const [optimizations, setOptimizations] = useState({
    images: false,
    fonts: false,
    criticalCSS: false,
    prefetch: false,
    lazyLoading: false
  });

  const { optimizeImages } = useImageOptimization();
  // const { performanceMetrics } = usePerformance(); // Commented out as not used yet

  // Optimización de imágenes para móvil
  useEffect(() => {
    const optimizeImagesForMobile: React.FC = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Agregar loading lazy si no está presente
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }

        // Optimizar sizes para responsive
        if (!img.hasAttribute('sizes')) {
          img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
        }

        // Agregar decoding async
        img.setAttribute('decoding', 'async');
        
        // Optimizar formato para móvil
        if (img.src && !img.src.includes('.webp') && !img.src.includes('.avif')) {
          const optimizedSrc = optimizeImages(img.src);
          if (optimizedSrc !== img.src) {
            img.src = optimizedSrc;
          }
        }
      });

      setOptimizations(prev => ({ ...prev, images: true }));
    };

    optimizeImagesForMobile();
  }, [optimizeImages]);

  // Optimización de fuentes
  useEffect(() => {
    const optimizeFonts: React.FC = () => {
      // Preload fuentes críticas
      const criticalFonts = [
        '/fonts/inter-var.woff2',
        '/fonts/space-grotesk.woff2'
      ];

      criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = font;
        link.crossOrigin = 'anonymous';
        
        if (!document.querySelector(`link[href="${font}"]`)) {
          document.head.appendChild(link);
        }
      });

      // Font-display: swap para evitar FOIT
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
        @font-face {
          font-family: 'Space Grotesk';
          font-display: swap;
        }
      `;
      
      if (!document.querySelector('style[data-font-display]')) {
        style.setAttribute('data-font-display', 'true');
        document.head.appendChild(style);
      }

      setOptimizations(prev => ({ ...prev, fonts: true }));
    };

    optimizeFonts();
  }, []);

  // Critical CSS inlining
  useEffect(() => {
    const inlineCriticalCSS: React.FC = () => {
      const criticalCSS = `
        /* Critical CSS para Above-the-fold */
        body { margin: 0; font-family: 'Inter', sans-serif; }
        .hero-section { min-height: 100vh; }
        .header { position: fixed; top: 0; width: 100%; z-index: 50; }
        .mobile-nav { position: fixed; bottom: 0; width: 100%; }
        
        /* Skeleton loading styles */
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
        }
        
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Mobile-first responsive utilities */
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .text-responsive { font-size: clamp(0.875rem, 2.5vw, 1rem); }
        }
      `;

      const style = document.createElement('style');
      style.textContent = criticalCSS;
      style.setAttribute('data-critical-css', 'true');
      
      if (!document.querySelector('style[data-critical-css]')) {
        document.head.insertBefore(style, document.head.firstChild);
      }

      setOptimizations(prev => ({ ...prev, criticalCSS: true }));
    };

    inlineCriticalCSS();
  }, []);

  // Prefetch de recursos críticos
  useEffect(() => {
    const setupPrefetch: React.FC = () => {
      const criticalResources = [
        '/api/properties/featured',
        '/api/blockchain/stats',
        '/manifest.json'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        
        if (!document.querySelector(`link[href="${resource}"]`)) {
          document.head.appendChild(link);
        }
      });

      // DNS prefetch para CDNs
      const dnsPrefetch = [
        'https://cdn.jsdelivr.net',
        'https://fonts.googleapis.com',
        'https://api.encrypia.com'
      ];

      dnsPrefetch.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        
        if (!document.querySelector(`link[href="${domain}"]`)) {
          document.head.appendChild(link);
        }
      });

      setOptimizations(prev => ({ ...prev, prefetch: true }));
    };

    setupPrefetch();
  }, []);

  // Lazy loading avanzado
  useEffect(() => {
    const setupLazyLoading: React.FC = () => {
      // Intersection Observer para componentes pesados
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            // Cargar componente lazy
            if (element.dataset.lazyComponent) {
              import(`@/components/${element.dataset.lazyComponent}`)
                .then(_Component => {
                  // Renderizar componente dinámicamente
                  console.log('Lazy loaded:', element.dataset.lazyComponent);
                })
                .catch(err => console.error('Error loading component:', err));
            }
            
            observer.unobserve(element);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });

      // Observar elementos lazy
      document.querySelectorAll('[data-lazy-component]').forEach(el => {
        observer.observe(el);
      });

      setOptimizations(prev => ({ ...prev, lazyLoading: true }));

      return () => observer.disconnect();
    };

    const cleanup = setupLazyLoading();
    return cleanup;
  }, []);

  // Métricas de Lighthouse
  const [lighthouseMetrics, setLighthouseMetrics] = useState({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    speed: null
  });

  // Medir Core Web Vitals
  useEffect(() => {
    const measureWebVitals: React.FC = () => {
      // First Contentful Paint
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              setLighthouseMetrics(prev => ({ 
                ...prev, 
                fcp: Math.round(entry.startTime) 
              }));
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setLighthouseMetrics(prev => ({ 
            ...prev, 
            lcp: Math.round(lastEntry.startTime) 
          }));
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // Cumulative Layout Shift
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setLighthouseMetrics(prev => ({ 
            ...prev, 
            cls: Math.round(clsValue * 1000) / 1000 
          }));
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    measureWebVitals();
  }, []);

  // Service Worker para optimizaciones
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }
  }, []);

  // Componente de debug para desarrollo
  const OptimizationDebug: React.FC = () => (
    process.env.NODE_ENV === 'development' && (
      <div className="fixed top-20 right-4 bg-black bg-opacity-75 text-white p-3 rounded text-xs max-w-xs z-50">
        <h4 className="font-bold mb-2">Lighthouse Optimizations</h4>
        {Object.entries(optimizations).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span>{key}:</span>
            <span className={value ? 'text-green-400' : 'text-red-400'}>
              {value ? '✓' : '✗'}
            </span>
          </div>
        ))}
        
        {Object.keys(lighthouseMetrics).some(key => lighthouseMetrics[key]) && (
          <>
            <hr className="my-2 border-gray-600" />
            <h5 className="font-bold mb-1">Core Web Vitals</h5>
            {lighthouseMetrics.fcp && (
              <div className="flex justify-between">
                <span>FCP:</span>
                <span className={lighthouseMetrics.fcp < 1800 ? 'text-green-400' : 'text-yellow-400'}>
                  {lighthouseMetrics.fcp}ms
                </span>
              </div>
            )}
            {lighthouseMetrics.lcp && (
              <div className="flex justify-between">
                <span>LCP:</span>
                <span className={lighthouseMetrics.lcp < 2500 ? 'text-green-400' : 'text-yellow-400'}>
                  {lighthouseMetrics.lcp}ms
                </span>
              </div>
            )}
            {lighthouseMetrics.cls !== null && (
              <div className="flex justify-between">
                <span>CLS:</span>
                <span className={lighthouseMetrics.cls < 0.1 ? 'text-green-400' : 'text-yellow-400'}>
                  {lighthouseMetrics.cls}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    )
  );

  return (
    <>
      {children}
      <OptimizationDebug />
    </>
  );
};

export default MobileLighthouseOptimizer;
