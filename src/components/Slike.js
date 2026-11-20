import { Link } from 'react-router-dom';
import { slike } from '../data';

// Ako je link vanjski (http...), otvori običan <a>, inače Link unutar stranice
function KljucnaRijec({ link }) {
  if (!link) return null;
  const vanjski = /^https?:\/\//.test(link.to);
  return vanjski
    ? <a href={link.to} target="_blank" rel="noreferrer">{link.naziv}</a>
    : <Link to={link.to}>{link.naziv}</Link>;
}

function Slike() {
  return (
    <section className="container py-5">
      <h1 className="h2">Slike</h1>
      <p className="text-black mb-4">Slike i reference uz sadržaj stranice.</p>

      <div className="row g-3">
        {slike.map((s, i) => (
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <article className="card h-100 overflow-hidden">
              {s.src ? (
                <img src={s.src} alt={s.alt} className="card-img-top" />
              ) : (
                <div className="ratio ratio-16x9 bg-secondary-subtle text-secondary" aria-hidden="true">
                  <div className="d-flex align-items-center justify-content-center">slika</div>
                </div>
              )}
              <div className="card-body">
                <h2 className="card-title h6">{s.naslov}</h2>
                <p className="card-text small mb-0">
                  {s.opis} <KljucnaRijec link={s.link} />
                </p>
                {/* izvor slike: crn tekst, ista veličina kao izvor u blogu (14px) */}
                {s.izvor && <p className="text-black mb-0 mt-1" style={{ fontSize: "0.875rem" }}>{s.izvor}</p>}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Slike;
