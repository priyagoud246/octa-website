import { Link } from 'react-router-dom';

import heroImg       from '../assets/images/hero-simulation.webp';
import nursingImg    from '../assets/images/nursing-students.jpg';
import oralCareImg   from '../assets/images/team-oral-care.webp';
import nurseStudyImg from '../assets/images/nurse-studying.webp';
import oxygenImg     from '../assets/images/oxygen-panel.webp';

const stats = [
  { num:'50%',  label:'Lower Cost vs Market' },
  { num:'8',    label:'NABH Domains Covered' },
  { num:'2',    label:'National Certifications' },
  { num:'5',    label:'Step Implementation Process' },
];

const features = [
  { icon:'🎯', title:'Outcome-Focused, Not Certificate-Focused', body:'We focus on real quality improvement, workflow integration, and audit readiness — not just issuing certificates.' },
  { icon:'🏥', title:'Built for Both Institutions and Learners',  body:'Designed for hospitals, nursing colleges, educators, quality teams, and frontline staff alike.' },
  { icon:'📋', title:'NABH-Aligned, Not NABH-Approved',          body:'We provide training aligned to NABH standards. We do not claim accreditation authority.' },
  { icon:'🧬', title:'Practical, Not Generic',                    body:'Not just courses: templates, SOPs, mock audits, and on-the-ground implementation support.' },
  { icon:'🧠', title:'Adaptive Learning Paths',                   body:"Personalised journeys that adapt to each clinician's needs, role, and competency level." },
  { icon:'📊', title:'Compliance-Ready Analytics',                body:'Comprehensive reporting and audit trails for regulatory compliance and quality improvement.' },
];

const stacks = [
  { icon:'🏛️', title:'Foundation Stack',    color:'#4fc3f7', tags:['Fire Safety','Infection Control','Hand Hygiene'],                         desc:'Mandatory statutory training for all healthcare staff.' },
  { icon:'🩺', title:'Clinical Stack',       color:'#81c784', tags:['ECG Interpretation','Ventilator Management','Pharmacology Basics'],       desc:'Specialised medical modules for clinical professionals.' },
  { icon:'💬', title:'Soft-Skill Stack',     color:'#ffb74d', tags:['Patient Communication','Bedside Manner','Medical Ethics'],               desc:'High-value interpersonal skills for better patient care.' },
  { icon:'💻', title:'Digital Health Stack', color:'#ce93d8', tags:['Telemedicine Platforms','Government Portals (NTR Vaidya Seva)'],         desc:'Modern healthcare tools for the digital era.' },
];

const nabhDomains = [
  '🛡️ Patient Safety',
  '🧴 Infection Control',
  '📁 Documentation & Records',
  '👩‍⚕️ Staff Competency',
  '⚠️ Incident Reporting',
  '🤝 Patient Rights',
  '📈 Quality Improvement',
  '🔍 Clinical Audit Basics',
];

const problems = [
  { icon:'📉', title:'Policy-to-Practice Gap',     body:'Standards exist but are not embedded in daily routines.' },
  { icon:'⚙️', title:'Technology Without Process', body:'Tools adopted without workflow discipline leave gaps in care.' },
  { icon:'🎓', title:'Capability Gap',              body:'Lack of trained quality managers and educators at the ground level.' },
  { icon:'🔄', title:'Incentive Mismatch',          body:'Focus on setup, not sustained compliance — quality fades after accreditation.' },
  { icon:'🚧', title:'Change-Management Gap',       body:'Staff see compliance as extra work rather than part of daily practice.' },
];

const processSteps = [
  { num:'01', title:'Assess',  body:'Identify quality gaps and audit readiness needs.' },
  { num:'02', title:'Train',   body:'Deliver NABH-aligned training via LMS, on-site, or hybrid.' },
  { num:'03', title:'Equip',   body:'Provide templates, SOPs, and checklists.' },
  { num:'04', title:'Audit',   body:'Conduct mock audits to prepare for the real audit.' },
  { num:'05', title:'Support', body:'Offer implementation support to embed standards into daily practice.' },
];

const audienceCards = [
  {
    icon:'🏥',
    audience:'For Hospitals & Healthcare Institutions',
    eyebrow:'Institutional',
    img: nurseStudyImg,
    imgAlt: 'Nurse studying compliance documentation at night',
    points:['Improve quality and patient safety','Prepare for NABH accreditation','Build audit-ready systems and documentation','Train staff on SOPs, infection control, and incident reporting'],
    cta:'Download Hospital Package Overview',
  },
  {
    icon:'🎓',
    audience:'For Nursing Colleges & Educators',
    eyebrow:'Academic',
    img: nursingImg,
    imgAlt: 'Nursing students practising on a patient mannequin',
    points:['Make nursing students job-ready','Align curriculum with NABH standards','Strengthen clinical and soft-skill training','Improve college reputation and placement outcomes'],
    cta:'Download College Package Overview',
  },
];

const testimonials = [
  { quote:'This training helped us understand NABH standards in practical terms and close key quality gaps.', name:'Quality Manager', org:'Private Hospital, Andhra Pradesh' },
  { quote:'Our nursing students are more confident and better prepared for real hospital roles.', name:'Nursing Educator', org:'Private College' },
];

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <div className="hero-section">

        {/* hero-grid class handles 2-col desktop / 1-col mobile via CSS */}
        <div className="hero-grid">

          {/* Left: text */}
          <div>
            <div className="eyebrow fade-up" style={{ marginBottom:20 }}>
              NABH-Aligned Training for Hospitals &amp; Nursing Colleges
            </div>
            <h1 className="fade-up d1" style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(28px,3.6vw,52px)', fontWeight:800, lineHeight:1.12, letterSpacing:'-0.02em', marginBottom:24, color:'var(--teal-dark)' }}>
              Training That Improves{' '}
              <em style={{ fontStyle:'normal', color:'var(--sage)' }}>Hospital Quality</em>{' '}
              and Makes Nursing Students{' '}
              <em style={{ fontStyle:'normal', color:'var(--sage)' }}>Job-Ready</em>
            </h1>
            <p className="fade-up d2" style={{ fontSize:16, fontWeight:300, lineHeight:1.75, color:'var(--teal-deep)', marginBottom:36 }}>
              We help Indian healthcare institutions turn NABH standards into daily practice — through structured training, practical templates, mock audits, and implementation support.
            </p>
            <div className="fade-up d3" style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <Link to="/contact"><button className="btn-primary">Get a Free Consultation</button></Link>
              <Link to="/courses"><button className="btn-ghost">Explore Learning Stacks</button></Link>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="fade-up d2" style={{ borderRadius:24, overflow:'hidden', border:'1px solid var(--t18)', boxShadow:'0 20px 60px rgba(15,61,56,0.12)' }}>
            <img
              src={heroImg}
              alt="Doctor administering oxygen to a patient mannequin during clinical simulation training"
              style={{ width:'100%', display:'block' }}
            />
          </div>
        </div>

        {/* Stats strip — stats-strip class handles 4-col → 2-col mobile */}
        <div className="stats-strip fade-up d4">
          {stats.map(s => (
            <div key={s.label} style={{ padding:'28px 16px', background:'#ffffff', textAlign:'center' }}>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(24px,4vw,36px)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1, color:'var(--teal-dark)' }}>{s.num}</div>
              <div style={{ fontSize:11, fontWeight:300, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--teal-deep)', marginTop:8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── WHY OCTA ── */}
      <div className="section">
        <p className="eyebrow">Why Choose Us?</p>
        <h2 className="sec-title">Built for <em>Real Clinical Environments</em></h2>
        <p className="sec-lead">Outcome-focused training designed with clinical SMEs — not just courses, but practical tools for lasting quality improvement.</p>
        <div className="grid-3" style={{ marginTop:48 }}>
          {features.map(f => (
            <div key={f.title} className="glass-card">
              <div className="icon-box">{f.icon}</div>
              <div className="card-title">{f.title}</div>
              <div className="card-body">{f.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── WHAT WE OFFER ── */}
      <div className="section">
        <p className="eyebrow">Our Solution</p>
        <h2 className="sec-title">What We <em>Offer</em></h2>
        <p className="sec-lead">We help Indian healthcare institutions turn NABH standards into daily practice.</p>
        <div className="grid-2" style={{ marginTop:48 }}>
          <div className="glass-card">
            <div className="icon-box">📦</div>
            <div className="card-title">What We Provide</div>
            {['Structured training modules aligned to NABH domains','Ready-to-use templates and SOPs','Mock audits before the real audit','Implementation support to embed standards into daily workflows'].map(t => (
              <div key={t} style={{ display:'flex', gap:10, fontSize:14, color:'var(--teal-deep)', marginBottom:10 }}>✅ {t}</div>
            ))}
          </div>
          <div className="glass-card">
            <div className="icon-box">👥</div>
            <div className="card-title">Designed For</div>
            {['Hospital staff: doctors, nurses, technicians','Nursing educators and students','Quality managers and NABH coordinators'].map(t => (
              <div key={t} style={{ display:'flex', gap:10, fontSize:14, color:'var(--teal-deep)', marginBottom:10 }}>🎯 {t}</div>
            ))}
          </div>
        </div>
        <img
          src={oralCareImg}
          alt="Healthcare team practising oral care procedure on a simulation mannequin"
          style={{ width:'100%', borderRadius:20, border:'1px solid var(--t18)', marginTop:28 }}
        />
      </div>

      <div className="divider" />

      {/* ── LEARNING STACKS ── */}
      <div className="section">
        <p className="eyebrow">Training Journey</p>
        <h2 className="sec-title">OCTA <em>Learning Stacks</em></h2>
        <p className="sec-lead">Role-based training stacks that guide your team from statutory basics to advanced clinical and digital competencies.</p>
        <div className="grid-2" style={{ marginTop:48 }}>
          {stacks.map(s => (
            <div key={s.title} className="glass-card">
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                <div className="icon-box">{s.icon}</div>
                <div>
                  <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:s.color, marginBottom:2 }}>{s.title}</div>
                  <div className="card-title" style={{ marginBottom:0 }}>{s.desc}</div>
                </div>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{ fontSize:12, padding:'4px 12px', borderRadius:20, background:'var(--t06)', border:'1px solid var(--t18)', color:'var(--teal-deep)' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:32, textAlign:'center' }}>
          <Link to="/courses"><button className="btn-primary">See All Modules</button></Link>
        </div>
      </div>

      <div className="divider" />

      {/* ── NABH ALIGNMENT ── */}
      <div className="section">
        <p className="eyebrow">Curriculum Mapping</p>
        <h2 className="sec-title">Aligned to Core <em>NABH Domains</em></h2>
        <p className="sec-lead">Our curriculum is mapped to key NABH areas. We position as <strong style={{ color:'var(--sage)' }}>"NABH-aligned training"</strong> — we do not claim "NABH approved" or "NABH affiliated."</p>
        <div className="grid-2" style={{ marginTop:48 }}>
          {nabhDomains.map(d => (
            <div key={d} style={{ display:'flex', alignItems:'center', gap:12, padding:'16px 20px', borderRadius:12, background:'var(--t06)', border:'1px solid var(--t18)', fontSize:14, color:'var(--teal-deep)' }}>
              {d}
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── CREDIBILITY & AUDIT READINESS ── */}
      <div className="section">
        <p className="eyebrow">Audit Readiness</p>
        <h2 className="sec-title">Built for <em>Trust and Compliance</em></h2>
        <p className="sec-lead">To ensure institutional confidence and audit readiness, we maintain comprehensive documentation at every step.</p>
        <div className="grid-3" style={{ marginTop:48 }}>
          {[
            { icon:'🗺️', title:'Curriculum Mapping',        body:'Every module mapped to corresponding NABH topics and intent statements.' },
            { icon:'👨‍🏫', title:'Qualified Trainer Profiles', body:'Verified trainer credentials and subject-matter expertise on record.' },
            { icon:'✅', title:'Attendance Tracking',         body:'Automated attendance and participation logs for every session.' },
            { icon:'📝', title:'Assessment Records',          body:'Detailed records of all assessments, scores, and competency evaluations.' },
            { icon:'🏅', title:'Completion Certificates',     body:'Timestamped, verifiable certificates issued on successful completion.' },
            { icon:'🔄', title:'Feedback & Review Logs',      body:'Feedback forms and internal review logs documenting content updates.' },
          ].map(c => (
            <div key={c.title} className="glass-card">
              <div className="icon-box">{c.icon}</div>
              <div className="card-title">{c.title}</div>
              <div className="card-body">{c.body}</div>
            </div>
          ))}
        </div>
        <img
          src={oxygenImg}
          alt="Wall-mounted oxygen and suction panel in a hospital simulation lab"
          style={{ width:'100%', borderRadius:20, border:'1px solid var(--t18)', marginTop:28 }}
        />
      </div>

      <div className="divider" />

      {/* ── PROBLEM WE SOLVE ── */}
      <div className="section">
        <p className="eyebrow">The Challenge</p>
        <h2 className="sec-title">The Quality Gap in <em>Indian Healthcare</em></h2>
        <p className="sec-lead">Many hospitals struggle with NABH readiness. We address these through training + implementation + audit readiness.</p>
        <div className="grid-3" style={{ marginTop:48 }}>
          {problems.map(p => (
            <div key={p.title} className="glass-card">
              <div className="icon-box">{p.icon}</div>
              <div className="card-title">{p.title}</div>
              <div className="card-body">{p.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <div className="section">
        <p className="eyebrow">Our Process</p>
        <h2 className="sec-title">How It <em>Works</em></h2>
        <p className="sec-lead">A structured five-step process from assessment to sustained daily practice.</p>

        {/* process-grid class handles 5-col → 1-col mobile */}
        <div className="process-grid">
          {processSteps.map(s => (
            <div key={s.num} style={{ padding:'32px 20px', background:'#ffffff', textAlign:'center' }}>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:28, fontWeight:800, color:'var(--sage)', lineHeight:1, marginBottom:12 }}>{s.num}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:16, fontWeight:700, marginBottom:10, color:'var(--teal-dark)' }}>{s.title}</div>
              <div style={{ fontSize:13, fontWeight:300, lineHeight:1.6, color:'var(--teal-deep)' }}>{s.body}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:32, textAlign:'center' }}>
          <Link to="/contact"><button className="btn-primary">Book a Free Consultation</button></Link>
        </div>
      </div>

      <div className="divider" />

      {/* ── COST ADVANTAGE ── */}
      <div className="section">
        <p className="eyebrow">Cost Leadership</p>
        <h2 className="sec-title"><em>50% Less</em> Than Market Average</h2>
        <p className="sec-lead">Volume pricing, zero capex hardware, fast onboarding — without compromising on quality or compliance.</p>
        <div className="grid-2" style={{ marginTop:48 }}>
          <div className="glass-card" style={{ borderColor:'var(--teal-mid)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}>
              <div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:13, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--sage)', marginBottom:4 }}>OCTA Platform</div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:32, fontWeight:800, color:'var(--teal-dark)' }}>50% Lower</div>
              </div>
              <span style={{ fontSize:40 }}>⭐</span>
            </div>
            {['Volume pricing & enterprise licensing','Zero capex for hardware','Fast onboarding & deployment','Built-in assessments & reporting'].map(t => (
              <div key={t} style={{ display:'flex', gap:10, fontSize:14, color:'var(--teal-deep)', marginBottom:10 }}>✅ {t}</div>
            ))}
          </div>
          <div className="glass-card">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}>
              <div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:13, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--teal-deep)', marginBottom:4 }}>Other Platforms</div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:32, fontWeight:800, color:'var(--teal-deep)' }}>Standard Cost</div>
              </div>
              <span style={{ fontSize:40, opacity:.4 }}>👥</span>
            </div>
            {['Higher per-learner fees','Additional hardware costs','Lengthy implementation','Add-on costs for features'].map(t => (
              <div key={t} style={{ display:'flex', gap:10, fontSize:14, color:'var(--teal-mid)', marginBottom:10 }}>❌ {t}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── AUDIENCE SECTIONS ── */}
      <div className="section">
        <p className="eyebrow">Who We Serve</p>
        <h2 className="sec-title">Solutions for <em>Every Role</em></h2>
        <div className="grid-2" style={{ marginTop:48 }}>
          {audienceCards.map(a => (
            <div key={a.audience} className="glass-card" style={{ padding:0, overflow:'hidden' }}>
              <img
                src={a.img}
                alt={a.imgAlt}
                style={{ width:'100%', display:'block', borderRadius:'20px 20px 0 0' }}
              />
              <div style={{ padding:28 }}>
                <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--sage)', marginBottom:8 }}>{a.eyebrow}</div>
                <div className="icon-box">{a.icon}</div>
                <div className="card-title">{a.audience}</div>
                {a.points.map(p => (
                  <div key={p} style={{ display:'flex', gap:10, fontSize:14, color:'var(--teal-deep)', marginBottom:10 }}>✅ {p}</div>
                ))}
                <div style={{ marginTop:20 }}>
                  <button className="btn-ghost" style={{ fontSize:13 }}>{a.cta}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── TESTIMONIALS ── */}
      <div className="section">
        <p className="eyebrow">Trusted by Healthcare Professionals</p>
        <h2 className="sec-title">What People <em>Are Saying</em></h2>
        <div className="grid-2" style={{ marginTop:48 }}>
          {testimonials.map(t => (
            <div key={t.name} className="glass-card" style={{ position:'relative' }}>
              <div style={{ fontSize:48, lineHeight:1, color:'var(--sage)', opacity:0.4, marginBottom:16 }}>"</div>
              <div style={{ fontSize:16, fontWeight:300, lineHeight:1.7, color:'var(--teal-deep)', marginBottom:24, fontStyle:'italic' }}>{t.quote}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:14, color:'var(--teal-dark)' }}>{t.name}</div>
              <div style={{ fontSize:12, color:'var(--teal-deep)', marginTop:4 }}>{t.org}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── FINAL CTA ── */}
      <div className="section" style={{ textAlign:'center' }}>
        <p className="eyebrow">Get Started</p>
        <h2 className="sec-title">Ready to Improve Quality and <em>Audit Readiness?</em></h2>
        <p className="sec-lead" style={{ maxWidth:520, margin:'0 auto 40px' }}>
          Let's discuss how NABH-aligned training can support your hospital or nursing college.
        </p>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
          <Link to="/contact"><button className="btn-primary">Book a Free Consultation</button></Link>
          <Link to="/courses"><button className="btn-ghost">Explore Learning Stacks</button></Link>
        </div>
      </div>
    </div>
  );
}