<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiSearch, FiX } from "react-icons/fi";
import { useShop } from "./ShopContext";
import { displayCategory, formatINR } from "@/lib/store";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

function DrawerHeading({ children }) {
  return (
    <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
      {children}
    </h3>
  );
}

export default function SearchAndFilter() {
  const {
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
    filteredProducts,
    resetFilters,
  } = useShop();

  useEffect(() => {
    if (!isFilterOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsFilterOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isFilterOpen, setIsFilterOpen]);

  const close = () => setIsFilterOpen(false);

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.aside
            key="filter-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-surface"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                  Filters
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute tabular-nums">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close filters"
                className="rounded-full border border-line p-2.5 text-ink transition-colors hover:border-ink"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="border-b border-line pb-7">
                <DrawerHeading>Search</DrawerHeading>
                <div className="relative">
                  <FiSearch
                    size={15}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute"
                  />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search products…"
                    aria-label="Search products"
                    className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-b border-line py-7">
                <DrawerHeading>Departments</DrawerHeading>
                <div className="grid grid-cols-2 gap-2.5">
                  {categories.map((category) => {
                    const active = categoryFilter === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setCategoryFilter(category)}
                        className={`rounded-full border px-4 py-2.5 text-[13px] capitalize transition-colors duration-300 ease-soft ${
                          active
                            ? "border-ink bg-ink text-paper"
                            : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
                        }`}
                      >
                        {category === "all" ? "All" : displayCategory(category)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-b border-line py-7">
                <DrawerHeading>Sort by</DrawerHeading>
                <div>
                  {SORT_OPTIONS.map((option) => {
                    const active = sortOption === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSortOption(option.value)}
                        className={`flex w-full items-center justify-between border-b border-line/70 py-3.5 text-left text-sm transition-colors last:border-b-0 ${
                          active ? "font-medium text-ink" : "text-ink-soft hover:text-ink"
                        }`}
                      >
                        {option.label}
                        {active && <FiCheck size={15} className="text-accent" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="py-7">
                <div className="mb-4 flex items-baseline justify-between">
                  <DrawerHeading>Maximum price</DrawerHeading>
                  <span className="font-mono text-[11px] tracking-[0.06em] text-ink tabular-nums">
                    {formatINR(priceRange[1])}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(event) =>
                    setPriceRange([priceRange[0], parseInt(event.target.value, 10)])
                  }
                  aria-label="Maximum price"
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-paper-deep"
                />
                <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute tabular-nums">
                  <span>{formatINR(priceRange[0])}</span>
                  <span>{formatINR(1000)}</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-3 border-t border-line px-6 py-5">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 rounded-full border border-line-strong py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 ease-soft hover:border-ink active:scale-[0.98]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={close}
                className="flex-[1.4] rounded-full bg-ink py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
              >
                Show {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "piece" : "pieces"}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
=======
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
>>>>>>> origin/main
