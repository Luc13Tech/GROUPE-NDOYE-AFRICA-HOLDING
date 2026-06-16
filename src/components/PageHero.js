import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';

export default function PageHero({ bgImg, label, title, sub, breadcrumbs = [] }) {
  const { lang } = useLang();
  const [imgError, setImgError] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const tl = (fr, en, es, de, zh = '') => {
    const val = { fr, en, es, de, zh }[lang];
    return (val !== undefined && val !== '') ? val : fr;
  };

  // Fallback gradients if image fails to load
  const fallbackGradients = {
    '/Images/yaye-dia/cite-vue-aerienne.jpg': 'linear-gradient(135deg,#0a0f1a 0%,#1a2744 100%)',
    '/Images/yaye-dia/villa-f5.jpg':          'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)',
    '/Images/yaye-dia/cuisine-luxe.jpg':       'linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 100%)',
    '/Images/yaye-dia/salon-duplex.jpg':       'linear-gradient(135deg,#0d1427 0%,#1a2744 100%)',
    '/Images/yaye-dia/villa-f4pp-facade.jpg':  'linear-gradient(135deg,#050810 0%,#0d1427 100%)',
    '/Images/yaye-dia/villa-f4duplex.jpg':     'linear-gradient(135deg,#0a0f1a 0%,#162032 100%)',
  };
  const defaultGradient = 'linear-gradient(135deg,#050810 0%,#0d1427 100%)';

  useEffect(() => {
    setImgError(false);
    setBgLoaded(false);
    if (!bgImg) { setBgLoaded(true); return; }

    const img = new window.Image();
    img.onload  = () => { setBgLoaded(true); setImgError(false); };
    img.onerror = () => { setImgError(true); setBgLoaded(true); };
    img.src = bgImg;
  }, [bgImg]);

  const bgStyle = (!bgLoaded || imgError)
    ? { background: fallbackGradients[bgImg] || defaultGradient }
    : { backgroundImage: `url(${bgImg})` };

  const homeLabel = tl('Accueil','Home','Inicio','Startseite','首页');

  return (
    <section style={{ paddingTop: 72, position: 'relative' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        ...bgStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        transition: 'background 0.5s ease',
      }}/>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg,rgba(5,8,16,.78) 0%,rgba(5,8,16,.88) 100%)',
        zIndex: 1,
      }}/>

      {/* Content */}
      <div className="container page-hero-content" style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(48px,8vw,96px) clamp(16px,4vw,32px) clamp(40px,6vw,72px)',
        textAlign: 'center',
        minHeight: 'clamp(240px,35vh,380px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
          <Link to="/" className="bc-link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
            {homeLabel}
          </Link>
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              <span className="bc-sep">/</span>
              {b.path
                ? <Link to={b.path} className="bc-link"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                    {b.label}
                  </Link>
                : <span className="bc-cur">{b.label}</span>
              }
            </React.Fragment>
          ))}
        </nav>

        {label && (
          <div className="sec-label" style={{ paddingLeft: 0, marginBottom: 8 }}>
            <span style={{
              fontFamily: 'var(--f-display)', fontSize: '.6rem',
              letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)',
            }}>
              {label}
            </span>
          </div>
        )}

        {title && (
          <h1 style={{
            fontFamily: 'var(--f-elegant)',
            fontSize: 'clamp(1.8rem,4vw,3.4rem)',
            color: 'var(--cream)',
            letterSpacing: '.04em',
            marginBottom: 10,
            lineHeight: 1.15,
          }}>
            {title}
          </h1>
        )}

        {sub && (
          <p style={{
            fontFamily: 'var(--f-serif)', fontStyle: 'italic',
            fontSize: 'clamp(.88rem,1.5vw,1.1rem)',
            color: 'rgba(245,240,232,.55)',
            maxWidth: 600, margin: '0 auto',
          }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
