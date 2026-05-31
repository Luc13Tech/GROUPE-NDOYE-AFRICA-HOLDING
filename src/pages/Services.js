import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { SERVICES, SITE } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.15){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

const ArrowR = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
const WAIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

const SVC_ICONS = {
  building:<><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/></>,
  layers:<><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></>,
  chart:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  road:<><path d="M3 12h18"/><path d="M3 6l3 6-3 6"/><path d="M21 6l-3 6 3 6"/></>,
  leaf:<path d="M17 8C8 10 5.9 16.17 3.82 20.37M2 21s0-3 3-7c3.5-4.5 8-6.2 12-7C20 6 22 4 22 4c0 7-3 12-12 14"/>,
  zap:<polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>,
};

const PROCESS_STEPS = {
  fr:[{n:'01',t:'Analyse',d:'Étude de faisabilité, évaluation des risques et opportunités de votre projet.'},
      {n:'02',t:'Structuration',d:'Mise en place du montage financier et technique le plus adapté.'},
      {n:'03',t:'Partenariat',d:'Connexion avec nos partenaires techniques et financiers mondiaux.'},
      {n:'04',t:'Réalisation',d:'Suivi rigoureux et livraison dans les délais et standards définis.'}],
  en:[{n:'01',t:'Analysis',d:'Feasibility study, risk assessment and opportunity evaluation of your project.'},
      {n:'02',t:'Structuring',d:'Setting up the most appropriate financial and technical arrangement.'},
      {n:'03',t:'Partnership',d:'Connection with our global technical and financial partners.'},
      {n:'04',t:'Delivery',d:'Rigorous monitoring and delivery within defined deadlines and standards.'}],
  es:[{n:'01',t:'Análisis',d:'Estudio de viabilidad, evaluación de riesgos y oportunidades de su proyecto.'},
      {n:'02',t:'Estructuración',d:'Establecimiento del montaje financiero y técnico más adecuado.'},
      {n:'03',t:'Asociación',d:'Conexión con nuestros socios técnicos y financieros mundiales.'},
      {n:'04',t:'Realización',d:'Seguimiento riguroso y entrega en los plazos y estándares definidos.'}],
  de:[{n:'01',t:'Analyse',d:'Machbarkeitsstudie, Risikobewertung und Chancenanalyse Ihres Projekts.'},
      {n:'02',t:'Strukturierung',d:'Aufstellung der am besten geeigneten finanziellen und technischen Lösung.'},
      {n:'03',t:'Partnerschaft',d:'Verbindung mit unseren weltweiten technischen und finanziellen Partnern.'},
      {n:'04',t:'Umsetzung',d:'Strenge Überwachung und Lieferung innerhalb definierter Fristen und Standards.'}],
};


function getServicesRT() {
  try {
    const s = localStorage.getItem('gnah_services');
    if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p; }
  } catch {}
  return null;
}

export default function Services() {
  const { lang } = useLang();
  const [rtSvc, setRtSvc] = useState(getServicesRT);
  useEffect(() => {
    const h = () => setRtSvc(getServicesRT());
    window.addEventListener('storage', h);
    const iv = setInterval(h, 2000);
    return () => { window.removeEventListener('storage', h); clearInterval(iv); };
  }, []);
  const [gridRef, gridVis] = useInView();
  const [procRef, procVis] = useInView();
  const [form, setForm] = useState({ nom:'', entreprise:'', email:'', tel:'', service:'', budget:'', desc:'' });
  const [sent, setSent] = useState(false);

  const tl = (fr,en,es,de) => ({fr,en,es,de}[lang]||fr);
  const svc = s => s[lang] || s.fr;
  const wm = typeof SITE.waMsg==='object' ? (SITE.waMsg[lang]||SITE.waMsg.fr) : SITE.waMsg;

  const submit = () => {
    if(!form.nom||!form.service){return;}
    const msg = `${tl('Bonjour','Hello','Hola','Hallo')}, ${form.nom}${form.entreprise?` (${form.entreprise})`:''}.
${tl('Service','Service','Servicio','Dienst')}: ${form.service}.
${tl('Budget','Budget','Presupuesto','Budget')}: ${form.budget||'N/A'}.
${tl('Téléphone','Phone','Teléfono','Telefon')}: ${form.tel}.
Email: ${form.email}.
${tl('Description','Description','Descripción','Beschreibung')}: ${form.desc}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');
    setSent(true); setTimeout(()=>setSent(false),4000);
  };

  const steps = PROCESS_STEPS[lang] || PROCESS_STEPS.fr;

  return (
    <main className="page-white">
      <PageHero
        bgImg="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85"
        label={tl('Notre expertise','Our expertise','Nuestra experiencia','Unsere Expertise')}
        title={tl('Nos Services','Our Services','Nuestros Servicios','Unsere Leistungen')}
        sub={tl('Solutions complètes pour vos projets en Afrique','Complete solutions for your projects in Africa','Soluciones completas para sus proyectos en África','Vollständige Lösungen für Ihre Projekte in Afrika')}
        breadcrumbs={[{ label: tl('Services','Services','Servicios','Leistungen') }]}
      />

      {/* SERVICES GRID */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div className="grid-3">
            {(rtSvc || SERVICES).map((s,i) => (
              <div key={i} className={`card-white fade-up${gridVis?' visible':''} delay-${i+1}`}>
                <div style={{width:54,height:54,border:'1px solid rgba(201,168,76,.3)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--gold)',marginBottom:20}}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{SVC_ICONS[s.icon]}</svg>
                </div>
                <div style={{width:'100%',height:2,background:'linear-gradient(90deg,var(--gold),transparent)',marginBottom:16}}/>
                <h3 style={{fontFamily:'var(--f-display)',fontSize:'.9rem',color:'var(--text-dark)',letterSpacing:'.06em',marginBottom:12}}>{svc(s).title}</h3>
                <p style={{fontSize:'.84rem',color:'var(--text-mid)',lineHeight:1.85,marginBottom:20,flex:1}}>{svc(s).desc}</p>
                <button
                  onClick={()=>window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`${tl('Bonjour','Hello','Hola','Hallo')}, ${tl('je suis intéressé(e) par le service','I am interested in the service','estoy interesado/a en el servicio','ich interessiere mich für die Leistung')}: ${svc(s).title}`)}`, '_blank')}
                  style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',color:'var(--gold)',fontFamily:'var(--f-display)',fontSize:'.62rem',letterSpacing:'.12em',textTransform:'uppercase',cursor:'pointer',padding:0,transition:'gap .2s'}}
                  onMouseEnter={e=>e.currentTarget.style.gap='10px'}
                  onMouseLeave={e=>e.currentTarget.style.gap='6px'}
                >
                  {tl('En savoir plus','Learn more','Saber más','Mehr erfahren')} <ArrowR/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" style={{background:'var(--gray-50)'}} ref={procRef}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:52}}>
            <div className="sec-label" style={{display:'inline-flex'}}>{tl('Méthodologie','Methodology','Metodología','Methodik')}</div>
            <h2 className="sec-title-light" style={{marginTop:6}}>{tl('Notre Approche','Our Approach','Nuestro Enfoque','Unser Ansatz')}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div className="grid-4">
            {steps.map((p,i)=>(
              <div key={i} className={`fade-up${procVis?' visible':''} delay-${i+1}`} style={{textAlign:'center',padding:'32px 18px',border:'1px solid var(--gray-200)',background:'var(--white)',borderTop:'3px solid var(--gold)',transition:'var(--trans)','&:hover':{boxShadow:'var(--shadow-md)'}}}>
                <div style={{fontFamily:'var(--f-elegant)',fontSize:'2.6rem',color:'rgba(201,168,76,.2)',marginBottom:12,lineHeight:1}}>{p.n}</div>
                <div style={{fontFamily:'var(--f-display)',fontSize:'.85rem',color:'var(--text-dark)',letterSpacing:'.07em',marginBottom:10}}>{p.t}</div>
                <p style={{fontSize:'.8rem',color:'var(--text-mid)',lineHeight:1.7}}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:72,alignItems:'start'}}>
            <div>
              <div className="sec-label">{tl('Travaillons ensemble',"Let's work together",'Trabajemos juntos','Arbeiten wir zusammen')}</div>
              <h2 className="sec-title-light" style={{marginTop:6}}>{tl('Demande de Service','Service Request','Solicitud de Servicio','Serviceanfrage')}</h2>
              <div className="divider-gold"/>
              <p style={{color:'var(--text-mid)',lineHeight:1.9,marginBottom:28,fontSize:'.88rem'}}>
                {tl("Décrivez votre projet. Notre équipe vous répondra sous 24h via WhatsApp.",'Describe your project. Our team will respond within 24 hours via WhatsApp.','Describa su proyecto. Nuestro equipo le responderá en 24 horas por WhatsApp.','Beschreiben Sie Ihr Projekt. Unser Team antwortet innerhalb von 24 Stunden per WhatsApp.')}
              </p>
              {[
                {fr:'Réponse sous 24h',en:'Response within 24h',es:'Respuesta en 24h',de:'Antwort innerhalb 24h'},
                {fr:'Expertise africaine depuis 2015',en:'African expertise since 2015',es:'Experiencia africana desde 2015',de:'Afrikanische Expertise seit 2015'},
                {fr:'6 pays partenaires mondiaux',en:'6 global partner countries',es:'6 países socios mundiales',de:'6 weltweite Partnerländer'},
                {fr:'Réseau dans 11 pays africains',en:'Network in 11 African countries',es:'Red en 11 países africanos',de:'Netzwerk in 11 afrikanischen Ländern'},
              ].map((it,i)=>(
                <div key={i} style={{display:'flex',gap:12,alignItems:'center',padding:'11px 16px',background:'var(--gray-50)',border:'1px solid var(--gray-200)',borderLeft:'3px solid var(--gold)',marginBottom:10}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                  <span style={{fontFamily:'var(--f-display)',fontSize:'.72rem',color:'var(--text-dark)',letterSpacing:'.07em'}}>{it[lang]||it.fr}</span>
                </div>
              ))}
            </div>
            <div style={{background:'var(--navy2)',padding:40,border:'var(--border-gold)'}}>
              <div style={{fontFamily:'var(--f-display)',fontSize:'.78rem',color:'var(--gold)',letterSpacing:'.16em',marginBottom:26,textTransform:'uppercase'}}>
                {tl('FORMULAIRE DE DEMANDE','SERVICE REQUEST FORM','FORMULARIO DE SOLICITUD','SERVICEANFRAGE')}
              </div>
              {sent&&<div style={{background:'rgba(52,211,153,.08)',border:'1px solid rgba(52,211,153,.3)',color:'#34d399',padding:'10px 14px',marginBottom:16,fontSize:'.8rem',fontFamily:'var(--f-display)'}}>
                {tl('✓ Envoyé ! Redirection WhatsApp...','✓ Sent! WhatsApp redirect...','✓ ¡Enviado! Redirigiendo a WhatsApp...','✓ Gesendet! WhatsApp-Weiterleitung...')}
              </div>}
              <div className="form-grid" style={{gap:14}}>
                {[
                  {k:'nom',lf:'Nom Complet *',le:'Full Name *',ls:'Nombre Completo *',ld:'Vollständiger Name *'},
                  {k:'entreprise',lf:'Entreprise',le:'Company',ls:'Empresa',ld:'Unternehmen'},
                  {k:'email',lf:'Email *',le:'Email *',ls:'Email *',ld:'E-Mail *',t:'email'},
                  {k:'tel',lf:'Téléphone *',le:'Phone *',ls:'Teléfono *',ld:'Telefon *',t:'tel'},
                ].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-dark">{({fr:f.lf,en:f.le,es:f.ls,de:f.ld}[lang]||f.lf)}</label>
                    <input className="form-input form-input-dark" type={f.t||'text'} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Type de Service *','Service Type *','Tipo de Servicio *','Dienstart *')}</label>
                  <select className="form-select form-select-dark" value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))}>
                    <option value="">{tl('Sélectionner...','Select...','Seleccionar...','Auswählen...')}</option>
                    {(rtSvc || SERVICES).map(s=><option key={s.icon} value={(s[lang]||s.fr).title}>{(s[lang]||s.fr).title}</option>)}
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Budget Estimé','Estimated Budget','Presupuesto Estimado','Geschätztes Budget')}</label>
                  <select className="form-select form-select-dark" value={form.budget} onChange={e=>setForm(p=>({...p,budget:e.target.value}))}>
                    <option value="">{tl('Sélectionner...','Select...','Seleccionar...','Auswählen...')}</option>
                    {['< $1M','$1M — $10M','$10M — $50M','$50M — $100M','> $100M'].map(b=><option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Description du Projet *','Project Description *','Descripción del Proyecto *','Projektbeschreibung *')}</label>
                  <textarea className="form-textarea form-textarea-dark" placeholder={tl('Décrivez votre projet...','Describe your project...','Describa su proyecto...','Beschreiben Sie Ihr Projekt...')} value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))}/>
                </div>
              </div>
              <button onClick={submit} className="btn btn-wa" style={{marginTop:20,width:'100%',justifyContent:'center'}}>
                <WAIcon/> {tl('Envoyer via WhatsApp','Send via WhatsApp','Enviar por WhatsApp','Per WhatsApp senden')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
