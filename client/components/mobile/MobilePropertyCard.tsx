import React, { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  TrendingUp,
  Eye,
  ChevronRight,
  Verified,
  Clock
} from 'lucide-react';
import { useTouch } from '../../hooks/useTouch';
import { useUIOptimizations } from '../../hooks/useUIOptimizations';
import { ScreenReaderOnly } from '../a11y/AccessibilityComponents';

const MobilePropertyCard: React.FC<any> = ({ 
  property, 
  onFavorite, 
  onShare, 
  onView,
  isFavorited = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { shouldReduceMotion, vibrate } = useUIOptimizations();

  const { bindTouch } = useTouch({
    onTap: () => {
      vibrate([5]);
      onView?.(property);
    },
    onSwipe: ({ direction }) => {
      if (direction === 'left') {
        vibrate([10, 5, 10]);
        onFavorite?.(property);
      } else if (direction === 'right') {
        vibrate([5, 2, 5]);
        onShare?.(property);
      }
    },
    onLongPress: () => {
      vibrate([20, 10, 20]);
      setIsExpanded(!isExpanded);
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    expanded: {
      scale: shouldReduceMotion ? 1 : 1.02,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }
    }
  };

  return (
    <motion.article
      {...bindTouch()}
      className={`
        relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden
        border border-gray-200 dark:border-slate-700 touch-manipulation
        ${className}
      `}
      variants={cardVariants}
      initial="hidden"
      animate={isExpanded ? "expanded" : "visible"}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      aria-label={`Property: ${property.title}`}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView?.(property);
        }
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 dark:bg-slate-700 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 animate-pulse" />
        )}
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.image || '/placeholder-property.jpg'}
          alt={`${property.title} exterior view`}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top Actions */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {/* Verification Badge */}
          <motion.div
            className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
          >
            <Verified className="w-3 h-3" />
            <span>Verified</span>
            <ScreenReaderOnly>Blockchain verified property</ScreenReaderOnly>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <motion.button
              className={`
                p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all
                ${isFavorited 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
                }
              `}
              onClick={(e) => {
                e.stopPropagation();
                vibrate([10]);
                onFavorite?.(property);
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} 
                strokeWidth={2}
              />
            </motion.button>

            <motion.button
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                vibrate([5]);
                onShare?.(property);
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              aria-label="Share property"
            >
              <Share2 className="w-4 h-4" strokeWidth={2} />
            </motion.button>
          </div>
        </div>

        {/* Price Tag */}
        <motion.div
          className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-lg"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
        >
          {formatPrice(property.price)}
          <ScreenReaderOnly>Property price</ScreenReaderOnly>
        </motion.div>

        {/* View Count */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
          <Eye className="w-3 h-3" />
          <span>{property.views || 0}</span>
          <ScreenReaderOnly>views</ScreenReaderOnly>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bedrooms}</span>
            <ScreenReaderOnly>bedrooms</ScreenReaderOnly>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bathrooms}</span>
            <ScreenReaderOnly>bathrooms</ScreenReaderOnly>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.area}</span>
            <ScreenReaderOnly>square feet</ScreenReaderOnly>
          </div>
        </div>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="border-t border-gray-200 dark:border-slate-600 pt-3 mt-3">
            {/* Investment Details */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                <div>
                  <div className="text-xs">ROI</div>
                  <div className="text-sm font-medium text-green-500">
                    +{property.roi || '12.5'}%
                  </div>
                </div>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                <div>
                  <div className="text-xs">Listed</div>
                  <div className="text-sm font-medium">
                    {property.daysListed || '5'} days
                  </div>
                </div>
              </div>
            </div>

            {/* Tokenization Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Token Price
                </span>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  ${property.tokenPrice || '100'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Available Tokens
                </span>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {property.availableTokens || '2,500'} / {property.totalTokens || '5,000'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-600">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>

          <motion.button
            className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium touch-target"
            onClick={(e) => {
              e.stopPropagation();
              vibrate([10, 5, 10]);
              onView?.(property);
            }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label={`View details for ${property.title}`}
          >
            <span>View</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Swipe Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        <div className="w-1 h-1 bg-white/50 rounded-full" />
        <div className="w-1 h-1 bg-white/50 rounded-full" />
        <div className="w-1 h-1 bg-white/50 rounded-full" />
      </div>

      {/* Touch Hint */}
      <ScreenReaderOnly>
        Tap to view details, swipe left to favorite, swipe right to share, long press for more options
      </ScreenReaderOnly>
    </motion.article>
  );
};

export default React.memo(MobilePropertyCard);
