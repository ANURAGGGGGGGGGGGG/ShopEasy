"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProductCard from "../ProductCard";
import { useShop } from "../ShopContext";

const EASE = [0.16, 1, 0.3, 1];

export default function FeaturedRail() {
  const { products } = useShop();
  const railRef = useRef(null);

  const featured = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 8);
  }, [products]);

  if (featured.length === 0) return null;

  const scrollByCards = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("[data-rail-card]");
    const distance = card ? card.getBoundingClientRect().width + 20 : 340;
    rail.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              Most loved
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-ink">
              Top-rated this week
            </h2>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-ink-soft md:text-base">
              The eight highest-rated pieces in the shop, ranked by the people
              who bought them.
            </p>
          </div>
          <div className="hidden gap-3 pb-1 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll to previous products"
              className="rounded-full border border-line-strong p-3 text-ink transition-colors duration-300 ease-soft hover:border-ink hover:bg-surface active:scale-95"
            >
              <FiArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Scroll to next products"
              className="rounded-full border border-line-strong p-3 text-ink transition-colors duration-300 ease-soft hover:border-ink hover:bg-surface active:scale-95"
            >
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
        >
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              data-rail-card
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06, ease: EASE }}
              className="w-[76vw] max-w-[330px] shrink-0 snap-start sm:w-[320px] lg:w-[330px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
