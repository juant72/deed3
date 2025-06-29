import React, { useRef, useEffect, useState } from "react";
import { motion } from 'framer-motion';

// Declare global type for window
declare global {
  interface Window {
    announceToScreenReader?: (message: string, priority?: string) => void;
  }
}

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

const SkipLink: React.FC<SkipLinkProps> = ({ href = "#main-content", children = "Skip to main content" }) => {
  return (
    <motion.a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      whileFocus={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
};

interface FocusTrapProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const FocusTrap: React.FC<FocusTrapProps> = ({ children, isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement>(null);
  const lastFocusableRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    firstFocusableRef.current = focusableElements[0] as HTMLElement;
    lastFocusableRef.current = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        // Focus return logic can be added here
      }
    };

    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscapeKey);

    // Focus the first element when trap becomes active
    firstFocusableRef.current?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

interface ScreenReaderOnlyProps {
  children: React.ReactNode;
}

const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({ children }) => {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
};

interface HighContrastToggleProps {
  onToggle: () => void;
  isHighContrast?: boolean;
}

const HighContrastToggle: React.FC<HighContrastToggleProps> = ({ onToggle, isHighContrast = false }) => {
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
  }, [isHighContrast]);

  return (
    <motion.button
      className={`
        p-3 rounded-lg border-2 transition-all duration-200
        ${isHighContrast 
          ? 'bg-black text-white border-white' 
          : 'bg-white text-black border-gray-300 hover:border-gray-400'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast mode`}
      aria-pressed={isHighContrast}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <ScreenReaderOnly>
        {isHighContrast ? 'Disable' : 'Enable'} high contrast mode
      </ScreenReaderOnly>
    </motion.button>
  );
};

const AccessibilityAnnouncer: React.FC = () => {
  const announceRef = useRef<HTMLDivElement>(null);

  const announce = (message: string, priority: string = 'polite') => {
    if (!announceRef.current) return;
    
    announceRef.current.setAttribute('aria-live', priority);
    announceRef.current.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      if (announceRef.current) {
        announceRef.current.textContent = '';
      }
    }, 1000);
  };

  // Expose announce function globally for easy access
  useEffect(() => {
    window.announceToScreenReader = announce;
    
    return () => {
      delete window.announceToScreenReader;
    };
  }, []);

  return (
    <div
      ref={announceRef}
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    />
  );
};

interface KeyboardNavigationProps {
  children: React.ReactNode;
}

const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({ children }) => {
  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      // Handle arrow key navigation for custom components
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const focusableElements = document.querySelectorAll(
          '[data-keyboard-nav="true"]:not([disabled])'
        );
        
        if (!document.activeElement) return;
        
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        if (currentIndex === -1) return;

        let nextIndex: number | undefined;
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowLeft':
            nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
            break;
        }

        if (nextIndex !== undefined) {
          e.preventDefault();
          (focusableElements[nextIndex] as HTMLElement)?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyNavigation);
    
    return () => {
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, []);

  return <>{children}</>;
};

// Custom hook for accessibility features
export const useA11y = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setReducedMotion(prefersReducedMotion);
    setIsHighContrast(prefersHighContrast);

    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const handleContrastChange = (e: MediaQueryListEvent) => setIsHighContrast(e.matches);

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  const announce = (message: string, priority: string = 'polite') => {
    if (window.announceToScreenReader) {
      window.announceToScreenReader(message, priority);
    }
  };

  const focusManagement = {
    focusElement: (selector: string) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    
    restoreFocus: (previousElement: HTMLElement) => {
      if (previousElement && previousElement.focus) {
        previousElement.focus();
      }
    }
  };

  return {
    isHighContrast,
    setIsHighContrast,
    reducedMotion,
    announce,
    focusManagement
  };
};

export {
  SkipLink,
  FocusTrap,
  ScreenReaderOnly,
  HighContrastToggle,
  AccessibilityAnnouncer,
  KeyboardNavigation
};
