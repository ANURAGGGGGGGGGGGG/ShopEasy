<<<<<<< HEAD
# ShopEasy — Editorial Storefront Demo (Next.js)

A modern demo e-commerce app built with Next.js (App Router) and Tailwind CSS, redesigned as a warm editorial storefront — bone paper, ink, and deep-green accents with Geist + Fraunces typography. It showcases a complete shopping flow with wishlist, cart, coupon, and a polished post-purchase experience including a UPI "phone-style" payment UI and a Cash on Delivery (COD) animation.

## Tech Stack
- Next.js 15 (App Router, ISR)
- React 19
- Tailwind CSS v4
- React Icons
- Framer Motion (motion choreography, with `prefers-reduced-motion` respected)
- next/font: Geist, Geist Mono, Fraunces
=======
# E-commerce Demo (Next.js)

A modern demo e-commerce app built with Next.js (App Router) and Tailwind CSS. It showcases a complete shopping flow with cart, checkout, and a polished post‑purchase experience including a UPI "phone-style" payment UI and a Cash on Delivery (COD) animation.

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS v4
- React Icons
- Framer Motion (for subtle animations)
>>>>>>> origin/main

## Getting Started
1. Install dependencies
   - npm install
2. Run the development server
   - npm run dev
   - Open http://localhost:3000 in your browser
3. Production build
   - npm run build
   - npm start

<<<<<<< HEAD
## Design System
- Palette: paper `#f6f4ef`, ink `#1a1713`, accent green `#1c6b4f`, clay `#a4472a`, line `#e3ded4` (tokens live in `app/globals.css`)
- Typography: Fraunces for display headlines, Geist for UI, Geist Mono for labels/badges
- Shape language: sharp cards and images, pill buttons and chips
- Motion: soft ease `cubic-bezier(0.16,1,0.3,1)`, skeleton shimmer, marquee announcement bar

## Data Flow
- Products are fetched server-side in `app/page.js` (ISR, `revalidate = 300`) from the Fake Store API, so the catalog renders even when the browser cannot reach the API
- `/api/products` proxies the same fetch (with a 502 on failure)
- The client falls back to the API proxy if server data is missing, with a designed error/retry state
- Prices are converted USD → INR at `INR_RATE` in `lib/store.js`

## Key Features
- Product catalog with search, category chips, sort, price range, and a filter drawer
- Quick-view product modal, wishlist (persisted in localStorage), and image-fallback handling
- Honest badges derived from data: "Top rated" (rating ≥ 4.5) and "Bestseller" (500+ sold)
- Cart with quantity controls, remove, and clear actions
  - Coupon `SAVE10` takes 10% off the subtotal (applied/invalid feedback)
  - Free shipping over ₹500 (otherwise ₹99), with a progress bar
=======
## Key Features
- Product catalog (fetched from a public API) with search, filter, and sort
- Cart with quantity controls, remove, and clear actions
>>>>>>> origin/main
- Two-step Checkout (Shipping → Payment)
  - Credit/Debit card form with animated card preview
  - UPI payment with a "phone-style" screen that:
    - Mirrors your UPI ID input in real time
    - Shows a QR side via flip animation
    - Auto-sets Amount to the order total (read-only)
  - Cash on Delivery (COD) with a friendly, step-based animation and tips
- Thank You screen after placing an order
  - Captures a snapshot of items and totals BEFORE the cart is cleared, so the final total remains accurate
  - "View Order Status" button toggles an inline status panel right inside the Order Summary
<<<<<<< HEAD
- Sticky nav with live cart/wishlist badges, announcement marquee, mobile menu, and site footer
- Dedicated `/wishlist` and `/terms-and-conditions` pages

## How to Try It Out
1. Browse the home page and add products to your cart or wishlist
2. Open the Cart page to review items and apply the `SAVE10` coupon
=======

## How to Try It Out
1. Browse the home page and add products to your cart
2. Open the Cart page to review items
>>>>>>> origin/main
3. Proceed to Checkout
4. Pick a payment method:
   - Credit Card: enter details for the animated preview
   - UPI: enter a UPI ID; the phone UI updates in real time and shows the total amount
   - COD: watch the step-by-step delivery visualization
5. Click "Place Order" to see the Thank You screen
6. Click "View Order Status" to toggle the inline status display

## Configuration & Customization
<<<<<<< HEAD
- Pricing/Totals (centralized in `lib/store.js`)
  - `INR_RATE` — USD → INR conversion rate
  - `FREE_SHIPPING_THRESHOLD_INR` — free shipping threshold
  - `COUPON_CODE` — the active coupon code
  - Tax is currently set to 18% in the checkout page
- Product source
  - Replace the fetch in `lib/store.js` (`getProducts`) with your own API; the `/api/products` proxy and server page pick it up automatically
- UPI QR
  - The QR visual is a placeholder grid; you can replace it with a real QR generator if needed
=======
- Pricing/Totals
  - Free delivery threshold and shipping fee are computed in the checkout page
  - Tax is currently set to 18% in the checkout page
- UPI QR
  - The QR visual is a placeholder; you can replace it with a real QR generator if needed
- Styling
  - Built with Tailwind CSS; classes are easy to tweak for brand colors and contrast
>>>>>>> origin/main
- Animations
  - COD animation is componentized so you can adjust timing, icons, or steps

## Project Structure (partial)
- app/
<<<<<<< HEAD
  - page.js (server page: fetches and seeds products with ISR)
  - api/products/route.js (server-side product proxy)
  - cart/page.js (cart UI, coupon, order summary)
  - checkout/page.js (two-step checkout, payments, Thank You screen)
  - wishlist/page.js, terms-and-conditions/page.js
  - globals.css (design tokens, animations)
- lib/
  - store.js (fetch, INR formatting, badge derivation, shared constants)
- components/
  - AnimatedCreditCard.js, AnimatedUPICard.js, CashOnDeliveryAnimation.js
  - CartContext.js, ShopContext.js, WishlistContext.js, Providers.js
  - NavBar.js, AnnouncementBar.js, SiteFooter.js, ProductCard.js, ProductDetails.js, SearchAndFilter.js
  - home/ (Hero, CategoryGrid, FeaturedRail, PromoBand, ShopSection)
=======
  - page.js (home/products)
  - cart/page.js (cart UI and summary)
  - checkout/page.js (two-step checkout, payments, Thank You screen)
- components/
  - AnimatedCreditCard.js (card preview)
  - AnimatedUPICard.js (UPI phone-style UI)
  - CashOnDeliveryAnimation.js (COD journey animation)
  - CartContext.js (cart state)
  - NavBar.js, ProductCard.js, ProductDetails.js, SearchAndFilter.js, etc.
>>>>>>> origin/main

## NPM Scripts
- dev: next dev
- build: next build
- start: next start
- lint: next lint

## Notes
- No environment variables are required for local development
<<<<<<< HEAD
- Prices shown in ₹ are conversions of USD list prices from the demo API
=======
>>>>>>> origin/main
- You can replace the product source with your own API when ready
