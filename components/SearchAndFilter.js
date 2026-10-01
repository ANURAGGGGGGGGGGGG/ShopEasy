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
