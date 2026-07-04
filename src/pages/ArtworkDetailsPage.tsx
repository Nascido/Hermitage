import { useState } from "react";
import { Link } from "react-router-dom";
import christImage from "../assets/artworks/christ-simon-pharisee.png";
import InstitutionalLayout from "../layouts/InstitutionalLayout";

const artwork = {
  title: "Christ in the House of Simon the Pharisee",
  author: "Maso di San Friano (Tommaso d'Antonio Manzuoli)",
  authorDates: "1531-1571",
  place: "Italy",
  date: "mid 1560s",
  technique: "Tempera on canvas",
  dimensions: "42 × 33 cm",
  collection: "Paintings",
  inventoryNumber: "ГЭ-1234",
  building: "The Great (Old) Hermitage",
  room: "Room 267",
  image: christImage,
};

export default function ArtworkDetailsPage() {
  const [expanded, setExpanded] = useState(false);
  const metadata = [
    ["Author", `${artwork.author} (${artwork.authorDates})`],
    ["Title", artwork.title],
    ["Place", artwork.place],
    ["Dating", artwork.date],
    ["Technique", artwork.technique],
    ["Dimensions", artwork.dimensions],
    ["Collection", artwork.collection],
    ["Museum number", artwork.inventoryNumber],
  ];

  return (
    <InstitutionalLayout>
      <main className="artwork-detail-page">
        <div className="artwork-back-row">
          <Link className="back-link institutional artwork-back" to="/search/artworks">← Back</Link>
        </div>
        <section className="artwork-viewer" aria-label="Artwork image viewer">
          <img src={artwork.image} alt={artwork.title} />
          <button type="button" aria-label="Full screen viewer" onClick={() => setExpanded(true)}>⤢</button>
        </section>
        <section className="artwork-title-area">
          <p>{artwork.author} ({artwork.authorDates})</p>
          <h1>{artwork.title}</h1>
        </section>
        <section className="artwork-meta-area">
          <div>
            <dl>
              {metadata.map(([label, value]) => value && (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside>
            <h2>Where to find it</h2>
            <dl>
              <div><dt>Building</dt><dd>{artwork.building}</dd></div>
              <div><dt>Room</dt><dd>{artwork.room}</dd></div>
            </dl>
          </aside>
        </section>
        {expanded && (
          <div className="viewer-modal" role="dialog" aria-modal="true" aria-label="Artwork expanded view">
            <button type="button" aria-label="Close expanded view" onClick={() => setExpanded(false)}>×</button>
            <img src={artwork.image} alt={artwork.title} />
          </div>
        )}
      </main>
    </InstitutionalLayout>
  );
}
