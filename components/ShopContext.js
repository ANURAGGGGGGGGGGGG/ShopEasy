"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ShopContext = createContext(null);

const DEFAULT_PRICE_RANGE = [0, 1000];

export function ShopProvider({ children, initialProducts = [], initialError = false }) {
  const [products, setProducts] = useState(() => initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(() => initialError);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = useMemo(() => {
    const seen = [];
    products.forEach((product) => {
      if (product.category && !seen.includes(product.category)) {
        seen.push(product.category);
      }
    });
    return ["all", ...seen];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter);
    }

    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [products, searchTerm, categoryFilter, sortOption, priceRange]);

  const activeFilterCount = useMemo(
    () =>
      [
        categoryFilter !== "all",
        searchTerm !== "",
        sortOption !== "default",
        priceRange[0] > 0 || priceRange[1] < 1000,
      ].filter(Boolean).length,
    [categoryFilter, searchTerm, sortOption, priceRange]
  );

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSortOption("default");
    setPriceRange(DEFAULT_PRICE_RANGE);
  }, []);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    let data = null;

    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) data = json;
      }
    } catch {
      // fall through to the direct source
    }

    if (!data) {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) data = json;
        }
      } catch {
        // reported as an error below
      }
    }

    if (data) {
      setProducts(data);
    } else {
      setHasError(true);
    }

    setIsLoading(false);
    return Boolean(data);
  }, []);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      isLoading,
      setIsLoading,
      hasError,
      setHasError,
      loadProducts,
      categories,
      filteredProducts,
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
      activeFilterCount,
      resetFilters,
    }),
    [
      products,
      isLoading,
      hasError,
      loadProducts,
      categories,
      filteredProducts,
      searchTerm,
      categoryFilter,
      sortOption,
      priceRange,
      isFilterOpen,
      activeFilterCount,
      resetFilters,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
