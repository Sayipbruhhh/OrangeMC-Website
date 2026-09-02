import { useEffect, useState } from "react";
import { useContent } from "../context/ContentContext";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "servers", label: "Servers", href: "#servers" },
  { id: "features", label: "Features", href: "#features" },
  { id: "arena", label: "Arena", href: "#arena" },
  { id: "community", label: "Community", href: "#community" },
  { id: "events", label: "Events", href: "#events" },
  { id: "founders", label: "Team", href: "#founders" },
  { id: "rules", label: "Rules", href: "#rules" },
  { id: "faq", label: "FAQ", href: "#faq" }
];

export default function Navbar() {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [content]);

  const siteName = content?.branding?.siteName || "Orange MC";
  // Store button only appears once an admin sets a URL for it in
  // Site Settings — it links out (e.g. to a Tebex/Buycraft store) rather
  // than scrolling to an in-page section.
  const storeUrl = content?.siteSettings?.storeUrl;

  function handleNavClick() {
    setOpen(false);
  }

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand">
          {siteName}
        </a>

        <nav className="navbar__links navbar__links--desktop">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`navbar__link ${active === link.id ? "navbar__link--active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          {storeUrl && (
            <a href={storeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary navbar__store">
              Store
            </a>
          )}
          <a href={content?.hero?.primaryCtaLink || "#server"} className="btn btn-primary navbar__cta">
            Play Now
          </a>
        </div>

        <button
          className={`navbar__burger ${open ? "navbar__burger--open" : ""}`}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${open ? "navbar__mobile--open" : ""}`}>
        {LINKS.map((link) => (
          <a key={link.id} href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
        {storeUrl && (
          <a href={storeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" onClick={handleNavClick}>
            Store
          </a>
        )}
        <a href={content?.hero?.primaryCtaLink || "#server"} className="btn btn-primary" onClick={handleNavClick}>
          Play Now
        </a>
      </div>
    </header>
  );
}
