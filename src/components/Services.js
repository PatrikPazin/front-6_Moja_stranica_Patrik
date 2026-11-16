import { useState, useRef, useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { usluge, carouselKartice } from '../data';

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
        <span>Odaberi posao<span className="visually-hidden">: {usluga.naslov}</span></span>
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
    <article className="card mb-3">
      <div className="row g-0">
        {/* mjesto za sliku: 2/12 */}
        <div className="col-12 col-md-2 slika-kartice bg-secondary-subtle text-secondary d-flex align-items-center justify-content-center py-5" aria-hidden="true">
          slika
        </div>
        <div className="col-12 col-md-10 card-body">
          <h2 className="card-title h5">{usluga.naslov}</h2>
          <p className="card-text text-secondary">{usluga.opis}</p>
          <PoslovniIzbornik usluga={usluga} />
        </div>
      </div>
    </article>
  );
}

const PO_SLIDEU = 1; // broj kartica koje se vide odjednom u carouselu (1, 2, 3, 4 ili 6)
const U_CAROUSELU = carouselKartice; // vlastiti sadržaj carousela (data.js)
const U_POPISU = usluge;             // kartice ispod carousela

// [1,2,3,4,5,6,7,8] -> [[1,2,3,4],[5,6,7,8]]
function grupiraj(niz, velicina) {
  const grupe = [];
  for (let i = 0; i < niz.length; i += velicina) grupe.push(niz.slice(i, i + velicina));
  return grupe;
}

const RUB_SIRINA = 80;     // širina "vruće zone" uz lijevi/desni rub (px)
const RUB_INTERVAL = 2400; // koliko često se okreće dok je miš u zoni (ms); mora biti dulje od prijelaza (1,2 s)
const AUTO_INTERVAL = 10000; // automatska vrtnja: ms između slajdova

function ServicesCarousel() {
  const slideovi = grupiraj(U_CAROUSELU, PO_SLIDEU);
  const carouselRef = useRef(null);
  const timerRef = useRef(null);

  // Automatska vrtnja: korisnik je može pauzirati (WCAG 2.2.2), a ako u sustavu
  // ima uključeno "smanji pokrete" (prefers-reduced-motion), ne kreće sama.
  const [vrti, setVrti] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const vrtiRef = useRef(vrti);
  vrtiRef.current = vrti;

  // Vrtnju upravljamo sami (bez data-bs-ride), da pauza ostane pauza i nakon prelaska miša
  const instanca = () =>
    bootstrap.Carousel.getOrCreateInstance(carouselRef.current, {
      ride: false, pause: false, interval: AUTO_INTERVAL,
    });

  useEffect(() => {
    const c = instanca();
    if (vrti) c.cycle(); else c.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vrti]);

  // Dok je miš ili fokus na carouselu, vrtnja miruje; kad ode, nastavlja se (ako nije pauzirana)
  const pauzirajPrivremeno = () => instanca().pause();
  const nastavi = () => { if (vrtiRef.current) instanca().cycle(); };

  const zaustavi = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // miš ušao u rubnu zonu: okreni odmah, pa ponavljaj dok je miš tamo
  const pokreni = (smjer) => {
    const c = instanca();
    c.pause();
    const korak = () => (smjer === "next" ? c.next() : c.prev());
    korak();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(korak, RUB_INTERVAL);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const zona = (smjer, strana, znak) => (
    <div
      className={`rub-zona position-absolute top-0 bottom-0 ${strana}-0 d-flex align-items-center justify-content-center fs-1 text-success opacity-25`}
      style={{ width: RUB_SIRINA, zIndex: 2, cursor: "pointer" }}
      // samo miš: na dodirnim ekranima zone ne rade (i skrivene su u CSS-u)
      onPointerEnter={(e) => e.pointerType === "mouse" && pokreni(smjer)}
      onPointerLeave={(e) => e.pointerType === "mouse" && zaustavi()}
      aria-hidden="true"
    >
      {znak}
    </div>
  );

  return (
    <div className="row justify-content-center mb-5">
    <div className="col-12 col-lg-6">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Izdvojene usluge</h2>
        <div className="btn-group">
          <button className="btn btn-outline-success" type="button"
            aria-label={vrti ? "Pauziraj automatsku vrtnju" : "Pokreni automatsku vrtnju"}
            aria-pressed={!vrti}
            onClick={() => setVrti(!vrti)}>
            <i className={`fa-solid ${vrti ? "fa-pause" : "fa-play"}`} aria-hidden="true"></i>
          </button>
          <button className="btn btn-outline-success" type="button" aria-controls="usluge-carousel"
            data-bs-target="#usluge-carousel" data-bs-slide="prev" aria-label="Prethodna usluga">
            <span aria-hidden="true">‹</span>
          </button>
          <button className="btn btn-outline-success" type="button" aria-controls="usluge-carousel"
            data-bs-target="#usluge-carousel" data-bs-slide="next" aria-label="Sljedeća usluga">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <div
        className="position-relative"
        onMouseEnter={pauzirajPrivremeno}
        onMouseLeave={nastavi}
        onFocus={pauzirajPrivremeno}
        onBlur={nastavi}
      >
      {zona("prev", "start", "‹")}
      {zona("next", "end", "›")}
      <div
        id="usluge-carousel" ref={carouselRef} className="carousel slide"
        data-bs-interval={AUTO_INTERVAL} data-bs-pause="false"
        aria-roledescription="carousel" aria-label="Izdvojene usluge"
      >
        <div className="carousel-inner" aria-live={vrti ? "off" : "polite"}>
          {slideovi.map((grupa, i) => (
            <div
              key={i} className={"carousel-item" + (i === 0 ? " active" : "")}
              role="group" aria-roledescription="slide" aria-label={`${i + 1} od ${slideovi.length}`}
            >
              <div className="row g-3">
                {grupa.map(u => (
                  <div key={u.naslov} className={PO_SLIDEU === 1 ? "col-12" : `col-12 col-md-6 col-lg-${12 / PO_SLIDEU}`}>
                    {/* tekst umjesto slike; klik vodi na stranicu s detaljima */}
                    <Link to={u.to} className="carousel-link rounded h4 mb-0">
                      <span className="carousel-tekst">{u.naslov}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}

function Services() {
  return (
    <section className="container py-5">
      <h1 className="h2 mb-4">Usluge</h1>
      <ServicesCarousel />
      {U_POPISU.map(u => <ServiceCard key={u.naslov} usluga={u} />)}
    </section>
  );
}

export default Services;
