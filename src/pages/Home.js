import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
function useW(){const[w,sw]=React.useState(window.innerWidth);React.useEffect(()=>{const h=()=>sw(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return w;}
import { SITE, STATS, SERVICES, PARTNERS_WORLD, YAYE_SLIDES, TAGLINE, SUBTITLE } from '../data/siteData';

// ── Hero background images (Unsplash direct links)
const HERO_IMGS = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=85',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85',
];

// ── SVG Icons
const ArrowR = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
const ChevL = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>;
const ChevR = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg>;
const ChevDown = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6,9 12,15 18,9"/></svg>;
const WAIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

const SVC_ICONS = {
  building: <><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/></>,
  layers:   <><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></>,
  chart:    <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  road:     <><path d="M3 12h18"/><path d="M3 6l3 6-3 6"/><path d="M21 6l-3 6 3 6"/></>,
  leaf:     <path d="M17 8C8 10 5.9 16.17 3.82 20.37M2 21s0-3 3-7c3.5-4.5 8-6.2 12-7C20 6 22 4 22 4c0 7-3 12-12 14"/>,
  zap:      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>,
};

// ── Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Yaye Dia Horizontal Carousel
function YayeDiaCarousel() {
  const { lang } = useLang();
  const _w = useW();
  const isMob = _w < 768;
  const isTab = _w < 1024;
  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx(i => (i - 1 + YAYE_SLIDES.length) % YAYE_SLIDES.length), []);
  const next = useCallback(() => setIdx(i => (i + 1) % YAYE_SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next]);

  const slide = YAYE_SLIDES[idx];
  const t = (obj) => obj[lang] || obj.fr;
  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);

  return (
    <div className="hcar">
      <div className="hcar-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {YAYE_SLIDES.map((s, i) => (
          <div key={i} className={`hcar-slide${i === idx ? ' active' : ''}`}>
            <img src={s.img} alt={t(s).title} className="img-cover" loading="lazy" />
            <div className="hcar-overlay" />
            <div className="hcar-info">
              <div className="hcar-tag">{t(s).tag}</div>
              <h3 className="hcar-title">{t(s).title}</h3>
              <p className="hcar-sub">{t(s).sub}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="hcar-btn prev" onClick={prev} aria-label="Précédent"><ChevL /></button>
      <button className="hcar-btn next" onClick={next} aria-label="Suivant"><ChevR /></button>
      <div className="hcar-dots">
        {YAYE_SLIDES.map((_, i) => (
          <button key={i} className={`hcar-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

// ── Animated counter
function Counter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/\D/g, '')) || 0;
    const step = Math.ceil(num / (duration / 30));
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, num);
      setCount(cur);
      if (cur >= num) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [visible, target, duration]);
  const suffix = target.replace(/[0-9]/g, '');
  return <span ref={ref}>{count}{suffix}</span>;
}


// Get services from localStorage or fallback
function getServices() {
  try {
    const s = localStorage.getItem('gnah_services');
    if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p; }
  } catch {}
  return null;
}
// Get partners from localStorage or fallback  
function getPartnersRT() {
  try {
    const s = localStorage.getItem('gnah_partners');
    if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p; }
  } catch {}
  return null;
}

export default function Home() {
  const { lang } = useLang();
  const _w = useW();
  const isMob = _w < 768;
  const isTab = _w < 1024;
  const [heroIdx, setHeroIdx] = useState(0);
  const [rtServices, setRtServices] = useState(getServices);
  const [rtPartners, setRtPartners] = useState(getPartnersRT);
  const [statsRef, statsVisible] = useInView();
  const [introRef, introVisible] = useInView();
  const [svcRef, svcVisible]     = useInView();
  const [partRef, partVisible]   = useInView();

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMGS.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => { setRtServices(getServices()); setRtPartners(getPartnersRT()); };
    window.addEventListener('storage', h);
    const iv = setInterval(h, 2000);
    return () => { window.removeEventListener('storage', h); clearInterval(iv); };
  }, []);

  const t  = (obj) => obj[lang] || obj.fr;
  const wm = typeof SITE.waMsg === 'object' ? (SITE.waMsg[lang] || SITE.waMsg.fr) : SITE.waMsg;
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`;

  const LABELS = {
    heroSub:      { fr:'Un projet à la fois', en:'One project at a time', es:'Un proyecto a la vez', de:'Ein Projekt nach dem anderen', zh:'一次一个项目' },
    discoverBtn:  { fr:'Découvrir GNAH', en:'Discover GNAH', es:'Descubrir GNAH', de:'GNAH Entdecken', zh:'探索GNAH' },
    scroll:       { fr:'Découvrir', en:'Scroll', es:'Explorar', de:'Entdecken', zh:'探索' },
    flagship:     { fr:'Projet Phare', en:'Flagship Project', es:'Proyecto Insignia', de:'Vorzeigeprojekt', zh:'旗舰项目' },
    residence:    { fr:'Résidence', en:'Residence', es:'Residencia', de:'Residenz', zh:'住宅' },
    residenceSub: { fr:"L'Art de vivre Moderne — 300 villas Haut Standing", en:'The Art of Modern Living — 300 High-End Villas', es:'El Arte de Vivir Moderno — 300 Villas de Alto Standing', de:'Die Kunst des modernen Lebens — 300 Hochwertige Villen' , zh:'现代生活艺术 — 300栋高档别墅' },
    seeProject:   { fr:'Découvrir le Projet', en:'Discover the Project', es:'Ver el Proyecto', de:'Projekt Entdecken', zh:'探索项目' },
    expertLabel:  { fr:'Notre expertise', en:'Our expertise', es:'Nuestra experiencia', de:'Unsere Expertise', zh:'我们的专业知识' },
    servTitle:    { fr:'Nos Services', en:'Our Services', es:'Nuestros Servicios', de:'Unsere Leistungen', zh:'我们的服务' },
    servBtn:      { fr:'Tous nos services', en:'All our services', es:'Todos nuestros servicios', de:'Alle Leistungen', zh:'查看所有服务' },
    learnMore:    { fr:'En savoir plus', en:'Learn more', es:'Saber más', de:'Mehr erfahren', zh:'了解更多' },
    partLabel:    { fr:'Réseau mondial', en:'Global network', es:'Red mundial', de:'Weltweites Netzwerk', zh:'全球网络' },
    partTitle:    { fr:'Partenaires dans le Monde', en:'Global Partners', es:'Socios Mundiales', de:'Weltweite Partner', zh:'全球合作伙伴' },
    partBtn:      { fr:'Voir tous les partenaires', en:'View all partners', es:'Ver todos los socios', de:'Alle Partner anzeigen', zh:'查看所有合作伙伴' },
    ctaSub:       { fr:"Prêt à investir dans l'avenir de l'Afrique ?", en:"Ready to invest in Africa's future?", es:'¿Listo para invertir en el futuro de África?', de:'Bereit, in Afrikas Zukunft zu investieren?' , zh:'准备好投资非洲的未来了吗？' },
    ctaTitle:     { fr:"Contactez-Nous Aujourd'hui", en:'Contact Us Today', es:'Contáctenos Hoy', de:'Kontaktieren Sie Uns Heute', zh:'今天联系我们' },
    ctaBtn:       { fr:'Nous contacter', en:'Contact us', es:'Contáctenos', de:'Kontakt', zh:'联系我们' },
    whoLabel:     { fr:'Qui sommes-nous', en:'Who we are', es:'Quiénes somos', de:'Wer wir sind', zh:'我们是谁' },
    whoTitle:     { fr:'African Development Company', en:'African Development Company', es:'African Development Company', de:'African Development Company', zh:'African Development Company' },
    whoSub:       { fr:"10 ans d'excellence", en:'10 years of excellence', es:'10 años de excelencia', de:'10 Jahre Exzellenz', zh:'10年卓越成就' },
  };

  return (
    <main>
      {/* ══ HERO ══ */}
      <section className="hero" aria-label="Hero">
        {HERO_IMGS.map((img, i) => (
          <div key={i} className={`hero-bg-slide${i === heroIdx ? ' active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            Groupe Ndoye Africa Holding — {lang === 'fr' ? 'Sénégal, Afrique' : lang === 'en' ? 'Senegal, Africa' : lang === 'es' ? 'Senegal, África' : 'Senegal, Afrika'}
          </div>
          <h1 className="hero-title">
            {lang === 'fr' ? <><em>Bâtir</em> l'Afrique<br />de demain</> :
             lang === 'en' ? <><em>Building</em><br />tomorrow's Africa</> :
             lang === 'es' ? <><em>Construyendo</em><br />el África del mañana</> :
             <><em>Das Afrika</em><br />von morgen bauen</>}
          </h1>
          <p className="hero-sub">{t(LABELS.heroSub)} — {t(SUBTITLE)}</p>
          <div className="hero-actions">
            <Link to="/projets" className="btn btn-gold" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              {lang === 'fr' ? 'Résidence Yaye Dia' : lang === 'en' ? 'Yaye Dia Residence' : lang === 'es' ? 'Residencia Yaye Dia' : 'Yaye Dia Residenz'} <ArrowR />
            </Link>
            <Link to="/a-propos" className="btn btn-outline-gold" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              {t(LABELS.discoverBtn)}
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <ChevDown />
          <span>{t(LABELS.scroll)}</span>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div className="stats-bar" ref={statsRef}>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat-cell">
              <span className="stat-val">
                {statsVisible ? <Counter target={s.val} /> : s.val}
              </span>
              <span className="stat-lbl">{s[lang] || s.fr}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ INTRO ══ */}
      <section
        className="section"
        style={{ background: 'var(--navy)' }}
        ref={introRef}
      >
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 72, alignItems: 'center' }}>
            <div className={`slide-left${introVisible ? ' visible' : ''}`}>
              <div className="sec-label">{t(LABELS.whoLabel)}</div>
              <h2 className="sec-title-dark">{t(LABELS.whoTitle)}</h2>
              <div className="divider-gold" />
              <p style={{ fontSize: '.92rem', color: 'var(--text)', lineHeight: 1.9, marginBottom: 18 }}>
                {lang === 'fr'
                  ? "G.N.A.H est présent sur le marché depuis 2015 en tant que société spécialisée dans le développement et la structuration de projets, l'infrastructure publique, l'agriculture, la construction et l'immobilier. En collaboration avec de grands groupes internationaux dans une synergie optimale."
                  : lang === 'en'
                  ? "G.N.A.H has been operating on the market since 2015 as a company specialising in project development and structuring, public infrastructure, agriculture, construction and real estate. In collaboration with major international groups in optimal synergy."
                  : lang === 'es'
                  ? "G.N.A.H opera en el mercado desde 2015 como empresa especializada en desarrollo y estructuración de proyectos, infraestructura pública, agricultura, construcción e inmobiliaria. En colaboración con grandes grupos internacionales en sinergia óptima."
                  : "G.N.A.H ist seit 2015 auf dem Markt tätig als Unternehmen, das sich auf Projektentwicklung und -strukturierung, öffentliche Infrastruktur, Landwirtschaft, Bau und Immobilien spezialisiert hat. In Zusammenarbeit mit großen internationalen Gruppen in optimaler Synergie."
                }
              </p>
              <p style={{ fontSize: '.92rem', color: 'var(--text)', lineHeight: 1.9, marginBottom: 32 }}>
                {lang === 'fr'
                  ? "Composée d'une équipe de spécialistes, techniciens, ingénieurs et architectes, GNAH dispose de l'expertise nécessaire pour atteindre avec succès les objectifs définis. Notre réseau couvre 6 pays partenaires et 11 nations africaines."
                  : lang === 'en'
                  ? "Made up of a team of specialists, technicians, engineers and architects, GNAH has the expertise to successfully achieve the defined objectives. Our network covers 6 partner countries and 11 African nations."
                  : lang === 'es'
                  ? "Compuesta por un equipo de especialistas, técnicos, ingenieros y arquitectos, GNAH tiene la experiencia para lograr con éxito los objetivos definidos. Nuestra red abarca 6 países socios y 11 naciones africanas."
                  : "Bestehend aus einem Team von Spezialisten, Technikern, Ingenieuren und Architekten hat GNAH die Expertise, die definierten Ziele erfolgreich zu erreichen. Unser Netzwerk umfasst 6 Partnerländer und 11 afrikanische Nationen."
                }
              </p>
              <Link to="/a-propos" className="btn btn-gold" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                {t(LABELS.learnMore)} <ArrowR />
              </Link>
            </div>

            <div className={`slide-right${introVisible ? ' visible' : ''}`} style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85"
                alt="Africa"
                style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }}
              />
              {/* Floating badge */}
              <div style={{ position: 'absolute', bottom: -22, right: -22, background: 'var(--navy2)', border: '1px solid var(--gold)', padding: '18px 22px', minWidth: 150 }}>
                <div style={{ fontFamily: 'var(--f-elegant)', fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1 }}>10+</div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.1em', color: 'rgba(200,195,186,.5)', textTransform: 'uppercase', marginTop: 4 }}>
                  {t(LABELS.whoSub)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ YAYE DIA CAROUSEL ══ */}
      <section style={{ background: 'var(--navy2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="sec-label" style={{ display: 'inline-flex' }}>{t(LABELS.flagship)}</div>
            <h2 className="sec-title-dark" style={{ marginTop: 6 }}>
              {t(LABELS.residence)} <em style={{ color: 'var(--gold)', fontFamily: 'var(--f-elegant)' }}>Yaye Dia</em>
            </h2>
            <p className="sec-sub-dark">{t(LABELS.residenceSub)}</p>
          </div>
          <YayeDiaCarousel />
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link to="/projets" className="btn btn-gold" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              {t(LABELS.seeProject)} <ArrowR />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="section" style={{ background: 'var(--navy)' }} ref={svcRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="sec-label" style={{ display: 'inline-flex' }}>{t(LABELS.expertLabel)}</div>
            <h2 className="sec-title-dark" style={{ marginTop: 6 }}>{t(LABELS.servTitle)}</h2>
            <div className="divider-gold-c" />
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={`card-dark fade-up${svcVisible ? ' visible' : ''} delay-${i + 1}`}
              >
                <div style={{ width: 52, height: 52, border: '1px solid rgba(201,168,76,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: 20 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    {SVC_ICONS[s.icon]}
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '.88rem', color: 'var(--cream)', letterSpacing: '.06em', marginBottom: 12 }}>
                  {(s[lang] || s.fr).title}
                </h3>
                <p style={{ fontSize: '.83rem', color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
                  {(s[lang] || s.fr).desc}
                </p>
                <Link
                  to="/services"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'gap .2s' }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                >
                  {t(LABELS.learnMore)} <ArrowR />
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn btn-outline-gold" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              {t(LABELS.servBtn)} <ArrowR />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PARTNERS ══ */}
      <section style={{ background: 'var(--navy2)', padding: '80px 0' }} ref={partRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="sec-label" style={{ display: 'inline-flex' }}>{t(LABELS.partLabel)}</div>
            <h2 className="sec-title-dark" style={{ marginTop: 6 }}>{t(LABELS.partTitle)}</h2>
            <div className="divider-gold-c" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {PARTNERS_WORLD.map((p, i) => (
              <div
                key={p.code}
                className={`fade-up${partVisible ? ' visible' : ''} delay-${(i % 6) + 1}`}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 22px', border: 'var(--border-gold)', background: 'rgba(201,168,76,.03)', transition: 'var(--trans)', cursor: 'default', minWidth: 220 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,.08)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.5)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,.03)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.28)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: '.82rem', color: 'var(--cream)', letterSpacing: '.07em', marginBottom: 4 }}>
                    {(p[lang] || p.fr).country}
                  </div>
                  <div style={{ fontSize: '.76rem', color: 'var(--muted)', lineHeight: 1.55, maxWidth: 200 }}>
                    {(p[lang] || p.fr).focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/partenaires" className="btn btn-outline-gold" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              {t(LABELS.partBtn)} <ArrowR />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ position: 'relative', minHeight: '48vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(/Images/yaye-dia/villa-f4pp-facade.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.22)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(5,8,16,.9),rgba(13,20,39,.75))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 24px' }}>
          <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(201,168,76,.7)', marginBottom: 12 }}>
            {t(LABELS.ctaSub)}
          </p>
          <h2 style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.7rem,4vw,3rem)', color: 'var(--cream)', marginBottom: 16 }}>
            {t(LABELS.ctaTitle)}
          </h2>
          <div className="divider-gold-c" style={{ margin: '0 auto 32px' }} />
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-gold" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              {t(LABELS.ctaBtn)} <ArrowR />
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <WAIcon /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
