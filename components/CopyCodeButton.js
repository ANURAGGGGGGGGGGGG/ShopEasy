"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyCodeButton({ code, className = "", tone = "dark" }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard unavailable, still confirm the code for the user
    }
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const tones =
    tone === "dark"
      ? "border-dashed border-paper/40 text-paper hover:border-paper/80"
      : "border-dashed border-line-strong text-ink hover:border-ink";

  return (
    <button
      type="button"
      onClick={copy}
      className={`group flex items-center gap-4 rounded-full border px-7 py-4 transition-colors duration-300 ease-soft ${tones} ${className}`}
      aria-label={`Copy coupon code ${code}`}
    >
      <span className="font-mono text-xl font-medium tracking-[0.28em] md:text-2xl">{code}</span>
      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] opacity-70 transition-opacity group-hover:opacity-100">
        {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
