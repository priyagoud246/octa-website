import { useState, useEffect } from 'react';
import api from '../api/axios';
import Toast from '../components/Toast';

const interests = [
  'NABH 6th Edition Compliance Training',
  'Clinical Safety & Infection Prevention',
  'OSCE/OSPE Simulation',
  'Empathy & Communication Modules',
  'Co-Branded Academy Partnership',
  'Full Platform Demo',
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

export default function Contact() {
  const [form, setForm]       = useState({ firstName:'', lastName:'', email:'', institution:'', interest:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);
  const width    = useWindowWidth();
  const isMobile = width < 768;

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/enquiry', form);
      setToast({ msg: data.message, type: 'success' });
      setForm({ firstName:'', lastName:'', email:'', institution:'', interest:'', message:'' });
    } catch (err) {
      setToast({ msg: err.response?.data?.message || 'Something went wrong. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ boxSizing: 'border-box' }}>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{
        display:               'grid',
        gridTemplateColumns:   isMobile ? '1fr' : '1fr 1.2fr',
        gap:                   isMobile ? 32 : 60,
        alignItems:            'start',
        padding:               isMobile ? '32px 20px 48px' : '60px 48px',
        maxWidth:              1280,
        margin:                '0 auto',
        boxSizing:             'border-box',
      }}>

        {/* ── Left info panel ── */}
        <div>
          <p className="eyebrow">Get In Touch</p>
          <h2 className="sec-title" style={{ marginBottom: 16 }}>Let's <em>Collaborate</em></h2>
          <p style={{
            fontSize:    isMobile ? 15 : 16,
            fontWeight:  300,
            lineHeight:  1.8,
            color:       'var(--w60)',
            marginBottom: 28,
          }}>
            Whether you're a hospital administrator, training coordinator, or accreditation leader — we'd love to explore how OCTA can transform your institution's learning outcomes.
          </p>

          {[
            ['🏥', 'Organization',   'OCTA Healthcare Training'],
            ['📧', 'Email',          'partnerships@brivox.in'],
            ['📋', 'Certifications', 'IMC · NMCI · NABH 6th Edition'],
            ['🌐', 'Serving',        'Hospitals & Healthcare Institutions across India'],
          ].map(([icon, label, val]) => (
            <div key={label} style={{
              display:      'flex',
              gap:          14,
              alignItems:   'flex-start',
              padding:      '18px 0',
              borderBottom: '1px solid var(--w08)',
            }}>
              <div style={{
                width: 40, height: 40,
                background:  'var(--w08)',
                border:      '1px solid var(--w15)',
                borderRadius: 10,
                display:     'flex',
                alignItems:  'center',
                justifyContent: 'center',
                fontSize:    17,
                flexShrink:  0,
              }}>{icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--w60)', marginBottom:3 }}>{label}</div>
                <div style={{ fontSize: isMobile ? 13 : 15, lineHeight: 1.5 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Form ── */}
        <form onSubmit={submit} style={{
          background:    'var(--w08)',
          border:        '1px solid var(--w15)',
          borderRadius:  isMobile ? 16 : 24,
          padding:       isMobile ? '24px 20px' : 40,
          backdropFilter: 'blur(16px)',
          boxSizing:     'border-box',
          width:         '100%',
        }}>
          <h3 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 18 : 22, fontWeight:700, marginBottom:24 }}>
            Send an Enquiry
          </h3>

          {/* First + Last name row — stacks on mobile */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap:                 isMobile ? 0 : 16,
          }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input name="firstName" value={form.firstName} onChange={change} className="form-input" placeholder="Dr. Priya" required />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={change} className="form-input" placeholder="Sharma" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={change} className="form-input" placeholder="training@hospital.in" required />
          </div>

          <div className="form-group">
            <label className="form-label">Institution / Hospital</label>
            <input name="institution" value={form.institution} onChange={change} className="form-input" placeholder="Apollo Hospitals, Mumbai" required />
          </div>

          <div className="form-group">
            <label className="form-label">I'm interested in</label>
            <select name="interest" value={form.interest} onChange={change} className="form-select" required>
              <option value="">Select a programme…</option>
              {interests.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea name="message" value={form.message} onChange={change} className="form-textarea" placeholder="Tell us about your institution's training needs, team size, or any questions…" />
          </div>

          <button type="submit" className="btn-primary" style={{ width:'100%', padding: isMobile ? '14px' : undefined }} disabled={loading}>
            {loading ? 'Sending…' : 'Send Enquiry →'}
          </button>
        </form>

      </div>
    </div>
  );
}