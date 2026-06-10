import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

const depts = [
  { name:'Pediatrics',   score:'72%', w:'72%', color:'#f0a844',              participation:'68%', trend:'Stable'    },
  { name:'Internal Med', score:'64%', w:'64%', color:'#f0a844',              participation:'74%', trend:'Improving' },
  { name:'Oncology',     score:'88%', w:'88%', color:'#6ddbc9',              participation:'81%', trend:'Improving' },
  { name:'ER ⚠',        score:'54%', w:'54%', color:'rgba(255,100,100,.6)', participation:'42%', trend:'At Risk'   },
];

const modules = [
  { icon:'🔬', title:'Evidence-Based Modules',           body:'Peer-reviewed, scientifically validated content developed by clinical subject matter experts.' },
  { icon:'🥽', title:'Simulation & Case-Based Learning', body:'OSCE/OSPE training protocols with realistic clinical scenarios and immersive case studies.' },
  { icon:'🗺️', title:'Competency Mapping',                body:'Role-based curriculum alignment mapping specific competencies to departments and roles.' },
  { icon:'📱', title:'Microlearning & Mobile-First',      body:'Bite-sized scenario videos and interactive decision trees with offline access support.' },
];

const reports = [
  { icon:'📄', title:'Executive Capability Summary', body:'Single-page HRI score and institutional risk levels.' },
  { icon:'📊', title:'Human Maturity Breakdown',     body:'Departmental heatmap and skill pillar performance.' },
  { icon:'⚡', title:'Institutional Load Reduction', body:'Efficiency metrics, admin hours saved, and onboarding velocity.' },
  { icon:'🔮', title:'Predictive Outlook & Strategy', body:'60-day capability forecast and recommended leadership actions.' },
];

export default function Technology() {
  const width    = useWindowWidth();
  const isMobile = width < 768;

  return (
    <div>
      <div className="section">
        <p className="eyebrow">Our Tech Platform</p>
        <h2 className="sec-title">The <em>OCTA</em> Platform</h2>
        <p className="sec-lead">"Healthcare is evolving rapidly, and technology will shape the way professionals learn, collaborate, and deliver care." — Priyanka Edupuganti, Founder & CEO</p>
      </div>

      <div className="divider" />

      {/* Dashboard mock */}
      <div className="section">
        <div style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius: isMobile ? 16 : 28, overflow:'hidden', backdropFilter:'blur(20px)' }}>

          {/* Header row */}
          <div style={{
            padding:        isMobile ? '24px 20px' : 48,
            borderBottom:   '1px solid var(--w08)',
            display:        'flex',
            flexDirection:  isMobile ? 'column' : 'row',
            alignItems:     isMobile ? 'flex-start' : 'flex-start',
            justifyContent: 'space-between',
            gap:            isMobile ? 24 : 40,
          }}>
            <div>
              <p className="eyebrow">Live Platform Indicators</p>
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 20 : 28, fontWeight:700, margin:'0 0 8px' }}>
                Readiness Intelligence Console
              </h3>
              <p style={{ color:'var(--w60)', fontSize:14, margin:0, maxWidth:420 }}>
                Real-time workforce capability, institutional maturity, and compliance tracking.
              </p>
            </div>

            {/* KPI chips */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, auto)',
              gap:                 isMobile ? 10 : 16,
              width:               isMobile ? '100%' : 'auto',
            }}>
              {[['82','Readiness Index'],['94%','Workforce Coverage'],['88','Experience Score']].map(([v, l]) => (
                <div key={l} style={{
                  textAlign:  'center',
                  padding:    isMobile ? '14px 8px' : '20px 28px',
                  background: 'var(--w08)',
                  borderRadius: 14,
                  minWidth:   isMobile ? 0 : 140,
                }}>
                  <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 24 : 36, fontWeight:800, lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize: isMobile ? 9 : 11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--w60)', marginTop:6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dept cards */}
          <div style={{ padding: isMobile ? '20px 16px' : '32px 48px' }}>
            <div style={{
              display:             'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap:                 isMobile ? 12 : 16,
            }}>
              {depts.map(d => (
                <div key={d.name} style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:14, padding: isMobile ? '14px 12px' : 20 }}>
                  <div style={{ fontSize: isMobile ? 10 : 11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--w60)', marginBottom:8 }}>{d.name}</div>
                  <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 20 : 24, fontWeight:700, marginBottom:4 }}>{d.score}</div>
                  <div style={{ height:4, background:'var(--w08)', borderRadius:2, overflow:'hidden', marginBottom:8 }}>
                    <div style={{ width:d.w, height:'100%', background:d.color, borderRadius:2 }} />
                  </div>
                  <div style={{ fontSize: isMobile ? 10 : 11, color:'var(--w60)', lineHeight:1.5 }}>
                    {isMobile
                      ? <>{d.participation}<br />{d.trend}</>
                      : <>Participation: {d.participation} · {d.trend}</>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Platform modules */}
      <div className="section">
        <p className="eyebrow">Platform Modules</p>
        <h2 className="sec-title">Four Pillars of the <em>Tech Stack</em></h2>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:                 isMobile ? 14 : 24,
          marginTop:           40,
        }}>
          {modules.map(m => (
            <div key={m.title} className="glass-card">
              <div className="icon-box">{m.icon}</div>
              <div className="card-title">{m.title}</div>
              <div className="card-body">{m.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Board reports */}
      <div className="section">
        <p className="eyebrow">Executive Reporting</p>
        <h2 className="sec-title">Monthly Board <em>Readiness Portfolios</em></h2>
        <p className="sec-lead" style={{ marginBottom:40 }}>
          Executive reports designed for management, accreditation bodies, and government stakeholders.
        </p>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap:                 isMobile ? 12 : 16,
        }}>
          {reports.map(r => (
            <div key={r.title} className="glass-card" style={{ textAlign:'center' }}>
              <div style={{ fontSize: isMobile ? 26 : 32, marginBottom:14 }}>{r.icon}</div>
              <div className="card-title">{r.title}</div>
              <div className="card-body">{r.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}