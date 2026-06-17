import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import banner from "../assets/banners/winter-palace-facade.png";
import { artworks } from "../data/artworks";

const fields = [
  ["Title", "e.g. Madonna and the Child"],
  ["Technique", "e.g. casting, engraving"],
  ["Author", "e.g. Titian"],
  ["Material, technique", "e.g. marble"],
  ["Historical period", "e.g. Great Mogul Dynasty"],
  ["School", "e.g. Barbizon"],
  ["Country, State or Region of Origin", "e.g. Eastern Mediterranean"],
  ["Inventory Number", "e.g. JRX-1013"],
];

export default function ArtworkSearchPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [searched, setSearched] = useState(false);
  const results = useMemo(() => artworks.slice(2), []);
  const update = (field: string, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const clear = () => setValues({});
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSearched(true);
  };

  return (
    <InstitutionalLayout>
      <main className="search-page">
        <div className="search-banner" style={{ backgroundImage: `url(${banner})` }} />
        <section className="search-content artwork-search">
          <h1>Search works of art</h1>
          <form className="site-search-form" onSubmit={submit}>
            <label><span className="sr-only">Search works of art</span><input placeholder="e.g. Hercules Room" /></label>
            <button type="submit" aria-label="Search"><span className="magnifier" aria-hidden="true" /></button>
            <p>or use <Link to="/search?q=ch">Website search</Link></p>
          </form>
          <form className="advanced-form" onSubmit={submit}>
            <h2>Fields for searching works of art only</h2>
            {fields.map(([label, placeholder]) => (
              <label key={label}>
                <span>{label}</span>
                <input value={values[label] ?? ""} onChange={(event) => update(label, event.target.value)} placeholder={placeholder} />
              </label>
            ))}
            <div className="button-row">
              <button type="submit">SEARCH</button>
              <button type="button" onClick={clear}>CLEAR</button>
            </div>
          </form>
          <p className="results-count">1 - 10 of 178557 results for «{searched ? values.Title ?? "" : ""}»</p>
          <div className="result-grid compact">
            {results.map((artwork) => (
              <article className="search-result" key={artwork.id}>
                <img src={artwork.thumbnail} alt={artwork.title} />
                <div>
                  <h2>{artwork.title}</h2>
                  <dl>
                    {artwork.author && <><dt>Author</dt><dd>{artwork.author} {artwork.authorDates ? `(${artwork.authorDates})` : ""}</dd></>}
                    <dt>Country</dt><dd>{artwork.country}</dd>
                    <dt>Create Date</dt><dd>{artwork.date}</dd>
                    <dt>Collection</dt><dd>{artwork.collection}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
