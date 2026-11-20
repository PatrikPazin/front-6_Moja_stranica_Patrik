// PRIVREMENA "baza" korisnika: sprema se u localStorage preglednika (samo na ovom računalu).
// Služi samo za školski projekt. Kad se napravi pravi poslužitelj, zamijeni ove funkcije.
// Lozinke se ne spremaju kao običan tekst, nego kao SHA-256 hash sa soli.

import { useSyncExternalStore } from 'react';

export const MAX_KORISNIKA = 10;
const KLJUC = "geodetski_korisnici";
const KLJUC_PRIJAVA = "geodetski_prijavljen";

export function ucitajKorisnike() {
  try {
    const popis = JSON.parse(localStorage.getItem(KLJUC));
    return Array.isArray(popis) ? popis : [];
  } catch {
    return [];
  }
}

function spremi(popis) {
  localStorage.setItem(KLJUC, JSON.stringify(popis));
}

async function hash(lozinka, sol) {
  if (!window.crypto?.subtle) throw new Error("Preglednik ne podržava sigurno spremanje lozinke.");
  const bajtovi = new TextEncoder().encode(sol + lozinka);
  const sazetak = await window.crypto.subtle.digest("SHA-256", bajtovi);
  return Array.from(new Uint8Array(sazetak), b => b.toString(16).padStart(2, "0")).join("");
}

const normaliziraj = email => email.trim().toLowerCase();

// Vraća { ok: true } ili { ok: false, greska: "tekst" }
export async function registriraj({ ime, prezime, ulica, mjesto, email, lozinka }) {
  try {
    const popis = ucitajKorisnike();
    if (popis.length >= MAX_KORISNIKA) {
      return { ok: false, greska: `Baza je puna (najviše ${MAX_KORISNIKA} korisnika).` };
    }
    if (popis.some(k => k.email === normaliziraj(email))) {
      return { ok: false, greska: "Korisnik s tom e-mail adresom već postoji." };
    }
    const sol = Array.from(window.crypto.getRandomValues(new Uint8Array(8)), b => b.toString(16).padStart(2, "0")).join("");
    popis.push({
      ime: ime.trim(), prezime: prezime.trim(), ulica: ulica.trim(), mjesto: mjesto.trim(),
      email: normaliziraj(email), sol, lozinkaHash: await hash(lozinka, sol),
    });
    spremi(popis);
    return { ok: true };
  } catch (e) {
    return { ok: false, greska: e.message || "Spremanje nije uspjelo." };
  }
}

// Vraća { ok: true, korisnik } ili { ok: false, greska }
export async function prijavi(email, lozinka) {
  try {
    const korisnik = ucitajKorisnike().find(k => k.email === normaliziraj(email));
    if (!korisnik || korisnik.lozinkaHash !== await hash(lozinka, korisnik.sol)) {
      return { ok: false, greska: "Pogrešna e-mail adresa ili lozinka." };
    }
    sessionStorage.setItem(KLJUC_PRIJAVA, korisnik.email);
    javiPromjenu();
    return { ok: true, korisnik: { ime: korisnik.ime, prezime: korisnik.prezime, email: korisnik.email } };
  } catch (e) {
    return { ok: false, greska: e.message || "Prijava nije uspjela." };
  }
}

export function prijavljeniKorisnik() {
  const email = sessionStorage.getItem(KLJUC_PRIJAVA);
  const k = email && ucitajKorisnike().find(x => x.email === email);
  return k ? { ime: k.ime, prezime: k.prezime, email: k.email } : null;
}

export function odjavi() {
  sessionStorage.removeItem(KLJUC_PRIJAVA);
  javiPromjenu();
}

// Obavijest ostalim dijelovima stranice (npr. izborniku) da se stanje prijave promijenilo
const slusatelji = new Set();
function javiPromjenu() { slusatelji.forEach(f => f()); }
function pretplati(f) { slusatelji.add(f); return () => slusatelji.delete(f); }

// React hook: ime prijavljenog korisnika ili null ako nitko nije prijavljen
// (osvježava se čim se netko prijavi ili odjavi)
export function useImePrijavljenog() {
  return useSyncExternalStore(pretplati, () => prijavljeniKorisnik()?.ime ?? null);
}
