/* global el, napraviHeader, napraviFooter */
// Naslovnica. Zajednički dijelovi (linkovi, el, header, footer) su u zajednicko.js

// ---------- 1. PODACI ----------
// Svaka opcija je: [naziv, čemu služi, što je potrebno (odvojeno sa "; ")]
const usluge = [
  {
    naslov: "Geodetski elaborati",
    opis: "Dokumentacija za upis u katastar i zemljišne knjige.",
    opcije: [
      ["Elaborat za upis/ucrtavanje zgrade", "Upis nove zgrade u katastar.", ],
      ["Parcelacijski elaborat", "Dokumentacija za parcelaciju zemljišta.", "Posjedovni list; kopija plana"],
      ["Elaborat ispravka granice", "Usklađivanje granice sa stanjem na terenu.", "Posjedovni list; suglasnost susjeda"],
    ],
  },
  {
    naslov: "Parcelacija zemljišta",
    opis: "Dijeljenje ili spajanje katastarskih čestica.",
    opcije: [
      ["Dijeljenje čestice", "Razdvajanje jedne čestice na više.", "Posjedovni list; kopija plana; suglasnost suvlasnika"],
      ["Spajanje čestica", "Spajanje susjednih čestica u jednu.", "Posjedovni listovi svih čestica"],
      ["Parcelacija za gradnju", "Priprema čestice za gradnju.", "Lokacijska informacija; posjedovni list"],
    ],
  },
];

// ---------- 2. DIJELOVI STRANICE ----------
function napraviHero() {
  return el("div", "hero ph", "slika (od ruba do ruba)");
}

function prikaziDetalj(box, naziv, sluzi, potrebno) {
  box.replaceChildren(
    el("h3", null, naziv),
    el("p", null, sluzi),
    el("h4", null, "Što je potrebno")
  );
  const ul = el("ul");
  potrebno.split("; ").forEach(t => ul.append(el("li", null, t)));
  box.append(ul);
  box.hidden = false;
}

function napraviKarticu(u) {
  const card = el("article", "card");
  const body = el("div", "card-body");

  const gumb = el("button", "toggle", "Odaberi posao");
  gumb.setAttribute("aria-expanded", "false");

  const menu = el("ul", "menu");
  menu.hidden = true;

  const detalj = el("div", "detail");
  detalj.hidden = true;

  // jedna opcija = jedan gumb u izborniku
  const gumbi = u.opcije.map(([naziv, sluzi, potrebno]) => {
    const li = el("li");
    const b = el("button", "opt", naziv);
    b.addEventListener("click", () => {
      gumbi.forEach(x => x.classList.remove("aktivna"));
      b.classList.add("aktivna");
      prikaziDetalj(detalj, naziv, sluzi, potrebno);
    });
    li.append(b);
    menu.append(li);
    return b;
  });

  // klik na "Odaberi posao" otvara i zatvara izbornik
  gumb.addEventListener("click", () => {
    const otvoreno = gumb.getAttribute("aria-expanded") === "true";
    gumb.setAttribute("aria-expanded", String(!otvoreno));
    menu.hidden = otvoreno;
    if (otvoreno) detalj.hidden = true;
  });

  body.append(el("h2", null, u.naslov), el("p", "card-desc", u.opis), gumb, menu, detalj);
  card.append(el("div", "ph", "slika"), body);
  return card;
}

function napraviGlavni() {
  const main = el("main", "wrap");
  main.id = "usluge";
  usluge.forEach(u => main.append(napraviKarticu(u)));
  return main;
}

// ---------- 3. SKLAPANJE STRANICE ----------
document.getElementById("app").append(
  napraviHeader(),
  napraviHero(),
  napraviGlavni(),
  napraviFooter()
);
