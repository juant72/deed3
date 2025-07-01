"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { usePropertyMetrics } from '../../hooks/usePropertyMetrics';

interface PropertySummaryProps {
    userId?: string;
}

// Dummy property data for demonstration
const dummyProperties = [
    {
        id: 'prop1',
        title: 'Modern Apartment in Downtown',
        type: 'Apartment',
        status: 'Active',
        price: '$450,000',
        location: 'Downtown, City Center',
        views: 245,
        likes: 23,
        image: '/images/properties/property-1.jpg'
    },
    {
        id: 'prop2',
        title: 'Luxury Villa with Pool',
        type: 'Villa',
        status: 'Pending',
        price: '$1,250,000',
        location: 'Beverly Hills, CA',
        views: 187,
        likes: 42,
        image: '/images/properties/property-2.jpg'
    },
    {
        id: 'prop3',
        title: 'Commercial Office Space',
        type: 'Commercial',
        status: 'Active',
        price: '$875,000',
        location: 'Business District',
        views: 98,
        likes: 12,
        image: '/images/properties/property-3.jpg'
    }
];

const PropertySummary: React.FC<PropertySummaryProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId
}) => {
    // In a real app, we'd fetch user properties with userId
    // Here we're using the dummy data
    const [properties,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setProperties
    ] = useState(dummyProperties);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc' | 'views-desc' | 'newest'>('newest');

    // Using our metrics hook for additional data
    const { getTotalViews, getAveragePrice } = usePropertyMetrics();

    const totalViews = getTotalViews(properties);
    const avgPrice = getAveragePrice(properties);

    // Filter and search properties
    const filteredProperties = properties.filter(property => {
        // Search term filter
        const matchesSearch = searchTerm === '' ||
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus = activeFilter === 'all' ||
            property.status.toLowerCase() === activeFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    // Sort properties
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        switch (sortOrder) {
            case 'price-asc':
                return parseFloat(a.price.replace('$', '').replace(',', '')) -
                    parseFloat(b.price.replace('$', '').replace(',', ''));
            case 'price-desc':
                return parseFloat(b.price.replace('$', '').replace(',', '')) -
                    parseFloat(a.price.replace('$', '').replace(',', ''));
            case 'views-desc':
                return b.views - a.views;
            case 'newest':
            default:
                return a.id > b.id ? -1 : 1;
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Properties</h1>
                <Button>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add New Property
                </Button>
            </div>

            {/* Property stats summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Properties</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{properties.length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Views</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalViews}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Average Price</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgPrice}</p>
                </div>
            </div>

            {/* Search and filter controls */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                        <label htmlFor="search-properties" className="sr-only">Search properties</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                id="search-properties"
                                type="search"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                placeholder="Search properties by name or location"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div>
                            <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                            <select
                                id="status-filter"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white rounded-md"
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sort-order" className="sr-only">Sort by</label>
                            <select
                                id="sort-order"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white rounded-md"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as any)}
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="views-desc">Most Viewed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property list */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Property</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Views</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProperties.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No properties found matching your criteria
                                    </td>
                                </tr>
                            ) : (
                                sortedProperties.map(property => (
                                    <tr key={property.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {property.title}
                                        </td>
                                        <td className="px-6 py-4">{property.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${property.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                }`}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{property.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {property.views}
                                                <span className="ml-1 text-gray-400 dark:text-gray-500" aria-hidden="true">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                    aria-label={`Edit ${property.title}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    aria-label={`Delete ${property.title}`}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-medium">{sortedProperties.length}</span> of <span className="font-medium">{properties.length}</span> properties
                </div>
                <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertySummary;
