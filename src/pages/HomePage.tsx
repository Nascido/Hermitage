import { useState } from "react";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import homePalace from "../assets/banners/home-palace.png";
import redGallery from "../assets/banners/red-gallery.png";

const slides = [
  { title: "Web-camera of the State Hermitage Museum", subtitle: "Online", image: homePalace },
  { title: "The Main Museum Complex", subtitle: "Virtual visit", image: redGallery },
  { title: "Purchase of Online Tickets", subtitle: "Tickets", image: homePalace },
];

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
        <section className="home-cards" aria-label="Museum highlights">
          <article className="visit-card">
            <h2>VISIT US</h2>
            <p>ALL THE HERMITAGE'S DISPLAY FACILITIES ARE OPEN TO VISITORS</p>
            <p>THE MUSEUM IS CLOSED ON MONDAYS, AS WELL AS 1 JANUARY AND 9 MAY</p>
          </article>
          <article className="whats-on-card" style={{ backgroundImage: `url(${redGallery})` }}>
            <h2>WHAT'S ON<br />AT THE<br />HERMITAGE</h2>
            <p>EXHIBITIONS, EVENTS AND NEWS</p>
          </article>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
