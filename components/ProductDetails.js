"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiHeart,
  FiImage,
  FiMinus,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import Stars from "./Stars";
import {
  displayCategory,
  formatINR,
  FREE_SHIPPING_THRESHOLD_INR,
} from "@/lib/store";

const TRUST_ROWS = [
  { icon: FiTruck, label: "Free shipping", detail: "on orders over ₹500" },
  { icon: FiRefreshCw, label: "30-day returns", detail: "no questions asked" },
  { icon: FiShield, label: "Secure checkout", detail: "card, UPI or cash" },
];

export default function ProductDetails({ product, onClose }) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const { has, toggle } = useWishlist();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!product) return null;

  const cartQuantity = items.find((item) => item.id === product.id)?.quantity || 0;
  const wished = has(product.id);

  const handleAddToCart = () => addItem(product, 1);
  const handleDec = () => {
    const next = cartQuantity - 1;
    if (next === 0) removeItem(product.id);
    else updateQuantity(product.id, next);
  };
  const handleInc = () => updateQuantity(product.id, cartQuantity + 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 backdrop-blur-sm md:items-center md:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden border border-line bg-surface md:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-10 rounded-full border border-line bg-surface/95 p-2.5 text-ink transition-colors duration-300 ease-soft hover:border-ink"
        >
          <FiX size={16} />
        </button>

        <div className="relative h-[36vh] shrink-0 bg-paper-deep md:h-auto md:w-[46%]">
          {imageFailed ? (
            <span className="flex h-full w-full flex-col items-center justify-center gap-2.5 text-ink-mute">
              <FiImage size={26} />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                Image unavailable
              </span>
            </span>
          ) : (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              onError={() => setImageFailed(true)}
              className="object-contain p-6 md:p-10"
              priority
            />
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-surface/95 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft backdrop-blur-sm">
            {displayCategory(product.category)}
          </span>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            {displayCategory(product.category)}
          </p>

          <h2 className="mt-3 font-display text-[26px] font-medium leading-tight tracking-[-0.01em] text-ink md:text-3xl">
            {product.title}
          </h2>

          <div className="mt-3 flex items-center gap-3">
            <Stars rate={product.rating?.rate || 0} count={product.rating?.count} />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
              {product.rating?.count || 0} reviews
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-[32px] font-medium tracking-tight text-ink tabular-nums">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-sm text-ink-mute line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink-soft md:text-[15px]">
            {product.description}
          </p>

          <ul className="mt-7 border-t border-line">
            {TRUST_ROWS.map((row) => {
              const Icon = row.icon;
              return (
                <li
                  key={row.label}
                  className="flex items-center gap-3.5 border-b border-line py-3.5"
                >
                  <Icon size={16} className="shrink-0 text-accent" />
                  <span className="text-sm font-medium text-ink">{row.label}</span>
                  <span className="ml-auto text-right font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    {row.detail}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex items-center gap-3 pt-7">
            {cartQuantity === 0 ? (
              <>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors duration-300 ease-soft hover:bg-accent-deep active:scale-[0.98]"
                >
                  Add to bag — {formatINR(product.price)}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(product)}
                  aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                  aria-pressed={wished}
                  className="rounded-full border border-line-strong p-3.5 text-ink transition-colors duration-300 ease-soft hover:border-ink active:scale-[0.98]"
                >
                  <FiHeart size={17} className={wished ? "fill-accent text-accent" : ""} />
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-1 items-center justify-between rounded-full border border-line bg-paper px-3 py-2">
                  <button
                    type="button"
                    onClick={handleDec}
                    aria-label="Decrease quantity"
                    className="rounded-full p-2.5 text-ink transition-colors hover:bg-surface"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="font-mono text-sm text-ink tabular-nums">
                    {cartQuantity} in bag
                  </span>
                  <button
                    type="button"
                    onClick={handleInc}
                    aria-label="Increase quantity"
                    className="rounded-full p-2.5 text-ink transition-colors hover:bg-surface"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(product)}
                  aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                  aria-pressed={wished}
                  className="rounded-full border border-line-strong p-3.5 text-ink transition-colors duration-300 ease-soft hover:border-ink active:scale-[0.98]"
                >
                  <FiHeart size={17} className={wished ? "fill-accent text-accent" : ""} />
                </button>
              </>
            )}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
            Free shipping over ₹{FREE_SHIPPING_THRESHOLD_INR} · taxes shown at checkout
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
