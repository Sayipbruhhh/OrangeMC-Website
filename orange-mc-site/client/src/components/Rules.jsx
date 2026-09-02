import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import "./Rules.css";

export default function Rules() {
  const { content } = useContent();
  const rules = content?.rules;
  if (!rules) return null;

  return (
    <section id="rules" className="section rules">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Rules</p>
            <h2 className="section-title">{rules.heading}</h2>
            <p className="section-subtitle">{rules.subheading}</p>
          </div>
        </Reveal>

        <div className="grid grid-2">
          {(rules.categories || []).map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <SpotlightCard className="rules-card" spotlightColor="#643515">
                <h3 className="rules-card__category">{cat.category}</h3>
                <ul className="rules-card__list">
                  {(cat.items || []).map((item) => (
                    <li key={item.id} className={`rules-card__item rules-card__item--${item.severity}`}>
                      <div className="rules-card__item-title">{item.title}</div>
                      <p className="rules-card__item-desc">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
