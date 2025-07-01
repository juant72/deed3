import React, { useState, useCallback, useEffect } from 'react';
import ProfessionalSearchAndFilters from './ProfessionalSearchAndFilters';

// TypeScript interfaces for the integration example
interface Property {
    id: string;
    title: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    propertyType: string;
    location: string;
    features: string[];
    tokenized: boolean;
    verified: boolean;
    isNew: boolean;
    roi?: number;
    imageUrl: string;
    description: string;
}

interface SearchFilters {
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    propertyType: string;
    yearBuilt: string;
    sqftRange: [number, number];
    features: string[];
    tokenized: boolean;
    verified: boolean;
    newListing: boolean;
    highROI: boolean;
    location: string;
}

interface SearchState {
    searchTerm: string;
    filters: SearchFilters;
    sortBy: string;
    viewMode: string;
    isLoading: boolean;
    results: Property[];
    totalCount: number;
    currentPage: number;
    hasMore: boolean;
}

// Mock data for demonstration
const mockProperties: Property[] = [
    {
        id: '1',
        title: 'Modern Downtown Apartment',
        price: 850000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        propertyType: 'apartment',
        location: 'Downtown, Miami',
        features: ['parking', 'wifi', 'gym', 'pool'],
        tokenized: true,
        verified: true,
        isNew: true,
        roi: 12.5,
        imageUrl: '/images/property1.jpg',
        description: 'Beautiful modern apartment in the heart of downtown'
    },
    {
        id: '2',
        title: 'Luxury Villa with Ocean View',
        price: 2500000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3500,
        propertyType: 'villa',
        location: 'Ocean Drive, Miami Beach',
        features: ['parking', 'wifi', 'security', 'pool', 'garden', 'spa'],
        tokenized: false,
        verified: true,
        isNew: false,
        roi: 8.2,
        imageUrl: '/images/property2.jpg',
        description: 'Stunning oceanfront villa with premium amenities'
    }
];

const SearchIntegrationExample: React.FC = () => {
    const [searchState, setSearchState] = useState<SearchState>({
        searchTerm: '',
        filters: {
            priceRange: [0, 2000000],
            bedrooms: '',
            bathrooms: '',
            propertyType: '',
            yearBuilt: '',
            sqftRange: [500, 10000],
            features: [],
            tokenized: false,
            verified: false,
            newListing: false,
            highROI: false,
            location: ''
        },
        sortBy: 'price-asc',
        viewMode: 'grid',
        isLoading: false,
        results: [],
        totalCount: 0,
        currentPage: 1,
        hasMore: false
    });

    // Search function with proper TypeScript typing
    const performSearch = useCallback(async (
        searchTerm: string,
        filters: SearchFilters,
        sortBy: string
    ): Promise<{ properties: Property[]; totalCount: number }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        let filteredProperties = [...mockProperties];

        // Apply search term filter
        if (searchTerm) {
            filteredProperties = filteredProperties.filter(property =>
                property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters
        if (filters.propertyType) {
            filteredProperties = filteredProperties.filter(p => p.propertyType === filters.propertyType);
        }

        if (filters.bedrooms) {
            const minBedrooms = parseInt(filters.bedrooms);
            filteredProperties = filteredProperties.filter(p => p.bedrooms >= minBedrooms);
        }

        if (filters.bathrooms) {
            const minBathrooms = parseInt(filters.bathrooms);
            filteredProperties = filteredProperties.filter(p => p.bathrooms >= minBathrooms);
        }

        if (filters.tokenized) {
            filteredProperties = filteredProperties.filter(p => p.tokenized);
        }

        if (filters.verified) {
            filteredProperties = filteredProperties.filter(p => p.verified);
        }

        if (filters.newListing) {
            filteredProperties = filteredProperties.filter(p => p.isNew);
        }

        if (filters.highROI) {
            filteredProperties = filteredProperties.filter(p => p.roi && p.roi > 10);
        }

        // Apply price range filter
        filteredProperties = filteredProperties.filter(p =>
            p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Apply sqft range filter
        filteredProperties = filteredProperties.filter(p =>
            p.sqft >= filters.sqftRange[0] && p.sqft <= filters.sqftRange[1]
        );

        // Apply features filter
        if (filters.features.length > 0) {
            filteredProperties = filteredProperties.filter(p =>
                filters.features.every(feature => p.features.includes(feature))
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                filteredProperties.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProperties.sort((a, b) => b.price - a.price);
                break;
            case 'size-asc':
                filteredProperties.sort((a, b) => a.sqft - b.sqft);
                break;
            case 'size-desc':
                filteredProperties.sort((a, b) => b.sqft - a.sqft);
                break;
            case 'roi':
                filteredProperties.sort((a, b) => (b.roi || 0) - (a.roi || 0));
                break;
            default:
                break;
        }

        return {
            properties: filteredProperties,
            totalCount: filteredProperties.length
        };
    }, []);

    // Handler for search term changes
    const handleSearchChange = useCallback((searchTerm: string) => {
        setSearchState(prev => ({
            ...prev,
            searchTerm,
            isLoading: true
        }));
    }, []);

    // Handler for filter changes
    const handleFiltersChange = useCallback((filtersData: any) => {
        const { sortBy, viewMode, ...filters } = filtersData;

        setSearchState(prev => ({
            ...prev,
            filters: filters as SearchFilters,
            sortBy,
            viewMode,
            isLoading: true
        }));
    }, []);

    // Effect to perform search when dependencies change
    useEffect(() => {
        if (searchState.isLoading) {
            performSearch(searchState.searchTerm, searchState.filters, searchState.sortBy)
                .then(({ properties, totalCount }) => {
                    setSearchState(prev => ({
                        ...prev,
                        results: properties,
                        totalCount,
                        isLoading: false,
                        hasMore: false // For pagination if needed
                    }));
                })
                .catch(error => {
                    console.error('Search error:', error);
                    setSearchState(prev => ({
                        ...prev,
                        isLoading: false,
                        results: [],
                        totalCount: 0
                    }));
                });
        }
    }, [searchState.searchTerm, searchState.filters, searchState.sortBy, searchState.isLoading, performSearch]);

    // Initialize search on component mount
    useEffect(() => {
        setSearchState(prev => ({ ...prev, isLoading: true }));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Property Search Platform
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Discover tokenized real estate opportunities with advanced search capabilities
                    </p>
                </div>

                {/* Search Component */}
                <div className="mb-8">
                    <ProfessionalSearchAndFilters
                        onSearchChange={handleSearchChange}
                        onFiltersChange={handleFiltersChange}
                        isLoading={searchState.isLoading}
                        resultCount={searchState.totalCount}
                        initialFilters={searchState.filters}
                        className="w-full"
                    />
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {searchState.isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Results Header */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Search Results
                                </h2>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {searchState.totalCount} properties found
                                </span>
                            </div>

                            {/* Results Grid */}
                            {searchState.results.length > 0 ? (
                                <div className={`grid gap-6 ${searchState.viewMode === 'grid'
                                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                        : 'grid-cols-1'
                                    }`}>
                                    {searchState.results.map((property) => (
                                        <div
                                            key={property.id}
                                            className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-slate-700"
                                        >
                                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-slate-700">
                                                <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                    Property Image
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {property.title}
                                                    </h3>
                                                    <div className="flex space-x-1">
                                                        {property.verified && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                Verified
                                                            </span>
                                                        )}
                                                        {property.tokenized && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                                Tokenized
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                    {property.location}
                                                </p>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                        ${property.price.toLocaleString()}
                                                    </span>
                                                    {property.roi && (
                                                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                                            {property.roi}% ROI
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <span>{property.bedrooms} bed</span>
                                                    <span>{property.bathrooms} bath</span>
                                                    <span>{property.sqft.toLocaleString()} sqft</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                                        No properties found matching your criteria
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                        Try adjusting your search filters
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchIntegrationExample;
