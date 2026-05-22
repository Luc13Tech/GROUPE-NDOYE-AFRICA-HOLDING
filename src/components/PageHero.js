import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';

export default function PageHero({ bgImg, label, title, sub, breadcrumbs = [] }) {
  const { lang } = useLang();
  const homeLabel = { fr:'Accueil', en:'Home', es:'Inicio', de:'Startseite' };

  return (
    <section className="page-hero" style={{ paddingTop: 72 }}>
      <div className="page-hero-bg" style={{ backgroundImage: `url(${bgImg})` }} />
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="bc-link" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
            {homeLabel[lang] || homeLabel.fr}
          </Link>
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              <span className="bc-sep">/</span>
              {b.path ? (
                <Link to={b.path} className="bc-link" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>{b.label}</Link>
              ) : (
                <span className="bc-cur">{b.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {label && (
          <div className="sec-label" style={{ paddingLeft: 0 }}>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: '.6rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              {label}
            </span>
          </div>
        )}

        <h1 style={{
          fontFamily: 'var(--f-elegant)',
          fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
          color: 'var(--cream)',
          letterSpacing: '.04em',
          marginBottom: 10,
          lineHeight: 1.15,
        }}>
          {title}
        </h1>

        {sub && (
          <p style={{
            fontFamily: 'var(--f-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(.88rem, 1.5vw, 1.1rem)',
            color: 'rgba(245,240,232,.55)',
          }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
