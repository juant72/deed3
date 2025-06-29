import React, { useState, useRef } from "react";
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share, 
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Square
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number | string;
  location: string;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
}

interface MobilePropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onShare?: (property: Property) => void;
  onView?: (property: Property) => void;
  isFavorited?: boolean;
  className?: string;
}

const MobilePropertyCard: React.FC<MobilePropertyCardProps> = ({
  property,
  onFavorite,
  onShare,
  onView,
  isFavorited = false,
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  
  const shouldReduceMotion = false;
  
  const vibrate = (pattern: number[]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return 'Price not available';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.3 }
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    vibrate([5, 5, 5]);
    onFavorite?.(property.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    vibrate([10]);
    onShare?.(property);
  };

  const handleView = () => {
    vibrate([10]);
    onView?.(property);
  };

  return (
    <motion.article
      ref={cardRef}
      className={`
        bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden 
        border border-gray-200 dark:border-slate-700 touch-manipulation
        ${className}
      `}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      onClick={handleView}
      tabIndex={0}
      role="button"
      aria-label={`Property: ${property.title}`}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 dark:bg-slate-700 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 animate-pulse" />
        )}
        
        <img
          src={property.image || '/images/property-placeholder.jpg'}
          alt={property.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="font-bold text-lg">{formatPrice(property.price)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorited 
                ? 'bg-red-500/90 text-white' 
                : 'bg-black/50 text-white hover:bg-red-500/90'
            }`}
            onClick={handleFavorite}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
          
          <button
            className="p-2 rounded-full bg-black/50 text-white hover:bg-blue-500/90 backdrop-blur-sm transition-colors"
            onClick={handleShare}
            aria-label="Share property"
          >
            <Share size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed size={14} className="mr-1" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath size={14} className="mr-1" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.sqft && (
            <div className="flex items-center">
              <Square size={14} className="mr-1" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onView?.(property);
          }}
        >
          <div className="flex items-center justify-center">
            <Eye size={16} className="mr-2" />
            View Details
          </div>
        </button>
      </div>
    </motion.article>
  );
};

export default React.memo(MobilePropertyCard);
