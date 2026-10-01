"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiDollarSign, FiHome, FiInfo, FiPackage, FiTruck } from "react-icons/fi";

const STEPS = [
  { icon: FiPackage, label: "Package ready", copy: "Your order is being prepared" },
  { icon: FiTruck, label: "Out for delivery", copy: "The delivery agent is on the way" },
  { icon: FiHome, label: "At your door", copy: "Ready for cash payment" },
  { icon: FiDollarSign, label: "Cash payment", copy: "Pay the delivery person" },
  { icon: FiCheck, label: "Order complete", copy: "Thank you for your purchase" },
];

export default function CashOnDeliveryAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = STEPS[currentStep].icon;

  return (
    <div className="rounded-xl border border-line bg-surface p-6 text-center">
      <div className="relative mb-5 flex h-32 items-center justify-center">
        <div className="absolute h-24 w-24 animate-pulse rounded-full bg-accent-tint" />

        <CurrentIcon
          key={currentStep}
          size={44}
          className="relative z-10 text-accent"
        />

        {[0, 1, 2].map((index) => (
          <FiDollarSign
            key={index}
            size={17}
            className="absolute text-ink-mute transition-opacity duration-500"
            style={{
              left: `${22 + index * 28}%`,
              top: `${12 + index * 18}%`,
              opacity: currentStep === 3 ? 1 : 0.25,
            }}
          />
        ))}
      </div>

      <div className="mb-5">
        <h3 className="font-display text-lg font-medium tracking-tight text-ink">
          {STEPS[currentStep].label}
        </h3>
        <p className="mt-1 text-sm text-ink-soft">{STEPS[currentStep].copy}</p>
      </div>

      <div className="mb-5 flex justify-center gap-2">
        {STEPS.map((step, index) => (
          <span
            key={step.label}
            className={`h-2 rounded-full transition-all duration-300 ease-soft ${
              index === currentStep
                ? "w-5 bg-accent"
                : index < currentStep
                  ? "bg-accent/50"
                  : "bg-line-strong"
            }`}
          />
        ))}
      </div>

      <div className="rounded-lg border border-line bg-paper p-4 text-left">
        <div className="flex items-center gap-2.5">
          <FiHome size={15} className="text-accent" />
          <span className="text-sm font-medium text-ink">Cash on delivery</span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
          Pay with cash when your order arrives at your doorstep.
        </p>
        <p className="mt-3 flex items-start gap-2 rounded-lg bg-accent-tint px-3 py-2 text-[13px] text-accent-deep">
          <FiInfo size={13} className="mt-0.5 shrink-0" />
          Keep exact change ready for a faster handover.
        </p>
      </div>

      <div className="relative mt-5 h-8 overflow-hidden">
        <FiTruck
          size={26}
          className={`absolute left-1/2 text-ink transition-transform duration-1000 ease-soft ${
            currentStep === 1 ? "opacity-100" : "opacity-40"
          }`}
          style={{
            transform:
              currentStep === 1 ? "translateX(-50%)" : "translateX(-300%)",
          }}
        />
      </div>
    </div>
  );
}
