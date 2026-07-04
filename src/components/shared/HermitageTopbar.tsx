import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/hermitage-logo-institutional.png";
import drawerLogo from "../../assets/logos/hermitage-logo-ticket.png";

const searchLinks = [
  ["Search site", "news, events, pages general", "/search", "search"],
  ["Search collection", "works, artists, periods, materials", "/search/artworks", "collection"],
] as const;

const visitLinks = [
  ["Tickets", "/tickets"],
  ["Hotel", "/not-implemented"],
] as const;

const exploreLinks = [
  ["Visit us", "/tickets", false],
  ["Collection online", "/search/artworks", true],
  ["Virtual visit", "/virtual-visit", true],
] as const;

const infoLinks = [
  ["What's on at the Hermitage", "/not-implemented"],
  ["Shop", "/not-implemented"],
  ["Support", "/not-implemented"],
  ["About us", "/not-implemented"],
] as const;

export default function HermitageTopbar() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
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
    <div className="ticket-shell hermitage-topbar-shell" ref={wrapRef}>
      <header className="ticket-header">
        <div className="ticket-topbar">
          <button className={`ticket-menu-link ${open ? "is-open" : ""}`} type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen((value) => !value)}>
            <span className="ticket-hamburger" aria-hidden="true" />
            <span>Menu</span>
          </button>
          <Link to="/" className="ticket-logo" onClick={() => setOpen(false)}>
            <img src={logo} alt="The State Hermitage Museum" />
          </Link>
          <div className="ticket-header-actions" aria-label="Site settings">
            <div className="ticket-language-control">
              <button className="language-button" type="button" aria-expanded={languageOpen} aria-controls="language-menu" onClick={() => setLanguageOpen((value) => !value)}>
                <span className="ticket-icon ticket-icon-globe" aria-hidden="true" /> EN⌄
              </button>
              {languageOpen && (
                <div id="language-menu" className="language-menu ticket-language-menu">
                  <button type="button" onClick={() => setLanguageOpen(false)}>English</button>
                  <button type="button" onClick={() => setLanguageOpen(false)}>Russian</button>
                </div>
              )}
            </div>
            <button type="button" aria-label="Profile"><span className="ticket-icon ticket-icon-person" aria-hidden="true" /></button>
            <button type="button" aria-label="Settings"><span className="ticket-icon ticket-icon-gear" aria-hidden="true" /></button>
            <button type="button" aria-label="Dark mode"><span className="ticket-icon ticket-icon-moon" aria-hidden="true" /></button>
          </div>
        </div>
      </header>
      {open && (
        <nav className="main-menu-panel ticket-main-menu-panel" id="main-menu" aria-label="Main menu">
          <div className="drawer-brand">
            <Link to="/" onClick={() => setOpen(false)}>
              <img src={drawerLogo} alt="The State Hermitage Museum" />
            </Link>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
          </div>
          <h2 className="drawer-section-title">Search</h2>
          <div className="menu-search-links">
            {searchLinks.map(([label, description, path, icon]) => (
              <Link to={path} key={label} onClick={() => setOpen(false)}>
                <span className={`drawer-search-icon ${icon}`} aria-hidden="true" />
                <span>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
              </Link>
            ))}
          </div>
          <div className="menu-columns">
            <section>
              <h2>Explore</h2>
              {exploreLinks.map(([label, path, nested]) => (
                <Link key={label} to={path} onClick={() => setOpen(false)}>
                  {label}
                  {nested && <span aria-hidden="true">›</span>}
                </Link>
              ))}
            </section>
            <section>
              <h2>Visit</h2>
              {visitLinks.map(([label, path]) => <Link key={label} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
            </section>
            <section>
              <h2>News and information</h2>
              {infoLinks.map(([label, path]) => <Link to={path} key={label} onClick={() => setOpen(false)}>{label}</Link>)}
            </section>
          </div>
          <footer className="drawer-footer">
            <div className="drawer-socials" aria-label="Social links">
              {["f", "vk", "yt", "tg", "rss"].map((item) => <Link to="/not-implemented" key={item}>{item}</Link>)}
            </div>
            <p className="menu-copyright">© The State Hermitage Museum, 1998-2026</p>
          </footer>
        </nav>
      )}
    </div>
  );
}
