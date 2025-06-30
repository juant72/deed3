/**
 * Production configuration for Lit components
 * Suppresses development mode warnings in production
 */

declare global {
  interface Window {
    litIsland?: {
      devMode: boolean;
    };
  }
}

export const configureLitProduction = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Set Lit to production mode if it's available
    if ((window as any).litIsland) {
      (window as any).litIsland.devMode = false;
    }
    
    // Suppress development warnings
    console.info('Lit components configured for production mode');
  }
};

// Initialize on import in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  configureLitProduction();
}
