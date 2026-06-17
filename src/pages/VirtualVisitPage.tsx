import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import { galleryImage, tourCards } from "../data/virtualVisit";

export default function VirtualVisitPage() {
  return (
    <InstitutionalLayout>
      <main className="virtual-page">
        <div className="wide-banner" style={{ backgroundImage: `url(${galleryImage})` }}>
          <span>VIRTUAL VISIT</span>
        </div>
        <section className="virtual-content">
          <h1>All tours</h1>
          <p>Museum Complexes</p>
          <div className="tour-grid">
            {tourCards.map((card, index) => {
              const tile = (
                <article className={`tour-card shade-${index % 5}`} style={{ backgroundImage: `url(${galleryImage})` }}>
                  <h2>{card}</h2>
                  <small>{index + 3} PANORAMAS</small>
                </article>
              );
              return card === "THE MAIN MUSEUM COMPLEX" ? (
                <Link to="/virtual-visit/main-museum-complex" key={card}>{tile}</Link>
              ) : (
                <a href="#tour" key={card}>{tile}</a>
              );
            })}
          </div>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
