import React, { useState, useEffect, useCallback } from "react";
import { WifiOff, Wifi, RefreshCw, AlertCircle } from 'lucide-react';

interface OfflineAction {
  id: number;
  type: string;
  data: any;
  timestamp: string;
  status: 'pending' | 'synced' | 'error';
}

const OfflineExperience: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineActions, setOfflineActions] = useState<OfflineAction[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // const addOfflineAction = useCallback((type: string, data: any) => {
  //   const action: OfflineAction = {
  //     id: Date.now(),
  //     type,
  //     data,
  //     timestamp: new Date().toISOString(),
  //     status: 'pending'
  //   };
  //   
  //   setOfflineActions(prev => [...prev, action]);
  // }, []);

  const syncOfflineActions = useCallback(async () => {
    if (offlineActions.length === 0) return;
    
    setSyncStatus('syncing');
    
    try {
      // Simulate API sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOfflineActions([]);
      setSyncStatus('idle');
    } catch {
      setSyncStatus('error');
    }
  }, [offlineActions]);

  // Auto sync when coming online
  useEffect(() => {
    if (isOnline && offlineActions.length > 0) {
      syncOfflineActions();
    }
  }, [isOnline, offlineActions.length, syncOfflineActions]);

  if (isOnline) {
    return (
      <div className="flex items-center space-x-2 text-green-500 text-sm">
        <Wifi size={16} />
        <span>Online</span>
        {syncStatus === 'syncing' && (
          <>
            <RefreshCw size={16} className="animate-spin" />
            <span>Syncing...</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-4">
      <div className="flex items-center space-x-2 text-yellow-700 mb-3">
        <WifiOff size={20} />
        <span className="font-medium">You&apos;re offline</span>
      </div>
      
      <p className="text-yellow-600 text-sm mb-3">
        You can continue browsing. Your actions will be saved and synced when you&apos;re back online.
      </p>
      
      {offlineActions.length > 0 && (
        <div className="bg-yellow-100 rounded p-3">
          <div className="flex items-center space-x-2 text-yellow-700 mb-2">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">
              {offlineActions.length} action(s) pending sync
            </span>
          </div>
          
          <div className="space-y-1">
            {offlineActions.slice(0, 3).map((action) => (
              <div key={action.id} className="text-xs text-yellow-600">
                • {action.type} - {new Date(action.timestamp).toLocaleTimeString()}
              </div>
            ))}
            {offlineActions.length > 3 && (
              <div className="text-xs text-yellow-600">
                ...and {offlineActions.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Hook simplificado para uso offline
export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOfflineAction = useCallback((type: string, data: any) => {
    if (!isOnline) {
      // Store in localStorage for persistence
      const offlineActions = JSON.parse(localStorage.getItem('offlineActions') || '[]');
      offlineActions.push({
        id: Date.now(),
        type,
        data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('offlineActions', JSON.stringify(offlineActions));
      return { success: true, offline: true };
    }
    return { success: false, offline: false };
  }, [isOnline]);

  return {
    isOnline,
    handleOfflineAction,
    canCache: 'caches' in window
  };
};

export default OfflineExperience;