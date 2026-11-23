import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { postaviAktivnu } from '../sekcije';
import Services from './Services';
import Process from './Process';
import Blog from './Blog';
import ONama from './ONama';

// Redoslijed sekcija = redoslijed na stranici. "id" je isti kao "sekcija" u linkovima (data.js).
const SEKCIJE = [
  { id: "pocetna", Komponenta: Services },
  { id: "postupak", Komponenta: Process },
  { id: "blog", Komponenta: Blog },
  { id: "o-nama", Komponenta: ONama },
];

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
      if (doDna) {
        trenutna = SEKCIJE[SEKCIJE.length - 1].id;
      } else {
        for (const s of SEKCIJE) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) trenutna = s.id;
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
      {SEKCIJE.map(({ id, Komponenta }) => (
        <div key={id} id={id} className="sekcija">
          <Komponenta />
        </div>
      ))}
    </>
  );
}

export default Pocetna;
