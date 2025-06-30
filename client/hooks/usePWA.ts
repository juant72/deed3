import { useState, useEffect, useCallback } from 'react';

// Extend Navigator interface for PWA properties
declare global {
  interface Navigator {
    standalone?: boolean;
  }
  interface Window {
    MSStream?: any;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true);
      }
    };

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Handle service worker updates
    const handleServiceWorkerUpdate = () => {
      setUpdateAvailable(true);
    };

    // Initial checks
    checkInstalled();
    setIsOnline(navigator.onLine);

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Service Worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                handleServiceWorkerUpdate();
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return false;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during PWA installation:', error);
      return false;
    }
  }, [deferredPrompt]);

  const updateApp = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  }, []);

  const shareApp = useCallback(async (data = {}) => {
    const shareData = {
      title: 'Encrypia Deeds3',
      text: 'Revolutionary Web3 Real Estate Platform',
      url: window.location.href,
      ...data
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return true;
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.url);
        return true;
      }
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }, []);

  const addToHomeScreen = useCallback(() => {
    // For iOS devices
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      return {
        isIOS: true,
        canInstall: !isInstalled,
        message: 'Tap the share button and select "Add to Home Screen"'
      };
    }
    
    // For Android and other devices
    return {
      isIOS: false,
      canInstall: isInstallable,
      install: installApp
    };
  }, [isInstallable, isInstalled, installApp]);

  const getDeviceInfo = useCallback(() => {
    const ua = navigator.userAgent;
    return {
      isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
      isAndroid: /Android/.test(ua),
      isMobile: /Mobi|Android/i.test(ua),
      isTablet: /iPad/.test(ua) || (/Android/.test(ua) && !/Mobi/.test(ua)),
      isDesktop: !/Mobi|Android|iPad/.test(ua),
      standalone: window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
    };
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      return 'not-supported';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }, []);

  const sendNotification = useCallback((title, options = {}) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options
      });

      return notification;
    }
    return null;
  }, []);

  // Offline storage helpers
  const getCachedData = useCallback(async (key) => {
    try {
      const cache = await caches.open('deeds3-data');
      const response = await cache.match(key);
      return response ? await response.json() : null;
    } catch (error) {
      console.error('Error reading cached data:', error);
      return null;
    }
  }, []);

  const setCachedData = useCallback(async (key, data) => {
    try {
      const cache = await caches.open('deeds3-data');
      const response = new Response(JSON.stringify(data));
      await cache.put(key, response);
      return true;
    } catch (error) {
      console.error('Error caching data:', error);
      return false;
    }
  }, []);

  return {
    // Installation state
    isInstallable,
    isInstalled,
    installApp,
    addToHomeScreen,
    
    // Network state
    isOnline,
    
    // Updates
    updateAvailable,
    updateApp,
    
    // Sharing
    shareApp,
    
    // Device info
    getDeviceInfo,
    
    // Notifications
    requestNotificationPermission,
    sendNotification,
    
    // Offline storage
    getCachedData,
    setCachedData
  };
};
