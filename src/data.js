// Svi sadržaji stranice na jednom mjestu. Zamijeni tekstove svojima.

export const linkovi = [
  { naziv: "Usluge", to: "/" },
  { naziv: "Postupak", to: "/postupak" },
  { naziv: "Blog", to: "/blog" },
];

// Primjer podataka, zamijeni svojima
export const kontakt = {
  tel: "+385 1 234 5678",
  email: "info@geodetski-ured.hr",
  adresa: "Ulica primjera 1, 10000 Zagreb",
};

// Kartice u carouselu na stranici Usluge. "to" je adresa stranice na koju kartica vodi
// (za sada prazna stranica "Sadržaj uskoro", vidi Info.js).
export const carouselKartice = [
  { naslov: "Gradite kuću? Evo što Vam je potrebno prije građevinskih radova.", to: "/info/gradevinska-dozvola" },
  { naslov: "Želite znati gdje su točno Vaše međe ili ih želite ponovno označiti?", to: "/info/mede" },
  { naslov: "Imate postojeću kuću/zgradu/pomoćni objekt koja nije ucrtana ili želite samo ažuritati podatke?", to: "/info/neucrtani-objekti" },
];

// Svaka opcija: [naziv, čemu služi, što je potrebno (odvojeno sa "; ")]
export const usluge = [
  {
    naslov: "Evidentiranje stvarnog stanja, parcelacija/spajanje čestica i drugo",
    opis: "Usklađivanje podataka u katastru i zemljišnoj knjizi sa stanjem na terenu.",
    opcije: [
      ["Elaborat evidentiranja stvarnog stanja/položaja",],
      ["Parcelacijski elaborat",],
      ["Iskolčenje međa",],
      ],
  },
  {
    naslov: "Evidentiranje podataka o zgradama / ucrt zgrada na ktastarskim česticama",
    opis: "Imate neucrtanu kuću/zgradu/pomoćni objekt ili želite ažurirati podatke o vašoj zgradi?",
    opcije: [
      ["Ucrtavanje nove/postojeće zgrade",],
      ["Upisivanje akta o legalnosti zgrade",],
      ["Izmjena podataka o korištenju zgrade",],
      ["Etažni elaborat",],
    ],
  },
  {
    naslov: "Posebne geodetske podloge",
    opcije: [
      ["Geodetska situacija stvarnog stanja",],
      ["Geodetska situacija građevne čestice",],
      ["Geodetski snimak za legalizaciju",],
      ["Zahvat u prostoru",],
      ["Geodetski snimak izvedenog stanja",],
      ["posebne podloge za razne svrhe",],
    ],
  },
  {
    naslov: "Ostale usluge",
    opis: "Razne geodetske usluge koje nisu navedene u prethodnim kategorijama.",
    opcije: [
      ["Iskolčenje međa"],
      ["Analiza i obrada podataka",],
      ["Savjetovanje i konzultacije",],
    ],
  },
];

// Šest koraka, svaki opis ima točno 5 riječi
export const koraci = [
  { naslov: "Upit", opis: "Opišite nam što vam treba" },
  { naslov: "Ponuda", opis: "Ponudu šaljemo unutar jednog tjedna od dana dogovora oko radova" },
  { naslov: "Teren", opis: "Geodet dolazi na vašu česticu i obavlja izm" },
  { naslov: "Obrada podataka", opis: "Obrađujemo mjerene podatke i radimo analizu sa dostupnim arhivskim podacima katastra" },
  { naslov: "Elaborat/Podloga", opis: "Izrada elaborata ili posebnih podloga" },
  { naslov: "Ovjera", opis: "Elaborat ovjerava nadležni katastarski ured" },
  { naslov: "Provedba", opis: "Nakon podnošenja zahtjeva za provedbu, katastar mijenja podatke u katastarskom operatu prema podacima iz elaborata" },
  { naslov: "Predaja", opis: "Gotovu dokumentaciju predajemo vama osobno" },
];

// Najnoviji članak ide prvi. Datum je GGGG-MM-DD.
export const clanci = [
  {
    naslov: "Što je to geodezija i tko su geodeti/geometri?",
    datum: "2026-10-28",
    sazetak: "Geodezija je znanost o mjerenju i prikazivanju Zemljine površine, a geodeti su stručnjaci koji se tim poslom bave. Čitaj= ČAROBNJACI.",
    tekst: [
      "Pošto je geodezija znanost, nije to tek tako napraviti geodetski elaborat ili posebnu geodetsu podlogu.",
      "Kao što je na slici navedeno, geodet je čarobnjak koji iščitava podatke koji nisu nikome jasni, analizira navedene podatke i u stanju je sve to prenijeti strankama, a da ga one ne gledaju blijedo...",
      "U našem poslu, kao i u većini poslova, nema SAMO. To SAMO uvijek za sobom povlači puno više posla nego se može pojmiti.",
      "Naš posao je da svim uključenim strankama, bio to investitor koji je naručio izradu elaborata ili nositelj prava na susjednim katastarskim česticama (čitaj: susjed) zaštitimo njihovo vlasništvo i posjed.",
      "Ne kažu bez veze da je dobrosusjedski odnos jedan od čimbenika sretnog života. Ne, Nije ovo šala. Zamislite da ste u svađi sa susjedom oko međe...Vi tvrdite da je međa OVDJE, a susjed s druge strane govori da nije, ona je TAMO. Nema razloga da se gutaju knedle kada se približavamo toj međi u nadi da se nećete OPET posvađati sa susjedom zato jer je, eto pao kamen sa szida na NJEGOVO...",
      "Kada se zna gdje su međe, kada se geodetskim elaboratom one definirane, tada vam NITKO ne može tvrditi drukčije. Samo zato jer je geodet utvrdio vašu među i katastar to sproveo. Tenzije su uvijek moguće i nakon toga, ali sa ovjerenim elaboratom imate dokaz da je to taok kako piše u njemu.",
      "Geodeti su tu da VAMA pomognu pročitati i shvatiti probleme i njihova rješenja vezano uz vašu česticu/parcelu. Bilo to da li se radi o vašoj čestici/parceli, ili o susjedovoj, neovisno koja je predmet radnje.",
    ],
  },
  {
    naslov: "Što je to geodetski elaborat?",
    datum: "2026-10-06",
    sazetak: "Geodetski elaborat je DOKUMENT koji sadrži geodetske mjere i podatke o položaju i obliku zemljišta ili građevine.",
    tekst: [
      "Geodetski elaborat je AKT ilitiga dokument, koji mora biti potpisan od strane ovlaštenika (inženjera) geodetske struke te ovjeren od strane nadležnog katastarskog ureda.",
      "Ovlaštenik svojim potpisom na elaboratu garantira sve navedene podatke u tom elaboratu, inače može pravno odgovarati za eventualne štete koje bi nastale zbog netočnih podataka u elaboratu.",
      "Isto tako, katastarski ured svojim pečatom na elaboratu potvrđuje da su svi podaci u elaboratu točni i da su provjereni sa svim dostupnim arhivskim podacima katastra.",
      "Bitno je napomenuti da je geodetski plan sklon promjenama, ALI, geodetski elaborat je trajan dokument koji dokazuje da je neka promjena s razlogom provedena i mora biti uzet u obzir pri izradi drugih geodetskih elaborata koji obuhvaćaju okolinu iz tog geodetskog elaborata.",
      "Evo i jedan jednostavan primjer: Vaša čestica je evidentirana geodetskim elaboratom pred, redcimo, 5 godina. U međuvremenu je susjed odlučio evidentirati svoju česticu/parcelu geodetskim elaboratom. Pošto je vaša čestica ranije evidentirana i njene lomne točke su službeno zabilježene u katastru, bilo koji elaborat koji dira vašu među MORA zadržati već utvrđen tok međe. Ako bi se međa mijenjala iz nekog razloga, vi morate svojim potpisom to prihvatiti, inače bi susjed (a i ovlaštenik koji je izradio taj elaborat) omogućio sam sebi da snosi pravnu odgovornost za mijenjanje službenih podataka u katastru bez vašeg pristanka.",
      "Možda zvuči nerealno, ali tako to ide s aktima/dokumentima. Od 2007. godine, kada je katastar prešao na digitalni sustav, svi elaborati su trajno pohranjeni u digitalnom obliku i dostupni su svima koji imaju pristup katastru. Samo je dio (gdje veći, gdje manji broj) ranijih elaborata preneseno u digitalni oblik. Posao geodeta je da sve te podatke iz prijašnjih elaborata sažme u homogenu smjesu podataka koja će u konačnici prikazati realno stanje čestice/parcele kroz povijest od njenog nastanka do danas.",
      "Naravno, Geodet ne zna i nema sve podatke koje biste vi mogli tražiti, ali zato zna gdje ih se može pronaći pa i koga pitati za potrebne informacije. Geodet je tu da VAMA pomogne pročitati i shvatiti probleme i njihova rješenja vezano uz vašu česticu/parcelu. Bilo to da li se radi o vašoj čestici/parceli, ili o susjedovoj, neovisno koja je predmet radnje.",
      "Ukoliko želite saznati više o geodetskim elaboratima, slobodno nas kontaktirajte i rado ćemo Vam pomoći.",
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
