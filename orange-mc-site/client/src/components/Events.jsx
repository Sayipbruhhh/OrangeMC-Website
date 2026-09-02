import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import { resolveImageUrl } from "../api";
import "./Events.css";

export default function Events() {
  const { content } = useContent();
  const events = content?.events;
  if (!events) return null;

  return (
    <section id="events" className="section events">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Events</p>
            <h2 className="section-title">{events.heading}</h2>
            <p className="section-subtitle">{events.subheading}</p>
          </div>
        </Reveal>

        <div className="grid grid-2">
          {(events.items || []).map((ev, i) => (
            <Reveal key={ev.id} delay={i * 80}>
              <SpotlightCard className="event-card" spotlightColor="#643515">
                {ev.image && (
                  <div
                    className="event-card__image"
                    style={{ backgroundImage: `url(${resolveImageUrl(ev.image)})` }}
                  />
                )}
                <div className="event-card__top">
                  <span className="event-card__type">{ev.type}</span>
                  <span className={`event-card__status event-card__status--${ev.status}`}>{ev.status}</span>
                </div>
                <h3 className="event-card__title">{ev.title}</h3>
                <p className="event-card__desc">{ev.description}</p>
                <div className="event-card__meta">
                  <div>
                    <span>Date</span>
                    <strong>{ev.date}</strong>
                  </div>
                  <div>
                    <span>Time</span>
                    <strong>{ev.time}</strong>
                  </div>
                  <div>
                    <span>Frequency</span>
                    <strong>{ev.frequency}</strong>
                  </div>
                </div>
                {ev.rewards && ev.rewards !== "N/A" && (
                  <div className="event-card__rewards">🏆 {ev.rewards}</div>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
