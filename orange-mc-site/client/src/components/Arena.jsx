import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import "./Arena.css";

export default function Arena() {
  const { content } = useContent();
  const arena = content?.arena;
  if (!arena || arena.enabled === false) return null;

  return (
    <section id="arena" className="section arena">
      <div className="container">
        <div className="arena__layout">
          <Reveal className="arena__copy">
            <p className="eyebrow">Arena</p>
            <h2 className="section-title">{arena.heading}</h2>
            <p className="section-subtitle" style={{ marginBottom: 24 }}>
              {arena.subheading}
            </p>
            <p style={{ marginBottom: 28 }}>{arena.description}</p>
            <ul className="arena__list">
              {(arena.highlights || []).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </Reveal>

          <div className="arena__stats">
            {(arena.stats || []).map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <SpotlightCard className="arena__stat-card" spotlightColor="#643515">
                  <div className="arena__stat-value">
                    <CountUp value={s.value} />
                  </div>
                  <div className="arena__stat-label">{s.label}</div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
