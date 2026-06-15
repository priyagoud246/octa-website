import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { loginWithData } = useAuth();
  const hasRun = useRef(false); // ← Prevents double-execution

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    console.log("DEBUG: Full URL:", window.location.href);
    console.log("DEBUG: Token:", token);
    console.log("DEBUG: User param:", userParam);

    if (!token) {
      console.error("DEBUG: No token found — redirecting to login");
      navigate('/login', { replace: true });
      return;
    }

    try {
      // Handle case where 'user' param may be missing
      const parsedUser = userParam
        ? JSON.parse(decodeURIComponent(userParam))
        : null;

      loginWithData(token, parsedUser);

      console.log("DEBUG: Login success, redirecting...");
      navigate('/', { replace: true });
    } catch (err) {
      console.error("DEBUG: Parse error:", err);
      navigate('/login', { replace: true });
    }
  }, []); // ← Empty deps — runs once only, ref guards against StrictMode double-fire

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <p>Signing you in...</p>
    </div>
  );
}