import '../css/ShoesCustomSection.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import shoesCustomVideo from '../assets/images/Shoes_custom.mp4';

// ── Chapeaux de graduation ──────────────────────
import capEverything    from '../assets/images/EVERYTHING.jpeg';
import capGodGrace      from '../assets/images/GodGRACE.jpeg';
import capGUG           from '../assets/images/GUG.jpeg';
import capJesus         from '../assets/images/Jesus.jpeg';
import capMahay         from '../assets/images/MahayMiotra.jpeg';
import capMortaro1      from '../assets/images/Mortaroboard1.jpg';
import capMotaJesus     from '../assets/images/Motaroaboard_Jesus.jpg';
import capMotaro2       from '../assets/images/Motaroaboard2.jpg';
import capMotaro3       from '../assets/images/Motaroaboard3.jpg';
import capThxDad        from '../assets/images/THXDADMUM.jpeg';
import capThxGod        from '../assets/images/THXGod.jpeg';
import capThxBless      from '../assets/images/THXGODBLESS.jpeg';

// ── Chaussures ──────────────────────────────────
import shoesObito       from '../assets/images/Shoes_Obito.jpg';
import shoesRedBull     from '../assets/images/Shoes_RedBull.jpg';

const CAPS = [
  { src: capEverything, quote: 'Everything is possible' },
  { src: capGodGrace,   quote: "God's Grace" },
  { src: capGUG,        quote: 'Grace upon Grace' },
  { src: capJesus,      quote: 'I pray for this' },
  { src: capMahay,      quote: 'Eny hainy ny munao' },
  { src: capMortaro1,   quote: 'Dream became reality' },
  { src: capMotaJesus,  quote: 'It&apos;s happening' },
  { src: capMotaro2,    quote: 'Next chapter' },
  { src: capMotaro3,    quote: 'This one&apos;s for you' },
  { src: capThxDad,     quote: 'Thank you Jesus, Dad & Mum' },
  { src: capThxGod,     quote: 'Thanks God I did it' },
  { src: capThxBless,   quote: 'Thank you God for blessing me' },
];

const SHOES = [
  { src: shoesObito,   label: 'Obito',    desc: 'Converse custom — Naruto' },
  { src: shoesRedBull, label: 'Red Bull', desc: 'Air Force 1 — Red Bull ×33' },
];

// Légère rotation aléatoire mais déterministe selon l'index
const ROTATIONS = [-3, 2, -1.5, 3.5, -2.5, 1, -4, 2.5, -1, 3, -2, 1.5];

function CapCard({ cap, index, onClick }) {
  return (
    <div
      className="cap-card"
      style={{ '--rot': `${ROTATIONS[index % ROTATIONS.length]}deg`, '--i': index }}
      onClick={() => onClick(cap)}
    >
      <div className="cap-card__inner">
        <img src={cap.src} alt={cap.quote} className="cap-card__img" />
        <div className="cap-card__foot">{cap.quote}</div>
      </div>
    </div>
  );
}

CapCard.propTypes = {
  cap: PropTypes.shape({
    src: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="sc-lb-backdrop" onClick={onClose}>
      <div className="sc-lb-box" onClick={e => e.stopPropagation()}>
        <button className="sc-lb-close" onClick={onClose}>×</button>
        <img src={item.src} alt={item.quote || item.label} className="sc-lb-img" />
        {(item.quote || item.label) && (
          <p className="sc-lb-caption">{item.quote || item.label}</p>
        )}
      </div>
    </div>
  );
}

Lightbox.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    quote: PropTypes.string,
    label: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

function ShoesCustomSection() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="overlay-section ShoesCustom-section">
      <div className="btn-close-section ShoesCustom-close hover-target" />

      <div className="section-inner sc-inner">

        {/* ══ PARTIE 1 — CHAPEAUX DE GRADUATION ══ */}
        <div className="sc-block">
          <p className="section-label">Art textile &amp; Décoration</p>
          <h2 className="section-title">
            Graduation<br /><em>Caps</em>
          </h2>
          <div className="section-divider" />
          <p className="sc-desc">
            Chaque chapeau est une œuvre unique peinte à la main — calligraphie dorée,
            illustrations florales, personnages et messages de foi.
          </p>

          {/* Grille polaroïd */}
          <div className="cap-grid">
            {CAPS.map((cap, i) => (
              <CapCard key={i} cap={cap} index={i} onClick={setSelected} />
            ))}
          </div>
        </div>

        {/* ══ SÉPARATEUR ══ */}
        <div className="sc-separator">
          <span className="sc-separator__line" />
          <span className="sc-separator__label">Shoes Custom</span>
          <span className="sc-separator__line" />
        </div>

        {/* ══ PARTIE 2 — SHOES CUSTOM ══ */}
        <div className="sc-block">
          <p className="section-label">Personnalisation</p>
          <h2 className="section-title">
            Shoes<br /><em>Custom</em>
          </h2>
          <div className="section-divider" />

          <div className="shoes-layout">
            {/* Texte + liste */}
            <div className="shoes-text">
              <p>
                Les shoes custom sont des chaussures transformées en véritables
                œuvres d&apos;art. Chaque paire devient une toile où s&apos;expriment des
                motifs uniques, des graphismes personnels ou des illustrations
                originales.
              </p>
              <ul className="shoes-list">
                <li>Peinture acrylique sur cuir</li>
                <li>Marqueurs permanents</li>
                <li>Graphismes &amp; illustrations</li>
                <li>Motifs sur mesure</li>
              </ul>

              {/* Miniatures chaussures */}
              <div className="shoes-thumbs">
                {SHOES.map((s, i) => (
                  <div key={i} className="shoes-thumb" onClick={() => setSelected(s)}>
                    <img src={s.src} alt={s.label} />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vidéo */}
            <div className="shoes-video-wrap">
              <video controls>
                <source src={shoesCustomVideo} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
          </div>
        </div>

      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default ShoesCustomSection;