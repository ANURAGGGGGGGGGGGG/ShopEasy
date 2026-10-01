"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "wishlist";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed);
      } catch {
        // ignore corrupted data
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const has = useCallback((id) => items.some((item) => item.id === id), [items]);

  const toggle = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, has, toggle, removeItem, clearWishlist }),
    [items, has, toggle, removeItem, clearWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return useContext(WishlistContext);
}
