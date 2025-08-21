# E-commerce Demo (Next.js)

A modern demo e-commerce app built with Next.js (App Router) and Tailwind CSS. It showcases a complete shopping flow with cart, checkout, and a polished post‑purchase experience including a UPI "phone-style" payment UI and a Cash on Delivery (COD) animation.

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS v4
- React Icons
- Framer Motion (for subtle animations)

## Getting Started
1. Install dependencies
   - npm install
2. Run the development server
   - npm run dev
   - Open http://localhost:3000 in your browser
3. Production build
   - npm run build
   - npm start

## Key Features
- Product catalog (fetched from a public API) with search, filter, and sort
- Cart with quantity controls, remove, and clear actions
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

## How to Try It Out
1. Browse the home page and add products to your cart
2. Open the Cart page to review items
3. Proceed to Checkout
4. Pick a payment method:
   - Credit Card: enter details for the animated preview
   - UPI: enter a UPI ID; the phone UI updates in real time and shows the total amount
   - COD: watch the step-by-step delivery visualization
5. Click "Place Order" to see the Thank You screen
6. Click "View Order Status" to toggle the inline status display

## Configuration & Customization
- Pricing/Totals
  - Free delivery threshold and shipping fee are computed in the checkout page
  - Tax is currently set to 18% in the checkout page
- UPI QR
  - The QR visual is a placeholder; you can replace it with a real QR generator if needed
- Styling
  - Built with Tailwind CSS; classes are easy to tweak for brand colors and contrast
- Animations
  - COD animation is componentized so you can adjust timing, icons, or steps

## Project Structure (partial)
- app/
  - page.js (home/products)
  - cart/page.js (cart UI and summary)
  - checkout/page.js (two-step checkout, payments, Thank You screen)
- components/
  - AnimatedCreditCard.js (card preview)
  - AnimatedUPICard.js (UPI phone-style UI)
  - CashOnDeliveryAnimation.js (COD journey animation)
  - CartContext.js (cart state)
  - NavBar.js, ProductCard.js, ProductDetails.js, SearchAndFilter.js, etc.

## NPM Scripts
- dev: next dev
- build: next build
- start: next start
- lint: next lint

## Notes
- No environment variables are required for local development
- You can replace the product source with your own API when ready
