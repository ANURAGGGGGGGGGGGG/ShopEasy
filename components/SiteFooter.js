"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useShop } from "./ShopContext";
import CopyCodeButton from "./CopyCodeButton";
import { COUPON_CODE, displayCategory } from "@/lib/store";

const CATEGORIES = ["men's clothing", "women's clothing", "jewelery", "electronics"];

const STORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

function FooterHeading({ children }) {
  return (
    <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
      {children}
    </h3>
  );
}

export default function SiteFooter() {
  const { setCategoryFilter } = useShop();

  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-baseline gap-1 font-display text-2xl font-semibold tracking-tight text-ink">
            ShopEasy
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </Link>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">
            A demo storefront for everyday apparel, accessories and small tech.
            Browse the catalogue, build a cart, and try the full checkout with
            card, UPI or cash on delivery.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            Demo build — no real orders are placed
          </p>
        </div>

        <div className="md:col-span-2">
          <FooterHeading>Departments</FooterHeading>
          <ul className="space-y-3">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  href="/#shop"
                  onClick={() => setCategoryFilter(category)}
                  className="group flex items-center gap-1.5 text-sm capitalize text-ink-soft transition-colors hover:text-ink"
                >
                  {displayCategory(category)}
                  <FiArrowUpRight
                    size={13}
                    className="translate-y-px opacity-0 transition-all duration-300 ease-soft group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <FooterHeading>Store</FooterHeading>
          <ul className="space-y-3">
            {STORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                  <FiArrowUpRight
                    size={13}
                    className="translate-y-px opacity-0 transition-all duration-300 ease-soft group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <FooterHeading>The offer</FooterHeading>
          <p className="mb-5 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
            Ten percent comes off your subtotal when you enter this code at
            checkout. Any order, any day.
          </p>
          <CopyCodeButton code={COUPON_CODE} tone="light" />
          <div className="mt-8">
            <FooterHeading>We accept</FooterHeading>
            <div className="flex items-center gap-5">
              <Image src="/dollar.png" alt="Currency" width={56} height={36} className="rounded object-contain" />
              <Image src="/atm-card.png" alt="Cards" width={56} height={36} className="rounded object-contain" />
              <Image src="/Bhim.png" alt="BHIM UPI" width={56} height={36} className="rounded object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute md:flex-row md:items-center md:justify-between md:px-8">
          <span>© 2026 ShopEasy — demo storefront</span>
          <span>Built with Next.js · Catalogue via Fake Store API</span>
        </div>
      </div>
    </footer>
  );
}
