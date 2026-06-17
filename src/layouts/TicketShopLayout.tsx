import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logos/hermitage-logo-ticket.png";

export function TicketFooter() {
  return (
    <footer className="ticket-footer">
      <div>
        <p>© 1998-2026 The State Hermitage Museum. All rights reserved</p>
        <p>Государственный Эрмитаж. Официальная система продажи билетов.</p>
        <div className="ticket-socials">
          {["f", "vk", "ok", "yt"].map((item) => <a href="#social" key={item}>{item}</a>)}
        </div>
      </div>
      <div>
        <p>For questions about tickets, contact us</p>
        <a href="mailto:tickets@hermitage.ru">tickets@hermitage.ru</a>
        <a href="mailto:info@hermitage.ru">info@hermitage.ru</a>
      </div>
    </footer>
  );
}

export default function TicketShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="ticket-header">
        <div className="ticket-topbar">
          <button type="button">🇬🇧 ENG⌄</button>
          <Link to="/ticket-shop" className="ticket-logo"><img src={logo} alt="The State Hermitage Museum" /></Link>
          <button type="button">Rules⌄</button>
        </div>
        <nav aria-label="Ticket shop navigation">
          <a href="#visit">VISIT US</a>
          <a href="#whats-on">WHAT'S ON</a>
          <a href="#learn">LEARN</a>
          <Link to="/virtual-visit">VIRTUAL VISIT</Link>
          <a href="#support">SUPPORT THE MUSEUM</a>
          <a href="#about">ABOUT US</a>
        </nav>
      </header>
      {children}
      <TicketFooter />
    </>
  );
}
