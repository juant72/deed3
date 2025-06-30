/**
 * Fast Refresh configuration and optimization
 * Reduces full page reloads during development
 */

declare global {
  interface NodeModule {
    hot?: {
      accept(): void;
    };
  }
}

const configureFastRefresh = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Ensure Fast Refresh works properly
    if ((module as any).hot) {
      (module as any).hot.accept();
    }
    
    // Prevent unnecessary full reloads
    const originalError = console.error;
    console.error = (...args) => {
      // Filter out Fast Refresh related errors that cause unnecessary reloads
      const message = args[0];
      if (typeof message === 'string' && (
        message.includes('Fast Refresh') ||
        message.includes('webpack/hot') ||
        message.includes('HMR')
      )) {
        return;
      }
      originalError.apply(console, args);
    };
  }
};

export default configureFastRefresh;
