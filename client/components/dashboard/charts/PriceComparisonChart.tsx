"use client"

import React from 'react';

// This is a placeholder component for a chart library
// In a real implementation, you would use a library like Chart.js, Recharts, or D3
// Here we're simulating the chart with simple HTML/CSS
const PriceComparisonChart: React.FC = () => {
  // Data for comparison
  const data = [
    { label: 'Your Price', value: 450000, color: '#3b82f6' },  // blue
    { label: 'Neighborhood Avg', value: 420000, color: '#10b981' },  // green
    { label: 'City Avg', value: 380000, color: '#f59e0b' }  // amber
  ];
  
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        {/* This would be replaced with an actual chart component */}
        <div className="space-y-6" role="img" aria-label="Price comparison chart">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${item.value.toLocaleString()}
                </span>
              </div>
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`, 
                    backgroundColor: item.color 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Market Position:
            </span>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              7% above market
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceComparisonChart;
