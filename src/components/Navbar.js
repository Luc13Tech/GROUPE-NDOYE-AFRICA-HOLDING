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

const LANG_LABELS = { fr:'Français', en:'English', es:'Español', de:'Deutsch' };

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const langRef  = useRef(null);

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

  const wm  = typeof SITE.waMsg==='object' ? (SITE.waMsg[lang]||SITE.waMsg.fr) : SITE.waMsg;
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`;
  const nl  = (item) => item[lang] || item.fr;

  // All nav including Gallery + Videos
  const EXTRA = [
    { id:'galerie', fr:'Galerie', en:'Gallery',    es:'Galería', de:'Galerie',   path:'/galerie' },
    { id:'videos',  fr:'Vidéos',  en:'Videos',     es:'Videos',  de:'Videos',    path:'/videos'  },
  ];
  const ALL_NAV = [...NAV, ...EXTRA];

  return (
    <>
      <header className={`navbar${scrolled?' scrolled':''}`}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo" onClick={()=>window.scrollTo({top:0,behavior:'instant'})}>
            <img src="/Images/logo/gnah-logo.png" alt="Groupe Ndoye Africa Holding" className="nav-logo-img"
              onError={e=>{e.target.style.display='none';}}/>
            <div className="nav-logo-text">
              <span className="nav-logo-name">GROUPE NDOYE AFRICA HOLDING</span>
              <span className="nav-logo-sub">G.N.A.H — {{fr:'Depuis',en:'Since',es:'Desde',de:'Seit'}[lang]} 2015</span>
            </div>
          </Link>

          <nav className="nav-links">
            {ALL_NAV.map(item => (
              <Link key={item.id} to={item.path}
                className={`nav-link${location.pathname===item.path?' active':''}`}
                onClick={()=>window.scrollTo({top:0,behavior:'instant'})}>
                {nl(item)}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="lang-selector" ref={langRef}>
              <button className="lang-btn" onClick={()=>setLangOpen(o=>!o)} aria-label="Langue">
                <GlobeIcon/> <span>{lang.toUpperCase()}</span>
                <span style={{fontSize:'.6rem',opacity:.6}}>{langOpen?'▲':'▼'}</span>
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  {Object.entries(LANG_LABELS).map(([code,label])=>(
                    <button key={code} className={`lang-option${lang===code?' active':''}`}
                      onClick={()=>{setLang(code);setLangOpen(false);}}>
                      {code.toUpperCase()} — {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="nav-wa-btn">
              <WAIcon/> WhatsApp
            </a>
            <button className={`hamburger${menuOpen?' open':''}`}
              onClick={()=>setMenuOpen(o=>!o)} aria-label="Menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      <nav className={`mobile-menu${menuOpen?' open':''}`}>
        {ALL_NAV.map(item=>(
          <Link key={item.id} to={item.path}
            className={`mobile-link${location.pathname===item.path?' active':''}`}
            onClick={()=>{setMenuOpen(false);window.scrollTo({top:0,behavior:'instant'});}}>
            {nl(item)}
          </Link>
        ))}
        <div style={{marginTop:16,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          {Object.keys(LANG_LABELS).map(code=>(
            <button key={code} onClick={()=>{setLang(code);setMenuOpen(false);}}
              style={{padding:'5px 10px',background:lang===code?'var(--gold)':'transparent',color:lang===code?'var(--navy)':'var(--gold)',border:'1px solid rgba(201,168,76,.35)',fontFamily:'var(--f-display)',fontSize:'.62rem',letterSpacing:'.1em',cursor:'pointer',transition:'var(--trans-f)'}}>
              {code.toUpperCase()}
            </button>
          ))}
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="btn btn-wa btn-sm" style={{fontSize:'.65rem'}}
            onClick={()=>setMenuOpen(false)}>
            <WAIcon/> WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
