import React from "react";
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
  SortDesc
} from 'lucide-react';

const SearchAndFilters: React.FC<{ onSearchChange, onFiltersChange, className = '' }> = ({ onSearchChange, onFiltersChange, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [sortBy, setSortBy] = useState('price-asc');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    yearBuilt: '',
    features: [],
    tokenized: false,
    verified: false
  });

  const propertyTypes = [
    'Apartment',
    'House',
    'Condo',
    'Townhouse',
    'Villa',
    'Penthouse',
    'Studio',
    'Loft'
  ];

  const features = [
    'Pool',
    'Gym',
    'Parking',
    'Balcony',
    'Garden',
    'Security',
    'Elevator',
    'Storage',
    'Pet Friendly',
    'Furnished'
  ];

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High', icon: SortAsc },
    { value: 'price-desc', label: 'Price: High to Low', icon: SortDesc },
    { value: 'newest', label: 'Newest First', icon: Calendar },
    { value: 'rating', label: 'Highest Rated', icon: Star },
    { value: 'roi', label: 'Best ROI', icon: TrendingUp }
  ];

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearchChange?.(searchTerm);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onSearchChange]);

  useEffect(() => {
    onFiltersChange?.({ ...filters, sortBy, viewMode });
  }, [filters, sortBy, viewMode, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleFeature = (feature) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const clearFilters: React.FC = () => {
    setFilters({
      priceRange: [0, 1000000],
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      yearBuilt: '',
      features: [],
      tokenized: false,
      verified: false
    });
    setSearchTerm('');
    setSortBy('price-asc');
  };

  const activeFiltersCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    if (typeof value === 'boolean') return count + (value ? 1 : 0);
    if (value && value !== '' && !(Array.isArray(value) && value.length === 2 && value[0] === 0 && value[1] === 1000000)) return count + 1;
    return count;
  }, 0);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location, property type, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative p-3 rounded-lg border transition-colors ${
              showFilters || activeFiltersCount > 0
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-slate-800 border-slate-700 text-gray-400 hover:text-white'
            }`}
          >
            <Filter className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-3 transition-colors ${
                viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Map className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-sm text-gray-400 whitespace-nowrap">Quick Filters:</span>
        {['Verified', 'Tokenized', 'New Listings', 'High ROI'].map((filter) => (
          <button
            key={filter}
            onClick={() => {
              if (filter === 'Verified') handleFilterChange('verified', !filters.verified);
              if (filter === 'Tokenized') handleFilterChange('tokenized', !filters.tokenized);
            }}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              (filter === 'Verified' && filters.verified) || (filter === 'Tokenized' && filters.tokenized)
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>$0</span>
                    <span>${filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bathrooms
                </label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Built */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year Built
                </label>
                <select
                  value={filters.yearBuilt}
                  onChange={(e) => handleFilterChange('yearBuilt', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Year</option>
                  <option value="2020+">2020 or newer</option>
                  <option value="2010+">2010 or newer</option>
                  <option value="2000+">2000 or newer</option>
                  <option value="1990+">1990 or newer</option>
                </select>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Features & Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {features.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.features.includes(feature)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Filters */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.tokenized}
                  onChange={(e) => handleFilterChange('tokenized', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Tokenized Properties Only</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified}
                  onChange={(e) => handleFilterChange('verified', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Verified Properties Only</span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAndFilters;
