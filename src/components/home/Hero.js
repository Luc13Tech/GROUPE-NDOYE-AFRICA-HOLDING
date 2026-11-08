import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/useLang';
import useInView from '../../hooks/useInView';
import { useContent } from '../../services/ContentProvider';
import { makeTl, pick } from '../../utils/i18n';

// Images principales de l'accueil : fichiers déposés dans public/Images/accueil/ (aucune image de substitution).
export const HERO_IMAGES = ['public/Images/accueil/hero-1.jpg', 'public/Images/accueil/hero-2.jpg'];
const SLIDE_MS = 7000;

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function CountUp({ value }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const [ref, , seen] = useInView({ threshold: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen || target === null) return undefined;
    if (prefersReducedMotion()) {
      setN(target);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / 1800, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target]);

  if (target === null) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const { STATS, TAGLINE, SUBTITLE } = useContent();
  const tl = makeTl(lang);
  const mediaRef = useRef(null);
  const [ready, setReady] = useState([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // On n'affiche que les images réellement présentes, dans l'ordre prévu.
  useEffect(() => {
    let alive = true;
    const found = {};
    HERO_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        found[src] = true;
        if (alive) setReady(HERO_IMAGES.filter((s) => found[s]));
      };
      img.src = src;
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (ready.length < 2 || paused || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % ready.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [ready.length, active, paused]);

  // Parallaxe doux : le fond défile plus lentement que la page.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      if (mediaRef.current) mediaRef.current.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero on-dark" aria-label="Groupe Ndoye Africa Holding">
      <div className="hero__media" ref={mediaRef} aria-hidden="true">
        {ready.map((src, i) => (
          <div key={src} className={`hero__layer${i === active ? ' is-on' : ''}`} style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>

      <div className="hero__cube" aria-hidden="true">
        <div className="cube3d">
          <b>F3</b>
          <b>F4PP</b>
          <b>F4D</b>
          <b>F5</b>
          <b>Plan</b>
          <b>3D</b>
        </div>
      </div>

      <div className="container hero__inner">
        <div className="eyebrow">African Development Company</div>
        <h1 className="hero__title">{pick(TAGLINE, lang)}</h1>
        <p className="hero__sub">{pick(SUBTITLE, lang)}</p>
        <p className="hero__chapo">
          {tl(
            'Développement de projets, infrastructures, agriculture, énergie et immobilier : de la conception à la livraison.',
            'Project development, infrastructure, agriculture, energy and real estate: from design to delivery.',
            'Desarrollo de proyectos, infraestructuras, agricultura, energía e inmobiliaria: de la concepción a la entrega.',
            'Projektentwicklung, Infrastruktur, Landwirtschaft, Energie und Immobilien: von der Planung bis zur Übergabe.',
            '项目开发、基础设施、农业、能源与房地产：从设计到交付。'
          )}
        </p>
        <div className="hero__actions">
          <Link to="/projets" className="btn btn--float">
            {tl('Découvrir nos projets', 'Discover our projects', 'Descubrir nuestros proyectos', 'Unsere Projekte entdecken', '探索我们的项目')} <span className="arr">→</span>
          </Link>
          <Link to="/contact" className="btn btn--ghost">
            {tl('Prendre contact', 'Get in touch', 'Contáctenos', 'Kontakt aufnehmen', '联系我们')}
          </Link>
        </div>
        {ready.length > 1 && (
          <div className="hero__pager" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <span>{String(active + 1).padStart(2, '0')} / {String(ready.length).padStart(2, '0')}</span>
            {ready.map((src, i) => (
              <button key={src} type="button" className={i === active ? 'is-on' : ''} aria-label={`${i + 1}`} onClick={() => setActive(i)} />
            ))}
          </div>
        )}
      </div>

      <div className="container">
        <div className="hero__stats">
          {STATS.map((s, i) => (
            <div className="chip" key={i}>
              <strong><CountUp value={s.val} /></strong>
              <span>{s[lang] || s.fr}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
