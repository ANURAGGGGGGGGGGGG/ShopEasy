"use client";

import Link from "next/link";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import ProductCard from "../../components/ProductCard";
import SiteFooter from "../../components/SiteFooter";
import { useWishlist } from "../../components/WishlistContext";

export default function WishlistPage() {
  const { items } = useWishlist();

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
              Saved for later
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-ink">
              Your wishlist
            </h1>
          </div>
          <p className="pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute tabular-nums">
            {items.length} {items.length === 1 ? "piece" : "pieces"} saved
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center border border-dashed border-line-strong bg-surface px-6 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong">
              <FiHeart size={26} className="text-ink-mute" />
            </div>
            <h2 className="mt-7 font-display text-3xl font-medium tracking-tight text-ink">
              Nothing saved yet
            </h2>
            <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-ink-soft">
              Tap the heart on any piece and it will wait for you here — across
              sessions, on this device.
            </p>
            <Link
              href="/#shop"
              className="mt-8 rounded-full bg-ink px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 ease-soft hover:bg-accent active:scale-[0.98]"
            >
              Browse the catalogue
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
