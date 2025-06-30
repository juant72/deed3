import React from "react";
import PropertyCard from "./PropertyCard";

interface Property {
    id: string;
    title: string;
    images?: string[];
    category?: string;
    isActive?: boolean;
    price?: string | number;
    location?: string;
    area?: string | number;
    bedrooms?: number;
    bathrooms?: number;
}

interface PropertyListProps {
    properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
    if (!properties || properties.length === 0) {
        return <div className="text-center text-gray-400 py-12">No hay propiedades disponibles.</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
};

export default PropertyList;
