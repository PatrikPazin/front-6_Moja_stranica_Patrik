// Gumb lijevo, iznad podnožja, na svakoj stranici: vraća na vrh stranice
function NatragNaVrh() {
  const naVrh = () => {
    const mirno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: mirno ? "auto" : "smooth" });
  };
  return (
    <div className="container-fluid natrag-omot">
      <button type="button" className="btn natrag-na-vrh" onClick={naVrh}>
        Natrag na vrh
      </button>
    </div>
  );
}

export default NatragNaVrh;
