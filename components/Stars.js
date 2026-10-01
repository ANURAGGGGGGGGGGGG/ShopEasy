import { FiStar } from "react-icons/fi";

export default function Stars({ rate = 0, count, size = 13, className = "" }) {
  const filled = Math.round(rate);

  return (
    <span className={`flex items-center gap-1.5 text-[12px] text-ink-mute ${className}`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <FiStar
            key={index}
            size={size}
            className={
              index < filled
                ? "fill-ink text-ink"
                : "fill-transparent text-line-strong"
            }
          />
        ))}
      </span>
      <span className="font-medium text-ink-soft tabular-nums">{rate.toFixed(1)}</span>
      {typeof count === "number" && (
        <span className="tabular-nums text-ink-mute">({count})</span>
      )}
    </span>
  );
}
