import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    X,
    MapPin,
    DollarSign,
    Home,
    TrendingUp,
    Calendar,
    Star,
    Sliders,
    Map,
    Grid3X3,
    SortAsc,
    SortDesc,
    ChevronDown,
    ChevronUp,
    Settings,
    Zap,
    Shield,
    Award,
    Clock,
    BarChart3,
    Building,
    Bath,
    Bed,
    Square,
    Wifi,
    Car,
    Trees
} from 'lucide-react';

// Professional Search and Filters Component - TypeScript Interfaces
interface SearchAndFiltersProps {
    onSearchChange?: (term: string) => void;
    onFiltersChange?: (filters: FilterState) => void;
    className?: string;
    initialFilters?: Partial<FilterState>;
    isLoading?: boolean;
    resultCount?: number;
    enableAnalytics?: boolean;
    enableVirtualization?: boolean;
    maxResults?: number;
}

interface FilterState {
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

type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'roi' | 'size-asc' | 'size-desc';
type ViewMode = 'grid' | 'list' | 'map';

interface PropertyType {
    value: string;
    label: string;
    icon: React.ComponentType<any>;
}

interface Feature {
    value: string;
    label: string;
    icon: React.ComponentType<any>;
}

interface FeatureCategory {
    label: string;
    features: Feature[];
}

const ProfessionalSearchAndFilters: React.FC<SearchAndFiltersProps> = ({
    onSearchChange,
    onFiltersChange,
    className = '',
    initialFilters = {},
    isLoading = false,
    resultCount = 0
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        basics: true,
        price: false,
        features: false,
        special: false
    });
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('price-asc');
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [filters, setFilters] = useState<FilterState>({
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
        location: '',
        ...initialFilters
    });

    // Enhanced property types with icons
    const propertyTypes: PropertyType[] = [
        { value: 'apartment', label: 'Apartment', icon: Building },
        { value: 'house', label: 'House', icon: Home },
        { value: 'condo', label: 'Condo', icon: Building },
        { value: 'townhouse', label: 'Townhouse', icon: Home },
        { value: 'villa', label: 'Villa', icon: Trees },
        { value: 'penthouse', label: 'Penthouse', icon: Star },
        { value: 'studio', label: 'Studio', icon: Square },
        { value: 'loft', label: 'Loft', icon: Building }
    ];

    // Enhanced features with icons and categories
    const featureCategories: Record<string, FeatureCategory> = {
        essentials: {
            label: 'Essentials',
            features: [
                { value: 'parking', label: 'Parking', icon: Car },
                { value: 'wifi', label: 'WiFi', icon: Wifi },
                { value: 'security', label: 'Security', icon: Shield },
                { value: 'elevator', label: 'Elevator', icon: TrendingUp }
            ]
        },
        amenities: {
            label: 'Amenities',
            features: [
                { value: 'pool', label: 'Pool', icon: Zap },
                { value: 'gym', label: 'Gym', icon: Award },
                { value: 'balcony', label: 'Balcony', icon: Trees },
                { value: 'garden', label: 'Garden', icon: Trees }
            ]
        },
        luxury: {
            label: 'Luxury Features',
            features: [
                { value: 'concierge', label: 'Concierge', icon: Star },
                { value: 'spa', label: 'Spa', icon: Award },
                { value: 'rooftop', label: 'Rooftop Access', icon: TrendingUp },
                { value: 'storage', label: 'Storage', icon: Building }
            ]
        }
    };

    const sortOptions: Array<{ value: SortOption; label: string; icon: React.ComponentType<any> }> = [
        { value: 'price-asc', label: 'Price: Low to High', icon: SortAsc },
        { value: 'price-desc', label: 'Price: High to Low', icon: SortDesc },
        { value: 'newest', label: 'Newest First', icon: Clock },
        { value: 'rating', label: 'Highest Rated', icon: Star },
        { value: 'roi', label: 'Best ROI', icon: BarChart3 },
        { value: 'size-asc', label: 'Size: Small to Large', icon: Square },
        { value: 'size-desc', label: 'Size: Large to Small', icon: Building }
    ];

    // Quick filter badges
    const quickFilters = [
        {
            key: 'verified',
            label: 'Verified',
            icon: Shield,
            color: 'emerald',
            description: 'Blockchain verified properties'
        },
        {
            key: 'tokenized',
            label: 'Tokenized',
            icon: Zap,
            color: 'purple',
            description: 'Available for fractional ownership'
        },
        {
            key: 'newListing',
            label: 'New Listings',
            icon: Clock,
            color: 'blue',
            description: 'Listed in the last 30 days'
        },
        {
            key: 'highROI',
            label: 'High ROI',
            icon: TrendingUp,
            color: 'amber',
            description: 'Expected ROI > 10%'
        }
    ];

    // Debounced search
    const debouncedSearch = useCallback((term: string) => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            onSearchChange?.(term);
        }, 300);
    }, [onSearchChange]);

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm, debouncedSearch]);

    // Optimized filters change handler
    const handleFiltersChange = useCallback(() => {
        const filtersData = { ...filters, sortBy, viewMode };
        onFiltersChange?.(filtersData);
    }, [filters, sortBy, viewMode, onFiltersChange]);

    useEffect(() => {
        handleFiltersChange();
    }, [handleFiltersChange]);

    const handleFilterChange = useCallback((key: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const toggleFeature = useCallback((feature: string) => {
        setFilters(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    }, []);

    const toggleSection = useCallback((section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
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
        });
        setSearchTerm('');
        setSortBy('price-asc');
    }, []);

    // Memoized active filters count
    const activeFiltersCount = useMemo(() => {
        return Object.entries(filters).reduce((count, [key, value]) => {
            if (key === 'priceRange' && (value[0] !== 0 || value[1] !== 2000000)) return count + 1;
            if (key === 'sqftRange' && (value[0] !== 500 || value[1] !== 10000)) return count + 1;
            if (Array.isArray(value)) return count + value.length;
            if (typeof value === 'boolean') return count + (value ? 1 : 0);
            if (value && value !== '') return count + 1;
            return count;
        }, 0);
    }, [filters]);

    // Price formatting utility
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        }
        if (price >= 1000) {
            return `$${(price / 1000).toFixed(0)}K`;
        }
        return `$${price.toLocaleString()}`;
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <motion.div
            className={`space-y-6 professional-realestate-search rounded-3xl shadow-2xl p-8 ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                background: 'linear-gradient(135deg, #0B1426 0%, #1F2937 50%, #374151 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(37, 99, 235, 0.1)'
            }}
        >
            {/* Header Section */}
            <div className="space-y-4">
                {/* Search Bar */}
                <motion.div
                    className="relative"
                    variants={itemVariants}
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-3 lg:space-y-0">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors" />
                            <input
                                type="text"
                                placeholder="🔍 Type to search properties (automatic search as you type)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-5 professional-search-input rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium professional-focus-ring"
                                disabled={isLoading}
                                style={{
                                    background: 'rgba(17, 24, 39, 0.95)',
                                    borderColor: 'rgba(107, 114, 128, 0.3)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                            {isLoading && (
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            {/* Filter Toggle */}
                            <motion.button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${showFilters || activeFiltersCount > 0
                                    ? 'professional-button-primary text-white shadow-2xl'
                                    : 'professional-button-secondary text-gray-300 hover:text-white hover:shadow-xl'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Toggle filters"
                                style={{
                                    backdropFilter: 'blur(10px)',
                                    background: showFilters || activeFiltersCount > 0
                                        ? 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)'
                                        : 'rgba(31, 41, 55, 0.9)',
                                    borderColor: showFilters || activeFiltersCount > 0
                                        ? '#2563EB'
                                        : 'rgba(107, 114, 128, 0.5)'
                                }}
                            >
                                <Filter className="w-6 h-6" />
                                {activeFiltersCount > 0 && (
                                    <motion.span
                                        className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {activeFiltersCount}
                                    </motion.span>
                                )}
                            </motion.button>

                            {/* View Mode Toggle */}
                            <div className="flex professional-button-secondary rounded-2xl overflow-hidden shadow-lg"
                                style={{
                                    background: 'rgba(31, 41, 55, 0.9)',
                                    border: '1px solid rgba(107, 114, 128, 0.5)'
                                }}
                            >
                                <motion.button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-4 transition-all duration-300 ${viewMode === 'grid'
                                        ? 'professional-button-primary text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-slate-700'
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Grid view"
                                    style={{
                                        background: viewMode === 'grid'
                                            ? 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)'
                                            : 'transparent'
                                    }}
                                >
                                    <Grid3X3 className="w-6 h-6" />
                                </motion.button>
                                <motion.button
                                    onClick={() => setViewMode('map')}
                                    className={`p-4 transition-all duration-300 ${viewMode === 'map'
                                        ? 'professional-button-primary text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-slate-700'
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Map view"
                                    style={{
                                        background: viewMode === 'map'
                                            ? 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)'
                                            : 'transparent'
                                    }}
                                >
                                    <Map className="w-6 h-6" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Filters */}
                <motion.div
                    className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2"
                    variants={itemVariants}
                >
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Quick Filters:
                    </span>
                    {quickFilters.map((filter) => {
                        const isActive = filters[filter.key as keyof FilterState] as boolean;
                        const Icon = filter.icon;
                        return (
                            <motion.button
                                key={filter.key}
                                onClick={() => handleFilterChange(filter.key, !isActive)}
                                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${isActive
                                    ? `bg-${filter.color}-600 text-white shadow-${filter.color}-500/25`
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title={filter.description}
                            >
                                <div className="flex items-center space-x-2">
                                    <Icon className="w-4 h-4" />
                                    <span>{filter.label}</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            {/* Results Info & Sort */}
            <motion.div
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2 border-t border-gray-200 dark:border-slate-700"
                variants={itemVariants}
            >
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <BarChart3 className="w-4 h-4" />
                    <span>
                        {resultCount > 0 ? (
                            <>
                                <span className="font-semibold text-gray-900 dark:text-white">{resultCount.toLocaleString()}</span> properties found
                            </>
                        ) : (
                            'Type in the search box above to find properties'
                        )}
                    </span>
                    {searchTerm === '' && (
                        <span className="text-blue-400 text-xs ml-2">
                            💡 No search button needed - results appear as you type!
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between md:justify-end space-x-4">
                    <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {activeFiltersCount > 0 && (
                        <motion.button
                            onClick={clearFilters}
                            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors font-medium flex items-center space-x-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X className="w-4 h-4" />
                            <span>Clear all</span>
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-6 space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                                <Sliders className="w-5 h-5" />
                                <span>Advanced Filters</span>
                            </h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Basic Filters Section */}
                        <div className="space-y-4">
                            <button
                                onClick={() => toggleSection('basics')}
                                className="w-full flex items-center justify-between text-left p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    <Home className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium text-gray-900 dark:text-white">Basic Criteria</span>
                                </div>
                                {expandedSections.basics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            <AnimatePresence>
                                {expandedSections.basics && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-4"
                                    >
                                        {/* Property Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Property Type
                                            </label>
                                            <select
                                                value={filters.propertyType}
                                                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            >
                                                <option value="">Any Type</option>
                                                {propertyTypes.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Bedrooms */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
                                                <Bed className="w-4 h-4" />
                                                <span>Bedrooms</span>
                                            </label>
                                            <select
                                                value={filters.bedrooms}
                                                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            >
                                                <option value="">Any</option>
                                                <option value="1">1+</option>
                                                <option value="2">2+</option>
                                                <option value="3">3+</option>
                                                <option value="4">4+</option>
                                                <option value="5">5+</option>
                                            </select>
                                        </div>

                                        {/* Bathrooms */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
                                                <Bath className="w-4 h-4" />
                                                <span>Bathrooms</span>
                                            </label>
                                            <select
                                                value={filters.bathrooms}
                                                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            >
                                                <option value="">Any</option>
                                                <option value="1">1+</option>
                                                <option value="2">2+</option>
                                                <option value="3">3+</option>
                                                <option value="4">4+</option>
                                            </select>
                                        </div>

                                        {/* Year Built */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>Year Built</span>
                                            </label>
                                            <select
                                                value={filters.yearBuilt}
                                                onChange={(e) => handleFilterChange('yearBuilt', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            >
                                                <option value="">Any Year</option>
                                                <option value="2020+">2020 or newer</option>
                                                <option value="2015+">2015 or newer</option>
                                                <option value="2010+">2010 or newer</option>
                                                <option value="2000+">2000 or newer</option>
                                                <option value="1990+">1990 or newer</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Price & Size Section */}
                        <div className="space-y-4">
                            <button
                                onClick={() => toggleSection('price')}
                                className="w-full flex items-center justify-between text-left p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-gray-900 dark:text-white">Price & Size</span>
                                </div>
                                {expandedSections.price ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            <AnimatePresence>
                                {expandedSections.price && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4"
                                    >
                                        {/* Price Range */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                Price Range
                                            </label>
                                            <div className="space-y-3">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="2000000"
                                                    step="50000"
                                                    value={filters.priceRange[1]}
                                                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                                                    className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                                                />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        {formatPrice(filters.priceRange[0])}
                                                    </span>
                                                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                        {formatPrice(filters.priceRange[1])}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Square Footage */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-1">
                                                <Square className="w-4 h-4" />
                                                <span>Square Footage</span>
                                            </label>
                                            <div className="space-y-3">
                                                <input
                                                    type="range"
                                                    min="500"
                                                    max="10000"
                                                    step="100"
                                                    value={filters.sqftRange[1]}
                                                    onChange={(e) => handleFilterChange('sqftRange', [filters.sqftRange[0], parseInt(e.target.value)])}
                                                    className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                                                />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        {filters.sqftRange[0].toLocaleString()} sq ft
                                                    </span>
                                                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                        {filters.sqftRange[1].toLocaleString()} sq ft
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Features Section */}
                        <div className="space-y-4">
                            <button
                                onClick={() => toggleSection('features')}
                                className="w-full flex items-center justify-between text-left p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    <Star className="w-5 h-5 text-amber-500" />
                                    <span className="font-medium text-gray-900 dark:text-white">Features & Amenities</span>
                                </div>
                                {expandedSections.features ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            <AnimatePresence>
                                {expandedSections.features && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4 pl-4"
                                    >
                                        {Object.entries(featureCategories).map(([categoryKey, category]) => (
                                            <div key={categoryKey}>
                                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {category.label}
                                                </h4>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                    {category.features.map((feature) => {
                                                        const Icon = feature.icon;
                                                        return (
                                                            <motion.button
                                                                key={feature.value}
                                                                onClick={() => toggleFeature(feature.value)}
                                                                className={`p-3 rounded-lg text-sm transition-all duration-200 border ${filters.features.includes(feature.value)
                                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                                                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                                                                    }`}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                <div className="flex flex-col items-center space-y-1">
                                                                    <Icon className="w-4 h-4" />
                                                                    <span className="text-xs">{feature.label}</span>
                                                                </div>
                                                            </motion.button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Special Filters Section */}
                        <div className="space-y-4">
                            <button
                                onClick={() => toggleSection('special')}
                                className="w-full flex items-center justify-between text-left p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    <Zap className="w-5 h-5 text-purple-500" />
                                    <span className="font-medium text-gray-900 dark:text-white">Special Criteria</span>
                                </div>
                                {expandedSections.special ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            <AnimatePresence>
                                {expandedSections.special && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4"
                                    >
                                        <label className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={filters.tokenized}
                                                onChange={(e) => handleFilterChange('tokenized', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-slate-600 border-gray-300 dark:border-slate-500 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Zap className="w-4 h-4 text-purple-500" />
                                                <span className="text-gray-900 dark:text-gray-200 font-medium">Tokenized Properties</span>
                                            </div>
                                        </label>

                                        <label className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={filters.verified}
                                                onChange={(e) => handleFilterChange('verified', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-slate-600 border-gray-300 dark:border-slate-500 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Shield className="w-4 h-4 text-green-500" />
                                                <span className="text-gray-900 dark:text-gray-200 font-medium">Verified Properties</span>
                                            </div>
                                        </label>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProfessionalSearchAndFilters;
