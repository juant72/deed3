import React, { useState, useCallback } from 'react';
import ProfessionalSearchAndFilters from '../components/ui/search/ProfessionalSearchAndFilters';

const SearchExamplePage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [resultCount, setResultCount] = useState(1247); // Example count

    const handleSearchChange = useCallback((searchTerm: string) => {
        console.log('Search term changed:', searchTerm);
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Update results based on search
        }, 500);
    }, []);

    const handleFiltersChange = useCallback((filters: any) => {
        console.log('Filters changed:', filters);
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Update results based on filters
        }, 300);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Advanced Property Search
                    </h1>
                    <p className="text-slate-300">
                        Professional search component with TypeScript
                    </p>
                </div>

                {/* Professional Search Component */}
                <ProfessionalSearchAndFilters
                    onSearchChange={handleSearchChange}
                    onFiltersChange={handleFiltersChange}
                    isLoading={isLoading}
                    resultCount={resultCount}
                    className="mb-8"
                    initialFilters={{
                        priceRange: [100000, 800000],
                        verified: true
                    }}
                />

                {/* Results Placeholder */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Search Results
                    </h2>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="loading-shimmer h-32 rounded-lg"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-600 dark:text-gray-400">
                            Results will appear here based on your search criteria...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchExamplePage;
