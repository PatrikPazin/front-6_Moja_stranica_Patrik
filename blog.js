/* global el, napraviHeader, napraviFooter */
// Blog stranica. Zajednički dijelovi (linkovi, el, header, footer) su u zajednicko.js

// ---------- 1. PODACI ----------
// Svaki članak: naslov, datum (GGGG-MM-DD), sažetak i tekst (jedan string = jedan odlomak).
// Članci su primjeri, zamijeni ih svojim tekstovima. Najnoviji ide prvi.
const clanci = [
  {
    
    naslov: "Kada su vam potrebne geodetske usluge?",
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

// ---------- 2. DIJELOVI STRANICE ----------
// "2026-10-28" -> "28. listopada 2026."
function formatirajDatum(iso) {
  return new Date(iso + "T00:00").toLocaleDateString("hr-HR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function napraviClanak(c) {
  const card = el("article", "card");
  const body = el("div", "card-body");

  const datum = el("time", "post-date", formatirajDatum(c.datum));
  datum.dateTime = c.datum;

  const tekst = el("div", "post-text");
  c.tekst.forEach(odlomak => tekst.append(el("p", null, odlomak)));
  tekst.hidden = true;

  // isti princip kao "Odaberi posao" na naslovnici
  const gumb = el("button", "toggle", "Pročitaj cijeli članak");
  gumb.setAttribute("aria-expanded", "false");
  gumb.addEventListener("click", () => {
    const otvoreno = gumb.getAttribute("aria-expanded") === "true";
    gumb.setAttribute("aria-expanded", String(!otvoreno));
    tekst.hidden = otvoreno;
  });

  body.append(datum, el("h2", null, c.naslov), el("p", "card-desc", c.sazetak), gumb, tekst);
  card.append(el("div", "ph", "slika"), body);
  return card;
}

function napraviBlog() {
  const main = el("main", "wrap");
  main.id = "blog";
  main.append(
    el("h1", null, "Blog"),
    el("p", "card-desc", "Savjeti i objašnjenja geodetskih postupaka.")
  );
  clanci.forEach(c => main.append(napraviClanak(c)));
  return main;
}

// ---------- 3. SKLAPANJE STRANICE ----------
document.getElementById("app").append(
  napraviHeader(),
  napraviBlog(),
  napraviFooter()
);
