import { useRef } from "react";
import "./SpotlightCard.css";

/**
 * SpotlightCard — a card with a soft radial "spotlight" that follows the
 * cursor, used throughout the site for feature/stat/event/pricing/profile
 * cards. Usage:
 *
 *   <SpotlightCard className="custom-spotlight-card" spotlightColor="#643515">
 *     ...
 *   </SpotlightCard>
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "#643515"
}) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
  }

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      style={{ "--spot-color": spotlightColor }}
    >
      <div className="spotlight-card__glow" />
      <div className="spotlight-card__content">{children}</div>
    </div>
  );
}
