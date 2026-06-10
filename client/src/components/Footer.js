import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      position:'relative', zIndex:2,
      borderTop:'1px solid rgba(255,255,255,0.15)',
      padding:'48px 48px 32px',
      backdropFilter:'blur(20px)',
      background:'rgba(26,58,54,0.5)'
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:48, paddingBottom:40, borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:32 }}>
          <div>
            <div style={{ fontFamily:'Sora,sans-serif', fontSize:20, fontWeight:800, letterSpacing:'0.1em', marginBottom:4 }}>OCTA</div>
            <div style={{ fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:16 }}>Healthcare Training</div>
            <p style={{ fontSize:13, lineHeight:1.7, color:'rgba(255,255,255,0.6)', maxWidth:260 }}>
              Turning NABH standards into daily practice through structured training, templates, and mock audits.
            </p>
          </div>
          {[
            { title:'Resources',  links:[['Learning Stacks','/courses'],['NABH Glossary','/resources']] },
            { title:'Company',    links:[['About Us','/about'],['For Hospitals','/hospitals'],['For Colleges','/colleges']] },
            { title:'Legal',      links:[['Privacy Policy','/privacy'],['Terms of Use','/terms'],['Refund Policy','/refund']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:'Sora,sans-serif', fontSize:13, fontWeight:600, letterSpacing:'0.08em', marginBottom:16 }}>{col.title}</div>
              <ul style={{ listStyle:'none', padding:0 }}>
                {col.links.map(([label, path]) => (
                  <li key={label} style={{ marginBottom:10 }}>
                    <Link to={path} style={{ fontSize:13, color:'rgba(255,255,255,0.6)', textDecoration:'none' }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Compliance Disclaimer */}
        <div style={{ marginBottom: 24, fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, textAlign: 'center' }}>
          We provide NABH-aligned training and implementation support. We are not an accreditation body and do not claim “NABH approved” or “affiliated.”
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.6)' }}>© {new Date().getFullYear()} OCTA. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}