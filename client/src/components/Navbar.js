import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  ['/',           'Home'],
  ['/courses',    'Courses'],
  ['/technology', 'Technology'],
  ['/about',      'About Us'],
  ['/contact',    'Contact'],
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const width     = useWindowWidth();
  const isMobile  = width < 900;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position:       'fixed',
        top: 0, left: 0, right: 0,
        zIndex:         100,
        padding:        isMobile ? '16px 20px' : '20px 48px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(20px) saturate(1.4)',
        background:     scrolled ? 'rgba(26,58,54,0.95)' : 'rgba(26,58,54,0.45)',
        borderBottom:   '1px solid rgba(255,255,255,0.15)',
        transition:     'background .4s',
        boxSizing:      'border-box',
      }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: isMobile ? 16 : 18, letterSpacing: '0.12em', color: '#fff'
            }}>OCTA</span>
            <span style={{
              fontSize: 9, fontWeight: 300,
              letterSpacing: '0.22em', color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase'
            }}>Healthcare Training</span>
          </div>
        </Link>

        {/* ── DESKTOP NAV LINKS ── */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(([path, label]) => (
              <li key={path}>
                <Link to={path} style={{
                  fontSize:       13,
                  fontWeight:     isActive(path) ? 600 : 400,
                  letterSpacing:  '0.06em',
                  color:          isActive(path) ? '#fff' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition:     'color .3s',
                  borderBottom:   isActive(path) ? '1px solid rgba(255,255,255,0.5)' : 'none',
                  paddingBottom:  2,
                }}>{label}</Link>
              </li>
            ))}
            {user?.role === 'admin' && (
              <li>
                <Link to="/admin" style={{
                  fontSize: 13, fontWeight: 600,
                  color: '#c8dedd', textDecoration: 'none',
                  letterSpacing: '0.06em',
                }}>⚙ Admin</Link>
              </li>
            )}
          </ul>
        )}

        {/* ── RIGHT SIDE: Auth buttons (desktop only) ── */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {user ? (
              <>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '10px 24px', background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50,
                    fontSize: 13, color: '#fff', cursor: 'pointer', transition: 'background .3s',
                  }}
                  onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
                >Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button style={{
                    padding: '10px 24px', background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50,
                    fontSize: 13, fontWeight: 500, color: '#fff', cursor: 'pointer', transition: 'all .3s',
                  }}
                  onMouseEnter={e => e.target.style.borderColor = 'rgba(255,255,255,0.7)'}
                  onMouseLeave={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                  >Login</button>
                </Link>
                <Link to="/register">
                  <button style={{
                    padding: '10px 24px', background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50,
                    fontSize: 13, fontWeight: 500, color: '#fff', cursor: 'pointer',
                    backdropFilter: 'blur(10px)', transition: 'all .3s',
                  }}
                  onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
                  >Register</button>
                </Link>
                <Link to="/contact">
                  <button style={{
                    padding: '10px 24px', background: '#fff', border: 'none',
                    borderRadius: 50, fontSize: 13, fontWeight: 600,
                    color: '#1a4a46', cursor: 'pointer', transition: 'all .3s',
                  }}
                  onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = ''; }}
                  >Partner With Us</button>
                </Link>
              </>
            )}
          </div>
        )}

        {/* ── MOBILE: right-side (greeting + hamburger) ── */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user && (
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                Hi, {user.name.split(' ')[0]}
              </span>
            )}
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'none', border: 'none',
                color: '#fff', fontSize: 24, cursor: 'pointer',
                padding: '4px 8px', lineHeight: 1,
              }}
            >{menuOpen ? '✕' : '☰'}</button>
          </div>
        )}
      </nav>

      {/* ── MOBILE DROPDOWN MENU ── */}
      {isMobile && menuOpen && (
        <div style={{
          position:   'fixed',
          top:        57,
          left:       0,
          right:      0,
          zIndex:     99,
          background: 'rgba(26,58,54,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding:    '12px 20px 24px',
          display:    'flex',
          flexDirection: 'column',
          gap:        0,
          maxHeight:  'calc(100vh - 57px)',
          overflowY:  'auto',
        }}>
          {NAV_LINKS.map(([path, label]) => (
            <Link key={path} to={path} style={{
              padding:        '13px 0',
              fontSize:       15,
              fontWeight:     isActive(path) ? 600 : 400,
              color:          isActive(path) ? '#fff' : 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              borderBottom:   '1px solid rgba(255,255,255,0.07)',
            }}>{label}</Link>
          ))}

          {user?.role === 'admin' && (
            <Link to="/admin" style={{ padding:'13px 0', fontSize:15, color:'#c8dedd', textDecoration:'none', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>⚙ Admin</Link>
          )}

          {!user && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <Link to="/login">
                <button style={{
                  width: '100%', padding: '12px', background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10,
                  color: '#fff', fontSize: 14, cursor: 'pointer',
                }}>Login</button>
              </Link>
              <Link to="/register">
                <button style={{
                  width: '100%', padding: '12px', background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10,
                  color: '#fff', fontSize: 14, cursor: 'pointer',
                }}>Register</button>
              </Link>
              <Link to="/contact">
                <button style={{
                  width: '100%', padding: '12px', background: '#fff', border: 'none',
                  borderRadius: 10, color: '#1a4a46', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>Partner With Us</button>
              </Link>
            </div>
          )}

          {user && (
            <button onClick={handleLogout} style={{
              marginTop: 16, padding: '12px', background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10,
              color: '#fff', fontSize: 14, cursor: 'pointer', textAlign: 'left',
            }}>Logout</button>
          )}
        </div>
      )}
    </>
  );
}