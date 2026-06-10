import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import clinicalImg from '../assets/images/clinical-assessment.webp';

const stacks = [
  { title: 'Foundation Stack', desc: 'Mandatory statutory training, fire safety, infection control, and hand hygiene.', icon: '🛡️' },
  { title: 'Clinical Stack', desc: 'Specialized medical modules including ECG, ventilator management, and pharmacology.', icon: '🏥' },
  { title: 'Soft-Skill Stack', desc: 'High-value skills focusing on patient communication, bedside manner, and ethics.', icon: '🗣️' },
  { title: 'Digital Health Stack', desc: 'Modern tools for telemedicine and government portal management.', icon: '💻' },
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/courses')
      .then(r => setCourses(r.data.courses))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ── HEADER ── */}
      <div className="section">
        <p className="eyebrow">OCTA Learning Stacks</p>
        <h2 className="sec-title">Role-Based <em>Training Excellence</em></h2>
        <p className="sec-lead">Organize your institutional journey with clear, role-based stacks designed to turn NABH standards into daily practice.</p>
        <div className="pill-strip" style={{ marginTop: 24 }}>
          {['NABH Aligned', 'Role-Based', 'Practical Templates', 'Audit Ready'].map(p => (
            <span key={p} className="pill">{p}</span>
          ))}
        </div>

        {/* clinical-assessment image — full height, no crop */}
        <img
          src={clinicalImg}
          alt="Two nursing students using stethoscopes to assess a simulation mannequin"
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 20,
            border: '1px solid var(--t18)',
            marginTop: 36,
          }}
        />
      </div>

      <div className="divider" />

      {/* ── LEARNING STACKS OVERVIEW ── */}
      <div className="section">
        <div className="grid-4">
          {stacks.map(s => (
            <div key={s.title} className="glass-card" style={{ padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <div className="card-title">{s.title}</div>
              <div className="card-body" style={{ fontSize: 13, color: 'var(--teal-deep)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── COURSE LISTING ── */}
      <div className="section">
        <p className="eyebrow" style={{ marginBottom: 32 }}>All Available Modules</p>
        {loading ? (
          <p style={{ color: 'var(--teal-deep)' }}>Loading modules...</p>
        ) : (
          <div className="grid-3">
            {courses.map(c => (
              <div
                key={c._id}
                style={{
                  background: 'var(--t06)',
                  border: '1px solid var(--t18)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'all .3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--t25)';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(15,61,56,0.10)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.borderColor = 'var(--t18)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid var(--t10)' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12 }}>{c.badge}</div>
                  <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: 'var(--teal-dark)' }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--teal-deep)', lineHeight: 1.6 }}>{c.description}</div>
                </div>
                <div style={{ padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 12, color: 'var(--teal-deep)' }}>⏱ {c.duration}</div>
                  <button
                    onClick={() => navigate('/contact')}
                    style={{
                      padding: '8px 20px',
                      background: 'var(--teal-dark)',
                      border: '1px solid var(--teal-dark)',
                      borderRadius: 50,
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-deep)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--teal-dark)'; }}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}