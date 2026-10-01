"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiChevronDown,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";
import ProductCard from "../ProductCard";
import SearchAndFilter from "../SearchAndFilter";
import { useShop } from "../ShopContext";
import { displayCategory } from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1];

function SkeletonCard() {
  return (
    <div className="border border-line bg-surface p-4">
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="skeleton mt-4 h-3 w-2/3" />
      <div className="skeleton mt-2.5 h-3 w-1/3" />
      <div className="skeleton mt-5 h-9 w-full rounded-full" />
    </div>
  );
}

export default function ShopSection() {
  const {
    products,
    filteredProducts,
    isLoading,
    hasError,
    loadProducts,
    categories,
    categoryFilter,
    setCategoryFilter,
    sortOption,
    setSortOption,
    searchTerm,
    setSearchTerm,
    activeFilterCount,
    setIsFilterOpen,
    resetFilters,
  } = useShop();

  const showSkeleton = isLoading && !hasError;
  const showError = hasError && !isLoading;
  const showEmpty = !isLoading && !hasError && filteredProducts.length === 0;

  return (
    <section id="shop" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              The catalogue
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-ink">
              {categoryFilter === "all"
                ? "Everything in the shop"
                : displayCategory(categoryFilter)}
            </h2>
          </div>
          <p className="pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute tabular-nums">
            Showing {filteredProducts.length} / {products.length} pieces
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FiSearch
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name or description…"
              aria-label="Search the catalogue"
              className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-11 text-sm text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-mute transition-colors hover:bg-paper-deep hover:text-ink"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                aria-label="Sort products"
                className="appearance-none rounded-full border border-line bg-surface py-3 pl-5 pr-10 text-sm text-ink focus:border-ink focus:outline-none"
              >
                <option value="default">Sort: Featured</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
                <option value="rating">Sort: Top rated</option>
              </select>
              <FiChevronDown
                size={14}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-mute"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="relative flex items-center gap-2 rounded-full border border-line bg-surface py-3 pl-5 pr-5 text-sm text-ink transition-colors duration-300 ease-soft hover:border-ink"
            >
              <FiSliders size={15} />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 font-mono text-[10px] text-paper tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
          {categories.map((category) => {
            const active = categoryFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] capitalize transition-colors duration-300 ease-soft ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-surface text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                {category === "all" ? "All" : displayCategory(category)}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
          <span className="tabular-nums">
            {showError
              ? "Feed offline"
              : `${filteredProducts.length} ${filteredProducts.length === 1 ? "result" : "results"}`}
          </span>
          {activeFilterCount > 0 && !showError && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Clear filters
            </button>
          )}
        </div>

        {showSkeleton && (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-8 flex flex-col items-center border border-line bg-surface px-6 py-16 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center border border-line-strong">
              <FiAlertTriangle size={22} className="text-clay" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
              We couldn&apos;t reach the catalogue
            </h3>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
              The product feed didn&apos;t respond. This usually passes in a
              moment — try again and the shop will refill.
            </p>
            <button
              type="button"
              onClick={loadProducts}
              className="mt-8 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
            >
              Retry
            </button>
          </motion.div>
        )}

        {showEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-8 flex flex-col items-center border border-dashed border-line-strong bg-surface px-6 py-16 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center border border-line-strong">
              <FiSearch size={22} className="text-ink-mute" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
              Nothing matches those filters
            </h3>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
              Try another search, widen the price range, or start over with the
              full catalogue.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-8 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
            >
              Reset everything
            </button>
          </motion.div>
        )}

        {!isLoading && !hasError && filteredProducts.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index, 6) * 0.03,
                    ease: EASE,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <SearchAndFilter />
    </section>
  );
}
