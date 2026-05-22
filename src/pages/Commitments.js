import React, { useRef, useState, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { COMMITMENTS, AFRICA_OPPS } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.15){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

const ICONS = {
  target:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  eco:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 8C8 10 5.9 16.17 3.82 20.37M2 21s0-3 3-7c3.5-4.5 8-6.2 12-7C20 6 22 4 22 4c0 7-3 12-12 14"/></svg>,
  community:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  star:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
};

export default function Commitments() {
  const { lang } = useLang();
  const [cardsRef, cardsVis] = useInView();
  const [statsRef, statsVis] = useInView();
  const tl = (fr,en,es,de) => ({fr,en,es,de}[lang]||fr);

  const AFRICA_STATS = [
    { val:'23%',  fr:"de la surface de la planète",           en:"of Earth's surface",              es:"de la superficie terrestre",       de:"der Erdoberfläche" },
    { val:'24,3%',fr:"des terres agricoles mondiales",         en:"of global agricultural land",      es:"de las tierras agrícolas mundiales",de:"der weltweiten Agrarfläche" },
    { val:'90%',  fr:"des réserves mondiales de platine",      en:"of world platinum reserves",       es:"de las reservas mundiales de platino",de:"der weltweiten Platinreserven" },
    { val:'30%',  fr:"des ressources solaires mondiales",      en:"of global solar resources",        es:"de los recursos solares mundiales", de:"der weltweiten Solarressourcen" },
  ];

  return (
    <main className="page-white">
      <PageHero
        bgImg="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=85"
        label={tl('Nos valeurs','Our values','Nuestros valores','Unsere Werte')}
        title={tl('Nos Engagements','Our Commitments','Nuestros Compromisos','Unsere Verpflichtungen')}
        sub={tl('Ce en quoi nous croyons et ce que nous défendons','What we believe in and what we stand for','En lo que creemos y lo que defendemos','Was wir glauben und wofür wir stehen')}
        breadcrumbs={[{ label: tl('Engagements','Commitments','Compromisos','Verpflichtungen') }]}
      />

      {/* COMMITMENTS GRID */}
      <section className="section" ref={cardsRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Valeurs fondamentales','Core values','Valores fundamentales','Grundwerte')}</div>
            <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Ce Qui Nous Guide','What Guides Us','Lo Que Nos Guía','Was Uns Leitet')}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div className="grid-2" style={{ gap:24 }}>
            {COMMITMENTS.map((c,i) => (
              <div key={i} className={`card-white fade-up${cardsVis?' visible':''} delay-${i+1}`} style={{ display:'flex', gap:22, alignItems:'flex-start' }}>
                <div style={{ width:60, height:60, border:'1px solid rgba(201,168,76,.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)', flexShrink:0 }}>
                  {ICONS[c.icon]}
                </div>
                <div>
                  <h3 style={{ fontFamily:'var(--f-display)', fontSize:'.9rem', color:'var(--text-dark)', letterSpacing:'.06em', marginBottom:10 }}>
                    {(c[lang]||c.fr).title}
                  </h3>
                  <p style={{ fontSize:'.84rem', color:'var(--text-mid)', lineHeight:1.85 }}>
                    {(c[lang]||c.fr).desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AFRICA STATS */}
      <section style={{ background:'var(--navy)', padding:'80px 0' }} ref={statsRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Le continent africain','The African continent','El continente africano','Der afrikanische Kontinent')}</div>
            <h2 className="sec-title-dark" style={{ marginTop:6 }}>{tl("L'Afrique en Chiffres","Africa by the Numbers","África en Cifras","Afrika in Zahlen")}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div className="grid-4">
            {AFRICA_STATS.map((s,i) => (
              <div key={i} className={`fade-up${statsVis?' visible':''} delay-${i+1}`} style={{ textAlign:'center', padding:'32px 20px', border:'var(--border-gold)', background:'rgba(201,168,76,.03)' }}>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'2.2rem', color:'var(--gold)', marginBottom:10 }}>{s.val}</div>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.62rem', color:'rgba(200,195,186,.55)', letterSpacing:'.1em', lineHeight:1.6 }}>{s[lang]||s.fr}</div>
                <div style={{ width:24, height:2, background:'var(--gold)', margin:'14px auto 0', opacity:.4 }}/>
              </div>
            ))}
          </div>
          <div style={{ marginTop:48, background:'var(--navy2)', border:'var(--border-gold)', padding:'32px 40px', maxWidth:760, margin:'48px auto 0' }}>
            <p style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:'1rem', color:'rgba(245,240,232,.65)', lineHeight:1.9, textAlign:'center' }}>
              {AFRICA_OPPS[lang]||AFRICA_OPPS.fr}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
