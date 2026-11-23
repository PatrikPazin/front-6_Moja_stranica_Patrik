// Logo tvrtke: raširen stativ s totalnom stanicom + naziv "GeoPatrik"
function Logo() {
  return (
    <svg viewBox="0 0 300 160" role="img" aria-labelledby="logo-naslov" className="logo-svg">
      <title id="logo-naslov">GeoPatrik d.o.o. za geodetske usluge</title>

      {/* geodetska izmjerna markica (pogled odozgo): vanjska kružnica, jedna unutarnja kružnica
          i križ u sredini koji ide do vanjskog ruba */}
      <circle cx="60" cy="80" r="46" fill="#dc3545" stroke="#000" strokeWidth="4" />
      <circle cx="60" cy="80" r="26" fill="#fff" stroke="#000" strokeWidth="3" />
      <g stroke="#000" strokeWidth="3.5" strokeLinecap="butt">
        <line x1="14" y1="80" x2="106" y2="80" />
        <line x1="60" y1="34" x2="60" y2="126" />
      </g>

      {/* naziv */}
      <text x="128" y="78" fontSize="34" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" textLength="165" lengthAdjust="spacingAndGlyphs">
        <tspan fill="#000">Geo</tspan><tspan fill="#dc3545">Patrik</tspan>
      </text>
      <line x1="128" y1="90" x2="293" y2="90" stroke="#000" strokeWidth="2" />
      <text x="128" y="108" fontSize="12" fontWeight="600" fontFamily="Arial, Helvetica, sans-serif" fill="#000" textLength="165" lengthAdjust="spacingAndGlyphs">
        d.o.o. za geodetske usluge
      </text>
    </svg>
  );
}

export default Logo;
