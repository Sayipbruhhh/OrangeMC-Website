import { useContent } from "../context/ContentContext";
import "./Footer.css";

export default function Footer() {
  const { content } = useContent();
  const footer = content?.footer;
  const branding = content?.branding;
  const server = content?.server;
  if (!footer) return null;

  const year = new Date().getFullYear();
  const copyright = (footer.copyrightText || "").replace("{year}", year);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand-col">
          <div className="footer__brand">{branding?.siteName || "Orange MC"}</div>
          <p className="footer__tagline">{footer.tagline}</p>
          {server?.javaIp && <p className="footer__ip">IP: {server.javaIp}</p>}
        </div>

        {(footer.columns || []).map((col) => (
          <div key={col.id} className="footer__col">
            <h4>{col.title}</h4>
            <ul>
              {(col.links || []).map((link) => (
                <li key={link.id}>
                  <a href={link.href} target={link.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container footer__bottom">
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
