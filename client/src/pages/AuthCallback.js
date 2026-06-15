import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');
    const user   = params.get('user');

    if (token && user) {
      // Save to localStorage
      localStorage.setItem('octa_token', token);
      localStorage.setItem('octa_user',  decodeURIComponent(user));
      // Redirect to home
      navigate('/', { replace: true });
      window.location.reload(); // refresh so AuthContext picks up new user
    } else {
      navigate('/login?error=google_failed', { replace: true });
    }
  }, [navigate]);

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