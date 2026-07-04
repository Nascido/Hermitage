import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";

const prices = [
  ["Main Museum Complex", "700 ₽"],
  ["Main + General Staff", "1.000 ₽"],
  ["General Staff Building", "500 ₽"],
] as const;

export default function TicketsInfoPage() {
  return (
    <InstitutionalLayout>
      <main className="tickets-info-page">
        <section className="tickets-hero">
          <h1>Tickets</h1>
          <p>Purchase online and skip the queue</p>
          <Link to="/ticket-shop">Buy tickets online</Link>
        </section>
        <section className="tickets-pricing">
          <Link className="back-link institutional" to="/">← Back</Link>
          <h2>Price list</h2>
          <div className="price-card-grid">
            {prices.map(([title, price]) => (
              <article className="price-card" key={title}>
                <h3>{title}</h3>
                <strong>{price}</strong>
                <p>per person</p>
                <Link to="/ticket-shop">Buy →</Link>
              </article>
            ))}
          </div>
          <aside className="ticket-info-note">
            <h3>Important information</h3>
            <p>Temporary exhibitions are accessible for visitors with a general entrance ticket.</p>
            <p>Closed on Mondays, 1 January and 9 May.</p>
          </aside>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
