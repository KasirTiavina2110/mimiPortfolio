import '../css/ToteBagasySection.css';
import Card from './card';

import toteBagImage1 from '../assets/images/ToteBag.jpg';
import toteBagImage2 from '../assets/images/TotteBagasy2.jpg';
import toteBagImage3 from '../assets/images/TotteBagasy3.jpg';
import toteBagImage4 from '../assets/images/TotteBagasy4.jpg';

// ─────────────────────────────────────────────────────────
//  COMPOSANT : ToteBagasySection
// ─────────────────────────────────────────────────────────

const cardsData = [
  { image: toteBagImage1, header: 'Tote Bag 1', content: "Modèle numéro 1 que j'ai fait pour ma sœur ❤" },
  { image: toteBagImage2, header: 'Tote Bag 2', content: 'Tote Betsiky 😁' },
  { image: toteBagImage3, header: 'Tote Bag 3', content: 'Tote Bagasy Miaina 🧬' },
  { image: toteBagImage4, header: 'Tote Bag 4', content: 'Tote Bagasy Fo sy Saina 🔥' },
];

function ToteBagasySection() {
  return (
    <div className="overlay-section ToteBagasy-section">
      <div className="btn-close-section ToteBagasy-close hover-target" />

      <div className="section-inner">
        <p className="section-label">Créations textiles</p>
        <h2 className="section-title">
          Tote<br />
          <em>Bagasy</em>
        </h2>
        <div className="section-divider" />

        <p className="tote-desc">
          Un tote bag artisanal, c&apos;est bien plus qu&apos;un sac — c&apos;est une toile de
          libre expression. Chaque pièce est unique, dessinée à la main avec amour.
        </p>

        <div className="tote-grid">
          {cardsData.map((card, i) => (
            <Card
              key={i}
              dataImage={card.image}
              header={card.header}
              content={card.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToteBagasySection;
