/**
 * ModernHero - TypeScript version with proper prop types
 * Sprint 4: Mobile-First Optimization
 */

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Type definitions
export interface MarketData {
  totalVolume: string;
  avgROI: string;
  activeProperties: number;
}

export interface ModernHeroProps {
  marketData?: MarketData;
  propertyCount?: number;
}

const ModernHero: React.FC<ModernHeroProps> = React.memo(({ marketData, propertyCount }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Memoize static data to prevent re-renders
  const heroSlides = useMemo(() => [
    {
      title: "Encrypia Deeds3",
      subtitle: "Next-Generation Real Estate Tokenization",
      description: "The institutional-grade platform for Web3 real estate investment and tokenization",
      cta: "Start Investing",
      image: "/portfolio/hero-tokenize.jpg",
      stats: { label: "Properties Tokenized", value: "2,847" }
    },
    {
      title: "Fractional Ownership",
      subtitle: "Own Premium Real Estate from $100",
      description: "Invest in high-value properties through fractionalized tokens on Encrypia",
      cta: "Browse Assets",
      image: "/portfolio/hero-fractional.jpg",
      stats: { label: "Total Value Locked", value: "$124.8M" }
    },
    {
      title: "Global Marketplace",
      subtitle: "Trade Property Tokens 24/7",
      description: "Institutional-grade liquidity for real estate investments worldwide",
      cta: "Explore Market",
      image: "/portfolio/hero-marketplace.jpg",
      stats: { label: "Daily Volume", value: "$8.2M" }
    }
  ], []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleConnect = useCallback(() => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => setIsConnecting(false), 2000);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const currentHero = heroSlides[currentSlide];

  // Safety check to prevent undefined access
  if (!currentHero) {
    return null;
  }

  return (
    <motion.section 
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/bg/pattern-grid.svg')] opacity-30"></div>
        <motion.div 
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            variants={itemVariants}
          >
            {/* Slide indicator */}
            <div className="flex space-x-2 justify-center lg:justify-start mb-4">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-purple-400 w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Main content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {currentHero.title}
              </h1>
              <h2 className="text-xl lg:text-2xl text-purple-300 mb-6 font-medium">
                {currentHero.subtitle}
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                {currentHero.description}
              </p>
            </motion.div>

            {/* Market stats */}
            {marketData && (
              <motion.div 
                className="grid grid-cols-3 gap-6 py-6 border-t border-b border-gray-700"
                variants={itemVariants}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{marketData.totalVolume}</div>
                  <div className="text-sm text-gray-400">Total Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{marketData.avgROI}</div>
                  <div className="text-sm text-gray-400">Avg ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{marketData.activeProperties}</div>
                  <div className="text-sm text-gray-400">Active Properties</div>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Link href="/explor">
                <motion.button
                  className="btn-primary px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentHero.cta}
                </motion.button>
              </Link>
              
              <motion.button
                onClick={handleConnect}
                disabled={isConnecting}
                className="btn-secondary px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isConnecting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </span>
                ) : (
                  'Connect Wallet'
                )}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Property Card Mockup */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-white/60 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                    <div className="text-sm">Property Visualization</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Luxury Villa</span>
                    <span className="text-green-400 font-bold">$2.4M</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>ROI: 12.5%</span>
                    <span>{currentHero.stats.value}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-purple-500/20 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-xs text-gray-400">75% funded</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +12.5% ROI
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {propertyCount || 0} Properties
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </motion.section>
  );
});

ModernHero.displayName = 'ModernHero';

export default ModernHero;
