import { Link, useNavigate } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import { galleryImage, tourCards } from "../data/virtualVisit";

export default function VirtualVisitPage() {
  const navigate = useNavigate();

  return (
    <InstitutionalLayout>
      <main className="virtual-page">
        <section className="page-hero compact" style={{ backgroundImage: `url(${galleryImage})` }}>
          <h1>Virtual visit</h1>
          <p>Explore the museum from anywhere in the world</p>
        </section>
        <section className="virtual-content">
          <Link className="back-link institutional" to="/">← Back</Link>
          <div className="section-heading">
            <div>
              <h1>All tours</h1>
              <p>Museum Complexes</p>
            </div>
            <div className="segmented-control" role="tablist" aria-label="Tour category">
              <button role="tab" aria-selected="true" type="button">Museum complexes</button>
              <button role="tab" aria-selected="false" type="button" onClick={() => navigate("/not-implemented")}>Exhibitions</button>
            </div>
          </div>
          <div className="tour-grid redesigned">
            {tourCards.map((card, index) => {
              const available = card === "THE MAIN MUSEUM COMPLEX";
              const tile = (
                <article className={`tour-card shade-${index % 5} ${available ? "" : "is-unavailable"}`} style={{ backgroundImage: `url(${galleryImage})` }}>
                  <h2>{card}</h2>
                  <small>{index + 3} PANORAMAS</small>
                  <span>{available ? "Explore →" : "Unavailable"}</span>
                </article>
              );
              return available ? (
                <Link to="/virtual-visit/main-museum-complex" key={card}>{tile}</Link>
              ) : (
                <Link to="/not-implemented" key={card}>{tile}</Link>
              );
            })}
          </div>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
