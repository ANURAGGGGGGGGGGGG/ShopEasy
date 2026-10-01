<<<<<<< HEAD
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheckCircle,
  FiChevronLeft,
  FiCreditCard,
  FiLock,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { useCart } from "../../components/CartContext";
import AnimatedCreditCard from "../../components/AnimatedCreditCard";
import AnimatedUPICard from "../../components/AnimatedUPICard";
import CashOnDeliveryAnimation from "../../components/CashOnDeliveryAnimation";
import { FREE_SHIPPING_THRESHOLD_INR, INR_RATE, formatRupees } from "@/lib/store";

const INR = (usd) => formatRupees((usd || 0) * INR_RATE);

const EASE = [0.16, 1, 0.3, 1];

function StepMarker({ number, label, active }) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[13px] tabular-nums transition-colors duration-300 ease-soft ${
          active
            ? "border-ink bg-ink text-paper"
            : "border-line-strong bg-surface text-ink-mute"
        }`}
      >
        {number}
      </div>
      <span
        className={`absolute top-full mt-2.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
          active ? "text-ink" : "text-ink-mute"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
=======
'use client';

import { useState } from "react";
import { useCart } from "../../components/CartContext";
import AnimatedCreditCard from "../../components/AnimatedCreditCard";
import AnimatedUPICard from "../../components/AnimatedUPICard";
import Link from "next/link";
import { FiCheckCircle, FiLock, FiShoppingBag, FiTruck, FiCreditCard, FiUser, FiMail, FiMapPin, FiHome, FiGlobe, FiChevronLeft } from "react-icons/fi";
import CashOnDeliveryAnimation from "../../components/CashOnDeliveryAnimation";
import Image from "next/image";

const INR_RATE = 83;
>>>>>>> origin/main

export default function CheckoutPage() {
  const { items, total, clearCart, updateQuantity } = useCart();
  const [submitted, setSubmitted] = useState(false);
<<<<<<< HEAD
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [saveInfo, setSaveInfo] = useState(true);
  const [orderSummary, setOrderSummary] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);

=======
  const [activeStep, setActiveStep] = useState(1); // 1 = shipping, 2 = payment
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [saveInfo, setSaveInfo] = useState(true);
  
  // Persisted order snapshot for the Thank You screen
  const [orderSummary, setOrderSummary] = useState(null);
  
  // Show/hide inline order status in the Order Summary on success screen
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  
  // Live card form state
>>>>>>> origin/main
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cvvFocused, setCvvFocused] = useState(false);
  const [highlight, setHighlight] = useState("none");
<<<<<<< HEAD
  const [upiId, setUpiId] = useState("");
  const [upiHighlight, setUpiHighlight] = useState("none");

  const handleNumber = (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
    setHighlight("number");
  };
  const handleName = (event) => {
    setCardName(event.target.value.slice(0, 26));
    setHighlight("name");
  };
  const handleExpiry = (event) => {
    let value = event.target.value.replace(/[^\d]/g, "").slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
    setCardExpiry(value);
    setHighlight("expiry");
  };
  const handleCvv = (event) => {
    setCardCvv(event.target.value.replace(/\D/g, "").slice(0, 4));
    setHighlight("cvv");
    setCvvFocused(true);
  };

  const subtotal = total * INR_RATE;
  const shippingFee = subtotal > FREE_SHIPPING_THRESHOLD_INR ? 0 : 99;
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + shippingFee + tax;

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderSummary({
      items: items.map((item) => ({ ...item })),
=======
  // UPI form state
  const [upiId, setUpiId] = useState("");
  const [upiAmount, setUpiAmount] = useState("");
  const [upiHighlight, setUpiHighlight] = useState("none");

  const handleNumber = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const pretty = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(pretty);
    setHighlight("number");
  };
  const handleName = (e) => {
    setCardName(e.target.value.slice(0, 26));
    setHighlight("name");
  };
  const handleExpiry = (e) => {
    let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    setCardExpiry(v);
    setHighlight("expiry");
  };
  const handleCvv = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardCvv(v);
    setHighlight("cvv");
    setCvvFocused(true); // ensure flip occurs as soon as user starts typing CVV
  };

  const subtotal = total * INR_RATE;
  // Free delivery for orders above ₹500
  const shippingFee = subtotal > 500 ? 0 : 99;
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + shippingFee + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Take a snapshot of the current order BEFORE clearing the cart
    setOrderSummary({
      items: items.map((it) => ({ ...it })),
>>>>>>> origin/main
      subtotal,
      shippingFee,
      tax,
      grandTotal,
    });
<<<<<<< HEAD
    setOrderNumber(`ORD-${Math.floor(1000 + Math.random() * 9000)}`);
=======
>>>>>>> origin/main
    setSubmitted(true);
    clearCart();
  };

<<<<<<< HEAD
  const inputClass =
    "block w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none";

  if (submitted) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-paper p-4">
        <div className="w-full max-w-md border border-line bg-surface p-8 text-center md:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-tint">
            <FiCheckCircle size={38} className="text-accent" />
          </div>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
            Order {orderNumber}
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink">
            Thank you for your purchase
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Your order has been placed and a confirmation is on its way to your
            inbox.
          </p>

          <div className="mt-7 border border-line bg-paper p-5 text-left">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              Order summary
            </h3>
            <div className="mt-4 space-y-2.5 text-sm">
              {(orderSummary?.items || []).map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <span className="line-clamp-1 text-ink-soft">
                    {item.quantity} × {item.title}
                  </span>
                  <span className="shrink-0 font-medium text-ink tabular-nums">
                    {INR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t border-line pt-3">
                <span className="font-medium text-ink">Total paid</span>
                <span className="font-display text-lg font-medium tracking-tight text-ink tabular-nums">
                  {formatRupees(orderSummary?.grandTotal ?? grandTotal)}
                </span>
              </div>

              {showOrderStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-4 border border-line bg-surface p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-ink">Status</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      Order confirmed
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                    We received your order and it&apos;s being prepared.
                  </p>
                </motion.div>
=======
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-green-500 text-5xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank you for your purchase! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Your order #ORD-{Math.floor(Math.random() * 10000)} has been placed successfully.
            We&apos;ve sent a confirmation email with all the details.
          </p>

          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="font-medium text-black mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {(orderSummary?.items || []).map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.quantity} × {item.title}
                  </span>
                  <span className="font-medium text-black">₹{(item.price * item.quantity * INR_RATE).toFixed(0)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium text-black">Total</span>
                <span className="font-bold text-lg text-black">₹{(orderSummary?.grandTotal ?? grandTotal).toFixed(0)}</span>
              </div>

              {showOrderStatus && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 text-left">
                    <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-1 md:justify-between">
                      <span className="font-medium text-black">Status</span>
                      <span className="font-semibold text-green-600">Order Confirmed</span>
                    </div>
                    <p className="text-gray-600 mt-1">We received your order and it&apos;s being processed.</p>
                 </div>
>>>>>>> origin/main
              )}
            </div>
          </div>

<<<<<<< HEAD
          <div className="mt-7 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setShowOrderStatus((prev) => !prev)}
              className="rounded-full bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
            >
              {showOrderStatus ? "Hide order status" : "View order status"}
            </button>
            <Link
              href="/"
              className="rounded-full border border-line-strong px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 ease-soft hover:border-ink"
            >
              Continue shopping
=======
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setShowOrderStatus((prev) => !prev)}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center"
            >
              {showOrderStatus ? 'Hide Order Status' : 'View Order Status'}
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center text-black"
            >
              Continue Shopping
>>>>>>> origin/main
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
<<<<<<< HEAD
      <div className="flex min-h-dvh items-center justify-center bg-paper p-4">
        <div className="w-full max-w-md border border-line bg-surface p-8 text-center md:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-paper-deep">
            <FiShoppingBag size={34} className="text-ink-soft" />
          </div>
          <h2 className="mt-7 font-display text-3xl font-medium tracking-tight text-ink">
            Your bag is empty
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Add a few pieces before heading to checkout.
          </p>
          <Link
            href="/"
            className="mt-7 inline-block rounded-full bg-ink px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
          >
            Back to the shop
=======
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-blue-500 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added anything to your cart yet. Explore our collection and find something you love!
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block"
          >
            Back to store
>>>>>>> origin/main
          </Link>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-14">
        <Link
          href="/cart"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
        >
          <FiChevronLeft
            size={14}
            className="transition-transform duration-300 ease-soft group-hover:-translate-x-1"
          />
          Back to cart
        </Link>

        <div className="mt-6 border-b border-line pb-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
            Step 2 — checkout
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-ink">
            Checkout
          </h1>

          <div className="mt-9 flex items-start justify-between pb-9">
            <StepMarker number={1} label="Shipping" active={activeStep >= 1} />
            <div className={`mx-3 mt-4 h-px flex-1 ${activeStep >= 2 ? "bg-ink" : "bg-line-strong"}`} />
            <StepMarker number={2} label="Payment" active={activeStep >= 2} />
            <div className={`mx-3 mt-4 h-px flex-1 ${activeStep >= 3 ? "bg-ink" : "bg-line-strong"}`} />
            <StepMarker number={3} label="Confirmation" active={activeStep >= 3} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="sticky top-6 border border-line bg-surface p-6">
              <h2 className="font-display text-xl font-medium tracking-tight text-ink">
                Order summary
              </h2>

              <div className="mt-6 space-y-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">
                    Subtotal ({items.length} {items.length === 1 ? "line" : "lines"})
                  </span>
                  <span className="font-medium text-ink tabular-nums">
                    {formatRupees(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Shipping</span>
                  <span className="font-medium text-ink">
                    {shippingFee === 0 ? (
                      <span className="text-accent">Free</span>
                    ) : (
                      <span className="tabular-nums">{formatRupees(shippingFee)}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Tax (18%)</span>
                  <span className="font-medium text-ink tabular-nums">
                    {formatRupees(tax)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-line pt-4">
                  <span className="font-display text-lg tracking-tight text-ink">Total</span>
                  <span className="font-display text-2xl font-medium tracking-tight text-ink tabular-nums">
                    {formatRupees(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  Items in bag
                </h3>
                <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-paper-deep">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-1 text-[13px] font-medium text-ink">
                          {item.title}
                        </h4>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="font-mono text-[12px] text-ink tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
=======
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        {/* Checkout Header */}
        <div className="py-6 mb-8">
          <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FiChevronLeft className="mr-1" /> Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center mt-8">
            <div className={`flex-1 h-1 ${activeStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                1
              </div>
              <span className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs ${activeStep >= 1 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Shipping
              </span>
            </div>
            <div className={`flex-1 h-1 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                2
              </div>
              <span className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs ${activeStep >= 2 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Payment
              </span>
            </div>
            <div className={`flex-1 h-1 ${activeStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                3
              </div>
              <span className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs ${activeStep >= 3 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-medium text-black">₹{subtotal.toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-black">{shippingFee === 0 ? 'Free' : `₹${shippingFee.toFixed(0)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 ">Tax (18%)</span>
                  <span className="font-medium text-black">₹{tax.toFixed(0)}</span>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-xl font-bold text-gray-900">₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-700 mb-3">Items in Cart</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="bg-gray-100 border rounded-lg w-16 h-16 flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="object-contain w-12 h-12"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm line-clamp-1">{item.title}</h4>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="px-2 py-1 bg-gray-200  rounded-full text-gray-700 hover:bg-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-2 text-black">{item.quantity}</span>
                            <button
                              type="button"
                              className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
>>>>>>> origin/main
                            >
                              +
                            </button>
                          </div>
<<<<<<< HEAD
                          <span className="text-[13px] font-medium text-ink tabular-nums">
                            {INR(item.price * item.quantity)}
                          </span>
=======
                          <span className="font-medium text-black">₹{(item.price * item.quantity * INR_RATE).toFixed(0)}</span>
>>>>>>> origin/main
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="order-1 lg:order-2 lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div
                className={`border bg-surface p-6 transition-colors duration-300 ease-soft md:p-8 ${
                  activeStep === 1 ? "border-ink" : "border-line"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="flex items-center gap-3 font-display text-xl font-medium tracking-tight text-ink">
                    <FiTruck size={18} className="text-accent" />
                    Shipping information
                  </h2>
                  {activeStep === 1 ? (
                    <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
                      Current
                    </span>
=======
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className={`bg-white rounded-2xl shadow-sm p-6 ${activeStep === 1 ? 'border-2 border-blue-500' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiTruck className="mr-2 text-blue-500" />
                    Shipping Information
                  </h2>
                  {activeStep === 1 ? (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Current</span>
>>>>>>> origin/main
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
<<<<<<< HEAD
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
=======
                      className="text-blue-600 hover:text-blue-800 text-sm"
>>>>>>> origin/main
                    >
                      Edit
                    </button>
                  )}
                </div>

<<<<<<< HEAD
                <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="block text-[13px] font-medium text-ink-soft">
                      First name
                    </label>
                    <input
                      id="first-name"
                      required
                      type="text"
                      autoComplete="given-name"
                      className={inputClass}
                      placeholder="Ananya"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="block text-[13px] font-medium text-ink-soft">
                      Last name
                    </label>
                    <input
                      id="last-name"
                      required
                      type="text"
                      autoComplete="family-name"
                      className={inputClass}
                      placeholder="Iyer"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="email" className="block text-[13px] font-medium text-ink-soft">
                      Email
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="address" className="block text-[13px] font-medium text-ink-soft">
                      Address
                    </label>
                    <input
                      id="address"
                      required
                      type="text"
                      autoComplete="street-address"
                      className={inputClass}
=======
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <FiUser className="mr-2 text-gray-500 " />
                      First name
                    </label>
                    <input
                      required
                      type="text"
                      className="block w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <FiUser className="mr-2 text-gray-500" />
                      Last name
                    </label>
                    <input
                      required
                      type="text"
                      className="block w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <FiMail className="mr-2 text-gray-500" />
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="block w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <FiMapPin className="mr-2 text-gray-500" />
                      Address
                    </label>
                    <input
                      required
                      type="text"
                      className="block w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>>>>>>> origin/main
                      placeholder="Street address"
                    />
                  </div>
                  <div className="space-y-2">
<<<<<<< HEAD
                    <label htmlFor="city" className="block text-[13px] font-medium text-ink-soft">
                      City
                    </label>
                    <input
                      id="city"
                      required
                      type="text"
                      autoComplete="address-level2"
                      className={inputClass}
                      placeholder="Pune"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="block text-[13px] font-medium text-ink-soft">
                      Country
                    </label>
                    <select id="country" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        Select country
                      </option>
=======
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <FiHome className="mr-2 text-gray-500" />
                      City
                    </label>
                    <input
                      required
                      type="text"
                      className="block w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium  text-gray-700 flex items-center">
                      <FiGlobe className="mr-2 text-gray-500" />
                      Country
                    </label>
                    <select
                      required
                      className="block w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select country</option>
>>>>>>> origin/main
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

<<<<<<< HEAD
                <div className="mt-6 flex items-center gap-2.5">
=======
                <div className="mt-6 flex items-center">
>>>>>>> origin/main
                  <input
                    id="save-info"
                    type="checkbox"
                    checked={saveInfo}
<<<<<<< HEAD
                    onChange={(event) => setSaveInfo(event.target.checked)}
                    className="h-4 w-4 rounded border-line-strong accent-accent"
                  />
                  <label htmlFor="save-info" className="text-[13px] text-ink-soft">
=======
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="save-info" className="ml-2 block text-sm text-gray-700">
>>>>>>> origin/main
                    Save this information for next time
                  </label>
                </div>

<<<<<<< HEAD
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="mt-8 w-full rounded-full bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
                >
                  Continue to payment
                </button>
              </div>

              <div
                className={`border bg-surface p-6 transition-colors duration-300 ease-soft md:p-8 ${
                  activeStep === 2 ? "border-ink" : "border-line"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="flex items-center gap-3 font-display text-xl font-medium tracking-tight text-ink">
                    <FiCreditCard size={18} className="text-accent" />
                    Payment method
                  </h2>
                  {activeStep === 2 ? (
                    <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
                      Current
                    </span>
=======
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>

              {/* Payment Information */}
              <div className={`bg-white rounded-2xl shadow-sm p-6 ${activeStep === 2 ? 'border-2 border-blue-500' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiCreditCard className="mr-2 text-blue-500" />
                    Payment Method
                  </h2>
                  {activeStep === 2 ? (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Current</span>
>>>>>>> origin/main
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
<<<<<<< HEAD
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
=======
                      className="text-blue-600 hover:text-blue-800 text-sm"
>>>>>>> origin/main
                    >
                      Edit
                    </button>
                  )}
                </div>

<<<<<<< HEAD
                <div className="mt-7 space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      { id: "credit", label: "Credit / Debit card" },
                      { id: "paypal", label: "UPI" },
                      { id: "cod", label: "Cash on delivery" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`rounded-full border px-4 py-3 text-center text-sm font-medium transition-colors duration-300 ease-soft ${
                          paymentMethod === method.id
                            ? "border-ink bg-ink text-paper"
                            : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {paymentMethod === "credit" && (
                      <motion.div
                        key="credit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="mt-4 flex flex-col items-center border border-line bg-paper p-5"
                      >
                        <AnimatedCreditCard
                          number={cardNumber}
                          name={cardName}
                          expiry={cardExpiry}
                          cvv={cardCvv}
                          flipped={cvvFocused}
                          highlight={highlight}
                        />
                        <p className="mt-1 text-center text-[13px] text-ink-soft">
                          Type your card details below — the card updates live and
                          flips on CVV.
                        </p>

                        <div className="mt-5 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label htmlFor="card-number" className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                              Card number
                            </label>
                            <input
                              id="card-number"
                              type="text"
                              inputMode="numeric"
                              autoComplete="cc-number"
                              value={cardNumber}
                              onChange={handleNumber}
                              onFocus={() => setHighlight("number")}
                              onBlur={() => setHighlight("none")}
                              placeholder="1234 5678 9012 3456"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="card-name" className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                              Name on card
                            </label>
                            <input
                              id="card-name"
                              type="text"
                              autoComplete="cc-name"
                              value={cardName}
                              onChange={handleName}
                              onFocus={() => setHighlight("name")}
                              onBlur={() => setHighlight("none")}
                              placeholder="Ananya Iyer"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="card-expiry" className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                              Expiry
                            </label>
                            <input
                              id="card-expiry"
                              type="text"
                              inputMode="numeric"
                              autoComplete="cc-exp"
                              value={cardExpiry}
                              onChange={handleExpiry}
                              onFocus={() => setHighlight("expiry")}
                              onBlur={() => setHighlight("none")}
                              placeholder="MM/YY"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="card-cvv" className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                              CVV
                            </label>
                            <input
                              id="card-cvv"
                              type="password"
                              inputMode="numeric"
                              autoComplete="cc-csc"
                              value={cardCvv}
                              onChange={handleCvv}
                              onFocus={() => {
                                setCvvFocused(true);
                                setHighlight("cvv");
                              }}
                              onBlur={() => {
                                setCvvFocused(false);
                                setHighlight("none");
                              }}
                              placeholder="123"
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "paypal" && (
                      <motion.div
                        key="upi"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="mt-4 flex flex-col items-center border border-line bg-paper p-5"
                      >
                        <AnimatedUPICard
                          upiId={upiId}
                          amount={grandTotal}
                          merchantName="ShopEasy Store"
                          highlight={upiHighlight}
                        />
                        <p className="mt-1 text-center text-[13px] text-ink-soft">
                          Enter your UPI ID — the phone screen updates in real time.
                        </p>

                        <div className="mt-5 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label htmlFor="upi-id" className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                              UPI ID
                            </label>
                            <input
                              id="upi-id"
                              type="text"
                              value={upiId}
                              onChange={(event) => setUpiId(event.target.value)}
                              onFocus={() => setUpiHighlight("upiId")}
                              onBlur={() => setUpiHighlight("none")}
                              placeholder="yourname@bank"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="upi-amount" className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                              Amount — set to order total
                            </label>
                            <input
                              id="upi-amount"
                              type="text"
                              value={formatRupees(grandTotal).replace("₹", "")}
                              readOnly
                              onFocus={() => setUpiHighlight("amount")}
                              onBlur={() => setUpiHighlight("none")}
                              className={`${inputClass} tabular-nums`}
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => setUpiHighlight("qr")}
                              className="w-full rounded-full border border-line-strong px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 ease-soft hover:border-ink"
                            >
                              Highlight QR
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "cod" && (
                      <motion.div
                        key="cod"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="mt-4 border border-line bg-paper p-5 text-center"
                      >
                        <CashOnDeliveryAnimation />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center gap-2.5">
=======
                <div className="space-y-4">
                  <div className="flex gap-4 max-[376px]:gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("credit")}
                      className={`flex-1 py-4 px-4 rounded-xl border-2 text-center transition-colors max-[376px]:py-2 max-[376px]:px-2 max-[376px]:rounded-lg ${paymentMethod === "credit"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <div className="font-medium text-gray-800 max-[376px]:text-sm max-[376px]:leading-tight">Credit/Debit Card</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex-1 py-4 px-4 rounded-xl border-2 text-center transition-colors max-[376px]:py-2 max-[376px]:px-2 max-[376px]:rounded-lg ${paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <div className="font-medium text-gray-800 max-[376px]:text-sm max-[376px]:leading-tight">UPI</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex-1 py-4 px-4 rounded-xl border-2 text-center transition-colors max-[376px]:py-2 max-[376px]:px-2 max-[376px]:rounded-lg ${paymentMethod === "cod"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <div className="font-medium text-gray-800 max-[376px]:text-sm max-[376px]:leading-tight">Cash on Delivery</div>
                    </button>
                  </div>

                  {paymentMethod === "credit" && (
                    <div className="bg-gray-50 rounded-xl p-5 mt-4 flex flex-col items-center">
                      <AnimatedCreditCard
                        number={cardNumber}
                        name={cardName}
                        expiry={cardExpiry}
                        cvv={cardCvv}
                        flipped={cvvFocused}
                        highlight={highlight}
                      />
                      <p className="mt-2 text-gray-600 text-center">Type your card details below. Card updates in real-time and flips on CVV focus.</p>

                      {/* Live Card Form */}
                      <div className="w-full max-w-xl mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            value={cardNumber}
                            onChange={handleNumber}
                            onFocus={() => setHighlight("number")}
                            onBlur={() => setHighlight("none")}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                          <input
                            type="text"
                            autoComplete="cc-name"
                            value={cardName}
                            onChange={handleName}
                            onFocus={() => setHighlight("name")}
                            onBlur={() => setHighlight("none")}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            value={cardExpiry}
                            onChange={handleExpiry}
                            onFocus={() => setHighlight("expiry")}
                            onBlur={() => setHighlight("none")}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="password"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            value={cardCvv}
                            onChange={handleCvv}
                            onFocus={() => { setCvvFocused(true); setHighlight("cvv"); }}
                            onBlur={() => { setCvvFocused(false); setHighlight("none"); }}
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-black"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="bg-gray-50 rounded-xl p-5 mt-4 flex flex-col items-center">
                      <AnimatedUPICard
                        upiId={upiId}
                        amount={grandTotal}
                        merchantName="ShopEasy Store"
                        highlight={upiHighlight}
                      />
                      <p className="mt-2 text-gray-600 text-center">Enter your UPI ID or scan the QR. Updates in real-time.</p>

                      <div className="w-full max-w-xl mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            onFocus={() => setUpiHighlight("upiId")}
                            onBlur={() => setUpiHighlight("none")}
                            placeholder="yourname@bank"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) — auto-set to order total</label>
                          <input
                            type="text"
                            value={grandTotal.toFixed(0)}
                            readOnly
                            onFocus={() => setUpiHighlight("amount")}
                            onBlur={() => setUpiHighlight("none")}
                            placeholder="0.00"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-black"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => setUpiHighlight("qr")}
                            className="w-full py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-100"
                          >
                            Highlight QR
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="bg-gray-50 rounded-xl p-5 mt-4 text-center">
                      <CashOnDeliveryAnimation />
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center">
>>>>>>> origin/main
                  <input
                    id="terms"
                    type="checkbox"
                    required
<<<<<<< HEAD
                    className="h-4 w-4 rounded border-line-strong accent-accent"
                  />
                  <label htmlFor="terms" className="text-[13px] text-ink-soft">
                    I agree to the{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      terms and conditions
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors duration-300 ease-soft hover:bg-accent-deep active:scale-[0.98]"
                >
                  <FiLock size={14} />
                  Place order — {formatRupees(grandTotal)}
                </button>
=======
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="/terms-and-conditions" className="text-blue-600 underline cursor-pointer" target="_blank" rel="noopener noreferrer">terms and conditions</a>
                  </label>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <FiLock className="mr-2" /> Place Order - ₹{grandTotal.toFixed(0)}
                  </button>
                </div>
>>>>>>> origin/main
              </div>
            </form>
          </div>
        </div>

<<<<<<< HEAD
        <div className="mt-14 border-t border-line pt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <FiLock size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-medium text-ink">Secure payment</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                  All transactions are encrypted end to end.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiCheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-medium text-ink">Money-back guarantee</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                  30-day returns on every order.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiTruck size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-medium text-ink">Fast shipping</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                  Delivery within 2–5 business days.
                </p>
=======
        {/* Security Footer */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <FiLock className="text-blue-500 text-xl mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Secure Payment</h3>
                <p className="text-sm text-gray-600">All transactions are encrypted and secure</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiCheckCircle className="text-green-500 text-xl mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Money Back Guarantee</h3>
                <p className="text-sm text-gray-600">30-day return policy on all orders</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiTruck className="text-purple-500 text-xl mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Fast Shipping</h3>
                <p className="text-sm text-gray-600">Delivery within 2-5 business days</p>
>>>>>>> origin/main
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
