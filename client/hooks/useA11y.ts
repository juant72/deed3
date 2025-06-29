/**
 * useA11y - Hook for accessibility utilities
 * Sprint 4: Mobile-First Optimization
 */

import { useEffect, useState, useCallback } from 'react';

interface A11yState {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  fontSize: number;
  focusMode: boolean;
}

export const useA11y = () => {
  const [a11yState, setA11yState] = useState<A11yState>({
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    fontSize: 16,
    focusMode: false
  });

  // Detectar preferencias del sistema
  const detectSystemPreferences = useCallback(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setA11yState(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast
    }));
  }, []);

  // Detectar screen reader
  const detectScreenReader = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    // Verificar si hay un screen reader activo
    const hasAriaLive = document.querySelector('[aria-live]') !== null;
    const hasScreenReaderClass = document.body.classList.contains('sr-only') || 
                                  document.body.classList.contains('screen-reader');
    
    return hasAriaLive || hasScreenReaderClass || navigator.userAgent.includes('NVDA') || 
           navigator.userAgent.includes('JAWS');
  }, []);

  // Activar modo alto contraste
  const toggleHighContrast = useCallback(() => {
    setA11yState(prev => {
      const newHighContrast = !prev.highContrast;
      
      if (newHighContrast) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      
      return { ...prev, highContrast: newHighContrast };
    });
  }, []);

  // Cambiar tamaño de fuente
  const changeFontSize = useCallback((size: number) => {
    setA11yState(prev => ({ ...prev, fontSize: size }));
    document.documentElement.style.fontSize = `${size}px`;
  }, []);

  // Activar modo focus
  const toggleFocusMode = useCallback(() => {
    setA11yState(prev => {
      const newFocusMode = !prev.focusMode;
      
      if (newFocusMode) {
        document.body.classList.add('focus-mode');
      } else {
        document.body.classList.remove('focus-mode');
      }
      
      return { ...prev, focusMode: newFocusMode };
    });
  }, []);

  // Anunciar a screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof window === 'undefined') return;

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);

  // Enfocar elemento
  const focusElement = useCallback((selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Skip to content
  const skipToContent = useCallback(() => {
    focusElement('#main, main, [role="main"]');
  }, [focusElement]);

  useEffect(() => {
    detectSystemPreferences();
    
    const screenReaderDetected = detectScreenReader();
    setA11yState(prev => ({ ...prev, screenReader: screenReaderDetected }));

    // Listener para cambios en preferencias del sistema
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handlePreferenceChange = () => {
      detectSystemPreferences();
    };

    mediaQuery.addEventListener('change', handlePreferenceChange);
    contrastQuery.addEventListener('change', handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener('change', handlePreferenceChange);
      contrastQuery.removeEventListener('change', handlePreferenceChange);
    };
  }, [detectSystemPreferences, detectScreenReader]);

  return {
    a11yState,
    toggleHighContrast,
    changeFontSize,
    toggleFocusMode,
    announce,
    focusElement,
    skipToContent,
    detectSystemPreferences
  };
};
