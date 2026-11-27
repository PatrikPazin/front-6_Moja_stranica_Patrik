// Svi sadržaji stranice na jednom mjestu. Zamijeni tekstove svojima.

export const linkovi = [
  { naziv: "Početna", to: "/#pocetna", sekcija: "pocetna" },
  { naziv: "Postupak", to: "/#postupak", sekcija: "postupak" },
  { naziv: "Blog", to: "/#blog", sekcija: "blog" },
  { naziv: "O nama", to: "/#o-nama", sekcija: "o-nama" },
  { naziv: "Kontaktirajte nas", to: "/#kontakt", sekcija: "kontakt" },
  // Privremeno skriveno iz izbornika (stranice /login i /novi-korisnik i dalje postoje). Odkomentiraj za povratak:
  // { naziv: "Prijava", to: "/login" },
  // { naziv: "Novi korisnik", to: "/novi-korisnik" },
];

// Stranica "Slike". Svaka slika: src (npr. "/images/slika-1.jpg", iz public/images),
// alt (opis slike), opis (tekst ispod slike) i po želji link (naziv = ključna riječ, to = kamo vodi).
// Dok nema "src", prikazuje se prazan okvir. Zamijeni primjere svojima.
export const slike = [
  { naslov: "Primjer slike 1", src: "", alt: "", opis: "Kratki opis uz sliku.", link: { naziv: "Postupak", to: "/postupak" } },
  { naslov: "Primjer slike 2", src: "", alt: "", opis: "Kratki opis uz sliku." },
];

// Stranica "O nama". Primjer tekstova, zamijeni svojima.
export const oNama = {
  uvod: "Geodetski ured s dugogodišnjim iskustvom. Naš cilj je da vam složen postupak objasnimo jednostavno i riješimo ga brzo i točno te olakšali Vam rješavanje imovinsko-pravnih predmeta.",
  vrijednosti: [
    { naslov: "Stručnost", opis: "Ovlašteni inženjeri geodezije i suradnici sa višegodišnjim iskustvom." },
    { naslov: "Jasna komunikacija", opis: "Unaprijed objašnjavamo korake, rokove i troškove te stojimo na raspolaganju za dodatna dogovaranja i promjene." },
    { naslov: "Točnost i rokovi", opis: "Mjerenja i geodetski elaborati izrađuju se pažljivo, odgovorno i u dogovorenom roku." },
  ],
};

// Primjer podataka, zamijeni svojima
export const kontakt = {
  tel: "+385 52 123 456",
  mob: "+385 91 234 5678",
  email: "info@geopiket.hr",
  adresa: "Ulica primjera 1, 52000 Pazin",
  oib: "00000000000 (primjer)", // izmišljeni broj za školski projekt
};

// Kartice u carouselu na stranici Usluge. "to" je adresa stranice na koju kartica vodi
// (za sada prazna stranica "Sadržaj uskoro", vidi Info.js).
export const carouselKartice = [
  { naslov: "Gradite kuću? Evo što vam je potrebno prije građevinskih radova.", to: "/info/gradevinska-dozvola" },
  { naslov: "Želite znati gdje su točno vaše međe ili ih želite ponovno označiti?", to: "/info/mede" },
  { naslov: "Imate postojeću kuću, zgradu ili pomoćni objekt koji nije ucrtan ili samo želite ažurirati podatke?", to: "/info/neucrtani-objekti" },
];

// Svaka opcija: [naziv, čemu služi, što je potrebno (odvojeno sa "; ")]
export const usluge = [
  {
    naslov: "Evidentiranje stvarnog stanja, parcelacija/spajanje čestica i drugo",
    opis: "Usklađivanje podataka u katastru i zemljišnoj knjizi sa stanjem na terenu.",
    slika: "/images/main-1-web.jpg", // smanjena kopija (1200px) originala main-1.jpg
    slikaAlt: "Granični biljeg: kameni stup s natpisom Grenzpunkt i crveno-plava obojana cijev u jesenskom lišću",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    opcije: [
      ["Elaborat evidentiranja stvarnog stanja/položaja",],
      ["Parcelacijski elaborat",],
      ["Iskolčenje međa",],
      ],
  },
  {
    naslov: "Evidentiranje podataka o zgradama / ucrtavanje zgrada na katastarskim česticama",
    opis: "Imate neucrtanu kuću, zgradu ili pomoćni objekt ili želite ažurirati podatke o vašoj zgradi?",
    slika: "/images/main-2-web.jpg", // smanjena kopija (900px) originala main-2.jpg
    slikaAlt: "Dječji crtež kuće drvenim bojicama: plavi krov, ljubičasti zidovi, žuti prozori i zelena vrata",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    opcije: [
      ["Ucrtavanje nove/postojeće zgrade",],
      ["Upisivanje akta o legalnosti zgrade",],
      ["Izmjena podataka o korištenju zgrade",],
      ["Etažni elaborat",],
    ],
  },
  {
    naslov: "Posebne geodetske podloge",
    slika: "/images/main-3-web.jpg", // smanjena kopija (1200px) originala main-3.jpg
    slikaAlt: "Hrpa starih papirnatih zemljovida i planova gradova razbacanih po tamnoj podlozi",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    opcije: [
      ["Geodetska situacija stvarnog stanja",],
      ["Geodetska situacija građevne čestice",],
      ["Geodetski snimak za legalizaciju",],
      ["Zahvat u prostoru",],
      ["Geodetski snimak izvedenog stanja",],
      ["Posebne podloge za razne svrhe",],
    ],
  },
  {
    naslov: "Ostale usluge",
    opis: "Razne geodetske usluge koje nisu navedene u prethodnim kategorijama.",
    slika: "/images/main-4-web.jpg", // smanjena kopija (1200px) originala main-4.jpg
    slikaAlt: "Dron s kamerom na popločenoj površini ispred živice",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    opcije: [
      ["Analiza i obrada podataka",],
      ["Snimanje terena dronom i izrada DOF-a",],
      ["Savjetovanje i konzultacije",],
    ],
  },
];

// Koraci postupka, od upita do predaje dokumentacije
export const koraci = [
  // "to" = stranica na koju vodi naslov kartice (bez "to" naslov nije klikabilan)
  { naslov: "Upit i ponuda", opis: "Opišite nam što vam treba i kako vam možemo pomoći. Ponudu šaljemo u roku od tjedan dana od dogovora.", to: "/#o-nama" },
  { naslov: "Teren i obrada podataka", opis: "Geodet dolazi na vašu česticu i obavlja izmjeru. Obrađujemo izmjerene podatke i radimo analizu s dostupnim arhivskim podacima katastra." },
  { naslov: "Elaborat/Podloga", opis: "Izrada elaborata ili posebnih podloga", to: "/#blog" },
  { naslov: "Ovjera i provedba", opis: "Elaborat ovjerava nadležni katastarski ured. Nakon podnošenja zahtjeva za provedbu, katastar mijenja podatke u katastarskom operatu prema podacima iz elaborata." },
  { naslov: "Predaja", opis: "Gotovu dokumentaciju predajemo vama osobno", to: "/#blog" },
];

// Najnoviji članak ide prvi. Datum je GGGG-MM-DD.
// Ako je slika preuzeta s tuđe stranice, dodaj članku polje izvor, npr.
//   izvor: "Izvor slike: nazivstranice.hr",
// i ono se prikaže sitno ispod gumba (isto vrijedi za kartice u "slike" niže).
export const clanci = [
  {
    naslov: "Što je to geodezija i tko su geodeti/geometri?",
    datum: "2026-01-03",
    slika: "/images/blog-1.svg",
    slikaAlt: "Ilustracija uz članak",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    sazetak: "Geodezija je znanost o mjerenju i prikazivanju Zemljine površine, a geodeti (čitaj: čarobnjaci) su stručnjaci koji se tim poslom bave.",
    tekst: [
      "Budući da je geodezija znanost, nije tek tako izraditi geodetski elaborat ili posebnu geodetsku podlogu.",
      "Geodezija je jako staro zanimanje (zemljomjerstvo) koje su prije nekoliko tisuća godina koristile drevne civilizacije Mezopotamije i Egipta. Zamislite to… Prije modernog doba, prije aviona, prije industrijske revolucije… Možda su i Rimljani davno prije izmjerili koliki teritorij mogu obuhvatiti, pa tek onda krenuli u svoje ratne pohode?",
      "Sa sigurnošću znam podatak koji sam čuo još u srednjoj školi: Egipćani su mjerili zemlju oko rijeke Nila prije i nakon što bi rijeka nabujala od oborina, da bi znali gdje se što nalazilo prije nego što je voda odnijela sve pred sobom, tko je što obrađivao u blizini, te da bi mogli izračunati nastalu štetu i tko zna što sve još…",
      "Kao što je na slici navedeno, geodet je čarobnjak koji iščitava podatke koji nisu nikome jasni, analizira navedene podatke i u stanju je sve to prenijeti strankama, a da ga one ne gledaju blijedo…",
      "U našem poslu, kao i u većini poslova, nema „samo”. To „samo” uvijek za sobom povlači puno više posla nego što se može pojmiti.",
      "Naš je posao da svim uključenim strankama, bio to investitor koji je naručio izradu elaborata ili nositelj prava na susjednim katastarskim česticama (čitaj: susjed), zaštitimo njihovo vlasništvo i posjed.",
      "Ne kažu bez veze da je dobrosusjedski odnos jedan od čimbenika sretnog života. Ne, nije ovo šala. Zamislite da ste u svađi sa susjedom oko međe… Vi tvrdite da je međa „ovdje”, a susjed s druge strane govori da nije, da je „tamo”. Nema razloga da gutate knedle kada se približavate toj međi, u nadi da se nećete opet posvađati sa susjedom zato što je, eto, kamen sa zida pao na njegovo zemljište…",
      "Kada se zna gdje su međe, kada su geodetskim elaboratom definirane, tada vam nitko ne može tvrditi drukčije, samo zato što je geodet utvrdio vašu među i katastar je proveo. Napetosti su uvijek moguće i nakon toga, ali s ovjerenim elaboratom imate dokaz da je tako kako piše u njemu.",
      "Geodeti su tu da vama pomognu pročitati i shvatiti probleme i njihova rješenja vezana uz vašu česticu/parcelu. Bilo da se radi o vašoj čestici/parceli ili o susjedovoj, neovisno o tome koja je predmet radnje.",
    ],
  },

  {
    naslov: "Kada vam je potreban geodet?",
    datum: "2026-01-10",
    slika: "/images/blog-2-web.jpg", // smanjena kopija originala blog-2.jpg
    slikaAlt: "Muškarac u sivoj košulji gleda na ručni sat",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    sazetak: "Kupnja zemljišta, gradnja, dioba čestice: kratki pregled situacija.",
    tekst: [
      "Geodet je potreban kad se mijenja nešto na čestici ili u njezinim podacima: kod diobe ili spajanja čestica, gradnje i upisa zgrade.",
      "Prije kupnje zemljišta korisno je provjeriti odgovaraju li položaj, oblik i površina onima upisanima u katastru i zemljišnoj knjizi.",
      "Ucrtavate novu kuću ili imate neucrtanu postojeću kuću, zgradu ili građevinu, a želite je upisati da bude vidljiva u katastru i zemljišnoj knjizi.",
      "Želite prenamijeniti postojeću zgradu (recimo, iz garaže u stambeni prostor ili obrnuto).",
      "Naslijedili ste zemlju s kućom ili bez nje, ili kuću/zgradu bez zemlje. Geodet vam može provjeriti sve podatke vezane uz to i po zahtjevu ih ažurirati geodetskim elaboratom.",
      "Želite prenamjenu površine zemljišta (promjenu kulture korištenja), recimo iz pašnjaka u oranicu ili iz oranice u maslinik.",
      "Ima i drugih razloga zbog kojih vam je potreban geodet.",
      "Nažalost, toga postanemo svjesni tek kada postane hitno. A sve se to može riješiti na vrijeme, a da ne nastanu problemi. Ne košta malo, ali ne košta ni previše da biste imali čiste papire te se samim time lakše nosili s mogućim problemima s međama i susjedima.",
    ],
  },

  {
    naslov: "Što je to geodetski elaborat?",
    datum: "2026-02-01",
    slika: "/images/blog-3-web.png", // smanjena kopija originala blog-3.png (PNG zbog prozirnosti)
    slikaAlt: "Žuta sjajna kugla s natpisom What (Što)",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    sazetak: "Geodetski elaborat je dokument koji sadrži geodetske mjere i podatke o položaju i obliku zemljišta ili građevine.",
    tekst: [
      "Geodetski elaborat je akt, odnosno dokument, koji mora potpisati ovlaštenik (inženjer) geodetske struke te ovjeriti nadležni katastarski ured.",
      "Ovlaštenik svojim potpisom jamči za sve podatke u elaboratu te može pravno odgovarati za eventualne štete nastale zbog netočnih podataka.",
      "Isto tako, katastarski ured svojim pečatom na elaboratu potvrđuje da je elaborat tehnički ispravan i da su podaci provjereni sa svim dostupnim arhivskim podacima katastra.",
      "Bitno je napomenuti da je geodetski plan sklon promjenama, ali geodetski elaborat je trajan dokument koji dokazuje da je neka promjena provedena s razlogom i mora se uzeti u obzir pri izradi drugih geodetskih elaborata koji obuhvaćaju okolinu tog elaborata.",
      "Evo jednog jednostavnog primjera: vaša čestica evidentirana je geodetskim elaboratom prije, recimo, pet godina. U međuvremenu je susjed odlučio evidentirati svoju česticu/parcelu geodetskim elaboratom. Budući da je vaša čestica ranije evidentirana i njezine su lomne točke službeno zabilježene u katastru, bilo koji elaborat koji dotiče vašu među mora zadržati već utvrđeni tok međe. Ako bi se međa iz nekog razloga mijenjala, vi to morate prihvatiti svojim potpisom. Inače bi se susjed (a i ovlaštenik koji je izradio taj elaborat) izložio pravnoj odgovornosti za mijenjanje službenih podataka u katastru bez vašeg pristanka.",
      "Možda zvuči nerealno, ali tako to ide s aktima/dokumentima. Od 2007. godine, kada je katastar prešao na digitalni sustav, svi su elaborati trajno pohranjeni u digitalnom obliku i dostupni su svima koji imaju pristup katastru. Samo je dio ranijih elaborata (negdje veći, negdje manji) prenesen u digitalni oblik. Posao je geodeta da sve te podatke iz prijašnjih elaborata sažme u cjelinu koja će u konačnici prikazati realno stanje čestice/parcele kroz povijest, od njezina nastanka do danas.",
      "Naravno, geodet ne zna i nema sve podatke koje biste vi mogli tražiti, ali zna gdje ih se može pronaći pa i koga pitati za potrebne informacije. Geodet je tu da vama pomogne pročitati i shvatiti probleme i njihova rješenja vezana uz vašu česticu/parcelu. Bilo da se radi o vašoj čestici/parceli ili o susjedovoj, neovisno o tome koja je predmet radnje.",
      "Ako želite saznati više o geodetskim elaboratima, slobodno na internetu pronađite vama najbliži geodetski ured i raspitajte se o svojoj nekretnini.",
      "Izrada geodetskog elaborata nije posao od samo jednog ili dva dana. Iza jednog elaborata, pa i najlakšeg mogućeg, stoji dovoljno posla da opravda svoj trošak.",
      "Nažalost, u tom poslu nema „samo”. Još u srednjoj školi nas uče da je 1 mm na planu otprilike 1 m na terenu, ovisno o mjerilu prikazivanja tih podataka.",
      "Ali nije sve tako crno, ili sivo. Geodet je tu da vama pomogne u području nekretnina kao što vam doktor pomaže s vašim zdravljem.",
      "Bilo da se radi o diobi čestice, evidentiranju stvarnog položaja ili izradi podloge za gradnju kuće, jedino to smije raditi geodet.",
    ],
  },

  {
    naslov: "Koliko traje izrada geodetskog elaborata?",
    datum: "2026-02-15",
    slika: "/images/blog-4.svg",
    slikaAlt: "Ilustracija uz članak",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    sazetak: "Ovisi o vrsti posla, količini izmjerenih podataka, vremenskim uvjetima i, naposljetku, brzini katastarskog ureda u kontroli tehničke ispravnosti elaborata.",
    tekst: [
      "Sve počinje ugovaranjem posla, nastavlja se terenskom izmjerom vaše nekretnine, obradom podataka i analizom, a privodi se kraju slaganjem elemenata elaborata. Ali to nije kraj.",
      "Jedna od obveznih radnji je terenski uviđaj, koji je definiran pravilnikom struke. Geodet je dužan pozvati sve nositelje prava na česticama koje su predmet elaborata (čitaj: susjede) na pokazivanje predloženih međa i prikupiti suglasnosti svih susjeda o tome slažu li se s prikazanim međama. Tek kad se to odradi, elaborat može ići u završnu realizaciju i biti složen do kraja. Još samo nedostaju vaša kontrola i potpisi na potrebnim potpisnim listama, pa je elaborat spreman za slanje u katastar.",
      "E, tu može doći do najvećeg zastoja. U pravilu katastar ima 30 dana da ovjeri vaš elaborat, ali to može potrajati i dulje (u pravilu je i dulje…). Kada se katastar smiluje i naš predmet ode na red, ako je elaborat tehnički ispravan, vaš će vas geodet kontaktirati da potpišete još jedan papir, a taj je papir najvažniji od svega dosad. Taj je papir zahtjev za upravni postupak za provedbu tog elaborata u katastarskom operatu. Bez toga je elaborat samo prošao provjeru tehničke ispravnosti, a svi ti podaci nisu preneseni u bazu zemljišnih podataka niti na vlasnički list i katastarski plan. Tek kad se elaborat provede, ti će podaci biti vidljivi.",
      "Znači, ako imate sreće, elaborat će biti gotov u roku od mjesec do mjesec i pol. Ako nemate sreće, bit će gotov u roku od tri mjeseca. Ako pak nemate nikakve sreće, e, tada se može čekati čak šest mjeseci i više… ali za to u pravilu nije kriv geodet, a u većini slučajeva upravo geodet prima sve kritike…",
      "Zato vas molim, nemojte biti previše ljuti na geodeta. On radi svoj posao kao i svatko drugi…",
    ],
  },

  {
    naslov: "Što je to terenski uviđaj?",
    datum: "2026-03-02",
    slika: "/images/blog-5-web.jpg", // smanjena kopija originala blog-5.png
    slikaAlt: "Crtani prikaz dvojice susjeda koji razgovaraju sjedeći u sklopivim stolicama ispred kuće",
    izvor: "Izvor slike: Pixabay (pixabay.com)",
    sazetak: "Terenski uviđaj je događaj na kojem upoznajete susjede za koje niste znali da su vam susjedi, kao i one za koje ste znali.",
    tekst: [
      "Terenski uviđaj je postupak kojim se pozivaju svi nositelji prava na predmetnim i susjednim katastarskim česticama da im se pokaže predložena međa koju je geodet rekonstruirao nakon mjerenja i analize podataka.",
      "Pozive na terenski uviđaj potrebno je slati poštom na adrese nositelja prava radi potvrde o slanju i primitku pošiljke. To znači da geodet mora sastaviti poziv za terenski uviđaj, staviti ga u omotnicu i poslati preko Hrvatske pošte. Pozivi se ne moraju slati samo ako osobno poznajete sve svoje susjede i možete od njih dobiti potpis da su suglasni s prikazanim međama. Inače, ako geodet nema potvrdu o slanju poziva, elaborat ne može biti ovjeren.",
      "Ako nema međususjedskih tenzija, terenski uviđaj u načelu prolazi glatko. Geodet označi predložene međe, susjedi pogledaju kako to izgleda i iznose svoje mišljenje, bilo to slaganje ili neslaganje.",
      "Ako se susjedi slože, onda fantastično. Međa je potvrđena i može se tako prikazati.",
      "Ako se susjedi ne slože, a ni vi se ne slažete s njihovom tvrdnjom o tome gdje bi trebala biti međa, tu uskače geodet koji će obrazložiti zašto je predložena međa tamo gdje ju je označio. Svi se argumenti saslušaju i uvaže, s obje strane. Tek kad se dođe do realnog rješenja i, po potrebi, kompromisa, međa se može smatrati definiranom. Malo tko želi pokrenuti sudski spor oko međe zato što misli da je negdje tu međa. Sudski spor košta, i to ne malo novaca.",
      "Kada se sakupe potpisi svih prisutnih i kada nitko više nema primjedbi na međe, terenski uviđaj se može smatrati gotovim i elaborat može nastaviti svojim tokom.",
    ],
  },
];
