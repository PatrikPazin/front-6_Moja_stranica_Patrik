import { Link } from 'react-router-dom';
import { kontakt } from '../data';

// Izjava o privatnosti (obavijest o obradi osobnih podataka prema GDPR-u, čl. 13.).
// Ovo je školski projekt (završni ispit). Za pravu stranicu tekst neka pregleda stručna osoba,
// a umjesto napomena o projektu treba upisati stvarne podatke (OIB, pružatelj smještaja stranice).
// Registracija je skrivena iz izbornika, pa je dio o korisničkim računima u komentarima.
// Ako se prijava vrati (data.js), vrati i te dijelove.

function Privatnost() {
  return (
    <section className="container py-5 privatnost">
      <h1 className="h2 mb-2">Izjava o privatnosti</h1>
      <p className="text-black">Zadnja izmjena: 27. studenoga 2026.</p>

      <h2 className="h4 mt-4">1. Tko obrađuje vaše podatke</h2>
      <p>
        Voditelj obrade je GeoPiket d.o.o. za geodetske usluge, {kontakt.adresa}, OIB: (primjer, školski rad).
        Za sva pitanja o zaštiti podataka možete nam se javiti na <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>.
      </p>
      <p>Ova stranica je školski projekt za završni ispit. Tvrtka i kontakt podaci su primjeri, a usluge se ne prodaju.</p>

      <h2 className="h4 mt-4">2. Koje podatke prikupljamo i zašto</h2>
      <ul>
        <li>
          <strong>Obrazac „Kontaktirajte nas”:</strong> ime i prezime, e-mail adresa, kontakt telefon (neobavezno), opis upita te datum i
          vrijeme primitka. Koristimo ih samo da odgovorimo na upit i pripremimo ponudu. Pravna osnova: radnje na vaš zahtjev prije
          sklapanja ugovora (čl. 6. st. 1. t. b GDPR-a).
        </li>
        <li>
          <strong>Upit e-poštom:</strong> kad nam sami pošaljete poruku, primamo vašu e-mail adresu i sadržaj poruke, u istu svrhu i po istoj osnovi.
        </li>
        <li>
          <strong>Zaštita obrasca:</strong> poslužitelj nakratko, samo dok radi, pamti IP adresu pošiljatelja kako bi ograničio broj upita.
          Ne zapisuje je uz upit. Pravna osnova: legitimni interes za zaštitu od zlouporabe (čl. 6. st. 1. t. f).
        </li>
      </ul>
      {/* Za povratak prijave dodati u popis:
          Registracija korisničkog računa: ime, prezime, adresa, e-mail i lozinka (čuva se samo kao hash). */}
      <p>Podatke ne prodajemo i ne koristimo za automatizirano odlučivanje ni za oglašavanje.</p>

      <h2 className="h4 mt-4">3. Kamo upit ide i koliko ga čuvamo</h2>
      <p>
        Upit se sprema u datoteku na našem poslužitelju i istodobno šalje na našu e-mail adresu. Upite i odgovore čuvamo najdulje
        12 mjeseci od posljednje poruke, a zatim ih brišemo, osim ako zakon traži dulje čuvanje (npr. dokumentacija o izvršenim poslovima).
      </p>

      <h2 className="h4 mt-4">4. Kolačići i slične tehnologije</h2>
      <p>
        Naša stranica <strong>ne koristi kolačiće</strong> za praćenje, analitiku ni oglašavanje, pa vam ne prikazujemo baner za privolu.
        Pri uobičajenom korištenju ne spremamo podatke u vaš preglednik. Fontovi i slike učitavaju se s našeg poslužitelja, a ne od trećih strana.
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
      <p>Podatke ne dajemo trećim stranama, osim kad to zakon traži i osim pružateljima usluga koji nam pomažu u radu:</p>
      <ul>
        <li>
          <strong>Resend</strong> (<a href="https://resend.com" target="_blank" rel="noopener noreferrer">resend.com</a>): usluga preko koje
          nam upit iz obrasca stiže na e-mail. Tvrtka je iz SAD-a, pa se podaci iz upita obrađuju i izvan Europske unije.
        </li>
        <li><strong>Usluga e-pošte</strong> u kojoj primamo poruke.</li>
        <li><strong>Smještaj stranice:</strong> pružatelj još nije odabran, projekt se za sada pokreće lokalno.</li>
      </ul>

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
        Poduzimamo razumne tehničke i organizacijske mjere zaštite: provjeravamo unesene podatke, ograničavamo broj upita, a pristup
        podacima imaju samo ovlaštene osobe. Objavljena stranica treba se posluživati preko zaštićene veze (HTTPS).
      </p>

      <h2 className="h4 mt-4">9. Izmjene ove izjave</h2>
      <p>O svakoj bitnoj izmjeni obavijestit ćemo vas na ovoj stranici, uz novi datum zadnje izmjene.</p>

      <Link to="/" className="btn btn-outline-success mt-3">← Natrag na početnu</Link>
    </section>
  );
}

export default Privatnost;
