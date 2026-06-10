import React, { useState, useEffect } from 'react';
import priyankaPhoto from '../assets/priyanka.jpeg';
import coFounderPhoto from '../assets/co_founder.jpeg';

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

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
  { n:'01', title:'Authority Positioning',   body:'Lead with NABH alignment, IMC & NMCI certifications. Every touchpoint reinforces clinical credibility — not just EdTech.' },
  { n:'02', title:'Empathy-First Messaging', body:"Speak to the clinician's real challenges — time pressure, compliance burden, patient outcomes. Make learning feel supportive." },
  { n:'03', title:'Cost Disruption',         body:'50% cost advantage is a headline differentiator. Frame as institutional ROI — quality-at-scale, not cheap.' },
  { n:'04', title:'Technology as Trust',     body:"The platform's analytics dashboard, predictive outlook, and board-ready reporting signal institutional-grade maturity." },
  { n:'05', title:'Co-Brand Partnerships',   body:'Hospitals become stakeholders — not just customers. Co-branded academies create sticky, long-term institutional investment.' },
  { n:'06', title:'SWOT — Strengths First',  body:'Certifications + cost + curriculum depth + adaptive technology form an unmatched quadrant. Expand via hospital network effects.' },
];

export default function About() {
  const width    = useWindowWidth();
  const isMobile = width < 900;

  const cardStyle = {
    background:   '#ffffff',
    border:       '1px solid rgba(15,61,56,0.12)',
    borderRadius: 16,
    padding:      isMobile ? '24px 20px' : '36px 32px',
    boxShadow:    '0 2px 16px rgba(15,61,56,0.07)',
    boxSizing:    'border-box',
    width:        '100%',
  };

  return (
    <div style={{ background:'#ffffff', color:'#0f3d38', overflowX:'hidden' }}>

      {/* ── Intro ── */}
      <div style={{
        display:       'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap:           isMobile ? 24 : 64,
        padding:       isMobile ? '100px 20px 48px' : '100px 48px 64px',
        maxWidth:      1280,
        margin:        '0 auto',
        boxSizing:     'border-box',
        alignItems:    'flex-start',
      }}>
        {/* Left text */}
        <div style={{ flex:1, minWidth:0 }}>
          <p className="eyebrow">About OCTA</p>
          <h2 className="sec-title" style={{ marginBottom:20 }}>
            Transforming Healthcare Education{' '}
            <em>Through Technology</em>
          </h2>
          <p style={{ fontSize:15, fontWeight:300, lineHeight:1.8, color:'#2d6b65', marginBottom:16 }}>
            OCTA is dedicated to elevating clinical excellence across medical institutions across India.
          </p>
          <p style={{ fontSize:15, fontWeight:300, lineHeight:1.8, color:'#2d6b65', marginBottom:28 }}>
            Our mission: elevate clinical competence and patient safety through evidence-based, standards-aligned, technology-enabled training that transforms healthcare delivery.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['Founded by Clinicians','IMC Certified','NMCI Certified'].map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
        </div>

        {/* Right: founder cards stacked */}
        <div style={{
          flex:      isMobile ? 'none' : 1,
          width:     '100%',
          display:   'flex',
          flexDirection: 'column',
          gap:       16,
        }}>
          {/* CEO card */}
          <div style={cardStyle}>
            <img
              src={priyankaPhoto}
              alt="Priyanka Edupuganti"
              style={{ width:64, height:64, borderRadius:'50%', objectFit:'cover', marginBottom:14, border:'2px solid #2d7a70', display:'block' }}
            />
            <div style={{ fontFamily:'Sora,sans-serif', fontSize:17, fontWeight:700, color:'#0f3d38', marginBottom:3 }}>
              Priyanka Edupuganti
            </div>
            <div style={{ fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'#4a9e94', marginBottom:12 }}>
              Founder & Chief Executive Officer
            </div>
            <p style={{ fontSize:14, fontWeight:300, lineHeight:1.75, color:'#2d6b65', fontStyle:'italic', margin:0 }}>
              "Healthcare is evolving rapidly, and technology will shape the way professionals learn, collaborate, and deliver care. Through OCTA, we are preparing the next generation to thrive in this technology-driven healthcare ecosystem."
            </p>
          </div>

          {/* Co-founder card */}
          <div style={cardStyle}>
            <img
              src={coFounderPhoto}
              alt="Co-Founder"
              style={{ width:64, height:64, borderRadius:'50%', objectFit:'cover', objectPosition:'top', marginBottom:14, border:'2px solid #2d7a70', display:'block' }}
            />
            <div style={{ fontFamily:'Sora,sans-serif', fontSize:17, fontWeight:700, color:'#0f3d38', marginBottom:3 }}>
              Co-Founder
            </div>
            <div style={{ fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'#4a9e94', marginBottom:12 }}>
              Co-Founder & Chief Technology Officer
            </div>
            <p style={{ fontSize:14, fontWeight:300, lineHeight:1.75, color:'#2d6b65', fontStyle:'italic', margin:0 }}>
              "Building technology that empowers healthcare professionals to deliver better patient outcomes — that's what drives every line of code we write at OCTA."
            </p>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── Certifications ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '64px 48px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <p className="eyebrow">Officially Recognised</p>
        <h2 className="sec-title">Our <em>Certifications</em></h2>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:                 16,
          marginTop:           32,
          maxWidth:            720,
        }}>
          {[
            ['👨‍⚕️','Indian Medical Council','IMC'],
            ['❤️','Nursing & Midwifery Council of India','NMCI'],
          ].map(([icon, name, abbr]) => (
            <div key={abbr} style={{
              background:  '#ffffff',
              border:      '1px solid rgba(15,61,56,0.12)',
              borderRadius:16,
              padding:     isMobile ? '28px 20px' : '36px 28px',
              textAlign:   'center',
              boxShadow:   '0 2px 12px rgba(15,61,56,0.06)',
              boxSizing:   'border-box',
            }}>
              <div style={{ width:60, height:60, background:'rgba(15,61,56,0.06)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, margin:'0 auto 14px' }}>{icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:16, fontWeight:700, color:'#0f3d38', marginBottom:4 }}>{name}</div>
              <div style={{ fontSize:11, letterSpacing:'0.15em', color:'#4a9e94', textTransform:'uppercase', marginBottom:14 }}>{abbr}</div>
              <span className="pill">✓ Certified Institution</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── Core Values ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '64px 48px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <p className="eyebrow">Eight Pillars of Excellence</p>
        <h2 className="sec-title">Our <em>Core Values</em></h2>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap:                 isMobile ? 10 : 16,
          marginTop:           32,
        }}>
          {values.map(v => (
            <div key={v.name} style={{
              background:   '#ffffff',
              border:       '1px solid rgba(15,61,56,0.12)',
              borderRadius: 14,
              padding:      isMobile ? '16px 10px' : '24px',
              textAlign:    'center',
              boxShadow:    '0 2px 8px rgba(15,61,56,0.05)',
              transition:   'all .3s',
              cursor:       'default',
              boxSizing:    'border-box',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(15,61,56,0.04)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(15,61,56,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#ffffff'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 2px 8px rgba(15,61,56,0.05)'; }}
            >
              <div style={{ fontSize: isMobile ? 22 : 28, marginBottom:8 }}>{v.icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 11 : 14, fontWeight:600, color:'#0f3d38' }}>{v.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── Strategic Frameworks ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '64px 48px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <p className="eyebrow">Brand Strategy</p>
        <h2 className="sec-title">Our <em>Strategic Frameworks</em></h2>
        <p className="sec-lead" style={{ marginBottom:32 }}>
          OCTA operates at the intersection of clinical credibility, technological innovation, and empathetic design.
        </p>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap:                 isMobile ? 12 : 20,
        }}>
          {strategies.map(s => (
            <div key={s.n} style={{
              background:   '#ffffff',
              border:       '1px solid rgba(15,61,56,0.12)',
              borderRadius: 16,
              padding:      isMobile ? '22px 18px' : '36px 28px',
              boxShadow:    '0 2px 12px rgba(15,61,56,0.06)',
              boxSizing:    'border-box',
              transition:   'all .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='0 12px 32px rgba(15,61,56,0.10)'; e.currentTarget.style.transform='translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(15,61,56,0.06)'; e.currentTarget.style.transform=''; }}
            >
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 32 : 48, fontWeight:800, color:'rgba(15,61,56,0.10)', lineHeight:1, marginBottom:12 }}>{s.n}</div>
              <div className="card-title">{s.title}</div>
              <div className="card-body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}