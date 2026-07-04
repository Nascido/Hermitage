import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import HermitageTopbar from "../components/shared/HermitageTopbar";

export function TicketFooter() {
  return (
    <footer className="ticket-footer">
      <div>
        <p>© 1998-2026 The State Hermitage Museum. All rights reserved</p>
        <p>Государственный Эрмитаж. Официальная система продажи билетов.</p>
        <div className="ticket-socials">
          {["f", "vk", "ok", "yt"].map((item) => <Link to="/not-implemented" key={item}>{item}</Link>)}
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
      <HermitageTopbar />
      <header className="ticket-header ticket-progress-header">
        <ol className="ticket-steps" aria-label="Ticket purchase progress">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const className = stepNumber === activeStep ? "is-current" : stepNumber < activeStep ? "is-complete" : "";
            return (
              <li key={step} className={className}>
                <span>{stepNumber}</span>{step}
              </li>
            );
          })}
        </ol>
      </header>
      {children}
      <TicketFooter />
    </>
  );
}
