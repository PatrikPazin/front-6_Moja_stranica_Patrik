// Gumb učvršćen 20px od donjeg i desnog ruba preglednika: putuje uz pomicanje stranice
// i vraća na vrh. Prikazuje se jednom (App.js), na svim stranicama.
function NatragNaVrh() {
  const naVrh = () => {
    const mirno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: mirno ? "auto" : "smooth" });
  };
  return (
    <button type="button" className="btn natrag-na-vrh" onClick={naVrh}>
      Natrag na vrh
    </button>
  );
}

export default NatragNaVrh;
