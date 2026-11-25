import { useState } from 'react';
import { posaljiUpit } from '../upit';

// Valjana e-mail adresa: dio@domena.tld (mora imati @, domenu s točkom i oznaku od najmanje 2 slova)
const IZGLED_ADRESE = /^[^\s@\u0080-\uFFFF]+@[^\s@.\u0080-\uFFFF]+(\.[^\s@.\u0080-\uFFFF]+)*\.[A-Za-z]{2,}$/;

// Česte pogreške u tipkanju poznatih davatelja e-pošte (npr. gmial.com) hvatamo posebno
const POZNATI = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "live.com", "proton.me", "protonmail.com"];
const POGRESNI = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gamil.com": "gmail.com", "gmail.co": "gmail.com", "gmail.hr": "gmail.com", "gmil.com": "gmail.com",
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yahoo.co": "yahoo.com",
  "outlok.com": "outlook.com", "outloook.com": "outlook.com",
  "hotmial.com": "hotmail.com", "hotmai.com": "hotmail.com",
};

export function provjeriEmail(unos) {
  const adresa = unos.trim();
  if (!adresa) return "Upišite e-mail adresu.";
  if (!adresa.includes("@")) return "E-mail adresa mora sadržavati znak @.";
  if (/[\u0080-\uFFFF]/.test(adresa)) return "E-mail adresa ne smije sadržavati slova s kvačicama (č, š, ž, đ…).";
  if (!IZGLED_ADRESE.test(adresa)) return "E-mail adresa nije valjana (npr. ime@gmail.com).";
  const domena = adresa.split("@")[1].toLowerCase();
  if (POGRESNI[domena]) return `Domena „${domena}” izgleda kao pogreška. Mislili ste ${POZNATI.includes(POGRESNI[domena]) ? POGRESNI[domena] : "drugu domenu"}?`;
  return "";
}

// Telefon je neobavezan; ako je upisan, dopuštamo brojke, razmake, +, -, ( ) i /
function provjeriTelefon(unos) {
  const t = unos.trim();
  if (!t) return "";
  if (!/^\+?[\d\s()/-]+$/.test(t) || t.replace(/\D/g, "").length < 6) return "Telefon nije valjan (npr. +385 91 234 5678).";
  return "";
}

function Kontakt() {
  const [ime, setIme] = useState("");
  const [opis, setOpis] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [greske, setGreske] = useState({});
  const [stanje, setStanje] = useState(null); // null | "ok" | "greska" | "greska-posluzitelj"
  const [poruka, setPoruka] = useState("");

  // Dok korisnik tipka: čim je polje s prikazanom pogreškom ispravno, pogreška nestaje
  const provjere = {
    ime: v => (v.trim() ? "" : "Upišite ime i prezime."),
    opis: v => (v.trim() ? "" : "Upišite kratak opis upita."),
    email: provjeriEmail,
    telefon: provjeriTelefon,
  };
  const uskladi = (polje, vrijednost) => {
    setStanje(null); // poruka nestaje čim korisnik nastavi ispunjavati
    setGreske(g => (g[polje] && !provjere[polje](vrijednost) ? { ...g, [polje]: undefined } : g));
  };

  const posalji = async e => {
    e.preventDefault();
    const nove = {};
    if (!ime.trim()) nove.ime = "Upišite ime i prezime.";
    if (!opis.trim()) nove.opis = "Upišite kratak opis upita.";
    const ge = provjeriEmail(email);
    if (ge) nove.email = ge;
    const gt = provjeriTelefon(telefon);
    if (gt) nove.telefon = gt;
    setGreske(nove);
    if (Object.keys(nove).length) { setStanje("greska"); return; }

    try {
      await posaljiUpit({ ime: ime.trim(), email: email.trim(), telefon: telefon.trim(), opis: opis.trim() });
    } catch (err) {
      setPoruka(err.message);
      setStanje("greska-posluzitelj");
      return;
    }
    setStanje("ok");
    setIme(""); setOpis(""); setEmail(""); setTelefon("");
  };

  return (
    <section className="container py-5 kontakt-crno">
      <h2 className="h2 mb-4">Kontaktirajte nas</h2>
      <div className="row">
        <div className="col-12">
          <form onSubmit={posalji} noValidate>
            <div className="mb-3">
              <label htmlFor="kontakt-ime" className="form-label" style={{ fontSize: "1.5rem" }}>Ime i prezime</label>
              <input id="kontakt-ime" type="text" autoComplete="name"
                className={`form-control${greske.ime ? " is-invalid" : ""}`}
                aria-invalid={!!greske.ime} aria-describedby={greske.ime ? "kontakt-ime-greska" : undefined}
                value={ime} onChange={e => { setIme(e.target.value); uskladi("ime", e.target.value); }} />
              {greske.ime && <div id="kontakt-ime-greska" className="invalid-feedback">{greske.ime}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="kontakt-opis" className="form-label" style={{ fontSize: "1.5rem" }}>Opis upita</label>
              <textarea id="kontakt-opis" rows={4}
                className={`form-control${greske.opis ? " is-invalid" : ""}`}
                aria-invalid={!!greske.opis} aria-describedby={greske.opis ? "kontakt-opis-greska" : undefined}
                value={opis} onChange={e => { setOpis(e.target.value); uskladi("opis", e.target.value); }} />
              {greske.opis && <div id="kontakt-opis-greska" className="invalid-feedback">{greske.opis}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="kontakt-email" className="form-label" style={{ fontSize: "1.5rem" }}>E-mail adresa</label>
              <input id="kontakt-email" type="email" autoComplete="email"
                className={`form-control${greske.email ? " is-invalid" : ""}`}
                aria-invalid={!!greske.email} aria-describedby={greske.email ? "kontakt-email-greska" : undefined}
                value={email} onChange={e => { setEmail(e.target.value); uskladi("email", e.target.value); }} />
              {greske.email && <div id="kontakt-email-greska" className="invalid-feedback">{greske.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="kontakt-telefon" className="form-label" style={{ fontSize: "1.5rem" }}>
                Kontakt telefon <span className="text-secondary" style={{ fontSize: "1rem" }}>(neobavezno)</span>
              </label>
              <input id="kontakt-telefon" type="tel" autoComplete="tel"
                className={`form-control${greske.telefon ? " is-invalid" : ""}`}
                aria-invalid={!!greske.telefon} aria-describedby={greske.telefon ? "kontakt-telefon-greska" : undefined}
                value={telefon} onChange={e => { setTelefon(e.target.value); uskladi("telefon", e.target.value); }} />
              {greske.telefon && <div id="kontakt-telefon-greska" className="invalid-feedback">{greske.telefon}</div>}
            </div>
            {stanje === "ok" && <div className="alert alert-success" role="status">Vaš upit uspješno je zaprimljen</div>}
            {stanje === "greska" && <div className="alert alert-danger" role="alert">Niste pravilno ispunili podatke. Molim pokušajte ponovo</div>}
            {stanje === "greska-posluzitelj" && <div className="alert alert-danger" role="alert">{poruka}</div>}
            <button type="submit" className="btn gumb-crveni">Pošalji upit</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Kontakt;
