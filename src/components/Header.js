import { Link, NavLink } from 'react-router-dom';
import { linkovi } from '../data';

function Header() {
  return (
    <header>
      <nav className="navbar bg-white border-bottom" aria-label="Glavni izbornik">
        <div className="container flex-wrap">
          <Link className="navbar-brand fw-bold" to="/">Geodetski ured</Link>
          <div className="nav">
            {linkovi.map(l => (
              <NavLink key={l.to} to={l.to} end className="nav-link">{l.naziv}</NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* mjesto za sliku: 12/12 */}
      <div className="hero bg-secondary-subtle text-secondary position-relative" aria-hidden="true">
        <small className="position-absolute top-0 start-0 m-2">slika (12/12)</small>
      </div>
    </header>
  );
}

export default Header;
