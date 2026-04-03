import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// ── Brute-force guard côté client ───────────────────────
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS   = 15 * 60 * 1000; // 15 min

const getBFState = () => {
  try {
    return JSON.parse(localStorage.getItem('_adm_bf') || '{"attempts":0,"lockedUntil":0}');
  } catch { return { attempts: 0, lockedUntil: 0 }; }
};
const setBFState = (s) => localStorage.setItem('_adm_bf', JSON.stringify(s));
const resetBF    = () => localStorage.removeItem('_adm_bf');

export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // Récupérer la session existante
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email, password) => {
    setError(null);

    // Vérifier lockout
    const bf = getBFState();
    if (Date.now() < bf.lockedUntil) {
      const mins = Math.ceil((bf.lockedUntil - Date.now()) / 60000);
      setError(`Trop de tentatives. Réessaie dans ${mins} min.`);
      return { error: true };
    }

    setLoading(true);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (err) {
      const next = { attempts: bf.attempts + 1, lockedUntil: bf.lockedUntil };
      if (next.attempts >= MAX_ATTEMPTS) {
        next.lockedUntil = Date.now() + LOCKOUT_MS;
        next.attempts    = 0;
      }
      setBFState(next);
      setError('Email ou mot de passe incorrect.');
      return { error: err };
    }

    resetBF();
    setUser(data.user);
    return { data };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return { user, loading, error, setError, signIn, signOut };
}
