// Mali poslužitelj za upite s obrasca "Kontaktirajte nas" (bez dodatnih paketa, samo Node.js).
// Pokretanje: npm run server   (uz njega u drugom terminalu: npm start)
// Svaki upit se dopisuje u datoteku podaci/upiti.json.
//
// E-POŠTA: nakon spremanja upit se šalje i na tvoju adresu preko servisa Resend (resend.com).
// Postavke su u datoteci .env (vidi .env.example). Bez ključa (RESEND_API_KEY) upit se samo sprema u datoteku.
// Datoteka podaci/upiti.json ostaje kao sigurnosna kopija.

const http = require("http");
const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

try { process.loadEnvFile(path.join(__dirname, "..", ".env")); } catch { /* .env još ne postoji: e-pošta je isključena */ }
const KLJUC = process.env.RESEND_API_KEY;
const ADRESA_ZA_UPITE = process.env.UPIT_EMAIL_NA;                       // kamo stižu upiti (tvoja adresa)
const POSILJATELJ = process.env.UPIT_EMAIL_OD || "Upiti sa stranice <onboarding@resend.dev>"; // za probu; za pravu stranicu adresa s tvoje domene
const resend = KLJUC && ADRESA_ZA_UPITE ? new Resend(KLJUC) : null;

const PORT = process.env.PORT || 5000;
const MAPA = path.join(__dirname, "..", "podaci");
const DATOTEKA = path.join(MAPA, "upiti.json");
const MAX_TIJELO = 20 * 1024; // 20 KB
const MAX_UPITA_PO_MINUTI = 5; // po IP adresi

const IZGLED_ADRESE = /^[^\s@\u0080-\uFFFF]+@[^\s@.\u0080-\uFFFF]+(\.[^\s@.\u0080-\uFFFF]+)*\.[A-Za-z]{2,}$/;

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

// Šalje upit na našu adresu. "reply-to" je adresa posjetitelja, pa odgovor ide izravno njemu.
async function posaljiEmail(u) {
  if (!resend) { console.log("E-pošta isključena (nema RESEND_API_KEY ili UPIT_EMAIL_NA u .env). Upit je samo spremljen."); return false; }
  const bezRedaka = t => t.replace(/[\r\n]+/g, " ");
  const { error } = await resend.emails.send({
    from: POSILJATELJ,
    to: [ADRESA_ZA_UPITE],
    replyTo: u.email,
    subject: `Novi upit: ${bezRedaka(u.ime)}`,
    text: `Ime i prezime: ${u.ime}
E-mail: ${u.email}
Telefon: ${u.telefon || "-"}

Opis upita:
${u.opis}
`,
  });
  if (error) { console.error("Slanje e-pošte nije uspjelo:", error); return false; }
  return true;
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
      // upit je spremljen; ako e-pošta zakaže, posjetitelj ipak dobije potvrdu (upit nije izgubljen)
      const poslano = await posaljiEmail(upit).catch(e => { console.error("Slanje e-pošte nije uspjelo:", e); return false; });
      odgovori(res, 201, { ok: true, email: poslano });
    } catch (e) {
      console.error("Spremanje upita nije uspjelo:", e);
      odgovori(res, 500, { greska: "Upit nije spremljen." });
    }
  });
});

server.listen(PORT, () => console.log(`Poslužitelj za upite radi na http://localhost:${PORT}, upiti idu u ${DATOTEKA}`));
