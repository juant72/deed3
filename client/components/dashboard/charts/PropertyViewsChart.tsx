"use client"

import React from 'react';

interface PropertyViewsChartProps {
  timeRange: 'week' | 'month' | 'year';
}

// This is a placeholder component for a chart library
// In a real implementation, you would use a library like Chart.js, Recharts, or D3
// Here we're simulating the chart with simple HTML/CSS
const PropertyViewsChart: React.FC<PropertyViewsChartProps> = ({ timeRange }) => {
  // Generate different data based on the timeRange
  const generateData = () => {
    switch(timeRange) {
      case 'week':
        return [42, 56, 78, 98, 120, 110, 95];
      case 'month':
        return [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 132, 101];
      case 'year':
        return [1200, 1300, 900, 1400, 1800, 1700, 1600, 1800, 1700, 1900, 2000, 1700];
      default:
        return [42, 56, 78, 98, 120, 110, 95];
    }
  };
  
  const data = generateData();
  const maxValue = Math.max(...data);
  
  // Get labels for the x-axis
  const getLabels = () => {
    switch(timeRange) {
      case 'week':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'month':
        return Array.from({ length: data.length }, (_, i) => `${i + 1}`);
      case 'year':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      default:
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  };
  
  const labels = getLabels();
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 relative">
        {/* This would be replaced with an actual chart component */}
        <div className="absolute inset-0 flex items-end" role="img" aria-label={`Property views chart for ${timeRange}`}>
          {data.map((value, index) => (
            <div 
              key={index} 
              className="flex-1 mx-0.5 flex flex-col justify-end"
              title={`${labels[index]}: ${value} views`}
            >
              <div 
                className="bg-blue-500 dark:bg-blue-600 rounded-t-sm hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="h-6 flex mt-2">
        {labels.map((label, index) => (
          <div key={index} className="flex-1 text-center text-xs text-gray-600 dark:text-gray-400">
            {timeRange === 'month' && (index % 5 === 0 || index === labels.length - 1) ? label : (timeRange === 'month' ? '' : label)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyViewsChart;
