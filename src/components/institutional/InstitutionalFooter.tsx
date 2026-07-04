import { Link } from "react-router-dom";

export default function InstitutionalFooter() {
  return (
    <footer className="institutional-footer">
      <div className="social-row" aria-label="Social links">
        {["f", "vk", "yt", "tg", "rss", "ok"].map((item) => (
          <Link to="/not-implemented" key={item}>{item}</Link>
        ))}
      </div>
      <nav aria-label="Footer links">
        <Link to="/not-implemented">ABOUT</Link>
        <Link to="/not-implemented">PRESS</Link>
        <Link to="/not-implemented">CONTACTS</Link>
        <Link to="/not-implemented">ACCESSIBILITY</Link>
        <Link to="/not-implemented">SITEMAP</Link>
      </nav>
      <div className="app-badges">
        <span>App Store</span>
        <span>Google play</span>
      </div>
      <p>© The State Hermitage Museum, 1998-2026</p>
    </footer>
  );
}
