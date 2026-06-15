import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';

export default function PageHero({ bg, label, title, sub, breadcrumbs = [] }) {
  const { lang } = useLang();
  return (
    <section className="page-hero">
      <div className="page-hero-bg" style={{ backgroundImage: `url(${bg})` }} />
      <div className="page-hero-overlay" />
      <div className="container page-hero-content" style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        {breadcrumbs.length > 0 && (
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link" style={{ fontFamily: 'var(--f-display)', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(201,168,76,0.5)', textDecoration: 'none', textTransform: 'uppercase' }}>
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span className="breadcrumb-sep">/</span>
                {b.path ? (
                  <Link to={b.path} style={{ fontFamily: 'var(--f-display)', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(201,168,76,0.5)', textDecoration: 'none', textTransform: 'uppercase' }}>
                    {b.label}
                  </Link>
                ) : (
                  <span className="breadcrumb-cur">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        {label && <div className="sec-label" style={{ paddingLeft: 0 }}><span style={{ color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>{label}</span></div>}
        <h1 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(2rem,5vw,4rem)', color: 'var(--cream)', letterSpacing: '0.04em', marginBottom: 10 }}>{title}</h1>
        {sub && <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(245,240,232,0.6)' }}>{sub}</p>}
      </div>
    </section>
  );
}
