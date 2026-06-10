import React from 'react';
import priyankaPhoto from '../assets/priyanka.jpeg'; // 1. Import the image

const values = [
  { icon:'⚖️', name:'Ethical' },
  { icon:'🩺', name:'Clinical' },
  { icon:'💻', name:'Technical' },
  { icon:'📈', name:'Analytical' },
  { icon:'🔄', name:'Adaptive' },
  { icon:'💜', name:'Empathetic' },
  { icon:'🏆', name:'Professional' },
  { icon:'🚀', name:'Transformative' },
];

const strategies = [
  { n:'01', title:'Authority Positioning',      body:'Lead with NABH alignment, IMC & NMCI certifications. Every touchpoint reinforces clinical credibility — not just EdTech.' },
  { n:'02', title:'Empathy-First Messaging',    body:"Speak to the clinician's real challenges — time pressure, compliance burden, patient outcomes. Make learning feel supportive." },
  { n:'03', title:'Cost Disruption',            body:'50% cost advantage is a headline differentiator. Frame as institutional ROI — quality-at-scale, not cheap.' },
  { n:'04', title:'Technology as Trust',        body:"The platform's analytics dashboard, predictive outlook, and board-ready reporting signal institutional-grade maturity." },
  { n:'05', title:'Co-Brand Partnerships',      body:'Hospitals become stakeholders — not just customers. Co-branded academies create sticky, long-term institutional investment.' },
  { n:'06', title:'SWOT — Strengths First',     body:'Certifications + cost + curriculum depth + adaptive technology form an unmatched quadrant. Expand via hospital network effects.' },
];

export default function About() {
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center', padding:'60px 48px', maxWidth:1280, margin:'0 auto' }}>
        <div>
          <p className="eyebrow">About OCTA</p>
          <h2 className="sec-title" style={{ marginBottom:24 }}>Transforming Healthcare Education <em>Through Technology</em></h2>
          <p style={{ fontSize:16, fontWeight:300, lineHeight:1.8, color:'var(--w60)', marginBottom:24 }}>OCTA is dedicated to elevating clinical excellence across medical institutions across India.</p>
          <p style={{ fontSize:16, fontWeight:300, lineHeight:1.8, color:'var(--w60)', marginBottom:32 }}>Our mission: elevate clinical competence and patient safety through evidence-based, standards-aligned, technology-enabled training that transforms healthcare delivery.</p>
          <div className="pill-strip">
            {['Founded by Clinicians','IMC Certified','NMCI Certified'].map(p => <span key={p} className="pill">{p}</span>)}
          </div>
        </div>

        {/* Founder card */}
        <div style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:24, padding:40, backdropFilter:'blur(16px)' }}>
          {/* 2. Replace the PE div with the image tag */}
          <img 
            src={priyankaPhoto} 
            alt="Priyanka Edupuganti" 
            style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', marginBottom:20, border:'2px solid var(--teal-mid)' }} 
          />
          <div style={{ fontFamily:'Sora,sans-serif', fontSize:20, fontWeight:700, marginBottom:4 }}>Priyanka Edupuganti</div>
          <div style={{ fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--mist)', marginBottom:20 }}>Founder & Chief Executive Officer</div>
          <p style={{ fontSize:15, fontWeight:300, lineHeight:1.7, color:'var(--w60)', fontStyle:'italic' }}>"Healthcare is evolving rapidly, and technology will shape the way professionals learn, collaborate, and deliver care. Through OCTA, we are preparing the next generation to thrive in this technology-driven healthcare ecosystem."</p>
        </div>
      </div>

      <div className="divider" />

      {/* Certifications */}
      <div className="section">
        <p className="eyebrow">Officially Recognised</p>
        <h2 className="sec-title">Our <em>Certifications</em></h2>
        <div className="grid-2" style={{ marginTop:48, maxWidth:720 }}>
          {[['👨‍⚕️','Indian Medical Council','IMC'],['❤️','Nursing & Midwifery Council of India','NMCI']].map(([icon,name,abbr]) => (
            <div key={abbr} style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:20, padding:'40px 32px', textAlign:'center', backdropFilter:'blur(16px)' }}>
              <div style={{ width:72, height:72, background:'var(--w15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, margin:'0 auto 20px' }}>{icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:700, marginBottom:4 }}>{name}</div>
              <div style={{ fontSize:12, letterSpacing:'0.2em', color:'var(--mist)', textTransform:'uppercase', marginBottom:16 }}>{abbr}</div>
              <span className="pill">✓ Certified Institution</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Values */}
      <div className="section">
        <p className="eyebrow">Eight Pillars of Excellence</p>
        <h2 className="sec-title">Our <em>Core Values</em></h2>
        <div className="grid-4" style={{ marginTop:48 }}>
          {values.map(v => (
            <div key={v.name} style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:16, padding:24, textAlign:'center', backdropFilter:'blur(10px)', transition:'all .3s', cursor:'default' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--w15)'; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--w08)'; e.currentTarget.style.transform=''; }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{v.icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:14, fontWeight:600 }}>{v.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Brand strategies */}
      <div className="section">
        <p className="eyebrow">Brand Strategy</p>
        <h2 className="sec-title">Our <em>Strategic Frameworks</em></h2>
        <p className="sec-lead">OCTA operates at the intersection of clinical credibility, technological innovation, and empathetic design.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginTop:48 }}>
          {strategies.map(s => (
            <div key={s.n} style={{ background:'var(--w08)', border:'1px solid var(--w15)', borderRadius:20, padding:'36px 28px', backdropFilter:'blur(16px)' }}>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:48, fontWeight:800, color:'var(--w15)', lineHeight:1, marginBottom:16 }}>{s.n}</div>
              <div className="card-title">{s.title}</div>
              <div className="card-body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}