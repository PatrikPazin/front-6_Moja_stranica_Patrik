/* global el, napraviHeader, napraviFooter, clanci, formatirajDatum */
// Blog stranica. Zajednički dijelovi su u zajednicko.js, a članci u clanci.js

function napraviClanak(c, id) {
  const card = el("article", "card");
  const body = el("div", "card-body");

  const datum = el("time", "post-date", formatirajDatum(c.datum));
  datum.dateTime = c.datum;

  // link na stranicu s cijelim tekstom članka
  const gumb = el("a", "toggle", "Pročitaj cijeli članak");
  gumb.href = "clanak.html?id=" + id;

  body.append(datum, el("h2", null, c.naslov), el("p", "card-desc", c.sazetak), gumb);
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
  clanci.forEach((c, id) => main.append(napraviClanak(c, id)));
  return main;
}

document.getElementById("app").append(
  napraviHeader(),
  napraviBlog(),
  napraviFooter()
);
