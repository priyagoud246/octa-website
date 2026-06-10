import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

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
      setToast({ msg:`Welcome back, ${user.name}!`, type:'success' });
      setTimeout(() => navigate(user.role === 'admin' ? '/admin' : '/'), 1000);
    } catch (err) {
      setToast({ msg: err.response?.data?.message || 'Login failed', type:'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:      'calc(100vh - 88px)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '24px 16px',
      boxSizing:      'border-box',
    }}>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{
        background:    'var(--w08)',
        border:        '1px solid var(--w15)',
        borderRadius:  20,
        padding:       'clamp(28px, 6vw, 48px)',
        backdropFilter:'blur(16px)',
        width:         '100%',
        maxWidth:      440,
        boxSizing:     'border-box',
      }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:24, letterSpacing:'0.12em', marginBottom:4 }}>OCTA</div>
          <div style={{ fontSize:11, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--w60)', marginBottom:20 }}>Healthcare Training</div>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:700, margin:0 }}>Sign In</h2>
        </div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={change} className="form-input" placeholder="admin@octa.in" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" value={form.password} onChange={change} className="form-input" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary" style={{ width:'100%', marginTop:8 }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:20, fontSize:14, color:'var(--w60)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color:'var(--mist)', textDecoration:'none' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}