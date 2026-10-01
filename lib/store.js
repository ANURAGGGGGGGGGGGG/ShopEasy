export const INR_RATE = 83;

export const STORE_PRODUCTS_URL = "https://fakestoreapi.com/products";

export const FREE_SHIPPING_THRESHOLD_INR = 500;

export const COUPON_CODE = "SAVE10";

export function formatRupees(inr) {
  const value = Math.round(Number(inr) || 0);
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatINR(usd) {
  return formatRupees((Number(usd) || 0) * INR_RATE);
}

export async function getProducts({ revalidate = 300 } = {}) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(STORE_PRODUCTS_URL, {
        next: { revalidate },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // transient upstream failure, retried below
    }
  }
  return null;
}

export function deriveBadge(product) {
  if (!product) return null;
  if (product.isNew) return "New";
  if (product.discount) return `${product.discount}% off`;
  const rate = product.rating?.rate ?? 0;
  const count = product.rating?.count ?? 0;
  if (rate >= 4.5) return "Top rated";
  if (count >= 500) return "Bestseller";
  return null;
}

export function displayCategory(category) {
  if (!category) return "";
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}
