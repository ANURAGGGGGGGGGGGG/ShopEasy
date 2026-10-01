const ITEMS = [
  "Free shipping over ₹500",
  "SAVE10 takes 10% off your subtotal",
  "30-day returns on every order",
  "New pieces added every Friday",
];

function Group({ hidden }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden ? "true" : undefined}>
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85"
        >
          {item}
          <span aria-hidden="true" className="ml-6 text-accent">
            /
          </span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-ink py-2.5">
      <div className="marquee">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
