import PropTypes from 'prop-types';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { useAnalytics } from '../hooks/useAnalytics';
import AdminNav from '../components/AdminNav';
import '../css/Dashboard.css';

const ACCENT  = '#d4789a';
const ACCENT2 = '#9b8eb8';
const ACCENT3 = '#7ec8c8';
const ACCENT4 = '#f0a070';
const PIE_COLORS = [ACCENT, ACCENT2, ACCENT3, ACCENT4, '#a0d080', '#f0d080'];

/* ── Stat card ─────────────────────────────────────────── */
function StatCard({ label, value, sub, icon, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <div>
          <p className="stat-card__label">{label}</p>
          <p className="stat-card__value">{value ?? '—'}</p>
          {sub && <p className="stat-card__sub">{sub}</p>}
        </div>
        <div className="stat-card__icon">{icon}</div>
      </div>
      {trend !== undefined && (
        <div className={`stat-card__trend ${trend >= 0 ? 'up' : 'down'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs mois dernier
        </div>
      )}
    </div>
  );
}
StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sub: PropTypes.string, icon: PropTypes.string, trend: PropTypes.number,
};

/* ── Tooltip custom ────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="chart-tooltip__val">
          {p.name} : {p.value}
        </p>
      ))}
    </div>
  );
};
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default function Dashboard() {
  const { stats, loading, refetch } = useAnalytics();

  // Formater les données pour recharts
  const areaData = (stats?.viewsChart || []).map(([date, count]) => ({
    date: date.slice(5), vues: count,
  }));

  const barData = (stats?.byPage || []).slice(0, 6).map(([page, count]) => ({
    name: page, vues: count,
  }));

  const pieData = (stats?.byCountry || []).slice(0, 6).map(c => ({
    name: c.name.length > 12 ? c.name.slice(0, 12) + '…' : c.name,
    value: c.count,
  }));

  return (
    <div className="adm-layout">
      <AdminNav />
      <main className="adm-main">

        {/* ── Header ── */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-subtitle">Vue d&apos;ensemble du site</p>
          </div>
          <button className="dash-refresh" onClick={refetch} disabled={loading}>
            {loading ? '…' : '↻ Rafraîchir'}
          </button>
        </div>

        {loading ? (
          <div className="dash-loading">
            <div className="dash-spinner" />
            Chargement des statistiques…
          </div>
        ) : (
          <>
            {/* ── Stat cards ── */}
            <div className="stat-grid">
              <StatCard icon="👁" label="Vues totales"
                value={stats?.totalViews?.toLocaleString()}
                sub="depuis le lancement" trend={12} />
              <StatCard icon="✉" label="Messages reçus"
                value={stats?.totalMessages?.toLocaleString()}
                sub="via formulaire Contact" trend={5} />
              <StatCard icon="📅" label="Vues ce mois"
                value={stats?.viewsChart?.reduce((s,d)=>s+d[1],0)?.toLocaleString()}
                sub="30 derniers jours" trend={-3} />
              <StatCard icon="🌍" label="Pays visiteurs"
                value={String(stats?.byCountry?.length || 0)}
                sub="pays uniques" />
            </div>

            {/* ── Area chart + Bar chart ── */}
            <div className="dash-row">
              <div className="dash-section" style={{ flex: 2 }}>
                <h2 className="dash-section__title">Visites — 14 derniers jours</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={areaData} margin={{ top:5, right:10, bottom:5, left:0 }}>
                    <defs>
                      <linearGradient id="gradVues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={ACCENT} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={ACCENT} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,120,154,0.08)" />
                    <XAxis dataKey="date" tick={{ fontSize:10, fill:'var(--adm-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize:10, fill:'var(--adm-muted)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="vues" name="Vues"
                      stroke={ACCENT} strokeWidth={2}
                      fill="url(#gradVues)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="dash-section" style={{ flex: 1 }}>
                <h2 className="dash-section__title">Sections populaires</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} layout="vertical" margin={{ top:0, right:10, bottom:0, left:10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,120,154,0.08)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize:10, fill:'var(--adm-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" width={70} tick={{ fontSize:10, fill:'var(--adm-muted)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="vues" name="Vues" fill={ACCENT2} radius={[0,4,4,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ── Pie chart pays + messages ── */}
            <div className="dash-row">
              <div className="dash-section" style={{ flex: 1 }}>
                <h2 className="dash-section__title">Répartition par pays</h2>
                {pieData.length === 0 ? (
                  <p className="dash-empty">Aucune donnée pays encore</p>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} cx="40%" cy="50%" innerRadius={50} outerRadius={80}
                        paddingAngle={3} dataKey="value">
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8}
                        wrapperStyle={{ fontSize:'11px', color:'var(--adm-muted)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="dash-section" style={{ flex: 1 }}>
                <h2 className="dash-section__title">Derniers messages</h2>
                {!stats?.recentMessages?.length ? (
                  <p className="dash-empty">Aucun message</p>
                ) : (
                  <ul className="dash-list">
                    {stats.recentMessages.slice(0, 6).map((m, i) => (
                      <li key={i} className="dash-list__item">
                        <div className="dash-list__avatar">
                          {(m.from_name || '?')[0].toUpperCase()}
                        </div>
                        <div className="dash-list__info">
                          <p className="dash-list__label">{m.from_name || 'Anonyme'}</p>
                          <p className="dash-list__sub">{m.subject || '(sans sujet)'}</p>
                        </div>
                        <span className="dash-list__date">
                          {new Date(m.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* ── Pays détail ── */}
            {stats?.byCountry?.length > 0 && (
              <div className="dash-section">
                <h2 className="dash-section__title">Détail pays visiteurs</h2>
                <div className="country-grid">
                  {stats.byCountry.map((c, i) => (
                    <div key={c.code} className="country-item">
                      <div className="country-item__dot"
                        style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="country-item__name">{c.name}</span>
                      <div className="country-item__bar-wrap">
                        <div className="country-item__bar"
                          style={{
                            width: `${Math.round((c.count / stats.byCountry[0].count) * 100)}%`,
                            background: PIE_COLORS[i % PIE_COLORS.length],
                          }} />
                      </div>
                      <span className="country-item__count">{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}