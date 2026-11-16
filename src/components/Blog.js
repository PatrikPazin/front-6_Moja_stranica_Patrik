import { useState } from 'react';
import { clanci } from '../data';

// "2026-10-28" -> "28. listopada 2026."
function formatirajDatum(iso) {
  return new Date(iso + "T00:00").toLocaleDateString("hr-HR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function Post({ clanak }) {
  const [otvoreno, setOtvoreno] = useState(false);

  return (
    <article className="card mb-3 overflow-hidden">
      <div className="row g-0">
        {/* mjesto za sliku: 2/12 */}
        <div className="col-12 col-md-2 bg-secondary-subtle text-secondary d-flex align-items-center justify-content-center py-5" aria-hidden="true">
          slika
        </div>
        <div className="col-12 col-md-10 card-body">
          <time dateTime={clanak.datum} className="small text-secondary">
            {formatirajDatum(clanak.datum)}
          </time>
          <h2 className="card-title h5">{clanak.naslov}</h2>
          <p className="card-text text-secondary">{clanak.sazetak}</p>

          <button
            className="btn btn-outline-success w-100 d-flex justify-content-between"
            aria-expanded={otvoreno}
            onClick={() => setOtvoreno(!otvoreno)}
          >
            <span>Pročitaj cijeli članak</span>
            <span>{otvoreno ? "–" : "+"}</span>
          </button>

          {otvoreno && (
            <div className="mt-3">
              {clanak.tekst.map((o, i) => <p key={i} className="mb-2">{o}</p>)}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Blog() {
  return (
    <section className="container py-5">
      <h1 className="h2">Blog</h1>
      <p className="text-secondary mb-4">Savjeti i objašnjenja geodetskih postupaka.</p>
      {clanci.map((c, i) => <Post key={i} clanak={c} />)}
    </section>
  );
}

export default Blog;
