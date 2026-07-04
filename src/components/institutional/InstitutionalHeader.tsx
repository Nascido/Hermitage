import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/hermitage-logo-institutional.png";

const exploreLinks = [
  ["Search site", "/search"],
  ["Search collection", "/search/artworks"],
  ["Virtual visit", "/virtual-visit"],
  ["Museum map", "/virtual-visit/main-museum-complex"],
] as const;

const visitLinks = [
  ["Tickets", "/tickets"],
  ["Buy online", "/ticket-shop"],
  ["Plan your visit", "/tickets"],
] as const;

const infoLinks = ["What's on at the Hermitage", "Shop", "Support", "About us"];

export default function InstitutionalHeader() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setLanguageOpen(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
        setLanguageOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className={`institutional-header ${highContrast ? "is-high-contrast" : ""}`} ref={wrapRef}>
      <button className={`menu-button ${open ? "is-open" : ""}`} type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen((value) => !value)}>
        <span className="hamburger" aria-hidden="true" />
        <span>MENU</span>
      </button>
      <Link to="/" className="institutional-logo" onClick={() => setOpen(false)}>
        <img src={logo} alt="The State Hermitage Museum" />
      </Link>
      {open && (
        <nav className="main-menu-panel" id="main-menu" aria-label="Main menu">
          <div className="menu-search-links">
            <Link to="/search" onClick={() => setOpen(false)}>Search site</Link>
            <Link to="/search/artworks" onClick={() => setOpen(false)}>Search collection</Link>
          </div>
          <div className="menu-columns">
            <section>
              <h2>Explore</h2>
              {exploreLinks.map(([label, path]) => <Link key={label} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
            </section>
            <section>
              <h2>Visit</h2>
              {visitLinks.map(([label, path]) => <Link key={label} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
            </section>
            <section>
              <h2>News and information</h2>
              {infoLinks.map((label) => <a href="#info" key={label} onClick={() => setOpen(false)}>{label}</a>)}
            </section>
          </div>
          <p className="menu-copyright">© The State Hermitage Museum, 1998-2026</p>
        </nav>
      )}
      <div className="institutional-tools" aria-label="Site tools">
        <div className="language-control">
          <button type="button" aria-expanded={languageOpen} aria-controls="language-menu" onClick={() => setLanguageOpen((value) => !value)}>
            <span aria-hidden="true">◎</span> EN
          </button>
          {languageOpen && (
            <div id="language-menu" className="language-menu">
              <button type="button" onClick={() => setLanguageOpen(false)}>English</button>
              <button type="button" onClick={() => setLanguageOpen(false)}>Russian</button>
            </div>
          )}
        </div>
        <button type="button" aria-pressed={highContrast} aria-label="Accessibility mode" onClick={() => setHighContrast((value) => !value)}>Aa</button>
        <button type="button" aria-label="Settings">⚙</button>
        <button type="button" aria-label="Dark mode preview">◐</button>
      </div>
      <Link className="quick-search" to="/search" aria-label="Search">Search</Link>
    </header>
  );
}
