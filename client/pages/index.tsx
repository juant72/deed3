import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";

// INTERNAL IMPORTS
import {
    ModernHero,
    TokenomicsSection,
} from "../PageComponents/Components";

import ProfessionalSearchAndFilters from "../components/ui/search/ProfessionalSearchAndFilters";
import Service from "../PageComponents/Components/Service";
import Product from "../PageComponents/Components/Product";
import Collection from "../PageComponents/Components/Collection";

import { Header, Footer, MobileNavigation } from "../components/layout";

import LiveFixed from "../PageComponents/Components/LiveFixed";

// CONTEXT AND TYPES
import { useStateContext } from "../context";
import { RealEstateProperty } from "../types/global";

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<RealEstateProperty[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<RealEstateProperty[]>([]);
    const [searchFilters, setSearchFilters] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { getAllRealEstate } = useStateContext();

    //GET DATA
    const fetchProperty = useCallback(async () => {
        setIsLoading(true);
        const data = await getAllRealEstate();

        setProperties(data);
        setIsLoading(false);
    }, [getAllRealEstate]);

    useEffect(() => {
        fetchProperty();
    }, [fetchProperty]);

    // Lógica de filtrado y búsqueda
    useEffect(() => {
        if (!properties.length) {
            setFilteredProperties([]);
            return;
        }

        let filtered = [...properties];

        // Filtrar por término de búsqueda
        if (searchTerm) {
            filtered = filtered.filter(property =>
                property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.category?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Aplicar filtros adicionales si existen
        if (searchFilters) {
            // Filtrar por tipo de propiedad
            if (searchFilters.propertyType) {
                filtered = filtered.filter(property =>
                    property.category?.toLowerCase() === searchFilters.propertyType.toLowerCase()
                );
            }

            // Filtrar por rango de precio
            if (searchFilters.priceRange && searchFilters.priceRange[1] < 2000000) {
                filtered = filtered.filter(property => {
                    const price = parseFloat(property.price || '0');
                    return price >= searchFilters.priceRange[0] && price <= searchFilters.priceRange[1];
                });
            }

            // Más filtros se pueden agregar aquí según las propiedades disponibles
        }

        setFilteredProperties(filtered);
    }, [properties, searchTerm, searchFilters]);

    //CATEGORIES
    const housing: RealEstateProperty[] = [];
    const rental: RealEstateProperty[] = [];
    const farmhouse: RealEstateProperty[] = [];
    const office: RealEstateProperty[] = [];
    const commercial: RealEstateProperty[] = [];
    const country: RealEstateProperty[] = [];

    if (!isLoading) {
        properties?.map((el: RealEstateProperty) => {
            if (el.category === "country") {
                country.push(el);
            } else if (el.category === "Commercial") {
                commercial.push(el);
            } else if (el.category === "Office") {
                office.push(el);
            } else if (el.category === "Farmhouse") {
                farmhouse.push(el);
            } else if (el.category === "Rental") {
                rental.push(el);
            } else if (el.category === "Housing") {
                housing.push(el);
            }
            return el;
        });
    }

    const handleSearchChange = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    const handleFiltersChange = useCallback((filters: any) => {
        setSearchFilters(filters);
    }, []);

    // const creators = getTopCreators(properties);

    return (
        <div className="template-color-1 nft-body-connect">
            <Header />
            <MobileNavigation />
            <ModernHero
                marketData={{
                    totalVolume: '$2.4B',
                    avgROI: '12.5%',
                    activeProperties: properties?.length || 0
                }}
                propertyCount={properties?.length || 0}
            />

            {/* Enhanced Search and Filters Section */}
            <div className="container mx-auto px-4 py-8">
                <ProfessionalSearchAndFilters
                    onSearchChange={handleSearchChange}
                    onFiltersChange={handleFiltersChange}
                    isLoading={isLoading}
                    resultCount={filteredProperties.length}
                />

                {/* Search Results Section */}
                {(searchTerm || searchFilters) && (
                    <div className="mt-8 bg-slate-900/95 rounded-3xl p-6 backdrop-blur-xl border border-slate-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                Search Results
                            </h2>
                            <div className="text-slate-300">
                                {filteredProperties.length} properties found
                                {searchTerm && (
                                    <span className="ml-2 text-blue-400">
                                        for "{searchTerm}"
                                    </span>
                                )}
                            </div>
                        </div>

                        {filteredProperties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProperties.slice(0, 9).map((property) => (
                                    <div
                                        key={property.id}
                                        className="professional-property-card rounded-xl p-4 professional-fade-in"
                                        style={{
                                            background: 'rgba(17, 24, 39, 0.95)',
                                            border: '1px solid rgba(107, 114, 128, 0.2)',
                                            backdropFilter: 'blur(15px)'
                                        }}
                                    >
                                        <div className="aspect-w-16 aspect-h-9 mb-4 bg-slate-700 rounded-lg flex items-center justify-center">
                                            {property.images && property.images.length > 0 ? (
                                                <img
                                                    src={property.images[0]}
                                                    alt={property.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="text-slate-400">No Image</div>
                                            )}
                                        </div>

                                        <h3 className="text-white font-semibold mb-2 truncate">
                                            {property.title}
                                        </h3>

                                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                                            {property.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="text-blue-400 font-bold">
                                                ${property.price} ETH
                                            </div>
                                            <div className="text-slate-500 text-sm">
                                                {property.category}
                                            </div>
                                        </div>

                                        {property.location && (
                                            <div className="text-slate-400 text-sm mt-2">
                                                📍 {property.location}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-slate-400 text-lg mb-2">
                                    No properties found
                                </div>
                                <div className="text-slate-500 text-sm">
                                    Try adjusting your search criteria
                                </div>
                            </div>
                        )}

                        {filteredProperties.length > 9 && (
                            <div className="text-center mt-6">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                                    View All {filteredProperties.length} Results
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Service />
            <Product properties={properties} />
            <Collection
                housing={housing?.length}
                rental={rental?.length}
                farmhouse={farmhouse?.length}
                office={office?.length}
            />

            <TokenomicsSection />

            <LiveFixed properties={properties} />
            <Footer />
        </div>
    );
};

export default Home;
