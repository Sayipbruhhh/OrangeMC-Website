import { useState } from "react";
import { useContent } from "../context/ContentContext";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import "./FAQ.css";

export default function FAQ() {
  const { content } = useContent();
  const faq = content?.faq;
  const [openId, setOpenId] = useState(null);
  if (!faq) return null;

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">{faq.heading}</h2>
            <p className="section-subtitle">{faq.subheading}</p>
          </div>
        </Reveal>

        <div className="faq__list">
          {(faq.items || []).map((item, i) => {
            const open = openId === item.id;
            return (
              <Reveal key={item.id} delay={i * 50}>
                <SpotlightCard className="faq-card" spotlightColor="#643515">
                  <button
                    className="faq-card__question"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                  >
                    <span>{item.question}</span>
                    <span className={`faq-card__chevron ${open ? "faq-card__chevron--open" : ""}`}>⌄</span>
                  </button>
                  <div className={`faq-card__answer ${open ? "faq-card__answer--open" : ""}`}>
                    <p>{item.answer}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
