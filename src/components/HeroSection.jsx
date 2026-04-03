import '../css/HeroSection.css';
import { useTheme } from '../contexts/ThemeContext';
import { useLang }  from '../contexts/LangContext';
import { t }        from '../i18n/translations';

function HeroSection() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang }   = useLang();

  return (
    <div className="hero-section">
      <div className="hero-grain" aria-hidden="true" />

      <nav className="hero-nav">
        <span className="hero-nav__logo">MR</span>
        <div className="hero-nav__links">
          <span className="about-text hover-target hero-nav__link">{t(lang,'nav_about')}</span>
          <span className="contact-text hover-target hero-nav__link">{t(lang,'nav_contact')}</span>
        </div>
        <div className="hero-nav__controls">
          {/* Toggle langue */}
          <button className="hero-ctrl-btn hover-target" onClick={toggleLang} title={t(lang,'toggle_lang_title')}>
            {lang === 'FR' ? 'EN' : 'FR'}
          </button>
          {/* Toggle thème */}
          <button className="hero-ctrl-btn hover-target" onClick={toggleTheme} title={t(lang,'toggle_theme_title')}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </nav>

      <div className="hero-center">
        <p className="hero-eyebrow">{t(lang,'eyebrow')}</p>
        <h1 className="hero-name">
          <span className="hero-name__first">Mihary</span>
          <span className="hero-name__last">Razafimbelo</span>
        </h1>
        <p className="hero-role">
          <span className="hero-role__tag">{t(lang,'role_doctor')}</span>
          <span className="hero-role__sep" aria-hidden="true">—</span>
          <span className="hero-role__tag">{t(lang,'role_artist')}</span>
        </p>
        <div className="hero-projects">
          <button className="ToteBagasy hover-target hero-project-btn">
            <span className="hero-project-btn__icon">🛍</span>
            <span>{t(lang,'btn_tote')}</span>
          </button>
          <button className="ShoesCustom hover-target hero-project-btn">
            <span className="hero-project-btn__icon">👟</span>
            <span>{t(lang,'btn_shoes')}</span>
            <span className="hero-project-btn__icon">🎓</span>
          </button>
          <button className="Painting hover-target hero-project-btn">
            <span className="hero-project-btn__icon">🖌</span>
            <span>{t(lang,'btn_painting')}</span>
          </button>
        </div>
      </div>

      <div className="hero-hint" aria-hidden="true">
        <div className="hero-hint__line" />
        <span>{t(lang,'hint')}</span>
      </div>
    </div>
  );
}

export default HeroSection;