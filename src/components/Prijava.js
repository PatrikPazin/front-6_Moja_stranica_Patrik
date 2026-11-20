import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { prijavi, odjavi, prijavljeniKorisnik } from '../korisnici';

function Prijava() {
  const navigate = useNavigate();
  const [korisnik, setKorisnik] = useState(prijavljeniKorisnik);
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");

  const posalji = async e => {
    e.preventDefault();
    if (!email.trim() || !lozinka) {
      setGreska("Upišite e-mail adresu i lozinku.");
      return;
    }
    const rez = await prijavi(email, lozinka);
    if (rez.ok) navigate("/"); // nakon uspješne prijave odmah na početnu stranicu
    else setGreska(rez.greska);
  };

  if (korisnik) {
    return (
      <section className="container py-5">
        <h1 className="h2 mb-3">Prijava</h1>
        <div className="alert alert-success" role="status">
          Prijavljeni ste kao {korisnik.ime} {korisnik.prezime} ({korisnik.email}).
        </div>
        <button type="button" className="btn gumb-crveni me-2" onClick={() => { odjavi(); setKorisnik(null); }}>Odjava</button>
        <Link to="/" className="btn btn-outline-success">← Natrag na početnu</Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="h2 mb-4">Prijava</h1>
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={posalji} noValidate>
            {greska && <div className="alert alert-danger" role="alert">{greska}</div>}
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label" style={{ fontSize: "1.5rem" }}>E-mail adresa</label>
              <input id="login-email" type="email" autoComplete="email" className="form-control"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="login-lozinka" className="form-label" style={{ fontSize: "1.5rem" }}>Lozinka</label>
              <input id="login-lozinka" type="password" autoComplete="off" className="form-control"
                value={lozinka} onChange={e => setLozinka(e.target.value)} />
            </div>
            <button type="submit" className="btn gumb-crveni">Prijavi se</button>
            <p className="mt-3 text-black">Nemate račun? <Link to="/novi-korisnik">Registrirajte se</Link></p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Prijava;
