import React, { useEffect, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import useInView from '../../hooks/useInView';
import { useContent } from '../../services/ContentProvider';
import { makeTl, pick } from '../../utils/i18n';

const INTERVAL = 4000; // une publicité défile toutes les 4 secondes
const isSafeLink = (u) => typeof u === 'string' && (u.startsWith('https://') || (u.startsWith('/') && !u.startsWith('//')));
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Bandeau de publicités rectangulaires (8:3). Source : l'administration ; à défaut, public/Images/pubs/pubs.json.
 * Aucune publicité → aucune section.
 */
export default function AdsCarousel() {
  const { lang } = useLang();
  const tl = makeTl(lang);
  const { ads: remote } = useContent();
  const [local, setLocal] = useState([]);
  const [pv, setPv] = useState(() => (window.innerWidth >= 900 ? 2 : 1));
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.25 });
  const [touch, setTouch] = useState(null);

  useEffect(() => {
    if (remote.length) return undefined;
    let alive = true;
    fetch('/Images/pubs/pubs.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (!alive || !Array.isArray(list)) return;
        setLocal(
          list
            .filter((x) => x && typeof x.img === 'string' && x.img.startsWith('/'))
            .slice(0, 12)
            .map((x, i) => ({ id: `local-${i}`, img: x.img, link: x.link, alt: x.alt }))
        );
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [remote.length]);

  useEffect(() => {
    const onResize = () => setPv(window.innerWidth >= 900 ? 2 : 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const ads = remote.length ? remote : local;
  const n = ads.length;
  const canSlide = n > pv;
  const slides = canSlide ? [...ads, ...ads.slice(0, pv)] : ads; // doublon de fin : boucle sans à-coup
  const play = canSlide && inView && !paused && !reducedMotion();

  useEffect(() => {
    setIdx(0);
    setAnim(true);
  }, [n, pv]);

  useEffect(() => {
    if (!play || idx >= n) return undefined;
    const t = setTimeout(() => setIdx((i) => i + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [play, idx, n]);

  // Arrivée sur le doublon : retour discret au début, sans animation.
  useEffect(() => {
    if (!canSlide || idx < n) return undefined;
    const t = setTimeout(() => {
      setAnim(false);
      setIdx(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }, 850);
    return () => clearTimeout(t);
  }, [idx, n, canSlide]);

  const active = n ? idx % n : 0;

  const onUp = (e) => {
    setPaused(false);
    if (touch === null) return;
    const dx = e.clientX - touch;
    setTouch(null);
    if (Math.abs(dx) < 50 || !canSlide) return;
    setIdx((i) => (dx < 0 ? Math.min(i + 1, n) : Math.max(i - 1, 0)));
  };

  return (
    <div ref={ref}>
      {n > 0 && (
        <section className="ads" role="region" aria-roledescription="carousel" aria-label={tl('Publicités', 'Advertisements', 'Publicidad', 'Werbung', '广告')}>
          <div className="container">
            <div className="ads__label">
              <span className="eyebrow">{tl('Publicité', 'Advertisement', 'Publicidad', 'Werbung', '广告')}</span>
            </div>
            <div
              className="ads__view"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
              onPointerDown={(e) => {
                setPaused(true);
                setTouch(e.clientX);
              }}
              onPointerUp={onUp}
              onPointerCancel={() => {
                setPaused(false);
                setTouch(null);
              }}
            >
              <div className={`ads__track${anim ? ' anim' : ''}`} style={{ '--pv': pv, transform: `translateX(-${(idx * 100) / pv}%)` }}>
                {slides.map((ad, i) => {
                  const img = <img src={ad.img} alt={pick(ad.alt, lang) || ''} loading="lazy" decoding="async" draggable={false} />;
                  return (
                    <div className="ads__slide" key={`${ad.id}-${i}`} aria-hidden={i >= n}>
                      {isSafeLink(ad.link) ? (
                        <a className="ads__card" href={ad.link} target="_blank" rel="noopener noreferrer sponsored" tabIndex={i >= n ? -1 : 0}>
                          {img}
                        </a>
                      ) : (
                        <div className="ads__card">{img}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {canSlide && (
              <div className="ads__bar" style={{ '--dur': `${INTERVAL}ms`, '--play': play ? 'running' : 'paused' }}>
                {ads.map((ad, i) => (
                  <button key={`${ad.id}-${i}`} type="button" className={i === active ? 'is-on' : ''} aria-label={`${i + 1} / ${n}`} onClick={() => { setAnim(true); setIdx(i); }} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
