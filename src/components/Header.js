import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useImePrijavljenog, odjavi } from '../korisnici';
import { linkovi } from '../data';
import Carousel from './Carousel';

function Header() {
  const ime = useImePrijavljenog();
  const prijavljen = ime !== null;
  const navigate = useNavigate();
  // kad je korisnik prijavljen, nestaju kartice Login i Novi korisnik, a pojavljuje se Logout
  const prikazani = prijavljen ? linkovi.filter(l => l.to !== "/login" && l.to !== "/novi-korisnik") : linkovi;
  return (
    <header>
      <nav className="navbar border-bottom" aria-label="Glavni izbornik">
        <div className="container flex-column align-items-stretch">
          <Link className="navbar-brand marka align-self-center" to="/">
            <span>GeoPatrik d.o.o.<br />za geodetske usluge</span>
            {/* mjesto za logo (desno od teksta): kasnije zamijeni <img src="/images/logo.png" alt="" /> */}
            <span className="logo-mjesto" aria-hidden="true">logo</span>
          </Link>
          {/* naziv tvrtke je u sredini, a linkovi ispod njega poravnati uz desni rub */}
          <div className="nav align-self-end justify-content-end align-items-end">
            {prikazani.map(l => (
              <NavLink key={l.to} to={l.to} end className="nav-link">{l.naziv}</NavLink>
            ))}
            {prijavljen && (
              <button type="button" className="nav-link nav-logout" onClick={() => { odjavi(); navigate("/"); }}>
                <span style={{ fontSize: ".8em" }}>Dobrodošao, {ime}.</span> Odjava
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* carousel umjesto prijašnje slike */}
      <div className="container pt-4">
        <Carousel />
      </div>
    </header>
  );
}

export default Header;
