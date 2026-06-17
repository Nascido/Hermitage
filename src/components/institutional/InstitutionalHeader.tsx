import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/hermitage-logo-institutional.png";

const menuItems = [
  "VISIT US",
  "EXPLORE",
  "VIRTUAL VISIT",
  "NEWS",
  "WHAT'S ON AT THE HERMITAGE",
  "LEARN",
  "ABOUT US",
  "SUPPORT",
  "RESEARCH AND PUBLICATIONS",
  "HOTEL",
  "SHOP",
];

export default function InstitutionalHeader() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className="institutional-header" ref={wrapRef}>
      <Link to="/" className="institutional-logo">
        <img src={logo} alt="The State Hermitage Museum" />
      </Link>
      <button className={`menu-button ${open ? "is-open" : ""}`} type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen((value) => !value)}>
        <span className="hamburger" aria-hidden="true" />
        <span>MENU</span>
      </button>
      {open && (
        <nav className="main-menu-panel" id="main-menu" aria-label="Main menu">
          {menuItems.map((item) => (
            <Link key={item} to={item === "VIRTUAL VISIT" ? "/virtual-visit" : item === "VISIT US" ? "/tickets" : "#"} onClick={() => setOpen(false)}>
              {item}
            </Link>
          ))}
        </nav>
      )}
      <nav className="institutional-links" aria-label="Institutional links">
        <Link to="/tickets">TICKETS</Link>
        <a href="#shop">SHOP</a>
        <a href="#hotel">HOTEL</a>
        <button type="button">RU</button>
        <button className="eye-button" type="button" aria-label="Accessibility version">
          <span aria-hidden="true" />
        </button>
        <Link className="search-link" to="/search?q=ch">SEARCH</Link>
        <Link className="search-icon-link" to="/search?q=ch" aria-label="Search">
          <span className="magnifier" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
