import { useState, useEffect, useRef, useCallback } from 'react';

export const useTouch = ({ 
  onSwipe, 
  onPinch, 
  onTap, 
  onDoubleTap, 
  onLongPress,
  threshold = 50,
  longPressDelay = 500 
} = {}) => {
  const [touchData, setTouchData] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    distance: 0,
    direction: null,
    isMultiTouch: false,
    scale: 1,
    rotation: 0
  });

  const touchRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastTapRef = useRef(0);
  const gestureRef = useRef({
    startDistance: 0,
    startAngle: 0,
    lastScale: 1,
    lastRotation: 0
  });

  // Calculate distance between two touch points
  const calculateDistance = useCallback((touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Calculate angle between two touch points
  const calculateAngle = useCallback((touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }, []);

  // Calculate swipe direction
  const getSwipeDirection = useCallback((startX, startY, endX, endY) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < threshold) return null;

    if (absDx > absDy) {
      return dx > 0 ? 'right' : 'left';
    } else {
      return dy > 0 ? 'down' : 'up';
    }
  }, [threshold]);

  // Haptic feedback
  const vibrate = useCallback((pattern = [10]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  // Touch start handler
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const now = Date.now();

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTouchData(prev => ({
      ...prev,
      startX: touch.clientX,
      startY: touch.clientY,
      endX: touch.clientX,
      endY: touch.clientY,
      isMultiTouch: e.touches.length > 1
    }));

    // Handle multi-touch gestures
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      gestureRef.current.startDistance = calculateDistance(touch1, touch2);
      gestureRef.current.startAngle = calculateAngle(touch1, touch2);
    }

    // Setup long press detection
    if (onLongPress) {
      timeoutRef.current = setTimeout(() => {
        vibrate([20, 10, 20]);
        onLongPress({
          x: touch.clientX,
          y: touch.clientY,
          target: e.target
        });
      }, longPressDelay);
    }

    // Detect double tap
    if (onDoubleTap && now - lastTapRef.current < 300) {
      vibrate([5, 5, 5]);
      onDoubleTap({
        x: touch.clientX,
        y: touch.clientY,
        target: e.target
      });
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, [onLongPress, onDoubleTap, longPressDelay, calculateDistance, calculateAngle, vibrate]);

  // Touch move handler
  const handleTouchMove = useCallback((e) => {
    e.preventDefault(); // Prevent scrolling during gestures
    
    const touch = e.touches[0];

    setTouchData(prev => ({
      ...prev,
      endX: touch.clientX,
      endY: touch.clientY
    }));

    // Handle pinch/zoom gestures
    if (e.touches.length === 2 && onPinch) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = calculateDistance(touch1, touch2);
      const currentAngle = calculateAngle(touch1, touch2);
      
      const scale = currentDistance / gestureRef.current.startDistance;
      const rotation = currentAngle - gestureRef.current.startAngle;

      setTouchData(prev => ({
        ...prev,
        scale,
        rotation
      }));

      onPinch({
        scale,
        rotation,
        centerX: (touch1.clientX + touch2.clientX) / 2,
        centerY: (touch1.clientY + touch2.clientY) / 2,
        deltaScale: scale - gestureRef.current.lastScale,
        deltaRotation: rotation - gestureRef.current.lastRotation
      });

      gestureRef.current.lastScale = scale;
      gestureRef.current.lastRotation = rotation;
    }

    // Clear long press if finger moves too much
    if (timeoutRef.current) {
      const dx = Math.abs(touch.clientX - touchData.startX);
      const dy = Math.abs(touch.clientY - touchData.startY);
      if (dx > 10 || dy > 10) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [onPinch, calculateDistance, calculateAngle, touchData.startX, touchData.startY]);

  // Touch end handler
  const handleTouchEnd = useCallback((e) => {
    // Clear long press timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const { startX, startY, endX, endY } = touchData;
    const direction = getSwipeDirection(startX, startY, endX, endY);
    const distance = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );

    // Handle swipe gestures
    if (direction && onSwipe && distance >= threshold) {
      vibrate([10]);
      onSwipe({
        direction,
        distance,
        startX,
        startY,
        endX,
        endY,
        velocity: distance / (e.timeStamp - (e.timeStamp - 300)) // Approximate velocity
      });
    }

    // Handle tap
    if (!direction && onTap && distance < 10) {
      vibrate([5]);
      onTap({
        x: endX,
        y: endY,
        target: e.target
      });
    }

    // Reset gesture state
    gestureRef.current = {
      startDistance: 0,
      startAngle: 0,
      lastScale: 1,
      lastRotation: 0
    };

    setTouchData(prev => ({
      ...prev,
      direction,
      distance,
      isMultiTouch: false,
      scale: 1,
      rotation: 0
    }));
  }, [touchData, getSwipeDirection, onSwipe, onTap, threshold, vibrate]);

  // Attach event listeners
  useEffect(() => {
    const element = touchRef.current;
    if (!element) return;

    const options = { passive: false };

    element.addEventListener('touchstart', handleTouchStart, options);
    element.addEventListener('touchmove', handleTouchMove, options);
    element.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart, options);
      element.removeEventListener('touchmove', handleTouchMove, options);
      element.removeEventListener('touchend', handleTouchEnd, options);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Touch utility functions
  const bindTouch = useCallback((callbacks = {}) => {
    return {
      ref: touchRef,
      onTouchStart: (e) => {
        handleTouchStart(e);
        callbacks.onTouchStart?.(e);
      },
      onTouchMove: (e) => {
        handleTouchMove(e);
        callbacks.onTouchMove?.(e);
      },
      onTouchEnd: (e) => {
        handleTouchEnd(e);
        callbacks.onTouchEnd?.(e);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Device capabilities
  const capabilities = {
    hasTouch: 'ontouchstart' in window,
    hasVibration: 'vibrate' in navigator,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    isMultiTouchDevice: (navigator.maxTouchPoints || 0) > 1
  };

  return {
    touchRef,
    touchData,
    bindTouch,
    vibrate,
    capabilities,
    
    // Gesture utilities
    isGesturing: touchData.isMultiTouch,
    swipeDirection: touchData.direction,
    swipeDistance: touchData.distance,
    pinchScale: touchData.scale,
    rotation: touchData.rotation
  };
};
