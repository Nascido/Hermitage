import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ticketProducts } from "../data/tickets";
import TicketShopLayout from "../layouts/TicketShopLayout";

const tags = [
  "Free of charge",
  "Main museum complex",
  "General Staff Building",
  "Winter Palace of Peter the Great",
  "Menshikov Palace",
  "The Staraya Derevnya Restoration and Storage Centre",
  "The Museum of the Imperial Porcelain Factory",
  "Pushkin card",
  "Exhibitions",
];

export default function TicketCatalogPage() {
  const [query, setQuery] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const navigate = useNavigate();
  const filteredProducts = useMemo(
    () => ticketProducts.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase()) || product.location.toLowerCase().includes(query.toLowerCase());
      const matchesAvailability = !onlyAvailable || product.availableDates.length > 0;
      return matchesQuery && matchesAvailability;
    }),
    [onlyAvailable, query],
  );

  return (
    <TicketShopLayout>
      <main className="ticket-catalog-page">
        <section className="catalog-panel">
          <div className="ticket-tabs" role="tablist" aria-label="Ticket categories">
            <button role="tab" aria-selected="true">ENTRANCE TICKETS</button>
            <button role="tab" aria-selected="false" type="button" onClick={() => navigate("/not-implemented")}>EXCURSIONS</button>
            <button role="tab" aria-selected="false" type="button" onClick={() => navigate("/not-implemented")}>LECTURES</button>
          </div>
          <form className="ticket-filters">
            <label><span className="sr-only">Search tickets</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="The name of the lecture, concert, tour..." /></label>
            <label><span className="sr-only">Select date</span><input placeholder="Select date" /></label>
            <div className="tag-row">
              {tags.map((tag) => <button type="button" key={tag}>{tag}</button>)}
            </div>
            <label className="availability-check">Show tickets available <input type="checkbox" checked={onlyAvailable} onChange={(event) => setOnlyAvailable(event.target.checked)} /></label>
          </form>
          <div className="ticket-card-grid">
            {filteredProducts.map((product) => (
              <article className="ticket-card" key={product.id}>
                <img src={product.image} alt="" />
                <div>
                  <h2>{product.title}{product.availableDates.length > 0 && <span aria-hidden="true"> ⓘ</span>}</h2>
                  <p>{product.description} <Link to="/not-implemented">More details</Link></p>
                  <p className="ticket-icon-line">□ {product.dateRange}</p>
                  <p className="ticket-icon-line">◇ {product.location}</p>
                  {product.availableDates.length > 0 ? <Link to="/ticket-shop/main-museum-complex">BUY</Link> : <Link to="/not-implemented">UNAVAILABLE</Link>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </TicketShopLayout>
  );
}
