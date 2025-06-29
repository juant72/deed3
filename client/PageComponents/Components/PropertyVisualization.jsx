import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize, RotateCcw, Eye, Map, BarChart3, Camera, Home, Activity } from 'lucide-react';

const PropertyVisualization = React.memo(({ property, isFullscreen = false, onFullscreenToggle }) => {
  const [activeView, setActiveView] = useState('3d');
  const [isLoading, setIsLoading] = useState(false);
  const [vrMode, setVrMode] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Memoize analytics data to prevent infinite re-renders
  const defaultAnalytics = useMemo(() => ({
    priceHistory: [
      { month: 'Jan', price: 450000 },
      { month: 'Feb', price: 465000 },
      { month: 'Mar', price: 480000 },
      { month: 'Apr', price: 492000 },
      { month: 'May', price: 510000 },
      { month: 'Jun', price: 525000 }
    ],
    marketTrends: {
      appreciation: '+12.3%',
      avgDays: 28,
      comparables: 15
    },
    aiInsights: [
      'Property value increased 16% above market average',
      'High rental yield potential in this area',
      'Excellent schools within 2km radius'
    ]
  }), []);

  // Initialize analytics data only once
  useEffect(() => {
    if (!analyticsData) {
      setAnalyticsData(defaultAnalytics);
    }
  }, [analyticsData, defaultAnalytics]);

  const viewOptions = [
    { id: '3d', label: '3D View', icon: Home, description: 'Interactive 3D model' },
    { id: 'virtual', label: 'Virtual Tour', icon: Camera, description: 'Immersive walkthrough' },
    { id: 'map', label: 'Location', icon: Map, description: 'Interactive map view' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Market insights' }
  ];

  const handleViewChange = useCallback(async (viewId) => {
    setIsLoading(true);
    setActiveView(viewId);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case '3d':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Home className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3D Model Loading...</h3>
                <p className="text-gray-400">Interactive 3D visualization coming soon</p>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setVrMode(!vrMode)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  vrMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-black/30 text-white hover:bg-black/50'
                }`}
              >
                VR Mode
              </button>
            </div>
          </div>
        );
      
      case 'virtual':
        return (
          <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">Virtual Tour</h3>
                <p className="text-gray-400 mb-4">Experience the property in 360°</p>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
                  Start Tour
                </button>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>Living Room</span>
                  <span>1 of 12 rooms</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              {/* Simulated map */}
              <div className="w-full h-full bg-gradient-to-br from-green-900 to-blue-900 relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-white/10"></div>
                    ))}
                  </div>
                </div>
                
                {/* Property marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                    <div className="absolute -top-2 -left-2 w-12 h-12 bg-red-500/20 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                {/* Location info */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                  <h4 className="font-semibold">Downtown District</h4>
                  <p className="text-sm text-gray-300">Walk Score: 92/100</p>
                </div>
                
                {/* Nearby amenities */}
                <div className="absolute bottom-4 right-4 space-y-2">
                  {[
                    { label: 'Metro Station', distance: '0.3km' },
                    { label: 'Shopping Mall', distance: '0.8km' },
                    { label: 'School', distance: '1.2km' }
                  ].map((amenity, i) => (
                    <div key={i} className="bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white text-sm">
                      <div className="flex items-center justify-between">
                        <span>{amenity.label}</span>
                        <span className="text-green-400">{amenity.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="w-full h-full p-6 bg-slate-800 rounded-lg overflow-auto">
            <div className="space-y-6">
              {/* Market Trends */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Market Analytics</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">+12.3%</div>
                    <div className="text-sm text-gray-400">YoY Appreciation</div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">28</div>
                    <div className="text-sm text-gray-400">Avg. Days on Market</div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">15</div>
                    <div className="text-sm text-gray-400">Comparable Sales</div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <h4 className="text-md font-semibold text-white mb-3">AI-Powered Insights</h4>
                <div className="space-y-2">
                  {analyticsData?.aiInsights.map((insight, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price History Chart */}
              <div>
                <h4 className="text-md font-semibold text-white mb-3">Price History</h4>
                <div className="h-32 bg-slate-700 rounded-lg p-4 relative">
                  <div className="flex items-end justify-between h-full">
                    {analyticsData?.priceHistory.map((point, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div 
                          className="w-4 bg-blue-500 rounded-t"
                          style={{ height: `${(point.price / 600000) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-400 mt-1">{point.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bg-slate-900 rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : 'w-full h-96'}`}>
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleViewChange(option.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === option.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                  disabled={isLoading}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {}}
              className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onFullscreenToggle}
              className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative" style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '350px' }}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-slate-900"
            >
              <div className="text-center text-white">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-400">Loading {viewOptions.find(o => o.id === activeView)?.label}...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

PropertyVisualization.displayName = 'PropertyVisualization';

export default PropertyVisualization;
