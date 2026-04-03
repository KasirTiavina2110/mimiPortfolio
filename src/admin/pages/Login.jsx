import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/Login.css';

export default function Login() {
  const [email, setEmail]   = useState('');
  const [pass,  setPass]    = useState('');
  const [show,  setShow]    = useState(false);
  const { signIn, user, loading, error, setError } = useAuth();
  const nav = useNavigate();

  useEffect(() => { if (user) nav('/admin', { replace: true }); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) { setError('Remplis tous les champs.'); return; }
    await signIn(email.trim().toLowerCase(), pass);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">MR</div>
        <h1 className="login-title">Espace Admin</h1>
        <p className="login-sub">Connexion sécurisée</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          {/* Honeypot anti-bot */}
          <input
            type="text" name="username" tabIndex="-1"
            style={{ position:'absolute', opacity:0, pointerEvents:'none', height:0 }}
          />

          <div className="login-field">
            <label htmlFor="adm-email">Email</label>
            <input
              id="adm-email" type="email" autoComplete="email"
              placeholder="admin@example.com"
              value={email} onChange={e => { setEmail(e.target.value); setError(null); }}
              maxLength={120}
            />
          </div>

          <div className="login-field">
            <label htmlFor="adm-pass">Mot de passe</label>
            <div className="login-field__pw">
              <input
                id="adm-pass" type={show ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={pass} onChange={e => { setPass(e.target.value); setError(null); }}
                maxLength={128}
              />
              <button
                type="button" className="login-field__eye"
                onClick={() => setShow(s => !s)}
                tabIndex="-1"
              >
                {show ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="login-hint">Accès réservé — Mihary Razafimbelo</p>
      </div>
    </div>
  );
}
