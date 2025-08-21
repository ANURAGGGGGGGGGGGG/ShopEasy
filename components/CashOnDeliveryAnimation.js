'use client';

import { useState, useEffect } from 'react';

export default function CashOnDeliveryAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Animation cycle: package → door → person → money → success
  const steps = [
    { icon: "📦", label: "Package Ready" },
    { icon: "🚚", label: "Out for Delivery" },
    { icon: "🏠", label: "At Your Door" },
    { icon: "💰", label: "Cash Payment" },
    { icon: "✅", label: "Order Complete" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 text-center">
      {/* Main Animation Area */}
      <div className="relative h-32 mb-4 flex items-center justify-center">
        {/* Animated Background Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full animate-pulse"></div>
        </div>
        
        {/* Main Icon */}
        <div className="relative z-10 text-6xl animate-bounce">
          {steps[currentStep].icon}
        </div>
        
        {/* Floating Money Bills Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-pulse"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: currentStep === 3 ? 1 : 0.3
              }}
            >
              💵
            </div>
          ))}
        </div>
      </div>
      
      {/* Current Step Label */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-orange-800 mb-1">
          {steps[currentStep].label}
        </h3>
        <p className="text-sm text-orange-600">
          {currentStep === 0 && "Your order is being prepared"}
          {currentStep === 1 && "Delivery agent is on the way"}
          {currentStep === 2 && "Ready for cash payment"}
          {currentStep === 3 && "Pay the delivery person"}
          {currentStep === 4 && "Thank you for your purchase!"}
        </p>
      </div>
      
      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentStep 
                ? 'bg-orange-500 scale-125' 
                : index < currentStep 
                  ? 'bg-orange-300' 
                  : 'bg-orange-200'
            }`}
          />
        ))}
      </div>
      
      {/* Cash on Delivery Info */}
      <div className="bg-white rounded-lg p-4 border border-orange-200">
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl mr-2">🏠</span>
          <span className="font-semibold text-gray-800">Cash on Delivery</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Pay with cash when your order arrives at your doorstep
        </p>
        <div className="text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2">
          💡 Keep exact change ready for faster delivery
        </div>
      </div>
      
      {/* Delivery Truck Animation */}
      <div className="mt-4 relative overflow-hidden">
        <div className="flex items-center justify-center">
          <div className={`transition-transform duration-1000 ${
            currentStep === 1 ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <span className="text-3xl">🚚💨</span>
          </div>
        </div>
      </div>
    </div>
  );
}