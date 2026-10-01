<<<<<<< HEAD
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiLock,
  FiMinus,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import { useCart } from "../../components/CartContext";
import { useShop } from "../../components/ShopContext";
import NavBar from "../../components/NavBar";
import ProductCard from "../../components/ProductCard";
import SiteFooter from "../../components/SiteFooter";
import {
  COUPON_CODE,
  FREE_SHIPPING_THRESHOLD_INR,
  INR_RATE,
  displayCategory,
  formatRupees,
} from "@/lib/store";

const INR = (usd) => formatRupees((usd || 0) * INR_RATE);

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { products: shopProducts } = useShop();

  const [isRemoving, setIsRemoving] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState("idle");
  const [suggestions, setSuggestions] = useState([]);

  const subtotal = total * INR_RATE;
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD_INR ? 0 : 99;
  const grandTotal = subtotal + shipping - discount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD_INR) * 100
  );

  const applyCoupon = () => {
    setCouponStatus("applying");
    setTimeout(() => {
      if (couponCode.trim().toUpperCase() === COUPON_CODE) {
        setDiscount(subtotal * 0.1);
        setCouponStatus("applied");
      } else {
        setDiscount(0);
        setCouponStatus("invalid");
      }
    }, 700);
  };

=======
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
>>>>>>> origin/main
  const handleRemove = (id) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeItem(id);
      setIsRemoving(null);
<<<<<<< HEAD
    }, 400);
  };

  useEffect(() => {
    let cancelled = false;
    const exclude = new Set(items.map((item) => item.id));
    const pick = (list) => list.filter((p) => !exclude.has(p.id)).slice(0, 4);

    if (shopProducts.length > 0) {
      setSuggestions(pick(shopProducts));
      return undefined;
    }

    (async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) setSuggestions(pick(data));
      } catch {
        // suggestions stay hidden when the feed is unreachable
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [items, shopProducts]);

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <NavBar />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-5 py-10 md:px-8 md:py-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
        >
          <FiArrowLeft
            size={13}
            className="transition-transform duration-300 ease-soft group-hover:-translate-x-1"
          />
          Continue shopping
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-7">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              Step 1 — your bag
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-ink">
              Your cart
            </h1>
          </div>
          <p className="pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute tabular-nums">
            {items.length} {items.length === 1 ? "line" : "lines"} · {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center border border-dashed border-line-strong bg-surface px-6 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong">
              <FiShoppingBag size={26} className="text-ink-mute" />
            </div>
            <h2 className="mt-7 font-display text-3xl font-medium tracking-tight text-ink">
              Your bag is empty
            </h2>
            <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-ink-soft">
              Nothing in here yet. Browse the catalogue, and whatever you save
              will wait for you in this bag.
            </p>
            <Link
              href="/"
              className="mt-8 rounded-full bg-ink px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="divide-y divide-line border border-line bg-surface">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 transition-all duration-300 ease-soft ${
                      isRemoving === item.id
                        ? "h-0 overflow-hidden p-0 opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    <div className="flex gap-4 md:gap-5">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-line bg-paper-deep md:h-28 md:w-28">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 96px, 112px"
                          className="object-contain p-3"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                              {item.category ? displayCategory(item.category) : "Piece"}
                            </p>
                            <h3 className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-ink md:text-[15px]">
                              {item.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            aria-label={`Remove ${item.title}`}
                            className="rounded-full border border-transparent p-2 text-ink-mute transition-colors hover:border-line hover:text-clay"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                          <div className="flex items-center gap-1 rounded-full border border-line bg-paper px-1.5 py-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              aria-label="Decrease quantity"
                              className="rounded-full p-1.5 text-ink transition-colors hover:bg-surface"
                            >
                              <FiMinus size={13} />
                            </button>
                            <span className="min-w-[2rem] text-center font-mono text-[13px] text-ink tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="rounded-full p-1.5 text-ink transition-colors hover:bg-surface"
                            >
                              <FiPlus size={13} />
                            </button>
                          </div>

                          <div className="flex items-baseline gap-3">
                            {item.quantity > 1 && (
                              <span className="font-mono text-[11px] text-ink-mute tabular-nums">
                                {INR(item.price)} each
                              </span>
                            )}
                            <span className="font-display text-lg font-medium tracking-tight text-ink tabular-nums">
                              {INR(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={clearCart}
                  className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-clay transition-colors hover:text-ink"
                >
                  <FiTrash2 size={13} />
                  Clear cart
                </button>
                <Link
                  href="/#shop"
                  className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
                >
                  Add more pieces
                  <FiPlus size={13} className="transition-transform group-hover:rotate-90" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 border border-line bg-surface p-6">
                <h2 className="font-display text-xl font-medium tracking-tight text-ink">
                  Order summary
                </h2>

                <div className="mt-6 space-y-3.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-medium text-ink tabular-nums">
                      {formatRupees(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Shipping</span>
                    <span className="font-medium text-ink">
                      {shipping === 0 ? (
                        <span className="text-accent">Free</span>
                      ) : (
                        <span className="tabular-nums">{formatRupees(shipping)}</span>
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">Discount · {COUPON_CODE}</span>
                      <span className="font-medium text-accent tabular-nums">
                        −{formatRupees(discount)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-line pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg tracking-tight text-ink">
                        Total
                      </span>
                      <span className="font-display text-2xl font-medium tracking-tight text-ink tabular-nums">
                        {formatRupees(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-line bg-paper px-4 py-3">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                    <span className={shipping === 0 ? "text-accent" : "text-ink-soft"}>
                      {shipping === 0
                        ? "Free shipping unlocked"
                        : `${formatRupees(FREE_SHIPPING_THRESHOLD_INR - subtotal)} to free shipping`}
                    </span>
                    <span className="text-ink-mute tabular-nums">
                      {Math.round(freeShippingProgress)}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-500 ease-soft"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-6">
                  <label
                    htmlFor="coupon"
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute"
                  >
                    Coupon code
                  </label>
                  <div className="mt-2.5 flex gap-2">
                    <input
                      id="coupon"
                      type="text"
                      value={couponCode}
                      onChange={(event) => {
                        setCouponCode(event.target.value);
                        if (couponStatus !== "idle") setCouponStatus("idle");
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && couponCode) {
                          event.preventDefault();
                          applyCoupon();
                        }
                      }}
                      placeholder={`Try ${COUPON_CODE}`}
                      className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      disabled={couponStatus === "applying" || !couponCode.trim()}
                      className={`shrink-0 rounded-lg px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ease-soft ${
                        couponStatus === "applying" || !couponCode.trim()
                          ? "cursor-not-allowed bg-paper-deep text-ink-mute"
                          : "bg-ink text-paper hover:bg-accent"
                      }`}
                    >
                      {couponStatus === "applying" ? "Checking…" : "Apply"}
                    </button>
                  </div>

                  <div className="mt-2.5 min-h-[18px]">
                    {couponStatus === "applied" && (
                      <p className="flex items-center gap-1.5 text-[13px] text-accent">
                        <FiCheck size={13} /> 10% off applied to your subtotal.
                      </p>
                    )}
                    {couponStatus === "invalid" && (
                      <p className="text-[13px] text-clay">
                        That code didn&apos;t apply. {COUPON_CODE} takes 10% off.
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 block w-full rounded-full bg-accent px-6 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors duration-300 ease-soft hover:bg-accent-deep active:scale-[0.98]"
                >
                  Proceed to checkout
                </Link>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                    We accept
                  </p>
                  <div className="mt-3 flex items-center gap-5">
                    <Image src="/dollar.png" alt="Currency" width={54} height={34} className="rounded object-contain" />
                    <Image src="/atm-card.png" alt="Cards" width={54} height={34} className="rounded object-contain" />
                    <Image src="/Bhim.png" alt="BHIM UPI" width={54} height={34} className="rounded object-contain" />
                  </div>
                </div>

                <p className="mt-5 flex items-start gap-2.5 border-t border-line pt-5 text-[13px] leading-relaxed text-ink-soft">
                  <FiLock size={14} className="mt-0.5 shrink-0 text-accent" />
                  Payments are encrypted end to end. This is a demo store — no
                  real charges are made.
=======
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
>>>>>>> origin/main
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
<<<<<<< HEAD

      {items.length > 0 && suggestions.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
                  Keep looking
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-none tracking-[-0.02em] text-ink">
                  Pairs well with your bag
                </h2>
              </div>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
              >
                <FiSearch size={13} />
                Browse everything
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
              {suggestions.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
=======
      
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
>>>>>>> origin/main
