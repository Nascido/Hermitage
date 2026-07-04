import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import catThumb from "../assets/artworks/cat-thumb.png";
import { artworks, searchCategories } from "../data/artworks";

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") ?? "ch";
  const [term, setTerm] = useState(q);
  const results = useMemo(() => artworks.slice(0, 2), []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <InstitutionalLayout>
      <main className="search-page">
        <section className="search-content">
          <h1>Search in the website</h1>
          <form className="site-search-form" onSubmit={submit}>
            <label>
              <span className="sr-only">Search query</span>
              <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="e.g. Hercules Room" />
            </label>
            <button type="submit">Search</button>
          </form>
          <p className="search-switch">or use <Link to="/search/artworks">Website works of art</Link> para busca avançada do acervo</p>
        </section>
        <section className="site-results-panel">
          <Link className="back-link institutional" to="/">← Back</Link>
          <article className="feature-result">
            <div>
              <p>Published on 15 June 2026</p>
              <h2>Hermitage Cat Day: Now Featured on the Museum Website</h2>
              <p>The State Hermitage Museum has launched a virtual tour of the exhibitions dedicated to the Day of the Hermitage Cat, one of the most cherished spring celebrations among residents and visitors of the Northern Capital.</p>
              <Link to="/virtual-visit">Open virtual tour →</Link>
            </div>
            <img src={catThumb} alt="Hermitage Cat Day preview" />
          </article>
          <p className="results-count">1 - 10 of 40 results for «{q}»</p>
          <div className="category-chips" aria-label="Result categories">
            {searchCategories.map(([label, count]) => <button type="button" key={label}>{label} <strong>{count}</strong></button>)}
          </div>
          <div className="result-grid">
            {results.map((artwork, index) => (
              <article className="search-result" key={artwork.id}>
                <Link to={index === 0 ? "/artworks/portrait-of-burchard-richter" : "#"}>
                  <img src={artwork.thumbnail} alt={artwork.title} />
                </Link>
                <div>
                  <h2>{artwork.title}</h2>
                  <dl>
                    <dt>Author</dt><dd>{artwork.author}{artwork.authorDates ? <><br />({artwork.authorDates})</> : null}</dd>
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
