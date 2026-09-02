import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import "./Community.css";

const SOCIALS = [
  { key: "discordUrl", label: "Discord" },
  { key: "youtubeUrl", label: "YouTube" },
  { key: "instagramUrl", label: "Instagram" },
  { key: "tiktokUrl", label: "TikTok" },
  { key: "twitterUrl", label: "Twitter / X" }
];

export default function Community() {
  const { content } = useContent();
  const community = content?.community;
  if (!community) return null;

  const links = SOCIALS.filter((s) => community[s.key]);

  return (
    <section id="community" className="section community">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Community</p>
            <h2 className="section-title">{community.heading}</h2>
            <p className="section-subtitle">{community.subheading}</p>
          </div>
        </Reveal>

        <div className="community__layout">
          <div className="community__stats">
            {(community.stats || []).map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <SpotlightCard className="community__stat-card" spotlightColor="#643515">
                  <div className="community__stat-value">
                    <CountUp value={s.value} />
                  </div>
                  <div className="community__stat-label">{s.label}</div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="community__links">
            {links.map((s) => (
              <a
                key={s.key}
                href={community[s.key]}
                target="_blank"
                rel="noreferrer"
                className="community__link btn btn-secondary"
              >
                {s.label}
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
