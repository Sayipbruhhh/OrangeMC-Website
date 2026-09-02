import { useEffect, useRef, useState } from "react";

// Animates from 0 up to the numeric portion of `value` once it scrolls into
// view. Non-numeric characters (e.g. "18,000+") are preserved as a suffix/prefix.
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);
  const match = String(value).match(/([\d,.]+)/);
  const numeric = match ? parseFloat(match[1].replace(/,/g, "")) : null;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice(match.index + match[1].length) : "";

  useEffect(() => {
    if (numeric === null) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        function tick(now) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(numeric * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [numeric, duration]);

  if (numeric === null) {
    return <span ref={ref}>{value}</span>;
  }

  const formatted = display === null ? "0" : display.toLocaleString();
  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
