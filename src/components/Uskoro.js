import { Link } from 'react-router-dom';

// Privremena stranica (Login, Novi korisnik) dok se ne napravi pravi sadržaj.
function Uskoro({ naslov }) {
  return (
    <section className="container py-5">
      <h1 className="h2 mb-3">{naslov}</h1>
      <p className="text-black">Sadržaj uskoro.</p>
      <Link to="/" className="btn btn-outline-success">← Natrag na početnu</Link>
    </section>
  );
}

export default Uskoro;
