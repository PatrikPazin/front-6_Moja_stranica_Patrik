// Podaci o člancima (koriste ih blog.html i clanak.html).
// Svaki članak: naslov, datum (GGGG-MM-DD), sažetak i tekst (jedan string = jedan odlomak).
// Najnoviji ide prvi. Redoslijed u popisu određuje link (clanak.html?id=0, ?id=1, ...)
const clanci = [
  {
    naslov: "Kada su vam potrebne geodetske usluge ?",
    datum: "2026-10-23",
    sazetak: "Kad je zgrada izgrađena, geodet snima kako je stvarno izvedena na terenu.",
    tekst: [
      "Snimanjem izvedenog stanja geodet izmjeri položaj i oblik izgrađene građevine na čestici.",
      "Taj snimak često je potreban za tehnički pregled i uporabnu dozvolu, a kasnije i za upis zgrade u katastar.",
    ],
  },
  {
    naslov: "Kako se pripremiti za iskolčenje objekta",
    datum: "2026-10-06",
    sazetak: "Prije prvog iskopa geodet prenosi položaj zgrade iz projekta na teren.",
    tekst: [
      "Iskolčenjem se točke iz projekta označe na terenu, kako bi zgrada bila na pravom mjestu i na propisanoj udaljenosti od međa.",
      "Pripremite građevinsku dozvolu i glavni projekt, a teren neka bude pristupačan i očišćen.",
    ],
  },
  {
    naslov: "Kada vam je potreban geodet?",
    datum: "2026-09-15",
    sazetak: "A kada nije potreban geodet? Samo kada imate riješene sve imovinsko-pravne probleme.",
    tekst: [
      "Geodet vam treba biti prvi na popisu kada govorimo o imovinsko-pravnim radnjama. Zašto? Zato što će geodet svojim radom omogućiti da se sve ostale radnje provedu bez problema i da se ne dogodi da se kasnije pojave problemi koji bi mogli biti skupi i dugotrajni.",
      "Da li se radi o kupoprodaji nekretnine, diobi čestice ili gradnji, geodet je tu da pomogne u rješavanju imovinsko-pravnih pitanja i osigura da sve bude u skladu sa zakonom.",
      "Da li se radi o gradnji, rekonstrukciji ili upisu zgrade u katastar, geodet je tu da osigura da sve bude u skladu sa zakonom i da se izbjegnu eventualni problemi u budućnosti.",
      "Da li ste naslijedili zemlju ili zgradu, geodet je tu da pomogne u rješavanju imovinsko-pravnih pitanja i osigura da sve bude u skladu sa zakonom.",
      "Kad god je u pitanju neka nekretnina (i zemljište je nekretnina, ne možete ga staviti u torbu i uzeti sa sobom ;)) geodet vam treba biti prioritet jer nikad ne znate šta ste i koliko toga kupili/naslijedili bez da geodet to izmjeri i napravi elaborat. To je samo za vašu sigurnost, jer ako piše da ste nasljedili 1000 kvadrata, ništa vam ne garantira da je na tom zemljištu stvarno 1000 kvadrata, ali geodet može precizno izračunati stvarne kvadrate. Da li to bilo više ili manje od zapisanog u dosadašnjoj dokumentavciji.",
    ],
  },
  {
    naslov: "Kada vam je potreban geodet?",
    datum: "2026-09-15",
    sazetak: "Kupnja zemljišta, gradnja, dioba čestice: kratki pregled situacija.",
    tekst: [
      "Geodet je potreban kad se mijenja nešto na čestici ili u njezinim podacima: kod diobe ili spajanja čestica, gradnje i upisa zgrade.",
      "Prije kupnje zemljišta korisno je provjeriti odgovaraju li granice na terenu onima u katastru.",
    ],
  },
  {
    naslov: "Kada vam je potreban geodet?",
    datum: "2026-09-15",
    sazetak: "Kupnja zemljišta, gradnja, dioba čestice: kratki pregled situacija.",
    tekst: [
      "Geodet je potreban kad se mijenja nešto na čestici ili u njezinim podacima: kod diobe ili spajanja čestica, gradnje i upisa zgrade.",
      "Prije kupnje zemljišta korisno je provjeriti odgovaraju li granice na terenu onima u katastru.",
    ],
  },
];

// "2026-10-28" -> "28. listopada 2026."
function formatirajDatum(iso) {
  return new Date(iso + "T00:00").toLocaleDateString("hr-HR", {
    day: "numeric", month: "long", year: "numeric",
  });
}
