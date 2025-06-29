/**
 * PropertyCard3D - Advanced 3D Property Card Component
 * Sprint 3: Property Cards Revolution - Final Version
 */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useTransform, useSpring, useAnimation } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  TrendingUp,
  Eye,
  Calendar,
  DollarSign,
  Star,
  Zap
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { usePropertyMetrics } from '../../hooks/usePropertyMetrics';
import RealTimeMetrics from '../../components/property/RealTimeMetrics';
import BlockchainBadges from '../../components/property/BlockchainBadges';

const PropertyCard3D = ({ 
  property,
  index = 0,
  isHovered = false,
  onHover = () => {},
  onFavorite = (id, favorited) => {},
  onClick = (property) => {},
  className = '',
  variant = 'default' // 'default', 'featured', 'compact'
}) => {
  // States
  const [isFavorited, setIsFavorited] = useState(property?.favorited || false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  
  // Hooks
  const [inViewRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const shouldReduceMotion = false;
  const prefersHighContrast = false;
  const { metrics } = usePropertyMetrics(property?.id);
  
  // Animations
  const controls = useAnimation();
  const springX = useSpring(0, { damping: 20, stiffness: 300 });
  const springY = useSpring(0, { damping: 20, stiffness: 300 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const scale = useTransform(springX, [-0.5, 0.5], [0.95, 1.05]);

  // Handle mouse movement for 3D effect
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || shouldReduceMotion) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
    springX.set(x);
    springY.set(y);
  }, [shouldReduceMotion, springX, springY]);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  // Handle favorite toggle
  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavorite(property?.id, !isFavorited);
  }, [isFavorited, onFavorite, property?.id]);

  // Handle card click
  const handleCardClick = useCallback(() => {
    onClick(property);
  }, [onClick, property]);

  // Animate on scroll
  useEffect(() => {
    if (inView && !shouldReduceMotion) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      });
    }
  }, [inView, controls, index, shouldReduceMotion]);

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(price);
  };

  // Get property features
  const features = [
    { icon: Bed, value: property?.bedrooms || 0, label: 'Beds' },
    { icon: Bath, value: property?.bathrooms || 0, label: 'Baths' },
    { icon: Square, value: property?.area || 0, label: 'sqft' }
  ];

  // Determine variant styles
  const variantStyles = {
    default: 'w-full max-w-sm',
    featured: 'w-full max-w-md',
    compact: 'w-full max-w-xs'
  };

  if (!property) {
    return (
      <div className="w-full max-w-sm h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
    );
  }

  return (
    <motion.div
      ref={(node) => {
        cardRef.current = node;
        inViewRef(node);
      }}
      className={`
        relative group cursor-pointer
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      whileHover={{ 
        scale: shouldReduceMotion ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: shouldReduceMotion ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <motion.div
        className="
          relative w-full h-96 
          bg-white dark:bg-gray-800 
          rounded-xl shadow-lg dark:shadow-2xl
          overflow-hidden border border-gray-200 dark:border-gray-700
          transition-all duration-300
        "
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          scale: shouldReduceMotion ? 1 : scale,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Loading skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
          )}
          
          <img
            ref={imageRef}
            src={property.image || '/placeholder-property.jpg'}
            alt={`${property.title} - Real Estate Property`}
            className={`
              w-full h-full object-cover transition-all duration-500
              ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
              group-hover:scale-110
            `}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Favorite button */}
          <motion.button
            className={`
              absolute top-3 right-3 p-2 rounded-full
              ${isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
              }
              transition-all duration-200 backdrop-blur-sm
            `}
            onClick={handleFavoriteClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              size={16} 
              fill={isFavorited ? 'currentColor' : 'none'}
            />
          </motion.button>
          
          {/* Blockchain badges */}
          <div className="absolute top-3 left-3">
            <BlockchainBadges 
              property={property}
              variant="compact"
            />
          </div>
          
          {/* View count */}
          {(property?.views || metrics?.tradingVolume) && (
            <div className="absolute bottom-3 right-3 flex items-center space-x-1 text-white text-xs bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm">
              <Eye size={12} />
              <span>{property?.views || Math.floor(metrics?.tradingVolume || 0)}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Price and title */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(property.price)}
              </span>
              {property.priceChange && (
                <div className={`
                  flex items-center text-xs font-medium
                  ${property.priceChange > 0 ? 'text-green-600' : 'text-red-600'}
                `}>
                  <TrendingUp size={12} className="mr-1" />
                  {property.priceChange > 0 ? '+' : ''}{property.priceChange}%
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
              {property.title}
            </h3>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <MapPin size={14} className="mr-1" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                <feature.icon size={14} />
                <span>{feature.value} {feature.label}</span>
              </div>
            ))}
          </div>
          
          {/* Real-time metrics */}
          <RealTimeMetrics 
            propertyId={property.id}
            variant="compact"
            className="mt-2"
          />
          
          {/* ROI and rating */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            {property.roi && (
              <div className="flex items-center text-green-600 text-sm font-medium">
                <Zap size={14} className="mr-1" />
                <span>ROI: {property.roi}%</span>
              </div>
            )}
            
            {property.rating && (
              <div className="flex items-center text-yellow-500 text-sm">
                <Star size={14} className="mr-1" fill="currentColor" />
                <span>{property.rating}</span>
              </div>
            )}
            
            {property.listingDate && (
              <div className="flex items-center text-gray-500 text-xs">
                <Calendar size={12} className="mr-1" />
                <span>Listed {new Date(property.listingDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* 3D depth layer */}
        {!shouldReduceMotion && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
              transform: 'translateZ(1px)'
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default PropertyCard3D;
