const paths = {
  sword: "M14.5 2 3 13.5 2 14.5l1 1 1 1 1-1L15.5 4.5 20 9l1.5-1.5L14.5 0z M3 13.5l7.5 7.5",
  shield: "M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5z",
  coin: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 7v10M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5",
  sparkles: "M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  globe: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10z",
  calendar: "M4 4h16a1 1 0 011 1v15a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zM3 9h18M8 2v4M16 2v4",
  shop: "M3 9l1-5h16l1 5M3 9v11h18V9M3 9h18M9 13a3 3 0 006 0",
  gavel: "M13 3l4 4-3 3-4-4zM10 6l6 6M4 21l7-7M15 12l6 6-2 2-6-6z",
  box: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10",
  default: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4M12 16h.01"
};

export default function Icon({ name = "default", size = 26, className = "" }) {
  const d = paths[name] || paths.default;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}
