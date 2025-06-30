/**
 * useDeviceTesting - Hook para testing automático cross-device
 * Sprint 4: Mobile-First Optimization
 */

import { useState, useEffect, useCallback } from 'react';

// Types for device testing
interface DeviceInfo {
  type: string;
  os: string;
  browser: string;
  viewport: {
    width: number;
    height: number;
    pixelRatio?: number;
  };
  capabilities: Record<string, any>;
  userAgent?: string;
  performance?: Record<string, any>;
  compatibility?: Record<string, any>;
}

interface TestResult {
  score: number;
  timestamp: string;
  [key: string]: any;
}

interface TestResults {
  responsive: TestResult | null;
  touch: TestResult | null;
  performance: TestResult | null;
  accessibility: TestResult | null;
  features: TestResult | null;
}

interface FullTestResults {
  device?: any;
  responsive?: TestResult;
  touch?: TestResult;
  performance?: TestResult;
  accessibility?: TestResult;
  features?: TestResult;
  overall: {
    score: number;
    passed: number;
    warnings: number;
    failed: number;
    timestamp: string;
  };
}

export const useDeviceTesting = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'unknown',
    os: 'unknown',
    browser: 'unknown',
    viewport: { width: 0, height: 0 },
    capabilities: {},
    performance: {},
    compatibility: {}
  });

  const [testResults, setTestResults] = useState<TestResults>({
    responsive: null,
    touch: null,
    performance: null,
    accessibility: null,
    features: null
  });

  const [isTestingEnabled, setIsTestingEnabled] = useState(false);

  // Detectar información del dispositivo
  const detectDevice = useCallback(() => {
    const userAgent = navigator.userAgent;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio || 1
    };

    // Detectar tipo de dispositivo
    let deviceType = 'desktop';
    if (/iPad/.test(userAgent)) deviceType = 'tablet';
    else if (/iPhone|Android.*Mobile/.test(userAgent)) deviceType = 'mobile';
    else if (/Android/.test(userAgent)) deviceType = 'tablet';

    // Detectar OS
    let os = 'unknown';
    if (/Windows/.test(userAgent)) os = 'windows';
    else if (/Mac/.test(userAgent)) os = 'macos';
    else if (/iPhone|iPad/.test(userAgent)) os = 'ios';
    else if (/Android/.test(userAgent)) os = 'android';
    else if (/Linux/.test(userAgent)) os = 'linux';

    // Detectar browser
    let browser = 'unknown';
    if (/Chrome/.test(userAgent)) browser = 'chrome';
    else if (/Firefox/.test(userAgent)) browser = 'firefox';
    else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) browser = 'safari';
    else if (/Edge/.test(userAgent)) browser = 'edge';

    // Detectar capacidades
    const capabilities = {
      touch: 'ontouchstart' in window,
      webGL: !!window.WebGLRenderingContext,
      serviceWorker: 'serviceWorker' in navigator,
      localStorage: typeof Storage !== 'undefined',
      indexedDB: 'indexedDB' in window,
      webAssembly: typeof WebAssembly === 'object',
      intersection: 'IntersectionObserver' in window,
      resize: 'ResizeObserver' in window,
      geolocation: 'geolocation' in navigator,
      camera: 'mediaDevices' in navigator,
      webRTC: 'RTCPeerConnection' in window,
      webAuth: 'credentials' in navigator,
      payment: 'PaymentRequest' in window
    };

    setDeviceInfo({
      type: deviceType,
      os,
      browser,
      viewport,
      capabilities,
      userAgent
    });

    return { type: deviceType, os, browser, viewport, capabilities };
  }, []);

  // Test responsive design
  const testResponsive = useCallback(async () => {
    const breakpoints = {
      mobile: { min: 0, max: 767 },
      tablet: { min: 768, max: 1023 },
      desktop: { min: 1024, max: Infinity }
    };

    const currentWidth = window.innerWidth;
    const currentBreakpoint = Object.keys(breakpoints).find(bp => 
      currentWidth >= breakpoints[bp].min && currentWidth <= breakpoints[bp].max
    );

    // Test elementos responsive
    const responsiveElements = document.querySelectorAll('[class*="responsive"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
    const hiddenElements = Array.from(responsiveElements).filter(el => 
      window.getComputedStyle(el).display === 'none'
    );

    const result = {
      breakpoint: currentBreakpoint,
      viewport: { width: currentWidth, height: window.innerHeight },
      responsiveElements: responsiveElements.length,
      hiddenElements: hiddenElements.length,
      isResponsive: responsiveElements.length > 0,
      score: responsiveElements.length > 0 ? 100 : 0,
      timestamp: new Date().toISOString()
    };

    setTestResults(prev => ({ ...prev, responsive: result }));
    return result;
  }, []);

  // Test capacidades táctiles
  const testTouch = useCallback(async () => {
    const hasTouch = 'ontouchstart' in window;
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    
    // Test eventos táctiles
    let gestureSupport = false;
    try {
      const testEl = document.createElement('div');
      testEl.addEventListener('touchstart', () => {});
      gestureSupport = true;
    } catch (e) {
      gestureSupport = false;
    }

    const result = {
      hasTouch,
      maxTouchPoints,
      gestureSupport,
      touchAPI: {
        touchstart: 'ontouchstart' in window,
        touchmove: 'ontouchmove' in window,
        touchend: 'ontouchend' in window,
        touchcancel: 'ontouchcancel' in window
      },
      score: hasTouch && maxTouchPoints > 0 ? 100 : 50,
      timestamp: new Date().toISOString()
    };

    setTestResults(prev => ({ ...prev, touch: result }));
    return result;
  }, []);

  // Test performance
  const testPerformance = useCallback(async () => {
    const startTime = performance.now();
    
    // Test de renderizado
    const testDiv = document.createElement('div');
    testDiv.innerHTML = '<div>'.repeat(1000) + '</div>'.repeat(1000);
    document.body.appendChild(testDiv);
    
    const renderTime = performance.now() - startTime;
    document.body.removeChild(testDiv);

    // Métricas de memoria (si están disponibles)
    const memory = (performance as any).memory || {};
    
    const result = {
      renderTime: Math.round(renderTime),
      memory: {
        used: memory.usedJSHeapSize || 0,
        total: memory.totalJSHeapSize || 0,
        limit: memory.jsHeapSizeLimit || 0
      },
      fps: await measureFPS(),
      score: renderTime < 100 ? 100 : Math.max(0, 100 - (renderTime - 100)),
      timestamp: new Date().toISOString()
    };

    setTestResults(prev => ({ ...prev, performance: result }));
    return result;
  }, []);

  // Medir FPS
  const measureFPS = (): Promise<number> => {
    return new Promise((resolve) => {
      let frames = 0;
      const startTime = performance.now();
      
      const countFrames = () => {
        frames++;
        if (performance.now() - startTime < 1000) {
          requestAnimationFrame(countFrames);
        } else {
          resolve(frames);
        }
      };
      
      requestAnimationFrame(countFrames);
    });
  };

  // Test accesibilidad
  const testAccessibility = useCallback(async () => {
    const checks = {
      // Elementos semánticos
      semanticElements: document.querySelectorAll('main, nav, header, footer, section, article').length,
      
      // ARIA labels
      ariaLabels: document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]').length,
      
      // Contraste (simplificado)
      images: document.querySelectorAll('img[alt]').length,
      totalImages: document.querySelectorAll('img').length,
      
      // Focus management
      focusableElements: document.querySelectorAll('button, a, input, select, textarea, [tabindex]').length,
      
      // Headings structure
      headings: {
        h1: document.querySelectorAll('h1').length,
        h2: document.querySelectorAll('h2').length,
        h3: document.querySelectorAll('h3').length,
        h4: document.querySelectorAll('h4').length,
        h5: document.querySelectorAll('h5').length,
        h6: document.querySelectorAll('h6').length
      }
    };

    const altTextScore = checks.totalImages > 0 ? (checks.images / checks.totalImages) * 100 : 100;
    const overallScore = Math.round((
      (checks.semanticElements > 0 ? 25 : 0) +
      (checks.ariaLabels > 0 ? 25 : 0) +
      (altTextScore * 0.25) +
      (checks.headings.h1 > 0 ? 25 : 0)
    ));

    const result = {
      checks,
      scores: {
        semantic: checks.semanticElements > 0 ? 100 : 0,
        aria: checks.ariaLabels > 0 ? 100 : 0,
        altText: altTextScore,
        headings: checks.headings.h1 > 0 ? 100 : 0
      },
      score: overallScore,
      timestamp: new Date().toISOString()
    };

    setTestResults(prev => ({ ...prev, accessibility: result }));
    return result;
  }, []);

  // Test compatibilidad de features
  const testFeatures = useCallback(async () => {
    const features = {
      // CSS Features
      cssGrid: CSS.supports('display', 'grid'),
      flexbox: CSS.supports('display', 'flex'),
      customProperties: CSS.supports('color', 'var(--test)'),
      transforms3D: CSS.supports('transform-style', 'preserve-3d'),
      
      // JavaScript APIs
      fetch: 'fetch' in window,
      promises: 'Promise' in window,
      async: 'async' in Function,
      modules: 'import' in document.createElement('script'),
      
      // Web APIs
      webWorkers: 'Worker' in window,
      serviceWorker: 'serviceWorker' in navigator,
      pushAPI: 'PushManager' in window,
      notifications: 'Notification' in window,
      
      // Sensors & Hardware
      deviceMotion: 'DeviceMotionEvent' in window,
      deviceOrientation: 'DeviceOrientationEvent' in window,
      battery: 'getBattery' in navigator,
      
      // Media
      webRTC: 'RTCPeerConnection' in window,
      mediaStream: 'mediaDevices' in navigator,
      webAudio: 'AudioContext' in window || 'webkitAudioContext' in window
    };

    const supportedCount = Object.values(features).filter(Boolean).length;
    const totalCount = Object.keys(features).length;
    const score = Math.round((supportedCount / totalCount) * 100);

    const result = {
      features,
      support: {
        supported: supportedCount,
        total: totalCount,
        percentage: score
      },
      score,
      timestamp: new Date().toISOString()
    };

    setTestResults(prev => ({ ...prev, features: result }));
    return result;
  }, []);

  // Ejecutar suite completa de tests
  const runFullTestSuite = useCallback(async (): Promise<FullTestResults | null> => {
    if (!isTestingEnabled) return null;

    console.log('🧪 Ejecutando suite completa de tests...');
    
    const results: Partial<FullTestResults> = {};
    
    try {
      results.device = detectDevice();
      results.responsive = await testResponsive();
      results.touch = await testTouch();
      results.performance = await testPerformance();
      results.accessibility = await testAccessibility();
      results.features = await testFeatures();
      
      // Calcular score general
      const testResults = [results.responsive, results.touch, results.performance, results.accessibility, results.features];
      const scores = testResults
        .filter((r): r is TestResult => r !== null && r !== undefined && typeof r.score === 'number')
        .map(r => r.score);
      
      const overallScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

      const finalResults: FullTestResults = {
        ...results,
        overall: {
          score: overallScore,
          passed: scores.filter(s => s >= 80).length,
          warnings: scores.filter(s => s >= 60 && s < 80).length,
          failed: scores.filter(s => s < 60).length,
          timestamp: new Date().toISOString()
        }
      };

      console.log('📊 Resultados del test:', finalResults);
      return finalResults;
      
    } catch (error) {
      console.error('❌ Error en test suite:', error);
      return null;
    }
  }, [isTestingEnabled, detectDevice, testResponsive, testTouch, testPerformance, testAccessibility, testFeatures]);

  // Auto-detectar dispositivo en mount
  useEffect(() => {
    detectDevice();
  }, [detectDevice]);

  // Auto-test en desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsTestingEnabled(true);
    }
  }, []);

  // Re-detectar en resize
  useEffect(() => {
    const handleResize = () => {
      detectDevice();
      if (isTestingEnabled) {
        testResponsive();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [detectDevice, testResponsive, isTestingEnabled]);

  return {
    deviceInfo,
    testResults,
    isTestingEnabled,
    setIsTestingEnabled,
    
    // Tests individuales
    testResponsive,
    testTouch,
    testPerformance,
    testAccessibility,
    testFeatures,
    
    // Test completo
    runFullTestSuite,
    
    // Utilidades
    detectDevice
  };
};
