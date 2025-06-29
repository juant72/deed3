import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PropertyCard3D = ({ property, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState('image'); // 'image', '3d', 'ar'
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const propertyImages = [
    property.image || `/portfolio/portfolio-${(index % 10) + 1}.jpg`,
    `/portfolio/portfolio-${((index + 1) % 10) + 1}.jpg`,
    `/portfolio/portfolio-${((index + 2) % 10) + 1}.jpg`,
    `/portfolio/portfolio-${((index + 3) % 10) + 1}.jpg`
  ];

  const propertyFeatures = [
    { icon: '🏠', label: 'Sq Ft', value: property.sqft || '2,450' },
    { icon: '🛏️', label: 'Bedrooms', value: property.bedrooms || '4' },
    { icon: '🚿', label: 'Bathrooms', value: property.bathrooms || '3' },
    { icon: '🚗', label: 'Parking', value: property.parking || '2' }
  ];

  const investmentData = {
    tokenPrice: property.tokenPrice || '0.001',
    totalTokens: property.totalTokens || '1000',
    availableTokens: property.availableTokens || '750',
    expectedROI: property.expectedROI || '12.5',
    rentalYield: property.rentalYield || '8.2'
  };

  const blockchainData = {
    verified: true,
    smartContract: '0x1234...5678',
    tokenStandard: 'ERC-1155',
    lastUpdated: '2 mins ago'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered) {
        setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, propertyImages.length]);

  const progress = ((investmentData.totalTokens - investmentData.availableTokens) / investmentData.totalTokens) * 100;

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-blue-400/50 transition-all duration-500 shadow-2xl">
        
        {/* Image Section with 3D Preview */}
        <div className="relative aspect-w-16 aspect-h-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={propertyImages[currentImageIndex]}
              alt={property.title || "Property"}
              className="w-full h-64 object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            
            {/* Top Bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex space-x-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.category || "Luxury"}
                </span>
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Verified
                </span>
              </div>
              
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-black/30 text-white hover:bg-red-500'
                }`}
              >
                <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* View Mode Selector */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-1 flex space-x-1">
                {['image', '3d', 'ar'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      viewMode === mode 
                        ? 'bg-white text-black' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {mode.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <div className="text-2xl font-bold">${property.price || "2.4M"}</div>
                  <div className="text-sm opacity-80">{investmentData.totalTokens} Tokens</div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-blue-600/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-blue-600 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="bg-purple-600/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-purple-600 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Navigation Dots */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {propertyImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-6">
          
          {/* Title and Location */}
          <div className="mb-4">
            <h4 className="text-white font-bold text-xl mb-2 line-clamp-1">
              {property.title || `Modern Villa ${index + 1}`}
            </h4>
            <div className="flex items-center text-gray-400 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.location || "Miami Beach, FL"}
            </div>
          </div>

          {/* Property Features */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {propertyFeatures.map((feature, i) => (
              <div key={i} className="text-center p-2 bg-slate-700/30 rounded-lg">
                <div className="text-lg">{feature.icon}</div>
                <div className="text-white text-sm font-semibold">{feature.value}</div>
                <div className="text-gray-400 text-xs">{feature.label}</div>
              </div>
            ))}
          </div>

          {/* Investment Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Investment Progress</span>
              <span className="text-emerald-400 font-semibold">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{investmentData.totalTokens - investmentData.availableTokens} tokens sold</span>
              <span>{investmentData.availableTokens} remaining</span>
            </div>
          </div>

          {/* ROI and Yield */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-emerald-600/20 rounded-lg p-3 text-center">
              <div className="text-emerald-400 font-bold text-lg">{investmentData.expectedROI}%</div>
              <div className="text-emerald-300 text-xs">Expected ROI</div>
            </div>
            <div className="bg-blue-600/20 rounded-lg p-3 text-center">
              <div className="text-blue-400 font-bold text-lg">{investmentData.rentalYield}%</div>
              <div className="text-blue-300 text-xs">Rental Yield</div>
            </div>
          </div>

          {/* Blockchain Verification */}
          <div className="bg-slate-700/30 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-semibold text-sm">Blockchain Verified</span>
              </div>
              <span className="text-gray-400 text-xs">{blockchainData.lastUpdated}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Contract: {blockchainData.smartContract}</span>
              <span>{blockchainData.tokenStandard}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/detail?id=${property.id || index}`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              View Details
            </Link>
            <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Invest Now
            </button>
          </div>

          {/* Quick Investment */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-sm">Quick Buy:</span>
                <div className="text-white font-semibold">{investmentData.tokenPrice} MATIC/token</div>
              </div>
              <div className="flex space-x-1">
                {[1, 5, 10].map((amount) => (
                  <button 
                    key={amount}
                    className="bg-slate-700 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard3D;
