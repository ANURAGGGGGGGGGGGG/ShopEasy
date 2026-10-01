"use client";

import { motion } from "framer-motion";
import CopyCodeButton from "../CopyCodeButton";
import { COUPON_CODE } from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1];

export default function PromoBand() {
  return (
    <section id="offers" className="relative overflow-hidden bg-ink text-paper">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display text-[17rem] font-medium leading-none tracking-tighter text-paper/[0.05] md:block"
      >
        10%
      </span>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/55">
            Offer of the season
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
            Ten percent off,
            <br />
            no games.
          </h2>
          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-paper/70 md:text-base">
            One code, every order. It takes 10% off your subtotal at checkout —
            no minimum spend, no exclusions. Shipping is still free above ₹500.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          className="flex flex-col items-start gap-5 lg:items-end"
        >
          <CopyCodeButton code={COUPON_CODE} tone="dark" className="w-full justify-between sm:w-auto lg:justify-start" />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
            Applies to the subtotal · valid all season
          </p>
        </motion.div>
      </div>
    </section>
  );
}
