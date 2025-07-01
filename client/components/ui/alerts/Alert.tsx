"use client"

import React, { useState, useEffect } from 'react';

export interface AlertProps {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in milliseconds, 0 for no auto-close
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
  id?: string;
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  type = 'info',
  duration = 5000,
  showCloseButton = true,
  onClose,
  className = '',
  id
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  // Handle alert close
  const closeAlert = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 300); // Wait for fade out animation
    }
  };
  
  // Handle auto-close with progress bar
  useEffect(() => {
    if (duration === 0) return; // No auto-close
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateProgress = () => {
      const now = Date.now();
      const remaining = endTime - now;
      
      if (remaining <= 0) {
        closeAlert();
        return;
      }
      
      const progressValue = (remaining / duration) * 100;
      setProgress(progressValue);
      requestAnimationFrame(updateProgress);
    };
    
    const animationFrame = requestAnimationFrame(updateProgress);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration]);
  
  // Alert type styles
  const alertStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500 dark:border-green-600',
      text: 'text-green-800 dark:text-green-200',
      icon: (
        <svg className="w-6 h-6 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      progressBar: 'bg-green-500 dark:bg-green-400'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-500 dark:border-red-600',
      text: 'text-red-800 dark:text-red-200',
      icon: (
        <svg className="w-6 h-6 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      progressBar: 'bg-red-500 dark:bg-red-400'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-500 dark:border-amber-600',
      text: 'text-amber-800 dark:text-amber-200',
      icon: (
        <svg className="w-6 h-6 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      ),
      progressBar: 'bg-amber-500 dark:bg-amber-400'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-500 dark:border-blue-600',
      text: 'text-blue-800 dark:text-blue-200',
      icon: (
        <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      progressBar: 'bg-blue-500 dark:bg-blue-400'
    }
  };
  
  const style = alertStyles[type];
  
  return (
    <div
      className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-2'} ${className}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      id={id}
    >
      <div className={`flex p-4 border-l-4 ${style.bg} ${style.border} rounded-md shadow-sm`}>
        <div className="flex-shrink-0 mr-3">{style.icon}</div>
        <div className="flex-1">
          {title && <h3 className={`text-base font-medium ${style.text}`}>{title}</h3>}
          <div className={`text-sm ${style.text}`}>{message}</div>
        </div>
        {showCloseButton && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${style.text} hover:bg-gray-100 dark:hover:bg-gray-800`}
            aria-label="Close"
            onClick={closeAlert}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
      {/* Progress bar */}
      {duration > 0 && (
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-b-md overflow-hidden">
          <div
            className={`h-full ${style.progressBar} transition-all`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Alert;
