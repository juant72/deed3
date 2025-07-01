"use client"

import React, { useState, useEffect, createContext, useContext } from 'react';
import Alert, { AlertProps } from './Alert';

type AlertWithId = AlertProps & { id: string };

interface AlertContextValue {
  alerts: AlertWithId[];
  addAlert: (alert: Omit<AlertProps, 'id'>) => string;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

// Create context for alerts
const AlertContext = createContext<AlertContextValue | undefined>(undefined);

// Hook for using alerts in components
export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

// Generate unique ID for each alert
const generateId = () => `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

interface AlertProviderProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxAlerts?: number;
}

// Provider component
export const AlertProvider: React.FC<AlertProviderProps> = ({ 
  children, 
  position = 'top-right', 
  maxAlerts = 5 
}) => {
  const [alerts, setAlerts] = useState<AlertWithId[]>([]);
  
  // Position styles
  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50 space-y-3 w-80',
    'top-left': 'fixed top-4 left-4 z-50 space-y-3 w-80',
    'bottom-right': 'fixed bottom-4 right-4 z-50 space-y-3 w-80',
    'bottom-left': 'fixed bottom-4 left-4 z-50 space-y-3 w-80',
    'top-center': 'fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-3 w-80',
    'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50 space-y-3 w-80',
  };
  
  // Add a new alert
  const addAlert = (alert: Omit<AlertProps, 'id'>) => {
    const id = generateId();
    
    // Create the new alert with ID
    const newAlert: AlertWithId = {
      ...alert,
      id
    };
    
    // Add to state, respecting maxAlerts limit
    setAlerts(currentAlerts => {
      const updatedAlerts = [newAlert, ...currentAlerts];
      return updatedAlerts.slice(0, maxAlerts);
    });
    
    return id;
  };
  
  // Remove a specific alert by ID
  const removeAlert = (id: string) => {
    setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
  };
  
  // Clear all alerts
  const clearAlerts = () => {
    setAlerts([]);
  };
  
  const value: AlertContextValue = {
    alerts,
    addAlert,
    removeAlert,
    clearAlerts
  };
  
  return (
    <AlertContext.Provider value={value}>
      {children}
      
      {/* Alert container */}
      <div className={positionClasses[position]}>
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            {...alert}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export default AlertContext;
