import MagicRings from "./MagicRings";

// Wraps MagicRings so it fills the viewport and sits fixed behind all page
// content. Kept intentionally calm (see prop values) — the content is where
// most of the visual movement should happen, per the design brief.
export default function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(255,122,0,0.08), transparent 60%), #0a0806"
      }}
    >
      <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
        <MagicRings
          color="#FF7A00"
          colorTwo="#FF3B30"
          ringCount={6}
          speed={3}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={0.55}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst
        />
      </div>
    </div>
  );
}
