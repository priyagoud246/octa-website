import { useState } from 'react';
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

export default function Contact() {
  const [form, setForm]     = useState({ firstName:'', lastName:'', email:'', institution:'', interest:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast]   = useState(null);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/enquiry', form);
      setToast({ msg: data.message, type:'success' });
      setForm({ firstName:'', lastName:'', email:'', institution:'', interest:'', message:'' });
    } catch (err) {
      setToast({ msg: err.response?.data?.message || 'Something went wrong. Try again.', type:'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:60, alignItems:'start', padding:'60px 48px', maxWidth:1280, margin:'0 auto' }}>

        {/* Left info */}
        <div>
          <p className="eyebrow">Get In Touch</p>
          <h2 className="sec-title" style={{ marginBottom:24 }}>Let's <em>Collaborate</em></h2>
          <p style={{ fontSize:16, fontWeight:300, lineHeight:1.8, color:'var(--w60)', marginBottom:40 }}>Whether you're a hospital administrator, training coordinator, or accreditation leader — we'd love to explore how OCTA can transform your institution's learning outcomes.</p>

          {[
            ['🏥','Organization','OCTA Healthcare Training'],
            ['📧','Email','partnerships@brivox.in'],
            ['📋','Certifications','IMC · NMCI · NABH 6th Edition'],
            ['🌐','Serving','Hospitals & Healthcare Institutions across India'],
          ].map(([icon,label,val]) => (
            <div key={label} style={{ display:'flex', gap:16, alignItems:'flex-start', padding:'24px 0', borderBottom:'1px solid var(--w08)' }}>
              <div style={{ width:44, height:44, background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--w60)', marginBottom:4 }}>{label}</div>
                <div style={{ fontSize:15 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:24, padding:40, backdropFilter:'blur(16px)' }}>
          <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:700, marginBottom:28 }}>Send an Enquiry</h3>

          <div className="form-row">
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

          <button type="submit" className="btn-primary" style={{ width:'100%' }} disabled={loading}>
            {loading ? 'Sending…' : 'Send Enquiry →'}
          </button>
        </form>
      </div>
    </div>
  );
}