"use client"

import React from 'react';

interface PropertyValueChartProps {
    timeRange: 'week' | 'month' | 'year';
}

// This is a placeholder component for a chart library
// In a real implementation, you would use a library like Chart.js, Recharts, or D3
// Here we're simulating the chart with simple HTML/CSS
const PropertyValueChart: React.FC<PropertyValueChartProps> = ({ timeRange }) => {
    // Generate different data based on the timeRange
    const generateData = () => {
        switch (timeRange) {
            case 'week':
                return [450000, 450200, 451000, 450800, 452500, 454000, 455500];
            case 'month':
                return Array.from({ length: 30 }, (_) => 450000 + Math.random() * 15000);
            case 'year':
                return [420000, 425000, 423000, 430000, 435000, 440000, 445000, 447000, 451000, 453000, 454000, 455500];
            default:
                return [450000, 450200, 451000, 450800, 452500, 454000, 455500];
        }
    };

    const data = generateData();
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    // Adjust range to make small changes more visible
    const adjustedMinValue = minValue - (maxValue - minValue) * 0.2;

    // Calculate the points for the line chart
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - adjustedMinValue) / (maxValue - adjustedMinValue)) * 100;
        return `${x},${y}`;
    }).join(' ');

    // Get labels for the x-axis
    const getLabels = () => {
        switch (timeRange) {
            case 'week':
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            case 'month':
                return ['1', '5', '10', '15', '20', '25', '30'];
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
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label={`Property value chart for ${timeRange}`}
                >
                    {/* Line chart */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Area below the line */}
                    <polygon
                        points={`0,100 ${points} 100,100`}
                        fill="url(#area-gradient)"
                        opacity="0.3"
                    />

                    {/* Gradient definitions */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" className="text-blue-500" />
                            <stop offset="100%" stopColor="#60a5fa" className="text-blue-400" />
                        </linearGradient>
                        <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" className="text-blue-500" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#3b82f6" className="text-blue-500" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>

                    {/* Data points */}
                    {points.split(' ').map((point, index) => {
                        const [x, y] = point.split(',').map(Number);
                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="1.5"
                                fill="#ffffff"
                                stroke="#3b82f6"
                                strokeWidth="1.5"
                                className="dark:fill-slate-800"
                                vectorEffect="non-scaling-stroke"
                            />
                        );
                    })}
                </svg>
            </div>

            {/* X-axis labels */}
            <div className="h-6 flex justify-between mt-2">
                {labels.map((label, index) => (
                    <div key={index} className="text-center text-xs text-gray-600 dark:text-gray-400">
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyValueChart;
