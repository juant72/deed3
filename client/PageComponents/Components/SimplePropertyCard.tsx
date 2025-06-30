import React from "react";
import Link from "next/link";
import { RealEstateProperty } from "../../types/global";
import PropertyCard from "../../components/property/PropertyCard";

interface SimplePropertyCardProps {
  property: RealEstateProperty;
  index?: number;
}

const SimplePropertyCard: React.FC<SimplePropertyCardProps> = ({ property, index = 0 }) => {
  if (!property) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-48 bg-slate-700/50 rounded-lg mb-4"></div>
        <div className="h-4 bg-slate-700/50 rounded mb-2"></div>
        <div className="h-3 bg-slate-700/50 rounded mb-4 w-2/3"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-slate-700/50 rounded w-1/3"></div>
          <div className="h-3 bg-slate-700/50 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
        <div className="relative">
          <Link href={`/detail?id=${property.id}`} className="block">
            <img
              src={property.images?.[0] || '/portfolio/portfolio-01.jpg'}
              alt={property.title || 'Property'}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/portfolio/portfolio-01.jpg';
              }}
            />
          </Link>

          <div className="absolute top-4 right-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.category}
            </span>
          </div>

          {property.isActive && (
            <div className="absolute top-4 left-4">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h6 className="text-white font-bold text-lg mb-2 line-clamp-1">
              {property.title}
            </h6>
            <p className="text-gray-400 text-sm line-clamp-2">
              {property.description}
            </p>
          </div>

          <div className="flex items-center text-gray-400 text-sm mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">Price</span>
              <span className="text-blue-400 font-bold text-xl">
                {property.price} ETH
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-400 text-xs">Owner</span>
              <span className="text-white text-xs font-mono">
                {property.owner?.slice(0, 6)}...{property.owner?.slice(-4)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/detail?id=${property.id}`}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
            >
              View Details
            </Link>
            <button className="bg-slate-700/50 text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-600/50 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
