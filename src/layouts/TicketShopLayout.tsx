import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  const activeStep = pathname.includes("checkout") ? 4 : pathname.includes("quantity") ? 3 : pathname.includes("main-museum-complex") ? 2 : 1;
  const steps = ["Ticket", "Date", "Amount", "Pay"];

  return (
    <>
      <header className="ticket-header">
        <div className="ticket-topbar">
          <Link to="/" className="ticket-menu-link">☰ Menu</Link>
          <Link to="/ticket-shop" className="ticket-logo"><img src={logo} alt="The State Hermitage Museum" /></Link>
          <button type="button">EN⌄</button>
        </div>
        <ol className="ticket-steps" aria-label="Ticket purchase progress">
          {steps.map((step, index) => (
            <li key={step} className={index + 1 <= activeStep ? "is-active" : ""}>
              <span>{index + 1}</span>{step}
            </li>
          ))}
        </ol>
      </header>
      {children}
      <TicketFooter />
    </>
  );
}
