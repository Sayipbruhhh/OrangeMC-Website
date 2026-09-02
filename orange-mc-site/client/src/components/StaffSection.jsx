import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import { resolveImageUrl } from "../api";
import "./StaffSection.css";

export default function StaffSection() {
  const { content } = useContent();
  const staff = content?.staff;
  if (!staff) return null;

  return (
    <section id="staff" className="section staff">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">The Team</p>
            <h2 className="section-title">{staff.heading}</h2>
            <p className="section-subtitle">{staff.subheading}</p>
          </div>
        </Reveal>

        <div className="grid grid-4 staff__grid">
          {(staff.members || []).map((m, i) => (
            <Reveal key={m.id} delay={i * 60}>
              <SpotlightCard className="staff-card" spotlightColor="#643515">
                <div className="staff-card__avatar">
                  {m.image ? (
                    <img src={resolveImageUrl(m.image)} alt={m.name} />
                  ) : (
                    <span>{m.name?.[0] || "?"}</span>
                  )}
                </div>
                <h3 className="staff-card__name">{m.name}</h3>
                <div className="staff-card__position">{m.position}</div>
                <p className="staff-card__desc">{m.description}</p>
                <div className="staff-card__socials">
                  {m.discord && <a href={m.discord} target="_blank" rel="noreferrer">Discord</a>}
                  {m.twitter && <a href={m.twitter} target="_blank" rel="noreferrer">Twitter</a>}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
