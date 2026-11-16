import { koraci } from '../data';

function Process() {
  return (
    <section className="container py-5">
      <h1 className="h2 mb-4">Postupak</h1>
      <div className="row g-3">
        {koraci.map(k => (
          // 6 kolumni u redu na velikom ekranu (2/12), 3 na srednjem, 2 na malom
          <div key={k.naslov} className="col-6 col-md-4 col-lg-2">
            <div className="card h-100 overflow-hidden">
              <div className="ratio ratio-16x9 bg-secondary-subtle text-secondary" aria-hidden="true">
                <div className="d-flex align-items-center justify-content-center">slika</div>
              </div>
              <div className="card-body">
                <h2 className="card-title h6">{k.naslov}</h2>
                <p className="card-text small text-secondary mb-0">{k.opis}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
