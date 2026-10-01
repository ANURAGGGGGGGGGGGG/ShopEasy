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

  const handleRemove = (id) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeItem(id);
      setIsRemoving(null);
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
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

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
