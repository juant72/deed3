"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import PropertyViewsChart from './charts/PropertyViewsChart';
import PropertyValueChart from './charts/PropertyValueChart';
import PriceComparisonChart from './charts/PriceComparisonChart';

interface StatisticsProps {
  userId?: string;
}

const Statistics: React.FC<StatisticsProps> = ({ userId }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Statistics</h1>
        
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button 
            variant={timeRange === 'week' ? 'default' : 'outline'}
            className="rounded-l-md rounded-r-none"
            onClick={() => setTimeRange('week')}
            aria-pressed={timeRange === 'week'}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'default' : 'outline'}
            className="rounded-none border-x-0"
            onClick={() => setTimeRange('month')}
            aria-pressed={timeRange === 'month'}
          >
            Month
          </Button>
          <Button 
            variant={timeRange === 'year' ? 'default' : 'outline'}
            className="rounded-r-md rounded-l-none"
            onClick={() => setTimeRange('year')}
            aria-pressed={timeRange === 'year'}
          >
            Year
          </Button>
        </div>
      </div>
      
      {/* Property views chart */}
      <div className="mb-8 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Property Views</h2>
        <div className="h-80">
          <PropertyViewsChart timeRange={timeRange} />
        </div>
      </div>
      
      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Property value over time */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Property Value</h2>
          <div className="h-64">
            <PropertyValueChart timeRange={timeRange} />
          </div>
        </div>
        
        {/* Price comparison chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Price Comparison</h2>
          <div className="h-64">
            <PriceComparisonChart />
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Average Views</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">176</p>
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            24%
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Avg. Time on Page</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2:45</p>
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            12%
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2%</p>
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            5%
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Market Position</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Top 10%</p>
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            8%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
