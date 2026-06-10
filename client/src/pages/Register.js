import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function Register() {
  const [form,    setForm]    = useState({ name:'', email:'', password:'', institution:'', phone:'' });
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      setToast({ msg:'Account created! Redirecting…', type:'success' });
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setToast({ msg: err.response?.data?.message || 'Registration failed', type:'error' });
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
        background:     'var(--w08)',
        border:         '1px solid var(--w15)',
        borderRadius:   20,
        padding:        'clamp(24px, 6vw, 48px)',
        backdropFilter: 'blur(16px)',
        width:          '100%',
        maxWidth:       480,
        boxSizing:      'border-box',
      }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:22, letterSpacing:'0.12em', marginBottom:4 }}>OCTA</div>
          <div style={{ fontSize:11, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--w60)', marginBottom:16 }}>Healthcare Training</div>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:700, margin:0 }}>Create Account</h2>
        </div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" value={form.name} onChange={change} className="form-input" placeholder="Dr. Priya Sharma" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={change} className="form-input" placeholder="priya@hospital.in" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" value={form.password} onChange={change} className="form-input" placeholder="Min 6 characters" required />
          </div>
          <div className="form-group">
            <label className="form-label">Institution (optional)</label>
            <input name="institution" value={form.institution} onChange={change} className="form-input" placeholder="Apollo Hospitals" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone (optional)</label>
            <input name="phone" value={form.phone} onChange={change} className="form-input" placeholder="+91 98765 43210" />
          </div>
          <button type="submit" className="btn-primary" style={{ width:'100%', marginTop:8 }} disabled={loading}>
            {loading ? 'Creating…' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:20, fontSize:14, color:'var(--w60)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'var(--mist)', textDecoration:'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}