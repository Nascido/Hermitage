import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";

const routes = [
  ["/", "Home"],
  ["/virtual-visit", "Tours"],
  ["/virtual-visit/main-museum-complex", "Main Museum Complex map"],
  ["/search?q=ch", "Website search"],
  ["/search/artworks", "Artwork search"],
  ["/artworks/portrait-of-burchard-richter", "Artwork details"],
  ["/tickets", "Purchase of Online Tickets"],
  ["/ticket-shop", "Ticket catalog"],
  ["/ticket-shop/main-museum-complex", "Date and time"],
  ["/ticket-shop/main-museum-complex/quantity", "Quantities"],
  ["/ticket-shop/checkout", "Checkout"],
];

export default function ReviewPage() {
  return (
    <InstitutionalLayout>
      <main className="review-page">
        <h1>Hermitage review routes</h1>
        <ul>
          {routes.map(([href, label]) => <li key={href}><Link to={href}>{label}</Link><code>{href}</code></li>)}
        </ul>
      </main>
    </InstitutionalLayout>
  );
}
