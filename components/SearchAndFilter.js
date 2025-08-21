'use client';

import { FaSearch, FaFilter, FaSortAmountDown, FaStar, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
  priceRange,
  setPriceRange,
  isFilterOpen,
  setIsFilterOpen,
  categories,
  resetFilters
}) {
  // Count active filters for badge
  const activeFilterCount = [
    categoryFilter !== 'all',
    searchTerm !== '',
    sortOption !== 'default',
    priceRange[0] > 0 || priceRange[1] < 1000
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile filter controls */}
      <div className="flex items-center justify-between gap-3 mb-6 px-4 md:hidden">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400 bg-white shadow-sm"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center relative transition-colors"
        >
          <FaFilter className="text-white" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop filter controls */}
     

      {/* Filter sidebar without backdrop */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-40 p-6 overflow-y-auto border-l border-gray-200"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="text-gray-500 text-xl" />
              </button>
            </div>
            
            {/* Search inside filters */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-3 rounded-xl text-base transition-all capitalize ${
                    categoryFilter === 'all' 
                      ? 'bg-blue-100 text-black font-semibold border border-blue-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-black'
                  }`}
                >
                  All Products
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-4 py-3 rounded-xl text-base transition-all capitalize ${
                      categoryFilter === category 
                        ? 'bg-blue-100 text-black font-semibold border border-blue-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 text-black">Sort By</h3>
              <div className="space-y-3 text-black">
                {[
                  { value: 'default', label: 'Default', icon: <FaSortAmountDown /> },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Top Rated', icon: <FaStar className="text-yellow-500" /> }
                ].map(option => (
                  <button 
                    key={option.value}
                    onClick={() => setSortOption(option.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base transition-all flex items-center gap-3 ${
                      sortOption === option.value 
                        ? 'bg-blue-100 text-black font-semibold border border-blue-300' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {option.icon && <span className="text-lg">{option.icon}</span>}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-gray-800">Price Range</h3>
                <span className="text-black font-medium">₹{priceRange[0] * 83} - ₹{priceRange[1] * 83}</span>
              </div>
              <div className="px-2">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>₹{priceRange[0] * 83}</span>
                  <span>₹{priceRange[1] * 83}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="10"
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3 mt-8 border-t border-gray-200 pt-6">
              <button 
                onClick={resetFilters}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Reset All
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}