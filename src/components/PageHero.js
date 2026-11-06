import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { makeTl } from '../utils/i18n';

/** Bandeau d'ouverture des pages intérieures. L'image locale est tentée d'abord, puis l'image de secours. */
export default function PageHero({ bgImg, fallbackImg, label, title, sub, breadcrumbs = [] }) {
  const { lang } = useLang();
  const tl = makeTl(lang);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    const load = (url, onFail) => {
      if (!url) {
        onFail();
        return;
      }
      const img = new window.Image();
      img.onload = () => !cancelled && setSrc(url);
      img.onerror = () => !cancelled && onFail();
      img.src = url;
    };
    load(bgImg, () => load(fallbackImg, () => {}));
    return () => {
      cancelled = true;
    };
  }, [bgImg, fallbackImg]);

  const rise = (delay) => ({ animation: `fadeUp 1s var(--ease) ${delay}s both` });

  return (
    <header className="phero on-dark">
      {src && <div className="phero__bg is-on" style={{ backgroundImage: `url(${src})` }} aria-hidden="true" />}
      <div className="container">
        <nav className="phero__crumbs" aria-label={tl("Fil d’Ariane", 'Breadcrumb', 'Ruta de navegación', 'Brotkrumennavigation', '面包屑导航')} style={rise(0)}>
          <Link to="/">{tl('Accueil', 'Home', 'Inicio', 'Startseite', '首页')}</Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span aria-hidden="true">/</span>
              {crumb.path ? <Link to={crumb.path}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
            </React.Fragment>
          ))}
        </nav>
        {label && (
          <div className="eyebrow" style={{ marginBottom: 18, ...rise(0.08) }}>
            {label}
          </div>
        )}
        <h1 className="h1 phero__title" style={rise(0.16)}>
          {title}
        </h1>
        {sub && (
          <p className="lead phero__sub" style={rise(0.26)}>
            {sub}
          </p>
        )}
      </div>
    </header>
  );
}
