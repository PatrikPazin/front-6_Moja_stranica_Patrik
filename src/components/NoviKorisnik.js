import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registriraj } from '../korisnici';
import { Eye, EyeSlash, ExclamationTriangleFill } from 'react-bootstrap-icons';

// Provjera e-pošte: dovoljno je nešto@nešto.nešto (adresa ne mora postojati)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Upozorenje kad lozinka nema veliko slovo ili brojku
const PORUKA_LOZINKA = "Lozinka mora sadržavati veliko slovo i znamenku. Molimo pokušajte ponovno.";

const obavezno = poruka => v => (v.trim() ? "" : poruka);

// Provjere po poljima (v = vrijednost polja, sve = sva polja); prazan string = u redu
const provjere = {
  ime: obavezno("Upišite ime."),
  prezime: obavezno("Upišite prezime."),
  ulica: obavezno("Upišite ulicu i kućni broj."),
  mjesto: v => {
    if (!v.trim()) return "Upišite poštanski broj i grad.";
    if (!/^\d{5}\s+\S/.test(v.trim())) return "Najprije poštanski broj (5 znamenki), pa grad, npr. 10000 Zagreb.";
    return "";
  },
  email: v => {
    if (!v.trim()) return "Upišite e-mail adresu.";
    if (!emailRegex.test(v.trim())) return "Adresa mora biti u obliku nesto@nesto.com.";
    return "";
  },
  lozinka: v => {
    if (!v) return "Upišite lozinku.";
    if (v.length < 6) return "Lozinka mora imati najmanje 6 znakova.";
    if (!/[A-ZČĆŽŠĐ]/.test(v) || !/[0-9]/.test(v)) return PORUKA_LOZINKA;
    return "";
  },
  lozinka2: (v, sve) => {
    if (!v) return "Ponovite lozinku.";
    if (v !== sve.lozinka) return "Lozinke se ne podudaraju.";
    return "";
  },
};

const redoslijed = Object.keys(provjere);
const prazno = Object.fromEntries(redoslijed.map(k => [k, ""]));

function NoviKorisnik() {
  const [vrijednosti, setVrijednosti] = useState(prazno);
  const [pogreske, setPogreske] = useState({});
  const [dotaknuto, setDotaknuto] = useState({});
  const [uspjeh, setUspjeh] = useState(false);
  const [greskaBaze, setGreskaBaze] = useState("");
  const [prikaz, setPrikaz] = useState({}); // koja su polja lozinke prikazana kao običan tekst

  // provjera polja kad ga korisnik napusti, a nakon toga i dok tipka
  const promjena = polje => e => {
    const v = e.target.value;
    const nove = { ...vrijednosti, [polje]: v };
    setVrijednosti(nove);
    setPogreske(p => {
      const n = { ...p };
      if (dotaknuto[polje]) n[polje] = provjere[polje](v, nove);
      // promjena lozinke odmah ponovno provjerava i "ponovi lozinku"
      if (polje === "lozinka" && dotaknuto.lozinka2) n.lozinka2 = provjere.lozinka2(nove.lozinka2, nove);
      return n;
    });
  };
  const napustanje = polje => () => {
    setDotaknuto(d => ({ ...d, [polje]: true }));
    setPogreske(p => ({ ...p, [polje]: provjere[polje](vrijednosti[polje], vrijednosti) }));
  };

  const posalji = async e => {
    e.preventDefault();
    const nove = Object.fromEntries(redoslijed.map(k => [k, provjere[k](vrijednosti[k], vrijednosti)]));
    setPogreske(nove);
    setDotaknuto(Object.fromEntries(redoslijed.map(k => [k, true])));
    const prvo = redoslijed.find(k => nove[k]);
    if (prvo) {
      document.getElementById(prvo)?.focus();
      return;
    }
    // spremanje u privremenu bazu (korisnici.js, najviše 10 korisnika)
    const rez = await registriraj(vrijednosti);
    if (rez.ok) { setGreskaBaze(""); setUspjeh(true); }
    else setGreskaBaze(rez.greska);
  };

  const prikazi = (id, da) => setPrikaz(p => (!!p[id] === da ? p : { ...p, [id]: da }));

  // polje je otključano tek kad su sva prethodna polja ispravno ispunjena
  const otkljucano = id => {
    const i = redoslijed.indexOf(id);
    return redoslijed.slice(0, i).every(k => !provjere[k](vrijednosti[k], vrijednosti));
  };

  const sviIspravni = redoslijed.every(k => !provjere[k](vrijednosti[k], vrijednosti));

  // jedno polje obrasca (labela, input, simbol upozorenja s tekstom na hover, poruka o grešci)
  const polje = (id, labela, { tip = "text", autoComplete, pomoc, podnaslov, razred = "mb-3" } = {}) => {
    const jeLozinka = tip === "password";
    const vidljiva = jeLozinka && prikaz[id];
    const greska = pogreske[id];
    const upozorenje = !vrijednosti[id].trim() ? "Niste ništa upisali"
      : greska === PORUKA_LOZINKA ? PORUKA_LOZINKA
      : "Niste pravilno ispunili podatke";
    const input = (
      <div className="polje-omot">
        <input
          id={id} type={vidljiva ? "text" : tip} autoComplete={autoComplete}
          className={"form-control" + (greska ? " is-invalid" : "")}
          value={vrijednosti[id]}
          onChange={promjena(id)}
          onBlur={napustanje(id)}
          disabled={!otkljucano(id)}
          aria-required="true"
          aria-invalid={!!greska}
          aria-describedby={[podnaslov && `${id}-podnaslov`, pomoc && `${id}-pomoc`, greska && `${id}-greska`].filter(Boolean).join(" ") || undefined}
        />
        {greska && (
          <span className="upozorenje">
            <button type="button" className="upozorenje-gumb" aria-label={upozorenje}>
              <ExclamationTriangleFill aria-hidden="true" />
            </button>
            <span className="upozorenje-tekst" aria-hidden="true">{upozorenje}</span>
          </span>
        )}
      </div>
    );
    return (
    <div className={razred}>
      <label htmlFor={id} className="form-label" style={{ fontSize: "1.5rem" }}>{labela} <span className="text-danger" aria-hidden="true">*</span></label>
      {podnaslov && <div id={`${id}-podnaslov`} className="text-black" style={{ fontSize: "1rem" }}>{podnaslov}</div>}
      {jeLozinka ? (
        <div className="input-group">
          {input}
          <button
            type="button" className="btn gumb-oko"
            // lozinka je vidljiva samo dok se gumb drži pritisnut (miš, dodir ili tipkovnica)
            onPointerDown={() => prikazi(id, true)}
            onPointerUp={() => prikazi(id, false)}
            onPointerLeave={() => prikazi(id, false)}
            onPointerCancel={() => prikazi(id, false)}
            onBlur={() => prikazi(id, false)}
            onKeyDown={e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); prikazi(id, true); } }}
            onKeyUp={e => { if (e.key === " " || e.key === "Enter") prikazi(id, false); }}
            onContextMenu={e => e.preventDefault()}
            disabled={!otkljucano(id)}
            title="Drži pritisnuto za prikaz lozinke"
            aria-label="Prikaži lozinku dok držite pritisnuto"
          >
            {vidljiva ? <EyeSlash aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </div>
      ) : input}
      {pomoc && <div id={`${id}-pomoc`} className="form-text text-black">{pomoc}</div>}
      {/* točna poruka ostaje dostupna čitaču zaslona */}
      {greska && <div id={`${id}-greska`} className="visually-hidden">{greska}</div>}
    </div>
    );
  };

  if (uspjeh) {
    return (
      <section className="container py-5">
        <h1 className="h2 mb-3">Novi korisnik</h1>
        <div className="alert alert-success" role="status">
          Registracija je uspješna. Dobrodošli, {vrijednosti.ime.trim()} {vrijednosti.prezime.trim()}!
        </div>
        <Link to="/login" className="btn btn-outline-success me-2">Prijava</Link>
        <Link to="/" className="btn btn-outline-success">← Natrag na početnu</Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="h2 mb-4">Novi korisnik</h1>
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={posalji} noValidate>
            <p className="small text-black"><span className="text-danger" aria-hidden="true">*</span> Obavezno polje</p>
            {polje("ime", "Ime", { autoComplete: "given-name" })}
            {polje("prezime", "Prezime", { autoComplete: "family-name" })}
            {polje("ulica", "Ulica i kućni broj", { autoComplete: "street-address" })}
            {polje("mjesto", "Poštanski broj i grad", { autoComplete: "off", pomoc: "Npr. 10000 Zagreb" })}
            {polje("email", "E-mail adresa", { tip: "email", autoComplete: "email" })}

            {/* lozinke jedna ispod druge */}
            {polje("lozinka", "Lozinka", {
              tip: "password", autoComplete: "off",
              pomoc: "Lozinka mora sadržavati najmanje 6 znakova, uključujući jedno veliko slovo i jednu znamenku.",
            })}
            {polje("lozinka2", "Ponovite lozinku", { tip: "password", autoComplete: "off" })}

            {greskaBaze && <div className="alert alert-danger" role="alert">{greskaBaze}</div>}

            {/* dok nisu ispunjena sva polja: bez hover efekta, a na hover/fokus se prikaže oblačić upozorenja */}
            <span className="gumb-omot">
              <button
                type="submit"
                className={"btn gumb-crveni" + (sviIspravni ? "" : " nepotpuno")}
                aria-describedby={sviIspravni ? undefined : "registracija-upozorenje"}
              >
                Registriraj se
              </button>
              {!sviIspravni && (
                <span id="registracija-upozorenje" className="gumb-oblacic">Niste ispunili sve potrebne podatke</span>
              )}
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NoviKorisnik;
