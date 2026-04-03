import '../css/PaintingSection.css';
import { useLang } from '../contexts/LangContext';
import { t } from '../i18n/translations';
import { useMedia } from '../admin/hooks/useMedia';
import Lottie from 'lottie-react';
import paintingAnimation from '../assets/painting.json';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import p11 from '../assets/images/Portrait11.jpeg';
import p12 from '../assets/images/Portrait12.jpeg';
import p13 from '../assets/images/Portrait13.jpeg';
import p14 from '../assets/images/Portrait14.jpeg';
import p15 from '../assets/images/Portrait15.jpeg';
import p16 from '../assets/images/Portrait16.jpeg';
import p17 from '../assets/images/Portrait17.jpeg';
import p18 from '../assets/images/Portrait18.jpeg';
import p19 from '../assets/images/Portrait19.jpeg';
import p20 from '../assets/images/Portrait20.jpeg';
import p21 from '../assets/images/Portrait21.jpeg';
import p22 from '../assets/images/Portrait22.jpeg';
import p23 from '../assets/images/Portrait23.jpeg';
import p24 from '../assets/images/Portrait24.jpeg';
import p25 from '../assets/images/Portrait25.jpeg';
import p26 from '../assets/images/Portrait26.jpeg';
import pGars from '../assets/images/PortraitGars.PNG';
import kasir  from '../assets/images/Kasir1.jpeg';
import kasir2 from '../assets/images/Kasir2.jpeg';

// ── Portraits avec noms et médiums ───────────────────────
const LOCAL_PORTRAITS = [
  { src: p11,   name: 'Turban',          medium: 'Crayon' },
  { src: p12,   name: 'Couleurs vives',  medium: 'Aquarelle' },
  { src: p13,   name: 'Profil',          medium: 'Crayon' },
  { src: p14,   name: 'Abstrait',        medium: 'Gouache' },
  { src: p15,   name: 'Auburn',          medium: 'Crayon couleur' },
  { src: p16,   name: 'Portrait gars',   medium: 'Crayon' },
  { src: p17,   name: 'Mystère',         medium: 'Crayon' },
  { src: p18,   name: 'Kendall',         medium: 'Crayon' },
  { src: p19,   name: 'Yeux verts',      medium: 'Marqueur' },
  { src: p20,   name: 'Bob noir',        medium: 'Marqueur' },
  { src: p21,   name: 'Darkside',        medium: 'Gouache' },
  { src: p22,   name: 'Col roulé vert',  medium: 'Marqueur' },
  { src: p23,   name: 'Afro fleurie',    medium: 'Gouache' },
  { src: p24,   name: 'Fleurs jaunes',   medium: 'Gouache' },
  { src: p25,   name: 'Fleurs mauves',   medium: 'Gouache' },
  { src: p26,   name: 'Queue de cheval', medium: 'Crayon' },
  { src: pGars, name: 'Couronne verte',  medium: 'Marqueur' },
  { src: kasir, name: 'Kasir',           medium: 'Crayon' },
  { src: kasir2,name: 'Kasir 2',         medium: 'Crayon' },
];

function HexCard({ item, index, onClick }) {
  return (
    <li className="hex-item" style={{ '--i': index }} onClick={() => onClick(item)}>
      <div className="hex-inner">
        <div className="hex-img" style={{ backgroundImage: `url(${item.src})` }} />
        <div className="hex-overlay">
          <span className="hex-label">
            {item.name}
            {item.isRemote && <span className="hex-new"> ✦</span>}
          </span>
          {item.medium && <span className="hex-medium">{item.medium}</span>}
        </div>
      </div>
    </li>
  );
}
HexCard.propTypes = {
  item: PropTypes.shape({ src: PropTypes.string.isRequired, name: PropTypes.string, medium: PropTypes.string, isRemote: PropTypes.bool }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Lightbox({ item, onClose }) {
  if (!item) return null;
  return createPortal(
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb-box" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose}>×</button>
        <img src={item.src} alt={item.name || 'Portrait'} className="lb-img" />
        {(item.name || item.medium) && (
          <div className="lb-caption">
            {item.name && <strong>{item.name}</strong>}
            {item.medium && <span>{item.medium}</span>}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
Lightbox.propTypes = {
  item: PropTypes.shape({ src: PropTypes.string, name: PropTypes.string, medium: PropTypes.string }),
  onClose: PropTypes.func.isRequired,
};

function PaintingSection() {
  const { lang } = useLang();
  const [selected, setSelected] = useState(null);
  const { items, loading } = useMedia('paintings', LOCAL_PORTRAITS);

  return (
    <div className="overlay-section Painting-section">
      <div className="btn-close-section Painting-close hover-target" />
      <div className="section-inner painting-inner">

        <div className="painting-header">
          <div className="painting-header__text">
            <p className="section-label">{t(lang,'painting_label')}</p>
            <h2 className="section-title">
              {t(lang,'painting_title1')}<br /><em>{t(lang,'painting_title2')}</em>
            </h2>
            <div className="section-divider" />
            <p className="painting-intro">
              {t(lang,'painting_intro')}
              <br />
              <span className="painting-count">
                {loading ? '…' : items.length} {t(lang,'painting_artworks') || 'œuvres'}
              </span>
            </p>
          </div>
          <div className="painting-lottie-wrap">
            <div className="painting-lottie-waves" />
            <div className="painting-lottie-blob">
              <Lottie animationData={paintingAnimation} loop autoplay style={{ width:'100%', height:'100%' }} />
            </div>
          </div>
        </div>

        {loading ? (
          <p className="painting-loading">Chargement de la galerie…</p>
        ) : (
          <ul className="hex-gallery">
            {items.map((item, i) => (
              <HexCard key={item.src + i} item={item} index={i} onClick={setSelected} />
            ))}
          </ul>
        )}
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default PaintingSection;