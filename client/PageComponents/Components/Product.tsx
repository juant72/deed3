import React from "react";
import Link from "next/link";
import PropertyCard3D from "./PropertyCard3D";

const Product: React.FC<{ properties }> = ({ properties }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = ["all", "housing", "office", "rental", "farmhouse", "country", "commercial"];

  const filteredProperties = properties?.filter((property) => {
    if (activeFilter === "all") return true;
    return property.category?.toLowerCase() === activeFilter;
  }) || [];

  return (
    <div className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h3 className="text-3xl font-bold text-white">Explore Product</h3>
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <PropertyCard3D 
                key={property.id || index} 
                property={property} 
                index={index} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg">
                No properties found for the selected category.
              </div>
            </div>
          )}
        </div>

        {filteredProperties.length > 8 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
