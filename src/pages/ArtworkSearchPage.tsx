import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import { artworks } from "../data/artworks";

const fields = [
  ["Author", "e.g. Titian"],
  ["Technique", "e.g. casting, engraving"],
  ["Historical period", "e.g. Great Mogul Dynasty"],
  ["Country or Region of Origin", "e.g. Eastern Mediterranean"],
  ["Inventory Number", "e.g. JRX-1013"],
];

const resultItems = [
  {
    title: "Christ in the House of Simon the Pharisee",
    meta: "Maso di San Friano · Italy, Florence · 1560s",
    image: artworks[1].thumbnail,
  },
  {
    title: "Portrait of Empress Maria Feodorovna",
    meta: "Vigée-Le Brun, Marie-Louise-Elisabeth · Italy · 15th c.",
    image: artworks[0].thumbnail,
  },
  {
    title: "Peasant Woman with a Cat",
    meta: "Ryckaert, David III (1612-1661)",
    image: artworks[4].thumbnail,
  },
  {
    title: "Praying Madonna",
    meta: "Sassoferrato · Great Britain · 1690s",
    image: artworks[2].thumbnail,
  },
];

export default function ArtworkSearchPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [searched, setSearched] = useState(false);
  const update = (field: string, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const clear = () => {
    setValues({});
    setSearched(false);
  };
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
            <label>
              <span>Title</span>
              <input value={values.Title ?? ""} onChange={(event) => update("Title", event.target.value)} placeholder="e.g. Madonna and the Child" />
            </label>
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
          {searched && (
            <div className="artwork-results-list">
              <p className="results-count">4 of 17.329 results</p>
              {resultItems.map((artwork) => (
                <article className="artwork-list-result" key={artwork.title}>
                  <img src={artwork.image} alt={artwork.title} />
                  <div>
                    <h2>{artwork.title}</h2>
                    <p>{artwork.meta}</p>
                    <Link to="/artworks/portrait-of-burchard-richter">See details →</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </InstitutionalLayout>
  );
}
