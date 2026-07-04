import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
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
        <section className="search-content artwork-search">
          <h1>Search works of art</h1>
          <form className="site-search-form" onSubmit={submit}>
            <label><span className="sr-only">Search works of art</span><input placeholder="e.g. Hercules Room" /></label>
            <button type="submit">Search</button>
          </form>
          <p className="search-switch">or use <Link to="/search?q=ch">Website search</Link> para busca geral</p>
        </section>
        <section className="artwork-search-grid">
          <form className="advanced-form" onSubmit={submit}>
            <Link className="back-link institutional" to="/search">← Back</Link>
            <h2>Advanced Search</h2>
            {fields.map(([label, placeholder]) => (
              <label key={label}>
                <span>{label}</span>
                <input value={values[label] ?? ""} onChange={(event) => update(label, event.target.value)} placeholder={placeholder} />
              </label>
            ))}
            <div className="button-row">
              <button type="submit">Search</button>
              <button type="button" onClick={clear}>Clear</button>
            </div>
          </form>
          <div className="artwork-results-list">
            <p className="results-count">2 of 2 results{searched && values.Title ? ` for "${values.Title}"` : ""}</p>
            {results.slice(0, 2).map((artwork, index) => (
              <article className="artwork-list-result" key={artwork.id}>
                <img src={artwork.thumbnail} alt={artwork.title} />
                <div>
                  <h2>{index === 0 ? "Praying Madonna" : artwork.title}</h2>
                  <p>{artwork.author || "Leonardo da Vinci"} · {artwork.country || "Italy"} · {artwork.date || "15th c."}</p>
                  <Link to="/artworks/portrait-of-burchard-richter">Ver obra →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
