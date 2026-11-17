import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import PageHero from '../components/PageHero';
import { useContent } from '../services/ContentProvider';

function useInView(t=.08){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

// Les photos se gèrent dans l'administration (rubrique « Galerie ») ; copie de secours : GALLERY_ITEMS dans src/data/siteData.js.
const CATEGORIES = [
  { id:'all',      fr:'Tous',          en:'All',          es:'Todos',       de:'Alle' },
  { id:'overview', fr:'Vue Générale',  en:'Overview',     es:'Vista General',de:'Übersicht' },
  { id:'exterior', fr:'Extérieur',     en:'Exterior',     es:'Exterior',    de:'Außen' },
  { id:'interior', fr:'Intérieur',     en:'Interior',     es:'Interior',    de:'Innen' },
  { id:'plans',    fr:'Plans 3D',      en:'3D Plans',     es:'Planos 3D',   de:'3D Pläne' },
  { id:'buildings',fr:'Immeubles',     en:'Buildings',    es:'Edificios',   de:'Gebäude' },
];

// Lightbox component
function Lightbox({ item, items, onClose, onPrev, onNext, lang }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;
  const label = item[lang] || item.fr;

  return (
    <div
      onClick={onClose}
      style={{ position:'fixed', inset:0, background:'rgba(5,8,16,.96)', zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(8px)' }}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position:'absolute', top:20, right:24, background:'none', border:'none', color:'var(--gold)', fontSize:'1.6rem', cursor:'pointer', zIndex:2, lineHeight:1 }} aria-label="Fermer">&#10005;</button>

      {/* Prev */}
      <button onClick={(e)=>{e.stopPropagation();onPrev();}} style={{ position:'absolute', left:20, top:'50%', transform:'translateY(-50%)', background:'rgba(201,168,76,.15)', border:'1px solid rgba(201,168,76,.35)', color:'var(--gold)', width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1.2rem', zIndex:2 }}>&#8249;</button>

      {/* Next */}
      <button onClick={(e)=>{e.stopPropagation();onNext();}} style={{ position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', background:'rgba(201,168,76,.15)', border:'1px solid rgba(201,168,76,.35)', color:'var(--gold)', width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1.2rem', zIndex:2 }}>&#8250;</button>

      {/* Image */}
      <div onClick={e=>e.stopPropagation()} style={{ maxWidth:'90vw', maxHeight:'85vh', display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
        <img
          src={item.src}
          alt={label}
          onError={e=>{ e.target.src=item.fallback; }}
          style={{ maxWidth:'90vw', maxHeight:'75vh', objectFit:'contain', display:'block', boxShadow:'0 20px 60px rgba(0,0,0,.6)' }}
        />
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1rem', color:'var(--cream)', marginBottom:4 }}>{label}</div>
          <div style={{ fontFamily:'var(--f-display)', fontSize:'.58rem', letterSpacing:'.14em', color:'rgba(201,168,76,.5)', textTransform:'uppercase' }}>
            Groupe Ndoye Africa Holding — Résidence Yaye Dia
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Gallery() {
  const { GALLERY_ITEMS } = useContent();
  const { lang } = useLang();
  const [activeCat, setActiveCat] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [gridRef, gridVis] = useInView();
  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);

  const filtered = activeCat === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === activeCat);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto = () => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length);
  const nextPhoto = () => setLightboxIdx(i => (i + 1) % filtered.length);

  return (
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/cite-vue-aerienne.jpg"
        fallbackImg="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85"
        label={tl('Résidence Yaye Dia', 'Yaye Dia Residence', 'Residencia Yaye Dia', 'Yaye Dia Residenz','Yaye Dia住宅')}
        title={tl('Galerie de Photos', 'Photo Gallery', 'Galería de Fotos', 'Fotogalerie','图片库')}
        sub={tl('Découvrez la Cité Yaye Dia en images', 'Discover Yaye Dia City in pictures', 'Descubra la Ciudad Yaye Dia en imágenes', 'Entdecken Sie die Yaye Dia Stadt in Bildern','通过图片探索Yaye Dia城')}
        breadcrumbs={[{ label: tl('Galerie', 'Gallery', 'Galería', 'Galerie','图库') }]}
      />

      {/* CATEGORY FILTERS */}
      <section style={{ background:'var(--gray-50)', padding:'32px 0', borderBottom:'1px solid var(--gray-200)' }}>
        <div className="container">
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                style={{
                  padding:'9px 20px',
                  background: activeCat === cat.id ? 'var(--navy)' : 'var(--white)',
                  color: activeCat === cat.id ? 'var(--gold)' : 'var(--text-mid)',
                  border: activeCat === cat.id ? '1px solid var(--navy)' : '1px solid var(--gray-200)',
                  fontFamily:'var(--f-display)',
                  fontSize:'.68rem',
                  letterSpacing:'.1em',
                  textTransform:'uppercase',
                  cursor:'pointer',
                  transition:'var(--trans)',
                  borderRadius:2,
                }}
                onMouseEnter={e => { if(activeCat !== cat.id){ e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.color='var(--gold)'; }}}
                onMouseLeave={e => { if(activeCat !== cat.id){ e.currentTarget.style.borderColor='var(--gray-200)'; e.currentTarget.style.color='var(--text-mid)'; }}}
              >
                {cat[lang]||cat.fr}
                <span style={{ marginLeft:6, fontSize:'.58rem', opacity:.6 }}>
                  ({activeCat === cat.id ? filtered.length : (cat.id === 'all' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter(i=>i.cat===cat.id).length)})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`fade-up${gridVis?' visible':''}`}
                style={{ transitionDelay:`${(idx%6)*0.07}s`, cursor:'pointer', position:'relative', overflow:'hidden', aspectRatio:'4/3', background:'var(--gray-100)' }}
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.src}
                  alt={item[lang]||item.fr}
                  onError={e=>{ e.target.src=item.fallback; }}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .6s var(--ease)' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                />
                {/* Hover overlay */}
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(transparent 40%, rgba(5,8,16,.88) 100%)',
                  opacity:0, transition:'opacity .35s',
                  display:'flex', alignItems:'flex-end', padding:'16px',
                }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='1'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='0'}
                >
                  <div>
                    <div style={{ fontFamily:'var(--f-elegant)', fontSize:'.85rem', color:'var(--cream)', marginBottom:3, lineHeight:1.3 }}>{item[lang]||item.fr}</div>
                    <div style={{ fontFamily:'var(--f-display)', fontSize:'.52rem', letterSpacing:'.12em', color:'var(--gold)', textTransform:'uppercase' }}>
                      {tl('Cliquer pour agrandir', 'Click to enlarge', 'Clic para ampliar', 'Klicken zum Vergrößern','点击放大')}
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div style={{ position:'absolute', top:10, left:10, padding:'3px 9px', background:'rgba(5,8,16,.75)', backdropFilter:'blur(6px)', fontFamily:'var(--f-display)', fontSize:'.52rem', letterSpacing:'.1em', color:'var(--gold)', textTransform:'uppercase', border:'1px solid rgba(201,168,76,.2)' }}>
                  {(CATEGORIES.find(c=>c.id===item.cat)||{})[lang] || item.cat}
                </div>

                {/* Zoom icon */}
                <div style={{ position:'absolute', top:10, right:10, width:32, height:32, background:'rgba(201,168,76,.15)', border:'1px solid rgba(201,168,76,.4)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-mid)' }}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.82rem', letterSpacing:'.1em' }}>
                {tl('Aucune photo dans cette catégorie.', 'No photos in this category.', 'No hay fotos en esta categoría.', 'Keine Fotos in dieser Kategorie.','此分类暂无图片。')}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIdx !== null && (
        <Lightbox
          item={filtered[lightboxIdx]}
          items={filtered}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          lang={lang}
        />
      )}
    </main>
  );
}
