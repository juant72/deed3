import React, { useState } from "react";
import SimplePropertyCard from "./SimplePropertyCard";
import { RealEstateProperty } from "../../types/global";

interface ProductSimpleProps {
  properties?: RealEstateProperty[];
}

const ProductSimple: React.FC<ProductSimpleProps> = ({ properties = [] }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = ["all", "Housing", "Office", "Rental", "Farmhouse", "Commercial"];

  const filteredProperties = properties.filter((property) => {
    if (activeFilter === "all") return true;
    return property.category === activeFilter;
  });

  return (
    <div className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h3 className="text-3xl font-bold text-white">Explore Properties</h3>
            <p className="text-gray-400 mt-2">Discover premium real estate opportunities</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800/50 text-gray-300 hover:bg-blue-600/20 hover:text-blue-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property, index) => (
              <SimplePropertyCard 
                key={property.id || index} 
                property={property} 
                index={index} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">
              No properties found
            </h4>
            <p className="text-gray-400 mb-6">
              {activeFilter === "all" 
                ? "No properties available at the moment" 
                : `No ${activeFilter.toLowerCase()} properties available`
              }
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Properties
            </button>
          </div>
        )}

        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              Showing {filteredProperties.length} of {properties.length} properties
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSimple;
