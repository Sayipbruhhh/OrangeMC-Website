import { useEffect, useRef } from "react";

/**
 * MagicRings — an ambient, animated background of expanding concentric rings.
 *
 * Renders on a <canvas> so it stays cheap even when stretched across the
 * whole viewport. All motion is driven by requestAnimationFrame and pauses
 * automatically when the tab is hidden.
 *
 * Props mirror the supplied configuration:
 * color, colorTwo, ringCount, speed, attenuation, lineThickness, baseRadius,
 * radiusStep, scaleRate, opacity, blur, noiseAmount, rotation, ringGap,
 * fadeIn, fadeOut, followMouse, mouseInfluence, hoverScale, parallax, clickBurst
 */
export default function MagicRings({
  color = "#FF7A00",
  colorTwo = "#FF3B30",
  ringCount = 6,
  speed = 3,
  attenuation = 10,
  lineThickness = 2,
  baseRadius = 0.35,
  radiusStep = 0.1,
  scaleRate = 0.1,
  opacity = 1,
  blur = 0,
  noiseAmount = 0.1,
  rotation = 0,
  ringGap = 1.5,
  fadeIn = 0.7,
  fadeOut = 0.5,
  followMouse = false,
  mouseInfluence = 0.2,
  hoverScale = 1.2,
  parallax = 0.05,
  clickBurst = false,
  className = "",
  style = {}
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    t: 0,
    mouse: { x: 0.5, y: 0.5, target: { x: 0.5, y: 0.5 } },
    hover: false,
    bursts: []
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function handleMove(e) {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouse.target.x = (e.clientX - rect.left) / rect.width;
      stateRef.current.mouse.target.y = (e.clientY - rect.top) / rect.height;
      stateRef.current.hover = true;
    }
    function handleLeave() {
      stateRef.current.hover = false;
    }
    function handleClick(e) {
      if (!clickBurst) return;
      const rect = canvas.getBoundingClientRect();
      stateRef.current.bursts.push({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        born: stateRef.current.t
      });
    }

    if (followMouse || clickBurst) {
      window.addEventListener("mousemove", handleMove, { passive: true });
      window.addEventListener("mouseleave", handleLeave);
    }
    if (clickBurst) {
      window.addEventListener("click", handleClick);
    }

    // Cheap deterministic pseudo-noise (no external dependency needed).
    function noise1d(x) {
      return Math.sin(x * 12.9898) * 43758.5453 % 1;
    }

    function draw() {
      const s = stateRef.current;
      s.t += 0.016 * speed;

      // Ease the tracked mouse position toward its target.
      s.mouse.x += (s.mouse.target.x - s.mouse.x) * 0.06;
      s.mouse.y += (s.mouse.target.y - s.mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);
      if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
      } else {
        ctx.filter = "none";
      }

      const originX = followMouse
        ? width * (0.5 + (s.mouse.x - 0.5) * mouseInfluence)
        : width * 0.5;
      const originY = followMouse
        ? height * (0.5 + (s.mouse.y - 0.5) * mouseInfluence)
        : height * 0.5;

      const parallaxX = (s.mouse.x - 0.5) * parallax * width;
      const parallaxY = (s.mouse.y - 0.5) * parallax * height;

      const minDim = Math.min(width, height);
      const hoverMul = followMouse && s.hover ? hoverScale : 1;

      for (let i = 0; i < ringCount; i++) {
        // Each ring loops through an expansion cycle, offset by ringGap so
        // rings don't all pulse in unison.
        const phase = (s.t * scaleRate + i / ringGap) % 1;
        const life = phase; // 0 -> 1 across one expansion cycle

        // Fade envelope: rises during fadeIn, holds, fades during fadeOut.
        let env = 1;
        if (life < fadeIn) {
          env = life / Math.max(fadeIn, 0.0001);
        } else if (life > 1 - fadeOut) {
          env = (1 - life) / Math.max(fadeOut, 0.0001);
        }
        env = Math.max(0, Math.min(1, env));

        const radius =
          (baseRadius + i * radiusStep + life) * minDim * 0.5 * hoverMul;

        // Attenuation dims rings as they expand outward (like a ripple losing energy).
        const attenuationFactor = Math.exp(-life * (attenuation / 10));
        const ringOpacity = opacity * env * attenuationFactor;
        if (ringOpacity <= 0.002) continue;

        const mix = i / Math.max(ringCount - 1, 1);
        ctx.strokeStyle = blendColors(color, colorTwo, mix, ringOpacity);
        ctx.lineWidth = lineThickness;
        ctx.beginPath();

        const segments = 96;
        for (let seg = 0; seg <= segments; seg++) {
          const a =
            (seg / segments) * Math.PI * 2 + (rotation * Math.PI) / 180;
          const n = noiseAmount
            ? noise1d(a * 3 + i * 7.31 + s.t * 0.5) * noiseAmount * minDim * 0.02
            : 0;
          const r = radius + n;
          const x = originX + parallaxX + Math.cos(a) * r;
          const y = originY + parallaxY + Math.sin(a) * r;
          if (seg === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Click-burst rings: short-lived expanding rings from the click point.
      if (clickBurst && s.bursts.length) {
        s.bursts = s.bursts.filter((b) => s.t - b.born < 1.2);
        for (const b of s.bursts) {
          const age = s.t - b.born;
          const burstLife = age / 1.2;
          const r = burstLife * minDim * 0.3;
          const burstOpacity = opacity * (1 - burstLife);
          ctx.strokeStyle = blendColors(color, colorTwo, 0.5, burstOpacity);
          ctx.lineWidth = lineThickness;
          ctx.beginPath();
          ctx.arc(b.x * width, b.y * height, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (followMouse || clickBurst) {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseleave", handleLeave);
      }
      if (clickBurst) window.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    color,
    colorTwo,
    ringCount,
    speed,
    attenuation,
    lineThickness,
    baseRadius,
    radiusStep,
    scaleRate,
    opacity,
    blur,
    noiseAmount,
    rotation,
    ringGap,
    fadeIn,
    fadeOut,
    followMouse,
    mouseInfluence,
    hoverScale,
    parallax,
    clickBurst
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}

function blendColors(a, b, t, alpha) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(ca.r + (cb.r - ca.r) * t);
  const g = Math.round(ca.g + (cb.g - ca.g) * t);
  const bl = Math.round(ca.b + (cb.b - ca.b) * t);
  return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}
