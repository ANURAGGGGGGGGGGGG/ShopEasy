"use client";
<<<<<<< HEAD

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FiArrowRight, FiHeart, FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import { useCart } from "./CartContext";
import { useShop } from "./ShopContext";
import { useWishlist } from "./WishlistContext";
import AnnouncementBar from "./AnnouncementBar";
import { scrollToSection } from "@/lib/store";

const NAV_LINKS = [
  { label: "Shop", href: "/#shop" },
  { label: "Categories", href: "/#categories" },
  { label: "Offers", href: "/#offers" },
];

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 520, damping: 20 }}
      className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-medium text-white tabular-nums"
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
}

function NavLink({ label, href, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
    >
      {label}
      <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ink transition-all duration-300 ease-soft group-hover:w-full" />
    </Link>
  );
}

export default function NavBar() {
  const { items } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { searchTerm, setSearchTerm } = useShop();
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const isHome = pathname === "/";

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 8;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const active = document.activeElement;
      const tag = active?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || active?.isContentEditable) {
        return;
      }
      event.preventDefault();
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop) {
        desktopInputRef.current?.focus();
      } else {
        setSearchOpen(true);
        requestAnimationFrame(() => mobileInputRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goToShop = () => {
    if (isHome) {
      scrollToSection("shop");
    } else {
      router.push("/#shop");
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      goToShop();
      setSearchOpen(false);
    }
    if (event.key === "Escape") {
      event.currentTarget.blur();
      setSearchOpen(false);
    }
  };

  const searchField = (extraClass = "", inputRef) => (
    <div className={`relative ${extraClass}`}>
      <FiSearch
        size={15}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
      />
      <input
        ref={inputRef}
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleSearchKeyDown}
        placeholder="Search the shop…"
        aria-label="Search products"
        className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none"
      />
    </div>
  );

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 border-b bg-paper/85 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "border-line shadow-[0_18px_40px_-36px_rgba(26,23,19,0.6)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 md:h-[72px] md:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-1 font-display text-[22px] font-semibold tracking-tight text-ink"
          >
            ShopEasy
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 ease-soft group-hover:scale-150" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} label={link.label} href={link.href} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:block md:w-56 lg:w-64">
              {searchField("", desktopInputRef)}
            </div>

            <button
              type="button"
              className="relative rounded-full border border-transparent p-2.5 text-ink transition-colors hover:border-line hover:bg-surface md:hidden"
              aria-label={searchOpen ? "Close search" : "Open search"}
              onClick={() => setSearchOpen((open) => !open)}
            >
              {searchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
            </button>

            <Link
              href="/wishlist"
              className="relative rounded-full border border-transparent p-2.5 text-ink transition-colors hover:border-line hover:bg-surface"
              aria-label={`Wishlist, ${wishlistCount} saved`}
            >
              <FiHeart size={18} />
              <CountBadge count={wishlistCount} />
            </Link>

            <Link
              href="/cart"
              className="relative rounded-full border border-transparent p-2.5 text-ink transition-colors hover:border-line hover:bg-surface"
              aria-label={`Cart, ${cartCount} items`}
            >
              <FiShoppingBag size={18} />
              <CountBadge count={cartCount} />
            </Link>

            <button
              type="button"
              className="rounded-full border border-transparent p-2.5 text-ink transition-colors hover:border-line hover:bg-surface md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-line bg-paper px-5 py-3 md:hidden"
            >
              {searchField("w-full", mobileInputRef)}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full border-b border-line bg-surface px-5 pb-6 pt-2 md:hidden"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 font-display text-xl tracking-tight text-ink"
                  >
                    {link.label}
                    <FiArrowRight size={16} className="text-ink-mute" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-5 flex items-center gap-3">
                <Link
                  href="/wishlist"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
                >
                  <FiHeart size={14} /> Wishlist
                  {wishlistCount > 0 && <span className="text-accent">{wishlistCount}</span>}
                </Link>
                <Link
                  href="/cart"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper"
                >
                  <FiShoppingBag size={14} /> Cart
                  {cartCount > 0 && <span className="text-accent-tint">{cartCount}</span>}
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
=======
import Link from "next/link";
import { FaShoppingCart, FaSearch, FaFilter } from "react-icons/fa";
import { useCart } from "./CartContext";

export default function NavBar({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  setIsFilterOpen,
  categoryFilter,
  sortOption,
  priceRange
}) {
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const isFiltered =
    categoryFilter !== "all" ||
    searchTerm ||
    sortOption !== "default" ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000;

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
          ShopEasy
        </Link>

        {/* Center search bar */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Filter (desktop) */}
        <div className="hidden md:block relative mr-4">
          <button
            onClick={() => setIsFilterOpen && setIsFilterOpen(!isFilterOpen)}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex items-center"
          >
            <FaFilter className="text-gray-600" />
          </button>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {isFiltered ? "!" : 0}
          </div>
        </div>

        {/* Cart */}
        <Link href="/cart" className="relative p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50" id="cart-icon">
          <FaShoppingCart className="text-gray-600" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
>>>>>>> origin/main
