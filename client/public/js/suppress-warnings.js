// Warning suppression for browser console
(function() {
  'use strict';
  
  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  // Patterns to suppress
  const suppressPatterns = [
    // Lit.js dev mode warnings
    /Lit is in dev mode/i,
    /lit.*dev.*mode/i,
    /development.*build.*detected/i,
    
    // WalletConnect warnings
    /WalletConnect.*url.*mismatch/i,
    /metadata.*url.*mismatch/i,
    
    // Extension warnings
    /extension\s+.*\s+error/i,
    /chrome.*extension/i,
    /browser.*extension/i,
    
    // React Fast Refresh
    /fast.*refresh/i,
    /react.*refresh/i,
    
    // Webpack dev warnings
    /webpack.*dev.*server/i,
    /hot.*module.*replacement/i,
    
    // Common Next.js dev warnings
    /next.*dev.*mode/i,
    /development.*build/i,
  ];
  
  // Function to check if message should be suppressed
  function shouldSuppress(message) {
    if (typeof message !== 'string') {
      message = String(message);
    }
    return suppressPatterns.some(pattern => pattern.test(message));
  }
  
  // Override console methods
  console.error = function(...args) {
    if (args.some(shouldSuppress)) return;
    originalError.apply(console, args);
  };
  
  console.warn = function(...args) {
    if (args.some(shouldSuppress)) return;
    originalWarn.apply(console, args);
  };
  
  console.log = function(...args) {
    if (args.some(shouldSuppress)) return;
    originalLog.apply(console, args);
  };
  
  // Suppress certain window errors
  window.addEventListener('error', function(event) {
    if (shouldSuppress(event.message || event.error?.message || '')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Suppress certain unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    if (shouldSuppress(event.reason?.message || String(event.reason) || '')) {
      event.preventDefault();
      return false;
    }
  });
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
  });
})();
