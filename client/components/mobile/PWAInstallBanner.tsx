import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor, ArrowDown } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';
import { useUIOptimizations } from '../../hooks/useUIOptimizations';

const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, installApp, getDeviceInfo } = usePWA();
  const { shouldReduceMotion } = useUIOptimizations();
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const info = getDeviceInfo();
    setDeviceInfo(info);
    
    // Show banner if app is installable and not already installed
    if (isInstallable && !isInstalled && !info.standalone) {
      // Delay showing banner to avoid interrupting user
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, getDeviceInfo]);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        setShowBanner(false);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss: React.FC = () => {
    setShowBanner(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Don't show if already dismissed this session
  useEffect(() => {
    if (sessionStorage.getItem('pwa-banner-dismissed')) {
      setShowBanner(false);
    }
  }, []);

  if (!showBanner || isInstalled || !deviceInfo) return null;

  const bannerVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      y: 100, 
      opacity: 0,
      scale: 0.9,
      transition: shouldReduceMotion ? { duration: 0 } : {
        duration: 0.2
      }
    }
  };

  const getInstallInstructions: React.FC = () => {
    if (deviceInfo.isIOS) {
      return {
        icon: ArrowDown,
        title: "Add to Home Screen",
        description: "Tap the share button below and select 'Add to Home Screen'",
        buttonText: "Learn How"
      };
    } else {
      return {
        icon: Download,
        title: "Install Deeds3 App",
        description: "Get the full app experience with offline access and notifications",
        buttonText: "Install Now"
      };
    }
  };

  const instructions = getInstallInstructions();
  const DeviceIcon = deviceInfo.isMobile ? Smartphone : Monitor;

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
          />

          {/* Banner */}
          <motion.div
            className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            
            <div className="relative p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <DeviceIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{instructions.title}</h3>
                    <p className="text-gray-300 text-sm">{instructions.description}</p>
                  </div>
                </div>
                
                <motion.button
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={handleDismiss}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  aria-label="Dismiss banner"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <span className="text-green-400 text-sm">⚡</span>
                  </div>
                  <span className="text-gray-300 text-xs">Faster</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <span className="text-blue-400 text-sm">📱</span>
                  </div>
                  <span className="text-gray-300 text-xs">Native Feel</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <span className="text-purple-400 text-sm">🔔</span>
                  </div>
                  <span className="text-gray-300 text-xs">Notifications</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  className={`
                    flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold
                    flex items-center justify-center space-x-2 transition-all duration-200
                    ${isInstalling ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/25'}
                  `}
                  onClick={deviceInfo.isIOS ? () => {
                    // Show iOS instructions modal
                    setShowBanner(false);
                  } : handleInstall}
                  disabled={isInstalling}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  {isInstalling ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Installing...</span>
                    </>
                  ) : (
                    <>
                      <instructions.icon className="w-5 h-5" />
                      <span>{instructions.buttonText}</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  className="px-4 py-3 bg-slate-700/50 text-gray-300 rounded-xl font-medium hover:bg-slate-600/50 transition-colors"
                  onClick={handleDismiss}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  Maybe Later
                </motion.button>
              </div>

              {/* iOS Instructions */}
              {deviceInfo.isIOS && (
                <div className="mt-3 p-3 bg-slate-800/50 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <ArrowDown className="w-4 h-4" />
                    <span>Tap the share button in Safari, then scroll down and tap &ldquo;Add to Home Screen&rdquo;</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(PWAInstallBanner);
