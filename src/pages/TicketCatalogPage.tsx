import { Link } from "react-router-dom";
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
  return (
    <TicketShopLayout>
      <main className="ticket-catalog-page">
        <section className="catalog-panel">
          <div className="ticket-tabs" role="tablist" aria-label="Ticket categories">
            <button role="tab" aria-selected="true">ENTRANCE TICKETS</button>
            <button role="tab" aria-selected="false" disabled>EXCURSIONS</button>
            <button role="tab" aria-selected="false" disabled>LECTURES</button>
          </div>
          <form className="ticket-filters">
            <label><span className="sr-only">Search tickets</span><input placeholder="The name of the lecture, concert, tour..." /></label>
            <label><span className="sr-only">Select date</span><input placeholder="Select date" /></label>
            <div className="tag-row">
              {tags.map((tag) => <button type="button" key={tag}>{tag}</button>)}
            </div>
            <label className="availability-check">Show tickets available <input type="checkbox" /></label>
          </form>
          <div className="ticket-card-grid">
            {ticketProducts.map((product, index) => (
              <article className="ticket-card" key={product.id}>
                <img src={product.image} alt="" />
                <div>
                  <h2>{product.title}{index === 0 && <span aria-hidden="true"> ⓘ</span>}</h2>
                  <p>{product.description} <a href="#details">More details</a></p>
                  <p className="ticket-icon-line">□ {product.dateRange}</p>
                  <p className="ticket-icon-line">◇ {product.location}</p>
                  {index === 0 ? <Link to="/ticket-shop/main-museum-complex">BUY</Link> : <a href="#buy">BUY</a>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </TicketShopLayout>
  );
}
