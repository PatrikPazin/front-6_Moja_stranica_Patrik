/* global el, napraviHeader, napraviFooter, clanci, formatirajDatum */
// Stranica jednog članka. Članak se bira iz adrese: clanak.html?id=0

function napraviClanakStranicu() {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const c = clanci[id];

  const main = el("main", "wrap");
  const natrag = el("a", null, "← Natrag na blog");
  natrag.href = "blog.html";

  if (!c) {
    main.append(el("h1", null, "Članak nije pronađen"), natrag);
    return main;
  }

  document.title = c.naslov + " – Geodetske usluge";
  const datum = el("time", "post-date", formatirajDatum(c.datum));
  datum.dateTime = c.datum;

  main.append(datum, el("h1", null, c.naslov));
  c.tekst.forEach(odlomak => main.append(el("p", null, odlomak)));
  main.append(natrag);
  return main;
}

document.getElementById("app").append(
  napraviHeader(),
  napraviClanakStranicu(),
  napraviFooter()
);
