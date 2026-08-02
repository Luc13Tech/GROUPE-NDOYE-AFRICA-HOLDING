import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { SITE, STATS, SERVICES, PARTNERS_WORLD, COMPANIES, YAYE_SLIDES } from '../data/siteData';

function useW(){const[w,sw]=React.useState(window.innerWidth);React.useEffect(()=>{const h=()=>sw(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return w;}

// ── Gold particle canvas ────────────────────────────────────────────────────
function GoldCanvas({ style, density = 60 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.008,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.da;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        if (p.a < 0.05 || p.a > 0.95) p.da *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.a * 0.7})`;
        ctx.fill();
      });
      // Draw subtle connecting lines
      particles.forEach((p, i) => {
        particles.slice(i + 1, i + 4).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 100) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [density]);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }} />;
}

// ── Animated counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, '')) || 0;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * num));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Intersection fade-in ────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t = { up: 'translateY(36px)', down: 'translateY(-36px)', left: 'translateX(-36px)', right: 'translateX(36px)' };
  return (
    <div ref={ref} style={{
      transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : t[dir],
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Main Home ───────────────────────────────────────────────────────────────
export default function Home() {
  const { lang } = useLang();
  const w = useW();
  const isMob = w < 768;
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState({});
  const [activeVilla, setActiveVilla] = useState(0);
  const [activePart, setActivePart] = useState(0);
  const heroTimerRef = useRef(null);

  const tl = (fr, en, es, de, zh = '') => {
    const val = { fr, en, es, de, zh }[lang];
    return (val !== undefined && val !== '') ? val : fr;
  };

  const nl = (obj) => obj[lang] || obj.fr;

  const HERO_IMGS = [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=85',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85',
  ];

  const VILLA_CARDS = [
    { id:'f3', color:'#f59e0b', img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', fr:{name:'Villa F3 — Économique', feat:'83 m² bâtis • Jardin tropical • Open Space'}, en:{name:'F3 Economy Villa', feat:'83 m² built • Tropical garden • Open Space'}, es:{name:'Villa F3 Económica', feat:'83 m² • Jardín tropical • Open Space'}, de:{name:'F3 Economy Villa', feat:'83 m² gebaut • Tropengarten • Open Space'}, zh:{name:'F3经济型别墅', feat:'83平米 • 热带花园 • 开放空间'} },
    { id:'f4', color:'#34d399', img:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', fr:{name:'Villa F4 Duplex — Haut Standing', feat:'232 m² bâtis • Terrasse 40m² • Panoramique'}, en:{name:'F4 Duplex — High End', feat:'232 m² built • 40m² terrace • Panoramic'}, es:{name:'Villa F4 Dúplex — Alto Standing', feat:'232 m² • Terraza 40m² • Panorámico'}, de:{name:'F4 Duplex — Hochwertig', feat:'232 m² gebaut • 40m² Terrasse • Panorama'}, zh:{name:'F4复式别墅 — 高档', feat:'232平米 • 40平米露台 • 全景'} },
    { id:'f5', color:'#f472b6', img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', fr:{name:'Villa F5 — Très Haut Standing', feat:'340 m² bâtis • Marbre Calacatta • BBQ 66m²'}, en:{name:'F5 Premium Villa', feat:'340 m² built • Calacatta Marble • 66m² BBQ'}, es:{name:'Villa F5 Premium', feat:'340 m² • Mármol Calacatta • BBQ 66m²'}, de:{name:'F5 Premium Villa', feat:'340 m² gebaut • Calacatta-Marmor • 66m² BBQ'}, zh:{name:'F5豪华别墅 — 顶级', feat:'340平米 • 卡拉卡塔大理石 • 66平米BBQ'} },
  ];

  const SVC_ICONS = {
    building: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/><line x1="10" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="14" y2="6"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="10" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="14" y2="14"/></svg>,
    layers: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>,
    chart: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    road: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l4 16M20 4l-4 16M4 4h16M4 20h16"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>,
    leaf: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 19.34c-.42.65.35 1.4 1 1s.88-.5 2.18-1.34C10 17 13 15 15 12M3 3l18 18"/></svg>,
    zap: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>,
  };

  const wm = typeof SITE.waMsg === 'object' ? (SITE.waMsg[lang] || SITE.waMsg.fr) : SITE.waMsg;
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`;

  // Hero auto-advance
  useEffect(() => {
    heroTimerRef.current = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMGS.length), 5500);
    return () => clearInterval(heroTimerRef.current);
  }, []);

  // Preload hero images
  useEffect(() => {
    HERO_IMGS.forEach((src, i) => {
      const img = new Image();
      img.onload = () => setHeroLoaded(p => ({ ...p, [i]: true }));
      img.src = src;
    });
  }, []);

  const goldGrad = 'linear-gradient(135deg,#c9a84c,#e8c96a,#8b6914)';

  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════
          SECTION 1 — HERO 3D
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background slides */}
        {HERO_IMGS.map((img, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: heroLoaded[i] ? `url(${img})` : undefined,
            background: heroLoaded[i] ? undefined : 'linear-gradient(135deg,#050810,#0d1427)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === heroIdx ? 1 : 0,
            transition: 'opacity 1.2s ease',
            transform: i === heroIdx ? 'scale(1.03)' : 'scale(1)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '1.2s, 8s',
          }} />
        ))}

        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(5,8,16,.82) 0%,rgba(5,8,16,.65) 50%,rgba(5,8,16,.88) 100%)', zIndex: 1 }} />

        {/* Gold particles */}
        <GoldCanvas style={{ zIndex: 2 }} density={isMob ? 35 : 70} />

        {/* Animated geometric accent */}
        <div style={{
          position: 'absolute', top: '50%', right: isMob ? '5%' : '8%',
          transform: 'translateY(-50%)',
          width: isMob ? 160 : 280, height: isMob ? 160 : 280,
          border: '1px solid rgba(201,168,76,.15)',
          borderRadius: '50%', zIndex: 2,
          animation: 'spinSlow 20s linear infinite',
        }}>
          <div style={{
            position: 'absolute', inset: 20,
            border: '1px solid rgba(201,168,76,.25)',
            borderRadius: '50%',
            animation: 'spinSlow 12s linear infinite reverse',
          }}>
            <div style={{
              position: 'absolute', inset: 20,
              border: '1px solid rgba(201,168,76,.4)',
              borderRadius: '50%',
            }} />
          </div>
          {/* Orbit dot */}
          <div style={{
            position: 'absolute', top: '50%', left: -6,
            width: 12, height: 12,
            background: goldGrad,
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 16px rgba(201,168,76,.8)',
          }} />
        </div>

        {/* Hero content */}
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 clamp(16px,4vw,40px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '6px 16px', border: '1px solid rgba(201,168,76,.35)', background: 'rgba(201,168,76,.06)', backdropFilter: 'blur(8px)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.22em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              {tl('Groupe Ndoye Africa Holding', 'Groupe Ndoye Africa Holding', 'Groupe Ndoye Africa Holding', 'Groupe Ndoye Africa Holding', 'Groupe Ndoye Africa Holding')}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--f-elegant)',
            fontSize: 'clamp(2.4rem,6vw,5rem)',
            color: 'var(--cream)',
            lineHeight: 1.1,
            letterSpacing: '.02em',
            marginBottom: 16,
            textShadow: '0 2px 40px rgba(0,0,0,.5)',
          }}>
            {tl("Bâtir l'Afrique", "Building tomorrow's", "Construyendo el África", "Das Afrika von morgen", "建设明日")}
            <br />
            <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {tl('de demain', 'Africa', 'del mañana', 'bauen', '非洲')}
            </span>
          </h1>

          <p style={{
            fontFamily: 'var(--f-serif)', fontStyle: 'italic',
            fontSize: 'clamp(.9rem,1.8vw,1.2rem)',
            color: 'rgba(245,240,232,.6)',
            marginBottom: 36, maxWidth: 560, margin: '0 auto 36px',
          }}>
            {tl("L'immobilier au vrai sens du mot", "Real estate in the truest sense", "Bienes raíces en el verdadero sentido", "Immobilien im wahrsten Sinne", "真正意义上的房地产")}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projets" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: 'clamp(12px,2vw,14px) clamp(24px,3vw,32px)',
              background: goldGrad,
              color: '#050810', fontFamily: 'var(--f-display)',
              fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all .3s',
              boxShadow: '0 8px 32px rgba(201,168,76,.4)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,168,76,.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,.4)'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
              {tl('Découvrir nos Projets', 'Discover our Projects', 'Descubrir Proyectos', 'Unsere Projekte', '探索我们的项目')}
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: 'clamp(12px,2vw,14px) clamp(24px,3vw,32px)',
              background: 'transparent', border: '1px solid rgba(201,168,76,.45)',
              color: 'var(--cream)', fontFamily: 'var(--f-display)',
              fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all .3s', backdropFilter: 'blur(4px)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.8)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.45)'; }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {tl('Nous écrire', 'Message us', 'Escríbanos', 'Schreiben Sie uns', '发消息')}
            </a>
          </div>

          {/* Hero slide dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 40 }}>
            {HERO_IMGS.map((_, i) => (
              <button key={i} onClick={() => { setHeroIdx(i); clearInterval(heroTimerRef.current); }}
                style={{ width: i === heroIdx ? 24 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all .3s', background: i === heroIdx ? 'var(--gold)' : 'rgba(201,168,76,.3)', padding: 0 }} />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'floatY 2.5s ease-in-out infinite' }}>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: '.5rem', letterSpacing: '.2em', color: 'rgba(201,168,76,.5)', textTransform: 'uppercase' }}>
            {tl('Défiler', 'Scroll', 'Deslizar', 'Scrollen', '滑动')}
          </span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(201,168,76,.6), transparent)' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — STATS ANIMÉES
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: 'clamp(48px,6vw,72px) 0', background: 'var(--navy2)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,.06) 0%, transparent 70%)' }} />
        <GoldCanvas style={{ opacity: .4 }} density={25} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMob ? 2 : 4}, 1fr)`, gap: 'clamp(16px,3vw,32px)' }}>
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} dir="up">
                <div style={{ textAlign: 'center', padding: 'clamp(20px,3vw,32px) 12px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: 24, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
                  <div style={{
                    fontFamily: 'var(--f-elegant)',
                    fontSize: 'clamp(2rem,4vw,3.2rem)',
                    background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1, marginBottom: 8, marginTop: 16,
                    filter: 'drop-shadow(0 0 20px rgba(201,168,76,.4))',
                  }}>
                    <Counter target={s.val} suffix={s.val.includes('+') ? '+' : ''} />
                  </div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: '.6rem', letterSpacing: '.14em', color: 'rgba(200,195,186,.5)', textTransform: 'uppercase' }}>
                    {nl(s)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — QUI SOMMES-NOUS
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ display: 'grid', gridTemplateColumns: isMob ? '1fr' : '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
          <FadeIn dir="left">
            <div style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
              {tl('Qui sommes-nous', 'Who we are', 'Quiénes somos', 'Wer wir sind', '我们是谁')}
            </div>
            <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)', lineHeight: 1.2, marginBottom: 20 }}>
              African Development<br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Company</span>
            </h2>
            <div style={{ width: 48, height: 2, background: goldGrad, marginBottom: 24 }} />
            <p style={{ color: 'rgba(200,195,186,.65)', lineHeight: 1.9, fontSize: 'clamp(.84rem,1.2vw,.95rem)', marginBottom: 24 }}>
              {nl({ fr: "Depuis 2015, G.N.A.H structure des projets d'envergure en Afrique — immobilier, infrastructure, agriculture, énergie renouvelable. Une vision : bâtir le continent avec excellence et durabilité.", en: "Since 2015, G.N.A.H structures large-scale projects across Africa — real estate, infrastructure, agriculture, renewable energy. One vision: building the continent with excellence and sustainability.", es: "Desde 2015, G.N.A.H estructura proyectos de gran envergadura en África — inmobiliaria, infraestructura, agricultura, energía renovable.", de: "Seit 2015 strukturiert G.N.A.H umfangreiche Projekte in Afrika — Immobilien, Infrastruktur, Landwirtschaft, erneuerbare Energien.", zh: "自2015年以来，G.N.A.H在非洲构建大型项目——房地产、基础设施、农业、可再生能源。愿景：以卓越和可持续性建设非洲大陆。" })}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/a-propos" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', background: goldGrad, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity .3s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                {tl('En savoir plus', 'Learn more', 'Saber más', 'Mehr erfahren', '了解更多')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </FadeIn>
          <FadeIn dir="right">
            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--navy2)' }}>
                <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85" alt="GNAH"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              {/* Floating badge */}
              <div style={{ position: 'absolute', bottom: -20, left: -20, padding: '16px 20px', background: 'var(--navy2)', border: '1px solid rgba(201,168,76,.3)', boxShadow: '0 16px 48px rgba(0,0,0,.4)', animation: 'floatY 4s ease-in-out infinite' }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: '.5rem', letterSpacing: '.18em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 4 }}>
                  {tl("Depuis", "Since", "Desde", "Seit", "自")} 2015
                </div>
                <div style={{ fontFamily: 'var(--f-elegant)', fontSize: '1.4rem', color: 'var(--cream)', lineHeight: 1 }}>
                  {tl("10 ans d'excellence", "10 years", "10 años", "10 Jahre", "10年卓越")}
                </div>
              </div>
              {/* Gold accent corner */}
              <div style={{ position: 'absolute', top: -8, right: -8, width: 40, height: 40, border: '2px solid var(--gold)', borderLeft: 'none', borderBottom: 'none' }} />
              <div style={{ position: 'absolute', bottom: -8, right: -8, width: 40, height: 40, border: '2px solid var(--gold)', borderTop: 'none', borderLeft: 'none' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — VILLAS CAROUSEL 3D
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(201,168,76,.05) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(201,168,76,.04) 0%, transparent 50%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
                {tl('Résidence Yaye Dia', 'Yaye Dia Residence', 'Residencia Yaye Dia', 'Yaye Dia Residenz', 'Yaye Dia住宅')}
              </div>
              <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)', marginBottom: 12 }}>
                {tl('300 Villas', '300 Villas', '300 Villas', '300 Villen', '300栋')}{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {tl('Haut Standing', 'High-End', 'Alto Standing', 'Hochwertig', '高档别墅')}
                </span>
              </h2>
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', color: 'rgba(200,195,186,.5)', fontSize: 'clamp(.84rem,1.2vw,.95rem)' }}>
                {tl('Région de Thiès, Sénégal', 'Thiès Region, Senegal', 'Región de Thiès, Senegal', 'Thiès-Region, Senegal', '塞内加尔蒂耶斯地区')}
              </p>
            </div>
          </FadeIn>

          {/* Villa tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {VILLA_CARDS.map((v, i) => (
              <button key={i} onClick={() => setActiveVilla(i)} style={{
                padding: '8px 20px', border: `1px solid ${i === activeVilla ? v.color : 'rgba(201,168,76,.2)'}`,
                background: i === activeVilla ? `${v.color}18` : 'transparent',
                color: i === activeVilla ? v.color : 'rgba(200,195,186,.5)',
                fontFamily: 'var(--f-display)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all .3s',
              }}>
                {nl(v).name.split(' — ')[0]}
              </button>
            ))}
          </div>

          {/* Villa showcase */}
          {VILLA_CARDS.map((v, i) => (
            <div key={i} style={{
              display: i === activeVilla ? 'grid' : 'none',
              gridTemplateColumns: isMob ? '1fr' : '1fr 1fr',
              gap: 'clamp(20px,4vw,48px)',
              alignItems: 'center',
              animation: 'fadeInUp .5s ease',
            }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '4/3', background: 'var(--navy)', position: 'relative' }}>
                  <img src={v.img} alt={nl(v).name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,8,16,.6) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, padding: '4px 12px', background: v.color, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {v.id.toUpperCase()}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ color: v.color, fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 12 }}>
                  {tl('Villa de standing', 'Prestige villa', 'Villa de lujo', 'Prestige-Villa', '豪华别墅')}
                </div>
                <h3 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--cream)', marginBottom: 16, lineHeight: 1.2 }}>
                  {nl(v).name}
                </h3>
                <div style={{ padding: '12px 16px', border: `1px solid ${v.color}30`, background: `${v.color}08`, marginBottom: 20 }}>
                  <p style={{ fontFamily: 'var(--f-display)', fontSize: '.68rem', color: 'rgba(200,195,186,.7)', letterSpacing: '.06em' }}>
                    {nl(v).feat}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to="/projets" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', background: goldGrad, color: '#050810', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    {tl('Voir la villa', 'View villa', 'Ver villa', 'Villa ansehen', '查看别墅')}
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', border: `1px solid ${v.color}60`, color: v.color, fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', background: 'transparent', transition: 'all .3s' }}>
                    {tl('Réserver', 'Reserve', 'Reservar', 'Reservieren', '预订')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — SERVICES
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
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
                <div style={{
                  padding: 'clamp(24px,3vw,36px)',
                  border: '1px solid rgba(201,168,76,.12)',
                  background: 'var(--navy2)',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all .35s', cursor: 'default',
                  group: true,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.12)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  {/* Hover shimmer */}
                  <div style={{ position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%', background: 'linear-gradient(to right, transparent, rgba(201,168,76,.04), transparent)', pointerEvents: 'none', transition: 'left .5s ease' }} />
                  <div style={{ color: 'var(--gold)', marginBottom: 20 }}>{SVC_ICONS[s.icon] || SVC_ICONS.building}</div>
                  <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '.82rem', color: 'var(--cream)', letterSpacing: '.06em', marginBottom: 12 }}>
                    {nl(s).title}
                  </h3>
                  <p style={{ fontSize: '.8rem', color: 'rgba(200,195,186,.5)', lineHeight: 1.8 }}>
                    {nl(s).desc.slice(0, 110)}...
                  </p>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: 0, background: goldGrad, transition: 'width .4s ease' }} />
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} dir="up">
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 28px', border: '1px solid rgba(201,168,76,.35)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.08)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = 'rgba(201,168,76,.35)'; }}>
                {tl('Tous nos services', 'All services', 'Todos los servicios', 'Alle Leistungen', '查看所有服务')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — PARTENAIRES MONDIAUX
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,.05) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
                {tl('Réseau mondial', 'Global network', 'Red mundial', 'Weltweites Netzwerk', '全球网络')}
              </div>
              <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)' }}>
                {tl('7 Partenaires', '7 Global', '7 Socios', '7 Partner', '7个')}
                {' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {tl('dans le Monde', 'Partners', 'Mundiales', 'weltweit', '全球合作伙伴')}
                </span>
              </h2>
            </div>
          </FadeIn>

          {/* Partner cards */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMob ? 2 : w < 1024 ? 3 : 4}, 1fr)`, gap: 'clamp(10px,1.5vw,16px)', marginBottom: 40 }}>
            {PARTNERS_WORLD.map((p, i) => (
              <FadeIn key={i} delay={i * 0.07} dir="up">
                <div style={{
                  padding: 'clamp(16px,2.5vw,24px)',
                  border: i === activePart ? '1px solid rgba(201,168,76,.5)' : '1px solid rgba(201,168,76,.1)',
                  background: i === activePart ? 'rgba(201,168,76,.06)' : 'var(--navy)',
                  cursor: 'pointer', transition: 'all .3s', textAlign: 'center',
                }}
                  onClick={() => setActivePart(i)}
                  onMouseEnter={e => { if (i !== activePart) { e.currentTarget.style.borderColor = 'rgba(201,168,76,.25)'; e.currentTarget.style.background = 'rgba(201,168,76,.03)'; } }}
                  onMouseLeave={e => { if (i !== activePart) { e.currentTarget.style.borderColor = 'rgba(201,168,76,.1)'; e.currentTarget.style.background = 'var(--navy)'; } }}>
                  <div style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.2rem,2vw,1.6rem)', marginBottom: 4 }}>
                    {p.code === 'TR' ? '🇹🇷' : p.code === 'CN' ? '🇨🇳' : p.code === 'RU' ? '🇷🇺' : p.code === 'US' ? '🇺🇸' : p.code === 'MY' ? '🇲🇾' : p.code === 'GB' ? '🇬🇧' : '🇮🇳'}
                  </div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.1em', color: i === activePart ? 'var(--gold)' : 'rgba(200,195,186,.6)', textTransform: 'uppercase' }}>
                    {nl(p).country}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Active partner detail */}
          <FadeIn dir="up">
            <div style={{ padding: 'clamp(20px,3vw,32px)', border: '1px solid rgba(201,168,76,.2)', background: 'var(--navy)', borderLeft: '3px solid var(--gold)' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.16em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
                {nl(PARTNERS_WORLD[activePart]).country}
              </div>
              <p style={{ fontSize: '.86rem', color: 'rgba(200,195,186,.65)', lineHeight: 1.8 }}>
                {nl(PARTNERS_WORLD[activePart]).focus}
              </p>
            </div>
          </FadeIn>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/partenaires" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 28px', border: '1px solid rgba(201,168,76,.35)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; }}>
              {tl('Voir tous les partenaires', 'All partners', 'Ver socios', 'Alle Partner', '查看所有合作伙伴')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7 — ENTREPRISES DU GROUPE
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <FadeIn dir="up">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
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
                <div style={{ border: '1px solid rgba(201,168,76,.12)', background: 'var(--navy2)', overflow: 'hidden', transition: 'all .35s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.12)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  {/* Logo area */}
                  <div style={{ height: 100, background: 'rgba(5,8,16,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(201,168,76,.1)', padding: 20 }}>
                    <img src={c.logo} alt={c.name}
                      style={{ maxHeight: 60, maxWidth: '80%', objectFit: 'contain' }}
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }} />
                    <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)', fontSize: '1.4rem', color: 'var(--gold)', letterSpacing: '.1em' }}>
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div style={{ padding: 'clamp(18px,2.5vw,26px)' }}>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.14em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
                      {typeof c.sector === 'object' ? (c.sector[lang] || c.sector.fr) : c.sector}
                    </div>
                    <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '.9rem', color: 'var(--cream)', marginBottom: 10, letterSpacing: '.04em' }}>
                      {c.name}
                    </h3>
                    <p style={{ fontSize: '.78rem', color: 'rgba(200,195,186,.5)', lineHeight: 1.75, marginBottom: 16 }}>
                      {((typeof c.desc === 'object' ? (c.desc[lang] || c.desc.fr) : c.desc) || '').slice(0, 100)}...
                    </p>
                    <a href={c.website} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--f-display)', fontSize: '.58rem', letterSpacing: '.1em', color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase', transition: 'gap .2s' }}
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
            <Link to="/entreprises" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 28px', border: '1px solid rgba(201,168,76,.35)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; }}>
              {tl('Toutes nos entreprises', 'All companies', 'Todas las empresas', 'Alle Unternehmen', '查看所有企业')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8 — CTA FINAL
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: 'clamp(72px,10vw,120px) 0', overflow: 'hidden', background: 'var(--navy2)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,.1) 0%, transparent 60%)' }} />
        <GoldCanvas density={isMob ? 30 : 55} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeIn dir="up">
            <div style={{ display: 'inline-block', padding: '3px', background: goldGrad, marginBottom: 32, animation: 'spinSlow 8s linear infinite' }}>
              <div style={{ background: 'var(--navy2)', padding: '10px 16px', fontFamily: 'var(--f-display)', fontSize: '.5rem', letterSpacing: '.28em', color: 'var(--gold)', textTransform: 'uppercase' }}>G.N.A.H</div>
            </div>
            <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(2rem,4.5vw,3.6rem)', color: 'var(--cream)', lineHeight: 1.15, marginBottom: 16 }}>
              {tl("Investissons Ensemble", "Let's Invest Together", "Invirtamos Juntos", "Gemeinsam Investieren", "共同投资")}
              <br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {tl("dans l'Avenir de l'Afrique", "in Africa's Future", "en el Futuro de África", "in Afrikas Zukunft", "非洲的未来")}
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 'clamp(.88rem,1.4vw,1.1rem)', color: 'rgba(200,195,186,.5)', maxWidth: 520, margin: '0 auto 40px' }}>
              {tl(
                "Projets structurés, partenariats durables, vision continentale. Rejoignez l'écosystème GNAH.",
                "Structured projects, lasting partnerships, continental vision. Join the GNAH ecosystem.",
                "Proyectos estructurados, asociaciones duraderas, visión continental. Únase al ecosistema GNAH.",
                "Strukturierte Projekte, dauerhafte Partnerschaften, kontinentale Vision. Treten Sie dem GNAH-Ökosystem bei.",
                "结构化项目，持久合作，大陆愿景。加入GNAH生态系统。"
              )}
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: 'clamp(14px,2vw,16px) clamp(28px,3vw,40px)',
                background: goldGrad, color: '#050810',
                fontFamily: 'var(--f-display)', fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase',
                textDecoration: 'none', boxShadow: '0 8px 40px rgba(201,168,76,.45)',
                transition: 'all .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 50px rgba(201,168,76,.65)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,76,.45)'; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {tl('Nous contacter', 'Contact us', 'Contáctenos', 'Kontakt', '联系我们')}
              </a>
              <Link to="/investisseurs" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: 'clamp(14px,2vw,16px) clamp(28px,3vw,40px)',
                background: 'transparent', border: '1px solid rgba(201,168,76,.45)',
                color: 'var(--cream)', fontFamily: 'var(--f-display)',
                fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all .3s', backdropFilter: 'blur(4px)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.45)'; }}>
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
