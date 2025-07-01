"use client"

import React from 'react';
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

const PropertySummary: React.FC<PropertySummaryProps> = ({ userId }) => {
  // In a real app, we'd fetch user properties with userId
  // Here we're using the dummy data
  const properties = dummyProperties;
  
  // Using our metrics hook for additional data
  const { getTotalViews, getAveragePrice } = usePropertyMetrics();
  
  const totalViews = getTotalViews(properties);
  const avgPrice = getAveragePrice(properties);
  
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
              {properties.map(property => (
                <tr key={property.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {property.title}
                  </td>
                  <td className="px-6 py-4">{property.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{property.price}</td>
                  <td className="px-6 py-4">{property.views}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertySummary;
