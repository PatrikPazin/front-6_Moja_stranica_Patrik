import { Link } from 'react-router-dom';

// Privremena stranica na koju vode ikone društvenih mreža
function UIzradi() {
  return (
    <section className="container py-5">
      <h1 className="h2 mb-3">Stranica je u izradi, molimo pričekajte</h1>
      <Link to="/" className="btn btn-outline-success">← Natrag na početnu</Link>
    </section>
  );
}

export default UIzradi;
