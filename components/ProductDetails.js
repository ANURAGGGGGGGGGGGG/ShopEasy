<<<<<<< HEAD
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
=======
'use client';

import { FaStar, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from './CartContext';
import { FiMinus, FiPlus } from 'react-icons/fi';

const INR_RATE = 83;

export default function ProductDetails({ product, onClose }) {
  const { items, addItem, updateQuantity, removeItem } = useCart();

  if (!product) return null;

  const cartQuantity = items.find((i) => i.id === product.id)?.quantity || 0;

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  const handleDec = () => {
    const next = cartQuantity - 1;
    next === 0 ? removeItem(product.id) : updateQuantity(product.id, next);
>>>>>>> origin/main
  };
  const handleInc = () => updateQuantity(product.id, cartQuantity + 1);

  return (
    <motion.div
<<<<<<< HEAD
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
=======
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
>>>>>>> origin/main
            <Image
              src={product.image}
              alt={product.title}
              fill
<<<<<<< HEAD
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
=======
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(product.rating?.rate || 4.5) ? "fill-current" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.rating?.count || 120} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <span className="font-bold text-3xl text-black">₹{(product.price * INR_RATE).toFixed(0)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through ml-2">
                  ₹{(product.originalPrice * INR_RATE).toFixed(0)}
                </span>
              )}
            </div>
            
            {/* Category */}
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500">Category</span>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                  {product.category}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Add to cart button */}
            <div className="mt-auto">
              {cartQuantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={handleDec}
                      className="px-4 py-2 hover:bg-gray-100 text-black"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={18} />
                    </button>
                    <span className="px-4 select-none text-black">{cartQuantity}</span>
                    <button
                      onClick={handleInc}
                      className="px-4 py-2 hover:bg-gray-100 text-black"
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
>>>>>>> origin/main
        </div>
      </motion.div>
    </motion.div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
