import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import { resolveImageUrl } from "../api";
import "./FounderSection.css";

export default function FounderSection() {
  const { content } = useContent();
  const founders = content?.founders;
  if (!founders) return null;

  return (
    <section id="founders" className="section founders">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Founders</p>
            <h2 className="section-title">{founders.heading}</h2>
            <p className="section-subtitle">{founders.subheading}</p>
          </div>
        </Reveal>

        <div className="founders__row">
          {(founders.members || []).map((f, i) => (
            <Reveal key={f.id} delay={i * 90}>
              <SpotlightCard className="founder-card" spotlightColor="#643515">
                <div className="founder-card__portrait">
                  {f.image ? (
                    <img src={resolveImageUrl(f.image)} alt={f.name} />
                  ) : (
                    <div className="founder-card__placeholder">{f.name?.[0] || "?"}</div>
                  )}
                </div>

                <h3 className="founder-card__name">{f.name}</h3>
                <div className="founder-card__role">{f.role}</div>
                <p className="founder-card__desc">{f.description}</p>
                <div className="founder-card__socials">
                  {f.discord && <a href={f.discord} target="_blank" rel="noreferrer">Discord</a>}
                  {f.twitter && <a href={f.twitter} target="_blank" rel="noreferrer">Twitter</a>}
                  {f.youtube && <a href={f.youtube} target="_blank" rel="noreferrer">YouTube</a>}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
