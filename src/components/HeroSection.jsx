import '../css/HeroSection.css';

// ─────────────────────────────────────────────────────────
//  COMPOSANT : HeroSection
//  Écran d'accueil principal — typographie éditoriale,
//  navigation par body classes (même logique qu'avant).
// ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <div className="hero-section">
      {/* Grain texture overlay */}
      <div className="hero-grain" aria-hidden="true" />

      {/* Navigation top */}
      <nav className="hero-nav">
        <span className="hero-nav__logo">MR</span>
        <div className="hero-nav__links">
          <span className="about-text hover-target hero-nav__link">À propos</span>
          <span className="contact-text hover-target hero-nav__link">Contact</span>
        </div>
      </nav>

      {/* Centre */}
      <div className="hero-center">
        <p className="hero-eyebrow">Portfolio · 2026</p>

        <h1 className="hero-name">
          <span className="hero-name__first">Mihary</span>
          <span className="hero-name__last">Razafimbelo</span>
        </h1>

        <p className="hero-role">
          <span className="hero-role__tag">Délégué médicale  Thesard</span>
          <span className="hero-role__sep" aria-hidden="true">—</span>
          <span className="hero-role__tag">Thesard en medecine</span>
          <span className="hero-role__sep" aria-hidden="true">—</span>
          <span className="hero-role__tag">Artiste</span>
        </p>

        {/* Catégories de projets */}
        <div className="hero-projects">
          <button className="ToteBagasy  hover-target hero-project-btn">
            <span className="hero-project-btn__icon">🛍</span>
            <span>ToteBagasy</span>
          </button>
          <button className="ShoesCustom hover-target hero-project-btn">
            <span className="hero-project-btn__icon">👟</span>
            <span>Shoes Custom</span>
          </button>
          <button className="Painting    hover-target hero-project-btn">
            <span className="hero-project-btn__icon">🖌</span>
            <span>Painting</span>
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-hint" aria-hidden="true">
        <div className="hero-hint__line" />
        <span>Sentir - Creer - Repeter</span>
      </div>
    </div>
  );
}

export default HeroSection;
