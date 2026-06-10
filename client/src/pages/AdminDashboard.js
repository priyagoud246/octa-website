import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const STATUS_COLOR = {
  new:          { bg:'rgba(109,219,201,0.15)', color:'#6ddbc9', border:'rgba(109,219,201,0.3)' },
  contacted:    { bg:'rgba(240,168,68,0.15)',  color:'#f0a844', border:'rgba(240,168,68,0.3)'  },
  'in-progress':{ bg:'rgba(123,189,182,0.15)', color:'#7bbdb6', border:'rgba(123,189,182,0.3)' },
  closed:       { bg:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.4)', border:'rgba(255,255,255,0.1)' },
};

export default function AdminDashboard() {
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const [stats,     setStats]     = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [filter,    setFilter]    = useState('');
  const [selected,  setSelected]  = useState(null); // full detail modal
  const [toast,     setToast]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [seeding,   setSeeding]   = useState(false);

  // Guard
  useEffect(() => {
    if (!user) navigate('/login');
    else if (user.role !== 'admin') navigate('/');
  }, [user, navigate]);

  // Load data
  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    Promise.all([api.get('/admin/dashboard'), api.get('/enquiry')])
      .then(([dash, enq]) => {
        setStats(dash.data.stats);
        setEnquiries(enq.data.enquiries);
      })
      .catch(() => setToast({ msg: 'Failed to load dashboard data', type: 'error' }))
      .finally(() => setLoading(false));
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/enquiry/${id}`, { status });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      setToast({ msg: `Status updated to "${status}"`, type: 'success' });
    } catch {
      setToast({ msg: 'Failed to update status', type: 'error' });
    }
  };

  const seedCourses = async () => {
    setSeeding(true);
    try {
      const { data } = await api.post('/courses/seed');
      setToast({ msg: data.message, type: 'success' });
    } catch (err) {
      setToast({ msg: err.response?.data?.message || 'Seed failed', type: 'error' });
    } finally {
      setSeeding(false);
    }
  };

  const filtered = filter ? enquiries.filter(e => e.status === filter) : enquiries;

  if (loading) return (
    <div style={{ minHeight:'calc(100vh - 88px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:16 }}>⏳</div>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16 }}>Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <div style={{ padding:'40px 48px', maxWidth:1400, margin:'0 auto' }}>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position:'fixed', inset:0, zIndex:1000,
            background:'rgba(0,0,0,0.7)',
            backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'linear-gradient(135deg, rgba(45,107,101,0.95), rgba(26,58,54,0.98))',
              border:'1px solid rgba(255,255,255,0.2)',
              borderRadius:24, padding:40,
              width:'100%', maxWidth:600,
              backdropFilter:'blur(20px)',
              boxShadow:'0 32px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Modal header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
              <div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:700, marginBottom:4 }}>
                  {selected.firstName} {selected.lastName}
                </div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)' }}>
                  Enquiry #{selected._id.slice(-6).toUpperCase()} · {new Date(selected.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, width:36, height:36, color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
              >✕</button>
            </div>

            {/* Contact details */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
              {[
                ['📧', 'Email',       selected.email,       `mailto:${selected.email}`],
                ['🏥', 'Institution', selected.institution, null],
              ].map(([icon, label, value, href]) => (
                <div key={label} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'14px 16px' }}>
                  <div style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:6 }}>{icon} {label}</div>
                  {href
                    ? <a href={href} style={{ fontSize:14, color:'#c8dedd', textDecoration:'none', wordBreak:'break-all' }}>{value}</a>
                    : <div style={{ fontSize:14, color:'#fff' }}>{value}</div>
                  }
                </div>
              ))}
            </div>

            {/* Interest */}
            <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'14px 16px', marginBottom:16 }}>
              <div style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:6 }}>🎯 Interested In</div>
              <div style={{ fontSize:14, color:'#c8dedd', fontWeight:500 }}>{selected.interest}</div>
            </div>

            {/* Message */}
            {selected.message && (
              <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'14px 16px', marginBottom:20 }}>
                <div style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8 }}>💬 Message</div>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.8)', lineHeight:1.7, margin:0 }}>{selected.message}</p>
              </div>
            )}

            {/* Status update */}
            <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:13, color:'rgba(255,255,255,0.5)' }}>Update status:</span>
              {['new','contacted','in-progress','closed'].map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected._id, s)}
                  style={{
                    padding:'8px 18px',
                    borderRadius:50,
                    fontSize:12,
                    fontWeight:600,
                    cursor:'pointer',
                    transition:'all .2s',
                    border: selected.status === s ? '2px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.15)',
                    background: selected.status === s ? STATUS_COLOR[s].bg : 'rgba(255,255,255,0.05)',
                    color: selected.status === s ? STATUS_COLOR[s].color : 'rgba(255,255,255,0.5)',
                  }}
                >{s}</button>
              ))}
            </div>

            {/* Quick reply button */}
            <a
              href={`mailto:${selected.email}?subject=RE: Your OCTA Enquiry — ${selected.interest}&body=Dear ${selected.firstName},%0D%0A%0D%0AThank you for your enquiry regarding ${selected.interest}.%0D%0A%0D%0A`}
              style={{
                display:'block', marginTop:20, padding:'14px',
                background:'rgba(255,255,255,0.12)',
                border:'1px solid rgba(255,255,255,0.25)',
                borderRadius:12, textAlign:'center',
                fontSize:14, fontWeight:600, color:'#fff',
                textDecoration:'none', transition:'all .3s',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
            >
              📤 Reply via Email
            </a>
          </div>
        </div>
      )}

      {/* ── PAGE HEADER ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:40, flexWrap:'wrap', gap:16 }}>
        <div>
          <p className="eyebrow" style={{ marginBottom:8 }}>Admin Panel</p>
          <h2 className="sec-title" style={{ marginBottom:6, fontSize:'clamp(28px,3vw,40px)' }}>Dashboard</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14 }}>Welcome back, {user?.name} 👋</p>
        </div>
        <button
          onClick={seedCourses}
          disabled={seeding}
          style={{
            padding:'12px 24px',
            background: seeding ? 'rgba(255,255,255,0.05)' : 'rgba(109,219,201,0.15)',
            border:`1px solid ${seeding ? 'rgba(255,255,255,0.1)' : 'rgba(109,219,201,0.4)'}`,
            borderRadius:12, color: seeding ? 'rgba(255,255,255,0.3)' : '#6ddbc9',
            fontSize:13, fontWeight:600, cursor: seeding ? 'not-allowed' : 'pointer',
            transition:'all .3s',
          }}
        >
          {seeding ? '⏳ Seeding…' : '🌱 Seed Courses'}
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      {stats && (
        <div className="grid-4" style={{ marginBottom:40 }}>
          {[
            ['📬', 'Total Enquiries', stats.totalEnquiries, '#6ddbc9'],
            ['🆕', 'New / Unread',    stats.newEnquiries,   '#f0a844'],
            ['👥', 'Registered Users',stats.totalUsers,     '#7bbdb6'],
            ['📚', 'Active Courses',  stats.totalCourses,   '#c8dedd'],
          ].map(([icon, label, val, color]) => (
            <div key={label} style={{
              background:'rgba(255,255,255,0.06)',
              border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:20, padding:'28px 24px',
              backdropFilter:'blur(16px)',
              transition:'all .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.transform=''; }}
            >
              <div style={{ fontSize:28, marginBottom:12 }}>{icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:36, fontWeight:800, color, lineHeight:1, marginBottom:8 }}>{val}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── ENQUIRIES TABLE ── */}
      <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, overflow:'hidden', backdropFilter:'blur(16px)' }}>

        {/* Table header */}
        <div style={{ padding:'20px 28px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div>
            <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:700, marginBottom:2 }}>Enquiries</h3>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>Click any row to see full details & message</p>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {[['', 'All'], ['new','New'], ['contacted','Contacted'], ['in-progress','In Progress'], ['closed','Closed']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                style={{
                  padding:'7px 18px', borderRadius:50, fontSize:12, cursor:'pointer', fontWeight:500,
                  transition:'all .2s',
                  background: filter === val ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                  border: filter === val ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: filter === val ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >{label} {val === '' ? `(${enquiries.length})` : `(${enquiries.filter(e=>e.status===val).length})`}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                {['Name & Email','Institution','Interest','Status','Date','Action'].map(h => (
                  <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:11, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding:'48px 20px', textAlign:'center' }}>
                    <div style={{ fontSize:32, marginBottom:12 }}>📭</div>
                    <div style={{ fontSize:15, color:'rgba(255,255,255,0.4)' }}>No enquiries found</div>
                  </td>
                </tr>
              ) : filtered.map(e => (
                <tr
                  key={e._id}
                  onClick={() => setSelected(e)}
                  style={{ borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer', transition:'background .2s' }}
                  onMouseEnter={el => el.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={el => el.currentTarget.style.background = 'transparent'}
                >
                  {/* Name + Email */}
                  <td style={{ padding:'16px 20px' }}>
                    <div style={{ fontFamily:'Sora,sans-serif', fontSize:14, fontWeight:600, marginBottom:3 }}>
                      {e.firstName} {e.lastName}
                    </div>
                    <div style={{ fontSize:12, color:'rgba(200,222,221,0.7)' }}>📧 {e.email}</div>
                  </td>

                  {/* Institution */}
                  <td style={{ padding:'16px 20px', fontSize:13, color:'rgba(255,255,255,0.6)' }}>
                    {e.institution}
                  </td>

                  {/* Interest */}
                  <td style={{ padding:'16px 20px', fontSize:12, color:'rgba(255,255,255,0.55)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {e.interest}
                  </td>

                  {/* Status badge */}
                  <td style={{ padding:'16px 20px' }}>
                    <span style={{
                      padding:'5px 14px', borderRadius:50,
                      fontSize:11, fontWeight:700,
                      letterSpacing:'0.05em',
                      background: STATUS_COLOR[e.status]?.bg,
                      color:      STATUS_COLOR[e.status]?.color,
                      border:     `1px solid ${STATUS_COLOR[e.status]?.border}`,
                    }}>{e.status}</span>
                  </td>

                  {/* Date */}
                  <td style={{ padding:'16px 20px', fontSize:12, color:'rgba(255,255,255,0.4)', whiteSpace:'nowrap' }}>
                    {new Date(e.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}
                  </td>

                  {/* Status dropdown — stop click from opening modal */}
                  <td style={{ padding:'16px 20px' }} onClick={ev => ev.stopPropagation()}>
                    <select
                      value={e.status}
                      onChange={ev => updateStatus(e._id, ev.target.value)}
                      style={{
                        padding:'8px 12px',
                        background:'rgba(255,255,255,0.08)',
                        border:'1px solid rgba(255,255,255,0.15)',
                        borderRadius:10, color:'#fff',
                        fontSize:12, cursor:'pointer',
                        outline:'none',
                        appearance:'none',
                        paddingRight:28,
                        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff80' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat:'no-repeat',
                        backgroundPosition:'right 10px center',
                      }}
                    >
                      {['new','contacted','in-progress','closed'].map(s => (
                        <option key={s} value={s} style={{ background:'#1a3d3a' }}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        {filtered.length > 0 && (
          <div style={{ padding:'14px 28px', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>
              Showing {filtered.length} of {enquiries.length} enquiries
            </span>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>
              👆 Click any row to view full details
            </span>
          </div>
        )}
      </div>
    </div>
  );
}