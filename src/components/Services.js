import { useState, useRef, useEffect, useId } from 'react';
import { usluge } from '../data';

// Padajući izbornik "Odaberi posao" + detalji odabranog posla.
// Koristi se i u kartici ispod i u kartici u carouselu.
function PoslovniIzbornik({ usluga }) {
  const [otvoreno, setOtvoreno] = useState(false);
  const [odabrana, setOdabrana] = useState(null); // indeks odabrane opcije

  const korijen = useRef(null);
  const gumbRef = useRef(null);
  const panelId = useId();

  const zatvori = () => {
    setOtvoreno(false);
    setOdabrana(null);
  };

  const prebaci = () => (otvoreno ? zatvori() : setOtvoreno(true));

  // Dok je izbornik otvoren: klik/dodir izvan njega, scrollanje stranice ili tipka Esc ga zatvara
  useEffect(() => {
    if (!otvoreno) return;
    const izvan = (e) => {
      if (korijen.current && !korijen.current.contains(e.target)) zatvori();
    };
    const tipka = (e) => {
      if (e.key === "Escape") {
        zatvori();
        gumbRef.current?.focus(); // vrati fokus na gumb (važno za tipkovnicu i čitače zaslona)
      }
    };
    document.addEventListener("pointerdown", izvan);
    document.addEventListener("keydown", tipka);
    window.addEventListener("scroll", zatvori, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", izvan);
      document.removeEventListener("keydown", tipka);
      window.removeEventListener("scroll", zatvori);
    };
  }, [otvoreno]);

  const detalj = odabrana !== null ? usluga.opcije[odabrana] : null;

  // Izbornik i detalji su u "plutajućem" panelu (position: absolute),
  // pa se kartica ne produljuje, nego se panel prikaže iznad nižih kartica.
  return (
    <div className="position-relative" ref={korijen}>
      <button
        ref={gumbRef}
        className="btn btn-outline-success w-100 d-flex justify-content-between"
        aria-expanded={otvoreno}
        aria-controls={panelId}
        onClick={prebaci}
      >
        <span>Vrste poslova<span className="visually-hidden">: {usluga.naslov}</span></span>
        <span aria-hidden="true">{otvoreno ? "–" : "+"}</span>
      </button>

      {otvoreno && (
        <div className="izbornik-panel" id={panelId}>
          <div className="list-group list-group-flush">
            {usluga.opcije.map(([naziv], i) => (
              <button
                key={naziv}
                className={"list-group-item list-group-item-action" + (odabrana === i ? " fw-bold" : "")}
                aria-pressed={odabrana === i}
                onClick={() => setOdabrana(i)}
              >
                {naziv}
              </button>
            ))}
          </div>

          {/* aria-live: čitač zaslona izgovori detalje kad se odabere posao */}
          <div aria-live="polite">
            {detalj && (
              <div className="alert alert-success m-2">
                <h3 className="h6">{detalj[0]}</h3>
                <p className="mb-2">{detalj[1]}</p>
                <h4 className="h6">Što je potrebno</h4>
                <ul className="mb-0">
                  {detalj[2].split("; ").map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ usluga }) {
  return (
    // bez overflow-hidden, da panel izbornika ne bude odrezan rubom kartice
    <article className="card h-100">
      {/* h-100: red (a time i slika s izvorom) se rasteže do dna kartice, i kad je susjedna kartica viša */}
      <div className="row g-0 h-100">
        {/* mjesto za sliku: 2/12. Ako usluga ima "slika" u data.js, prikaže se ona (s izvorom ispod) */}
        {usluga.slika ? (
          <div className="col-12 col-sm-4 slika-kartice bg-white d-flex flex-column">
            <div className="position-relative flex-grow-1" style={{ minHeight: 160 }}>
              <img
                src={usluga.slika} alt={usluga.slikaAlt || ""}
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            {usluga.izvor && (
              <p className="text-black text-start mb-0 p-1" style={{ fontSize: "0.875rem" }}>{usluga.izvor}</p>
            )}
          </div>
        ) : (
          <div className="col-12 col-sm-4 slika-kartice bg-white text-secondary d-flex align-items-center justify-content-center py-5" aria-hidden="true">
            slika
          </div>
        )}
        <div className="col-12 col-sm-8 card-body">
          <h2 className="card-title h5">{usluga.naslov}</h2>
          <p className="card-text text-secondary">{usluga.opis}</p>
          <PoslovniIzbornik usluga={usluga} />
        </div>
      </div>
    </article>
  );
}

const U_POPISU = usluge;             // kartice ispod carousela


function Services() {
  return (
    <section className="container py-5">
      <h2 className="h2 mb-4">Primjeri poslova u geodeziji</h2>
      {/* 2 kartice po retku na velikim ekranima, 1 na manjim */}
      <div className="row g-3">
        {U_POPISU.map(u => (
          <div key={u.naslov} className="col-12 col-lg-6">
            <ServiceCard usluga={u} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
