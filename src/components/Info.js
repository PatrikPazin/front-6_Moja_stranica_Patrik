import { Link, useParams } from 'react-router-dom';
import { carouselKartice } from '../data';

// Privremena stranica na koju vode kartice iz carousela.
// Kasnije za svaku karticu napravimo pravi sadržaj.
function Info() {
  const { slug } = useParams();
  const kartica = carouselKartice.find(k => k.to === `/info/${slug}`);

  return (
    <section className="container py-5">
      <h1 className="h2 mb-3">{kartica ? kartica.naslov : "Stranica nije pronađena"}</h1>
      <p className="text-secondary">Sadržaj uskoro.</p>
      <Link to="/" className="btn btn-outline-success">← Natrag na usluge</Link>
    </section>
  );
}

export default Info;
