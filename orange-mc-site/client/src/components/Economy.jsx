import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Economy() {
  const { content } = useContent();
  const economy = content?.economy;
  if (!economy || economy.enabled === false) return null;

  return (
    <section id="economy" className="section economy">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Economy</p>
            <h2 className="section-title">{economy.heading}</h2>
            <p className="section-subtitle">{economy.subheading}</p>
          </div>
        </Reveal>
        {economy.description && (
          <Reveal>
            <p style={{ maxWidth: 640, marginBottom: 40 }}>{economy.description}</p>
          </Reveal>
        )}
        <div className="grid grid-4">
          {(economy.items || []).map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <SpotlightCard className="feature-card" spotlightColor="#643515">
                <div className="feature-card__icon">
                  <Icon name={item.icon} size={22} />
                </div>
                <h3 className="feature-card__title" style={{ fontSize: 16 }}>
                  {item.title}
                </h3>
                <p className="feature-card__desc">{item.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
