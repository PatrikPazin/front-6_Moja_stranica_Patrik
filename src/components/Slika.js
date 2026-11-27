import { useState } from 'react';

// Slika s osiguranjem: ako se ne može učitati (nema datoteke ili vanjski izvor ne radi),
// ne prikazuje se samo ta slika, a ostatak stranice radi normalno.
// Koristi se umjesto <img>, s istim svojstvima. alt (opis slike) uvijek upiši.
function Slika({ src, alt = "", ...ostalo }) {
  const [neuspjela, setNeuspjela] = useState(null); // pamti adresu koja nije uspjela
  if (!src || neuspjela === src) return null;
  return <img src={src} alt={alt} onError={() => setNeuspjela(src)} {...ostalo} />;
}

export default Slika;
