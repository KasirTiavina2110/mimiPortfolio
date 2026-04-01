import '../css/PaintingSection.css';
import Lottie from 'lottie-react';
import paintingAnimation from '../assets/painting.json';
import { useState } from 'react';
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
import kasir from '../assets/images/Kasir1.jpeg';
import kasir2 from '../assets/images/Kasir2.jpeg';

const PORTRAITS = [
  { src: p11,   label: 'Turban',          medium: 'Crayon' },
  { src: p12,   label: 'Couleurs vives',  medium: 'Aquarelle' },
  { src: p13,   label: 'Profil',          medium: 'Crayon' },
  { src: p14,   label: 'Abstrait',        medium: 'Gouache' },
  { src: p15,   label: 'Auburn',          medium: 'Crayon couleur' },
  { src: p16,   label: 'Portrait gars',   medium: 'Crayon' },
  { src: p17,   label: 'Mystère',         medium: 'Crayon' },
  { src: p18,   label: 'Kendall',         medium: 'Crayon' },
  { src: p19,   label: 'Yeux verts',      medium: 'Marqueur' },
  { src: p20,   label: 'Bob noir',        medium: 'Marqueur' },
  { src: p21,   label: 'Darkside',        medium: 'Gouache' },
  { src: p22,   label: 'Col roulé vert',  medium: 'Marqueur' },
  { src: p23,   label: 'Afro fleurie',    medium: 'Gouache' },
  { src: p24,   label: 'Fleurs jaunes',   medium: 'Gouache' },
  { src: p25,   label: 'Fleurs mauves',   medium: 'Gouache' },
  { src: p26,   label: 'Queue de cheval', medium: 'Crayon' },
  { src: pGars, label: 'Couronne verte',  medium: 'Marqueur' },
  { src: kasir, label: 'Kasir', medium: 'Crayon' },
  { src: kasir2, label: 'Kasir 2', medium: 'Crayon' },
];

// Carte hexagonale avec lightbox
function HexCard({ portrait, index, onClick }) {
  return (
    <li
      className="hex-item"
      style={{ '--i': index }}
      onClick={() => onClick(portrait)}
    >
      <div className="hex-inner">
        <div
          className="hex-img"
          style={{ backgroundImage: `url(${portrait.src})` }}
        />
        <div className="hex-overlay">
          <span className="hex-label">{portrait.label}</span>
          <span className="hex-medium">{portrait.medium}</span>
        </div>
      </div>
    </li>
  );
}

HexCard.propTypes = {
  portrait: PropTypes.shape({
    src: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Lightbox simple
function Lightbox({ portrait, onClose }) {
  if (!portrait) return null;
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb-box" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose}>×</button>
        <img src={portrait.src} alt={portrait.label} className="lb-img" />
        <div className="lb-caption">
          <strong>{portrait.label}</strong>
          <span>{portrait.medium}</span>
        </div>
      </div>
    </div>
  );
}

Lightbox.propTypes = {
  portrait: PropTypes.shape({
    src: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

function PaintingSection() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="overlay-section Painting-section">
      <div className="btn-close-section Painting-close hover-target" />

      <div className="section-inner painting-inner">

        {/* ── Header ── */}
        <div className="painting-header">
          <div className="painting-header__text">
            <p className="section-label">Galerie</p>
            <h2 className="section-title">
              Portraits &amp;<br /><em>Peintures</em>
            </h2>
            <div className="section-divider" />
            <p className="painting-intro">
              Crayon · aquarelle · gouache · marqueur
              <br />
              <span className="painting-count">{PORTRAITS.length} œuvres</span>
            </p>
          </div>

          <div className="painting-lottie-wrap">
            <div className="painting-lottie-waves" />
            <div className="painting-lottie-blob">
              <Lottie animationData={paintingAnimation} loop autoplay
                style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>

        {/* ── Grille hexagonale ── */}
        <ul className="hex-gallery">
          {PORTRAITS.map((p, i) => (
            <HexCard key={i} portrait={p} index={i} onClick={setSelected} />
          ))}
        </ul>

      </div>

      {/* Lightbox */}
      <Lightbox portrait={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default PaintingSection;