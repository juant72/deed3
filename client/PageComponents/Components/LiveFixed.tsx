import React from "react";
import Link from "next/link";
import { RealEstateProperty } from "../../types/global";

interface LiveProps {
  properties: RealEstateProperty[];
}

const Live: React.FC<LiveProps> = ({ properties }) => {
  // Fallback for empty or null properties
  const displayProperties = properties?.slice(0, 5) || [];
  
  if (displayProperties.length === 0) {
    return (
      <div className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                New Properties
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p>No properties available at the moment.</p>
            <Link href="/create" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create Property
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              New Properties
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {displayProperties.map((property, i) => (
            <div key={property.id || i} className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="relative">
                  <Link href={`/detail?id=${property.id}`} className="block">
                    <img 
                      src={property.images?.[0] || '/portfolio/portfolio-01.jpg'} 
                      alt={property.title || 'Property'} 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      New
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
                
                <div className="p-4">
                  <div className="mb-3">
                    <h6 className="text-white font-semibold text-sm mb-1 truncate">
                      {property.title}
                    </h6>
                    <p className="text-gray-400 text-xs truncate">
                      {property.location}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Price</span>
                      <span className="text-blue-400 font-bold text-sm">
                        {property.price} ETH
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-400 text-xs">Category</span>
                      <span className="text-white text-xs font-medium">
                        {property.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <Link
                      href={`/detail?id=${property.id}`}
                      className="block w-full text-center bg-blue-600/20 text-blue-400 py-2 rounded-lg text-xs font-medium hover:bg-blue-600/40 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {properties?.length > 5 && (
          <div className="text-center mt-12">
            <Link
              href="/explor"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Live;
