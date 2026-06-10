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
    <div style={{ overflowX:'hidden', color:'#fff' }}>

      {/* ── Intro ── */}
      <div style={{
        display:       'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap:           isMobile ? 24 : 80,
        padding:       isMobile ? '90px 20px 48px' : '80px 48px 60px',
        maxWidth:      1280,
        margin:        '0 auto',
        boxSizing:     'border-box',
        width:         '100%',
      }}>
        {/* Text */}
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6ddbc9', marginBottom:12 }}>About OCTA</p>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 28 : 40, fontWeight:800, lineHeight:1.2, marginBottom:20, color:'#fff' }}>
            Transforming Healthcare Education{' '}
            <em style={{ color:'#6ddbc9', fontStyle:'normal' }}>Through Technology</em>
          </h2>
          <p style={{ fontSize:15, fontWeight:300, lineHeight:1.8, color:'rgba(255,255,255,0.6)', marginBottom:16 }}>
            OCTA is dedicated to elevating clinical excellence across medical institutions across India.
          </p>
          <p style={{ fontSize:15, fontWeight:300, lineHeight:1.8, color:'rgba(255,255,255,0.6)', marginBottom:28 }}>
            Our mission: elevate clinical competence and patient safety through evidence-based, standards-aligned, technology-enabled training that transforms healthcare delivery.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['Founded by Clinicians','IMC Certified','NMCI Certified'].map(p => (
              <span key={p} style={{
                padding:'6px 16px', borderRadius:50, fontSize:12, fontWeight:500,
                background:'rgba(109,219,201,0.15)', border:'1px solid rgba(109,219,201,0.3)',
                color:'#6ddbc9',
              }}>{p}</span>
            ))}
          </div>
        </div>

        {/* Founder card */}
        <div style={{
          flex:          isMobile ? 'none' : 1,
          width:         '100%',
          background:    'rgba(255,255,255,0.06)',
          border:        '1px solid rgba(255,255,255,0.12)',
          borderRadius:  16,
          padding:       isMobile ? '24px 20px' : '36px 32px',
          backdropFilter:'blur(16px)',
          boxSizing:     'border-box',
        }}>
          <img
            src={priyankaPhoto}
            alt="Priyanka Edupuganti"
            style={{ width:68, height:68, borderRadius:'50%', objectFit:'cover', marginBottom:14, border:'2px solid #6ddbc9', display:'block' }}
          />
          <div style={{ fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:700, marginBottom:4, color:'#fff' }}>
            Priyanka Edupuganti
          </div>
          <div style={{ fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'#7bbdb6', marginBottom:14 }}>
            Founder & Chief Executive Officer
          </div>
          <p style={{ fontSize:14, fontWeight:300, lineHeight:1.75, color:'rgba(255,255,255,0.6)', fontStyle:'italic', margin:0 }}>
            "Healthcare is evolving rapidly, and technology will shape the way professionals learn, collaborate, and deliver care. Through OCTA, we are preparing the next generation to thrive in this technology-driven healthcare ecosystem."
          </p>
        </div>
      </div>

      {/* divider */}
      <div style={{ height:1, background:'rgba(255,255,255,0.08)', margin:'0 48px' }} />

      {/* ── Certifications ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '64px 48px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6ddbc9', marginBottom:12 }}>Officially Recognised</p>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 26 : 36, fontWeight:800, marginBottom:32, color:'#fff' }}>
          Our <em style={{ color:'#6ddbc9', fontStyle:'normal' }}>Certifications</em>
        </h2>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:16, maxWidth:720,
        }}>
          {[
            ['👨‍⚕️','Indian Medical Council','IMC'],
            ['❤️','Nursing & Midwifery Council of India','NMCI'],
          ].map(([icon, name, abbr]) => (
            <div key={abbr} style={{
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:16, padding: isMobile ? '28px 20px' : '36px 28px',
              textAlign:'center', backdropFilter:'blur(16px)', boxSizing:'border-box',
            }}>
              <div style={{ width:60, height:60, background:'rgba(255,255,255,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, margin:'0 auto 14px' }}>{icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:16, fontWeight:700, marginBottom:4, color:'#fff' }}>{name}</div>
              <div style={{ fontSize:11, letterSpacing:'0.15em', color:'#7bbdb6', textTransform:'uppercase', marginBottom:14 }}>{abbr}</div>
              <span style={{ padding:'5px 14px', borderRadius:50, fontSize:11, fontWeight:600, background:'rgba(109,219,201,0.15)', border:'1px solid rgba(109,219,201,0.3)', color:'#6ddbc9' }}>✓ Certified Institution</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height:1, background:'rgba(255,255,255,0.08)', margin:'0 48px' }} />

      {/* ── Core Values ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '64px 48px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6ddbc9', marginBottom:12 }}>Eight Pillars of Excellence</p>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 26 : 36, fontWeight:800, marginBottom:32, color:'#fff' }}>
          Our <em style={{ color:'#6ddbc9', fontStyle:'normal' }}>Core Values</em>
        </h2>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? 10 : 16,
        }}>
          {values.map(v => (
            <div key={v.name} style={{
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:14, padding: isMobile ? '16px 10px' : '24px',
              textAlign:'center', backdropFilter:'blur(10px)',
              transition:'all .3s', cursor:'default', boxSizing:'border-box',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.transform=''; }}
            >
              <div style={{ fontSize: isMobile ? 22 : 28, marginBottom:8 }}>{v.icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 11 : 14, fontWeight:600, color:'#fff' }}>{v.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height:1, background:'rgba(255,255,255,0.08)', margin:'0 48px' }} />

      {/* ── Strategic Frameworks ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '64px 48px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6ddbc9', marginBottom:12 }}>Brand Strategy</p>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 26 : 36, fontWeight:800, marginBottom:12, color:'#fff' }}>
          Our <em style={{ color:'#6ddbc9', fontStyle:'normal' }}>Strategic Frameworks</em>
        </h2>
        <p style={{ fontSize:15, fontWeight:300, color:'rgba(255,255,255,0.6)', marginBottom:32, maxWidth:600 }}>
          OCTA operates at the intersection of clinical credibility, technological innovation, and empathetic design.
        </p>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: isMobile ? 12 : 20,
        }}>
          {strategies.map(s => (
            <div key={s.n} style={{
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:16, padding: isMobile ? '22px 18px' : '36px 28px',
              backdropFilter:'blur(16px)', boxSizing:'border-box',
            }}>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 32 : 48, fontWeight:800, color:'rgba(255,255,255,0.12)', lineHeight:1, marginBottom:12 }}>{s.n}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 14 : 16, fontWeight:700, marginBottom:8, color:'#fff' }}>{s.title}</div>
              <div style={{ fontSize:13, fontWeight:300, lineHeight:1.7, color:'rgba(255,255,255,0.6)' }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}