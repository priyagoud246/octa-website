import React, { useState, useEffect } from 'react';
import priyankaPhoto from '../assets/priyanka.jpeg';

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

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── Intro: text + founder card ── */}
      <div style={{
        display:       'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap:           isMobile ? 28 : 80,
        alignItems:    'flex-start',
        padding:       isMobile ? '80px 20px 40px' : '60px 48px',
        maxWidth:      1280,
        margin:        '0 auto',
        boxSizing:     'border-box',
        width:         '100%',
      }}>

        {/* Left: text */}
        <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
          <p className="eyebrow">About OCTA</p>
          <h2 className="sec-title" style={{ marginBottom: 20, fontSize: isMobile ? 'clamp(24px,6vw,36px)' : undefined }}>
            Transforming Healthcare Education <em>Through Technology</em>
          </h2>
          <p style={{ fontSize: 15, fontWeight:300, lineHeight:1.8, color:'var(--w60)', marginBottom:16 }}>
            OCTA is dedicated to elevating clinical excellence across medical institutions across India.
          </p>
          <p style={{ fontSize: 15, fontWeight:300, lineHeight:1.8, color:'var(--w60)', marginBottom:28 }}>
            Our mission: elevate clinical competence and patient safety through evidence-based, standards-aligned, technology-enabled training that transforms healthcare delivery.
          </p>
          <div className="pill-strip" style={{ flexWrap:'wrap', gap: 8 }}>
            {['Founded by Clinicians','IMC Certified','NMCI Certified'].map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
        </div>

        {/* Right: founder card */}
        <div style={{
          flex:          isMobile ? 'none' : 1,
          width:         '100%',
          background:    'var(--w08)',
          border:        '1px solid var(--w15)',
          borderRadius:  16,
          padding:       isMobile ? '24px 20px' : 40,
          backdropFilter:'blur(16px)',
          boxSizing:     'border-box',
        }}>
          <img
            src={priyankaPhoto}
            alt="Priyanka Edupuganti"
            style={{ width:68, height:68, borderRadius:'50%', objectFit:'cover', marginBottom:14, border:'2px solid var(--teal-mid)', display:'block' }}
          />
          <div style={{ fontFamily:'Sora,sans-serif', fontSize: 18, fontWeight:700, marginBottom:4 }}>
            Priyanka Edupuganti
          </div>
          <div style={{ fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--mist)', marginBottom:14 }}>
            Founder & Chief Executive Officer
          </div>
          <p style={{ fontSize: 14, fontWeight:300, lineHeight:1.75, color:'var(--w60)', fontStyle:'italic', margin:0 }}>
            "Healthcare is evolving rapidly, and technology will shape the way professionals learn, collaborate, and deliver care. Through OCTA, we are preparing the next generation to thrive in this technology-driven healthcare ecosystem."
          </p>
        </div>
      </div>

      <div className="divider" />

      {/* ── Certifications ── */}
      <div className="section" style={{ padding: isMobile ? '40px 20px' : undefined }}>
        <p className="eyebrow">Officially Recognised</p>
        <h2 className="sec-title">Our <em>Certifications</em></h2>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:                 16,
          marginTop:           32,
          maxWidth:            720,
          width:               '100%',
          boxSizing:           'border-box',
        }}>
          {[
            ['👨‍⚕️','Indian Medical Council','IMC'],
            ['❤️','Nursing & Midwifery Council of India','NMCI'],
          ].map(([icon, name, abbr]) => (
            <div key={abbr} style={{
              background:    'var(--w08)',
              border:        '1px solid var(--w15)',
              borderRadius:  16,
              padding:       isMobile ? '28px 20px' : '40px 32px',
              textAlign:     'center',
              backdropFilter:'blur(16px)',
              boxSizing:     'border-box',
            }}>
              <div style={{ width:60, height:60, background:'var(--w15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, margin:'0 auto 14px' }}>{icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: 16, fontWeight:700, marginBottom:4 }}>{name}</div>
              <div style={{ fontSize:11, letterSpacing:'0.15em', color:'var(--mist)', textTransform:'uppercase', marginBottom:14 }}>{abbr}</div>
              <span className="pill">✓ Certified Institution</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── Core Values ── */}
      <div className="section" style={{ padding: isMobile ? '40px 20px' : undefined }}>
        <p className="eyebrow">Eight Pillars of Excellence</p>
        <h2 className="sec-title">Our <em>Core Values</em></h2>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap:                 isMobile ? 10 : 16,
          marginTop:           32,
          width:               '100%',
          boxSizing:           'border-box',
        }}>
          {values.map(v => (
            <div key={v.name}
              style={{
                background:    'var(--w08)',
                border:        '1px solid var(--w15)',
                borderRadius:  14,
                padding:       isMobile ? '16px 10px' : 24,
                textAlign:     'center',
                backdropFilter:'blur(10px)',
                transition:    'all .3s',
                cursor:        'default',
                boxSizing:     'border-box',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--w15)'; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--w08)'; e.currentTarget.style.transform=''; }}
            >
              <div style={{ fontSize: isMobile ? 22 : 28, marginBottom:8 }}>{v.icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 11 : 14, fontWeight:600 }}>{v.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── Brand Strategies ── */}
      <div className="section" style={{ padding: isMobile ? '40px 20px' : undefined }}>
        <p className="eyebrow">Brand Strategy</p>
        <h2 className="sec-title">Our <em>Strategic Frameworks</em></h2>
        <p className="sec-lead">OCTA operates at the intersection of clinical credibility, technological innovation, and empathetic design.</p>
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap:                 isMobile ? 12 : 20,
          marginTop:           32,
          width:               '100%',
          boxSizing:           'border-box',
        }}>
          {strategies.map(s => (
            <div key={s.n} style={{
              background:    'var(--w08)',
              border:        '1px solid var(--w15)',
              borderRadius:  16,
              padding:       isMobile ? '22px 18px' : '36px 28px',
              backdropFilter:'blur(16px)',
              boxSizing:     'border-box',
            }}>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 32 : 48, fontWeight:800, color:'var(--w15)', lineHeight:1, marginBottom:12 }}>{s.n}</div>
              <div className="card-title">{s.title}</div>
              <div className="card-body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}