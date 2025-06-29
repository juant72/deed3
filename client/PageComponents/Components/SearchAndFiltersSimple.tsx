import React, { useState } from "react";

interface SearchAndFiltersSimpleProps {
  onSearchChange?: (term: string) => void;
  onFiltersChange?: (filters: any) => void;
}

const SearchAndFiltersSimple: React.FC<SearchAndFiltersSimpleProps> = ({ 
  onSearchChange, 
  onFiltersChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = ['all', 'Housing', 'Office', 'Rental', 'Farmhouse', 'Commercial'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under 1 ETH', value: '0-1' },
    { label: '1-5 ETH', value: '1-5' },
    { label: '5+ ETH', value: '5-plus' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFiltersChange?.({ category, priceRange });
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
    onFiltersChange?.({ category: selectedCategory, priceRange: range });
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full py-3 px-4 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-slate-800">
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <select
            value={priceRange}
            onChange={(e) => handlePriceRangeChange(e.target.value)}
            className="w-full py-3 px-4 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value} className="bg-slate-800">
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== 'all' || priceRange !== 'all') && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-gray-400 text-sm">Active filters:</span>
          
          {searchTerm && (
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              Search: "{searchTerm}"
            </span>
          )}
          
          {selectedCategory !== 'all' && (
            <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Category: {selectedCategory}
            </span>
          )}
          
          {priceRange !== 'all' && (
            <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
              Price: {priceRanges.find(r => r.value === priceRange)?.label}
            </span>
          )}
          
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange('all');
              onSearchChange?.('');
              onFiltersChange?.({ category: 'all', priceRange: 'all' });
            }}
            className="text-red-400 hover:text-red-300 text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndFiltersSimple;
