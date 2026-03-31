/* cSpell:disable */
import '../css/PaintingSection.css';
import Hexagon from './Hexagon';

import tableauImage from '../assets/images/Tableau.jpg';
import tableauImage2 from '../assets/images/Tableau2.jpg';
import tableauImage1 from '../assets/images/Tableau1.jpg';
import tableauImage4 from '../assets/images/WomanPortrait.PNG';
import tableauImage3 from '../assets/images/WomanPortrait5.PNG';

// ─────────────────────────────────────────────────────────
//  COMPOSANT : PaintingSection
// ─────────────────────────────────────────────────────────

const hexagonData = [
  { image: tableauImage1, title: 'Œuvre 1', description: "Description pour l'œuvre 1" },
  { image: tableauImage2, title: 'Œuvre 2', description: "Description pour l'œuvre 2" },
  { image: tableauImage, title: 'Œuvre 3', description: "Description pour l'œuvre 3" },
  { image: tableauImage4, title: 'Œuvre 4', description: "Description pour l'œuvre 4" },
  { image: tableauImage3, title: 'Œuvre 5', description: "Description pour l'œuvre 5" },
];

function PaintingSection() {
  return (
    <div className="overlay-section Painting-section">
      <div className="btn-close-section Painting-close hover-target" />

      <div className="section-inner">
        <p className="section-label">Galerie</p>
        <h2 className="section-title">
          Peintures &<br />
          <em>Tableaux</em>
        </h2>
        <div className="section-divider" />

        <p className="painting-intro">
          Techniques employées : peinture à l&apos;huile · aquarelle · acrylique · gouache · encre
        </p>

        <ul id="categories" className="hex-grid clr">
          <li className="pusher" />
          {hexagonData.map((hex, i) => (
            <Hexagon
              key={i}
              image={hex.image}
              title={hex.title}
              description={hex.description}
            />
          ))}
          <li className="pusher" />
        </ul>
      </div>
    </div>
  );
}

export default PaintingSection;
/* cSpell:enable */
