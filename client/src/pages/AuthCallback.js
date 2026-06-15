import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithData } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userRaw = params.get('user');

    if (token && userRaw) {
      try {
        // 1. Decode and Parse safely
        const decodedUser = decodeURIComponent(userRaw);
        const parsedUser = JSON.parse(decodedUser);
        
        console.log('✅ Auth success, logging in...');
        
        // 2. Perform login
        loginWithData(token, parsedUser);
        
        // 3. Redirect to home or protected dashboard
        navigate('/', { replace: true });
      } catch (err) {
        console.error('❌ Parse error:', err);
        navigate('/login?error=parse_failed', { replace: true });
      }
    } else {
      console.error('❌ Missing credentials in URL');
      navigate('/login?error=no_auth_data', { replace: true });
    }
  }, [navigate, loginWithData, location.search]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5faf9',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', color: '#0f3d38' }}>
          Finalizing your secure login...
        </p>
      </div>
    </div>
  );
}