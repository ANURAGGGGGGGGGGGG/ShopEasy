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

export default function CheckoutPage() {
  const { items, total, clearCart, updateQuantity } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [saveInfo, setSaveInfo] = useState(true);
  const [orderSummary, setOrderSummary] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cvvFocused, setCvvFocused] = useState(false);
  const [highlight, setHighlight] = useState("none");
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
      subtotal,
      shippingFee,
      tax,
      grandTotal,
    });
    setOrderNumber(`ORD-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
    clearCart();
  };

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
              )}
            </div>
          </div>

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
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
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
          </Link>
        </div>
      </div>
    );
  }

  return (
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
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[13px] font-medium text-ink tabular-nums">
                            {INR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                    >
                      Edit
                    </button>
                  )}
                </div>

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
                      placeholder="Street address"
                    />
                  </div>
                  <div className="space-y-2">
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
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2.5">
                  <input
                    id="save-info"
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(event) => setSaveInfo(event.target.checked)}
                    className="h-4 w-4 rounded border-line-strong accent-accent"
                  />
                  <label htmlFor="save-info" className="text-[13px] text-ink-soft">
                    Save this information for next time
                  </label>
                </div>

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
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                    >
                      Edit
                    </button>
                  )}
                </div>

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
                  <input
                    id="terms"
                    type="checkbox"
                    required
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
              </div>
            </form>
          </div>
        </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
