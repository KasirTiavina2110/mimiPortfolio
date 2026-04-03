import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login          from './pages/Login';
import Dashboard      from './pages/Dashboard';
import MediaManager   from './pages/MediaManager';

export default function AdminApp() {
  useEffect(() => {
    // Désactive cursor custom + overflow hidden du site public
    document.body.classList.add('is-admin');
    return () => document.body.classList.remove('is-admin');
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path=""      element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="media" element={<ProtectedRoute><MediaManager /></ProtectedRoute>} />
      <Route path="*"     element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}