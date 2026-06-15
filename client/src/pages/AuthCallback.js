import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { loginWithData } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');
    const user   = params.get('user');

    console.log('=== AuthCallback Debug ===');
    console.log('Full URL:', window.location.href);
    console.log('Search:', window.location.search);
    console.log('token:', token);
    console.log('user raw:', user);
    console.log('loginWithData fn:', typeof loginWithData);

    if (token && user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        console.log('parsedUser:', parsedUser);
        loginWithData(token, parsedUser);
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Parse error:', err);
        navigate('/login?error=parse_failed', { replace: true });
      }
    } else {
      console.log('Missing token or user');
      navigate('/login?error=google_failed', { replace: true });
    }
  }, [navigate, loginWithData]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5faf9',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <p style={{ fontFamily: 'Sora,sans-serif', fontSize: 18, color: '#0f3d38' }}>
          Signing you in with Google…
        </p>
      </div>
    </div>
  );
}