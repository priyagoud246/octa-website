const depts = [
  { name:'Pediatrics',   score:'72%', w:'72%', color:'#f0a844', participation:'68%', trend:'Stable' },
  { name:'Internal Med', score:'64%', w:'64%', color:'#f0a844', participation:'74%', trend:'Improving' },
  { name:'Oncology',     score:'88%', w:'88%', color:'#6ddbc9', participation:'81%', trend:'Improving' },
  { name:'ER ⚠',        score:'54%', w:'54%', color:'rgba(255,100,100,.6)', participation:'42%', trend:'At Risk' },
];

const modules = [
  { icon:'🔬', title:'Evidence-Based Modules',          body:'Peer-reviewed, scientifically validated content developed by clinical subject matter experts.' },
  { icon:'🥽', title:'Simulation & Case-Based Learning', body:'OSCE/OSPE training protocols with realistic clinical scenarios and immersive case studies.' },
  { icon:'🗺️', title:'Competency Mapping',               body:'Role-based curriculum alignment mapping specific competencies to departments and roles.' },
  { icon:'📱', title:'Microlearning & Mobile-First',     body:'Bite-sized scenario videos and interactive decision trees with offline access support.' },
];

const reports = [
  { icon:'📄', title:'Executive Capability Summary', body:'Single-page HRI score and institutional risk levels.' },
  { icon:'📊', title:'Human Maturity Breakdown',     body:'Departmental heatmap and skill pillar performance.' },
  { icon:'⚡', title:'Institutional Load Reduction', body:'Efficiency metrics, admin hours saved, and onboarding velocity.' },
  { icon:'🔮', title:'Predictive Outlook & Strategy', body:'60-day capability forecast and recommended leadership actions.' },
];

export default function Technology() {
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
        <div style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:28, overflow:'hidden', backdropFilter:'blur(20px)' }}>
          <div style={{ padding:48, borderBottom:'1px solid var(--w08)', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:40, flexWrap:'wrap' }}>
            <div>
              <p className="eyebrow">Live Platform Indicators</p>
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:28, fontWeight:700 }}>Readiness Intelligence Console</h3>
              <p style={{ color:'var(--w60)', fontSize:14, marginTop:8, maxWidth:420 }}>Real-time workforce capability, institutional maturity, and compliance tracking.</p>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {[['82','Readiness Index'],['94%','Workforce Coverage'],['88','Experience Score']].map(([v,l]) => (
                <div key={l} style={{ textAlign:'center', padding:'20px 28px', background:'var(--w08)', borderRadius:16, minWidth:140 }}>
                  <div style={{ fontFamily:'Sora,sans-serif', fontSize:36, fontWeight:800, lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--w60)', marginTop:6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:'32px 48px' }}>
            <div className="grid-4">
              {depts.map(d => (
                <div key={d.name} style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:16, padding:20 }}>
                  <div style={{ fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--w60)', marginBottom:8 }}>{d.name}</div>
                  <div style={{ fontFamily:'Sora,sans-serif', fontSize:24, fontWeight:700, marginBottom:4 }}>{d.score}</div>
                  <div style={{ height:4, background:'var(--w08)', borderRadius:2, overflow:'hidden', marginBottom:8 }}>
                    <div style={{ width:d.w, height:'100%', background:d.color, borderRadius:2 }} />
                  </div>
                  <div style={{ fontSize:11, color:'var(--w60)' }}>Participation: {d.participation} · {d.trend}</div>
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
        <div className="grid-2" style={{ marginTop:48 }}>
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
        <p className="sec-lead" style={{ marginBottom:48 }}>Executive reports designed for management, accreditation bodies, and government stakeholders.</p>
        <div className="grid-4">
          {reports.map(r => (
            <div key={r.title} className="glass-card" style={{ textAlign:'center' }}>
              <div style={{ fontSize:32, marginBottom:16 }}>{r.icon}</div>
              <div className="card-title">{r.title}</div>
              <div className="card-body">{r.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}