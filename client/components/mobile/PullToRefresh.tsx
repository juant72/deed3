import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { RotateCcw, ArrowDown } from 'lucide-react';
const PullToRefresh: React.FC<any> = ({ 
  children, 
  onRefresh, 
  threshold = 80,
  disabled = false,
  className = ''
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const shouldReduceMotion = false;
  
  const vibrate = useCallback((pattern: number[]) => { 
    if (navigator.vibrate) navigator.vibrate(pattern); 
  }, []);
  
  const containerRef = useRef(null);
  const startY = useRef(0);
  const pullDistance = useMotionValue(0);
  
  // Transform values for animations
  const indicatorRotation = useTransform(pullDistance, [0, threshold], [0, 360]);
  const indicatorScale = useTransform(pullDistance, [0, threshold], [0, 1]);
  const containerY = useTransform(pullDistance, [0, threshold], [0, threshold]);

  const handleTouchStart = useCallback((e) => {
    if (disabled || isRefreshing) return;
    
    const touch = e.touches[0];
    startY.current = touch.clientY;
    
    // Only start pull if at top of container
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      setIsPulling(true);
    }
  }, [disabled, isRefreshing]);

  const handleTouchMove = useCallback((e) => {
    if (!isPulling || disabled || isRefreshing) return;
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY.current;
    
    if (deltaY > 0) {
      e.preventDefault(); // Prevent overscroll
      
      // Apply resistance curve
      const resistance = Math.min(deltaY / 3, threshold * 1.5);
      pullDistance.set(resistance);
      
      // Haptic feedback at threshold
      if (resistance >= threshold && pullDistance.get() < threshold) {
        vibrate([15, 5, 15]);
      }
    }
  }, [isPulling, disabled, isRefreshing, threshold, pullDistance, vibrate]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling || disabled) return;
    
    const currentPull = pullDistance.get();
    setIsPulling(false);
    
    if (currentPull >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      vibrate([20, 10, 20]);
      
      try {
        await onRefresh?.();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    // Reset pull distance
    pullDistance.set(0);
  }, [isPulling, disabled, isRefreshing, threshold, pullDistance, onRefresh, vibrate]);

  const pullIndicatorVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring" as const,
        stiffness: 400,
        damping: 30
      }
    }
  };

  const refreshingVariants = {
    animate: shouldReduceMotion ? {} : {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: disabled ? 'auto' : 'pan-x pan-down' }}
    >
      {/* Pull Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center"
        style={{ 
          height: threshold,
          y: containerY,
          marginTop: -threshold
        }}
        initial="hidden"
        animate={isPulling || isRefreshing ? "visible" : "hidden"}
        variants={pullIndicatorVariants}
      >
        <motion.div
          className={`
            flex flex-col items-center justify-center p-4 rounded-full backdrop-blur-sm
            ${isRefreshing 
              ? 'bg-blue-500/20 text-blue-600' 
              : 'bg-gray-500/20 text-gray-600'
            }
          `}
          style={{ scale: indicatorScale }}
        >
          {isRefreshing ? (
            <>
              <motion.div
                variants={refreshingVariants}
                animate="animate"
                className="mb-2"
              >
                <RotateCcw className="w-6 h-6" />
              </motion.div>
              <span className="text-sm font-medium">Refreshing...</span>
            </>
          ) : (
            <>
              <motion.div
                style={{ rotate: indicatorRotation }}
                className="mb-2"
              >
                <ArrowDown className="w-6 h-6" />
              </motion.div>
              <span className="text-sm font-medium">
                {pullDistance.get() >= threshold ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{ y: containerY }}
        className="relative z-0"
      >
        {children}
      </motion.div>

      {/* Loading Overlay */}
      {isRefreshing && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          style={{ transformOrigin: 'left' }}
        />
      )}

      {/* Accessibility Announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {isRefreshing && "Refreshing content"}
        {isPulling && pullDistance.get() >= threshold && "Release to refresh"}
      </div>
    </div>
  );
};

export default React.memo(PullToRefresh);
