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
  };
  const handleInc = () => updateQuantity(product.id, cartQuantity + 1);

  return (
    <motion.div
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
            <Image
              src={product.image}
              alt={product.title}
              fill
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
        </div>
      </motion.div>
    </motion.div>
  );
}