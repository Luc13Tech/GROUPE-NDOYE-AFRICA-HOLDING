import React, { useRef, useState, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import PageHero from '../components/PageHero';

function useInView(t=.1){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

// ══════════════════════════════════════════════════════════════
//  VIDEOS — Ajoutez vos liens ici
//  Pour chaque vidéo :
//    url       → lien YouTube, TikTok, Facebook, etc.
//    thumbnail → image de prévisualisation (locale ou Unsplash)
//    platform  → 'youtube' | 'tiktok' | 'facebook' | 'instagram'
// ══════════════════════════════════════════════════════════════
const VIDEOS = [
  {
    id: 1,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=VOTRE_LIEN_ICI',           // ← Remplacez par votre lien
    thumbnail: '/Images/yaye-dia/cite-vue-aerienne.jpg',
    fallback: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85',
    duration: '2:45',
    fr: { title:'Résidence Yaye Dia — Présentation Officielle',     desc:'Découvrez en vidéo notre programme immobilier d\'exception : 300 villas haut standing en Région de Thiès, Sénégal.' },
    en: { title:'Yaye Dia Residence — Official Presentation',       desc:'Discover our exceptional real estate programme in video: 300 high-end villas in the Thiès Region, Senegal.' },
    es: { title:'Residencia Yaye Dia — Presentación Oficial',       desc:'Descubra en video nuestro excepcional programa inmobiliario: 300 villas de alto standing en la Región de Thiès, Senegal.' },
    de: { title:'Yaye Dia Residenz — Offizielle Präsentation',      desc:'Entdecken Sie unser außergewöhnliches Immobilienprogramm im Video: 300 hochwertige Villen in der Thiès-Region, Senegal.' },
    zh: { title:'Yaye Dia住宅 — 官方介绍',      desc:'通过视频探索我们卓越的房地产项目：塞内加尔蒂耶斯地区的300栋高档别墅。' },
  },
  {
    id: 2,
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@assane.design.con',                // ← Remplacez par votre lien TikTok
    thumbnail: '/Images/yaye-dia/villa-f4duplex-nuit.jpg',
    fallback: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85',
    duration: '0:58',
    fr: { title:'Cité Yaye Dia — Vue Nuit Spectaculaire',           desc:'La Cité Yaye Dia illuminée de nuit. Nos villas F4 Duplex dans toute leur splendeur sous un ciel étoilé.' },
    en: { title:'Yaye Dia City — Spectacular Night View',           desc:'Yaye Dia City illuminated at night. Our F4 Duplex villas in all their splendour under a starry sky.' },
    es: { title:'Ciudad Yaye Dia — Vista Nocturna Espectacular',    desc:'La Ciudad Yaye Dia iluminada de noche. Nuestras villas F4 Dúplex en todo su esplendor bajo un cielo estrellado.' },
    de: { title:'Yaye Dia Stadt — Spektakuläre Nachtansicht',       desc:'Die Yaye Dia Stadt bei Nacht beleuchtet. Unsere F4 Duplex Villen in voller Pracht unter einem Sternenhimmel.' },
    zh: { title:'Yaye Dia城 — 壮观夜景',       desc:'夜幕下灯火璧煌的Yaye Dia城。我们的F4复式别墅在星空下尽显华丽风采。' },
  },
  {
    id: 3,
    platform: 'facebook',
    url: 'https://www.facebook.com/groupendoyeafricaholding',        // ← Remplacez par votre lien
    thumbnail: '/Images/yaye-dia/cite-plan-top.jpg',
    fallback: 'https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=85',
    duration: '4:10',
    fr: { title:'Plan Masse — 300 Villas Tracées',                  desc:'Vue aérienne du plan masse de la Cité Yaye Dia. 300 villas soigneusement tracées sur 225 m² chacune.' },
    en: { title:'Site Plan — 300 Plotted Villas',                   desc:'Aerial view of the Yaye Dia City site plan. 300 carefully plotted villas on 225 m² each.' },
    es: { title:'Plan de Masa — 300 Villas Trazadas',               desc:'Vista aérea del plan de masa de la Ciudad Yaye Dia. 300 villas cuidadosamente trazadas en 225 m² cada una.' },
    de: { title:'Lageplan — 300 Geplante Villen',                   desc:'Luftaufnahme des Lageplans der Yaye Dia Stadt. 300 sorgfältig geplante Villen auf je 225 m².' },
    zh: { title:'总平面图 — 300栋规划别墅',                   desc:'Yaye Dia城总平面图鸟瞰图。300栋精心规划的别墅，每栋占地225平方米。' },
  },
  {
    id: 4,
    platform: 'instagram',
    url: 'https://www.instagram.com/assanedesignconception',         // ← Remplacez par votre lien
    thumbnail: '/Images/yaye-dia/cite-commodites-vue.jpg',
    fallback: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85',
    duration: '1:30',
    fr: { title:'Commodités — Une Cité Complète',                   desc:'Complexe sportif, terrain omnisports, mosquée, centre commercial, district sanitaire — tout ce dont vous avez besoin.' },
    en: { title:'Amenities — A Complete City',                      desc:'Sports complex, multi-purpose field, mosque, shopping centre, health district — everything you need.' },
    es: { title:'Comodidades — Una Ciudad Completa',                desc:'Complejo deportivo, campo polideportivo, mezquita, centro comercial, distrito sanitario: todo lo que necesita.' },
    de: { title:'Annehmlichkeiten — Eine vollständige Stadt',       desc:'Sportkomplex, Mehrzweckspielfeld, Moschee, Einkaufszentrum, Gesundheitsbezirk — alles was Sie brauchen.' },
    zh: { title:'配套设施 — 一座完整的城市',       desc:'体育中心、多功能运动场、清真寺、购物中心、医疗区 — 应有尽有。' },
  },
];

const PLATFORM_CONFIG = {
  youtube:   { label:'YouTube',   color:'#FF0000', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20.06 12 20.06 12 20.06s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
  tiktok:    { label:'TikTok',    color:'#000000', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg> },
  facebook:  { label:'Facebook',  color:'#1877F2', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  instagram: { label:'Instagram', color:'#E1306C', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
};

const PlayIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

export default function Videos() {
  const { lang } = useLang();
  const [gridRef, gridVis] = useInView();
  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);

  return (
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/villa-f5-facade3.jpg"
        fallbackImg="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85"
        label={tl('Nos Réalisations', 'Our Achievements', 'Nuestras Realizaciones', 'Unsere Realisierungen','我们的成就')}
        title={tl('Nos Vidéos', 'Our Videos', 'Nuestros Videos', 'Unsere Videos','我们的视频')}
        sub={tl('Visitez la Cité Yaye Dia en vidéo', 'Visit Yaye Dia City in video', 'Visite la Ciudad Yaye Dia en video', 'Besuchen Sie die Yaye Dia Stadt im Video','通过视频参观Yaye Dia城')}
        breadcrumbs={[{ label: tl('Vidéos', 'Videos', 'Videos', 'Videos','视频') }]}
      />

      {/* INTRO */}
      <section style={{ background:'var(--gray-50)', padding:'48px 0 32px', borderBottom:'1px solid var(--gray-200)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Contenu vidéo', 'Video content', 'Contenido en video', 'Videoinhalt','视频内容')}</div>
          <h2 className="sec-title-light" style={{ marginTop:6 }}>
            {tl('Plongez dans la Cité Yaye Dia', 'Dive into Yaye Dia City', 'Sumérgete en la Ciudad Yaye Dia', 'Tauchen Sie ein in die Yaye Dia Stadt','沉浸式体验Yaye Dia城')}
          </h2>
          <div className="divider-gold-c"/>
          <p style={{ color:'var(--text-mid)', maxWidth:600, margin:'0 auto', fontSize:'.88rem', lineHeight:1.8 }}>
            {tl("Nos vidéos vous permettent de visiter virtuellement la Résidence Yaye Dia, de découvrir chaque villa, les commodités et l'environnement exceptionnel de la cité.", "Our videos allow you to virtually visit Yaye Dia Residence, discover each villa, the amenities and the exceptional environment of the city.", "Nuestros videos le permiten visitar virtualmente la Residencia Yaye Dia, descubrir cada villa, las comodidades y el entorno excepcional de la ciudad.", "Unsere Videos ermöglichen es Ihnen, die Yaye Dia Residenz virtuell zu besuchen, jede Villa, die Annehmlichkeiten und das außergewöhnliche Stadtumfeld zu entdecken.",'我们的视频让您虚拟参观Yaye Dia住宅，探索每栋别墅并跟踪施工进展。')}
          </p>
        </div>
      </section>

      {/* VIDEO GRID */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
            {VIDEOS.map((video, idx) => {
              const platform = PLATFORM_CONFIG[video.platform] || PLATFORM_CONFIG.youtube;
              const info = video[lang] || video.fr;
              return (
                <div
                  key={video.id}
                  className={`fade-up${gridVis?' visible':''}`}
                  style={{ transitionDelay:`${(idx%4)*0.1}s`, background:'var(--white)', border:'1px solid var(--gray-200)', overflow:'hidden', transition:'var(--trans)', boxShadow:'var(--shadow-sm)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; e.currentTarget.style.borderColor='var(--gold)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.borderColor='var(--gray-200)'; }}
                >
                  {/* THUMBNAIL */}
                  <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ display:'block', position:'relative', overflow:'hidden', aspectRatio:'16/9', background:'var(--navy)' }}>
                    <img
                      src={video.thumbnail}
                      alt={info.title}
                      onError={e=>{ e.target.src=video.fallback; }}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .6s var(--ease)' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                    />
                    {/* Dark overlay */}
                    <div style={{ position:'absolute', inset:0, background:'rgba(5,8,16,.45)' }}/>

                    {/* Play button */}
                    <div style={{
                      position:'absolute', top:'50%', left:'50%',
                      transform:'translate(-50%,-50%)',
                      width:64, height:64, borderRadius:'50%',
                      background:'rgba(201,168,76,.9)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'transform .3s, background .3s',
                      boxShadow:'0 4px 20px rgba(0,0,0,.4)',
                    }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-50%,-50%) scale(1.15)'; e.currentTarget.style.background='var(--gold)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform='translate(-50%,-50%) scale(1)'; e.currentTarget.style.background='rgba(201,168,76,.9)'; }}
                    >
                      <PlayIcon/>
                    </div>

                    {/* Duration badge */}
                    {video.duration && (
                      <div style={{ position:'absolute', bottom:10, right:10, background:'rgba(5,8,16,.85)', color:'var(--cream)', fontFamily:'var(--f-display)', fontSize:'.62rem', letterSpacing:'.06em', padding:'3px 8px' }}>
                        {video.duration}
                      </div>
                    )}

                    {/* Platform badge */}
                    <div style={{
                      position:'absolute', top:10, left:10,
                      display:'flex', alignItems:'center', gap:6,
                      background:'rgba(5,8,16,.85)', backdropFilter:'blur(6px)',
                      padding:'4px 10px', border:'1px solid rgba(255,255,255,.1)',
                    }}>
                      <span style={{ color: platform.color }}>{platform.icon}</span>
                      <span style={{ fontFamily:'var(--f-display)', fontSize:'.56rem', letterSpacing:'.1em', color:'var(--cream)', textTransform:'uppercase' }}>
                        {platform.label}
                      </span>
                    </div>
                  </a>

                  {/* CONTENT */}
                  <div style={{ padding:'20px 22px' }}>
                    <div style={{ width:'100%', height:2, background:'linear-gradient(90deg,var(--gold),transparent)', marginBottom:14 }}/>
                    <h3 style={{ fontFamily:'var(--f-display)', fontSize:'.88rem', color:'var(--text-dark)', letterSpacing:'.05em', marginBottom:10, lineHeight:1.4 }}>
                      {info.title}
                    </h3>
                    <p style={{ fontSize:'.82rem', color:'var(--text-mid)', lineHeight:1.75, marginBottom:16 }}>
                      {info.desc}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display:'inline-flex', alignItems:'center', gap:8,
                        padding:'9px 18px',
                        background: platform.color,
                        color:'#fff',
                        fontFamily:'var(--f-display)',
                        fontSize:'.65rem',
                        letterSpacing:'.1em',
                        textTransform:'uppercase',
                        textDecoration:'none',
                        transition:'var(--trans-f)',
                        opacity:1,
                      }}
                      onMouseEnter={e=>{ e.currentTarget.style.opacity='.85'; e.currentTarget.style.transform='translateY(-1px)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}
                    >
                      {platform.icon}
                      {tl('Regarder la vidéo', 'Watch the video', 'Ver el video', 'Video ansehen','观看视频')}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOCIAL CTA */}
      <section style={{ background:'var(--navy)', padding:'64px 0' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Suivez-nous', 'Follow us', 'Síganos', 'Folgen Sie uns','关注我们')}</div>
          <h2 className="sec-title-dark" style={{ marginTop:6 }}>
            {tl('Retrouvez-Nous sur les Réseaux', 'Find Us on Social Media', 'Encuéntrenos en las Redes', 'Finden Sie uns in den sozialen Medien','在社交媒体上找到我们')}
          </h2>
          <div className="divider-gold-c"/>
          <p style={{ color:'rgba(200,195,186,.55)', maxWidth:500, margin:'0 auto 32px', fontSize:'.88rem', lineHeight:1.8 }}>
            {tl("Suivez nos pages pour ne manquer aucune actualité, vidéo exclusive et mise à jour de la Résidence Yaye Dia.", "Follow our pages to never miss any news, exclusive video or update from Yaye Dia Residence.", "Siga nuestras páginas para no perderse ninguna noticia, video exclusivo o actualización de la Residencia Yaye Dia.", "Folgen Sie unseren Seiten, um keine Neuigkeiten, exklusiven Videos oder Updates der Yaye Dia Residenz zu verpassen.",'关注我们的页面，不错过任何Yaye Dia住宅的新闻、独家视频和更新。')}
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { href:'https://www.youtube.com/@VOTRE_CHAINE', label:'YouTube',   bg:'#FF0000' },
              { href:'https://www.tiktok.com/@assane.design.con', label:'TikTok', bg:'#000' },
              { href:'https://www.instagram.com/assanedesignconception', label:'Instagram', bg:'#E1306C' },
              { href:'https://www.facebook.com/groupendoyeafricaholding', label:'Facebook', bg:'#1877F2' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 22px', background:s.bg, color:'#fff', fontFamily:'var(--f-display)', fontSize:'.68rem', letterSpacing:'.1em', textDecoration:'none', transition:'var(--trans-f)' }}
                onMouseEnter={e=>{ e.currentTarget.style.opacity='.85'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
