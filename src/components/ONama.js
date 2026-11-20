import { Link } from 'react-router-dom';
import { oNama, kontakt } from '../data';

function ONama() {
  return (
    <section className="container py-5">
      <h1 className="h2 mb-3">O nama</h1>
      <p className="text-black mb-4">{oNama.uvod}</p>

      <div className="row g-3 mb-4">
        {oNama.vrijednosti.map(v => (
          <div key={v.naslov} className="col-12 col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title h6">{v.naslov}</h2>
                <p className="card-text small text-secondary mb-0">{v.opis}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="h5">Kontakt</h2>
      <address className="text-black">
        {kontakt.adresa}<br />
        Tel: <a href={`tel:${kontakt.tel.replace(/\s/g, '')}`}>{kontakt.tel}</a><br />
        E-pošta: <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>
      </address>
      <Link to="/postupak" className="btn btn-outline-success">Pogledajte postupak</Link>
    </section>
  );
}

export default ONama;
