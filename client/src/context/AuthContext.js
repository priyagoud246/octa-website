import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios'; // Ensure this points to your configured axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = () => {
      const savedToken = localStorage.getItem('octa_token');
      const savedUser = localStorage.getItem('octa_user');

      if (savedToken && savedUser) {
        try {
          // Re-attach token to axios instance so all future requests are authorized
          api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          setUser(JSON.parse(savedUser));
        } catch (err) {
          console.error("Auth initialization error:", err);
          logout(); // Clear bad data
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // 2. Standard Login
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    handleAuthSuccess(data.token, data.user);
    return data.user;
  };

  // 3. OAuth Callback Login (The fix for your current flow)
  const loginWithData = (token, user) => {
    handleAuthSuccess(token, user);
  };

  // Helper to DRY (Don't Repeat Yourself) the auth logic
  const handleAuthSuccess = (token, user) => {
    localStorage.setItem('octa_token', token);
    localStorage.setItem('octa_user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  // 4. Logout
  const logout = () => {
    localStorage.removeItem('octa_token');
    localStorage.removeItem('octa_user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);