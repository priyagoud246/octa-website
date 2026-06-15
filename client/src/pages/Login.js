import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

// Google icon SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7L6 33.5C9.5 39.6 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.1 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
);

export default function Login() {
  const [form,    setForm]    = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      setToast({ msg: `Welcome back, ${user.name.split(' ')[0]}! 👋`, type:'success' });
      setTimeout(() => navigate(user.role === 'admin' ? '/admin' : '/'), 1000);
    } catch (err) {
      setToast({ msg: err.response?.data?.message || 'Incorrect email or password', type:'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendURL = process.env.REACT_APP_API_URL
      ? process.env.REACT_APP_API_URL.replace('/api', '')
      : 'http://localhost:5000';
    window.location.href = `${backendURL}/api/auth/google`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #e6f7f4 0%, #ffffff 50%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', paddingTop: '88px',
    }}>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(15,61,56,0.12)',
        borderRadius: 24, padding: '48px',
        width: '100%', maxWidth: 460,
        boxShadow: '0 8px 40px rgba(15,61,56,0.10)',
      }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ width:52, height:52, background:'#0f3d38', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:18, color:'#fff' }}>OC</span>
          </div>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:26, fontWeight:800, color:'#0f3d38', marginBottom:6 }}>
            Welcome Back
          </h2>
          <p style={{ fontSize:14, color:'#4a9e94' }}>Sign in to your OCTA account</p>
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            width: '100%', padding: '13px 20px',
            background: '#ffffff',
            border: '1.5px solid rgba(15,61,56,0.15)',
            borderRadius: 12, fontSize: 15, fontWeight: 600,
            color: '#0f3d38', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'all .2s',
            boxShadow: '0 2px 8px rgba(15,61,56,0.06)',
            marginBottom: 20,
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow='0 4px 16px rgba(15,61,56,0.12)'; e.currentTarget.style.borderColor='rgba(15,61,56,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 8px rgba(15,61,56,0.06)'; e.currentTarget.style.borderColor='rgba(15,61,56,0.15)'; }}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:'rgba(15,61,56,0.10)' }} />
          <span style={{ fontSize:13, color:'#4a9e94', fontWeight:500 }}>or sign in with email</span>
          <div style={{ flex:1, height:1, background:'rgba(15,61,56,0.10)' }} />
        </div>

        {/* Email / Password form */}
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              name="email" type="email" value={form.email} onChange={change}
              className="form-input" placeholder="priyanka@octa.in"
              required autoComplete="email"
            />
          </div>
          <div className="form-group" style={{ marginBottom:28 }}>
            <label className="form-label">Password</label>
            <input
              name="password" type="password" value={form.password} onChange={change}
              className="form-input" placeholder="••••••••"
              required autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary"
            style={{ width:'100%', justifyContent:'center', padding:'15px' }}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:24, fontSize:14, color:'#4a9e94' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color:'#0f3d38', textDecoration:'none', fontWeight:700 }}>
            Create one
          </Link>
        </p>

        <div style={{ marginTop:20, padding:'12px 16px', background:'rgba(15,61,56,0.04)', border:'1px solid rgba(15,61,56,0.08)', borderRadius:10 }}>
          <p style={{ fontSize:12, color:'#4a9e94', textAlign:'center', lineHeight:1.6 }}>
          </p>
        </div>
      </div>
    </div>
  );
}