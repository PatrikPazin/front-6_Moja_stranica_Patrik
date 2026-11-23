import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { carouselKartice } from '../data';

// Carousel "Izdvojene usluge" (nalazi se u headeru, umjesto prijašnje slike)

const PO_SLIDEU = 1; // broj kartica koje se vide odjednom u carouselu (1, 2, 3, 4 ili 6)
const U_CAROUSELU = carouselKartice; // vlastiti sadržaj carousela (data.js)

// [1,2,3,4,5,6,7,8] -> [[1,2,3,4],[5,6,7,8]]
function grupiraj(niz, velicina) {
  const grupe = [];
  for (let i = 0; i < niz.length; i += velicina) grupe.push(niz.slice(i, i + velicina));
  return grupe;
}

const RUB_SIRINA = "3.75%"; // širina strelica uz lijevi/desni rub carousela
const AUTO_INTERVAL = 10000; // automatska vrtnja: ms između slajdova

function Carousel() {
  const slideovi = grupiraj(U_CAROUSELU, PO_SLIDEU);
  const carouselRef = useRef(null);

  // Automatska vrtnja; ako u sustavu ima uključeno "smanji pokrete"
  // (prefers-reduced-motion), ne kreće sama.
  const [vrti] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const vrtiRef = useRef(vrti);
  vrtiRef.current = vrti;

  // Vrtnju upravljamo sami (bez data-bs-ride)
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

  // Široka strelica uz rub carousela: klik prelazi na prethodni/sljedeći slajd.
  // Na dodirnim ekranima je skrivena (u CSS-u), tamo radi povlačenje prstom.
  const zona = (smjer, strana, znak, naziv) => (
    <button
      type="button"
      className={`rub-zona position-absolute top-0 bottom-0 ${strana}-0 d-flex align-items-center justify-content-center fs-1`}
      style={{ width: RUB_SIRINA, zIndex: 2 }}
      data-bs-target="#usluge-carousel" data-bs-slide={smjer}
      aria-controls="usluge-carousel" aria-label={naziv}
    >
      <span aria-hidden="true">{znak}</span>
    </button>
  );

  return (
    <div className="row justify-content-center carousel-omot">
    <div className="col-12 col-lg-8">
      <div
        className="position-relative"
        onMouseEnter={pauzirajPrivremeno}
        onMouseLeave={nastavi}
        onFocus={pauzirajPrivremeno}
        onBlur={nastavi}
      >
      {zona("prev", "start", "‹", "Prethodna usluga")}
      {zona("next", "end", "›", "Sljedeća usluga")}
      {/* Nevidljivi "mjerač": svi tekstovi jedan na drugom, pa je visina = visina najvišeg teksta.
          Pravi carousel leži preko njega i ima istu visinu na svim slajdovima. */}
      <div className="carousel-mjerilo" aria-hidden="true">
        {U_CAROUSELU.map(u => (
          <div key={u.naslov} className="carousel-link rounded h4 mb-0">
            <span className="carousel-tekst">{u.naslov}</span>
          </div>
        ))}
      </div>
      <div
        id="usluge-carousel" ref={carouselRef} className="carousel slide position-absolute top-0 start-0 w-100 h-100"
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

export default Carousel;
