// ---------- ZAJEDNIČKI DIJELOVI ----------
// Učitava se na svim stranicama, prije skripte same stranice (app.js, blog.js)

// Linkovi vode na index.html jer se izbornik prikazuje i na blogu.
// Kontakt je u podnožju svake stranice, pa mu je dovoljan "#kontakt".
const linkovi = [
  { naziv: "Usluge", href: "index.html#usluge" },
  { naziv: "Postupak", href: "index.html#postupak" },
  { naziv: "O nama", href: "index.html#o-nama" },
  { naziv: "Blog", href: "blog.html" },
  { naziv: "Kontakt", href: "#kontakt" },
];

// Napravi element, dodijeli mu klasu i tekst
function el(tag, klasa, tekst) {
  const e = document.createElement(tag);
  if (klasa) e.className = klasa;
  if (tekst) e.textContent = tekst;
  return e;
}

function napraviHeader() {
  const header = el("header", "header");
  const unutra = el("div", "header-in");
  const logo = el("a", "logo", "Geodetski ured");
  logo.href = "index.html";
  const nav = el("nav", "nav");
  linkovi.forEach(l => {
    const a = el("a", null, l.naziv);
    a.href = l.href;
    // označi link stranice na kojoj se nalazimo (npr. "Blog" na blog.html)
    if (location.pathname.endsWith(l.href)) a.setAttribute("aria-current", "page");
    nav.append(a);
  });
  unutra.append(logo, nav);
  header.append(unutra);
  return header;
}

function napraviFooter() {
  const f = el("footer", "footer", "Podnožje stranice – kontakt podaci");
  f.id = "kontakt";
  return f;
}
