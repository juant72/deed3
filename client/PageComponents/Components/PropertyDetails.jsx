import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign,
  Home,
  Users,
  Star,
  Award,
  Lock,
  Zap,
  Eye,
  Heart,
  Share2,
  Download
} from 'lucide-react';
import PropertyVisualization from './PropertyVisualization';

const PropertyDetails = ({ property, isDetailPage = false }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFullscreenVisualization, setIsFullscreenVisualization] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('verified');
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    // Simulate blockchain verification check
    const checkVerification = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVerificationStatus('verified');
    };
    
    // Mock price history
    setPriceHistory([
      { date: '2024-01', price: 450000 },
      { date: '2024-02', price: 465000 },
      { date: '2024-03', price: 480000 },
      { date: '2024-04', price: 492000 },
      { date: '2024-05', price: 510000 },
      { date: '2024-06', price: 525000 }
    ]);

    checkVerification();
  }, []);

  const verificationBadges = [
    { label: 'Blockchain Verified', icon: Shield, status: 'verified', color: 'green' },
    { label: 'Title Confirmed', icon: CheckCircle, status: 'verified', color: 'blue' },
    { label: 'Ownership Clear', icon: Lock, status: 'verified', color: 'purple' },
    { label: 'Valuation Certified', icon: Award, status: 'verified', color: 'yellow' }
  ];

  const propertyFeatures = [
    { label: 'Bedrooms', value: property?.bedrooms || '3', icon: Home },
    { label: 'Bathrooms', value: property?.bathrooms || '2', icon: Users },
    { label: 'Square Feet', value: property?.sqft || '2,450', icon: TrendingUp },
    { label: 'Year Built', value: property?.yearBuilt || '2020', icon: Calendar }
  ];

  const investmentMetrics = [
    { label: 'ROI Potential', value: '+12.5%', trend: 'up', color: 'green' },
    { label: 'Rental Yield', value: '8.2%', trend: 'up', color: 'blue' },
    { label: 'Market Growth', value: '+15.3%', trend: 'up', color: 'purple' },
    { label: 'Liquidity Score', value: '9.1/10', trend: 'stable', color: 'yellow' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">
      {/* Property Header */}
      <div className="relative">
        <PropertyVisualization 
          property={property}
          isFullscreen={isFullscreenVisualization}
          onFullscreenToggle={() => setIsFullscreenVisualization(!isFullscreenVisualization)}
        />
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
              isFavorited 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-black/30 text-white hover:bg-black/50'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 bg-black/30 text-white hover:bg-black/50 rounded-lg backdrop-blur-sm transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-black/30 text-white hover:bg-black/50 rounded-lg backdrop-blur-sm transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>

        {/* View Counter */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <Eye className="w-4 h-4" />
          <span className="text-sm">1,247 views</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Property Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {property?.title || 'Luxury Downtown Penthouse'}
            </h1>
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{property?.location || 'Manhattan, New York'}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-400 ml-1">4.9 (127 reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white mb-1">
              {property?.price || '$525,000'}
            </div>
            <div className="text-sm text-green-400">
              +$15,000 (+2.9%) this month
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Last updated: 2 hours ago
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Blockchain Verification</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {verificationBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-2 p-3 rounded-lg border ${getStatusColor(badge.status)} border-current/20`}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="text-sm font-medium">{badge.label}</div>
                    <div className="text-xs opacity-75">Verified</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Property Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Property Details</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {propertyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white">{feature.value}</div>
                      <div className="text-sm text-gray-400">{feature.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Investment Analysis</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {investmentMetrics.map((metric) => (
              <div key={metric.label} className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">{metric.label}</div>
                  <TrendingUp className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                </div>
                <div className={`text-xl font-bold ${getTrendColor(metric.trend)}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tokenization Info */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Tokenized Real Estate</h3>
              <p className="text-sm text-gray-400">Fractional ownership available</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-400">Total Tokens</div>
              <div className="text-xl font-bold text-white">10,000 DEED</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Available</div>
              <div className="text-xl font-bold text-green-400">3,250 DEED</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Min. Investment</div>
              <div className="text-xl font-bold text-blue-400">100 DEED</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Token Price</span>
              <span className="text-lg font-semibold text-white">$52.50 USDC</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
            Invest Now
          </button>
          <button className="flex-1 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 py-3 px-6 rounded-lg font-medium transition-colors">
            Schedule Tour
          </button>
          <button className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg font-medium transition-colors">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
