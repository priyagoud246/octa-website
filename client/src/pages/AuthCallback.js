import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { loginWithData } = useAuth();

  useEffect(() => {
    // Force grab from window.location directly
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userRaw = params.get('user');

    if (token && userRaw) {
      try {
        const user = JSON.parse(decodeURIComponent(userRaw));
        
        // 1. Log the data to verify it arrived
        console.log("AuthCallback received:", { token, user });

        // 2. Set the auth state
        loginWithData(token, user);

        // 3. Force redirect to dashboard/home
        // Using replace: true clears the callback from browser history
        navigate('/', { replace: true });
      } catch (e) {
        console.error("Failed to parse user:", e);
        navigate('/login');
      }
    }
  }, [navigate, loginWithData]);

  return <div>Processing Login...</div>;
}