import React from "react";
import Link from "next/link";
import { Card } from "../ui/card";
import Image from "next/image";

interface PropertyCardProps {
    property: {
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
    };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    if (!property) {
        return (
            <Card className="animate-pulse">
                <div className="h-48 bg-slate-700/50 rounded-lg mb-4" />
                <div className="h-4 bg-slate-700/50 rounded mb-2" />
                <div className="h-3 bg-slate-700/50 rounded mb-4 w-2/3" />
                <div className="flex justify-between">
                    <div className="h-3 bg-slate-700/50 rounded w-1/3" />
                    <div className="h-3 bg-slate-700/50 rounded w-1/4" />
                </div>
            </Card>
        );
    }

    return (
        <Card className="group overflow-hidden border border-border bg-slate-800/50 backdrop-blur-sm rounded-2xl hover:border-primary/50 transition-all duration-300">
            <div className="relative">
                <Link href={`/detail?id=${property.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Ver detalles de ${property.title}`}>
                    <Image
                        src={property.images?.[0] || '/portfolio/portfolio-01.jpg'}
                        alt={property.title || 'Property'}
                        width={500} // Example width
                        height={300} // Example height
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/portfolio/portfolio-01.jpg';
                        }}
                    />
                </Link>
                {property.category && (
                    <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {property.category}
                    </span>
                )}
                {property.isActive && (
                    <span className="absolute top-4 left-4 bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
                        Activo
                    </span>
                )}
            </div>
            <div className="p-6">
                <h2 className="text-white font-bold text-lg mb-2 line-clamp-1">{property.title}</h2>
                <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                    <span>{property.location}</span>
                    <span>{property.area} m²</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span>{property.bedrooms} hab</span>
                    <span>{property.bathrooms} baños</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-primary font-semibold text-lg">{property.price} USD</span>
                    <Link href={`/detail?id=${property.id}`} className="text-blue-400 hover:underline text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Ver detalles de ${property.title}`}>Ver detalles</Link>
                </div>
            </div>
        </Card>
    );
};

export default PropertyCard;
