import '../css/ToteBagasySection.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// ── Images ──────────────────────────────────────────────
import img01 from '../assets/images/TotebagMirindra.jpeg';
import img02 from '../assets/images/ToteBagGrace.jpeg';
import img03 from '../assets/images/TotebagFijerinaoo.jpeg';
import img04 from '../assets/images/TotebagMirindra2.jpeg';
import img05 from '../assets/images/TotebagNatiora.jpeg';
import img06 from '../assets/images/TotebagGrace2.jpeg';
import img07 from '../assets/images/TotebagLiberty.jpeg';
import img08 from '../assets/images/TotebagNofyBoky.jpeg';
import img09 from '../assets/images/TotebagProud.jpeg';
import img10 from '../assets/images/TotebagLiberty2.jpeg';
import img11 from '../assets/images/TotebagMiavaka.jpeg';
import img12 from '../assets/images/TotebagCalmeMaman.jpeg';
import img13 from '../assets/images/TotebagTsaraIanao.jpeg';
import img14 from '../assets/images/TotebagLokoyTontolo.jpeg';
import img15 from '../assets/images/ToteBagAncreFleur.jpeg';

const BAGS = [
  { image: img01, name: 'Mirindra',      desc: 'Bouquet de roses peint à la main' },
  { image: img02, name: 'Grace',         desc: 'Grace upon Grace — couronne florale' },
  { image: img03, name: 'Fijerinao',     desc: '« Atolory ahy ny fijerinao »' },
  { image: img04, name: 'Mirindra II',   desc: 'Roses & bleuets — version complète' },
  { image: img05, name: 'Natiora',       desc: 'Médaillons animaux' },
  { image: img06, name: 'Grace II',      desc: 'Grace upon Grace — version finale' },
  { image: img07, name: 'Liberty',       desc: 'Mains, feuilles & papillons' },
  { image: img08, name: 'Nofy sy Boky',  desc: 'Femme & livres sur fond noir' },
  { image: img09, name: 'Proud',         desc: '« I am proud of myself »' },
  { image: img10, name: 'Liberty II',    desc: 'Liberty — version lumineuse' },
  { image: img11, name: 'Miavaka',       desc: 'Cœur anatomique fleuri sur noir' },
  { image: img12, name: 'Calme Maman',   desc: '« Calme maman, on t\'aime »' },
  { image: img13, name: 'Tsara Ianao',   desc: 'Tournesols sur fond corail' },
  { image: img14, name: 'Lokoy Tontolo', desc: 'Portrait femme & triangle' },
  { image: img15, name: 'Ancre & Fleur', desc: 'Ancre marine — Ho an\'i neny' },
];

// ── Carte expand/contract avec tilt sur la carte active ─
function TiltCard({ bag, isActive, onClick }) {
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
  const [ , setHovered] = useState(false);
  const ref   = useRef(null);
  const timer = useRef(null);

  const handleMove = useCallback((e) => {
    if (!isActive || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setTilt({
      x:  (e.clientX - left  - width  / 2) / width  * 14,
      y: -(e.clientY - top   - height / 2) / height * 14,
    });
  }, [isActive]);

  const handleEnter = () => { clearTimeout(timer.current); setHovered(true); };
  const handleLeave = () => {
    setHovered(false);
    timer.current = setTimeout(() => setTilt({ x: 0, y: 0 }), 500);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <article
      ref={ref}
      className={`tb-card ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      {/* Image de fond */}
      <div
        className="tb-card__bg"
        style={{ backgroundImage: `url(${bag.image})` }}
      />

      {/* Shine tilt — actif uniquement sur la carte ouverte */}
      {isActive && (
        <div className="tb-card__shine" style={{
          background: `radial-gradient(circle at ${50 + tilt.x * 3}% ${50 - tilt.y * 3}%,
            rgba(212,120,154,0.22) 0%, transparent 60%)`
        }} />
      )}

      {/* Titre vertical (carte fermée) */}
      <div className="tb-card__label">{bag.name}</div>

      {/* Contenu déplié (carte active) */}
      <div
        className="tb-card__content"
        style={isActive ? {
          transform: `rotateY(${tilt.x * 0.4}deg) rotateX(${tilt.y * 0.4}deg)`
        } : undefined}
      >
        <p className="tb-card__name">{bag.name}</p>
        <p className="tb-card__desc">{bag.desc}</p>
      </div>
    </article>
  );
}

TiltCard.propTypes = {
  bag:      PropTypes.shape({
    image: PropTypes.string.isRequired,
    name:  PropTypes.string.isRequired,
    desc:  PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick:  PropTypes.func.isRequired,
};

// ── Section principale ───────────────────────────────────
function ToteBagasySection() {
  const [active, setActive] = useState(0);
  const total    = BAGS.length;
  const trackRef = useRef(null);

  const activate = useCallback((i) => {
    setActive(i);
    // Scroll pour centrer la carte active sur mobile
    if (!trackRef.current) return;
    const card = trackRef.current.children[i];
    if (!card) return;
    trackRef.current.scrollTo({
      left: card.offsetLeft - trackRef.current.clientWidth / 2 + card.clientWidth / 2,
      behavior: 'smooth',
    });
  }, []);

  const prev = () => activate(Math.max(active - 1, 0));
  const next = () => activate(Math.min(active + 1, total - 1));

  // Clavier
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [active]);

  // Swipe tactile
  const sx = useRef(0);
  const onTouchStart = (e) => { sx.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    const dx = e.changedTouches[0].clientX - sx.current;
    if (Math.abs(dx) > 50) dx > 0 ? prev() : next();
  };

  return (
    <div className="overlay-section ToteBagasy-section">
      <div className="btn-close-section ToteBagasy-close hover-target" />

      <div className="section-inner tote-inner">

        {/* Header */}
        <div className="tote-head">
          <div>
            <p className="section-label">Créations textiles</p>
            <h2 className="section-title">Tote<br /><em>Bagasy</em></h2>
            <div className="section-divider" />
          </div>
          <div className="tote-controls">
            <button
              className="tote-nav hover-target"
              onClick={prev}
              disabled={active === 0}
              aria-label="Précédent"
            >‹</button>
            <span className="tote-count">{active + 1} / {total}</span>
            <button
              className="tote-nav hover-target"
              onClick={next}
              disabled={active === total - 1}
              aria-label="Suivant"
            >›</button>
          </div>
        </div>

        {/* Slider */}
        <div
          className="tb-slider"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="tb-track" ref={trackRef}>
            {BAGS.map((bag, i) => (
              <TiltCard
                key={i}
                bag={bag}
                isActive={i === active}
                onClick={() => activate(i)}
              />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="tb-dots">
          {BAGS.map((_, i) => (
            <button
              key={i}
              className={`tb-dot ${i === active ? 'is-active' : ''}`}
              onClick={() => activate(i)}
              aria-label={`Tote bag ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default ToteBagasySection;