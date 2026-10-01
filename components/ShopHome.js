"use client";

import CategoryGrid from "./home/CategoryGrid";
import FeaturedRail from "./home/FeaturedRail";
import Hero from "./home/Hero";
import NavBar from "./NavBar";
import PromoBand from "./home/PromoBand";
import ShopSection from "./home/ShopSection";
import SiteFooter from "./SiteFooter";

export default function ShopHome() {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <CategoryGrid />
        <FeaturedRail />
        <PromoBand />
        <ShopSection />
      </main>
      <SiteFooter />
    </div>
  );
}
