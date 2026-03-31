import '../css/ContactSection.css';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ── Config EmailJS ──────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_e3aj42l';
const EMAILJS_TEMPLATE_ID = 'template_fn9uh8d';
const EMAILJS_PUBLIC_KEY  = 'TaeIdHiP8tfDKXeJG';

// ── Sécurité : limites de champs ────────────────────────
const LIMITS = {
  from_name:  { max: 80,   label: 'Nom' },
  phone:      { max: 20,   label: 'Téléphone' },
  from_email: { max: 120,  label: 'Email' },
  subject:    { max: 120,  label: 'Sujet' },
  message:    { max: 2000, label: 'Message' },
};

const EMPTY = { from_name: '', phone: '', from_email: '', subject: '', message: '' };

// ── Sécurité : sanitize — retire les balises HTML/scripts
const sanitize = (str) =>
  str.replace(/<[^>]*>/g, '').replace(/[<>&"']/g, (c) =>
    ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&#x27;' }[c])
  ).trim();

// ── Sécurité : validation email stricte
const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

// ── Sécurité : rate limiting — max 3 envois par heure
const RATE_KEY   = 'contact_submissions';
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 heure en ms

const canSubmit = () => {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const timestamps = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
    return { allowed: recent.length < RATE_LIMIT, remaining: RATE_LIMIT - recent.length };
  } catch {
    return { allowed: true, remaining: RATE_LIMIT };
  }
};

const recordSubmission = () => {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const timestamps = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
    localStorage.setItem(RATE_KEY, JSON.stringify([...recent, now]));
  } catch { /* silencieux */ }
};

// ────────────────────────────────────────────────────────

function ContactSection() {
  const [isOpen,  setIsOpen]  = useState(false);
  const [fields,  setFields]  = useState(EMPTY);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle');
  // Honeypot — champ caché : si rempli = bot, on bloque silencieusement
  const honeypotRef = useRef(null);

  // ── Changement de champ ─────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    const limit = LIMITS[name]?.max ?? 500;
    if (value.length > limit) return; // bloque au-delà de la limite
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
  };

  // ── Validation ──────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!fields.from_name.trim())        errs.from_name  = 'Nom requis';
    if (!fields.from_email.trim())       errs.from_email = 'Email requis';
    else if (!isValidEmail(fields.from_email)) errs.from_email = 'Format email invalide';
    if (!fields.message.trim())          errs.message    = 'Message requis';
    if (fields.message.trim().length < 10) errs.message  = 'Message trop court (min. 10 caractères)';
    return errs;
  };

  // ── Envoi ───────────────────────────────────────────
  const handleSend = async () => {
    // 1. Honeypot : si le champ caché est rempli → bot détecté
    if (honeypotRef.current?.value) {
      // On simule un succès pour ne pas alerter le bot
      setStatus('success');
      return;
    }

    // 2. Rate limiting
    const { allowed } = canSubmit();
    if (!allowed) {
      setStatus('rate_limit');
      return;
    }

    // 3. Validation
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setStatus('invalid');
      return;
    }

    setStatus('sending');

    // 4. Sanitize tous les champs avant envoi
    const safe = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, sanitize(v)])
    );

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  safe.from_name,
          phone:      safe.phone  || 'Non renseigné',
          from_email: safe.from_email,
          subject:    safe.subject || '(sans sujet)',
          message:    safe.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      recordSubmission(); // enregistre l'heure de soumission
      setStatus('success');
      setFields(EMPTY);
      setErrors({});
      setTimeout(() => setStatus('idle'), 4000);

    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="overlay-section contact-section">
      <div
        className="btn-close-section contact-close hover-target"
        onClick={() => document.body.classList.remove('contact-on')}
      />

      <div className="section-inner contact-inner">
        <p className="section-label">Me contacter</p>
        <h2 className="section-title">Envoyez<br /><em>un message</em></h2>
        <div className="section-divider" />

        <div className="contact-layout">

          {/* ── Gauche : Enveloppe ── */}
          <div className="contact-env-side">
            <div className={`c-envelope ${isOpen ? 'is-open' : ''}`}>
              <div className="c-env-body">
                <div className="c-env-fold" />
                <div className="c-env-letter-peek" />
              </div>
              <div className="c-env-flap" />
            </div>
            <button
              className="c-env-btn hover-target"
              onClick={() => setIsOpen((o) => !o)}
            >
              <span className="c-env-btn__icon">{isOpen ? '×' : '✉'}</span>
              {isOpen ? 'Fermer' : "Ouvrir l'enveloppe"}
            </button>
          </div>

          {/* ── Droite : Formulaire ── */}
          <div className={`contact-form-side ${isOpen ? 'is-visible' : ''}`}>

            {/* ── Feedback statut ── */}
            {status === 'success' && (
              <div className="form-feedback form-feedback--success">
                ✓ Message envoyé — je vous réponds bientôt !
              </div>
            )}
            {status === 'error' && (
              <div className="form-feedback form-feedback--error">
                ✗ Erreur d&apos;envoi — réessaie dans quelques instants
              </div>
            )}
            {status === 'rate_limit' && (
              <div className="form-feedback form-feedback--error">
                ✗ Trop de messages envoyés — réessaie dans 1 heure
              </div>
            )}

            <div className="form-wrapper">

              {/* ── Honeypot (invisible pour les humains) ── */}
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
              />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="c_name">
                    Nom * <span className="field-limit">{fields.from_name.length}/{LIMITS.from_name.max}</span>
                  </label>
                  <input
                    id="c_name" name="from_name" type="text"
                    placeholder="Votre nom"
                    autoComplete="name"
                    value={fields.from_name}
                    onChange={handleChange}
                    className={errors.from_name ? 'input-error' : ''}
                  />
                  {errors.from_name && <span className="field-error">{errors.from_name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="c_phone">
                    Téléphone <span className="field-limit">{fields.phone.length}/{LIMITS.phone.max}</span>
                  </label>
                  <input
                    id="c_phone" name="phone" type="tel"
                    placeholder="+261 ..."
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="c_email">
                  Email * <span className="field-limit">{fields.from_email.length}/{LIMITS.from_email.max}</span>
                </label>
                <input
                  id="c_email" name="from_email" type="email"
                  placeholder="votre@email.com"
                  autoComplete="email"
                  value={fields.from_email}
                  onChange={handleChange}
                  className={errors.from_email ? 'input-error' : ''}
                />
                {errors.from_email && <span className="field-error">{errors.from_email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="c_subject">
                  Sujet <span className="field-limit">{fields.subject.length}/{LIMITS.subject.max}</span>
                </label>
                <input
                  id="c_subject" name="subject" type="text"
                  placeholder="Objet du message"
                  value={fields.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="c_message">
                  Message * <span className="field-limit">{fields.message.length}/{LIMITS.message.max}</span>
                </label>
                <textarea
                  id="c_message" name="message" rows="5"
                  placeholder="Votre message..."
                  value={fields.message}
                  onChange={handleChange}
                  className={errors.message ? 'input-error' : ''}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button
                className={`btn-send hover-target ${status === 'sending' ? 'btn-send--loading' : ''}`}
                onClick={handleSend}
                disabled={status === 'sending' || status === 'rate_limit'}
              >
                {status === 'sending' ? 'Envoi...' : 'Envoyer ✉'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactSection;