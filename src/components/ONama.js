import { oNama, kontakt } from '../data';

function ONama() {
  return (
    <section className="container py-5">
      <h2 className="h2 mb-3">O nama</h2>
      <p className="text-black mb-4">{oNama.uvod}</p>

      {oNama.vrijednosti.map(v => (
        <p key={v.naslov} className="text-black mb-4">
          <strong>{v.naslov}.</strong> {v.opis}
        </p>
      ))}

      <h2 className="h5">Kontakt</h2>
      <address className="text-black">
        {kontakt.adresa}<br />
        Tel: <a href={`tel:${kontakt.tel.replace(/\s/g, '')}`}>{kontakt.tel}</a><br />
        E-pošta: <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>
        <br />
        OIB: {kontakt.oib}
      </address>
    </section>
  );
}

export default ONama;
