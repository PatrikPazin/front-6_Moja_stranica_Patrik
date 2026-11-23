import { Link } from 'react-router-dom';
import { koraci } from '../data';

function Process() {
  return (
    <section className="container py-5">
      <h2 className="h2 mb-4">Postupak</h2>

      {/* kartice široke 4 kolone (od 992 px), u sredini; lijevo od njih strelica prema dolje s rednim brojevima */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-4">
          <ol className="list-unstyled mb-0">
            {koraci.map((k, i) => (
              <li
                key={k.naslov}
                className={"korak position-relative" + (i === koraci.length - 1 ? " korak-zadnji" : "")}
              >
                {/* strelica: crta kroz sve korake, broj uz svaku karticu, vrh strelice na kraju */}
                <div className="korak-traka" aria-hidden="true">
                  <span className="korak-broj">{i + 1}</span>
                </div>

                <div className="card">
                  <div className="card-body">
                    {/* naslov je poveznica ako korak ima "to"; na hover svijetlocrvena pozadina */}
                    <h2 className="h6 mb-2">
                      {k.to
                        ? <Link to={k.to} className="card-title naslov-link d-inline-block mb-0">{k.naslov}</Link>
                        : <span className="card-title d-inline-block mb-0">{k.naslov}</span>}
                    </h2>
                    <p className="card-text small text-secondary mb-0">{k.opis}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Process;
