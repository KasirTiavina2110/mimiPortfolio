import '../css/AboutSection.css';
import { useLang } from '../contexts/LangContext';
import { t } from '../i18n/translations';
import { useMediaSingle } from '../admin/hooks/useMedia';
import localPhoto from '../assets/images/FutureDR.PNG';

function AboutSection() {
  const { lang } = useLang();
  const { url: photoUrl } = useMediaSingle('about', localPhoto);

  const handleTagClick = (key) => {
    const map = { tag_medicine:null, tag_painting:'Painting', tag_tote:'ToteBagasy', tag_shoes:'ShoesCustom' };
    const section = map[key];
    if (!section) return;
    document.body.classList.remove('about-on');
    document.body.classList.add(`${section}-on`);
  };

  return (
    <div className="overlay-section about-section">
      <div className="btn-close-section about-close hover-target" />
      <div className="section-inner about-inner">
        <div className="about-grid">
          <div className="about-photo-wrap">
            <div className="about-photo-frame">
              <img src={photoUrl} alt="Mihary Razafimbelo" className="about-photo" />
            </div>
            <p className="about-signature">{t(lang,'about_sig')}</p>
          </div>
          <div className="about-content">
            <p className="section-label">{t(lang,'about_label')}</p>
            <h2 className="section-title">{t(lang,'about_title1')}<br /><em>{t(lang,'about_title2')}</em></h2>
            <div className="section-divider" />
            <p className="about-bio">{t(lang,'about_bio1')}</p>
            <p className="about-bio">{t(lang,'about_bio2')}</p>
            <p className="about-bio about-bio--accent">{t(lang,'about_quote')}</p>
            <p className="about-bio">{t(lang,'about_bio3')}</p>
            <div className="about-tags">
              {['tag_medicine','tag_painting','tag_tote','tag_shoes'].map(key => (
                <span key={key} className="about-tag" onClick={() => handleTagClick(key)} style={{ cursor:'pointer' }}>
                  {t(lang, key)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;