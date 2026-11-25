import { Link } from 'react-router-dom';
import { kontakt } from '../data';

// Izjava o privatnosti (obavijest o obradi osobnih podataka prema GDPR-u, čl. 13.).
// Mjesta označena <mark> (oznaka "dopuniti") treba ispuniti stvarnim podacima prije objave prave stranice.
// Tekst je predložak, a ne pravni savjet: za pravu stranicu neka ga pregleda stručna osoba.
const Dopuniti = ({ children }) => <mark>[dopuniti: {children}]</mark>;

function Privatnost() {
  return (
    <section className="container py-5 privatnost">
      <h1 className="h2 mb-2">Izjava o privatnosti</h1>
      <p className="text-black">Zadnja izmjena: 23. studenoga 2026.</p>

      <h2 className="h4 mt-4">1. Tko obrađuje vaše podatke</h2>
      <p>
        Voditelj obrade je GeoPatrik d.o.o. za geodetske usluge, {kontakt.adresa}, OIB: <Dopuniti>OIB tvrtke</Dopuniti>.
        Za sva pitanja o zaštiti podataka možete nam se javiti na <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>.
      </p>

      <h2 className="h4 mt-4">2. Koje podatke prikupljamo i zašto</h2>
      <ul>
        <li>
          <strong>Registracija korisničkog računa:</strong> ime, prezime, adresa (ulica, poštanski broj i grad), e-mail adresa i lozinka.
          Koristimo ih za izradu računa i prijavu na stranicu. Pravna osnova: izvršenje ugovora, odnosno radnje koje tražite prije sklapanja ugovora
          (čl. 6. st. 1. t. b GDPR-a).
        </li>
        <li>
          <strong>Upit e-poštom:</strong> kad nam pošaljete upit, primamo vašu e-mail adresu i sadržaj poruke.
          Koristimo ih samo da vam odgovorimo i pripremimo ponudu. Pravna osnova: radnje na vaš zahtjev prije sklapanja ugovora (čl. 6. st. 1. t. b).
        </li>
      </ul>
      <p>
        Lozinku nikad ne čuvamo u izvornom obliku, nego samo kao šifrirani sažetak (hash) iz kojeg se lozinka ne može pročitati.
        Podatke ne prodajemo i ne koristimo za automatizirano odlučivanje ni za oglašavanje.
      </p>

      <h2 className="h4 mt-4">3. Koliko dugo čuvamo podatke</h2>
      <ul>
        <li>Podaci korisničkog računa: do brisanja računa na vaš zahtjev.</li>
        <li>Upiti i odgovori: <Dopuniti>rok, npr. 12 mjeseci od posljednje poruke</Dopuniti>, osim ako zakon traži dulje čuvanje (npr. dokumentacija o izvršenim poslovima).</li>
      </ul>

      <h2 className="h4 mt-4">4. Kolačići i slične tehnologije</h2>
      <p>
        Naša stranica <strong>ne koristi kolačiće</strong> za praćenje, analitiku ni oglašavanje, pa vam ne prikazujemo baner za privolu.
        Preglednik pohranjuje samo podatke nužne za rad stranice: oznaku da ste prijavljeni (traje do zatvaranja kartice preglednika)
        i podatke potrebne za prijavu. Fontovi i slike učitavaju se s našeg poslužitelja, a ne od trećih strana.
      </p>
      <p>
        Ako ubuduće uvedemo analitiku ili drugu uslugu koja koristi kolačiće ili prikuplja podatke o posjetima, najprije ćemo ažurirati ovu izjavu,
        a gdje zakon traži, zatražit ćemo vašu privolu.
      </p>

      <h2 className="h4 mt-4">5. Društvene mreže</h2>
      <p>
        U podnožju stranice nalaze se poveznice na društvene mreže. To su obične poveznice: ne ugrađujemo njihove dodatke (npr. gumb „sviđa mi se”,
        prikaz objava ili videa), pa te mreže ne dobivaju podatke o vašem posjetu dok ne kliknete poveznicu. Nakon klika napuštate našu stranicu
        i vrijede pravila privatnosti te mreže.
      </p>

      <h2 className="h4 mt-4">6. Tko još vidi vaše podatke</h2>
      <p>
        Podatke ne dajemo trećim stranama, osim pružateljima usluga koji nam pomažu u radu (poslužitelj za smještaj stranice i usluga e-pošte:
        <Dopuniti>nazivi pružatelja i država u kojoj posluju</Dopuniti>) te kad to zakon traži.
      </p>

      <h2 className="h4 mt-4">7. Vaša prava</h2>
      <p>Imate pravo na:</p>
      <ul>
        <li>pristup svojim podacima i njihovu kopiju,</li>
        <li>ispravak netočnih podataka,</li>
        <li>brisanje podataka („pravo na zaborav”),</li>
        <li>ograničenje obrade i prigovor na obradu,</li>
        <li>prenosivost podataka,</li>
        <li>povlačenje privole u bilo kojem trenutku, ako se obrada temelji na privoli.</li>
      </ul>
      <p>
        Zahtjev pošaljite na <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>; odgovorit ćemo u roku od mjesec dana.
        Ako smatrate da obradu provodimo protivno propisima, možete podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP),
        Selska cesta 136, 10000 Zagreb, <a href="https://azop.hr" target="_blank" rel="noopener noreferrer">azop.hr</a>.
      </p>

      <h2 className="h4 mt-4">8. Sigurnost podataka</h2>
      <p>
        Poduzimamo razumne tehničke i organizacijske mjere zaštite: lozinke su pohranjene kao sažetak, pristup podacima imaju samo ovlaštene osobe,
        a stranica se poslužuje preko zaštićene veze (HTTPS). <Dopuniti>potvrditi nakon objave prave stranice</Dopuniti>
      </p>

      <h2 className="h4 mt-4">9. Izmjene ove izjave</h2>
      <p>O svakoj bitnoj izmjeni obavijestit ćemo vas na ovoj stranici, uz novi datum zadnje izmjene.</p>

      <Link to="/" className="btn btn-outline-success mt-3">← Natrag na početnu</Link>
    </section>
  );
}

export default Privatnost;
