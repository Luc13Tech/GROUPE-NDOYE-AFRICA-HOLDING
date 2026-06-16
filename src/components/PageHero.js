import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';

export default function PageHero({ bgImg, fallbackImg, label, title, sub, breadcrumbs = [] }) {
  const { lang } = useLang();
  const [activeSrc, setActiveSrc] = useState(null);
  const [useGradient, setUseGradient] = useState(false);

  const tl = (fr, en, es, de, zh = '') => {
    const val = { fr, en, es, de, zh }[lang];
    return (val !== undefined && val !== '') ? val : fr;
  };

  const defaultGradient = 'linear-gradient(135deg,#050810 100%,#0d1427 100%)';

  useEffect(() => {
    let cancelled = false;
    setActiveSrc(null);
    setUseGradient(false);

    if (!bgImg && !fallbackImg) { setUseGradient(true); return; }

    // Try primary image first
    const tryLoad = (src, onFail) => {
      const img = new window.Image();
      img.onload = () => { if (!cancelled) setActiveSrc(src); };
      img.onerror = () => { if (!cancelled) onFail(); };
      img.src = src;
    };

    if (bgImg) {
      tryLoad(bgImg, () => {
        // Primary failed -> try fallback Unsplash
        if (fallbackImg) {
          tryLoad(fallbackImg, () => {
            if (!cancelled) setUseGradient(true);
          });
        } else if (!cancelled) {
          setUseGradient(true);
        }
      });
    } else if (fallbackImg) {
      tryLoad(fallbackImg, () => { if (!cancelled) setUseGradient(true); });
    }

    return () => { cancelled = true; };
  }, [bgImg, fallbackImg]);

  const bgStyle = useGradient
    ? { background: defaultGradient }
    : activeSrc
      ? { backgroundImage: `url(${activeSrc})` }
      : { background: defaultGradient };

  const homeLabel = tl('Accueil', 'Home', 'Inicio', 'Startseite', '首页');

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
        transition: 'background-image 0.6s ease',
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
