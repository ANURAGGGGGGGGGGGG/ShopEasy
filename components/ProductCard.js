"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCartPlus, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import ShinyText from "./ShinyText";
import { useCart } from "./CartContext";
import ProductDetails from "./ProductDetails";

const INR_RATE = 83;

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const handleTilt = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 8; // amplitude ~8deg
    const rotateX = -((y - midY) / midY) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const resetTilt = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };
  /* --------------------------------------------------------------------- */
  /* Cart helpers                                                          */
  /* --------------------------------------------------------------------- */
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const cartQuantity = items.find((i) => i.id === product.id)?.quantity || 0;

  const handleAdd = () => {
    addItem(product, 1);
    setSpark(true);
    setTimeout(() => setSpark(false), 400);
  };
  const handleDec = () => {
    const next = cartQuantity - 1;
    next === 0 ? removeItem(product.id) : updateQuantity(product.id, next);
  };
  const handleInc = () => updateQuantity(product.id, cartQuantity + 1);

  /* --------------------------------------------------------------------- */
  /* Local UI state                                                        */
  /* --------------------------------------------------------------------- */
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [spark, setSpark] = useState(false);

  /* --------------------------------------------------------------------- */
  /* Render                                                                */
  /* --------------------------------------------------------------------- */
  return (
    <>
      <motion.div
         ref={cardRef}
         style={{ transition: "transform 0.2s ease-out" }}
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        className="border border-gray-200 rounded-xl p-4 flex flex-col h-full transition-all hover:shadow-xl hover:border-gray-300 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* -------------------- wishlist --------------------------------- */}
        <button
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-600" />}
        </button>

        {/* -------------------- image & quick-view ----------------------- */}
        <div
          className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 group"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width:768px)100vw,50vw"
          />
          <AnimatePresence>
            {hover && (
              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(true);
                  }}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium hover:bg-gray-100 text-black"
                >
                  Quick View
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* -------------------- rating ----------------------------------- */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(product.rating?.rate || 4.5) ? "fill-current" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">({product.rating?.count || 120})</span>
        </div>

        {/* -------------------- title ------------------------------------ */}
        <h3 className="font-semibold mb-2 line-clamp-2 min-h-[48px] text-gray-900 hover:text-blue-600">
          {product.title}
        </h3>

        {/* -------------------- price & cart controls -------------------- */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="font-bold text-xl text-gray-900">
              ₹{(product.price * INR_RATE).toFixed(0)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through ml-2 text-sm">
                ₹{(product.originalPrice * INR_RATE).toFixed(0)}
              </span>
            )}
          </div>

          {cartQuantity === 0 ? (
            <button
              onClick={handleAdd}
              className="shiny-btn flex items-center gap-2 px-6 py-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 text-gray-100 font-medium border border-gray-600 backdrop-blur-sm shadow-inner overflow-hidden relative"
            >
              <FaCartPlus className="text-lg" /> <ShinyText text="Add" speed={3} />
              {spark && (
                <span className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className="spark-line"
                      style={{ "--angle": `${i * 45}deg` }}
                    ></span>
                  ))}
                </span>
              )}
            </button>
          ) : (
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={handleDec}
                className="px-3 py-1 hover:bg-gray-100 text-black"
                aria-label="Decrease quantity"
              >
                <FiMinus size={16} />
              </button>
              <span className="px-3 select-none text-black">{cartQuantity}</span>
              <button
                onClick={handleInc}
                className="px-3 py-1 hover:bg-gray-100 text-black"
                aria-label="Increase quantity"
              >
                <FiPlus size={16} />
              </button>
            </div>
          )}
        </div>

        {/* -------------------- badges ----------------------------------- */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </motion.div>

      {/* -------------------- modal ------------------------------------- */}
      <AnimatePresence>
        {showDetails && <ProductDetails product={product} onClose={() => setShowDetails(false)} />}
      </AnimatePresence>
    </>
  );
}