import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { loginWithData } = useAuth();

  useEffect(() => {
    // 1. Get parameters directly from the browser's URL object
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');

    console.log("DEBUG: Token found:", !!token);

    if (token && user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        
        // 2. Perform the login action
        loginWithData(token, parsedUser);
        
        // 3. Force redirect using replace
        console.log("DEBUG: Redirecting to dashboard...");
        navigate('/', { replace: true });
      } catch (err) {
        console.error("DEBUG: Parse error", err);
      }
    }
  }, [navigate, loginWithData]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Processing... Check your Console!</h1>
    </div>
  );
}