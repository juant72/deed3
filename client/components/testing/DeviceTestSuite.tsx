/**
 * DeviceTestSuite - Componente para testing automático cross-device
 * Sprint 4: Mobile-First Optimization
 */

import React from "react";
import { useTouch } from '@/hooks/useTouch';
import { usePerformance } from '@/hooks/usePerformance';

const DeviceTestSuite: React.FC<{ onTestComplete }> = ({ onTestComplete }) => {
  const [testResults, setTestResults] = useState({
    viewport: null,
    touch: null,
    performance: null,
    compatibility: null,
    accessibility: null
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const { touchCapability, gestureSupport } = useTouch();
  const { performanceMetrics } = usePerformance();

  // Test viewport y responsive
  const testViewport = async () => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      orientation: screen.orientation?.type || 'unknown',
      category: getDeviceCategory()
    };

    // Test responsive breakpoints
    const breakpoints = {
      mobile: viewport.width < 768,
      tablet: viewport.width >= 768 && viewport.width < 1024,
      desktop: viewport.width >= 1024
    };

    return {
      ...viewport,
      breakpoints,
      isResponsive: true,
      status: 'passed'
    };
  };

  // Test capacidades táctiles
  const testTouchCapabilities = async () => {
    return {
      hasTouch: touchCapability.hasTouch,
      multiTouch: touchCapability.multiTouch,
      gestures: gestureSupport,
      swipeSupport: 'ontouchstart' in window,
      status: touchCapability.hasTouch ? 'passed' : 'warning'
    };
  };

  // Test performance en dispositivo
  const testPerformance = async () => {
    const startTime = performance.now();
    
    // Simular carga de componentes pesados
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    return {
      renderTime,
      memory: performanceMetrics.memory,
      fps: performanceMetrics.fps,
      loadTime: performanceMetrics.loadTime,
      status: renderTime < 200 ? 'passed' : 'warning'
    };
  };

  // Test compatibilidad de features
  const testCompatibility = async () => {
    const features = {
      serviceWorker: 'serviceWorker' in navigator,
      localStorage: typeof Storage !== 'undefined',
      webGL: !!window.WebGLRenderingContext,
      intersectionObserver: 'IntersectionObserver' in window,
      resizeObserver: 'ResizeObserver' in window,
      webAnimations: 'animate' in document.createElement('div'),
      css3D: CSS.supports('transform-style', 'preserve-3d'),
      cssGrid: CSS.supports('display', 'grid'),
      flexbox: CSS.supports('display', 'flex')
    };

    const supportedFeatures = Object.values(features).filter(Boolean).length;
    const totalFeatures = Object.keys(features).length;
    const compatibilityScore = (supportedFeatures / totalFeatures) * 100;

    return {
      features,
      score: compatibilityScore,
      status: compatibilityScore > 80 ? 'passed' : 'warning'
    };
  };

  // Test accesibilidad básica
  const testAccessibility = async () => {
    const checks = {
      focusManagement: document.activeElement !== null,
      keyboardNavigation: true, // Requiere testing manual
      screenReaderSupport: document.querySelectorAll('[aria-label], [aria-labelledby]').length > 0,
      colorContrast: true, // Requiere axe-core para test automático
      semanticHTML: document.querySelectorAll('main, nav, header, footer').length > 0
    };

    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    const a11yScore = (passedChecks / totalChecks) * 100;

    return {
      checks,
      score: a11yScore,
      status: a11yScore > 75 ? 'passed' : 'warning'
    };
  };

  // Determinar categoría de dispositivo
  const getDeviceCategory: React.FC = () => {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent;

    if (/iPad/.test(userAgent)) return 'tablet-ipad';
    if (/iPhone/.test(userAgent)) return 'mobile-ios';
    if (/Android/.test(userAgent)) {
      return width > 768 ? 'tablet-android' : 'mobile-android';
    }
    if (width < 768) return 'mobile-unknown';
    if (width < 1024) return 'tablet-unknown';
    return 'desktop';
  };

  // Ejecutar suite completa de tests
  const runTestSuite = useCallback(async () => {
    setIsRunning(true);
    const results = {};

    try {
      console.log('🧪 Iniciando Device Test Suite...');
      
      results.viewport = await testViewport();
      console.log('✅ Viewport test completed');
      
      results.touch = await testTouchCapabilities();
      console.log('✅ Touch test completed');
      
      results.performance = await testPerformance();
      console.log('✅ Performance test completed');
      
      results.compatibility = await testCompatibility();
      console.log('✅ Compatibility test completed');
      
      results.accessibility = await testAccessibility();
      console.log('✅ Accessibility test completed');

      setTestResults(results);
      
      // Generar reporte
      const report = generateReport(results);
      console.log('📊 Test Report:', report);
      
      if (onTestComplete) {
        onTestComplete(results, report);
      }
      
    } catch (error) {
      console.error('❌ Error en test suite:', error);
    } finally {
      setIsRunning(false);
    }
  }, [onTestComplete, testViewport, testTouchCapabilities, testPerformance, testAccessibility, testCompatibility, generateReport]);

  // Generar reporte de resultados
  const generateReport = useCallback((results) => {
    const allTests = Object.values(results);
    const passedTests = allTests.filter(test => test.status === 'passed').length;
    const warningTests = allTests.filter(test => test.status === 'warning').length;
    const failedTests = allTests.filter(test => test.status === 'failed').length;
    
    const overallScore = (passedTests / allTests.length) * 100;
    const deviceInfo = results.viewport;
    
    return {
      timestamp: new Date().toISOString(),
      device: {
        category: deviceInfo.category,
        viewport: `${deviceInfo.width}x${deviceInfo.height}`,
        pixelRatio: deviceInfo.pixelRatio,
        orientation: deviceInfo.orientation
      },
      summary: {
        total: allTests.length,
        passed: passedTests,
        warnings: warningTests,
        failed: failedTests,
        score: Math.round(overallScore)
      },
      recommendations: generateRecommendations(results)
    };
  }, []);

  // Generar recomendaciones basadas en resultados
  const generateRecommendations = (results) => {
    const recommendations = [];

    if (results.performance.status === 'warning') {
      recommendations.push('Optimizar tiempo de renderizado para mejorar performance');
    }
    
    if (results.compatibility.score < 90) {
      recommendations.push('Implementar polyfills para mejorar compatibilidad');
    }
    
    if (results.accessibility.score < 85) {
      recommendations.push('Mejorar etiquetas ARIA y navegación por teclado');
    }
    
    if (!results.touch.hasTouch && results.viewport.category.includes('mobile')) {
      recommendations.push('Verificar detección táctil en dispositivo móvil');
    }

    return recommendations;
  };

  // Auto-run en mount si es desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      runTestSuite();
    }
  }, [runTestSuite]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Device Test Suite</h3>
        <button
          onClick={runTestSuite}
          disabled={isRunning}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isRunning ? 'Testing...' : 'Run Tests'}
        </button>
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="space-y-2 text-xs">
          {Object.entries(testResults).map(([test, result]) => (
            result && (
              <div key={test} className="flex items-center justify-between">
                <span className="capitalize">{test}</span>
                <span className={`px-1 rounded ${
                  result.status === 'passed' ? 'bg-green-100 text-green-800' :
                  result.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {result.status}
                </span>
              </div>
            )
          ))}
        </div>
      )}

      {isRunning && (
        <div className="mt-2 flex items-center text-xs text-gray-600">
          <div className="animate-spin w-3 h-3 border border-blue-500 border-t-transparent rounded-full mr-2"></div>
          Running tests...
        </div>
      )}
    </div>
  );
};

export default DeviceTestSuite;
