import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAktivnaSekcija } from '../sekcije';

// Jedna kartica izbornika. Ako link ima "sekcija", vodi na taj dio početne stranice (/#sekcija)
// i istaknuta je kad je taj dio na zaslonu; inače je obična poveznica na drugu stranicu.
function NavStavka({ l, onClick }) {
  const { pathname } = useLocation();
  const aktivna = useAktivnaSekcija();

  if (!l.sekcija) {
    return <NavLink to={l.to} end className="nav-link" onClick={onClick}>{l.naziv}</NavLink>;
  }
  const jeAktivna = pathname === "/" && aktivna === l.sekcija;
  return (
    <Link
      to={`/#${l.sekcija}`}
      className={"nav-link" + (jeAktivna ? " active" : "")}
      aria-current={jeAktivna ? "location" : undefined}
      onClick={onClick}
    >
      {l.naziv}
    </Link>
  );
}

export default NavStavka;
