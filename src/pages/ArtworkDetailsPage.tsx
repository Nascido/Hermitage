import InstitutionalFooter from "../components/institutional/InstitutionalFooter";
import { artworks } from "../data/artworks";
import InstitutionalLayout from "../layouts/InstitutionalLayout";

const artwork = artworks[0];

export default function ArtworkDetailsPage() {
  const metadata = [
    ["Author", `${artwork.author} (${artwork.authorDates})`],
    ["Title", artwork.title],
    ["Place", artwork.place],
    ["Dating", artwork.date],
    ["Technique", artwork.technique],
    ["Dimensions", artwork.dimensions],
    ["Museum number", artwork.inventoryNumber],
    ["Acquisition details", artwork.acquisition],
    ["Category", artwork.category],
    ["Collection", artwork.collection],
    ["Subcollection", artwork.subcollection],
  ];

  return (
    <InstitutionalLayout footer={<InstitutionalFooter />}>
      <main className="artwork-detail-page">
        <section className="artwork-viewer" aria-label="Artwork image viewer">
          <img src={artwork.image} alt={artwork.title} />
          <button type="button" aria-label="Full screen viewer">⤢</button>
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
      </main>
    </InstitutionalLayout>
  );
}
