import '../css/AboutSection.css';
import miharyProfileImage from '../assets/images/Mihary.jpg';

// ─────────────────────────────────────────────────────────
//  COMPOSANT : AboutSection
//  Section overlay "À propos" — activée par body.about-on
// ─────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <div className="overlay-section about-section">
      <div className="btn-close-section about-close hover-target" />

      <div className="section-inner about-inner">
        <div className="about-grid">
          {/* Photo */}
          <div className="about-photo-wrap">
            <div className="about-photo-frame">
              <img
                src={miharyProfileImage}
                alt="Mihary Razafimbelo"
                className="about-photo"
              />
            </div>
            <p className="about-signature">Miss Razafimbelo 🕶</p>
          </div>

          {/* Texte */}
          <div className="about-content">
            <p className="section-label">À propos</p>
            <h2 className="section-title">
              Médecine<br />
              <em>comme un art</em>
            </h2>
            <div className="section-divider" />

            <p className="about-bio">
              Thésard à la faculté de médecine d&apos;Antananarivo,
              et à mes heures perdues, je peins des tableaux.
            </p>
            <p className="about-bio">
              Passionnée par le corps humain depuis mon enfance, j&apos;ai décidé d&apos;en
              faire ma vocation. Pour moi, la médecine n&apos;est pas seulement une
              science, c&apos;est un art.
            </p>
            <p className="about-bio about-bio--accent">
              « La médecine, c&apos;est de l&apos;art. »
            </p>
            <p className="about-bio">
              Mon objectif est de fusionner mon métier et ma passion. C&apos;est un défi
              de taille, mais je suis prête à le relever avec détermination et
              enthousiasme.
            </p>

            <div className="about-tags">
              <span className="about-tag">Médecine 🩺</span>
              <span className="about-tag">Peinture 🎨</span>
              <span className="about-tag">Tote Bags 🛍</span>
              <span className="about-tag">Shoes Custom 👟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
