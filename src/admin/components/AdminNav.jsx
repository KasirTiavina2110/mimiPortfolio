import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/AdminNav.css';

const LINKS = [
  { to: '/admin',       label: 'Dashboard', icon: '◉' },
  { to: '/admin/media', label: 'Médias',    icon: '◈' },
];

export default function AdminNav() {
  const { signOut, user } = useAuth();
  const nav = useNavigate();
  const handleLogout = async () => { await signOut(); nav('/admin/login'); };

  return (
    <aside className="adm-nav">
      <div className="adm-nav__brand">
        <div className="adm-nav__logo">MR</div>
        <span className="adm-nav__title">Admin</span>
      </div>
      <nav className="adm-nav__links">
        {LINKS.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/admin'}
            className={({ isActive }) => `adm-nav__link ${isActive ? 'is-active' : ''}`}>
            <span className="adm-nav__icon">{l.icon}</span>{l.label}
          </NavLink>
        ))}
      </nav>
      <div className="adm-nav__footer">
        <span className="adm-nav__email">{user?.email}</span>
        <button className="adm-nav__logout" onClick={handleLogout}>Déconnexion</button>
      </div>
    </aside>
  );
}