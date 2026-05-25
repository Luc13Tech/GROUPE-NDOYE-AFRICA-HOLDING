import React, { useRef, useState, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { PARTNERS_WORLD, AFRICA_PARTNERS, OPERATIONS } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.12){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

export default function Partners() {
  const { lang } = useLang();
  const [wpRef, wpVis]   = useInView();
  const [opRef, opVis]   = useInView();
  const [afRef, afVis]   = useInView();
  const tl = (fr,en,es,de) => ({fr,en,es,de}[lang]||fr);

  return (
    <main className="page-white">
      <PageHero
        bgImg="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=85"
        label={tl('Réseau mondial','Global network','Red mundial','Weltweites Netzwerk')}
        title={tl('Nos Partenaires','Our Partners','Nuestros Socios','Unsere Partner')}
        sub={tl("Un réseau mondial pour bâtir l'Afrique de demain","A global network to build tomorrow's Africa","Una red mundial para construir el África del mañana","Ein globales Netzwerk für das Afrika von morgen")}
        breadcrumbs={[{ label: tl('Partenaires','Partners','Socios','Partner') }]}
      />

      {/* WORLD PARTNERS */}
      <section className="section" ref={wpRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>2015 — 2025</div>
            <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Partenaires dans le Monde','Global Partners','Socios Mundiales','Weltweite Partner')}</h2>
            <div className="divider-gold-c"/>
            <p style={{ color:'var(--text-mid)', maxWidth:600, margin:'0 auto', fontSize:'.88rem', lineHeight:1.8 }}>
              {tl("Nous disposons de partenaires techniques, financiers, commerciaux et bancaires de nombreuses nationalités à travers le monde.",
                  "We have technical, financial, commercial and banking partners of many nationalities throughout the world.",
                  "Disponemos de socios técnicos, financieros, comerciales y bancarios de muchas nacionalidades en todo el mundo.",
                  "Wir haben technische, finanzielle, kommerzielle und Bankpartner vieler Nationalitäten auf der ganzen Welt.")}
            </p>
          </div>
          <div className="grid-3">
            {PARTNERS_WORLD.map((p,i) => (
              <div key={p.code} className={`card-white fade-up${wpVis?' visible':''} delay-${(i%3)+1}`}>
                <div style={{ fontSize:'2.6rem', marginBottom:14 }}>
                  {p.code==='TR'?'🇹🇷':p.code==='CN'?'🇨🇳':p.code==='RU'?'🇷🇺':p.code==='US'?'🇺🇸':p.code==='MY'?'🇲🇾':'🇬🇧'}
                </div>
                <h3 style={{ fontFamily:'var(--f-display)', fontSize:'1rem', color:'var(--text-dark)', letterSpacing:'.1em', marginBottom:12 }}>
                  {(p[lang]||p.fr).country}
                </h3>
                <p style={{ fontSize:'.84rem', color:'var(--text-mid)', lineHeight:1.75 }}>
                  {(p[lang]||p.fr).focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONS TABLE */}
      <section style={{ background:'var(--gray-50)', padding:'72px 0' }} ref={opRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Projets actifs','Active projects','Proyectos activos','Aktive Projekte')}</div>
            <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Opérations en Cours','Current Operations','Operaciones en Curso','Laufende Operationen')}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  {[
                    tl('Pays','Country','País','Land'),
                    tl('Projet','Project','Proyecto','Projekt'),
                    tl('Valeur','Value','Valor','Wert'),
                    tl('Type','Type','Tipo','Typ'),
                  ].map((h,i) => (
                    <th key={i} style={{ background:'rgba(201,168,76,.1)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.6rem', letterSpacing:'.16em', textTransform:'uppercase', padding:'13px 16px', textAlign:'left', borderBottom:'2px solid rgba(201,168,76,.2)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OPERATIONS.map((op,i) => (
                  <tr key={i} className={`fade-up${opVis?' visible':''} delay-${i+1}`}>
                    <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--gray-200)', fontFamily:'var(--f-display)', fontSize:'.78rem', color:'var(--text-dark)', fontWeight:600 }}>{op.country}</td>
                    <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--gray-200)', fontSize:'.85rem', color:'var(--text-mid)' }}>{op[lang]||op.fr}</td>
                    <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--gray-200)', fontFamily:'var(--f-display)', color:'var(--gold)', fontWeight:600, whiteSpace:'nowrap' }}>{op.value}</td>
                    <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--gray-200)' }}>
                      <span style={{ display:'inline-block', padding:'3px 10px', background:'rgba(201,168,76,.1)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.58rem', letterSpacing:'.1em' }}>{op.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AFRICA PARTNERS */}
      <section className="section" ref={afRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Présence continentale','Continental presence','Presencia continental','Kontinentale Präsenz')}</div>
            <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Pays Partenaires en Afrique','African Partner Countries','Países Socios en África','Afrikanische Partnerländer')}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
            {AFRICA_PARTNERS.map((p,i) => (
              <div key={p} className={`fade-up${afVis?' visible':''} delay-${(i%6)+1}`}
                style={{ padding:'10px 20px', border:'1px solid var(--gray-200)', background:'var(--white)', fontFamily:'var(--f-display)', fontSize:'.78rem', letterSpacing:'.1em', color:'var(--text-dark)', transition:'var(--trans)', cursor:'default', borderRadius:2 }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';e.currentTarget.style.background='rgba(201,168,76,.04)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--gray-200)';e.currentTarget.style.color='var(--text-dark)';e.currentTarget.style.background='var(--white)';}}
              >
                {p}
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:32 }}>
            <div style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:'1rem', color:'var(--text-mid)' }}>
              {tl('11 pays partenaires — Afrique de l\'Ouest, Centrale et Australe','11 partner countries — West, Central and Southern Africa','11 países socios — África Occidental, Central y Austral','11 Partnerländer — West-, Zentral- und Südafrika')}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
        }
