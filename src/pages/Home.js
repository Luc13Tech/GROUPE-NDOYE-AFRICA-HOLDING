import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { SITE, STATS, SERVICES, PARTNERS_WORLD, COMPANIES, YAYE_SLIDES, VILLA_TYPES, TAGLINE, SUBTITLE } from '../data/siteData';

function useW() {
  const [w, sw] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => sw(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

/* ── Gold Particle Canvas ─────────────────────────────────────── */
function GoldCanvas({ density = 55, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: density }, () => ({
      x: Math.random() * cv.width, y: Math.random() * cv.height,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      a: Math.random(), da: (Math.random() - .5) * .007,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.da;
        if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0;
        if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0;
        if (p.a < .05 || p.a > .95) p.da *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.a * .65})`; ctx.fill();
      });
      pts.forEach((p, i) => pts.slice(i + 1, i + 5).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 90) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 90) * .1})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [density]);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }} />;
}

/* ── Animated Counter ─────────────────────────────────────────── */
function Counter({ target, duration = 2200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const num = parseInt((target + '').replace(/\D/g, '')) || 0;
        const t0 = performance.now();
        const tick = now => {
          const p = Math.min((now - t0) / duration, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * num));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  const suffix = (target + '').replace(/[0-9]/g, '');
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Scroll FadeIn ────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t = { up: 'translateY(30px)', down: 'translateY(-30px)', left: 'translateX(-30px)', right: 'translateX(30px)' };
  return (
    <div ref={ref} style={{ transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, opacity: vis ? 1 : 0, transform: vis ? 'none' : (t[dir] || t.up), ...style }}>
      {children}
    </div>
  );
}

/* ── Service icons ────────────────────────────────────────────── */
const SVC_ICONS = {
  building: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/></svg>,
  layers: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>,
  chart: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  road: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l4 16M20 4l-4 16M4 4h16"/></svg>,
  leaf: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 19.34c-.42.65.35 1.4 1 1s.88-.5 2.18-1.34C10 17 13 15 15 12"/></svg>,
  zap: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>,
};

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
const HERO_UNSPLASH = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=90',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90',
];

function HeroSection3D({ lang, waUrl, tl, isMob, slide, setSlide, timerRef }) {
  const [loaded, setLoaded] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const nl = obj => obj[lang] || obj.fr;

  useEffect(() => {
    const initial = {};
    HERO_UNSPLASH.forEach((url, i) => { initial[i] = url; });
    setLoaded(initial);

    YAYE_SLIDES.forEach((s, i) => {
      const img = new Image();
      img.onload = () => setLoaded(p => ({ ...p, [i]: s.img }));
      img.src = s.img;
    });
  }, []);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const layers = [
      Array.from({ length: 35 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.5, speed: 0.15, depth: 0.3 })),
      Array.from({ length: 25 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 1, speed: 0.25, depth: 0.6 })),
      Array.from({ length: 15 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1 + 1.5, speed: 0.4, depth: 1.0 })),
    ];

    let mx = 0.5, my = 0.5;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      time += 0.008;

      layers.forEach((layer, li) => {
        layer.forEach(p => {
          const px = (p.x * cv.width) + Math.sin(time * p.speed + p.x * 6) * 25 * p.depth + (mx - 0.5) * 40 * p.depth;
          const py = (p.y * cv.height) + Math.cos(time * p.speed + p.y * 6) * 18 * p.depth + (my - 0.5) * 30 * p.depth;
          const alpha = (0.15 + li * 0.15 + Math.sin(time * 2 + p.x * 10) * 0.1);
          const grd = ctx.createRadialGradient(px, py, 0, px, py, p.r * 3);
          grd.addColorStop(0, `rgba(232,201,106,${alpha})`);
          grd.addColorStop(0.5, `rgba(201,168,76,${alpha * 0.6})`);
          grd.addColorStop(1, 'rgba(201,168,76,0)');
          ctx.beginPath(); ctx.arc(px, py, p.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
          ctx.beginPath(); ctx.arc(px, py, p.r * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,240,180,${alpha * 1.5})`; ctx.fill();
        });
        if (li === 1) {
          layer.forEach((p, pi) => {
            const px = (p.x * cv.width) + Math.sin(time * p.speed + p.x * 6) * 25 * p.depth + (mx - 0.5) * 40 * p.depth;
            const py = (p.y * cv.height) + Math.cos(time * p.speed + p.y * 6) * 18 * p.depth + (my - 0.5) * 30 * p.depth;
            layer.slice(pi + 1, pi + 3).forEach(q => {
              const qx = (q.x * cv.width) + Math.sin(time * q.speed + q.x * 6) * 25 * q.depth + (mx - 0.5) * 40 * q.depth;
              const qy = (q.y * cv.height) + Math.cos(time * q.speed + q.y * 6) * 18 * q.depth + (my - 0.5) * 30 * q.depth;
              const d = Math.hypot(px - qx, py - qy);
              if (d < 110) {
                ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy);
                ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 110) * 0.12})`; ctx.lineWidth = 0.8; ctx.stroke();
              }
            });
          });
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onMove = e => {
      const rect = cv.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); };
  }, []);

  const handleMouseMove = e => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
    });
  };

  const goldGrad = 'linear-gradient(135deg,#c9a84c,#e8c96a,#8b6914)';

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove}
      style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', cursor: 'default' }}>

      {YAYE_SLIDES.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: '-3%',
          backgroundImage: `url(${loaded[i] || HERO_UNSPLASH[i]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: i === slide ? 1 : 0,
          transform: `scale(1.06) translate(${i === slide ? mousePos.x * 0.3 : 0}px, ${i === slide ? mousePos.y * 0.3 : 0}px)`,
          transition: i === slide
            ? 'opacity 1.4s cubic-bezier(.4,0,.2,1), transform 0.1s ease'
            : 'opacity 1.4s cubic-bezier(.4,0,.2,1)',
          willChange: 'transform, opacity',
        }} />
      ))}

      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(105deg, rgba(5,8,16,.92) 0%, rgba(5,8,16,.65) 45%, rgba(5,8,16,.82) 100%)',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1,
        background: 'linear-gradient(to top, rgba(5,8,16,.9) 0%, transparent 100%)',
      }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(5,8,16,.5) 0%, transparent 100%)',
      }} />

      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute', zIndex: 2, pointerEvents: 'none',
        right: isMob ? '-8%' : '4%', top: '50%',
        width: isMob ? 220 : 380, height: isMob ? 220 : 380,
        transform: `translateY(-50%) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.3}deg)`,
        transition: 'transform 0.15s ease',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(201,168,76,.12)', animation: 'spinSlow 30s linear infinite' }}>
          <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: goldGrad, boxShadow: '0 0 20px rgba(201,168,76,.9), 0 0 40px rgba(201,168,76,.4)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 38, borderRadius: '50%', border: '1px solid rgba(201,168,76,.22)', animation: 'spinSlow 20s linear infinite reverse' }}>
          <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: 'rgba(201,168,76,.8)', boxShadow: '0 0 12px rgba(201,168,76,.8)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 76, borderRadius: '50%', border: '1px solid rgba(201,168,76,.38)', animation: 'spinSlow 14s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 114, borderRadius: '50%', background: 'rgba(201,168,76,.04)', border: '1px solid rgba(201,168,76,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: isMob ? '.38rem' : '.5rem', letterSpacing: '.22em', color: 'rgba(201,168,76,.7)', textTransform: 'uppercase', textAlign: 'center' }}>GNAH</div>
        </div>
      </div>

      <div style={{ position: 'absolute', right: isMob ? 16 : 32, top: '50%', transform: 'translateY(-50%)', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        {YAYE_SLIDES.map((_, i) => (
          <button key={i} onClick={() => { setSlide(i); clearInterval(timerRef.current); timerRef.current = setInterval(() => setSlide(s => (s + 1) % YAYE_SLIDES.length), 5500); }}
            style={{ width: i === slide ? 3 : 2, height: i === slide ? 32 : 16, borderRadius: 2, border: 'none', cursor: 'pointer', transition: 'all .4s', background: i === slide ? 'var(--gold)' : 'rgba(201,168,76,.3)', padding: 0, boxShadow: i === slide ? '0 0 12px rgba(201,168,76,.6)' : 'none' }} />
        ))}
      </div>

      <div className="container" style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: `0 clamp(16px,5vw,56px)`,
        transform: `translate(${mousePos.x * 0.08}px, ${mousePos.y * 0.05}px)`,
        transition: 'transform 0.2s ease',
      }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid rgba(201,168,76,.28)', background: 'rgba(201,168,76,.06)', backdropFilter: 'blur(12px)', marginBottom: 22, width: 'fit-content', animation: 'fadeInUp .5s ease both' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'var(--f-display)', fontSize: '.52rem', letterSpacing: '.26em', color: 'rgba(201,168,76,.85)', textTransform: 'uppercase' }}>
            {YAYE_SLIDES[slide][lang]?.tag || YAYE_SLIDES[slide].fr.tag}
          </span>
        </div>

        <h1 key={`title-${slide}`} style={{
          fontFamily: 'var(--f-elegant)',
          fontSize: 'clamp(2.4rem,5.5vw,5.2rem)',
          color: 'var(--cream)',
          lineHeight: 1.08,
          letterSpacing: '.01em',
          marginBottom: 14,
          maxWidth: 820,
          textShadow: '0 4px 32px rgba(0,0,0,.4)',
          animation: 'heroSlideIn .7s cubic-bezier(.22,1,.36,1) both',
        }}>
          {YAYE_SLIDES[slide][lang]?.title || YAYE_SLIDES[slide].fr.title}
        </h1>

        <p key={`sub-${slide}`} style={{
          fontFamily: 'var(--f-serif)', fontStyle: 'italic',
          fontSize: 'clamp(.9rem,1.6vw,1.18rem)',
          color: 'rgba(245,240,232,.52)',
          marginBottom: 12,
          animation: 'heroSlideIn .8s cubic-bezier(.22,1,.36,1) .08s both',
        }}>
          {YAYE_SLIDES[slide][lang]?.sub || YAYE_SLIDES[slide].fr.sub}
        </p>

        <div style={{ marginBottom: 38, animation: 'heroSlideIn .85s cubic-bezier(.22,1,.36,1) .14s both' }}>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: '.68rem', letterSpacing: '.22em', textTransform: 'uppercase', background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {nl(TAGLINE)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'heroSlideIn .9s cubic-bezier(.22,1,.36,1) .2s both' }}>
          <Link to="/projets" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 'clamp(13px,2vw,16px) clamp(24px,3vw,36px)', background: goldGrad, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.66rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 8px 36px rgba(201,168,76,.5)', transition: 'all .3s', backdropFilter: 'blur(4px)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(201,168,76,.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 36px rgba(201,168,76,.5)'; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            {tl('Découvrir nos Projets','Discover our Projects','Ver nuestros Proyectos','Unsere Projekte','探索我们的项目')}
          </Link>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 'clamp(13px,2vw,16px) clamp(24px,3vw,36px)', background: 'rgba(5,8,16,.4)', border: '1px solid rgba(201,168,76,.42)', color: 'var(--cream)', fontFamily: 'var(--f-display)', fontSize: '.66rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', backdropFilter: 'blur(12px)', transition: 'all .3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.15)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.8)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(5,8,16,.4)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.42)'; e.currentTarget.style.transform = ''; }}>
            {tl('Nous écrire','Message us','Escríbanos','Schreiben Sie uns','发消息')}
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 48, animation: 'fadeInUp 1s ease .3s both' }}>
          {YAYE_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); clearInterval(timerRef.current); timerRef.current = setInterval(() => setSlide(s => (s + 1) % YAYE_SLIDES.length), 5500); }}
              style={{ height: 3, width: i === slide ? 36 : 12, borderRadius: 2, border: 'none', cursor: 'pointer', transition: 'all .5s cubic-bezier(.4,0,.2,1)', background: i === slide ? 'var(--gold)' : 'rgba(201,168,76,.25)', padding: 0, boxShadow: i === slide ? '0 0 10px rgba(201,168,76,.6)' : 'none' }} />
          ))}
          <span style={{ fontFamily: 'var(--f-display)', fontSize: '.48rem', letterSpacing: '.16em', color: 'rgba(201,168,76,.4)', textTransform: 'uppercase', marginLeft: 4 }}>
            0{slide + 1} / 0{YAYE_SLIDES.length}
          </span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'floatY 3s ease-in-out infinite' }}>
        <span style={{ fontFamily: 'var(--f-display)', fontSize: '.46rem', letterSpacing: '.24em', color: 'rgba(201,168,76,.4)', textTransform: 'uppercase' }}>
          {tl('Défiler','Scroll','Deslizar','Scrollen','滑动')}
        </span>
        <div style={{ width: 20, height: 32, border: '1.5px solid rgba(201,168,76,.35)', borderRadius: 10, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 3, height: 8, borderRadius: 2, background: 'var(--gold)', animation: 'scrollDot 1.8s ease-in-out infinite' }} />
        </div>
      </div>

    </section>
  );
}

export default function Home() {
  const { lang } = useLang();
  const w = useW();
  const isMob = w < 768;
  const [slide, setSlide] = useState(0);
  const [slideLoaded, setSlideLoaded] = useState({});
  const [activePart, setActivePart] = useState(0);
  const [activeVilla, setActiveVilla] = useState(0);
  const timerRef = useRef(null);

  const tl = (fr, en, es, de, zh = '') => {
    const val = { fr, en, es, de, zh }[lang];
    return (val !== undefined && val !== '') ? val : fr;
  };
  const nl = obj => obj[lang] || obj.fr;

  const wm = typeof SITE.waMsg === 'object' ? (SITE.waMsg[lang] || SITE.waMsg.fr) : SITE.waMsg;
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`;
  const goldGrad = 'linear-gradient(135deg,#c9a84c,#e8c96a,#8b6914)';

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % YAYE_SLIDES.length), 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const SLIDE_FALLBACKS = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=85',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=85',
  ];

  useEffect(() => {
    YAYE_SLIDES.forEach((s, i) => {
      const tryLoad = (src, onFail) => {
        const img = new Image();
        img.onload = () => setSlideLoaded(p => ({ ...p, [i]: src }));
        img.onerror = onFail;
        img.src = src;
      };
      tryLoad(s.img, () => {
        tryLoad(SLIDE_FALLBACKS[i], () => {
          setSlideLoaded(p => ({ ...p, [i]: SLIDE_FALLBACKS[i] }));
        });
      });
    });
  }, []);

  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ══ SECTION 1 — HERO 3D PREMIUM ═══════════════════════════════ */}
      <HeroSection3D lang={lang} waUrl={waUrl} tl={tl} isMob={isMob} slide={slide} setSlide={setSlide} timerRef={timerRef} />

      {/* ══ SECTION 2 — STATS ANIMÉES ═════════════════════════════════ */}
      <section style={{ position: 'relative', background: 'var(--navy2)', padding: 'clamp(48px,6vw,72px) 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,.07) 0%, transparent 70%)' }} />
        <GoldCanvas density={20} style={{ opacity: .5 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMob ? 2 : 4}, 1fr)`, gap: 'clamp(16px,3vw,32px)' }}>
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} dir="up">
                <div style={{ textAlign: 'center', padding: 'clamp(20px,3vw,36px) 12px', position: 'relative' }}>
                  <div style={{ width: 1, height: 20, background: 'linear-gradient(to bottom, var(--gold), transparent)', margin: '0 auto 16px' }} />
                  <div style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(2rem,4vw,3rem)', background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: 8, filter: 'drop-shadow(0 0 16px rgba(201,168,76,.4))' }}>
                    <Counter target={s.val} />
                  </div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.14em', color: 'rgba(200,195,186,.48)', textTransform: 'uppercase' }}>
                    {s[lang] || s.fr}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — QUI SOMMES-NOUS ════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ display: 'grid', gridTemplateColumns: isMob ? '1fr' : '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'center' }}>
          <FadeIn dir="left">
            <div style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
              {tl('Qui sommes-nous', 'Who we are', 'Quiénes somos', 'Wer wir sind', '我们是谁')}
            </div>
            <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)', lineHeight: 1.2, marginBottom: 20 }}>
              African Development<br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Company</span>
            </h2>
            <div style={{ width: 48, height: 2, background: goldGrad, marginBottom: 24 }} />
            <p style={{ fontSize: 'clamp(.84rem,1.2vw,.95rem)', color: 'rgba(200,195,186,.62)', lineHeight: 1.9, marginBottom: 28 }}>
              {nl({ fr: "Depuis 2015, G.N.A.H structure des projets d'envergure en Afrique — immobilier, infrastructure, agriculture, énergie renouvelable. Une équipe de spécialistes, ingénieurs et architectes au service d'une vision continentale.", en: "Since 2015, G.N.A.H structures large-scale projects across Africa — real estate, infrastructure, agriculture, renewable energy. A team of specialists, engineers and architects serving a continental vision.", es: "Desde 2015, G.N.A.H estructura proyectos de gran envergadura en África — inmobiliaria, infraestructura, agricultura, energía renovable.", de: "Seit 2015 strukturiert G.N.A.H umfangreiche Projekte in Afrika — Immobilien, Infrastruktur, Landwirtschaft, erneuerbare Energien.", zh: "自2015年以来，G.N.A.H在非洲构建大型项目——房地产、基础设施、农业、可再生能源。专家、工程师和建筑师团队服务于大陆愿景。" })}
            </p>
            <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
              {[{ val: '10+', fr: "Ans d'expérience", en: 'Years', zh: '年' }, { val: '11', fr: 'Pays africains', en: 'African countries', zh: '非洲国家' }, { val: '$6Mrd', fr: 'Capacité max', en: 'Max capacity', zh: '最大投资' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.2rem,2vw,1.6rem)', background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: '.5rem', letterSpacing: '.12em', color: 'rgba(200,195,186,.4)', textTransform: 'uppercase', marginTop: 2 }}>{s[lang] || s.fr}</div>
                </div>
              ))}
            </div>
            <Link to="/a-propos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 26px', background: goldGrad, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity .3s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              {tl('En savoir plus', 'Learn more', 'Saber más', 'Mehr erfahren', '了解更多')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </FadeIn>
          <FadeIn dir="right">
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={slideLoaded[0] || YAYE_SLIDES[0].img}
                  alt="GNAH"
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'transform .6s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                  onError={e => { 
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85';
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,8,16,.5) 0%, transparent 50%)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -24, left: isMob ? 12 : -24, padding: '14px 20px', background: 'var(--navy2)', border: '1px solid rgba(201,168,76,.3)', boxShadow: '0 16px 48px rgba(0,0,0,.5)', animation: 'floatY 4s ease-in-out infinite' }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: '.48rem', letterSpacing: '.18em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 3 }}>
                  {tl('Depuis', 'Since', 'Desde', 'Seit', '自')} 2015
                </div>
                <div style={{ fontFamily: 'var(--f-elegant)', fontSize: '1.3rem', color: 'var(--cream)', lineHeight: 1 }}>
                  {tl("10 ans d'excellence", '10 years', '10 años', '10 Jahre', '10年卓越')}
                </div>
              </div>
              <div style={{ position: 'absolute', top: -8, right: -8, width: 36, height: 36, border: '2px solid var(--gold)', borderLeft: 'none', borderBottom: 'none' }} />
              <div style={{ position: 'absolute', bottom: -8, right: -8, width: 36, height: 36, border: '2px solid var(--gold)', borderTop: 'none', borderLeft: 'none' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ SECTION 4 — VILLAS ═══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,.05) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(201,168,76,.04) 0%, transparent 50%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
                {tl('Résidence Yaye Dia', 'Yaye Dia Residence', 'Residencia Yaye Dia', 'Yaye Dia Residenz', 'Yaye Dia住宅')}
              </div>
              <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)', marginBottom: 10 }}>
                {tl('300 Villas', '300 Villas', '300 Villas', '300 Villen', '300栋')}{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {tl('Haut Standing', 'High-End', 'Alto Standing', 'Hochwertig', '高档别墅')}
                </span>
              </h2>
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', color: 'rgba(200,195,186,.45)', fontSize: 'clamp(.84rem,1.2vw,.95rem)' }}>
                {tl('Région de Thiès — Sénégal', 'Thiès Region — Senegal', 'Región de Thiès — Senegal', 'Thiès-Region — Senegal', '塞内加尔蒂耶斯地区')}
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {VILLA_TYPES.map((v, i) => (
              <button key={i} onClick={() => setActiveVilla(i)} style={{ padding: '8px 18px', border: `1px solid ${i === activeVilla ? v.color : 'rgba(201,168,76,.15)'}`, background: i === activeVilla ? `${v.color}18` : 'transparent', color: i === activeVilla ? v.color : 'rgba(200,195,186,.45)', fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s' }}>
                {v.id.toUpperCase()}
              </button>
            ))}
          </div>

          {VILLA_TYPES.map((v, i) => (
            <div key={v.id} style={{ display: i === activeVilla ? 'grid' : 'none', gridTemplateColumns: isMob ? '1fr' : '1fr 1fr', gap: 'clamp(20px,4vw,52px)', alignItems: 'center', animation: 'fadeInUp .5s ease' }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={v.img} alt={(v[lang] || v.fr).name}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'transform .7s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                  onError={e => { e.target.src = `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80`; }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,8,16,.65) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 16, padding: '4px 12px', background: v.color, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.54rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  {v.id.toUpperCase()} — {v.bati}
                </div>
                {v.planImg && (
                  <div style={{ position: 'absolute', bottom: 16, right: 16, width: 80, height: 64, overflow: 'hidden', border: '1px solid rgba(201,168,76,.4)', opacity: .85 }}>
                    <img src={v.planImg} alt="plan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>
              <div>
                <div style={{ color: v.color, fontFamily: 'var(--f-display)', fontSize: '.54rem', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {(v[lang] || v.fr).standing}
                </div>
                <h3 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', color: 'var(--cream)', marginBottom: 14, lineHeight: 1.2 }}>
                  {(v[lang] || v.fr).name}
                </h3>
                <div style={{ display: 'flex', gap: 20, marginBottom: 18 }}>
                  {[{ l: tl('Terrain', 'Plot', 'Terreno', 'Grundstück', '地块'), v: v.surface }, { l: tl('Bâti', 'Built', 'Construido', 'Gebaut', '建筑'), v: v.bati }].map((d, k) => (
                    <div key={k}>
                      <div style={{ fontFamily: 'var(--f-display)', fontSize: '.5rem', letterSpacing: '.14em', color: 'rgba(200,195,186,.4)', textTransform: 'uppercase', marginBottom: 2 }}>{d.l}</div>
                      <div style={{ fontFamily: 'var(--f-elegant)', fontSize: '1.1rem', color: v.color }}>{d.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                  {v.rooms.map((r, ri) => (
                    <div key={ri} style={{ padding: '8px 12px', border: '1px solid rgba(201,168,76,.1)', background: 'rgba(201,168,76,.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', color: 'rgba(200,195,186,.6)', letterSpacing: '.04em' }}>{r[lang] || r.fr}</span>
                      <span style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', color: v.color }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 24 }}>
                  {(v.features[lang] || v.features.fr).map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: v.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '.8rem', color: 'rgba(200,195,186,.6)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to="/projets" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', background: goldGrad, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity .3s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    {tl('Voir le projet', 'View project', 'Ver proyecto', 'Projekt ansehen', '查看项目')}
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', border: `1px solid ${v.color}60`, color: v.color, fontFamily: 'var(--f-display)', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}>
                    {tl('Réserver', 'Reserve', 'Reservar', 'Reservieren', '预订')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 5 — SERVICES ═════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
                {tl('Notre expertise', 'Our expertise', 'Nuestra experiencia', 'Unsere Expertise', '我们的专业知识')}
              </div>
              <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)' }}>
                {tl('Nos ', 'Our ', 'Nuestros ', 'Unsere ', '我们的')}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {tl('Services', 'Services', 'Servicios', 'Leistungen', '服务')}
                </span>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMob ? 1 : w < 1024 ? 2 : 3}, 1fr)`, gap: 'clamp(12px,2vw,20px)' }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} dir="up">
                <div style={{ padding: 'clamp(24px,3vw,36px)', border: '1px solid rgba(201,168,76,.1)', background: 'var(--navy2)', position: 'relative', overflow: 'hidden', transition: 'all .35s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.38)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.35)'; e.currentTarget.querySelector('.svc-line').style.width = '100%'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.1)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.querySelector('.svc-line').style.width = '0'; }}>
                  <div style={{ color: 'var(--gold)', marginBottom: 20 }}>{SVC_ICONS[s.icon] || SVC_ICONS.building}</div>
                  <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '.82rem', color: 'var(--cream)', letterSpacing: '.06em', marginBottom: 10 }}>
                    {nl(s).title}
                  </h3>
                  <p style={{ fontSize: '.79rem', color: 'rgba(200,195,186,.48)', lineHeight: 1.8 }}>
                    {nl(s).desc.slice(0, 110)}...
                  </p>
                  <div className="svc-line" style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: 0, background: goldGrad, transition: 'width .4s ease' }} />
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4} dir="up">
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 28px', border: '1px solid rgba(201,168,76,.3)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.08)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)'; }}>
                {tl('Tous nos services', 'All services', 'Todos los servicios', 'Alle Leistungen', '查看所有服务')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ SECTION 6 — PARTENAIRES ════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,.05) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
                {tl('Réseau mondial', 'Global network', 'Red mundial', 'Weltweites Netzwerk', '全球网络')}
              </div>
              <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)' }}>
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>7 </span>
                {tl('Partenaires dans le Monde', 'Global Partners', 'Socios Mundiales', 'Weltweite Partner', '全球合作伙伴')}
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMob ? 2 : w < 1024 ? 4 : 7}, 1fr)`, gap: 'clamp(8px,1.5vw,14px)', marginBottom: 32 }}>
            {PARTNERS_WORLD.map((p, i) => {
              const flags = { TR: '🇹🇷', CN: '🇨🇳', RU: '🇷🇺', US: '🇺🇸', MY: '🇲🇾', GB: '🇬🇧', IN: '🇮🇳' };
              return (
                <FadeIn key={i} delay={i * 0.06} dir="up">
                  <div style={{ padding: 'clamp(14px,2vw,20px) 10px', border: `1px solid ${i === activePart ? 'rgba(201,168,76,.5)' : 'rgba(201,168,76,.1)'}`, background: i === activePart ? 'rgba(201,168,76,.06)' : 'var(--navy)', cursor: 'pointer', transition: 'all .3s', textAlign: 'center' }}
                    onClick={() => setActivePart(i)}
                    onMouseEnter={e => { if (i !== activePart) { e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)'; e.currentTarget.style.background = 'rgba(201,168,76,.03)'; } }}
                    onMouseLeave={e => { if (i !== activePart) { e.currentTarget.style.borderColor = 'rgba(201,168,76,.1)'; e.currentTarget.style.background = 'var(--navy)'; } }}>
                    <div style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', marginBottom: 6 }}>{flags[p.code] || '🌍'}</div>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: '.54rem', letterSpacing: '.08em', color: i === activePart ? 'var(--gold)' : 'rgba(200,195,186,.5)', textTransform: 'uppercase' }}>
                      {nl(p).country}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn dir="up">
            <div key={activePart} style={{ padding: 'clamp(18px,3vw,28px)', border: '1px solid rgba(201,168,76,.18)', background: 'var(--navy)', borderLeft: '3px solid var(--gold)', animation: 'fadeInUp .4s ease' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.54rem', letterSpacing: '.16em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
                {nl(PARTNERS_WORLD[activePart]).country}
              </div>
              <p style={{ fontSize: '.86rem', color: 'rgba(200,195,186,.62)', lineHeight: 1.8 }}>
                {nl(PARTNERS_WORLD[activePart]).focus}
              </p>
            </div>
          </FadeIn>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/partenaires" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 28px', border: '1px solid rgba(201,168,76,.3)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,.08)'}
              onMouseLeave={e => e.currentTarget.style.background = ''}>
              {tl('Voir tous les partenaires', 'View all partners', 'Ver todos los socios', 'Alle Partner', '查看所有合作伙伴')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — ENTREPRISES ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
                {tl("L'écosystème GNAH", 'The GNAH ecosystem', 'El ecosistema GNAH', 'Das GNAH-Ökosystem', 'GNAH生态系统')}
              </div>
              <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)' }}>
                {tl('Nos ', 'Our ', 'Nuestras ', 'Unsere ', '我们的')}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {tl('Entreprises', 'Companies', 'Empresas', 'Unternehmen', '企业')}
                </span>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMob ? 1 : w < 1100 ? 2 : 3}, 1fr)`, gap: 'clamp(16px,2.5vw,28px)' }}>
            {COMPANIES.filter(c => c.active !== false).map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.1} dir="up">
                <div style={{ border: '1px solid rgba(201,168,76,.1)', background: 'var(--navy2)', overflow: 'hidden', transition: 'all .35s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.4)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.1)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ height: 96, background: 'rgba(5,8,16,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(201,168,76,.08)', padding: 20, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,.06) 0%, transparent 70%)' }} />
                    <img src={c.logo} alt={c.name} style={{ maxHeight: 56, maxWidth: '75%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    <div style={{ display: 'none', position: 'relative', zIndex: 1, alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)', fontSize: '1.3rem', color: 'var(--gold)', letterSpacing: '.1em' }}>
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div style={{ padding: 'clamp(16px,2.5vw,24px)' }}>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: '.54rem', letterSpacing: '.14em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6 }}>
                      {typeof c.sector === 'object' ? (c.sector[lang] || c.sector.fr) : c.sector}
                    </div>
                    <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '.88rem', color: 'var(--cream)', marginBottom: 8, letterSpacing: '.04em' }}>
                      {c.name}
                    </h3>
                    <p style={{ fontSize: '.77rem', color: 'rgba(200,195,186,.48)', lineHeight: 1.75, marginBottom: 14 }}>
                      {((typeof c.desc === 'object' ? (c.desc[lang] || c.desc.fr) : c.desc) || '').slice(0, 95)}...
                    </p>
                    <a href={c.website} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.1em', color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase', transition: 'gap .25s' }}
                      onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                      onMouseLeave={e => e.currentTarget.style.gap = '5px'}>
                      {tl('Visiter', 'Visit', 'Visitar', 'Besuchen', '访问')}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/entreprises" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 28px', border: '1px solid rgba(201,168,76,.3)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,.08)'}
              onMouseLeave={e => e.currentTarget.style.background = ''}>
              {tl('Toutes nos entreprises', 'All companies', 'Todas las empresas', 'Alle Unternehmen', '查看所有企业')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — CTA FINAL ═══════════════════════════════════ */}
      <section style={{ position: 'relative', padding: 'clamp(80px,10vw,128px) 0', overflow: 'hidden', background: 'var(--navy2)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,.1) 0%, transparent 65%)' }} />
        <GoldCanvas density={isMob ? 28 : 52} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeIn dir="up">
            <div style={{ display: 'inline-block', padding: 2, background: goldGrad, marginBottom: 32, animation: 'spinSlow 10s linear infinite' }}>
              <div style={{ background: 'var(--navy2)', padding: '10px 18px', fontFamily: 'var(--f-display)', fontSize: '.48rem', letterSpacing: '.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>G.N.A.H</div>
            </div>
            <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(2rem,5vw,3.8rem)', color: 'var(--cream)', lineHeight: 1.15, marginBottom: 16 }}>
              {tl('Investissons Ensemble', "Let's Invest Together", 'Invirtamos Juntos', 'Gemeinsam Investieren', '共同投资')}
              <br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {tl("dans l'Avenir de l'Afrique", "in Africa's Future", 'en el Futuro de África', "in Afrikas Zukunft", '非洲的未来')}
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 'clamp(.88rem,1.4vw,1.1rem)', color: 'rgba(200,195,186,.48)', maxWidth: 540, margin: '0 auto 44px' }}>
              {nl({ fr: "Projets structurés, partenariats durables, vision continentale.", en: "Structured projects, lasting partnerships, continental vision.", es: "Proyectos estructurados, asociaciones duraderas, visión continental.", de: "Strukturierte Projekte, dauerhafte Partnerschaften, kontinentale Vision.", zh: "结构化项目，持久合作，大陆愿景。" })}
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 'clamp(14px,2vw,17px) clamp(28px,3.5vw,42px)', background: goldGrad, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 8px 40px rgba(201,168,76,.45)', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 52px rgba(201,168,76,.65)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,76,.45)'; }}>
                {tl('Nous contacter', 'Contact us', 'Contáctenos', 'Kontakt', '联系我们')}
              </a>
              <Link to="/investisseurs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 'clamp(14px,2vw,17px) clamp(28px,3.5vw,42px)', background: 'transparent', border: '1px solid rgba(201,168,76,.4)', color: 'var(--cream)', fontFamily: 'var(--f-display)', fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s', backdropFilter: 'blur(4px)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.4)'; }}>
                {tl('Investir', 'Invest', 'Invertir', 'Investieren', '投资')}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
        }
