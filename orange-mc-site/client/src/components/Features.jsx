import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import Icon from "./Icon";
import "./Features.css";

export default function Features() {
  const { content } = useContent();
  const features = content?.features;
  if (!features) return null;

  return (
    <section id="features" className="section features">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Features</p>
            <h2 className="section-title">{features.heading}</h2>
            <p className="section-subtitle">{features.subheading}</p>
          </div>
        </Reveal>

        <div className="grid grid-3">
          {(features.items || []).map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <SpotlightCard className="feature-card" spotlightColor="#643515">
                <div className="feature-card__icon">
                  <Icon name={item.icon} />
                </div>
                <h3 className="feature-card__title">{item.title}</h3>
                <p className="feature-card__desc">{item.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
