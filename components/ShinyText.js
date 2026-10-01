import React from "react";

/**
 * A simple shimmering text effect inspired by React Bits «Shiny Text».
 *
 * Props:
 *  - text:       string to display
 *  - disabled:   when true, the animation is paused
 *  - speed:      animation duration in seconds (default 5)
 *  - className:  extra classes for the wrapper
 */
const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;