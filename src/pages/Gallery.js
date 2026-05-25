import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import PageHero from '../components/PageHero';

function useInView(t=.08){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

// ── All gallery photos from your captures + Unsplash for extras
const GALLERY_ITEMS = [
  // Category: Vue générale / Overview
  { id:1,  cat:'overview', src:'/Images/yaye-dia/cite-vue-aerienne.jpg',   fallback:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85', fr:'Vue aérienne — Cité Yaye Dia complète',      en:'Aerial view — Complete Yaye Dia City',        es:'Vista aérea — Ciudad Yaye Dia completa',      de:'Luftaufnahme — Vollständige Yaye Dia Stadt' },
  { id:2,  cat:'overview', src:'/Images/yaye-dia/cite-plan-top.jpg',       fallback:'https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=85', fr:'Plan de masse — 300 villas tracées',          en:'Site plan — 300 plotted villas',              es:'Plan de masa — 300 villas trazadas',           de:'Lageplan — 300 geplante Villen' },
  { id:3,  cat:'overview', src:'/Images/yaye-dia/cite-commodites-vue.jpg', fallback:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85', fr:'Vue générale — Commodités visibles',          en:'General view — Visible amenities',            es:'Vista general — Comodidades visibles',         de:'Gesamtansicht — Sichtbare Annehmlichkeiten' },
  { id:4,  cat:'overview', src:'/Images/yaye-dia/cite-voirie.jpg',         fallback:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85', fr:'Voirie résidentielle — Palmiers & verdure',   en:'Residential road — Palm trees & greenery',    es:'Vía residencial — Palmeras y vegetación',     de:'Wohnstraße — Palmen und Grünflächen' },
  { id:5,  cat:'overview', src:'/Images/yaye-dia/commodites.jpg',          fallback:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85', fr:'Vue aérienne — Rond-point et palmiers',       en:'Aerial — Roundabout and palm trees',          es:'Aérea — Rotonda y palmeras',                  de:'Luftaufnahme — Kreisverkehr und Palmen' },

  // Category: Villas extérieur / Exterior
  { id:6,  cat:'exterior', src:'/Images/yaye-dia/villa-f3-facade.jpg',     fallback:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=85', fr:'Villa F3 — Façade avec jardin tropical',      en:'F3 Villa — Facade with tropical garden',      es:'Villa F3 — Fachada con jardín tropical',      de:'F3 Villa — Fassade mit tropischem Garten' },
  { id:7,  cat:'exterior', src:'/Images/yaye-dia/villa-f4pp-facade.jpg',   fallback:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85', fr:'Villa F4 Plein Pied — Façade moderne',        en:'F4 Single-Story — Modern facade',             es:'Villa F4 Planta Baja — Fachada moderna',      de:'F4 Einstöckig — Moderne Fassade' },
  { id:8,  cat:'exterior', src:'/Images/yaye-dia/villa-f4duplex.jpg',      fallback:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85', fr:'Villa F4 Duplex — Façade nuit illuminée',     en:'F4 Duplex — Illuminated night facade',        es:'Villa F4 Dúplex — Fachada nocturna iluminada',de:'F4 Duplex — Beleuchtete Nachtfassade' },
  { id:9,  cat:'exterior', src:'/Images/yaye-dia/villa-f4duplex-nuit.jpg', fallback:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85', fr:'Rangée Villas F4 Duplex — Nuit étoilée',     en:'F4 Duplex Row — Starry night',                es:'Fila Villas F4 Dúplex — Noche estrellada',    de:'F4 Duplex Reihe — Sternennacht' },
  { id:10, cat:'exterior', src:'/Images/yaye-dia/villa-f5.jpg',            fallback:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85', fr:'Villa F5 — Façade haut standing nuit',        en:'F5 Villa — High-end night facade',            es:'Villa F5 — Fachada de alto standing noche',  de:'F5 Villa — Hochwertige Nachtfassade' },
  { id:11, cat:'exterior', src:'/Images/yaye-dia/villa-f5-facade2.jpg',    fallback:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85', fr:'Villa F5 — Vue de face variante',             en:'F5 Villa — Front view variant',               es:'Villa F5 — Vista frontal variante',           de:'F5 Villa — Vorderansicht Variante' },
  { id:12, cat:'exterior', src:'/Images/yaye-dia/villa-f5-facade3.jpg',    fallback:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85', fr:'Villa F5 — 3 niveaux + balcons vitrés',      en:'F5 Villa — 3 floors + glass balconies',       es:'Villa F5 — 3 plantas + balcones de vidrio',  de:'F5 Villa — 3 Etagen + Glasbalkone' },
  { id:13, cat:'exterior', src:'/Images/yaye-dia/villa-piscine.jpg',       fallback:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',   fr:'Villa avec piscine — Terrasse panoramique',  en:'Villa with pool — Panoramic terrace',         es:'Villa con piscina — Terraza panorámica',     de:'Villa mit Pool — Panoramaterrasse' },
  { id:14, cat:'exterior', src:'/Images/yaye-dia/villa-piscine2.jpg',      fallback:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',   fr:'Villa moderne — Piscine & transats luxueux', en:'Modern villa — Pool & luxury sun loungers',   es:'Villa moderna — Piscina y tumbonas de lujo',  de:'Moderne Villa — Pool & Luxus-Liegestühle' },

  // Category: Plans 3D / Floor plans
  { id:15, cat:'plans',    src:'/Images/yaye-dia/villa-f3-plan.jpg',       fallback:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85', fr:'Plan 3D F3 — Vue aérienne parcelle',          en:'F3 3D Plan — Aerial plot view',               es:'Plan 3D F3 — Vista aérea parcela',            de:'F3 3D Plan — Luftaufnahme Grundstück' },
  { id:16, cat:'plans',    src:'/Images/yaye-dia/villa-f3-plan2.jpg',      fallback:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85', fr:'Plan 3D F3 — Intérieur détaillé',            en:'F3 3D Plan — Detailed interior',              es:'Plan 3D F3 — Interior detallado',            de:'F3 3D Plan — Detailliertes Innere' },
  { id:17, cat:'plans',    src:'/Images/yaye-dia/villa-f4pp-plan3.jpg',     fallback:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=85'', fr:'Plan 3D F4 Plein Pied — Composition',        en:'F4 Single-Story 3D Plan — Layout',            es:'Plan 3D F4 Planta Baja — Composición',        de:'F4 Einstöckig 3D Plan — Grundriss' },
  { id:18, cat:'plans',    src:'/Images/yaye-dia/villa-f5-plan-aerien.jpg',fallback:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85', fr:'Plan aérien F5 — Terrasse & espaces',        en:'F5 Aerial plan — Terrace & spaces',           es:'Plan aéreo F5 — Terraza y espacios',          de:'F5 Luftplan — Terrasse & Räume' },
  { id:19, cat:'plans',    src:'/Images/yaye-dia/villa-f5-terrasse-plan.jpg',fallback:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85',fr:'Plan 3D Terrasse F5 — Barbecue & détente',  en:'F5 3D Terrace Plan — BBQ & relaxation',       es:'Plan 3D Terraza F5 — Barbacoa y relax',      de:'F5 3D Terrassenplan — Grill & Entspannung' },
  { id:20, cat:'plans',    src:'/Images/yaye-dia/villa-f4duplex-nuit.jpg', fallback:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85', fr:'Plan 3D F4 Duplex — RDC + Étage',           en:'F4 Duplex 3D Plan — Ground + Upper floor',    es:'Plan 3D F4 Dúplex — PB + Planta alta',       de:'F4 Duplex 3D Plan — EG + OG' },

  // Category: Intérieurs / Interiors
  { id:21, cat:'interior', src:'/Images/yaye-dia/salon-f3.jpg',            fallback:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',   fr:'Salon F3 — Espace de vie ouvert & lumineux',  en:'F3 Living room — Open & bright living space', es:'Salón F3 — Espacio de vida abierto y luminoso',de:'F3 Wohnzimmer — Offener heller Wohnraum' },
  { id:22, cat:'interior', src:'/Images/yaye-dia/salon-f4.jpg',            fallback:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85', fr:'Salon F4 Duplex — Canapé & escalier',        en:'F4 Duplex Living room — Sofa & staircase',    es:'Salón F4 Dúplex — Sofá y escalera',          de:'F4 Duplex Wohnzimmer — Sofa & Treppe' },
  { id:23, cat:'interior', src:'/Images/yaye-dia/salon-duplex.jpg',        fallback:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85',   fr:'Salon de luxe — Marbre, bois & verdure',     en:'Luxury living room — Marble, wood & plants',  es:'Salón de lujo — Mármol, madera y plantas',   de:'Luxus-Wohnzimmer — Marmor, Holz & Pflanzen' },
  { id:24, cat:'interior', src:'/Images/yaye-dia/villa-f5-terrasse.jpg',   fallback:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',   fr:'Terrasse F5 — Salon extérieur & barbecue',   en:'F5 Terrace — Outdoor lounge & barbecue',      es:'Terraza F5 — Sala exterior y barbacoa',      de:'F5 Terrasse — Außenwohnbereich & Grill' },
  { id:25, cat:'interior', src:'/Images/yaye-dia/cuisine.jpg',             fallback:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85',   fr:'Cuisine — Marbre Calacatta & finitions',     en:'Kitchen — Calacatta marble & finishes',       es:'Cocina — Mármol Calacatta y acabados',       de:'Küche — Calacatta-Marmor & Oberflächen' },
  { id:26, cat:'interior', src:'/Images/yaye-dia/master.jpg',              fallback:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85', fr:'Master Room — Dressing & salle de bain',     en:'Master Room — Dressing & bathroom',           es:'Master Room — Vestidor y baño',              de:'Master Room — Ankleidezimmer & Bad' },

  // Category: Immeubles / Buildings
  { id:27, cat:'buildings',src:'/Images/yaye-dia/immeuble-nuit.jpg',       fallbhttps:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85'',  en:'Residential building — Yaye Dia City night',  es:'Edificio residencial — Ciudad Yaye Dia noche',de:'Wohngebäude — Yaye Dia Stadt Nacht' },
  { id:28, cat:'buildings',src:'/Images/yaye-dia/immeuble-jour.jpg',       fallback:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85', fr:'Immeuble Yaye Dia — Façade moderne jour',    en:'Yaye Dia Building — Modern daytime facade',   es:'Edificio Yaye Dia — Fachada moderna día',    de:'Yaye Dia Gebäude — Moderne Tagesfassade' },
];

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
  const { lang } = useLang();
  const [activeCat, setActiveCat] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [gridRef, gridVis] = useInView();
  const tl = (fr,en,es,de) => ({fr,en,es,de}[lang]||fr);

  const filtered = activeCat === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === activeCat);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto = () => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length);
  const nextPhoto = () => setLightboxIdx(i => (i + 1) % filtered.length);

  return (
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/cite-vue-aerienne.jpg"
        label={tl('Résidence Yaye Dia','Yaye Dia Residence','Residencia Yaye Dia','Yaye Dia Residenz')}
        title={tl('Galerie de Photos','Photo Gallery','Galería de Fotos','Fotogalerie')}
        sub={tl('Découvrez la Cité Yaye Dia en images','Discover Yaye Dia City in pictures','Descubra la Ciudad Yaye Dia en imágenes','Entdecken Sie die Yaye Dia Stadt in Bildern')}
        breadcrumbs={[{ label: tl('Galerie','Gallery','Galería','Galerie') }]}
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
                      {tl('Cliquer pour agrandir','Click to enlarge','Clic para ampliar','Klicken zum Vergrößern')}
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
                {tl('Aucune photo dans cette catégorie.','No photos in this category.','No hay fotos en esta categoría.','Keine Fotos in dieser Kategorie.')}
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
