/**
 * OfflineExperience - Experiencia offline avanzada para PWA
 * Sprint 4: Mobile-First Optimization
 */

import React, { useState, useEffect } from 'react';
import { usePWA } from '@/hooks/usePWA';

const OfflineExperience = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineActions, setOfflineActions] = useState([]);
  const [syncStatus, setSyncStatus] = useState('idle');
  const { isInstalled, canInstall } = usePWA();

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineActions();
    };
    
    const handleOffline = () => setIsOnline(false);

    // Establecer estado inicial
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sincronizar acciones offline cuando vuelve la conexión
  const syncOfflineActions = async () => {
    if (offlineActions.length === 0) return;

    setSyncStatus('syncing');
    
    try {
      for (const action of offlineActions) {
        await processOfflineAction(action);
      }
      
      setOfflineActions([]);
      setSyncStatus('synced');
      
      // Mostrar notificación de sincronización exitosa
      showSyncNotification('success');
      
    } catch (error) {
      console.error('Error syncing offline actions:', error);
      setSyncStatus('error');
      showSyncNotification('error');
    }
  };

  // Procesar acción offline individual
  const processOfflineAction = async (action) => {
    switch (action.type) {
      case 'property_favorite':
        await syncPropertyFavorite(action.data);
        break;
      case 'wallet_connect':
        await syncWalletConnection(action.data);
        break;
      case 'form_submission':
        await syncFormData(action.data);
        break;
      default:
        console.warn('Unknown offline action type:', action.type);
    }
  };

  // Sincronizar favoritos de propiedades
  const syncPropertyFavorite = async (data) => {
    // Implementar sincronización con backend
    const response = await fetch('/api/properties/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to sync favorite');
  };

  // Sincronizar conexión de wallet
  const syncWalletConnection = async (data) => {
    // Implementar reconexión de wallet
    console.log('Syncing wallet connection:', data);
  };

  // Sincronizar datos de formularios
  const syncFormData = async (data) => {
    const response = await fetch(data.endpoint, {
      method: data.method || 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.payload)
    });
    
    if (!response.ok) throw new Error('Failed to sync form data');
  };

  // Agregar acción para sincronizar cuando vuelva la conexión
  const addOfflineAction = (type, data) => {
    const action = {
      id: Date.now(),
      type,
      data,
      timestamp: new Date().toISOString()
    };
    
    setOfflineActions(prev => [...prev, action]);
    
    // Guardar en localStorage para persistencia
    const storedActions = JSON.parse(localStorage.getItem('offlineActions') || '[]');
    localStorage.setItem('offlineActions', JSON.stringify([...storedActions, action]));
  };

  // Cargar acciones offline del localStorage
  useEffect(() => {
    const storedActions = JSON.parse(localStorage.getItem('offlineActions') || '[]');
    setOfflineActions(storedActions);
  }, []);

  // Mostrar notificación de sincronización
  const showSyncNotification = (type) => {
    const message = type === 'success' 
      ? 'Datos sincronizados exitosamente'
      : 'Error al sincronizar datos';
      
    // Usar toast notification si está disponible
    if (window.toast) {
      window.toast[type](message);
    } else {
      console.log(message);
    }
  };

  // Hook para uso desde otros componentes
  const handleOfflineAction = (type, data) => {
    if (!isOnline) {
      addOfflineAction(type, data);
      return false; // Indica que la acción se guardó para después
    }
    return true; // Indica que se puede procesar inmediatamente
  };

  // Componente de banner offline
  const OfflineBanner = () => (
    <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white px-4 py-2 text-center text-sm z-50">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span>Sin conexión - Los cambios se guardarán localmente</span>
        {offlineActions.length > 0 && (
          <span className="bg-orange-600 px-2 py-1 rounded text-xs">
            {offlineActions.length} pendientes
          </span>
        )}
      </div>
    </div>
  );

  // Componente de estado de sincronización
  const SyncStatus = () => (
    syncStatus !== 'idle' && (
      <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
        <div className="flex items-center space-x-2 text-sm">
          {syncStatus === 'syncing' && (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <span>Sincronizando...</span>
            </>
          )}
          {syncStatus === 'synced' && (
            <>
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-600">Sincronizado</span>
            </>
          )}
          {syncStatus === 'error' && (
            <>
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-red-600">Error al sincronizar</span>
            </>
          )}
        </div>
      </div>
    )
  );

  // Cache de datos críticos para offline
  const CacheManager = {
    // Cachear propiedades visitadas
    cacheProperty: (property) => {
      const cached = JSON.parse(localStorage.getItem('cachedProperties') || '{}');
      cached[property.id] = {
        ...property,
        cachedAt: new Date().toISOString()
      };
      localStorage.setItem('cachedProperties', JSON.stringify(cached));
    },

    // Obtener propiedad del cache
    getCachedProperty: (propertyId) => {
      const cached = JSON.parse(localStorage.getItem('cachedProperties') || '{}');
      return cached[propertyId];
    },

    // Limpiar cache antiguo (>7 días)
    cleanOldCache: () => {
      const cached = JSON.parse(localStorage.getItem('cachedProperties') || '{}');
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      Object.keys(cached).forEach(id => {
        if (new Date(cached[id].cachedAt) < sevenDaysAgo) {
          delete cached[id];
        }
      });
      
      localStorage.setItem('cachedProperties', JSON.stringify(cached));
    }
  };

  // Auto-limpiar cache en mount
  useEffect(() => {
    CacheManager.cleanOldCache();
  }, []);

  return (
    <>
      {!isOnline && <OfflineBanner />}
      <SyncStatus />
      
      {/* Contexto global para offline actions */}
      <div id="offline-context" style={{ display: 'none' }}>
        {JSON.stringify({
          isOnline,
          offlineActions: offlineActions.length,
          handleOfflineAction,
          CacheManager
        })}
      </div>
    </>
  );
};

// Hook personalizado para usar la funcionalidad offline
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

  const handleOfflineAction = (type, data) => {
    const context = document.getElementById('offline-context');
    if (context) {
      const { handleOfflineAction } = JSON.parse(context.textContent);
      return handleOfflineAction(type, data);
    }
    return isOnline;
  };

  return {
    isOnline,
    handleOfflineAction,
    canCache: !isOnline
  };
};

export default OfflineExperience;
