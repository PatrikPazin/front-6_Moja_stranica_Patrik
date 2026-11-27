import { Link } from 'react-router-dom';
import { Facebook, Whatsapp, ChatDotsFill, Linkedin, Instagram, Twitter, Telephone, Phone, Envelope, GeoAlt } from 'react-bootstrap-icons';
import { kontakt, linkovi } from '../data';
import Logo from './Logo';
import NavStavka from './NavStavka';

// Društvene mreže: za sada sve vode na stranicu "u izradi"
const mreze = [
  { naziv: "Facebook", Ikona: Facebook, boja: "#1877F2" },
  { naziv: "WhatsApp", Ikona: Whatsapp, boja: "#25D366" },
  { naziv: "Viber", Ikona: ChatDotsFill, boja: "#7360F2" },
  { naziv: "LinkedIn", Ikona: Linkedin, boja: "#0A66C2" },
  { naziv: "Instagram", Ikona: Instagram, boja: "#E4405F" },
  { naziv: "Twitter", Ikona: Twitter, boja: "#1DA1F2" },
];

function Footer() {
  // izbornik u podnožju nema Prijavu, Novog korisnika ni Odjavu
  const prikazani = linkovi.filter(l => l.to !== "/login" && l.to !== "/novi-korisnik");
  return (
    <footer className="mt-5 podnozje">
      {/* gornja polovica: logo (4/12) lijevo, izbornik u sredini, kontakt desno */}
      <div className="container-fluid podnozje-dolje">
        <div className="row align-items-center py-3">
          <div className="col-12 col-sm-8 col-md-4 mb-3 mb-md-0">
            <div className="podnozje-slika logo-okvir">
              <Logo />
            </div>
          </div>
          {/* sredina: izbornik, sekcije jedna ispod druge */}
          <nav className="col-12 col-md-3 mb-3 mb-md-0 navbar podnozje-sredina" aria-label="Izbornik u podnožju">
            <div className="nav flex-column align-items-center w-100">
              {prikazani.map(l => (
                <NavStavka key={l.to} l={l} />
              ))}
            </div>
          </nav>
          <div className="col-12 col-md-5 d-flex justify-content-end">
            {/* kontakt i gumb čine jedan blok koji stoji skroz desno i putuje zajedno */}
            <div>
              <address className="mb-0 text-black">
                <div><Telephone aria-hidden="true" className="me-2" />tel: {kontakt.tel}</div>
                <div><Phone aria-hidden="true" className="me-2" />mob: {kontakt.mob}</div>
                <div><Envelope aria-hidden="true" className="me-2" /><a href={`mailto:${kontakt.email}`} className="text-black">{kontakt.email}</a></div>
                <div><GeoAlt aria-hidden="true" className="me-2" />{kontakt.adresa}</div>
                <div>OIB: {kontakt.oib}</div>
              </address>
              {/* otvara novu poruku u korisnikovom e-mail programu, s već upisanom našom adresom; izbor web-poslužitelja i slanje preko servera: vidi upit.js */}
            </div>
          </div>
        </div>
      </div>

      {/* donja polovica: ikone društvenih mreža u sredini */}
      <div className="podnozje-gore podnozje-dno d-flex flex-column justify-content-center align-items-center gap-2 py-3">
        <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3 m-0 p-0" aria-label="Društvene mreže">
          {mreze.map(({ naziv, Ikona, boja }) => (
            <li key={naziv}>
              <Link to="/u-izradi" className="btn gumb-mreza" style={{ "--boja": boja }} aria-label={naziv} title={naziv}>
                <Ikona aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/privatnost" className="text-black">Izjava o privatnosti</Link>
        <p className="text-black mb-0 mt-2" style={{ fontSize: "0.875rem" }}>Pozadinska karta: arhivski materijal, slobodan za korištenje</p>
      </div>
    </footer>
  );
}

export default Footer;
