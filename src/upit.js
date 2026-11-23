import { kontakt } from './data';

// Slanje upita: gumb "Pošaljite upit" u podnožju (Footer.js).
// Sada radi samo način 1 (mailto). Načini 2 i 3 su pripremljeni kao komentar i čekaju aktivaciju.

// ---------------------------------------------------------------------------------------
// NAČIN 1 (AKTIVAN): mailto — otvara novu poruku u e-mail programu koji korisnik ima
// na uređaju, s upisanom našom adresom. Predmet i tekst upisuje korisnik.
// ---------------------------------------------------------------------------------------
export const mailtoAdresa = `mailto:${kontakt.email}`;

// ---------------------------------------------------------------------------------------
// NAČIN 2 (ZA KASNIJE): korisnik bira svoj web-poslužitelj e-pošte (Gmail, Outlook, ...)
// i otvara se nova poruka izravno u njemu, s upisanom našom adresom.
//
// 1) Odkomentiraj ovaj dio:
//
// export const webPosluzitelji = [
//   { naziv: "Gmail",   url: a => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(a)}` },
//   { naziv: "Outlook", url: a => `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(a)}` },
//   { naziv: "Yahoo",   url: a => `https://compose.mail.yahoo.com/?to=${encodeURIComponent(a)}` },
//   { naziv: "Proton",  url: a => `https://mail.proton.me/compose?to=${encodeURIComponent(a)}` },
//   { naziv: "Moj e-mail program", url: a => `mailto:${a}` }, // zadano: mailto kao sada
// ];
//
// 2) U Footer.js zamijeni <a ... className="btn gumb-upit"> izbornikom, npr.:
//
//   <div className="dropdown">   {/* ili običan <select> */}
//     {webPosluzitelji.map(p => (
//       <a key={p.naziv} className="btn gumb-upit" href={p.url(kontakt.email)} target="_blank" rel="noopener noreferrer">
//         {p.naziv}
//       </a>
//     ))}
//   </div>
//
// Napomena: izbor poslužitelja možeš zapamtiti u localStorage da korisnik ne bira svaki put.
// ---------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
// NAČIN 3 (KAD BUDE SERVER): upit se šalje na naš poslužitelj (REST API), koji ga
// proslijedi na našu e-mail adresu. Korisnik ne treba nikakav e-mail program.
//
// export async function posaljiUpit({ ime, email, poruka }) {
//   const odgovor = await fetch("/api/upit", {           // adresu prilagodi svom poslužitelju
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ ime, email, poruka }),
//   });
//   if (!odgovor.ok) throw new Error("Upit nije poslan. Pokušajte ponovno.");
//   return odgovor.json();
// }
//
// Poslužitelj mora: provjeriti i očistiti unos, ograničiti broj upita (rate limit),
// po mogućnosti CAPTCHA, i poslati poruku na kontakt.email.
// Tada u Footeru umjesto poveznice ide gumb koji otvara obrazac (ime, e-mail, poruka).
// ---------------------------------------------------------------------------------------
