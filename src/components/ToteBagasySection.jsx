import '../css/ToteBagasySection.css';
import { useLang } from '../contexts/LangContext';
import { t } from '../i18n/translations';
import { useMedia } from '../admin/hooks/useMedia';
import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

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

// ── Items avec noms originaux ─────────────────────────────
const LOCAL_TOTES = [
  { src: img01, name: 'Mirindra',      desc: 'Bouquet de roses peint à la main' },
  { src: img02, name: 'Grace',         desc: 'Grace upon Grace — couronne florale' },
  { src: img03, name: 'Fijerinao',     desc: '« Atolory ahy ny fijerinao »' },
  { src: img04, name: 'Mirindra II',   desc: 'Roses & bleuets — version complète' },
  { src: img05, name: 'Natiora',       desc: 'Médaillons animaux' },
  { src: img06, name: 'Grace II',      desc: 'Grace upon Grace — version finale' },
  { src: img07, name: 'Liberty',       desc: 'Mains, feuilles & papillons' },
  { src: img08, name: 'Nofy sy Boky',  desc: 'Femme & livres sur fond noir' },
  { src: img09, name: 'Proud',         desc: '« I am proud of myself »' },
  { src: img10, name: 'Liberty II',    desc: 'Liberty — version lumineuse' },
  { src: img11, name: 'Miavaka',       desc: 'Cœur anatomique fleuri sur noir' },
  { src: img12, name: 'Calme Maman',   desc: '« Calme maman, on t\'aime »' },
  { src: img13, name: 'Tsara Ianao',   desc: 'Tournesols sur fond corail' },
  { src: img14, name: 'Lokoy Tontolo', desc: 'Portrait femme & triangle' },
  { src: img15, name: 'Ancre & Fleur', desc: 'Ancre marine — Ho an\'i neny' },
];

function TiltCard({ item, isActive, onClick }) {
  const [tilt,  setTilt]  = useState({ x: 0, y: 0 });
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

  const handleLeave = () => { timer.current = setTimeout(() => setTilt({ x:0, y:0 }), 500); };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <article ref={ref}
      className={`tb-card ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <div className="tb-card__bg" style={{ backgroundImage: `url(${item.src})` }} />
      {isActive && (
        <div className="tb-card__shine" style={{
          background: `radial-gradient(circle at ${50+tilt.x*3}% ${50-tilt.y*3}%, rgba(212,120,154,0.22) 0%, transparent 60%)`
        }} />
      )}
      <div className="tb-card__label">{item.name}</div>
      <div className="tb-card__content"
        style={isActive ? { transform:`rotateY(${tilt.x*0.4}deg) rotateX(${tilt.y*0.4}deg)` } : undefined}
      >
        <p className="tb-card__name">{item.name}</p>
        {item.desc && <p className="tb-card__desc">{item.desc}</p>}
        {item.isRemote && <span className="tb-card__badge">Nouveau</span>}
      </div>
    </article>
  );
}

TiltCard.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string,
    isRemote: PropTypes.bool,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

function ToteBagasySection() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const { items, loading } = useMedia('tote-bags', LOCAL_TOTES);
  const total = items.length;

  useEffect(() => { setActive(0); }, [items]);

  const activate = useCallback((i) => {
    setActive(i);
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

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [active, total]);

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

        <div className="tote-head">
          <div>
            <p className="section-label">{t(lang,'tote_label') || 'Créations textiles'}</p>
            <h2 className="section-title">{t(lang,'tote_title1')}<br /><em>{t(lang,'tote_title2')}</em></h2>
            <div className="section-divider" />
          </div>
          <div className="tote-controls">
            <button className="tote-nav hover-target" onClick={prev} disabled={active === 0 || loading}>‹</button>
            <span className="tote-count">{loading ? '…' : `${active+1} / ${total}`}</span>
            <button className="tote-nav hover-target" onClick={next} disabled={active >= total-1 || loading}>›</button>
          </div>
        </div>

        {loading ? (
          <p className="tote-loading">Chargement…</p>
        ) : (
          <>
            <div className="tb-slider" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div className="tb-track" ref={trackRef}>
                {items.map((item, i) => (
                  <TiltCard key={item.src + i} item={item} isActive={i === active} onClick={() => activate(i)} />
                ))}
              </div>
            </div>
            <div className="tb-dots">
              {items.map((_, i) => (
                <button key={i}
                  className={`tb-dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => activate(i)}
                  aria-label={`Tote bag ${i+1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ToteBagasySection;