"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useShop } from "../ShopContext";
import Stars from "../Stars";
import { formatINR } from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1];

function rise(delay) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

export default function Hero() {
  const { products, isLoading } = useShop();

  const picks = useMemo(() => {
    const sorted = [...products].sort(
      (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
    );
    const chosen = [];
    for (const product of sorted) {
      if (!chosen.some((item) => item.category === product.category)) {
        chosen.push(product);
      }
      if (chosen.length === 2) break;
    }
    if (chosen.length < 2) {
      for (const product of sorted) {
        if (!chosen.includes(product)) chosen.push(product);
        if (chosen.length === 2) break;
      }
    }
    return chosen;
  }, [products]);

  const departmentCount = useMemo(
    () => new Set(products.map((product) => product.category)).size,
    [products]
  );

  const stats = [
    { value: products.length > 0 ? `${products.length} pieces` : "Whole catalogue", label: "in stock right now" },
    { value: departmentCount > 0 ? `${departmentCount} departments` : "Four departments", label: "to shop by" },
    { value: "30 days", label: "to change your mind" },
  ];

  const [lead, companion] = picks;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 pb-24 pt-14 md:px-8 md:pb-32 md:pt-20 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-6">
          <motion.p
            {...rise(0.05)}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute"
          >
            Autumn edit — 2026
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="mt-7 font-display text-[clamp(2.5rem,6vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ink"
          >
            {products.length > 0
              ? `${products.length} pieces worth keeping.`
              : "Pieces worth keeping."}
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="mt-7 max-w-[48ch] text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Apparel, accessories and small tech — honestly priced in rupees, with
            free shipping over ₹500 and a full month to change your mind.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/#shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
            >
              Shop the collection
              <FiArrowRight
                size={14}
                className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/#categories"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 ease-soft hover:border-ink active:scale-[0.98]"
            >
              Browse departments
            </Link>
          </motion.div>

          <motion.dl
            {...rise(0.36)}
            className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-7"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-lg tracking-tight text-ink md:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink-mute">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-6">
          {lead ? (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="group relative aspect-[4/5] overflow-hidden border border-line bg-surface"
            >
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain p-8 transition-transform duration-700 ease-soft group-hover:scale-[1.04] md:p-14"
                priority
              />
              <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] border border-line bg-surface/95 px-4 py-3 backdrop-blur-sm">
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  {lead.category}
                </p>
                <p className="mt-1 flex items-baseline gap-3">
                  <span className="font-display text-lg tracking-tight text-ink">
                    {formatINR(lead.price)}
                  </span>
                  <Stars rate={lead.rating?.rate || 0} count={lead.rating?.count} className="text-[11px]" />
                </p>
              </div>
            </motion.div>
          ) : isLoading ? (
            <div className="skeleton aspect-[4/5] border border-line" />
          ) : null}

          {companion && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="absolute -bottom-9 -right-2 hidden w-44 border border-line bg-surface p-3 shadow-[0_24px_60px_-34px_rgba(26,23,19,0.55)] sm:block lg:-right-6 lg:w-52"
            >
              <div className="relative aspect-square overflow-hidden bg-paper-deep">
                <Image
                  src={companion.image}
                  alt={companion.title}
                  fill
                  sizes="208px"
                  className="object-contain p-4"
                />
              </div>
              <p className="mt-3 line-clamp-1 text-[13px] font-medium text-ink">
                {companion.title}
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.06em] text-ink-soft tabular-nums">
                {formatINR(companion.price)}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
