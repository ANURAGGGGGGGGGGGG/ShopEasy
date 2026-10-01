"use client";
<<<<<<< HEAD

import { MotionConfig } from "framer-motion";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { ShopProvider } from "./ShopContext";

export default function Providers({ children }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <ShopProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </ShopProvider>
    </MotionConfig>
  );
}
=======
import { CartProvider } from "./CartContext";

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
>>>>>>> origin/main
