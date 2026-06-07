import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { NAV, SITE } from '../data/siteData';

const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const WAIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// LogoMark — shows PNG or golden fallback
function LogoMark({ size = 46 }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div style={{ width: size, height: size, background: 'linear-gradient(145deg,#0d1427,#050810)', border: '1.5px solid rgba(201,168,76,.55)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 40% 30%, rgba(201,168,76,.1), transparent 70%)' }}/>
        <svg width={size*0.72} height={size*0.72} viewBox="0 0 48 48" fill="none" style={{ position: 'relative', zIndex: 1 }}>
          <polygon points="24,4 6,16 6,44 42,44 42,16" fill="none" stroke="#c9a84c" strokeWidth="2.2" strokeLinejoin="round"/>
          <rect x="17" y="26" width="7" height="18" fill="rgba(201,168,76,.8)"/>
          <rect x="24" y="26" width="7" height="18" fill="rgba(201,168,76,.8)"/>
          <rect x="10" y="20" width="5" height="5" fill="rgba(201,168,76,.45)"/>
          <rect x="33" y="20" width="5" height="5" fill="rgba(201,168,76,.45)"/>
          <circle cx="24" cy="11" r="2.5" fill="#e8c96a" opacity=".9"/>
        </svg>
      </div>
    );
  }
  return (
    <img src="/Images/logo/gnah-logo.png" alt="GNAH"
      style={{ height: size, width: 'auto', objectFit: 'contain', flexShrink: 0, display: 'block', maxWidth: size * 2.5 }}
      onError={(e) => {
        // Try alternative path before showing fallback
        if (e.target.src.includes('/Images/')) {
          e.target.src = '/images/logo/gnah-logo.png';
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

const LANG_OPTIONS = [
  { code: 'fr', label: 'Français',  flag: '🇫🇷' },
  { code: 'en', label: 'English',   flag: '🇬🇧' },
  { code: 'es', label: 'Español',   flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch',   flag: '🇩🇪' },
  { code: 'zh', label: '中文',       flag: '🇨🇳' },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const langRef = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setMenuOpen(false); setLangOpen(false); }, [location]);

  useEffect(() => {
    const h = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const wm = typeof SITE.waMsg === 'object' ? (SITE.waMsg[lang] || SITE.waMsg.fr) : SITE.waMsg;
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`;
  const nl = (item) => item[lang] || item.fr;
  const logoSize = scrolled ? 36 : 44;
  const currentLang = LANG_OPTIONS.find(l => l.code === lang) || LANG_OPTIONS[0];

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* LOGO */}
          <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
            <LogoMark size={logoSize} />
            <div className="nav-logo-text">
              <span className="nav-logo-name">GROUPE NDOYE AFRICA HOLDING</span>
              <span className="nav-logo-sub">G.N.A.H — { {fr:'Depuis',en:'Since',es:'Desde',de:'Seit',zh:'自'}[lang] } 2015</span>
            </div>
          </Link>

          {/* NAV LINKS — desktop */}
          <nav className="nav-links">
            {NAV.map(item => (
              <Link key={item.id} to={item.path}
                className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                {nl(item)}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="nav-actions">
            {/* Language selector */}
            <div className="lang-selector" ref={langRef}>
              <button className="lang-btn" onClick={() => setLangOpen(o => !o)}>
                <GlobeIcon />
                <span>{currentLang.flag} {lang.toUpperCase()}</span>
                <span style={{ fontSize: '.55rem', opacity: .5 }}>{langOpen ? '▲' : '▼'}</span>
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  {LANG_OPTIONS.map(opt => (
                    <button key={opt.code}
                      className={`lang-option${lang === opt.code ? ' active' : ''}`}
                      onClick={() => { setLang(opt.code); setLangOpen(false); }}>
                      {opt.flag} {opt.code.toUpperCase()} — {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp — desktop only */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="nav-wa-btn">
              <WAIcon /> WhatsApp
            </a>

            {/* Hamburger */}
            <button className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {/* Logo in mobile menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, marginBottom: 8, borderBottom: '1px solid rgba(201,168,76,.15)' }}>
          <LogoMark size={40} />
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: '.62rem', color: 'var(--gold)', letterSpacing: '.14em' }}>GROUPE NDOYE AFRICA HOLDING</div>
            <div style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '.6rem', color: 'rgba(201,168,76,.4)' }}>G.N.A.H — Depuis 2015</div>
          </div>
        </div>

        {/* Nav links */}
        {NAV.map(item => (
          <Link key={item.id} to={item.path}
            className={`mobile-link${location.pathname === item.path ? ' active' : ''}`}
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
            {nl(item)}
          </Link>
        ))}

        {/* Language + WhatsApp */}
        <div style={{ marginTop: 16, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {LANG_OPTIONS.map(opt => (
            <button key={opt.code}
              onClick={() => { setLang(opt.code); setMenuOpen(false); }}
              style={{
                padding: '5px 9px',
                background: lang === opt.code ? 'var(--gold)' : 'transparent',
                color: lang === opt.code ? 'var(--navy)' : 'var(--gold)',
                border: '1px solid rgba(201,168,76,.35)',
                fontFamily: 'var(--f-body)', fontSize: '.72rem',
                cursor: 'pointer', transition: 'var(--trans-f)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
              {opt.flag} {opt.code.toUpperCase()}
            </button>
          ))}
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="btn btn-wa btn-sm" style={{ fontSize: '.65rem' }}
            onClick={() => setMenuOpen(false)}>
            <WAIcon /> WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
