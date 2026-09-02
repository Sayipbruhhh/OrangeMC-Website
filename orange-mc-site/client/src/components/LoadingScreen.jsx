import { useEffect, useState } from "react";
import MagicRings from "./MagicRings";
import "./LoadingScreen.css";

export default function LoadingScreen({ ready, onFinished }) {
  const [progress, setProgress] = useState(6);
  const [exiting, setExiting] = useState(false);

  // Progress bar climbs on its own so the screen never feels stuck, but only
  // completes once the real content fetch (`ready`) has actually resolved.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const ceiling = ready ? 100 : 88;
        if (p >= ceiling) return p;
        return p + Math.max(1, (ceiling - p) * 0.12);
      });
    }, 90);
    return () => clearInterval(interval);
  }, [ready]);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(onFinished, 500);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [progress, onFinished]);

  return (
    <div className={`loading-screen ${exiting ? "loading-screen--exit" : ""}`}>
      <div className="loading-screen__bg">
        <MagicRings
          color="#FF7A00"
          colorTwo="#FF3B30"
          ringCount={5}
          speed={4}
          attenuation={8}
          lineThickness={2}
          baseRadius={0.1}
          radiusStep={0.12}
          scaleRate={0.18}
          opacity={0.8}
          noiseAmount={0.15}
          ringGap={1.2}
          fadeIn={0.5}
          fadeOut={0.5}
          followMouse={false}
          clickBurst={false}
        />
      </div>
      <div className="loading-screen__content">
        <div className="loading-screen__logo">Orange<span>MC</span></div>
        <div className="loading-screen__bar">
          <div className="loading-screen__bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <div className="loading-screen__pct">{Math.min(Math.round(progress), 100)}%</div>
      </div>
    </div>
  );
}
