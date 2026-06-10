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
  { icon:'⚖️', name:'Ethical'        },
  { icon:'🩺', name:'Clinical'       },
  { icon:'💻', name:'Technical'      },
  { icon:'📈', name:'Analytical'     },
  { icon:'🔄', name:'Adaptive'       },
  { icon:'💜', name:'Empathetic'     },
  { icon:'🏆', name:'Professional'   },
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
    <div style={{ background:'#ffffff', color:'#0f3d38', overflowX:'hidden' }}>

      {/* ── HERO / INTRO ── */}
      <div style={{
        display:       'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap:           isMobile ? 32 : 64,
        padding:       isMobile ? '88px 20px 48px' : '96px 64px 64px',
        maxWidth:      1280,
        margin:        '0 auto',
        boxSizing:     'border-box',
        alignItems:    'flex-start',
        background:    'linear-gradient(160deg, #e6f7f4 0%, #ffffff 60%)',
      }}>

        {/* Left text */}
        <div style={{ flex:1, minWidth:0 }}>
          {/* Eyebrow */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontSize:12, fontWeight:600, letterSpacing:'0.2em',
            textTransform:'uppercase', color:'#1a9080', marginBottom:16,
          }}>
            <span style={{ display:'block', width:24, height:2, background:'#1a9080', borderRadius:2 }} />
            About OCTA
          </div>

          <h1 style={{
            fontFamily:    'Sora, sans-serif',
            fontSize:      isMobile ? 30 : 'clamp(34px,4vw,52px)',
            fontWeight:    800,
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            color:         '#0f3d38',
            marginBottom:  20,
          }}>
            Transforming Healthcare Education{' '}
            <span style={{ color:'#1a9080' }}>Through Technology</span>
          </h1>

          <p style={{ fontSize:16, fontWeight:300, lineHeight:1.8, color:'#2d6b65', marginBottom:16 }}>
            OCTA is dedicated to elevating clinical excellence across medical institutions across India.
          </p>
          <p style={{ fontSize:16, fontWeight:300, lineHeight:1.8, color:'#2d6b65', marginBottom:28 }}>
            Our mission: elevate clinical competence and patient safety through evidence-based,
            standards-aligned, technology-enabled training that transforms healthcare delivery.
          </p>

          {/* Pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['Founded by Clinicians','IMC Certified','NMCI Certified'].map(p => (
              <span key={p} style={{
                display:'inline-flex', alignItems:'center',
                padding:'6px 16px',
                background:'#e6f7f4', color:'#0f6b5e',
                border:'1px solid #b3e8de', borderRadius:50,
                fontSize:13, fontWeight:500,
              }}>{p}</span>
            ))}
          </div>
        </div>

        {/* Right: two founder cards */}
        <div style={{
          flex:          isMobile ? 'none' : 1,
          width:         '100%',
          display:       'flex',
          flexDirection: 'column',
          gap:           16,
        }}>

          {/* Priyanka — CEO */}
          <div style={{
            background:   '#ffffff',
            border:       '1px solid rgba(15,61,56,0.12)',
            borderRadius: 20,
            padding:      isMobile ? '24px 20px' : '32px 28px',
            boxShadow:    '0 2px 16px rgba(15,61,56,0.07)',
            boxSizing:    'border-box',
            width:        '100%',
            transition:   'box-shadow .3s, transform .3s',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
              <img
                src={priyankaPhoto}
                alt="Priyanka Edupuganti"
                style={{
                  width:72, height:72, borderRadius:'50%',
                  objectFit:'cover', objectPosition:'top center',
                  border:'3px solid #1a9080', flexShrink:0,
                }}
              />
              <div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:17, fontWeight:800, color:'#0f3d38', marginBottom:3 }}>
                  Priyanka Edupuganti
                </div>
                <div style={{ fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'#1a9080', fontWeight:600 }}>
                  Founder & Chief Executive Officer
                </div>
                <a href="mailto:partnerships@brivox.in" style={{ fontSize:12, color:'#1a9080', textDecoration:'none', display:'block', marginTop:4 }}>
                  📧 partnerships@brivox.in
                </a>
              </div>
            </div>
            <div style={{ height:1, background:'rgba(15,61,56,0.1)', marginBottom:14 }} />
            <p style={{ fontSize:14, fontWeight:300, lineHeight:1.75, color:'#2d6b65', fontStyle:'italic', margin:0 }}>
              "Healthcare is evolving rapidly, and technology will shape the way professionals learn,
              collaborate, and deliver care. Through OCTA, we are preparing the next generation to
              thrive in this technology-driven healthcare ecosystem."
            </p>
          </div>

          {/* Jay — Co-founder */}
          <div style={{
            background:   '#ffffff',
            border:       '1px solid rgba(15,61,56,0.12)',
            borderRadius: 20,
            padding:      isMobile ? '24px 20px' : '32px 28px',
            boxShadow:    '0 2px 16px rgba(15,61,56,0.07)',
            boxSizing:    'border-box',
            width:        '100%',
            transition:   'box-shadow .3s, transform .3s',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
              <img
                src={coFounderPhoto}
                alt="Jay Parvathaneni"
                style={{
                  width:72, height:72, borderRadius:'50%',
                  objectFit:'cover', objectPosition:'top center',
                  border:'3px solid #1a9080', flexShrink:0,
                }}
              />
              <div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:17, fontWeight:800, color:'#0f3d38', marginBottom:3 }}>
                  Jay Parvathaneni
                </div>
                <div style={{ fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'#1a9080', fontWeight:600 }}>
                  Co-Founder & Chief Technology Officer
                </div>
              </div>
            </div>
            <div style={{ height:1, background:'rgba(15,61,56,0.1)', marginBottom:14 }} />
            <p style={{ fontSize:14, fontWeight:300, lineHeight:1.75, color:'#2d6b65', fontStyle:'italic', margin:0 }}>
              "Building technology that empowers healthcare professionals to deliver better patient
              outcomes — that's what drives every line of code we write at OCTA."
            </p>
          </div>

        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height:1, background:'#e8eceb', margin: isMobile ? '0 20px' : '0 64px' }} />

      {/* ── CERTIFICATIONS ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '72px 64px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#1a9080', marginBottom:16 }}>
          <span style={{ display:'block', width:24, height:2, background:'#1a9080', borderRadius:2 }} />
          Officially Recognised
        </div>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 28 : 40, fontWeight:800, color:'#0f3d38', marginBottom:32 }}>
          Our <span style={{ color:'#1a9080' }}>Certifications</span>
        </h2>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:16, maxWidth:720,
        }}>
          {[
            ['👨‍⚕️','Indian Medical Council','IMC','Officially certified training provider for medical professionals across India.'],
            ['❤️','Nursing & Midwifery Council of India','NMCI','Recognised provider of nursing education and professional development programmes.'],
          ].map(([icon, name, abbr, desc]) => (
            <div key={abbr} style={{
              background:'#ffffff',
              border:'1px solid rgba(15,61,56,0.12)',
              borderRadius:16,
              padding: isMobile ? '28px 20px' : '36px 28px',
              textAlign:'center',
              boxShadow:'0 2px 12px rgba(15,61,56,0.06)',
              boxSizing:'border-box',
              transition:'all .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='0 12px 32px rgba(15,61,56,0.12)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='#1a9080'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(15,61,56,0.06)'; e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(15,61,56,0.12)'; }}
            >
              <div style={{ width:68, height:68, background:'#e6f7f4', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, margin:'0 auto 16px', border:'2px solid #b3e8de' }}>{icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:17, fontWeight:700, color:'#0f3d38', marginBottom:4 }}>{name}</div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', color:'#1a9080', textTransform:'uppercase', marginBottom:10 }}>{abbr}</div>
              <p style={{ fontSize:13, color:'#2d6b65', lineHeight:1.6, marginBottom:16 }}>{desc}</p>
              <span style={{ display:'inline-flex', alignItems:'center', padding:'6px 16px', background:'#e6f7f4', color:'#0f6b5e', border:'1px solid #b3e8de', borderRadius:50, fontSize:13, fontWeight:500 }}>✓ Certified Institution</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height:1, background:'#e8eceb', margin: isMobile ? '0 20px' : '0 64px' }} />

      {/* ── CORE VALUES ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '72px 64px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#1a9080', marginBottom:16 }}>
          <span style={{ display:'block', width:24, height:2, background:'#1a9080', borderRadius:2 }} />
          Eight Pillars of Excellence
        </div>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 28 : 40, fontWeight:800, color:'#0f3d38', marginBottom:32 }}>
          Our <span style={{ color:'#1a9080' }}>Core Values</span>
        </h2>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? 10 : 16,
        }}>
          {values.map(v => (
            <div key={v.name} style={{
              background:'#ffffff',
              border:'1px solid rgba(15,61,56,0.12)',
              borderRadius:14,
              padding: isMobile ? '18px 10px' : '24px',
              textAlign:'center',
              boxShadow:'0 2px 8px rgba(15,61,56,0.05)',
              transition:'all .3s',
              cursor:'default',
              boxSizing:'border-box',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#e6f7f4'; e.currentTarget.style.borderColor='#1a9080'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(15,61,56,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#ffffff'; e.currentTarget.style.borderColor='rgba(15,61,56,0.12)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 2px 8px rgba(15,61,56,0.05)'; }}
            >
              <div style={{ fontSize: isMobile ? 24 : 30, marginBottom:10 }}>{v.icon}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 12 : 14, fontWeight:700, color:'#0f3d38' }}>{v.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height:1, background:'#e8eceb', margin: isMobile ? '0 20px' : '0 64px' }} />

      {/* ── STRATEGIC FRAMEWORKS ── */}
      <div style={{ padding: isMobile ? '48px 20px' : '72px 64px', maxWidth:1280, margin:'0 auto', boxSizing:'border-box' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#1a9080', marginBottom:16 }}>
          <span style={{ display:'block', width:24, height:2, background:'#1a9080', borderRadius:2 }} />
          Brand Strategy
        </div>
        <h2 style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 28 : 40, fontWeight:800, color:'#0f3d38', marginBottom:12 }}>
          Our <span style={{ color:'#1a9080' }}>Strategic Frameworks</span>
        </h2>
        <p style={{ fontSize:16, fontWeight:300, lineHeight:1.75, color:'#2d6b65', marginBottom:36, maxWidth:580 }}>
          OCTA operates at the intersection of clinical credibility, technological innovation, and empathetic design.
        </p>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: isMobile ? 12 : 20,
        }}>
          {strategies.map(s => (
            <div key={s.n} style={{
              background:'#ffffff',
              border:'1px solid rgba(15,61,56,0.12)',
              borderRadius:16,
              padding: isMobile ? '22px 18px' : '36px 28px',
              boxShadow:'0 2px 12px rgba(15,61,56,0.06)',
              boxSizing:'border-box',
              transition:'all .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='0 12px 32px rgba(15,61,56,0.10)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='#1a9080'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(15,61,56,0.06)'; e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(15,61,56,0.12)'; }}
            >
              <div style={{ fontFamily:'Sora,sans-serif', fontSize: isMobile ? 36 : 48, fontWeight:800, color:'rgba(15,61,56,0.08)', lineHeight:1, marginBottom:12 }}>{s.n}</div>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:16, fontWeight:700, color:'#0f3d38', marginBottom:8 }}>{s.title}</div>
              <div style={{ fontSize:14, lineHeight:1.7, color:'#2d6b65' }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}