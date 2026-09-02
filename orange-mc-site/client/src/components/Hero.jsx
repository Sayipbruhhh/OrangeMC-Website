import { useContent } from "../context/ContentContext";
import ServerStatus from "./ServerStatus";
import { resolveImageUrl } from "../api";
import "./Hero.css";

export default function Hero() {
  const { content } = useContent();
  const hero = content?.hero || {};

  return (
    <section id="home" className="hero">
      {hero.backgroundImage && (
        <div
          className="hero__bg-image"
          style={{ backgroundImage: `url(${resolveImageUrl(hero.backgroundImage)})` }}
        />
      )}
      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow reveal is-visible">{hero.eyebrow || "A Minecraft Network"}</p>
        <h1 className="hero__title reveal is-visible">{hero.title || "Orange MC"}</h1>
        <p className="hero__subtitle reveal is-visible">{hero.subtitle}</p>

        <div className="hero__ctas reveal is-visible">
          {hero.primaryCtaLabel && (
            <a href={hero.primaryCtaLink || "#server"} className="btn btn-primary">
              {hero.primaryCtaLabel}
            </a>
          )}
          {hero.secondaryCtaLabel && (
            <a
              href={hero.secondaryCtaLink || "#community"}
              className="btn btn-secondary"
              target={hero.secondaryCtaLink?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {hero.secondaryCtaLabel}
            </a>
          )}
        </div>

        <div id="server" className="hero__status reveal is-visible">
          <ServerStatus />
        </div>
      </div>
    </section>
  );
}
