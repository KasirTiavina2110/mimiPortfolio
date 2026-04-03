import '../css/ShoesCustomSection.css';
import { useLang } from '../contexts/LangContext';
import { t } from '../i18n/translations';
import { useMedia, useMediaSingle } from '../admin/hooks/useMedia';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import capEverything from '../assets/images/EVERYTHING.jpeg';
import capGodGrace   from '../assets/images/GodGRACE.jpeg';
import capGUG        from '../assets/images/GUG.jpeg';
import capJesus      from '../assets/images/Jesus.jpeg';
import capMahay      from '../assets/images/MahayMiotra.jpeg';
import capMortaro1   from '../assets/images/Mortaroboard1.jpg';
import capMotaJesus  from '../assets/images/Motaroaboard_Jesus.jpg';
import capMotaro2    from '../assets/images/Motaroaboard2.jpg';
import capMotaro3    from '../assets/images/Motaroaboard3.jpg';
import capThxDad     from '../assets/images/THXDADMUM.jpeg';
import capThxGod     from '../assets/images/THXGod.jpeg';
import capThxBless   from '../assets/images/THXGODBLESS.jpeg';
import shoesObito    from '../assets/images/Shoes_Obito.jpg';
import shoesRedBull  from '../assets/images/Shoes_RedBull.jpg';
import shoesVideo    from '../assets/images/Shoes_custom.mp4';

// ── Noms originaux des chapeaux ───────────────────────────
const LOCAL_CAPS = [
  { src: capEverything, name: 'Everything is possible',          quote: 'Everything is possible' },
  { src: capGodGrace,   name: "God's Grace",                     quote: "God's Grace" },
  { src: capGUG,        name: 'Grace upon Grace',                quote: 'Grace upon Grace' },
  { src: capJesus,      name: 'I pray for this',                 quote: 'I pray for this' },
  { src: capMahay,      name: 'Eny hainy ny munao',              quote: 'Eny hainy ny munao' },
  { src: capMortaro1,   name: 'Dream became reality',            quote: 'Dream became reality' },
  { src: capMotaJesus,  name: "It's happening",                  quote: "It's happening" },
  { src: capMotaro2,    name: 'Next chapter',                    quote: 'Next chapter' },
  { src: capMotaro3,    name: "This one's for you",              quote: "This one's for you" },
  { src: capThxDad,     name: 'Thank you Jesus, Dad & Mum',      quote: 'Thank you Jesus, Dad & Mum' },
  { src: capThxGod,     name: 'Thanks God I did it',             quote: 'Thanks God I did it' },
  { src: capThxBless,   name: 'Thank you God for blessing me',   quote: 'Thank you God for blessing me' },
];

const LOCAL_SHOES = [
  { src: shoesObito,   name: 'Obito',    desc: 'Converse custom — Naruto' },
  { src: shoesRedBull, name: 'Red Bull', desc: 'Air Force 1 — Red Bull ×33' },
];

const ROTATIONS = [-3,2,-1.5,3.5,-2.5,1,-4,2.5,-1,3,-2,1.5];

// ── Lightbox Portal ───────────────────────────────────────
function Lightbox({ src, caption, onClose }) {
  if (!src) return null;
  return createPortal(
    <div className="sc-lb-backdrop" onClick={onClose}>
      <div className="sc-lb-box" onClick={e => e.stopPropagation()}>
        <button className="sc-lb-close" onClick={onClose}>×</button>
        <img src={src} alt={caption || ''} className="sc-lb-img" />
        {caption && <p className="sc-lb-caption">{caption}</p>}
      </div>
    </div>,
    document.body
  );
}
Lightbox.propTypes = { src: PropTypes.string, caption: PropTypes.string, onClose: PropTypes.func.isRequired };

function CapCard({ item, index, onClick }) {
  return (
    <div className="cap-card"
      style={{ '--rot':`${ROTATIONS[index % ROTATIONS.length]}deg`, '--i': index }}
      onClick={() => onClick(item)}
    >
      <div className="cap-card__inner">
        <img src={item.src} alt={item.name} className="cap-card__img" />
        <div className="cap-card__foot">
          {item.name}
          {item.isRemote && <span className="cap-card__new">✦</span>}
        </div>
      </div>
    </div>
  );
}
CapCard.propTypes = {
  item: PropTypes.shape({ src: PropTypes.string.isRequired, name: PropTypes.string, isRemote: PropTypes.bool }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

function ShoesCustomSection() {
  const { lang } = useLang();
  const [selected, setSelected] = useState(null); // { src, caption }

  const { items: capItems, loading: capsLoading } = useMedia('caps', LOCAL_CAPS);
  const { items: shoeItems, loading: shoesLoading } = useMedia('shoes-photos', LOCAL_SHOES);
  const { url: videoUrl, loading: videoLoading } = useMediaSingle('shoes', shoesVideo);

  return (
    <div className="overlay-section ShoesCustom-section">
      <div className="btn-close-section ShoesCustom-close hover-target" />
      <div className="section-inner sc-inner">

        {/* ── PARTIE 1 : Graduation Caps ── */}
        <div className="sc-block">
          <p className="section-label">{t(lang,'caps_label')}</p>
          <h2 className="section-title">{t(lang,'caps_title1')}<br /><em>{t(lang,'caps_title2')}</em></h2>
          <div className="section-divider" />
          <p className="sc-desc">{t(lang,'caps_desc')}</p>
          {capsLoading ? <p className="sc-loading">Chargement…</p> : (
            <div className="cap-grid" key={`caps-${capItems.length}`}>
              {capItems.map((item, i) => (
                <CapCard key={item.src} item={item} index={i}
                  onClick={(it) => setSelected({ src: it.src, caption: it.name || it.quote })} />
              ))}
            </div>
          )}
        </div>

        <div className="sc-separator">
          <span className="sc-separator__line" />
          <span className="sc-separator__label">{t(lang,'shoes_separator') || 'Shoes Custom'}</span>
          <span className="sc-separator__line" />
        </div>

        {/* ── PARTIE 2 : Shoes Custom ── */}
        <div className="sc-block">
          <p className="section-label">{t(lang,'shoes_label')}</p>
          <h2 className="section-title">{t(lang,'shoes_title1')}<br /><em>{t(lang,'shoes_title2')}</em></h2>
          <div className="section-divider" />
          <div className="shoes-layout">
            <div className="shoes-text">
              <p>{t(lang,'shoes_intro') || "Chaussures transformées en œuvres d'art."}</p>
              <ul className="shoes-list">
                <li>{t(lang,'shoes_item1') || 'Peinture acrylique sur cuir'}</li>
                <li>{t(lang,'shoes_item2') || 'Marqueurs permanents'}</li>
                <li>{t(lang,'shoes_item3') || 'Graphismes & illustrations'}</li>
                <li>{t(lang,'shoes_item4') || 'Motifs sur mesure'}</li>
              </ul>
              {!shoesLoading && (
                <div className="shoes-thumbs">
                  {shoeItems.map((item) => (
                    <div key={item.src} className="shoes-thumb"
                      onClick={() => setSelected({ src: item.src, caption: item.name })}>
                      <img src={item.src} alt={item.name} />
                      <span>
                        {item.name}
                        {item.isRemote && <span className="shoes-thumb__new"> ✦</span>}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="shoes-video-wrap">
              {videoLoading ? <div className="shoes-video-placeholder">Chargement vidéo…</div> : (
                <video controls key={videoUrl}>
                  <source src={videoUrl} type="video/mp4" />
                  {t(lang,'video_not_supported') || 'Vidéo non supportée'}
                </video>
              )}
            </div>
          </div>
        </div>
      </div>

      <Lightbox src={selected?.src} caption={selected?.caption} onClose={() => setSelected(null)} />
    </div>
  );
}

export default ShoesCustomSection;