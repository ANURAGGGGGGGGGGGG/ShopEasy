import React, { useState, useMemo } from "react";

// Animated UPI "phone-style" card with QR code and real-time updates
// Props:
// - upiId: UPI ID string (optional)
// - amount: payment amount in rupees (optional)
// - merchantName: merchant/business name (optional)
// - highlight: one of 'none' | 'upiId' | 'amount' | 'qr' to draw subtle focus ring (optional)
export default function AnimatedUPICard({
  upiId = "",
  amount = "",
  merchantName = "",
  highlight = "none",
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const displayUpiId = useMemo(() => {
    const id = (upiId || "").trim();
    return id || "your-upi@bank";
  }, [upiId]);

  const displayAmount = useMemo(() => {
    const amt = (amount || "").toString().replace(/[^\d.]/g, "");
    if (!amt || amt === "0") return "₹0";
    const parsed = parseFloat(amt);
    if (Number.isNaN(parsed)) return "₹0";
    return `₹${parsed.toFixed(2)}`;
  }, [amount]);

  const displayMerchant = useMemo(() => {
    const name = (merchantName || "").trim();
    return name || "ShopEasy Store";
  }, [merchantName]);

  // Generate UPI payment URL for QR code (for future use with a real QR lib)
  const upiPaymentUrl = useMemo(() => {
    const baseUrl = "upi://pay";
    const params = new URLSearchParams({
      pa: displayUpiId,
      pn: displayMerchant,
      am: amount || "0",
      cu: "INR",
      tn: `Payment to ${displayMerchant}`,
    });
    return `${baseUrl}?${params.toString()}`;
  }, [displayUpiId, displayMerchant, amount]);

  const onCardClick = () => setIsFlipped((f) => !f);

  const ringIf = (key) => (highlight === key ? " ring-2 ring-accent rounded" : "");

  // Simple QR code placeholder (for preview). Replace with a QR lib for production
  const qrCells = useMemo(
    () => Array.from({ length: 64 }, () => Math.random() > 0.5),
    []
  );

  const QRCodePlaceholder = () => (
    <div className="w-36 h-36 bg-white rounded-lg p-2 shadow-lg">
      <div className="w-full h-full bg-paper rounded grid grid-cols-8 gap-px">
        {qrCells.map((dark, index) => (
          <span
            key={index}
            className={`${dark ? "bg-ink" : "bg-surface"} rounded-sm`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center my-8">
      {/* Phone body */}
      <div
        className="relative mx-auto bg-ink rounded-[2rem] p-2 shadow-2xl w-[320px]"
        role="button"
        aria-label="Toggle UPI card view"
        onClick={onCardClick}
      >
        {/* Side buttons (decoration) */}
        <div className="absolute -left-1 top-20 w-0.5 h-16 bg-ink-soft rounded"></div>
        <div className="absolute -left-1 top-40 w-0.5 h-10 bg-ink-soft rounded"></div>
        <div className="absolute -right-1 top-28 w-0.5 h-14 bg-ink-soft rounded"></div>

        {/* Screen */}
        <div className="relative bg-paper-deep rounded-[1.6rem] h-[600px] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink rounded-b-2xl"></div>

          {/* Screen content */}
          <div className="absolute inset-0 pt-10 pb-6 px-4 flex flex-col">
            {/* Header */}
            <div className="text-center">
              <div className="text-sm font-medium text-ink-soft">UPI Pay</div>
              <div className="text-xs text-ink-mute">{displayMerchant}</div>
            </div>

            {/* Flippable area inside the phone screen */}
            <div className="mt-4 perspective flex-1">
              <div
                className={`relative w-full h-full transition-transform duration-700 transform ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front: UPI details and amount */}
                <div className="absolute inset-0 backface-hidden rounded-xl bg-accent text-white p-4 flex flex-col border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                  <div className="text-center mt-2">
                    <div className={`text-3xl font-bold mb-1${ringIf("amount")}`}>{displayAmount}</div>
                    <div className="text-xs opacity-80">Payment Amount</div>
                  </div>

                  <div className="mt-6 bg-white/20 rounded-lg p-3">
                    <div className="text-xs opacity-80">UPI ID</div>
                    <div className={`font-semibold truncate${ringIf("upiId")}`}>{displayUpiId}</div>
                  </div>

                  <div className="mt-2 text-[11px] opacity-80 text-center">Tap to flip and view QR</div>

                  <div className="mt-auto flex items-center justify-center gap-3 opacity-90">
                    <span className="text-[10px]">BHIM</span>
                    <span className="text-[10px]">GPay</span>
                    <span className="text-[10px]">PhonePe</span>
                  </div>
                </div>

                {/* Back: QR side */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl bg-ink text-white p-4 flex flex-col items-center justify-center">
                  <div className={`${ringIf("qr")}`}>
                    <QRCodePlaceholder />
                  </div>
                  <div className="mt-3 text-xs opacity-70 text-center">Scan this QR with any UPI app</div>
                  <div className="mt-3 px-3 py-1 rounded-full bg-white/20 text-xs font-medium">{displayAmount}</div>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-24 bg-line-strong rounded-full"></div>
            </div>
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