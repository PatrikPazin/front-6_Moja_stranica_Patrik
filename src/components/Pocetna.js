import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { postaviAktivnu } from '../sekcije';
import { linkovi } from '../data';
import NavStavka from './NavStavka';
import Services from './Services';
import Process from './Process';
import Blog from './Blog';
import ONama from './ONama';
import Kontakt from './Kontakt';

// Redoslijed sekcija = redoslijed na stranici. "id" je isti kao "sekcija" u linkovima (data.js).
// Sekcije u istoj skupini prikazuju se jedna do druge (na širokom zaslonu), s jednom trakom izbornika iznad skupine.
const GRUPE = [
  [{ id: "pocetna", Komponenta: Services }],
  [{ id: "postupak", Komponenta: Process }],
  [{ id: "blog", Komponenta: Blog }],
  [{ id: "o-nama", Komponenta: ONama }, { id: "kontakt", Komponenta: Kontakt }],
];
const SEKCIJE = GRUPE.flat();

// Navigacijska traka između sekcija (bez margine), da se ne treba vraćati na vrh za sljedeći dio
const SEKCIJSKI_LINKOVI = linkovi.filter(l => l.sekcija);
function SekcijskaTraka() {
  return (
    <nav className="navbar sekcija-traka" aria-label="Izbornik sekcija">
      <div className="nav justify-content-center w-100">
        {SEKCIJSKI_LINKOVI.map(l => <NavStavka key={l.to} l={l} />)}
      </div>
    </nav>
  );
}

const bezAnimacije = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Jedna kontinuirana stranica: izbornik samo pomiče stranicu na odgovarajuću sekciju
function Pocetna() {
  const { hash, key } = useLocation();

  // klik na izbornik (/#sekcija) ili otvaranje adrese s #sekcija: pomakni se na taj dio
  useEffect(() => {
    const id = hash.slice(1);
    if (!id) return;
    const behavior = bezAnimacije() ? "auto" : "smooth";
    if (id === "pocetna") { window.scrollTo({ top: 0, behavior }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  }, [hash, key]);

  // dok se stranica pomiče, označi sekciju koja je trenutno na zaslonu
  useEffect(() => {
    let cekanje = false;
    const izracunaj = () => {
      cekanje = false;
      const doDna = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let trenutna = SEKCIJE[0].id;
      let najbliza = -Infinity; // kod jednakog vrha (sekcije jedna do druge) vrijedi prva
      if (doDna) {
        trenutna = SEKCIJE[SEKCIJE.length - 1].id;
      } else {
        for (const s of SEKCIJE) {
          const el = document.getElementById(s.id);
          const vrh = el ? el.getBoundingClientRect().top : Infinity;
          if (vrh <= window.innerHeight * 0.35 && vrh > najbliza + 1) { trenutna = s.id; najbliza = vrh; }
        }
      }
      postaviAktivnu(trenutna);
    };
    const naPomak = () => { if (!cekanje) { cekanje = true; requestAnimationFrame(izracunaj); } };
    izracunaj();
    window.addEventListener("scroll", naPomak, { passive: true });
    window.addEventListener("resize", naPomak);
    return () => {
      window.removeEventListener("scroll", naPomak);
      window.removeEventListener("resize", naPomak);
      postaviAktivnu(null);
    };
  }, []);

  return (
    <>
      <h1 className="visually-hidden">GeoPatrik d.o.o. za geodetske usluge</h1>
      {GRUPE.map((grupa, i) => (
        <div key={grupa[0].id}>
          {i > 0 && <SekcijskaTraka />}
          <div className={grupa.length > 1 ? "sekcije-uz-sebe" : undefined}>
            {grupa.map(({ id, Komponenta }) => (
              <div key={id} id={id} className="sekcija"><Komponenta /></div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default Pocetna;
