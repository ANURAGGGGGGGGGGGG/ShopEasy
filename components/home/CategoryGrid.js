"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { useShop } from "../ShopContext";
import { displayCategory, scrollToSection } from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1];

const SPANS = [
  "lg:col-span-6 lg:row-span-2 min-h-[320px] lg:min-h-0",
  "lg:col-span-6 min-h-[260px] lg:min-h-0",
  "lg:col-span-3 min-h-[240px] lg:min-h-0",
  "lg:col-span-3 min-h-[240px] lg:min-h-0",
];

export default function CategoryGrid() {
  const { products, isLoading, setCategoryFilter } = useShop();

  const stats = useMemo(() => {
    const map = new Map();
    for (const product of products) {
      const existing = map.get(product.category);
      if (!existing) {
        map.set(product.category, {
          category: product.category,
          count: 1,
          best: product,
        });
      } else {
        existing.count += 1;
        if ((product.rating?.rate || 0) > (existing.best.rating?.rate || 0)) {
          existing.best = product;
        }
      }
    }
    return [...map.values()];
  }, [products]);

  const select = (category) => {
    setCategoryFilter(category);
    scrollToSection("shop");
  };

  if (stats.length === 0 && !isLoading) return null;

  return (
    <section id="categories" className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              Departments
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-ink">
              Shop by category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => select("all")}
            className="group inline-flex items-center gap-2 pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
          >
            All pieces
            <FiArrowRight
              size={13}
              className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-12 lg:grid-rows-2">
          {isLoading
            ? [0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`skeleton border border-line ${
                    index === 0
                      ? "sm:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[300px]"
                      : index === 1
                        ? "sm:col-span-2 lg:col-span-6 min-h-[240px]"
                        : "lg:col-span-3 min-h-[220px]"
                  }`}
                />
              ))
            : stats.map((stat, index) => (
                <motion.button
                  key={stat.category}
                  type="button"
                  onClick={() => select(stat.category)}
                  aria-label={`Browse ${displayCategory(stat.category)}`}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
                  className={`group relative flex flex-col justify-between overflow-hidden border border-line bg-surface p-6 text-left transition-colors duration-300 ease-soft hover:border-ink/30 ${
                    SPANS[index] || "lg:col-span-3 min-h-[240px]"
                  }`}
                >
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                        {stat.count} pieces
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tight text-ink md:text-[28px]">
                        {displayCategory(stat.category)}
                      </h3>
                    </div>
                    <FiArrowUpRight
                      size={18}
                      className="shrink-0 -translate-x-1.5 text-ink-mute opacity-0 transition-all duration-300 ease-soft group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </div>
                  <div className="relative mt-4 min-h-0 flex-1">
                    <Image
                      src={stat.best.image}
                      alt={stat.best.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-contain object-bottom p-4 transition-transform duration-500 ease-soft group-hover:scale-[1.06]"
                    />
                  </div>
                </motion.button>
              ))}
        </div>
      </div>
    </section>
  );
}
