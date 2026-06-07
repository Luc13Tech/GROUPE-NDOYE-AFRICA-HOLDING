import React, { useRef, useState, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { PARTNERS_WORLD, AFRICA_PARTNERS, OPERATIONS } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.12){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

function getCustomPartners(){
  try{const s=localStorage.getItem('gnah_partners');if(s){const p=JSON.parse(s);if(Array.isArray(p)&&p.length>0)return p;}}catch{}
  return null;
}

const FLAGS={TR:'🇹🇷',CN:'🇨🇳',RU:'🇷🇺',US:'🇺🇸',MY:'🇲🇾',GB:'🇬🇧',IN:'🇮🇳'};
const AF_FLAGS={'Sénégal':'🇸🇳',"Côte d'Ivoire":'🇨🇮','Nigeria':'🇳🇬','Gabon':'🇬🇦','Ghana':'🇬🇭','Cameroun':'🇨🇲','Mali':'🇲🇱','Burkina Faso':'🇧🇫','Guinée':'🇬🇳','Togo':'🇹🇬','Bénin':'🇧🇯'};

// Infinite horizontal ticker
function Ticker({items,speed=22}){
  const tripled=[...items,...items,...items];
  const dur=speed+'s';
  return(
    <div style={{overflow:'hidden',background:'var(--navy2)',borderTop:'1px solid rgba(201,168,76,.18)',borderBottom:'1px solid rgba(201,168,76,.18)',padding:'11px 0',position:'relative'}}>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:64,background:'linear-gradient(90deg,var(--navy2),transparent)',zIndex:2,pointerEvents:'none'}}/>
      <div style={{position:'absolute',right:0,top:0,bottom:0,width:64,background:'linear-gradient(270deg,var(--navy2),transparent)',zIndex:2,pointerEvents:'none'}}/>
      <div style={{display:'flex',width:'max-content',animation:`gnah-ticker ${dur} linear infinite`}}>
        {tripled.map((it,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'0 18px',whiteSpace:'nowrap',flexShrink:0}}>
            <span style={{fontSize:'1.1rem'}}>{it.flag}</span>
            <span style={{fontFamily:'var(--f-display)',fontSize:'.66rem',color:'rgba(245,240,232,.7)',letterSpacing:'.1em',textTransform:'uppercase'}}>{it.name}</span>
            <span style={{color:'var(--gold)',fontSize:'.75rem',marginLeft:6}}>✦</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes gnah-ticker{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
}

export default function Partners(){
  const{lang}=useLang();
  const[wpRef,wpVis]=useInView();
  const[opRef,opVis]=useInView();
  const[afRef,afVis]=useInView();
  const[custom,setCustom]=useState(getCustomPartners);
  const tl=(fr,en,es,de,zh)=>({fr,en,es,de,zh}[lang]||fr);

  useEffect(()=>{
    const h=()=>setCustom(getCustomPartners());
    window.addEventListener('storage',h);
    const iv=setInterval(h,2000);
    return()=>{window.removeEventListener('storage',h);clearInterval(iv);};
  },[]);

  const displayPartners=custom||PARTNERS_WORLD;

  // World ticker
  const worldItems=PARTNERS_WORLD.map(p=>({
    flag:FLAGS[p.code]||'🌍',
    name:(p[lang]||p.fr).country,
  }));
  // Africa ticker
  const africaItems=AFRICA_PARTNERS.map(c=>({
    flag:AF_FLAGS[c]||'🌍',
    name:c,
  }));

  return(
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/cite-vue-aerienne.jpg"
        label={tl('Réseau mondial','Global network','Red mundial','Weltweites Netzwerk','全球网络')}
        title={tl('Nos Partenaires','Our Partners','Nuestros Socios','Unsere Partner','我们的合作伙伴')}
        sub={tl("Un réseau mondial pour bâtir l'Afrique de demain","A global network to build tomorrow's Africa","Una red mundial para construir el África del mañana","Ein globales Netzwerk für das Afrika von morgen","共建明日非洲的全球网络")}
        breadcrumbs={[{label:tl('Partenaires','Partners','Socios','Partner','合作伙伴')}]}
      />

      {/* WORLD PARTNERS */}
      <section className="section" ref={wpRef}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="sec-label" style={{display:'inline-flex'}}>2015 — 2025</div>
            <h2 className="sec-title-light" style={{marginTop:6}}>
              {tl('7 Partenaires dans le Monde','7 Global Partners','7 Socios Mundiales','7 Weltweite Partner','全球7大合作伙伴')}
            </h2>
            <div className="divider-gold-c"/>
            <p style={{color:'var(--text-mid)',maxWidth:620,margin:'0 auto',fontSize:'.88rem',lineHeight:1.8}}>
              {tl(
                "Nous disposons de partenaires techniques, financiers, commerciaux et bancaires de nombreuses nationalités à travers le monde.",
                "We have technical, financial, commercial and banking partners of many nationalities throughout the world.",
                "Disponemos de socios técnicos, financieros, comerciales y bancarios de muchas nacionalidades.",
                "Wir haben technische, finanzielle und kommerzielle Partner vieler Nationalitäten weltweit.",
                "我们拥有来自世界各地的技术、金融、商业和银行合作伙伴。"
              )}
            </p>
          </div>

          <div className="grid-3" style={{marginBottom:20}}>
            {PARTNERS_WORLD.map((p,i)=>(
              <div key={p.code} className={`card-white fade-up${wpVis?' visible':''} delay-${(i%3)+1}`}>
                <div style={{fontSize:'2.4rem',marginBottom:12}}>{FLAGS[p.code]||'🌍'}</div>
                <h3 style={{fontFamily:'var(--f-display)',fontSize:'clamp(.85rem,1.5vw,1rem)',color:'var(--text-dark)',letterSpacing:'.1em',marginBottom:10}}>
                  {(p[lang]||p.fr).country}
                </h3>
                <p style={{fontSize:'.84rem',color:'var(--text-mid)',lineHeight:1.75}}>
                  {(p[lang]||p.fr).focus}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* WORLD TICKER */}
        <Ticker items={worldItems} speed={18}/>
      </section>

      {/* OPERATIONS TABLE */}
      <section style={{background:'var(--gray-50)',padding:'72px 0'}} ref={opRef}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="sec-label" style={{display:'inline-flex'}}>
              {tl('Projets actifs','Active projects','Proyectos activos','Aktive Projekte','活跃项目')}
            </div>
            <h2 className="sec-title-light" style={{marginTop:6}}>
              {tl('Opérations en Cours','Current Operations','Operaciones en Curso','Laufende Operationen','当前运营项目')}
            </h2>
            <div className="divider-gold-c"/>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:520}}>
              <thead>
                <tr>
                  {[tl('Pays','Country','País','Land','国家'),tl('Projet','Project','Proyecto','Projekt','项目'),tl('Valeur','Value','Valor','Wert','价值'),tl('Type','Type','Tipo','Typ','类型')].map((h,i)=>(
                    <th key={i} style={{background:'rgba(201,168,76,.1)',color:'var(--gold)',fontFamily:'var(--f-display)',fontSize:'.6rem',letterSpacing:'.16em',textTransform:'uppercase',padding:'12px 14px',textAlign:'left',borderBottom:'2px solid rgba(201,168,76,.2)',whiteSpace:'nowrap'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OPERATIONS.map((op,i)=>(
                  <tr key={i} className={`fade-up${opVis?' visible':''} delay-${i+1}`}>
                    <td style={{padding:'12px 14px',borderBottom:'1px solid var(--gray-200)',fontFamily:'var(--f-display)',fontSize:'.78rem',color:'var(--text-dark)',fontWeight:600}}>{op.country}</td>
                    <td style={{padding:'12px 14px',borderBottom:'1px solid var(--gray-200)',fontSize:'.85rem',color:'var(--text-mid)'}}>{op[lang]||op.fr}</td>
                    <td style={{padding:'12px 14px',borderBottom:'1px solid var(--gray-200)',fontFamily:'var(--f-display)',color:'var(--gold)',fontWeight:600,whiteSpace:'nowrap'}}>{op.value}</td>
                    <td style={{padding:'12px 14px',borderBottom:'1px solid var(--gray-200)'}}>
                      <span style={{display:'inline-block',padding:'3px 10px',background:'rgba(201,168,76,.1)',color:'var(--gold)',fontFamily:'var(--f-display)',fontSize:'.58rem',letterSpacing:'.1em'}}>{op.type}</span>
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
          <div style={{textAlign:'center',marginBottom:40}}>
            <div className="sec-label" style={{display:'inline-flex'}}>
              {tl('Présence continentale','Continental presence','Presencia continental','Kontinentale Präsenz','大陆存在')}
            </div>
            <h2 className="sec-title-light" style={{marginTop:6}}>
              {tl('Pays Partenaires en Afrique','African Partner Countries','Países Socios en África','Afrikanische Partnerländer','非洲合作国家')}
            </h2>
            <div className="divider-gold-c"/>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center',marginBottom:24}}>
            {AFRICA_PARTNERS.map((p,i)=>(
              <div key={p} className={`fade-up${afVis?' visible':''} delay-${(i%6)+1}`}
                style={{padding:'10px 18px',border:'1px solid var(--gray-200)',background:'var(--white)',fontFamily:'var(--f-display)',fontSize:'.78rem',letterSpacing:'.1em',color:'var(--text-dark)',transition:'var(--trans)',cursor:'default',display:'flex',alignItems:'center',gap:8}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';e.currentTarget.style.background='rgba(201,168,76,.04)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--gray-200)';e.currentTarget.style.color='var(--text-dark)';e.currentTarget.style.background='var(--white)';}}>
                <span style={{fontSize:'1.1rem'}}>{AF_FLAGS[p]||'🌍'}</span>{p}
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginBottom:8}}>
            <div style={{fontFamily:'var(--f-serif)',fontStyle:'italic',fontSize:'1rem',color:'var(--text-mid)'}}>
              {tl("11 pays partenaires — Afrique de l'Ouest, Centrale et Australe","11 partner countries — West, Central and Southern Africa","11 países socios — África Occidental, Central y Austral","11 Partnerländer — West-, Zentral- und Südafrika","11个合作国家 — 西非、中非和南非")}
            </div>
          </div>
        </div>
        {/* AFRICA TICKER */}
        <Ticker items={africaItems} speed={16}/>
      </section>
    </main>
  );
}
