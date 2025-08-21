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

  const ringIf = (key) => (highlight === key ? " ring-2 ring-blue-400 rounded" : "");

  return (
    <div className="perspective w-80 h-48 mx-auto my-8" onClick={onCardClick}>
      <div
        className={`relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex flex-col justify-between p-6 text-white backface-hidden">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg tracking-widest">VISA</span>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#fff" fillOpacity="0.2" />
            </svg>
          </div>
          <div className="mt-8">
            <div className={`text-xl font-mono tracking-widest px-1${ringIf("number")}`}>{displayNumber}</div>
            <div className="flex justify-between mt-4 gap-6">
              <div className={`min-w-0 px-1${ringIf("name")}`}>
                <div className="text-xs">Card Holder</div>
                <div className="font-semibold truncate">{displayName}</div>
              </div>
              <div className={`px-1${ringIf("expiry")}`}>
                <div className="text-xs">Expires</div>
                <div className="font-semibold">{displayExpiry}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full bg-gradient-to-tr from-gray-700 via-gray-900 to-black rounded-xl shadow-lg flex flex-col justify-center items-center text-white rotate-y-180 backface-hidden">
          <div className="w-3/4 h-6 bg-gray-800 mb-6 rounded"></div>
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