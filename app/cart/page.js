'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../../components/CartContext";
import { FiShoppingBag, FiX, FiPlus, FiMinus, FiTrash2, FiArrowLeft } from "react-icons/fi";

const INR_RATE = 83;

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(null);
  // Free delivery for orders above ₹500
  const shipping = total * INR_RATE > 500 ? 0 : 99;
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate subtotal
  const subtotal = total * INR_RATE;
  const grandTotal = subtotal + shipping - discount;
  
  // Handle coupon code
  const applyCoupon = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'SAVE10') {
        setDiscount(subtotal * 0.1);
      } else {
        setDiscount(0);
      }
      setIsLoading(false);
    }, 1000);
  };
  
  // Animation for removing items
  const handleRemove = (id) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeItem(id);
      setIsRemoving(null);
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center max-[426px]:justify-start max-[426px]:gap-3">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <FiArrowLeft className="mr-2 max-[426px]:mr-0" />
            <span className="max-[426px]:hidden">Continue Shopping</span>
          </Link>
          <h1 className="text-2xl max-[426px]:text-xl font-bold text-gray-800 flex items-center">
            <FiShoppingBag className="mr-2" />
            Your Cart
          </h1>
          <div className="w-24 max-[426px]:hidden"></div> {/* Spacer for alignment */}
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto p-4">
        {/* Empty cart state */}
        {items.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 flex items-center justify-center mb-6">
              <FiShoppingBag className="text-gray-500 text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Looks like you haven&apos;t added anything to your cart yet. Explore our collection and find something you love!
            </p>
            <Link 
              href="/" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Cart Items ({items.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-4 transition-all duration-300 ${
                        isRemoving === item.id ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 max-[426px]:w-24 max-[426px]:h-24 sm:w-28 sm:h-28 flex-shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill
                            sizes="(max-width: 426px) 96px, 112px"
                            className="object-contain bg-gray-100 rounded-lg border border-gray-200"
                          />
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            {item.quantity}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-800 line-clamp-2 max-[426px]:line-clamp-3">{item.title}</h3>
                            <button 
                              onClick={() => handleRemove(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                          
                          <p className="text-lg font-semibold text-gray-900 mt-1">
                            ₹{(item.price * INR_RATE).toFixed(0)}
                          </p>
                          <div className="mt-1 space-y-1 text-sm text-gray-600">
                            {item.category && <p className="capitalize">Category: {item.category}</p>}
                            {item.rating?.rate && (
                              <p className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span>{item.rating.rate}</span>
                                {typeof item.rating.count !== 'undefined' && (
                                  <span className="text-gray-400">({item.rating.count})</span>
                                )}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-gray-600 line-clamp-2 max-[426px]:line-clamp-3">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-3 max-[426px]:flex-col max-[426px]:items-start">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden text-black">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus size={16} />
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <FiPlus size={16} />
                              </button>
                            </div>
                            
                            <div className="ml-auto max-[426px]:ml-0">
                              <p className="font-semibold text-gray-900">
                                ₹{(item.price * item.quantity * INR_RATE).toFixed(0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200 flex justify-between">
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center transition-colors"
                  >
                    <FiTrash2 className="mr-2" /> Clear Cart
                  </button>
                  <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <FiPlus className="mr-2" /> Add More Items
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-black">Subtotal</span>
                    <span className="font-medium text-black">₹{subtotal.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-black">Shipping</span>
                    <span className="font-medium text-black">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(0)}`}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-₹{discount.toFixed(0)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-gray-900">₹{grandTotal.toFixed(0)}</span>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-black"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={isLoading || !couponCode}
                      className={`shrink-0 px-4 py-2 rounded-lg font-medium ${
                        isLoading || !couponCode 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isLoading ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 text-sm mt-2">
                      ₹{discount.toFixed(0)} discount applied!
                    </p>
                  )}
                </div>
                
                <Link
                  href="/checkout"
                  className="block text-center w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 mb-2">We Accept</h3>
                  <div className="flex gap-8 max-[426px]:justify-between max-[426px]:gap-0 w-full">
                    <Image src="/dollar.png" alt="Dollar" width={64} height={40} className="rounded-xl object-contain" />
                    <Image src="/atm-card.png" alt="ATM Card" width={64} height={40} className="rounded-xl object-contain" />
                    <Image src="/Bhim.png" alt="BHIM" width={64} height={40} className="rounded-xl object-contain" />
                  </div>
                </div>
              </div>
              
              {/* Security info */}
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Shopping
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your payment information is encrypted and secure. We don&apos;t share your details with third parties.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Frequently bought together */}
      {items.length > 0 && (
        <section className="max-w-6xl mx-auto p-4 mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Bought Together</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32 mb-3"></div>
                <h3 className="font-medium text-gray-800 line-clamp-1 mb-1">Premium Product {i+1}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-3">₹{Math.floor(Math.random() * 1000) + 500}</p>
                <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}