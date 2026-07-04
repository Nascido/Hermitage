import { useState } from "react";
import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import homePalace from "../assets/banners/home-palace.png";
import redGallery from "../assets/banners/red-gallery.png";
import facade from "../assets/banners/winter-palace-facade.png";
import mapImage from "../assets/maps/main-museum-floor-1.png";

const slides = [
  { title: "How to visit the Hermitage", subtitle: "Plan your route, tickets and online visit", image: homePalace },
  { title: "The Main Museum Complex", subtitle: "Virtual Visit", image: redGallery },
  { title: "Purchase online tickets", subtitle: "Entry from 700 RUB", image: facade },
];

const actionCards = [
  { title: "Explore collection", text: "Search 3 million works of art", to: "/search/artworks", action: "Explore" },
  { title: "Virtual visit", text: "Tour the museum online", to: "/virtual-visit", action: "Access" },
  { title: "What's on", text: "Exhibitions, events and news", to: "/search?q=events", action: "View agenda" },
] as const;

export default function HomePage() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const move = (direction: number) => setActive((active + direction + slides.length) % slides.length);

  return (
    <InstitutionalLayout>
      <main className="home-page">
        <section className="hero-slider" style={{ backgroundImage: `url(${slide.image})` }} aria-label="Featured content">
          <div className="slider-dots" aria-label="Slides">
            {slides.map((item, index) => (
              <button key={item.title} type="button" aria-label={`Show slide ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)} />
            ))}
          </div>
          <button className="slider-arrow left" type="button" aria-label="Previous slide" onClick={() => move(-1)}>‹</button>
          <button className="slider-arrow right" type="button" aria-label="Next slide" onClick={() => move(1)}>›</button>
          <div className="hero-title-band">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
          </div>
        </section>
        <section className="home-actions" aria-label="Primary actions">
          {actionCards.map((card, index) => (
            <article className="home-action-card" key={card.title}>
              <span className={`action-symbol symbol-${index + 1}`} aria-hidden="true" />
              <div>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </div>
              <Link to={card.to}>{card.action} →</Link>
            </article>
          ))}
        </section>
        <section className="visit-summary" aria-label="Visit summary">
          <article className="ticket-summary">
            <h2>Tickets</h2>
            <p>Buy online from 700 RUB</p>
            <Link to="/ticket-shop">Buy →</Link>
          </article>
          <article className="shop-summary">
            <h2>Shop</h2>
            <p>Museum store online</p>
            <a href="#shop">Access →</a>
          </article>
          <article className="route-summary">
            <div>
              <h2>Visit us</h2>
              <p>Open Tue-Sun · 10:30-18:00</p>
              <p>Closed Mon, 1 Jan and 9 May</p>
              <Link to="/tickets">How to get there →</Link>
            </div>
            <img src={mapImage} alt="Museum area map preview" />
          </article>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
