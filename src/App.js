import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";import './App.css';

import Header from './components/Header';
import Pocetna from './components/Pocetna';
import NoviKorisnik from './components/NoviKorisnik';
import Prijava from './components/Prijava';
import Info from './components/Info';
import UIzradi from './components/UIzradi';
import Privatnost from './components/Privatnost';
import Footer from './components/Footer';
import NatragNaVrh from './components/NatragNaVrh';

// Naslovi stranica (čitač zaslona ih izgovori pri promjeni stranice)
const naslovi = {
  "/": "Početna",
  "/login": "Prijava",
  "/novi-korisnik": "Novi korisnik",
  "/u-izradi": "Stranica u izradi",
  "/privatnost": "Izjava o privatnosti",
};

// Pri promjeni stranice: vrati prikaz na vrh, postavi naslov kartice preglednika
// i prebaci fokus na sadržaj (da korisnici tipkovnice i čitača zaslona ne ostanu u izborniku)
function PromjenaStranice({ glavniRef }) {
  const { pathname, hash } = useLocation();
  const prvi = useRef(true);
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0); // s #sekcijom stranicu pomiče Pocetna.js
    document.title = `${naslovi[pathname] || "Informacije"} – GeoPiket d.o.o.`;
    if (prvi.current) { prvi.current = false; return; } // ne otimaj fokus pri prvom učitavanju
    glavniRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, glavniRef]);
  return null;
}

function App() {
  const glavniRef = useRef(null);

  return (
    <BrowserRouter>
      <a className="skip-link" href="#sadrzaj">Preskoči na sadržaj</a>
      <PromjenaStranice glavniRef={glavniRef} />
      <Header />
      {/* opis i izvor pozadinske karte (public/index.html), na svim stranicama ispod navigacije */}
      <p className="izvor-pozadine">Johannes Sambucus i Abraham Ortelius: <cite>Illyricum</cite> (1572.), javno dobro.</p>
      <main id="sadrzaj" ref={glavniRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          {/* stare adrese vode na odgovarajući dio jedinstvene stranice */}
          <Route path="/postupak" element={<Navigate to="/#postupak" replace />} />
          <Route path="/blog" element={<Navigate to="/#blog" replace />} />
          <Route path="/o-nama" element={<Navigate to="/#o-nama" replace />} />
          <Route path="/login" element={<Prijava />} />
          <Route path="/novi-korisnik" element={<NoviKorisnik />} />
          <Route path="/info/:slug" element={<Info />} />
          <Route path="/u-izradi" element={<UIzradi />} />
          <Route path="/privatnost" element={<Privatnost />} />
        </Routes>
      </main>
      <NatragNaVrh />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
