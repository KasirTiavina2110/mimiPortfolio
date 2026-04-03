import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="adm-splash">Chargement…</div>;
  return user ? children : <Navigate to="/admin/login" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
