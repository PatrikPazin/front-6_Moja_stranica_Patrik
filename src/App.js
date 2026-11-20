import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";import './App.css';

import Header from './components/Header';
import Services from './components/Services';
import Process from './components/Process';
import Blog from './components/Blog';
import Slike from './components/Slike';
import ONama from './components/ONama';
import NoviKorisnik from './components/NoviKorisnik';
import Prijava from './components/Prijava';
import Info from './components/Info';
import Footer from './components/Footer';

// Naslovi stranica (čitač zaslona ih izgovori pri promjeni stranice)
const naslovi = {
  "/": "Početna",
  "/login": "Prijava",
  "/novi-korisnik": "Novi korisnik",
  "/postupak": "Postupak",
  "/blog": "Blog",
  "/slike": "Slike",
  "/o-nama": "O nama",
};

// Pri promjeni stranice: vrati prikaz na vrh, postavi naslov kartice preglednika
// i prebaci fokus na sadržaj (da korisnici tipkovnice i čitača zaslona ne ostanu u izborniku)
function PromjenaStranice({ glavniRef }) {
  const { pathname } = useLocation();
  const prvi = useRef(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${naslovi[pathname] || "Informacije"} – GeoPatrik d.o.o.`;
    if (prvi.current) { prvi.current = false; return; } // ne otimaj fokus pri prvom učitavanju
    glavniRef.current?.focus({ preventScroll: true });
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
      <main id="sadrzaj" ref={glavniRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/postupak" element={<Process />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/slike" element={<Slike />} />
          <Route path="/o-nama" element={<ONama />} />
          <Route path="/login" element={<Prijava />} />
          <Route path="/novi-korisnik" element={<NoviKorisnik />} />
          <Route path="/info/:slug" element={<Info />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
