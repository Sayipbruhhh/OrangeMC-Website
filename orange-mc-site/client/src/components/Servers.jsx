import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import { resolveImageUrl } from "../api";
import "./Servers.css";

export default function Servers() {
  const { content } = useContent();
  const servers = content?.servers;
  if (!servers) return null;

  return (
    <section id="servers" className="section servers">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Servers</p>
            <h2 className="section-title">{servers.heading}</h2>
            <p className="section-subtitle">{servers.subheading}</p>
          </div>
        </Reveal>

        <div className="grid grid-2">
          {(servers.items || []).map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <SpotlightCard className="server-card" spotlightColor="#643515">
                {s.image && (
                  <div
                    className="server-card__image"
                    style={{ backgroundImage: `url(${resolveImageUrl(s.image)})` }}
                  />
                )}
                <div className="server-card__top">
                  <h3 className="server-card__name">{s.name}</h3>
                  <span className={`server-card__status server-card__status--${s.status}`}>{s.status}</span>
                </div>
                <p className="server-card__desc">{s.description}</p>
                <div className="server-card__meta">
                  <div>
                    <span>Mode</span>
                    <strong>{s.gamemode}</strong>
                  </div>
                  <div>
                    <span>Version</span>
                    <strong>{s.version}</strong>
                  </div>
                  <div>
                    <span>Platform</span>
                    <strong>{s.platform}</strong>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
