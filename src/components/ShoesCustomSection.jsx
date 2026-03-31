import '../css/ShoesCustomSection.css';
import shoesCustomVideo from '../assets/images/Shoes_custom.mp4';

// ─────────────────────────────────────────────────────────
//  COMPOSANT : ShoesCustomSection
// ─────────────────────────────────────────────────────────

function ShoesCustomSection() {
  return (
    <div className="overlay-section ShoesCustom-section">
      <div className="btn-close-section ShoesCustom-close hover-target" />

      <div className="section-inner">
        <p className="section-label">Personnalisation</p>
        <h2 className="section-title">
          Shoes<br />
          <em>Custom</em>
        </h2>
        <div className="section-divider" />

        <div className="shoes-layout">
          <div className="shoes-text">
            <p>
              Les shoes custom sont des chaussures transform&eacute;es en v&eacute;ritables
              &oelig;uvres d&apos;art. Chaque paire devient une toile o&ugrave; s&apos;expriment des
              motifs uniques, des graphismes personnels ou des illustrations
              originales.
            </p>
            <ul className="shoes-list">
              <li>Peinture acrylique sur cuir</li>
              <li>Marqueurs permanents</li>
              <li>Graphismes & illustrations</li>
              <li>Motifs sur mesure</li>
            </ul>
          </div>

          <div className="shoes-video-wrap">
            <video controls>
              <source src={shoesCustomVideo} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoesCustomSection;
