import { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useImePrijavljenog, odjavi } from '../korisnici';
import { linkovi, kontakt } from '../data';
import { Telephone, Phone, Envelope } from 'react-bootstrap-icons';
import Logo from './Logo';
import NavStavka from './NavStavka';
// import Carousel from './Carousel'; // odkomentiraj za povratak carousela

function Header() {
  const ime = useImePrijavljenog();
  const prijavljen = ime !== null;
  const navigate = useNavigate();
  const [otvoren, setOtvoren] = useState(false); // hamburger izbornik (samo na mobitelu)
  const zatvori = () => setOtvoren(false);
  const redRef = useRef(null);
  const mjeraRef = useRef(null);
  const [nacin, setNacin] = useState("red"); // "red" | "ispod" | "hamburger"

  // odabir načina prikaza prema stvarnoj širini: sve u jednom redu, izbornik ispod loga ili hamburger
  useLayoutEffect(() => {
    const izracunaj = () => {
      const red = redRef.current, mjera = mjeraRef.current;
      if (!red || !mjera) return;
      const spremnik = red.parentElement, st = getComputedStyle(spremnik);
      const sirina = spremnik.clientWidth - parseFloat(st.paddingLeft) - parseFloat(st.paddingRight); // bez bočnih margina
      const izb = mjera.scrollWidth;
      const logo = 320, razmak = 16; // logo je najviše 20rem
      setNacin(sirina >= logo + razmak + izb ? "red" : sirina >= izb ? "ispod" : "hamburger");
    };
    izracunaj();
    const ro = new ResizeObserver(izracunaj);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [ime]);
  // kad je korisnik prijavljen, nestaju kartice Login i Novi korisnik, a pojavljuje se Logout
  const prikazani = prijavljen ? linkovi.filter(l => l.to !== "/login" && l.to !== "/novi-korisnik") : linkovi;
  const stavke = zatvoriFn => (
    <>
      {prikazani.map(l => (
        <NavStavka key={l.to} l={l} onClick={zatvoriFn} />
      ))}
      {prijavljen && (
        <button type="button" className="nav-link nav-logout" onClick={() => { odjavi(); zatvoriFn(); navigate("/"); }}>
          <span style={{ fontSize: ".8em" }}>Dobrodošao, {ime}.</span> Odjava
        </button>
      )}
    </>
  );
  return (
    <header>
      <nav className="navbar" aria-label="Glavni izbornik">
        {/* prvi red: telefoni i e-mail jedno do drugog, u sredini */}
        <address className="header-kontakt text-black">
          <span><Telephone aria-hidden="true" className="me-2" />tel: {kontakt.tel}</span>
          <span><Phone aria-hidden="true" className="me-2" />mob: {kontakt.mob}</span>
          <span><Envelope aria-hidden="true" className="me-2" /><a href={`mailto:${kontakt.email}`} className="text-black">{kontakt.email}</a></span>
        </address>
        <div className="container pt-3">
          {/* logo + izbornik: red -> izbornik ispod loga -> hamburger, ovisno o raspoloživoj širini */}
          <div ref={redRef} className={"header-red header-" + nacin}>
            <Link to="/" className="header-logo podnozje-slika logo-okvir" aria-label="GeoPiket – početna stranica">
              <Logo />
            </Link>
            {nacin === "hamburger" && (
              <button
                type="button" className="navbar-toggler ms-auto"
                aria-controls="izbornik" aria-expanded={otvoren}
                aria-label={otvoren ? "Zatvori izbornik" : "Otvori izbornik"}
                onClick={() => setOtvoren(o => !o)}
              >
                <span className="navbar-toggler-icon" aria-hidden="true"></span>
              </button>
            )}
            {(nacin !== "hamburger" || otvoren) && (
              <div id="izbornik" className="nav izbornik">
                {stavke(zatvori)}
              </div>
            )}
          </div>
          {/* nevidljiva kopija izbornika u jednom redu: služi samo za mjerenje potrebne širine */}
          <div ref={mjeraRef} className="nav izbornik izbornik-mjera" aria-hidden="true">
            {prikazani.map(l => <span key={l.to} className="nav-link">{l.naziv}</span>)}
            {prijavljen && <span className="nav-link nav-logout"><span style={{ fontSize: ".8em" }}>Dobrodošao, {ime}.</span> Odjava</span>}
          </div>
        </div>
      </nav>

      {/* CAROUSEL JE PRIVREMENO UKLONJEN. Za vraćanje: odkomentiraj import na vrhu datoteke
          i ovaj blok (ukloni oznake komentara oko njega).
      <div className="carousel-pojas">
        <div className="container carousel-zona">
          <Carousel />
        </div>
      </div>
      */}
    </header>
  );
}

export default Header;
