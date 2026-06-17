import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import banner from "../assets/banners/winter-palace-facade.png";
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
        <div className="search-banner" style={{ backgroundImage: `url(${banner})` }} />
        <section className="search-content">
          <h1>Search<span aria-hidden="true">?</span></h1>
          <form className="site-search-form" onSubmit={submit}>
            <label>
              <span className="sr-only">Search query</span>
              <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="e.g. Hercules Room" />
            </label>
            <button type="submit" aria-label="Search"><span className="magnifier" aria-hidden="true" /></button>
            <p>or use <Link to="/search/artworks">Search works of art</Link></p>
          </form>
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
