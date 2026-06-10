import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

const STATUS_COLOR = {
  new:           { bg:'rgba(109,219,201,0.15)', color:'#6ddbc9',               border:'rgba(109,219,201,0.3)'  },
  contacted:     { bg:'rgba(240,168,68,0.15)',  color:'#f0a844',               border:'rgba(240,168,68,0.3)'   },
  'in-progress': { bg:'rgba(123,189,182,0.15)', color:'#7bbdb6',               border:'rgba(123,189,182,0.3)'  },
  closed:        { bg:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.4)', border:'rgba(255,255,255,0.1)'  },
};

export default function AdminDashboard() {
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const width     = useWindowWidth();
  const isMobile  = width < 768;

  const [stats,     setStats]     = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [filter,    setFilter]    = useState('');
  const [selected,  setSelected]  = useState(null);
  const [toast,     setToast]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [seeding,   setSeeding]   = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
    else if (user.role !== 'admin') navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    Promise.all([api.get('/admin/dashboard'), api.get('/enquiry')])
      .then(([dash, enq]) => { setStats(dash.data.stats); setEnquiries(enq.data.enquiries); })
      .catch(() => setToast({ msg:'Failed to load dashboard data', type:'error' }))
      .finally(() => setLoading(false));
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/enquiry/${id}`, { status });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      setToast({ msg:`Status updated to "${status}"`, type:'success' });
    } catch { setToast({ msg:'Failed to update status', type:'error' }); }
  };

  const seedCourses = async () => {
    setSeeding(true);
    try {
      const { data } = await api.post('/courses/seed');
      setToast({ msg:data.message, type:'success' });
    } catch (err) {
      setToast({ msg:err.response?.data?.message || 'Seed failed', type:'error' });
    } finally { setSeeding(false); }
  };

  const filtered = filter ? enquiries.filter(e => e.status === filter) : enquiries;

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0f2724' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:16 }}>⏳</div>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16 }}>Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight:  '100vh',
      background: 'linear-gradient(135deg, #0f2724 0%, #1a3d3a 50%, #0f2724 100%)',
      color:      '#fff',
      padding:    isMobile ? '80px 16px 40px' : '100px 48px 60px',
      boxSizing:  'border-box',
    }}>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position:'fixed', inset:0, zIndex:1000,
          background:'rgba(0,0,0,0.75)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'flex-start', justifyContent:'center',
          padding: isMobile ? '20px 16px' : '40px 24px',
          overflowY:'auto',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:    'linear-gradient(135deg, rgba(45,107,101,0.97), rgba(15,39,36,0.99))',
            border:        '1px solid rgba(255,255,255,0.18)',
            borderRadius:  isMobile ? 16 : 24,
            padding:       isMobile ? '24px 20px' : '40px',
            width:         '100%', maxWidth:580,
            backdropFilter:'blur(20px)',
            boxShadow:     '0 32px 80px rgba(0,0,0,0.6)',
            boxSizing:     'border-box',
          }}>
            {/* header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, gap:12 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 18 : 22, fontWeight:700, color:'#fff', marginBottom:4 }}>
                  {selected.firstName} {selected.lastName}
                </div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>
                  Enquiry #{selected._id.slice(-6).toUpperCase()}<br/>
                  {new Date(selected.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{
                background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)',
                borderRadius:8, width:36, height:36, color:'#fff', fontSize:16,
                cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>✕</button>
            </div>

            {/* contact grid */}
            <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:10, marginBottom:12 }}>
              {[
                ['📧','Email', selected.email, `mailto:${selected.email}`],
                ['🏥','Institution', selected.institution, null],
              ].map(([icon, label, value, href]) => (
                <div key={label} style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'12px 14px' }}>
                  <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:5 }}>{icon} {label}</div>
                  {href
                    ? <a href={href} style={{ fontSize:13, color:'#6ddbc9', textDecoration:'none', wordBreak:'break-all' }}>{value}</a>
                    : <div style={{ fontSize:13, color:'#fff' }}>{value}</div>}
                </div>
              ))}
            </div>

            {/* interest */}
            <div style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'12px 14px', marginBottom:10 }}>
              <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:5 }}>🎯 Interested In</div>
              <div style={{ fontSize:13, color:'#6ddbc9', fontWeight:600 }}>{selected.interest}</div>
            </div>

            {/* message */}
            {selected.message && (
              <div style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'12px 14px', marginBottom:16 }}>
                <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:6 }}>💬 Message</div>
                <p style={{ fontSize:13, color:'rgba(255,255,255,0.8)', lineHeight:1.7, margin:0 }}>{selected.message}</p>
              </div>
            )}

            {/* status */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.1em' }}>Update Status</div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {['new','contacted','in-progress','closed'].map(s => (
                  <button key={s} onClick={() => updateStatus(selected._id, s)} style={{
                    padding:'7px 14px', borderRadius:50, fontSize:11, fontWeight:700, cursor:'pointer', transition:'all .2s',
                    border:     selected.status === s ? `2px solid ${STATUS_COLOR[s].color}` : '1px solid rgba(255,255,255,0.15)',
                    background: selected.status === s ? STATUS_COLOR[s].bg  : 'rgba(255,255,255,0.05)',
                    color:      selected.status === s ? STATUS_COLOR[s].color : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* reply */}
            <a href={`mailto:${selected.email}?subject=RE: Your OCTA Enquiry — ${selected.interest}&body=Dear ${selected.firstName},%0D%0A%0D%0AThank you for your enquiry regarding ${selected.interest}.%0D%0A%0D%0A`}
              style={{
                display:'block', padding:'13px', background:'rgba(109,219,201,0.15)',
                border:'1px solid rgba(109,219,201,0.3)', borderRadius:12, textAlign:'center',
                fontSize:14, fontWeight:600, color:'#6ddbc9', textDecoration:'none', transition:'all .3s',
              }}
            >📤 Reply via Email</a>
          </div>
        </div>
      )}

      {/* ── PAGE HEADER ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: isMobile ? 24 : 40, flexWrap:'wrap', gap:16 }}>
        <div>
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6ddbc9', marginBottom:8 }}>Admin Panel</p>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, color:'#fff', marginBottom:6 }}>Dashboard</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, margin:0 }}>Welcome back, {user?.name} 👋</p>
        </div>
        <button onClick={seedCourses} disabled={seeding} style={{
          padding:'10px 20px', borderRadius:12, fontSize:13, fontWeight:600,
          cursor: seeding ? 'not-allowed' : 'pointer', transition:'all .3s', whiteSpace:'nowrap',
          background: seeding ? 'rgba(255,255,255,0.05)' : 'rgba(109,219,201,0.15)',
          border:`1px solid ${seeding ? 'rgba(255,255,255,0.1)' : 'rgba(109,219,201,0.4)'}`,
          color: seeding ? 'rgba(255,255,255,0.3)' : '#6ddbc9',
        }}>{seeding ? '⏳ Seeding…' : '🌱 Seed Courses'}</button>
      </div>

      {/* ── STAT CARDS ── */}
      {stats && (
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
          gap: isMobile ? 12 : 20,
          marginBottom: isMobile ? 24 : 40,
        }}>
          {[
            ['📬','Total Enquiries', stats.totalEnquiries, '#6ddbc9'],
            ['🆕','New / Unread',    stats.newEnquiries,   '#f0a844'],
            ['👥','Registered Users',stats.totalUsers,     '#7bbdb6'],
            ['📚','Active Courses',  stats.totalCourses,   '#c8dedd'],
          ].map(([icon, label, val, color]) => (
            <div key={label} style={{
              background:    'rgba(255,255,255,0.07)',
              border:        '1px solid rgba(255,255,255,0.12)',
              borderRadius:  16,
              padding:       isMobile ? '18px 14px' : '28px 24px',
              backdropFilter:'blur(16px)',
              transition:    'all .3s',
              boxSizing:     'border-box',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.transform=''; }}
            >
              <div style={{ fontSize: isMobile ? 22 : 28, marginBottom:10 }}>{icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 28 : 38, fontWeight:800, color, lineHeight:1, marginBottom:6 }}>{val}</div>
              <div style={{ fontSize: isMobile ? 10 : 12, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em', textTransform:'uppercase', lineHeight:1.4 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── ENQUIRIES SECTION ── */}
      <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, overflow:'hidden', backdropFilter:'blur(16px)' }}>

        {/* header */}
        <div style={{ padding: isMobile ? '16px' : '20px 28px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:700, color:'#fff', marginBottom:4 }}>Enquiries</h3>
          <p style={{ fontSize:12, color:'rgba(255,255,255,0.4)', margin:'0 0 12px' }}>
            {isMobile ? 'Tap a card to view details' : 'Click any row to see full details & message'}
          </p>
          <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:2 }}>
            {[['','All'],['new','New'],['contacted','Contacted'],['in-progress','In Progress'],['closed','Closed']].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} style={{
                padding:'6px 14px', borderRadius:50, fontSize:11, cursor:'pointer',
                fontWeight:500, whiteSpace:'nowrap', flexShrink:0, transition:'all .2s',
                background: filter === val ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                border:     filter === val ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color:      filter === val ? '#fff' : 'rgba(255,255,255,0.5)',
              }}>{label} {val==='' ? `(${enquiries.length})` : `(${enquiries.filter(e=>e.status===val).length})`}</button>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        {isMobile ? (
          <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:10 }}>
            {filtered.length === 0 ? (
              <div style={{ padding:'40px 0', textAlign:'center' }}>
                <div style={{ fontSize:32, marginBottom:12 }}>📭</div>
                <div style={{ fontSize:15, color:'rgba(255,255,255,0.4)' }}>No enquiries found</div>
              </div>
            ) : filtered.map(e => (
              <div key={e._id} onClick={() => setSelected(e)} style={{
                background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:14, padding:'14px 16px', cursor:'pointer', transition:'background .2s',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8, gap:8 }}>
                  <div style={{ fontFamily:'Sora,sans-serif', fontSize:14, fontWeight:700, color:'#fff' }}>
                    {e.firstName} {e.lastName}
                  </div>
                  <span style={{
                    padding:'3px 10px', borderRadius:50, fontSize:10, fontWeight:700, flexShrink:0,
                    background: STATUS_COLOR[e.status]?.bg,
                    color:      STATUS_COLOR[e.status]?.color,
                    border:     `1px solid ${STATUS_COLOR[e.status]?.border}`,
                  }}>{e.status}</span>
                </div>
                <div style={{ fontSize:12, color:'#6ddbc9', marginBottom:4 }}>📧 {e.email}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6 }}>🏥 {e.institution}</div>
                <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.interest}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', flexShrink:0 }}>
                    {new Date(e.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop table */
          <>
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
                    <tr><td colSpan={6} style={{ padding:'48px 20px', textAlign:'center' }}>
                      <div style={{ fontSize:32, marginBottom:12 }}>📭</div>
                      <div style={{ fontSize:15, color:'rgba(255,255,255,0.4)' }}>No enquiries found</div>
                    </td></tr>
                  ) : filtered.map(e => (
                    <tr key={e._id} onClick={() => setSelected(e)}
                      style={{ borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer', transition:'background .2s' }}
                      onMouseEnter={el => el.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={el => el.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding:'16px 20px' }}>
                        <div style={{ fontFamily:'Sora,sans-serif', fontSize:14, fontWeight:600, color:'#fff', marginBottom:3 }}>{e.firstName} {e.lastName}</div>
                        <div style={{ fontSize:12, color:'#6ddbc9' }}>📧 {e.email}</div>
                      </td>
                      <td style={{ padding:'16px 20px', fontSize:13, color:'rgba(255,255,255,0.6)' }}>{e.institution}</td>
                      <td style={{ padding:'16px 20px', fontSize:12, color:'rgba(255,255,255,0.55)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.interest}</td>
                      <td style={{ padding:'16px 20px' }}>
                        <span style={{
                          padding:'5px 14px', borderRadius:50, fontSize:11, fontWeight:700, letterSpacing:'0.05em',
                          background: STATUS_COLOR[e.status]?.bg, color: STATUS_COLOR[e.status]?.color,
                          border:`1px solid ${STATUS_COLOR[e.status]?.border}`,
                        }}>{e.status}</span>
                      </td>
                      <td style={{ padding:'16px 20px', fontSize:12, color:'rgba(255,255,255,0.4)', whiteSpace:'nowrap' }}>
                        {new Date(e.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}
                      </td>
                      <td style={{ padding:'16px 20px' }} onClick={ev => ev.stopPropagation()}>
                        <select value={e.status} onChange={ev => updateStatus(e._id, ev.target.value)} style={{
                          padding:'8px 28px 8px 12px', background:'rgba(255,255,255,0.08)',
                          border:'1px solid rgba(255,255,255,0.15)', borderRadius:10,
                          color:'#fff', fontSize:12, cursor:'pointer', outline:'none', appearance:'none',
                          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff80' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat:'no-repeat', backgroundPosition:'right 10px center',
                        }}>
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
            {filtered.length > 0 && (
              <div style={{ padding:'14px 28px', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>Showing {filtered.length} of {enquiries.length} enquiries</span>
                <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>👆 Click any row to view full details</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}