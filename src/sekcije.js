import { useSyncExternalStore } from 'react';

// Koja je sekcija početne stranice trenutno na zaslonu (za isticanje u izborniku).
// Postavlja je Pocetna.js dok se stranica pomiče; izbornici u headeru i footeru je čitaju.
let aktivna = null;
const slusaci = new Set();

export const postaviAktivnu = v => {
  if (v === aktivna) return;
  aktivna = v;
  slusaci.forEach(f => f());
};
const pretplata = f => { slusaci.add(f); return () => slusaci.delete(f); };
export const useAktivnaSekcija = () => useSyncExternalStore(pretplata, () => aktivna);
