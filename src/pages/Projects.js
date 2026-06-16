import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLang } from '../hooks/useLang';
function useW(){const[w,sw]=React.useState(window.innerWidth);React.useEffect(()=>{const h=()=>sw(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return w;}
import { VILLA_TYPES, AMENITIES, LOTISSEMENT, ARCH_PHILOSOPHY, MATERIALS, YAYE_SLIDES, SITE } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.1){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

const ChevL=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>;
const ChevR=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg>;
const WAIcon=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
const CheckIcon=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>;

const AMENITY_ICONS = {
  sport:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>,
  field:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M2 12h4M18 12h4"/><circle cx="12" cy="12" r="3"/></svg>,
  kids:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M8 14s-4 2-4 6h16c0-4-4-6-4-6"/></svg>,
  mosque:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/><path d="M12 3v4"/></svg>,
  mall:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  health:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
};

function Carousel() {
  const { lang } = useLang();
  const _w = useW();
  const isMob = _w < 768;
  const isTab = _w < 1024;
  const [rtProj, setRtProj] = useState(getProjectsRT);
  useEffect(() => {
    const h = () => setRtProj(getProjectsRT());
    window.addEventListener('storage', h);
    const iv = setInterval(h, 2000);
    return () => { window.removeEventListener('storage', h); clearInterval(iv); };
  }, []);
  const [idx, setIdx] = useState(0);
  const prev = useCallback(()=>setIdx(i=>(i-1+YAYE_SLIDES.length)%YAYE_SLIDES.length),[]);
  const next = useCallback(()=>setIdx(i=>(i+1)%YAYE_SLIDES.length),[]);
  useEffect(()=>{const t=setInterval(next,3500);return()=>clearInterval(t);},[next]);
  const s = YAYE_SLIDES[idx];
  const td = (obj) => obj[lang]||obj.fr;
  return (
    <div className="hcar">
      <div className="hcar-track" style={{transform:`translateX(-${idx*100}%)`}}>
        {YAYE_SLIDES.map((sl,i)=>(
          <div key={i} className={`hcar-slide${i===idx?' active':''}`}>
            <img src={sl.img} alt={td(sl).title} className="img-cover" loading="lazy"/>
            <div className="hcar-overlay"/>
            <div className="hcar-info">
              <div className="hcar-tag">{td(sl).tag}</div>
              <h3 className="hcar-title">{td(sl).title}</h3>
              <p className="hcar-sub">{td(sl).sub}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="hcar-btn prev" onClick={prev}><ChevL/></button>
      <button className="hcar-btn next" onClick={next}><ChevR/></button>
      <div className="hcar-dots">{YAYE_SLIDES.map((_,i)=><button key={i} className={`hcar-dot${i===idx?' active':''}`} onClick={()=>setIdx(i)}/>)}</div>
    </div>
  );
}


function getProjectsRT() {
  try {
    const s = localStorage.getItem('gnah_projets');
    if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p; }
  } catch {}
  return null;
}

export default function Projects() {
  const { lang } = useLang();
  const _w = useW();
  const isMob = _w < 768;
  const isTab = _w < 1024;
  const [rtProj, setRtProj] = useState(getProjectsRT);
  useEffect(() => {
    const h = () => setRtProj(getProjectsRT());
    window.addEventListener('storage', h);
    const iv = setInterval(h, 2000);
    return () => { window.removeEventListener('storage', h); clearInterval(iv); };
  }, []);
  const [activeVilla, setActiveVilla] = useState('f3');
  const [amenRef, amenVis] = useInView();
  const [lotRef, lotVis]   = useInView();
  const [form, setForm] = useState({ nom:'', prenom:'', tel:'', email:'', villa:'f3', msg:'' });
  const [sent, setSent] = useState(false);

  const villa = VILLA_TYPES.find(v => v.id === activeVilla);
  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);
  const tv = (obj) => obj[lang]||obj.fr;

  const submit = () => {
    const vName = tv(villa).name;
    const msg = `${tl('Bonjour', 'Hello', 'Hola', 'Hallo','您好')}, ${tl('je m\'appelle', 'my name is', 'me llamo', 'mein Name ist','我的名字是')} ${form.nom} ${form.prenom}.
${tl('Je suis intéressé(e) par la','I am interested in the','Estoy interesado/a en la','Ich interessiere mich für die','我对以下感兴趣：')} ${vName} ${tl('de la Résidence Yaye Dia', 'at Yaye Dia Residence', 'de la Residencia Yaye Dia', 'der Yaye Dia Residenz','于Yaye Dia住宅')}.
${tl('Téléphone', 'Phone', 'Teléfono', 'Telefon','电话')}: ${form.tel}.
Email: ${form.email}.
${form.msg}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true); setTimeout(()=>setSent(false),4000);
  };

  const lot = LOTISSEMENT[lang]||LOTISSEMENT.fr;
  const arch = ARCH_PHILOSOPHY[lang]||ARCH_PHILOSOPHY.fr;
  const mat = MATERIALS[lang]||MATERIALS.fr;

  return (
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/cover.jpg"
        fallbackImg="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85"
        label={tl('Projet Phare', 'Flagship Project', 'Proyecto Insignia', 'Vorzeigeprojekt','旗舰项目')}
        title={tl('Résidence Yaye Dia', 'Yaye Dia Residence', 'Residencia Yaye Dia', 'Yaye Dia Residenz','Yaye Dia住宅')}
        sub={tl('300 villas Haut Standing — Région de Thiès, Sénégal', '300 High-End Villas — Thiès Region, Senegal', '300 Villas de Alto Standing — Región de Thiès, Senegal', '300 Hochwertige Villen — Thiès Region, Senegal','300栋高档别墅 — 塞内加尔蒂耶斯地区')}
        breadcrumbs={[{ label: tl('Projets', 'Projects', 'Proyectos', 'Projekte','项目') }]}
      />

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:64,alignItems:'center'}}>
            <div>
              <div className="sec-label">{tl('Bienvenue', 'Welcome', 'Bienvenido', 'Willkommen','欢迎')}</div>
              <h2 className="sec-title-light" style={{marginTop:6}}>{tl("L'Art de vivre Moderne", "The Art of Modern Living", "El Arte de Vivir Moderno", "Die Kunst des modernen Lebens","现代生活艺术")}</h2>
              <div className="divider-gold"/>
              <p style={{fontFamily:'var(--f-serif)',fontStyle:'italic',fontSize:'1.05rem',color:'var(--gold)',marginBottom:14}}>
                {tl("L'immobilier au vrai sens du mot", "Real estate in the truest sense", "Bienes raíces en el verdadero sentido", "Immobilien im wahrsten Sinne","真正意义上的房地产")}
              </p>
              <p style={{fontSize:'.9rem',color:'var(--text-mid)',lineHeight:1.9,marginBottom:16}}>
                {tl("Bienvenue à la Cité YAYE DIA, un programme immobilier d'exception composé de 300 villas modernes, conçu pour redéfinir les standards du cadre de vie résidentiel.", "Welcome to YAYE DIA City, an exceptional real estate programme of 300 modern villas, designed to redefine residential living standards.", "Bienvenido a la Ciudad YAYE DIA, un programa inmobiliario excepcional de 300 villas modernas, diseñado para redefinir los estándares de vida residencial.", "Willkommen in der YAYE DIA Stadt, einem außergewöhnlichen Immobilienprogramm mit 300 modernen Villen, das darauf ausgelegt ist, die Wohnstandards neu zu definieren.",'欢迎来到YAYE DIA城，一个由300栋现代优雅别墅组成的卓越房地产项目。')}
              </p>
              <p style={{fontSize:'.9rem',color:'var(--text-mid)',lineHeight:1.9,marginBottom:28}}>
                {tl("Choisir la Cité YAYE DIA, c'est investir dans un cadre de vie moderne et structuré, une communauté dynamique et une valorisation immobilière durable.", "Choosing YAYE DIA City means investing in a modern structured living environment, a dynamic community and sustainable real estate appreciation.", "Elegir la Ciudad YAYE DIA significa invertir en un entorno de vida moderno y estructurado, una comunidad dinámica y una valorización inmobiliaria sostenible.", "Die YAYE DIA Stadt zu wählen bedeutet, in ein modernes strukturiertes Wohnumfeld, eine dynamische Gemeinschaft und nachhaltige Immobilienwertsteigerung zu investieren.",'选择YAYE DIA城，就是投资于现代化、结构完善的生活环境，一个安全且配套齐全的社区。')}
              </p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {[
                  {fr:'300 Villas',en:'300 Villas',es:'300 Villas',de:'300 Villen'},
                  {fr:'Région de Thiès',en:'Thiès Region',es:'Región de Thiès',de:'Thiès Region'},
                  {fr:'225 m² / Villa',en:'225 m² / Villa',es:'225 m² / Villa',de:'225 m² / Villa'},
                  {fr:'Éco-responsable',en:'Eco-responsible',es:'Eco-responsable',de:'Umweltverantwortlich'},
                ].map((tag,i)=>(
                  <span key={i} style={{padding:'5px 13px',border:'1px solid rgba(201,168,76,.3)',color:'var(--gold)',fontFamily:'var(--f-display)',fontSize:'.62rem',letterSpacing:'.1em'}}>
                    {tag[lang]||tag.fr}
                  </span>
                ))}
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <img src="/Images/yaye-dia/vision.jpg" alt="Yaye Dia" style={{width:'100%',height:240,objectFit:'cover',borderTop:'3px solid var(--gold)'}}/>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
                <img src="/Images/yaye-dia/design.jpg" alt="Design" style={{width:'100%',height:130,objectFit:'cover'}}/>
                <div style={{background:'var(--navy)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:16,textAlign:'center'}}>
                  <div style={{fontFamily:'var(--f-elegant)',fontSize:'2rem',color:'var(--gold)'}}>300</div>
                  <div style={{fontFamily:'var(--f-serif)',fontStyle:'italic',color:'rgba(200,195,186,.5)',fontSize:'.8rem'}}>
                    {tl('Villas Haut Standing', 'High-End Villas', 'Villas de Alto Standing', 'Hochwertige Villen','高档别墅')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY CAROUSEL */}
      <section style={{background:'var(--gray-50)',padding:'72px 0'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:36}}>
            <div className="sec-label" style={{display:'inline-flex'}}>{tl('Galerie', 'Gallery', 'Galería', 'Galerie','图库')}</div>
            <h2 className="sec-title-light" style={{marginTop:6}}>{tl('Découvrez la Cité', 'Discover the City', 'Descubra la Ciudad', 'Entdecken Sie die Stadt','探索这座城')}</h2>
            <div className="divider-gold-c"/>
          </div>
          <Carousel/>
        </div>
      </section>

      {/* VILLA SELECTOR */}
      <section className="section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:36}}>
            <div className="sec-label" style={{display:'inline-flex'}}>{tl('Modèles', 'Models', 'Modelos', 'Modelle','模型')}</div>
            <h2 className="sec-title-light" style={{marginTop:6}}>
              {tl('Style et ', 'Style and ', 'Estilo y ', 'Stil und ','风格与 ')}
              <em style={{fontFamily:'var(--f-elegant)',color:'var(--gold)'}}>
                {tl('Architecture', 'Architecture', 'Arquitectura', 'Architektur','建筑')}
              </em>
            </h2>
            <div className="divider-gold-c"/>
          </div>

          {/* TABS */}
          <div style={{display:'flex',gap:2,marginBottom:28,flexWrap:'wrap'}}>
            {VILLA_TYPES.map(v=>(
              <button key={v.id} onClick={()=>setActiveVilla(v.id)}
                style={{flex:1,minWidth:140,padding:'13px 10px',background:activeVilla===v.id?v.color:'transparent',border:`1px solid ${activeVilla===v.id?v.color:'var(--gray-200)'}`,color:activeVilla===v.id?'#fff':'var(--text-dark)',fontFamily:'var(--f-display)',fontSize:'.7rem',letterSpacing:'.06em',cursor:'pointer',transition:'var(--trans)',textAlign:'center'}}>
                {tv(v).name}<br/>
                <span style={{fontSize:'.58rem',opacity:.7}}>{tv(v).standing}</span>
              </button>
            ))}
          </div>

          {villa && (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:28}}>
              {/* Images */}
              <div>
                <div style={{position:'relative',overflow:'hidden',marginBottom:12}}>
                  <img src={villa.img} alt={tv(villa).name} style={{width:'100%',height:300,objectFit:'cover',display:'block'}}
                    onError={e=>{e.target.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=70';}}
                  />
                  <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(5,8,16,.88))',padding:'20px 18px'}}>
                    <div style={{fontFamily:'var(--f-elegant)',fontSize:'1.1rem',color:'var(--cream)',marginBottom:2}}>{tv(villa).name}</div>
                    <div style={{fontFamily:'var(--f-serif)',fontStyle:'italic',color:'var(--gold)',fontSize:'.82rem'}}>
                      {villa.surface} — {tv(villa).standing} — Cité Yaye Dia
                    </div>
                  </div>
                </div>
                <img src={villa.planImg} alt={`Plan ${tv(villa).name}`} style={{width:'100%',height:180,objectFit:'cover'}}
                  onError={e=>{e.target.style.display='none';}}
                />
                {/* Features */}
                {(villa.features||villa.extras) && (
                  <div style={{marginTop:14,padding:'18px 20px',background:'var(--gray-50)',border:'1px solid var(--gray-200)',borderLeft:'3px solid var(--gold)'}}>
                    <div style={{fontFamily:'var(--f-display)',fontSize:'.65rem',letterSpacing:'.14em',color:'var(--gold)',textTransform:'uppercase',marginBottom:10}}>
                      {tl('Caractéristiques', 'Features', 'Características', 'Merkmale','特点')}
                    </div>
                    {((villa.features||villa.extras)[lang]||(villa.features||villa.extras).fr||[]).map((f,i)=>(
                      <div key={i} style={{display:'flex',gap:8,fontSize:'.78rem',color:'var(--text-mid)',padding:'4px 0',borderBottom:'1px solid var(--gray-200)'}}>
                        <CheckIcon/> {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div style={{background:'var(--navy)',border:'var(--border-gold)',padding:24}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:20,paddingBottom:16,borderBottom:'1px solid rgba(201,168,76,.12)'}}>
                  <div>
                    <div style={{fontFamily:'var(--f-display)',fontSize:'.58rem',letterSpacing:'.14em',color:'var(--gold)',textTransform:'uppercase',marginBottom:4}}>{tl('Terrain', 'Plot', 'Parcela', 'Grundstück','地块')}</div>
                    <div style={{fontFamily:'var(--f-elegant)',fontSize:'1.5rem',color:'var(--cream)'}}>{villa.surface}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:'var(--f-display)',fontSize:'.58rem',letterSpacing:'.14em',color:'var(--gold)',textTransform:'uppercase',marginBottom:4}}>{tl('Bâti', 'Built', 'Construido', 'Gebaut','建筑面积')}</div>
                    <div style={{fontFamily:'var(--f-elegant)',fontSize:'1.5rem',color:'var(--cream)'}}>{villa.bati}</div>
                  </div>
                </div>

                {villa.rooms && (
                  <>
                    <div style={{fontFamily:'var(--f-display)',fontSize:'.58rem',letterSpacing:'.14em',color:'var(--gold)',textTransform:'uppercase',marginBottom:10}}>
                      {tl('Composition', 'Layout', 'Composición', 'Raumaufteilung','布局')}
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:6}}>
                      {villa.rooms.map((r,i)=>(
                        <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 10px',background:'rgba(201,168,76,.04)',borderLeft:'2px solid rgba(201,168,76,.2)',fontSize:'.75rem'}}>
                          <span style={{color:'rgba(200,195,186,.6)'}}>{r[lang]||r.fr}</span>
                          <span style={{fontWeight:600,color:'var(--cream)'}}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {villa.floors && villa.floors.map(fl=>(
                  <div key={fl.level} style={{marginTop:14}}>
                    <div style={{fontFamily:'var(--f-display)',fontSize:'.6rem',letterSpacing:'.12em',color:'var(--gold)',textTransform:'uppercase',padding:'6px 10px',background:'rgba(201,168,76,.08)',marginBottom:8}}>
                      {fl.level}
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:5}}>
                      {fl.rooms.map((r,i)=>(
                        <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 10px',background:'rgba(201,168,76,.04)',borderLeft:'2px solid rgba(201,168,76,.2)',fontSize:'.75rem'}}>
                          <span style={{color:'rgba(200,195,186,.6)'}}>{r[lang]||r.fr}</span>
                          <span style={{fontWeight:600,color:'var(--cream)'}}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AMENITIES */}
      <section style={{background:'var(--gray-50)',padding:'72px 0'}} ref={amenRef}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="sec-label" style={{display:'inline-flex'}}>{tl('Cadre de vie', 'Living environment', 'Entorno de vida', 'Wohnumfeld','生活环境')}</div>
            <h2 className="sec-title-light" style={{marginTop:6}}>
              {tl("Un Cadre de Vie Pensé Pour le Bien-être", "A Living Environment Designed for Well-being", "Un Entorno de Vida Pensado Para el Bienestar", "Ein Wohnumfeld für Wohlbefinden","为幸福而设计的生活环境")}
            </h2>
            <div className="divider-gold-c"/>
          </div>
          <div className="grid-3">
            {AMENITIES.map((a,i)=>(
              <div key={i} className={`card-white fade-up${amenVis?' visible':''} delay-${i+1}`}>
                <div style={{color:'var(--gold)',marginBottom:16}}>{AMENITY_ICONS[a.icon]}</div>
                <h3 style={{fontFamily:'var(--f-display)',fontSize:'.86rem',color:'var(--text-dark)',letterSpacing:'.06em',marginBottom:10}}>
                  {(a[lang]||a.fr).t}
                </h3>
                <p style={{fontSize:'.82rem',color:'var(--text-mid)',lineHeight:1.75}}>
                  {(a[lang]||a.fr).d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section" ref={lotRef}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:64}}>
            <div className={`slide-left${lotVis?' visible':''}`}>
              <div className="sec-label">{tl('Esthétique', 'Aesthetics', 'Estética', 'Ästhetik','美学')}</div>
              <h2 className="sec-title-light" style={{marginTop:6}}>{arch.title}</h2>
              <div className="divider-gold"/>
              <p style={{fontFamily:'var(--f-serif)',fontStyle:'italic',fontSize:'1.05rem',color:'var(--gold)',marginBottom:14}}>{arch.intro}</p>
              <p style={{fontSize:'.88rem',color:'var(--text-mid)',lineHeight:1.9,marginBottom:20}}>{arch.desc}</p>
              <div style={{background:'var(--gray-50)',border:'1px solid var(--gray-200)',borderLeft:'3px solid var(--gold)',padding:'18px 20px'}}>
                <div style={{fontFamily:'var(--f-display)',fontSize:'.7rem',color:'var(--text-dark)',letterSpacing:'.1em',marginBottom:12}}>{arch.subtitle}</div>
                {arch.items.map((it,i)=>(
                  <div key={i} style={{display:'flex',gap:8,fontSize:'.8rem',color:'var(--text-mid)',padding:'5px 0',borderBottom:'1px solid var(--gray-200)'}}>
                    <CheckIcon/> {it}
                  </div>
                ))}
              </div>
            </div>
            <div className={`slide-right${lotVis?' visible':''}`}>
              <div className="sec-label">{tl('Matériaux', 'Materials', 'Materiales', 'Materialien','材料')}</div>
              <h2 className="sec-title-light" style={{marginTop:6}}>{mat.title}</h2>
              <div className="divider-gold"/>
              <p style={{fontSize:'.88rem',color:'var(--text-mid)',lineHeight:1.9,marginBottom:16}}>{mat.desc}</p>
              <div style={{background:'var(--gray-50)',border:'1px solid var(--gray-200)',padding:'14px 18px',marginBottom:12}}>
                <div style={{fontFamily:'var(--f-display)',fontSize:'.68rem',color:'var(--gold)',letterSpacing:'.1em',marginBottom:8}}>Marbre Calacatta</div>
                <p style={{fontSize:'.8rem',color:'var(--text-mid)'}}>{mat.marble}</p>
              </div>
              <div style={{background:'var(--gray-50)',border:'1px solid var(--gray-200)',padding:'14px 18px',marginBottom:16}}>
                <div style={{fontFamily:'var(--f-display)',fontSize:'.68rem',color:'var(--gold)',letterSpacing:'.1em',marginBottom:8}}>
                  {tl('Couleur & Design', 'Color & Design', 'Color y Diseño', 'Farbe & Design','颜色与设计')}
                </div>
                <p style={{fontSize:'.8rem',color:'var(--text-mid)'}}>{mat.color}</p>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:10}}>
                <img src="/Images/yaye-dia/cuisine.jpg" alt="Cuisine" style={{width:'100%',height:110,objectFit:'cover'}}
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=70';}}
                />
                <img src="/Images/yaye-dia/master.jpg" alt="Master" style={{width:'100%',height:110,objectFit:'cover'}}
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=70';}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOTISSEMENT */}
      <section style={{background:'var(--gray-50)',padding:'72px 0'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:64,alignItems:'center'}}>
            <div>
              <div className="sec-label">{tl('Infrastructure', 'Infrastructure', 'Infraestructura', 'Infrastruktur','基础设施')}</div>
              <h2 className="sec-title-light" style={{marginTop:6}}>{lot.title}</h2>
              <div className="divider-gold"/>
              <p style={{fontSize:'.88rem',color:'var(--text-mid)',lineHeight:1.9,marginBottom:24}}>{lot.desc}</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
                {lot.items.map((it,i)=>(
                  <div key={i} style={{padding:'14px 16px',background:'var(--white)',border:'1px solid var(--gray-200)',borderTop:'2px solid var(--gold)',borderRadius:'0 0 4px 4px'}}>
                    <div style={{fontFamily:'var(--f-display)',fontSize:'.68rem',color:'var(--text-dark)',letterSpacing:'.06em',marginBottom:5}}>{it.t}</div>
                    <p style={{fontSize:'.72rem',color:'var(--text-mid)',lineHeight:1.6}}>{it.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <img src="/Images/yaye-dia/lotissement.jpg" alt="Lotissement" style={{width:'100%',height:200,objectFit:'cover'}}
                onError={e=>{e.target.src='https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=70';}}
              />
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
                <img src="/Images/yaye-dia/eclairage.jpg" alt="Éclairage" style={{width:'100%',height:120,objectFit:'cover'}}
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=70';}}
                />
                <img src="/Images/yaye-dia/dechets.jpg" alt="Déchets" style={{width:'100%',height:120,objectFit:'cover'}}
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=70';}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="section" style={{background:'var(--navy2)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:64,alignItems:'start'}}>
            <div>
              <div className="sec-label" style={{color:'var(--gold)'}}>{tl('Réservez', 'Book now', 'Reserve', 'Buchen','立即预订')}</div>
              <h2 style={{fontFamily:'var(--f-elegant)',fontSize:'clamp(1.5rem,3vw,2.2rem)',color:'var(--cream)',marginTop:6,marginBottom:10}}>
                {tl('Votre Villa Vous Attend', 'Your Villa Awaits', 'Su Villa le Espera', 'Ihre Villa Wartet','您的别墅等待着您')}
              </h2>
              <div className="divider-gold"/>
              <p style={{color:'rgba(200,195,186,.6)',lineHeight:1.9,marginBottom:28,fontSize:'.88rem'}}>
                {tl('Remplissez le formulaire et notre équipe vous contactera sous 24 heures via WhatsApp.', 'Fill in the form and our team will contact you within 24 hours via WhatsApp.', 'Complete el formulario y nuestro equipo le contactará en 24 horas por WhatsApp.', 'Füllen Sie das Formular aus und unser Team kontaktiert Sie innerhalb von 24 Stunden per WhatsApp.','填写表格，我们的团队将在24小时内通过WhatsApp与您联系。')}
              </p>
              {[
                {fr:'Région de Thiès, Sénégal',en:'Thiès Region, Senegal',es:'Región de Thiès, Senegal',de:'Thiès Region, Senegal'},
                {fr:'300 villas disponibles',en:'300 villas available',es:'300 villas disponibles',de:'300 Villen verfügbar'},
                {fr:'225 m² par parcelle',en:'225 m² per plot',es:'225 m² por parcela',de:'225 m² pro Grundstück'},
                {fr:SITE.phone,en:SITE.phone,es:SITE.phone,de:SITE.phone},
              ].map((it,i)=>(
                <div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                  <span style={{fontSize:'.86rem',color:'rgba(200,195,186,.65)'}}>{it[lang]||it.fr}</span>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(5,8,16,.6)',padding:40,border:'var(--border-gold)'}}>
              <div style={{fontFamily:'var(--f-display)',fontSize:'.78rem',color:'var(--gold)',letterSpacing:'.16em',marginBottom:26,textTransform:'uppercase'}}>
                {tl('FORMULAIRE DE RÉSERVATION', 'BOOKING FORM', 'FORMULARIO DE RESERVA', 'BUCHUNGSFORMULAR','预订表格')}
              </div>
              {sent&&<div style={{background:'rgba(52,211,153,.08)',border:'1px solid rgba(52,211,153,.3)',color:'#34d399',padding:'10px 14px',marginBottom:16,fontSize:'.8rem',fontFamily:'var(--f-display)'}}>
                {tl('✓ Envoyé ! Redirection WhatsApp...', '✓ Sent! WhatsApp redirect...', '✓ ¡Enviado! Redirigiendo a WhatsApp...', '✓ Gesendet! WhatsApp-Weiterleitung...','✓ 已发送！正在跳转至WhatsApp...')}
              </div>}
              <div className="form-grid" style={{gap:14}}>
                {[
                  {k:'nom',lf:'Nom *',le:'Last Name *',ls:'Apellido *',ld:'Nachname *'},
                  {k:'prenom',lf:'Prénom *',le:'First Name *',ls:'Nombre *',ld:'Vorname *'},
                  {k:'tel',lf:'Téléphone *',le:'Phone *',ls:'Teléfono *',ld:'Telefon *',t:'tel'},
                  {k:'email',lf:'Email *',le:'Email *',ls:'Email *',ld:'E-Mail *',t:'email'},
                ].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-dark">{{fr:f.lf,en:f.le,es:f.ls,de:f.ld}[lang]||f.lf}</label>
                    <input className="form-input form-input-dark" type={f.t||'text'} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Type de Villa', 'Villa Type', 'Tipo de Villa', 'Villa Typ','别墅类型')}</label>
                  <select className="form-select form-select-dark" value={form.villa} onChange={e=>setForm(p=>({...p,villa:e.target.value}))}>
                    {VILLA_TYPES.map(v=><option key={v.id} value={v.id}>{(v[lang]||v.fr).name} — {(v[lang]||v.fr).standing}</option>)}
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Message', 'Message', 'Mensaje', 'Nachricht','消息')}</label>
                  <textarea className="form-textarea form-textarea-dark" placeholder={tl('Votre message...', 'Your message...', 'Su mensaje...', 'Ihre Nachricht...','您的消息...')} value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))}/>
                </div>
              </div>
              <button onClick={submit} className="btn btn-wa" style={{marginTop:20,width:'100%',justifyContent:'center'}}>
                <WAIcon/> {tl('Envoyer ma demande', 'Send my request', 'Enviar mi solicitud', 'Anfrage senden','发送我的申请')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
