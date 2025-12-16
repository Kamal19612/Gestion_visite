/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, getProfile } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // fetch user profile when a token exists but no user object
  useEffect(() => {
    let mounted = true;
    async function fetchProfile() {
      if (!token) return;
      if (user) return;
      setLoading(true);
      try {
        const me = await getProfile();
        if (mounted) setUser(me);
      } catch {
        // backend may not expose /auth/me; ignore silently
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProfile();
    return () => { mounted = false };
  }, [token, user]);

  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    // support different token key names
    const t = data.token || data.accessToken || data.jwt || data;
    setToken(t);
    // optionally set user info if present
    if (data.user) setUser(data.user);
    else {
      // try to fetch profile after login if backend doesn't return user
      try {
        setLoading(true);
        const me = await getProfile();
        setUser(me);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    navigate('/dashboard');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
