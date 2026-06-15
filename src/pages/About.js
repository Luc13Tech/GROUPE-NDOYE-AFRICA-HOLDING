import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
function useW(){const[w,sw]=React.useState(window.innerWidth);React.useEffect(()=>{const h=()=>sw(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return w;}
import { SITE, COMPANY_INTRO, CONSORTIUM, STRATEGY, OBJECTIVES, OPERATIONS } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.1){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

// ── Animated counter
function AnimCount({ target, suffix='', duration=1600, visible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(target) || 0;
    const steps = 60;
    const inc = num / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, num);
      setVal(Math.round(cur * 10) / 10);
      if (cur >= num) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [visible, target, duration]);
  return <>{val}{suffix}</>;
}

// ── Circular progress
function CircleProgress({ percent, size=120, stroke=10, color='#c9a84c', label, value, visible }) {
  const [prog, setProg] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + 2, percent);
      setProg(cur);
      if (cur >= percent) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [visible, percent]);
  const offset = circ - (prog / 100) * circ;
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:'stroke-dashoffset .05s linear', filter:`drop-shadow(0 0 8px ${color}60)` }}/>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
          style={{ transform:'rotate(90deg)', transformOrigin:'center', fill:'#fff', fontFamily:'Cinzel,serif', fontSize:size*.18, fontWeight:700 }}
          transform={`rotate(90, ${size/2}, ${size/2})`}>
          {value}
        </text>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
          style={{ fill:'rgba(255,255,255,.45)', fontFamily:'Raleway,sans-serif', fontSize:size*.09 }}
          transform={`rotate(90, ${size/2}, ${size/2}) translate(0, ${size*.15})`}>
          {label}
        </text>
      </svg>
    </div>
  );
}

// ── Bar chart (partners growth)
function BarChart({ data, visible }) {
  const maxVal = Math.max(...data.map(d=>d.val));
  return (
    <div style={{ display:'flex', gap:12, alignItems:'flex-end', height:120, padding:'0 8px' }}>
      {data.map((d,i)=>(
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <span style={{ fontFamily:'Cinzel,serif', fontSize:'.62rem', color:'rgba(255,255,255,.5)' }}>{d.val}</span>
          <div style={{ width:'100%', position:'relative', height:90 }}>
            <div style={{
              position:'absolute', bottom:0, left:0, right:0,
              height: visible ? `${(d.val/maxVal)*100}%` : '0%',
              background: i===data.length-1
                ? 'linear-gradient(180deg,#e8c96a,#c9a84c)'
                : `linear-gradient(180deg, ${d.color||'#6366f1'}, ${d.color2||'#8b5cf6'})`,
              transition: `height 1s ease ${i*0.15}s`,
              borderRadius:'3px 3px 0 0',
              boxShadow: i===data.length-1 ? '0 0 16px rgba(201,168,76,.4)' : `0 0 12px ${d.color||'#6366f1'}40`,
            }}/>
          </div>
          <span style={{ fontFamily:'Raleway,sans-serif', fontSize:'.62rem', color:'rgba(255,255,255,.45)', letterSpacing:'.04em' }}>{d.year}</span>
        </div>
      ))}
    </div>
  );
}

// ── Horizontal progress bar
function HBar({ label, percent, color, visible, delay=0 }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontFamily:'Cinzel,serif', fontSize:'.72rem', color:'rgba(255,255,255,.85)', letterSpacing:'.06em' }}>{label}</span>
        <span style={{ fontFamily:'Cinzel,serif', fontSize:'.7rem', color }}>
          {visible ? percent : 0}%
        </span>
      </div>
      <div style={{ height:6, background:'rgba(255,255,255,.08)', borderRadius:3, overflow:'hidden' }}>
        <div style={{
          height:'100%', borderRadius:3,
          width: visible ? `${percent}%` : '0%',
          background:`linear-gradient(90deg,${color},${color}80)`,
          transition:`width 1.2s ease ${delay}s`,
          boxShadow:`0 0 8px ${color}60`,
        }}/>
      </div>
    </div>
  );
}

const ArrowR = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;

export default function About() {
  const { lang } = useLang();
  const _w = useW();
  const isMob = _w < 768;
  const isTab = _w < 1024;
  const [heroRef, heroVis]   = useInView();
  const [statsRef, statsVis] = useInView();
  const [perfRef, perfVis]   = useInView();
  const [barRef, barVis]     = useInView();
  const [objRef, objVis]     = useInView();
  // Load QR code library and render
  useEffect(() => {
    const el = document.getElementById('about-qr');
    if (!el || el.querySelector('canvas')) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => {
      if (window.QRCode && el && !el.querySelector('canvas')) {
        const size = Math.min(window.innerWidth < 640 ? 160 : 200, 200);
        new window.QRCode(el, {
          text: 'https://groupendoyeafrica.com',
          width: size, height: size,
          colorDark: '#c9a84c',
          colorLight: '#050810',
          correctLevel: (window.QRCode || {}).CorrectLevel?.H || 1,
        });
      }
    };
    document.head.appendChild(script);
  }, []);


  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);

  const PERF_DATA = [
    { year:'2022', val:4, color:'#6366f1', color2:'#8b5cf6' },
    { year:'2023', val:6, color:'#6366f1', color2:'#8b5cf6' },
    { year:'2024', val:8, color:'#8b5cf6', color2:'#a78bfa' },
    { year:'2025', val:10,color:'#a78bfa', color2:'#c4b5fd' },
    { year:'2026', val:12,color:'#c9a84c', color2:'#e8c96a' },
  ];

  const IMPACT_BARS = [
    { label:tl('Développement Immobilier', 'Real Estate Development', 'Desarrollo Inmobiliario', 'Immobilienentwicklung','房地产开发'), percent:92, color:'#c9a84c', delay:.1 },
    { label:tl('Infrastructure Publique', 'Public Infrastructure', 'Infraestructura Pública', 'Öffentliche Infrastruktur','公共基础设施'), percent:85, color:'#6366f1', delay:.2 },
    { label:tl('Agriculture & Technologie', 'Agriculture & Technology', 'Agricultura y Tecnología', 'Landwirtschaft & Technologie','农业与技术'), percent:70, color:'#34d399', delay:.3 },
    { label:tl('Énergie Renouvelable', 'Renewable Energy', 'Energía Renovable', 'Erneuerbare Energien','可再生能源'), percent:78, color:'#f472b6', delay:.4 },
  ];

  return (
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/cite-vue-aerienne.jpg"
        label={tl('African Society', 'African Society', 'African Society', 'African Society','非洲社会')}
        title={tl('À Propos de GNAH', 'About GNAH', 'Acerca de GNAH', 'Über GNAH','关于GNAH')}
        sub={tl('African Development Company — depuis 2015', 'African Development Company — since 2015', 'African Development Company — desde 2015', 'African Development Company — seit 2015','非洲发展公司 — 自2015年')}
        breadcrumbs={[{ label:tl('À Propos', 'About', 'Acerca de', 'Über uns','关于我们') }]}
      />

      {/* ── PRESENTATION ── */}
      <section className="section" ref={heroRef}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:72, alignItems:'center' }}>
            <div className={`slide-left${heroVis?' visible':''}`}>
              <div className="sec-label">{tl('Présentation', 'Overview', 'Presentación', 'Überblick','介绍')}</div>
              <h2 className="sec-title-light" style={{ marginTop:6 }}>
                {tl('Qui Sommes-Nous ?', 'Who Are We?', '¿Quiénes Somos?', 'Wer Sind Wir?','我们是谁？')}
              </h2>
              <div className="divider-gold"/>
              <p style={{ fontSize:'.9rem', color:'var(--text-mid)', lineHeight:1.9, marginBottom:16 }}>
                {COMPANY_INTRO[lang]||COMPANY_INTRO.fr}
              </p>
              <p style={{ fontSize:'.9rem', color:'var(--text-mid)', lineHeight:1.9, marginBottom:28 }}>
                {CONSORTIUM[lang]||CONSORTIUM.fr}
              </p>
              <Link to="/contact" className="btn btn-gold" onClick={()=>window.scrollTo({top:0,behavior:'instant'})}>
                {tl('Nous contacter', 'Contact us', 'Contáctenos', 'Kontaktieren Sie uns','联系我们')} <ArrowR/>
              </Link>
            </div>
            <div className={`slide-right${heroVis?' visible':''}`} style={{ position:'relative' }}>
              <img src="/Images/yaye-dia/cite-vue-aerienne.jpg"
                onError={e=>{ e.target.src='/Images/yaye-dia/villa-f5-facade3.jpg'; }}
                alt="GNAH" style={{ width:'100%', height:400, objectFit:'cover', borderTop:'3px solid var(--gold)' }}/>
              {/* Floating stats */}
              <div style={{ position:'absolute', bottom:-20, right:-20, background:'var(--navy)', border:'1px solid var(--gold)', padding:'18px 22px', minWidth:150 }}>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'2rem', color:'var(--gold)', lineHeight:1 }}>2015</div>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.62rem', letterSpacing:'.1em', color:'rgba(200,195,186,.5)', marginTop:4 }}>
                  {tl("Année de fondation", "Year founded", "Año de fundación", "Gründungsjahr",'成立年份')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANIMATED KPI STATS ── */}
      <section style={{ background:'var(--navy)', padding:'80px 0' }} ref={statsRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Chiffres clés', 'Key figures', 'Cifras clave', 'Kennzahlen','关键数据')}</div>
            <h2 className="sec-title-dark" style={{ marginTop:6 }}>
              {tl('GNAH en Chiffres', 'GNAH by the Numbers', 'GNAH en Cifras', 'GNAH in Zahlen','GNAH数字概览')}
            </h2>
            <div className="divider-gold-c"/>
          </div>
          <div className="grid-4">
            {[
              { val:'10', suf:'+', fr:"Ans d'expérience", en:'Years of experience', es:'Años de experiencia', de:'Jahre Erfahrung', color:'#c9a84c' },
              { val:'6', suf:'', fr:'Partenaires mondiaux', en:'Global partners', es:'Socios mundiales', de:'Weltweite Partner', color:'#6366f1' },
              { val:'11', suf:'', fr:'Pays africains partenaires', en:'African partner countries', es:'Países socios africanos', de:'Afrikanische Partnerländer', color:'#34d399' },
              { val:'300', suf:'', fr:'Villas Résidence Yaye Dia', en:'Yaye Dia Villas', es:'Villas Yaye Dia', de:'Yaye Dia Villen', color:'#f472b6' },
            ].map((s,i)=>(
              <div key={i} className={`fade-up${statsVis?' visible':''} delay-${i+1}`}
                style={{ textAlign:'center', padding:'36px 20px', border:`1px solid ${s.color}30`, background:`${s.color}08`, borderTop:`3px solid ${s.color}` }}>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'2.8rem', color:s.color, lineHeight:1, marginBottom:8, filter:`drop-shadow(0 0 12px ${s.color}60)` }}>
                  {statsVis ? <AnimCount target={s.val} suffix={s.suf} visible={statsVis}/> : `0${s.suf}`}
                </div>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.65rem', color:'rgba(200,195,186,.5)', letterSpacing:'.1em', textTransform:'uppercase', lineHeight:1.5 }}>
                  {s[lang]||s.fr}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE VISUELS ── */}
      <section style={{ background:'linear-gradient(135deg,#0a0e1a 0%,#0d1427 50%,#050810 100%)', padding:'80px 0' }} ref={perfRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="sec-label" style={{ display:'inline-flex', color:'var(--gold)' }}>
              {tl('Performance', 'Performance', 'Rendimiento', 'Leistung','绩效')}
            </div>
            <h2 style={{ fontFamily:'var(--f-elegant)', fontSize:'clamp(1.6rem,3vw,2.6rem)', color:'var(--cream)', marginTop:6 }}>
              {tl('Performance & Échelle GNAH', 'GNAH Performance & Scale', 'Rendimiento y Escala GNAH', 'GNAH-Leistung & Skala','GNAH绩效与规模')}
            </h2>
            <div className="divider-gold-c"/>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:40 }}>
            {/* Circular gauges */}
            <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(201,168,76,.15)', padding:'36px 32px', backdropFilter:'blur(8px)' }}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.7rem', color:'rgba(201,168,76,.6)', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:28, textAlign:'center' }}>
                {tl('Indicateurs de Progression', 'Progress Indicators', 'Indicadores de Progresión', 'Fortschrittsindikatoren','进展指标')}
              </div>
              <div style={{ display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:24 }}>
                <CircleProgress percent={83} size={130} stroke={10} color="#c9a84c" label={tl("Ans d'impact", "Years impact", "Años impacto", "Jahre Impact","影响年限")} value="10+" visible={perfVis}/>
                <CircleProgress percent={95} size={130} stroke={10} color="#6366f1" label={tl("Engagement", "Commitment", "Compromiso", "Engagement",'承诺')} value="98%" visible={perfVis}/>
                <CircleProgress percent={72} size={130} stroke={10} color="#34d399" label={tl("Couverture Afrique", "Africa Coverage", "Cobertura África", "Afrika-Abdeckung",'非洲覆盖范围')} value="11/54" visible={perfVis}/>
              </div>

              {/* Impact bars */}
              <div style={{ marginTop:36 }}>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.65rem', color:'rgba(200,195,186,.45)', letterSpacing:'.16em', textTransform:'uppercase', marginBottom:16 }}>
                  {tl('Répartition par secteur', 'Sector breakdown', 'Distribución por sector', 'Verteilung nach Sektor','按行业分布')}
                </div>
                {IMPACT_BARS.map((b,i)=>(
                  <HBar key={i} label={b.label} percent={b.percent} color={b.color} visible={perfVis} delay={b.delay}/>
                ))}
              </div>
            </div>

            {/* Bar chart partners */}
            <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(201,168,76,.15)', padding:'36px 32px', backdropFilter:'blur(8px)' }} ref={barRef}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.7rem', color:'rgba(201,168,76,.6)', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:8 }}>
                {tl('Progression Annuelle des Partenaires Commerciaux', 'Annual Commercial Partners Growth', 'Crecimiento Anual de Socios Comerciales', 'Jährliches Wachstum der Handelspartner','商业合作伙伴年度增长')}
              </div>
              <div style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:'.8rem', color:'rgba(200,195,186,.35)', marginBottom:28 }}>
                {tl('Nombre de partenaires actifs par année', 'Number of active partners per year', 'Número de socios activos por año', 'Anzahl aktiver Partner pro Jahr','每年活跃合作伙伴数量')}
              </div>

              <BarChart data={PERF_DATA} visible={barVis||perfVis}/>

              {/* Legend */}
              <div style={{ display:'flex', gap:16, justifyContent:'center', marginTop:16, flexWrap:'wrap' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.68rem', color:'rgba(200,195,186,.5)', fontFamily:'Raleway,sans-serif' }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:'#8b5cf6' }}/>
                  {tl('Partenaires actifs', 'Active partners', 'Socios activos', 'Aktive Partner','活跃合作伙伴')}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.68rem', color:'rgba(200,195,186,.5)', fontFamily:'Raleway,sans-serif' }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:'var(--gold)' }}/>
                  2026 {tl('(En cours)','(Ongoing)','(En curso)','(Laufend)','（进行中）')}
                </div>
              </div>

              {/* Key ops */}
              <div style={{ marginTop:28, borderTop:'1px solid rgba(201,168,76,.1)', paddingTop:20 }}>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.65rem', color:'rgba(201,168,76,.5)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:12 }}>
                  {tl('Opérations majeures', 'Major operations', 'Operaciones mayores', 'Wichtige Operationen','主要运营')}
                </div>
                {OPERATIONS.slice(0,3).map((op,i)=>(
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,.05)', fontSize:'.78rem' }}>
                    <div>
                      <span style={{ color:'var(--cream)', fontFamily:'Raleway,sans-serif' }}>{op.country}</span>
                      <span style={{ color:'rgba(200,195,186,.4)', marginLeft:8, fontSize:'.72rem' }}>{op[lang]||op.fr}</span>
                    </div>
                    <span style={{ color:'var(--gold)', fontFamily:'Cinzel,serif', fontWeight:600, whiteSpace:'nowrap', marginLeft:8 }}>{op.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGY ── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:64 }}>
            <div>
              <div className="sec-label">{tl('Méthodologie', 'Methodology', 'Metodología', 'Methodik','方法论')}</div>
              <h2 className="sec-title-light" style={{ marginTop:6 }}>
                {tl('Stratégies & Plans de Développement', 'Strategies & Development Plans', 'Estrategias y Planes de Desarrollo', 'Strategien & Entwicklungspläne','战略与发展计划')}
              </h2>
              <div className="divider-gold"/>
              <p style={{ fontSize:'.9rem', color:'var(--text-mid)', lineHeight:1.9, marginBottom:24 }}>
                {STRATEGY[lang]||STRATEGY.fr}
              </p>
              {[
                {fr:'Analyses techniques et financières complètes',en:'Complete technical and financial analyses',es:'Análisis técnicos y financieros completos',de:'Vollständige technische und Finanzanalysen'},
                {fr:'Évaluation des probabilités de succès',en:'Success probability assessment',es:'Evaluación de probabilidades de éxito',de:'Erfolgsbewertung'},
                {fr:'Partenariats avec des banques d\'investissement',en:'Partnerships with investment banks',es:'Alianzas con bancos de inversión',de:'Partnerschaften mit Investmentbanken'},
                {fr:'Transfert de technologie avec partenaires',en:'Technology transfer with partners',es:'Transferencia de tecnología con socios',de:'Technologietransfer mit Partnern'},
              ].map((it,i)=>(
                <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:'9px 0', borderBottom:'1px solid var(--gray-200)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                  <span style={{ fontSize:'.85rem', color:'var(--text-mid)' }}>{it[lang]||it.fr}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="sec-label">{tl('Business Model', 'Business Model', 'Modelo de Negocio', 'Geschäftsmodell','商业模式')}</div>
              <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Nos Solutions', 'Our Solutions', 'Nuestras Soluciones', 'Unsere Lösungen','我们的解决方案')}</h2>
              <div className="divider-gold"/>
              <div style={{ padding:'24px', background:'var(--gray-50)', border:'1px solid var(--gray-200)', borderLeft:'3px solid var(--gold)', marginBottom:16 }}>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.2rem', color:'var(--gold)', marginBottom:4 }}>Mastering</div>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.82rem', color:'var(--text-dark)', letterSpacing:'.08em' }}>THE Challenges</div>
              </div>
              <p style={{ fontSize:'.88rem', color:'var(--text-mid)', lineHeight:1.9 }}>
                {tl("Si le propriétaire du projet ne dispose pas d'un modèle économique complet, nous faisons appel à des cabinets d'études experts pour mettre en place le programme. Qu'il s'agisse d'un projet privé ou d'État, nous trouvons toujours un partenaire fiable.", "If the project owner does not have a complete business model, we call on expert study firms to set up the programme. Whether private or state project, we always find a reliable partner.", "Si el propietario del proyecto no dispone de un modelo económico completo, recurrimos a firmas de estudio expertas. Sea privado o estatal, siempre encontramos un socio fiable.", "Falls der Projektinhaber kein vollständiges Geschäftsmodell hat, beauftragen wir Expertenfirmen. Ob privates oder staatliches Projekt, wir finden immer einen zuverlässigen Partner.",'如果项目所有者没有完整的商业模式，我们将调动专家网络与其共同构建。')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIVES ── */}
      <section style={{ background:'var(--gray-50)', padding:'80px 0' }} ref={objRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Vision', 'Vision', 'Visión', 'Vision','愿景')}</div>
            <h2 className="sec-title-light" style={{ marginTop:6 }}>
              {tl("Objectifs pour l'Afrique", "Objectives for Africa", "Objetivos para África", "Ziele für Afrika",'非洲目标')}
            </h2>
            <div className="divider-gold-c"/>
            <p style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:'1.05rem', color:'var(--gold)' }}>
              {tl('Un défi à relever !', 'A challenge to take up!', '¡Un desafío a afrontar!', 'Eine Herausforderung!','一个值得挑战的目标！')}
            </p>
          </div>
          <div className="grid-3">
            {OBJECTIVES.map((o,i)=>(
              <div key={i} className={`fade-up${objVis?' visible':''} delay-${(i%3)+1}`}
                style={{ overflow:'hidden', border:'1px solid var(--gray-200)', transition:'var(--trans)' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='var(--shadow-lg)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--gray-200)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
                <img src={o.img} alt={(o[lang]||o.fr).title}
                  style={{ width:'100%', height:160, objectFit:'cover', display:'block' }}/>
                <div style={{ padding:'18px 20px', background:'var(--white)', borderTop:'2px solid var(--gold)' }}>
                  <h3 style={{ fontFamily:'var(--f-display)', fontSize:'.86rem', color:'var(--text-dark)', letterSpacing:'.07em', marginBottom:8 }}>
                    {(o[lang]||o.fr).title}
                  </h3>
                  <p style={{ fontSize:'.8rem', color:'var(--text-mid)', lineHeight:1.7 }}>
                    {(o[lang]||o.fr).desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── QR CODE SECTION ── */}
      <section style={{ background:'linear-gradient(135deg,var(--navy) 0%,var(--navy2) 50%,var(--navy) 100%)', padding:'72px 0', position:'relative', overflow:'hidden' }}>
        {/* Background decoration */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 30px,rgba(201,168,76,.025) 30px,rgba(201,168,76,.025) 31px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'min(400px,80vw)', height:'min(400px,80vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%)', pointerEvents:'none' }}/>

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:48, alignItems:'center', maxWidth:900, margin:'0 auto' }}>

            {/* Left — Text */}
            <div>
              <div className="sec-label">{tl('Plateforme digitale', 'Digital Platform', 'Plataforma digital', 'Digitale Plattform','数字平台')}</div>
              <h2 style={{ fontFamily:'var(--f-elegant)', fontSize:'clamp(1.4rem,3vw,2.2rem)', color:'var(--cream)', marginTop:8, marginBottom:12, lineHeight:1.2 }}>
                {tl('Scannez & Visitez Notre Site', 'Scan & Visit Our Website', 'Escanee y Visite Nuestro Sitio', 'Scannen & Besuchen Sie Unsere Website','扫描并访问我们的网站')}
              </h2>
              <div style={{ width:48, height:2, background:'linear-gradient(90deg,var(--gold),var(--gold-d))', marginBottom:18 }}/>
              <p style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:'1rem', color:'rgba(201,168,76,.7)', marginBottom:12 }}>
                {tl("Accédez directement à notre plateforme", "Access our platform directly", "Acceda directamente a nuestra plataforma", "Greifen Sie direkt auf unsere Plattform zu",'直接访问我们的平台')}
              </p>
              <p style={{ fontSize:'.88rem', color:'rgba(200,195,186,.55)', lineHeight:1.8, marginBottom:24 }}>
                {tl("Scannez le code QR avec votre appareil photo ou partagez-le avec vos contacts pour les rediriger directement vers notre plateforme officielle.", "Scan the QR code with your camera or share it with your contacts to redirect them directly to our official platform.", "Escanee el código QR con su cámara o compártalo con sus contactos para redirigirlos directamente a nuestra plataforma oficial.", "Scannen Sie den QR-Code mit Ihrer Kamera oder teilen Sie ihn mit Ihren Kontakten, um sie direkt zu unserer offiziellen Plattform weiterzuleiten.",'用相机扫描二维码，或与联系人分享，直接将他们引导至我们的官方平台。')}
              </p>

              {/* URL badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', background:'rgba(201,168,76,.08)', border:'1px solid rgba(201,168,76,.3)', marginBottom:24 }}>
                <span style={{ width:7, height:7, background:'#34d399', borderRadius:'50%', flexShrink:0, animation:'pulse 1.5s ease-in-out infinite' }}/>
                <span style={{ fontFamily:'var(--f-display)', fontSize:'.65rem', color:'var(--gold)', letterSpacing:'.12em' }}>
                  groupendoyeafrica.com
                </span>
              </div>

              {/* Action buttons */}
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button
                  onClick={()=>{
                    if(navigator.share){
                      navigator.share({ title:'Groupe Ndoye Africa Holding', text:"Découvrez la plateforme officielle de GNAH", url:'https://groupendoyeafrica.com' }).catch(()=>{});
                    } else {
                      navigator.clipboard.writeText('https://groupendoyeafrica.com').then(()=>alert('Lien copié !')).catch(()=>{});
                    }
                  }}
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 22px', background:'linear-gradient(135deg,#c9a84c,#e8c96a,#8b6914)', color:'var(--navy)', fontFamily:'var(--f-display)', fontSize:'.68rem', letterSpacing:'.14em', textTransform:'uppercase', border:'none', cursor:'pointer', transition:'all .3s' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(201,168,76,.35)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  {tl('Partager', 'Share', 'Compartir', 'Teilen','分享')}
                </button>
                <button
                  id="copy-qr-btn"
                  onClick={()=>{
                    navigator.clipboard.writeText('https://groupendoyeafrica.com').then(()=>{
                      const btn = document.getElementById('copy-qr-btn');
                      if(btn){ btn.textContent = tl('✓ Lien copié !', '✓ Link copied!', '✓ ¡Enlace copiado!', '✓ Link kopiert!','✓ 链接已复制！'); setTimeout(()=>{ if(btn) btn.textContent = tl('Copier le lien', 'Copy link', 'Copiar enlace', 'Link kopieren','复制链接'); }, 2500); }
                    }).catch(()=>{});
                  }}
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 22px', background:'transparent', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.68rem', letterSpacing:'.14em', textTransform:'uppercase', border:'1px solid rgba(201,168,76,.4)', cursor:'pointer', transition:'all .3s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(201,168,76,.08)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  {tl('Copier le lien', 'Copy link', 'Copiar enlace', 'Link kopieren','复制链接')}
                </button>
              </div>
            </div>

            {/* Right — QR Code */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
              {/* Gold frame */}
              <div style={{
                position:'relative', padding:3,
                background:'linear-gradient(135deg,#c9a84c,#e8c96a 30%,#8b6914 60%,#c9a84c)',
                boxShadow:'0 0 60px rgba(201,168,76,.35), 0 20px 60px rgba(0,0,0,.5)',
                animation:'qrPulse 3s ease-in-out infinite',
              }}>
                {/* Corner marks */}
                {[['top:0,left:0','border-top:3px solid var(--gold),border-left:3px solid var(--gold)'],['top:0,right:0','border-top:3px solid var(--gold),border-right:3px solid var(--gold)'],['bottom:0,left:0','border-bottom:3px solid var(--gold),border-left:3px solid var(--gold)'],['bottom:0,right:0','border-bottom:3px solid var(--gold),border-right:3px solid var(--gold)']].map(([pos],i)=>(
                  <div key={i} style={{ position:'absolute', width:14, height:14, ...Object.fromEntries(pos.split(',').map(p=>p.split(':'))) }}/>
                ))}
                <div style={{ background:'var(--navy)', padding:'clamp(14px,3vw,22px)' }}>
                  {/* QR rendered by useEffect */}
                  <div id="about-qr" style={{ display:'block' }}/>
                </div>
              </div>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.6rem', color:'rgba(201,168,76,.5)', letterSpacing:'.16em', textTransform:'uppercase', textAlign:'center' }}>
                {tl('Scanner avec votre appareil photo', 'Scan with your camera', 'Escanear con su cámara', 'Mit Kamera scannen','用相机扫描')}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes qrPulse {
            0%,100%{box-shadow:0 0 40px rgba(201,168,76,.2),0 20px 60px rgba(0,0,0,.5)}
            50%{box-shadow:0 0 80px rgba(201,168,76,.5),0 20px 60px rgba(0,0,0,.5)}
          }
          @keyframes pulse {0%,100%{opacity:1}50%{opacity:.3}}
        `}</style>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'var(--navy2)', padding:'72px 0', textAlign:'center' }}>
        <div className="container">
          <p style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:'1.05rem', color:'rgba(201,168,76,.65)', marginBottom:12 }}>
            For. Africa Continent
          </p>
          <h2 style={{ fontFamily:'var(--f-elegant)', fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--cream)', marginBottom:16 }}>
            {tl("Investissons Ensemble dans l'Avenir", "Let's Invest Together in the Future", "Invirtamos Juntos en el Futuro", "Investieren wir gemeinsam in die Zukunft",'共同投资未来')}
          </h2>
          <div style={{ width:60, height:2, background:'var(--gold)', margin:'0 auto 28px' }}/>
          <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(typeof SITE.waMsg==='object'?(SITE.waMsg[lang]||SITE.waMsg.fr):SITE.waMsg)}`}
            target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            {tl('Contactez-nous sur WhatsApp', 'Contact us on WhatsApp', 'Contáctenos en WhatsApp', 'Kontaktieren Sie uns per WhatsApp','通过WhatsApp联系我们')}
          </a>
        </div>
      </section>
    </main>
  );
}
