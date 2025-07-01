"use client"

import React, { useState, useRef, useEffect } from 'react';

interface PropertyViewsChartProps {
    timeRange: 'week' | 'month' | 'year';
    chartType?: 'bar' | 'line' | 'area';
}

// This is a placeholder component for a chart library
// In a real implementation, you would use a library like Chart.js, Recharts, or D3
// Here we're simulating the chart with simple HTML/CSS and adding accessibility features
const PropertyViewsChart: React.FC<PropertyViewsChartProps> = ({
    timeRange,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    chartType = 'bar'
}) => {
    // Generate different data based on the timeRange
    const generateData = () => {
        switch (timeRange) {
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
        switch (timeRange) {
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

    // State for tooltips
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const chartRef = useRef<HTMLDivElement>(null);

    // For keyboard navigation
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Handle keyboard navigation for accessibility
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setFocusedIndex(Math.max(0, index - 1));
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setFocusedIndex(Math.min(data.length - 1, index + 1));
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setFocusedIndex(null);
        }
    };

    // Focus on the element when focusedIndex changes
    useEffect(() => {
        if (focusedIndex !== null && chartRef.current) {
            const elements = chartRef.current.querySelectorAll('[role="button"]');
            if (elements[focusedIndex]) {
                (elements[focusedIndex] as HTMLElement).focus();
            }
        }
    }, [focusedIndex]);

    // Format numbers for better readability
    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    // Determine chart color based on value trend
    const getChartColor = (index: number): string => {
        if (index === 0 || index >= data.length - 1) return 'bg-blue-500 dark:bg-blue-600';

        if (data[index] > data[index - 1]) {
            return 'bg-green-500 dark:bg-green-600';
        } else if (data[index] < data[index - 1]) {
            return 'bg-red-500 dark:bg-red-600';
        } else {
            return 'bg-blue-500 dark:bg-blue-600';
        }
    };

    return (
        <div className="h-full w-full flex flex-col" role="region" aria-label={`Property views chart for ${timeRange}`}>
            {/* Y-axis labels */}
            <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">0</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{formatNumber(maxValue)}</span>
            </div>

            <div className="flex-1 relative" ref={chartRef}>
                {/* Chart */}
                <div className="absolute inset-0 flex items-end">
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className="flex-1 mx-0.5 flex flex-col justify-end group"
                            onMouseEnter={() => {
                                setActiveIndex(index);
                            }}
                            onMouseLeave={() => {
                                setActiveIndex(null);
                            }}
                            onFocus={() => setFocusedIndex(index)}
                            onBlur={() => setFocusedIndex(null)}
                            role="button"
                            tabIndex={0}
                            aria-label={`${labels[index]}: ${value} views`}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        >
                            <div
                                className={`
                  ${getChartColor(index)} 
                  rounded-t-sm 
                  hover:opacity-80 dark:hover:opacity-90 
                  focus:ring-2 focus:ring-blue-400 focus:outline-none
                  transition-all duration-200
                  ${activeIndex === index || focusedIndex === index ? 'opacity-100 scale-x-110' : 'opacity-80'}
                `}
                                style={{
                                    height: `${Math.max(1, (value / maxValue) * 100)}%`,
                                    transition: 'height 0.3s ease-in-out'
                                }}
                            />

                            {/* Tooltip */}
                            {(activeIndex === index || focusedIndex === index) && (
                                <div
                                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                           bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap 
                           pointer-events-none z-10"
                                    role="tooltip"
                                    aria-hidden="true"
                                >
                                    <div className="font-bold">{labels[index]}</div>
                                    <div>{value} views</div>
                                    {index > 0 && (
                                        <div className={`text-xs ${data[index] > data[index - 1] ? 'text-green-400' : data[index] < data[index - 1] ? 'text-red-400' : 'text-gray-400'}`}>
                                            {data[index] > data[index - 1] ? '▲' : data[index] < data[index - 1] ? '▼' : '—'}
                                            {' '}
                                            {Math.abs(data[index] - data[index - 1])} ({Math.abs(Math.round((data[index] - data[index - 1]) / data[index - 1] * 100))}%)
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Grid lines for better visualization */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3].map((line) => (
                        <div
                            key={line}
                            className="w-full border-b border-gray-200 dark:border-gray-700"
                            style={{ opacity: 0.5 }}
                        />
                    ))}
                </div>
            </div>

            {/* X-axis labels */}
            <div className="h-6 flex mt-2">
                {labels.map((label, index) => (
                    <div
                        key={index}
                        className={`flex-1 text-center text-xs 
                      ${activeIndex === index || focusedIndex === index ?
                                'text-gray-900 dark:text-white font-medium' :
                                'text-gray-600 dark:text-gray-400'}`}
                    >
                        {timeRange === 'month' && (index % 5 === 0 || index === labels.length - 1) ? label : (timeRange === 'month' ? '' : label)}
                    </div>
                ))}
            </div>

            {/* Screen reader text with summary */}
            <div className="sr-only">
                {`This ${timeRange} chart shows property views ranging from ${Math.min(...data)} to ${maxValue}.`}
                {data.map((value, index) => (
                    <div key={index}>
                        {`${labels[index]}: ${value} views`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyViewsChart;
