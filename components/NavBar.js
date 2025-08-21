"use client";
import Link from "next/link";
import { FaShoppingCart, FaSearch, FaFilter } from "react-icons/fa";
import { useCart } from "./CartContext";

export default function NavBar({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  setIsFilterOpen,
  categoryFilter,
  sortOption,
  priceRange
}) {
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const isFiltered =
    categoryFilter !== "all" ||
    searchTerm ||
    sortOption !== "default" ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000;

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
          ShopEasy
        </Link>

        {/* Center search bar */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Filter (desktop) */}
        <div className="hidden md:block relative mr-4">
          <button
            onClick={() => setIsFilterOpen && setIsFilterOpen(!isFilterOpen)}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex items-center"
          >
            <FaFilter className="text-gray-600" />
          </button>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {isFiltered ? "!" : 0}
          </div>
        </div>

        {/* Cart */}
        <Link href="/cart" className="relative p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50" id="cart-icon">
          <FaShoppingCart className="text-gray-600" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}