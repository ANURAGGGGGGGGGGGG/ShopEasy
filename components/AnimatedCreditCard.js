import React, { useState, useMemo } from "react";

// Animated credit card that can be controlled via props or used uncontrolled
// Props:
// - number: formatted/unformatted card number string (optional)
// - name: card holder name (optional)
// - expiry: MM/YY string (optional)
// - cvv: CVV/CVC string (optional)
// - flipped: boolean to control flip externally (optional). If undefined, component is uncontrolled and flips on click
// - highlight: one of 'none' | 'number' | 'name' | 'expiry' | 'cvv' to draw subtle focus ring (optional)
export default function AnimatedCreditCard({
  number = "",
  name = "",
  expiry = "",
  cvv = "",
  flipped: flippedProp,
  highlight = "none",
}) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isControlled = typeof flippedProp !== "undefined";
  const flipped = (isControlled ? !!flippedProp : false) || internalFlipped;

  const displayNumber = useMemo(() => {
    const digits = (number || "").replace(/\D/g, "").slice(0, 16);
    if (!digits) return "#### #### #### ####";
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }, [number]);

  const displayName = useMemo(() => {
    const n = (name || "").trim();
    if (!n) return "YOUR NAME";
    return n;
  }, [name]);

  const displayExpiry = useMemo(() => {
    const e = (expiry || "").replace(/[^\d]/g, "").slice(0, 4);
    if (!e) return "MM/YY";
    const pretty = e.length >= 3 ? `${e.slice(0, 2)}/${e.slice(2)}` : e;
    return pretty;
  }, [expiry]);

  const displayCvv = useMemo(() => {
    const c = (cvv || "").replace(/\D/g, "").slice(0, 4);
    return c || "***";
  }, [cvv]);

  const onCardClick = () => {
    setInternalFlipped((f) => !f);
  };

<<<<<<< HEAD
  const ringIf = (key) => (highlight === key ? " ring-2 ring-accent rounded" : "");
=======
  const ringIf = (key) => (highlight === key ? " ring-2 ring-blue-400 rounded" : "");
>>>>>>> origin/main

  return (
    <div
      className="perspective mx-auto my-8 w-full max-w-[20rem] max-[398px]:max-w-[18rem] max-[376px]:max-w-[17rem] max-[340px]:max-w-[16rem] aspect-[16/10] max-[321px]:aspect-[4/3]"
      onClick={onCardClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
<<<<<<< HEAD
        <div className="absolute w-full h-full bg-ink rounded-xl overflow-hidden flex flex-col justify-between p-6 max-[398px]:p-5 max-[376px]:p-4 max-[340px]:p-4 text-white backface-hidden border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_50px_-30px_rgba(26,23,19,0.8)]">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg max-[398px]:text-base max-[376px]:text-sm max-[340px]:text-sm tracking-widest">VISA</span>
            <div className="w-9 h-7 rounded bg-accent border border-white/20 max-[398px]:scale-90 max-[376px]:scale-85 max-[340px]:scale-75" />
=======
        <div className="absolute w-full h-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg overflow-hidden flex flex-col justify-between p-6 max-[398px]:p-5 max-[376px]:p-4 max-[340px]:p-4 text-white backface-hidden">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg max-[398px]:text-base max-[376px]:text-sm max-[340px]:text-sm tracking-widest">VISA</span>
            <div className="transform max-[398px]:scale-90 max-[376px]:scale-85 max-[340px]:scale-75 origin-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#fff" fillOpacity="0.2" />
              </svg>
            </div>
>>>>>>> origin/main
          </div>
          <div className="mt-6 max-[376px]:mt-4 max-[340px]:mt-3">
            <div className={`text-xl max-[398px]:text-lg max-[376px]:text-base max-[340px]:text-base font-mono tracking-widest px-1${ringIf("number")}`}>{displayNumber}</div>
            <div className="flex justify-between mt-3 max-[376px]:mt-2 max-[340px]:mt-1 gap-4 max-[376px]:gap-3 pb-2 max-[321px]:pb-3">
              <div className={`min-w-0 px-1${ringIf("name")}`}>
                <div className="text-xs text-white/95 leading-tight" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.6)' }}>Card Holder</div>
                <div className="font-semibold truncate text-white max-[376px]:text-sm max-[340px]:text-xs leading-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>{displayName}</div>
              </div>
              <div className={`px-1${ringIf("expiry")}`}>
                <div className="text-xs text-white/95 leading-tight" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.6)' }}>Expires</div>
                <div className="font-semibold text-white max-[376px]:text-sm max-[340px]:text-xs leading-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>{displayExpiry}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Back Side */}
<<<<<<< HEAD
        <div className="absolute w-full h-full bg-ink-soft rounded-xl shadow-lg overflow-hidden flex flex-col justify-center items-center text-white rotate-y-180 backface-hidden border border-white/10">
          <div className="w-3/4 h-6 bg-ink mb-6 rounded border border-white/10"></div>
=======
        <div className="absolute w-full h-full bg-gradient-to-tr from-gray-700 via-gray-900 to-black rounded-xl shadow-lg overflow-hidden flex flex-col justify-center items-center text-white rotate-y-180 backface-hidden">
          <div className="w-3/4 h-6 bg-gray-800 mb-6 rounded"></div>
>>>>>>> origin/main
          <div className={`w-2/3 h-6 bg-white text-black text-center rounded flex items-center justify-center px-2${ringIf("cvv")}`}>
            CVV: {displayCvv}
          </div>
        </div>
      </div>
      <style jsx>{`
        .perspective { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
}