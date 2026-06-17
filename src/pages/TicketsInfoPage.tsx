import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import banner from "../assets/banners/tickets-collage.png";

export default function TicketsInfoPage() {
  return (
    <InstitutionalLayout>
      <main className="tickets-info-page">
        <div className="tickets-banner" style={{ backgroundImage: `url(${banner})` }} />
        <section>
          <h1>Purchase of Online Tickets</h1>
          <Link className="outline-cta" to="/ticket-shop">BUY TICKETS ONLINE</Link>
          <p>Temporary exhibitions are accessible for individual viewing to visitors of tickets to the museum: museum facility, Center exhibitions and other displays included into the ticket.</p>
          <p>Please buy only tickets in the non-discounted category.</p>
          <ul>
            <li>Main Museum Complex - 700 roubles</li>
            <li>Main Museum Complex, General Staff - 1,000 roubles</li>
            <li>General Staff building - 500 roubles</li>
            <li>General Staff building, one section - 300 roubles</li>
          </ul>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
