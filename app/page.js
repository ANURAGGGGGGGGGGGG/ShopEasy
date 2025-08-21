'use client';

import { useState, useEffect } from 'react';
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import SearchAndFilter from "../components/SearchAndFilter";
import { FaSortAmountDown, FaStar, FaFilter, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCreditCard from "../components/AnimatedCreditCard";



// Simulating API call with client-side fetching
const getProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  // Demo: live-update credit card number on homepage
  const [demoCardNumber, setDemoCardNumber] = useState("");
  const handleDemoNumber = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const pretty = digits.replace(/(.{4})/g, "$1 ").trim();
    setDemoCardNumber(pretty);
  };

  // Initialize products
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(p => p.category))];
      setCategories(['all', ...uniqueCategories]);
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, categoryFilter, sortOption, priceRange]);

  // Add to cart animation
  const addToCart = (product) => {
    setCartCount(prev => prev + 1);
    
    // Create a visual effect
    const cartBtn = document.getElementById('cart-icon');
    if (cartBtn) {
      const btnRect = cartBtn.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      
      // Create flying element
      const flyingItem = document.createElement('div');
      flyingItem.innerHTML = `<div class="w-4 h-4 bg-blue-500 rounded-full"></div>`;
      flyingItem.style.position = 'fixed';
      flyingItem.style.left = `${window.scrollX + 50}px`; // Start from product position
      flyingItem.style.top = `${window.scrollY + 50}px`;
      flyingItem.style.zIndex = '1000';
      flyingItem.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      document.body.appendChild(flyingItem);
      
      // Animate to cart
      setTimeout(() => {
        flyingItem.style.left = `${btnCenterX}px`;
        flyingItem.style.top = `${btnCenterY}px`;
        flyingItem.style.transform = 'scale(0.5)';
        flyingItem.style.opacity = '0.5';
      }, 10);
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(flyingItem);
      }, 800);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setSortOption('default');
    setPriceRange([0, 1000]);
  };

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          categoryFilter={categoryFilter}
          sortOption={sortOption}
          priceRange={priceRange}
        />
        
        <div className="container mx-auto px-4 pt-4">
          <SearchAndFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            categories={categories}
            resetFilters={resetFilters}
          />
        </div>
        
        {/* Main content */}
        <main className="container mx-auto px-4 py-8">
          {/* Stats and filter summary */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {categoryFilter === 'all' ? 'All Products' : categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
              </h2>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-1 rounded-lg border border-gray-300 text-sm flex items-center">
                <FaSortAmountDown className="mr-2 text-gray-500" />
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent focus:outline-none text-black"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 flex items-center"
              >
                <FaFilter className="text-gray-600 mr-1" /> Filters
              </button>
            </div>
          </div>
          
          {/* Loading state */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="bg-gray-200 h-48 w-full" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Empty state */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                    <FaSearch className="text-gray-500 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={resetFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <ProductCard 
                          product={product} 
                          onAddToCart={() => addToCart(product)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </main>

        {/* Demo: Real-time credit card number updater */}
        <section className="container mx-auto px-4 pb-12">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <AnimatedCreditCard number={demoCardNumber} />
            <div className="w-full max-w-md mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number (Demo)</label>
              <input
                type="text"
                inputMode="numeric"
                value={demoCardNumber}
                onChange={handleDemoNumber}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-black"
              />
              <p className="text-xs text-gray-500 mt-2">Type to update the card in real-time.</p>
            </div>
          </div>
        </section>
        
        {/* Floating cart button for mobile */}
        <div className="md:hidden fixed bottom-6 right-6 z-20">
          <button 
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
            id="cart-icon"
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
    );
}