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

export default function CheckoutPage() {
  const { items, total, clearCart, updateQuantity } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1 = shipping, 2 = payment
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [saveInfo, setSaveInfo] = useState(true);
  
  // Persisted order snapshot for the Thank You screen
  const [orderSummary, setOrderSummary] = useState(null);
  
  // Show/hide inline order status in the Order Summary on success screen
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  
  // Live card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cvvFocused, setCvvFocused] = useState(false);
  const [highlight, setHighlight] = useState("none");
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
      subtotal,
      shippingFee,
      tax,
      grandTotal,
    });
    setSubmitted(true);
    clearCart();
  };

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
              )}
            </div>
          </div>

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
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
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
          </Link>
        </div>
      </div>
    );
  }

  return (
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
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium text-black">₹{(item.price * item.quantity * INR_RATE).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>

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
                      placeholder="Street address"
                    />
                  </div>
                  <div className="space-y-2">
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
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center">
                  <input
                    id="save-info"
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="save-info" className="ml-2 block text-sm text-gray-700">
                    Save this information for next time
                  </label>
                </div>

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
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>

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
                  <input
                    id="terms"
                    type="checkbox"
                    required
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
              </div>
            </form>
          </div>
        </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}