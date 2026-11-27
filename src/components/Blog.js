import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slika from './Slika';
import { clanci } from '../data';

// "2026-10-28" -> "28. listopada 2026."
function formatirajDatum(iso) {
  return new Date(iso + "T00:00").toLocaleDateString("hr-HR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// Veličine fontova (rem; 1rem = 16px)
const FONT_DATUM = "1rem";          // 16px
const FONT_IZVOR = "0.875rem";      // 14px
const FONT_NASLOV_KARTICE = "1.375rem"; // 22px
const FONT_NASLOV_CLANKA = "1.625rem";  // 26px
const FONT_TEKST = "1.1875rem";     // 19px
const RAZMAK_NASLOV = "calc(.5rem + 10px)"; // razmak naslov -> tekst (Bootstrapovih 8px + 10px)

// Izvor slike: crn tekst
function Izvor({ tekst, razmak = "mt-1" }) {
  if (!tekst) return null;
  return <p className={`text-black text-end mb-0 ${razmak}`} style={{ fontSize: FONT_IZVOR }}>{tekst}</p>;
}

// Slika članka (ako je ima); inače sivi okvir s tekstom "slika"
function SlikaClanka({ clanak, klasa, minVisina }) {
  return clanak.slika ? (
    <div className={`${klasa} bg-white position-relative`} style={{ minHeight: minVisina }}>
      <Slika
        src={clanak.slika} alt={clanak.slikaAlt || ""}
        className="position-absolute top-0 start-0 w-100 h-100 p-2"
        style={{ objectFit: "contain" }}
      />
    </div>
  ) : (
    <div className={`${klasa} bg-white text-secondary d-flex align-items-center justify-content-center py-5`} aria-hidden="true">
      slika
    </div>
  );
}

// Sažeti prikaz: slika, datum, naslov, sažetak i gumb koji otvara cijeli članak
function Post({ clanak, id, aktivan, podijeljeno, onOtvori }) {
  const naslov = (
    <h2 className="card-title" style={{ fontSize: FONT_NASLOV_KARTICE, marginBottom: RAZMAK_NASLOV }}>{clanak.naslov}</h2>
  );
  return (
    <article className="card h-100 overflow-hidden">
      <div className="row g-0 h-100">
        {/* slika s izvorom ispod nje (u otvorenom članku slike nema); članci s bezSlike nemaju ni taj stupac */}
        {!clanak.bezSlike && (
          <div className="col-12 col-sm-4 d-flex flex-column bg-white">
            <SlikaClanka clanak={clanak} klasa="flex-grow-1" minVisina={240} />
            <Izvor tekst={clanak.izvor} razmak="mt-0 px-2 pb-1" />
          </div>
        )}
        <div className={clanak.bezSlike ? "col-12 card-body d-flex flex-column text-center" : "col-12 col-sm-8 card-body"}>
          {/* bez slike: naslov na vrhu u sredini, datum ispod njega */}
          {clanak.bezSlike && naslov}
          <time dateTime={clanak.datum} className="text-black" style={{ fontSize: FONT_DATUM }}>
            {formatirajDatum(clanak.datum)}
          </time>
          {!clanak.bezSlike && naslov}
          <p className="card-text text-secondary text-wrap text-break" style={{ whiteSpace: "pre-line", fontSize: FONT_TEKST }}>{clanak.sazetak}</p>

          <button
            id={`gumb-clanka-${id}`}
            className="btn btn-outline-success w-100 d-flex justify-content-between mt-auto"
            aria-haspopup={podijeljeno ? undefined : "dialog"}
            aria-current={aktivan ? "true" : undefined}
            onClick={onOtvori}
          >
            <span>Pročitaj cijeli članak</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// Sadržaj otvorenog članka (isti u prozoru preko stranice i u lijevoj polovici)
function ClanakSadrzaj({ clanak, onZatvori }) {
  const datum = (
    <time dateTime={clanak.datum} className="text-black" style={{ fontSize: FONT_DATUM }}>{formatirajDatum(clanak.datum)}</time>
  );
  const naslov = (
    <h2 id="clanak-naslov" className="card-title" style={{ fontSize: FONT_NASLOV_CLANKA, marginBottom: RAZMAK_NASLOV }}>{clanak.naslov}</h2>
  );
  return (
    <>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-outline-success" onClick={onZatvori} aria-label="Zatvori članak">
          Zatvori ✕
        </button>
      </div>

      {/* otvoreni članak je bez slike (slika se vidi samo na kartici u popisu) */}

      {/* bez slike: naslov na vrhu u sredini, datum ispod njega */}
      {clanak.bezSlike ? <div className="text-center">{naslov}{datum}</div> : <>{datum}{naslov}</>}
      {clanak.tekst.map((o, i) => <p key={i} className="mb-3" style={{ fontSize: FONT_TEKST }}>{o}</p>)}
    </>
  );
}

// Veliki ekrani: otvoreni članak u lijevoj polovici, popis članaka desno
function ClanakPanel({ clanak, onZatvori }) {
  const ref = useRef(null);
  // pri otvaranju (ili promjeni članka) fokus ide na članak, da ga čitač zaslona izgovori
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, []);
  return (
    <aside className="clanak-panel" tabIndex={-1} ref={ref} aria-labelledby="clanak-naslov">
      <ClanakSadrzaj clanak={clanak} onZatvori={onZatvori} />
    </aside>
  );
}

// Manji ekrani: članak se otvori u sredini stranice preko svega
function ClanakModal({ clanak, onZatvori }) {
  const dijalogRef = useRef(null);

  useEffect(() => {
    const prethodni = document.activeElement; // vrati fokus na gumb kad se zatvori
    const staroPrepunjenje = document.body.style.overflow;
    document.body.style.overflow = "hidden";   // stranica iza se ne pomiče
    dijalogRef.current?.focus();

    const naTipku = (e) => {
      if (e.key === "Escape") onZatvori();
    };
    document.addEventListener("keydown", naTipku);
    return () => {
      document.removeEventListener("keydown", naTipku);
      document.body.style.overflow = staroPrepunjenje;
      prethodni?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tab ostaje unutar prozora (tipkovnica i čitači zaslona ne odlaze na stranicu iza)
  const zadrziFokus = (e) => {
    if (e.key !== "Tab") return;
    const elementi = dijalogRef.current.querySelectorAll("button, a[href]");
    if (elementi.length === 0) { e.preventDefault(); return; }
    const prvi = elementi[0];
    const zadnji = elementi[elementi.length - 1];
    if (e.shiftKey && (document.activeElement === prvi || document.activeElement === dijalogRef.current)) {
      e.preventDefault(); zadnji.focus();
    } else if (!e.shiftKey && document.activeElement === zadnji) {
      e.preventDefault(); prvi.focus();
    }
  };

  return (
    <div
      className="clanak-pozadina"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onZatvori(); }} // klik izvan prozora zatvara
    >
      <div
        className="clanak-modal"
        role="dialog" aria-modal="true" aria-labelledby="clanak-naslov"
        tabIndex={-1} ref={dijalogRef} onKeyDown={zadrziFokus}
      >
        <ClanakSadrzaj clanak={clanak} onZatvori={onZatvori} />
      </div>
    </div>
  );
}

// true na širokim ekranima (Bootstrap "lg" = od 992 px)
function useVeliki() {
  const upit = "(min-width: 992px)";
  const [veliki, setVeliki] = useState(() => window.matchMedia(upit).matches);
  useEffect(() => {
    const m = window.matchMedia(upit);
    const promjena = () => setVeliki(m.matches);
    m.addEventListener("change", promjena);
    return () => m.removeEventListener("change", promjena);
  }, []);
  return veliki;
}

function Blog() {
  // redni broj otvorenog članka (null = nijedan)
  const [otvoreniId, setOtvoreniId] = useState(null);
  const veliki = useVeliki();
  const podijeljeno = veliki && otvoreniId !== null; // lijevo popis, desno članak

  // dolazak iz izbornika "Vrste poslova": otvori članak s tim naslovom
  const { state, key } = useLocation();
  useEffect(() => {
    const i = clanci.findIndex(c => c.naslov === state?.clanak);
    if (i >= 0) setOtvoreniId(i);
  }, [state, key]);

  // zatvaranje u podijeljenom prikazu: fokus se vraća na gumb tog članka
  const zatvoriPanel = () => {
    const id = otvoreniId;
    setOtvoreniId(null);
    setTimeout(() => document.getElementById(`gumb-clanka-${id}`)?.focus(), 0);
  };

  const popis = clanci.map((c, i) => (
    <Post
      key={i} clanak={c} id={i}
      aktivan={otvoreniId === i} podijeljeno={podijeljeno}
      onOtvori={() => setOtvoreniId(i)}
    />
  ));

  return (
    <section className="container py-5">
      {/* clamp(najmanje, ovisno o širini ekrana, najviše): mobitel = najmanje, veliki ekran = najviše */}
      <div className="text-center" style={{ marginBottom: "calc(1.5rem + 20px)" }}> {/* na sredini, +20px razmaka prema ostatku */}
        {/* Naslov "Blog" ostaje na sredini, kao prije. Nitni križ (vanjska kružnica 2px + 3 unutarnje jednako
            razmaknute + križ + crvena točka) je vezan uz slovo "o", pa mu je sredina točno u sredini tog slova.
            Promjer = 3,6 puta veličina slova. Gornji i donji padding (1,3em) rezervira mjesto za kružnicu,
            da ne ulazi u header ni u podnaslov. */}
        <h2
          aria-label="Blog"
          className="h2 mb-0"
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1,
            paddingTop: "1.3em", paddingBottom: "calc(1.3em + 5px)", /* +5px jer je kružnica spuštena */
            isolation: "isolate",
            /* naslov i kružnica podignuti zajedno 2,5px: razmak header -> kružnica = kružnica -> podnaslov (oko 50,5px) */
            position: "relative", top: -2.5,
            marginBottom: "calc(.5rem + 40px)", /* 8px + 40px razmaka prema podnaslovu */
          }}
        >
          <span aria-hidden="true">
            Bl
            <span style={{ position: "relative" }}>
              o
              {/* kružnice i križ iza slova (z-index -1 ostaje unutar naslova zbog isolation) */}
              <span
                className="position-absolute top-50 start-50"
                style={{
                  width: "3.6em", height: "3.6em", border: "2px solid #000", borderRadius: "50%",
                  transform: "translate(-50%, calc(-50% + 5px))", zIndex: -1, pointerEvents: "none", /* +5px = spuštena */
                }}
              >
                <svg
                  viewBox="0 0 100 100" focusable="false"
                  className="position-absolute top-0 start-0 w-100 h-100"
                  fill="none" stroke="#000" strokeWidth="1"
                >
                  {/* tri unutarnje kružnice, razmak među svima (i do vanjske) je 12,5 */}
                  <circle cx="50" cy="50" r="37.5" vectorEffect="non-scaling-stroke" />
                  <circle cx="50" cy="50" r="25" vectorEffect="non-scaling-stroke" />
                  <circle cx="50" cy="50" r="12.5" vectorEffect="non-scaling-stroke" />
                  {/* križ */}
                  <line x1="0" y1="50" x2="100" y2="50" vectorEffect="non-scaling-stroke" />
                  <line x1="50" y1="0" x2="50" y2="100" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
              {/* crvena točka (promjer 8px) točno u sredini slova "o", iznad slova */}
              <span
                className="position-absolute top-50 start-50"
                style={{ width: 8, height: 8, background: "red", borderRadius: "50%", transform: "translate(-50%, calc(-50% + 5px))", zIndex: 1 }}
              />
            </span>
            g
          </span>
        </h2>
        <p className="text-black mb-0" style={{ fontSize: "clamp(1.1rem, 3vw, 2rem)" }}>Savjeti i objašnjenja geodetskih postupaka.</p>
      </div>

      {podijeljeno ? (
        /* široki ekran, članak otvoren: lijeva polovica = popis članaka, desna = otvoreni članak */
        <div className="row g-3">
          <div className="col-lg-6">
            <div className="d-flex flex-column gap-3">{popis}</div>
          </div>
          <div className="col-lg-6">
            <ClanakPanel key={otvoreniId} clanak={clanci[otvoreniId]} onZatvori={zatvoriPanel} />
          </div>
        </div>
      ) : (
        <>
          {/* 2 članka po retku na velikim ekranima, 1 na manjim */}
          <div className="row g-3">
            {popis.map((p, i) => <div key={i} className="col-12 col-lg-6">{p}</div>)}
          </div>

          {/* manji ekrani: članak preko cijele stranice */}
          {otvoreniId !== null && (
            <ClanakModal clanak={clanci[otvoreniId]} onZatvori={() => setOtvoreniId(null)} />
          )}
        </>
      )}
    </section>
  );
}

export default Blog;
