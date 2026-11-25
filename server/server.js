// Mali poslužitelj za upite s obrasca "Kontaktirajte nas" (bez dodatnih paketa, samo Node.js).
// Pokretanje: npm run server   (uz njega u drugom terminalu: npm start)
// Svaki upit se dopisuje u datoteku podaci/upiti.json.
//
// KASNIJE: kad stranica bude na pravom poslužitelju, ovdje se (na mjestu označenom
// "E-POŠTA") dodaje slanje upita na tvoju e-mail adresu, npr. paketom nodemailer.
// Datoteka ostaje kao sigurnosna kopija.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;
const MAPA = path.join(__dirname, "..", "podaci");
const DATOTEKA = path.join(MAPA, "upiti.json");
const MAX_TIJELO = 20 * 1024; // 20 KB
const MAX_UPITA_PO_MINUTI = 5; // po IP adresi

const IZGLED_ADRESE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

function procitaj() {
  try {
    const popis = JSON.parse(fs.readFileSync(DATOTEKA, "utf8"));
    return Array.isArray(popis) ? popis : [];
  } catch {
    return [];
  }
}

// Zapisi se redaju jedan za drugim, da se dva istodobna upita ne prepišu
let red = Promise.resolve();
function spremi(upit) {
  red = red.then(() => {
    fs.mkdirSync(MAPA, { recursive: true });
    const popis = procitaj();
    popis.push(upit);
    const privremena = DATOTEKA + ".tmp";
    fs.writeFileSync(privremena, JSON.stringify(popis, null, 2), "utf8");
    fs.renameSync(privremena, DATOTEKA);
  });
  return red;
}

const pokusaji = new Map(); // ip -> vremena zadnjih upita
function previseUpita(ip) {
  const sad = Date.now();
  const nedavni = (pokusaji.get(ip) || []).filter(t => sad - t < 60000);
  nedavni.push(sad);
  pokusaji.set(ip, nedavni);
  return nedavni.length > MAX_UPITA_PO_MINUTI;
}

function provjeri(p) {
  const tekst = v => (typeof v === "string" ? v.trim() : "");
  const ime = tekst(p.ime), opis = tekst(p.opis), email = tekst(p.email), telefon = tekst(p.telefon);
  if (!ime || ime.length > 100) return { greska: "Ime i prezime nisu valjani." };
  if (!opis || opis.length > 5000) return { greska: "Opis upita nije valjan." };
  if (!IZGLED_ADRESE.test(email) || email.length > 200) return { greska: "E-mail adresa nije valjana." };
  if (telefon && (!/^\+?[\d\s()/-]+$/.test(telefon) || telefon.replace(/\D/g, "").length < 6 || telefon.length > 40)) {
    return { greska: "Telefon nije valjan." };
  }
  return { upit: { ime, email, telefon, opis } };
}

function odgovori(res, status, tijelo) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(tijelo));
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/api/upit") return odgovori(res, 404, { greska: "Nije pronađeno." });
  if (previseUpita(req.socket.remoteAddress)) return odgovori(res, 429, { greska: "Previše upita. Pokušajte kasnije." });

  let tijelo = "";
  let preveliko = false;
  req.on("data", dio => {
    tijelo += dio;
    if (tijelo.length > MAX_TIJELO) { preveliko = true; req.destroy(); }
  });
  req.on("end", async () => {
    if (preveliko) return;
    let podaci;
    try { podaci = JSON.parse(tijelo); } catch { return odgovori(res, 400, { greska: "Neispravan zahtjev." }); }
    const rez = provjeri(podaci || {});
    if (rez.greska) return odgovori(res, 400, { greska: rez.greska });

    const upit = { primljeno: new Date().toISOString(), ...rez.upit };
    try {
      await spremi(upit);
      // E-POŠTA: ovdje dodati slanje upita na tvoju adresu (npr. nodemailer).
      odgovori(res, 201, { ok: true });
    } catch (e) {
      console.error("Spremanje upita nije uspjelo:", e);
      odgovori(res, 500, { greska: "Upit nije spremljen." });
    }
  });
});

server.listen(PORT, () => console.log(`Poslužitelj za upite radi na http://localhost:${PORT}, upiti idu u ${DATOTEKA}`));
