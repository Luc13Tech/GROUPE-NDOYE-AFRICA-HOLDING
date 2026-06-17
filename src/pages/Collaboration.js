import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
function useW(){const[w,sw]=React.useState(window.innerWidth);React.useEffect(()=>{const h=()=>sw(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return w;}
import { SITE } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.12){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}
const WAIcon=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

const BENEFITS = [
  { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    fr:{t:'Réseau International',d:"Accédez à notre réseau dans 6 pays et 11 marchés africains. Des opportunités à forte valeur ajoutée sur tout le continent."},
    en:{t:'International Network',d:'Access our network in 6 countries and 11 African markets. High value-added opportunities across the entire continent.'},
    es:{t:'Red Internacional',d:'Acceda a nuestra red en 6 países y 11 mercados africanos. Oportunidades de alto valor añadido en todo el continente.'},
    de:{t:'Internationales Netzwerk',d:'Zugang zu unserem Netzwerk in 6 Ländern und 11 afrikanischen Märkten. Hochwertige Möglichkeiten auf dem gesamten Kontinent.'},
    zh:{t:'国际网络',d:'access我们在6个国家和11个非洲市场的网络。覆盖整个大陆的高价值机遇。'},
  },
  { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    fr:{t:'Projets Structurés',d:"Bénéficiez de notre expertise en structuration de projets pour maximiser la faisabilité et minimiser les risques à chaque étape."},
    en:{t:'Structured Projects',d:'Benefit from our project structuring expertise to maximise feasibility and minimise risks at every stage.'},
    es:{t:'Proyectos Estructurados',d:'Benefíciese de nuestra experiencia en estructuración de proyectos para maximizar la viabilidad y minimizar los riesgos en cada etapa.'},
    de:{t:'Strukturierte Projekte',d:'Profitieren Sie von unserer Projektstrukturierungsexpertise, um die Machbarkeit zu maximieren und Risiken in jeder Phase zu minimieren.'},
    zh:{t:'结构化项目',d:'借助我们的项目结构化专业知识，在每个阶段最大化可行性并最小化风险。'},
  },
  { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    fr:{t:'Financement Accessible',d:'Accédez à nos partenaires bancaires mondiaux pour le financement de vos projets privés ou publics en Afrique.'},
    en:{t:'Accessible Financing',d:'Access our global banking partners for the financing of your private or public projects in Africa.'},
    es:{t:'Financiación Accesible',d:'Acceda a nuestros socios bancarios mundiales para la financiación de sus proyectos privados o públicos en África.'},
    de:{t:'Zugängliche Finanzierung',d:'Zugang zu unseren globalen Bankpartnern für die Finanzierung Ihrer privaten oder öffentlichen Projekte in Afrika.'},
    zh:{t:'便捷融资',d:'通过我们的全球银行合作伙伴，为您在非洲的私人或公共项目提供融资支持。'},
  },
  { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>,
    fr:{t:'Impact Durable',d:'Participez à des projets qui transforment réellement les économies africaines tout en générant des rendements attractifs pour vos investissements.'},
    en:{t:'Lasting Impact',d:'Participate in projects that genuinely transform African economies while generating attractive returns for your investments.'},
    es:{t:'Impacto Duradero',d:'Participe en proyectos que realmente transforman las economías africanas generando retornos atractivos para sus inversiones.'},
    de:{t:'Nachhaltige Wirkung',d:'Beteiligen Sie sich an Projekten, die afrikanische Volkswirtschaften wirklich transformieren und gleichzeitig attraktive Renditen für Ihre Investitionen erzielen.'},
    zh:{t:'持久影响',d:'参与真正改变非洲经济的项目，同时为您的投资带来可观的回报。'},
  },
  { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    fr:{t:"Équipe d'Experts",d:"Collaborez avec nos ingénieurs, architectes et spécialistes qui apportent leur expertise technique et leur connaissance du terrain africain."},
    en:{t:'Expert Team',d:'Collaborate with our engineers, architects and specialists who bring technical expertise and knowledge of the African landscape.'},
    es:{t:'Equipo de Expertos',d:'Colabore con nuestros ingenieros, arquitectos y especialistas que aportan experiencia técnica y conocimiento del terreno africano.'},
    de:{t:'Expertenteam',d:'Arbeiten Sie mit unseren Ingenieuren, Architekten und Spezialisten zusammen, die technische Expertise und Kenntnisse des afrikanischen Geländes mitbringen.'},
    zh:{t:'专家团队',d:'与我们的工程师、建筑师和专家合作，他们带来技术专长和对非洲地形的深入了解。'},
  },
  { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    fr:{t:'Vision Long Terme',d:'GNAH pense à long terme. Nos collaborations sont construites sur la durée avec une vision claire du développement continental africain.'},
    en:{t:'Long-Term Vision',d:'GNAH thinks long-term. Our collaborations are built to last with a clear vision of African continental development.'},
    es:{t:'Visión a Largo Plazo',d:'GNAH piensa a largo plazo. Nuestras colaboraciones están construidas para durar con una visión clara del desarrollo continental africano.'},
    de:{t:'Langfristige Vision',d:'GNAH denkt langfristig. Unsere Kooperationen sind auf Dauer ausgelegt mit einer klaren Vision der afrikanischen kontinentalen Entwicklung.'},
    zh:{t:'长远愿景',d:'GNAH着眼长远。我们的合作建立在持久的基础上，对非洲大陆发展有着清晰的愿景。'},
  },
];

const COLLAB_TYPES = {
  fr:['Partenariat technique','Partenariat financier','Partenariat commercial','Consortium de projet','Fournisseur de matériaux','Consultant spécialisé','Autre'],
  en:['Technical partnership','Financial partnership','Commercial partnership','Project consortium','Materials supplier','Specialised consultant','Other'],
  es:['Asociación técnica','Asociación financiera','Asociación comercial','Consorcio de proyecto','Proveedor de materiales','Consultor especializado','Otro'],
  de:['Technische Partnerschaft','Finanzielle Partnerschaft','Kommerzielle Partnerschaft','Projektkonsortium','Materiallieferant','Spezialisierter Berater','Sonstiges'],
};
const EXPERTISE_LIST = {
  fr:['Construction & BTP','Finance & Investissement','Agriculture & Technologie','Énergie Renouvelable','Infrastructure Publique','Mines & Ressources','Immobilier','Logistique & Transport'],
  en:['Construction & Civil Engineering','Finance & Investment','Agriculture & Technology','Renewable Energy','Public Infrastructure','Mining & Resources','Real Estate','Logistics & Transport'],
  es:['Construcción e Ingeniería Civil','Finanzas e Inversión','Agricultura y Tecnología','Energía Renovable','Infraestructura Pública','Minería y Recursos','Inmobiliaria','Logística y Transporte'],
  de:['Bau & Tiefbau','Finanzen & Investitionen','Landwirtschaft & Technologie','Erneuerbare Energien','Öffentliche Infrastruktur','Bergbau & Ressourcen','Immobilien','Logistik & Transport'],
};

export default function Collaboration() {
  const { lang } = useLang();
  const _w = useW();
  const isMob = _w < 768;
  const isTab = _w < 1024;
  const [benRef, benVis] = useInView();
  const [form, setForm] = useState({ nom:'', org:'', pays:'', email:'', tel:'', type:'', expertise:'', desc:'' });
  const [sent, setSent] = useState(false);
  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);

  const submit = () => {
    const msg = `${tl('Bonjour', 'Hello', 'Hola', 'Hallo','您好')}, ${tl('je m\'appelle', 'my name is', 'me llamo', 'ich heiße','我的名字是')} ${form.nom}${form.org?` (${form.org})`:''}, ${form.pays}.
${tl('Type de collaboration', 'Collaboration type', 'Tipo de colaboración', 'Kooperationsart','合作类型')}: ${form.type}.
${tl('Expertise', 'Expertise', 'Expertise', 'Expertise','专业知识')}: ${form.expertise}.
${tl('Téléphone', 'Phone', 'Teléfono', 'Telefon','电话')}: ${form.tel}.
Email: ${form.email}.
${form.desc}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');
    setSent(true); setTimeout(()=>setSent(false),4000);
  };

  return (
    <main className="page-white">
      <PageHero
        bgImg="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=85"
        label={tl('Travaillons ensemble', "Let's work together", 'Trabajemos juntos', 'Arbeiten wir zusammen','让我们一起合作')}
        title="Collaboration"
        sub={tl("Construisons ensemble l'Afrique de demain", "Let's build tomorrow's Africa together", "Construyamos juntos el África del mañana", "Lassen Sie uns gemeinsam das Afrika von morgen aufbauen",'让我们共同建设明日非洲。')}
        breadcrumbs={[{ label:'Collaboration' }]}
      />

      {/* BENEFITS */}
      <section className="section" ref={benRef}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:52}}>
            <div className="sec-label" style={{display:'inline-flex'}}>{tl('Pourquoi collaborer', 'Why collaborate', 'Por qué colaborar', 'Warum zusammenarbeiten','为什么合作')}</div>
            <h2 className="sec-title-light" style={{marginTop:6}}>{tl("Rejoignez l'Écosystème GNAH", "Join the GNAH Ecosystem", "Únase al Ecosistema GNAH", "Treten Sie dem GNAH-Ökosystem bei",'加入GNAH生态系统')}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div className="grid-3">
            {BENEFITS.map((b,i)=>(
              <div key={i} className={`card-white fade-up${benVis?' visible':''} delay-${(i%3)+1}`}>
                <div style={{color:'var(--gold)',marginBottom:16}}>{b.icon}</div>
                <h3 style={{fontFamily:'var(--f-display)',fontSize:'.88rem',color:'var(--text-dark)',letterSpacing:'.06em',marginBottom:10}}>{(b[lang]||b.fr).t}</h3>
                <p style={{fontSize:'.83rem',color:'var(--text-mid)',lineHeight:1.85}}>{(b[lang]||b.fr).d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section style={{background:'var(--gray-50)',padding:'72px 0'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:64,alignItems:'start'}}>
            <div>
              <div className="sec-label">{tl('Proposez', 'Propose', 'Proponga', 'Vorschlagen','提交建议')}</div>
              <h2 className="sec-title-light" style={{marginTop:6}}>{tl('Entrons en Contact', "Let's Connect", 'Entremos en Contacto', 'Lassen Sie uns in Kontakt treten','让我们取得联系')}</h2>
              <div className="divider-gold"/>
              <p style={{color:'var(--text-mid)',lineHeight:1.9,marginBottom:28,fontSize:'.88rem'}}>
                {tl("Vous avez une expertise complémentaire ? Soumettez votre proposition et notre équipe vous recontactera sous 48h.", "You have complementary expertise? Submit your proposal and our team will get back to you within 48 hours.", "¿Tiene una expertise complementaria? Envíe su propuesta y nuestro equipo le contactará en 48 horas.", "Sie haben komplementäre Expertise? Senden Sie Ihren Vorschlag und unser Team meldet sich innerhalb von 48 Stunden.",'您有互补的专业知识吗？提交您的建议，我们的团队将与您联系。')}
              </p>
              <div style={{background:'var(--white)',border:'1px solid var(--gray-200)',borderLeft:'3px solid var(--gold)',padding:'20px 22px',marginBottom:20}}>
                <div style={{fontFamily:'var(--f-display)',fontSize:'.68rem',color:'var(--gold)',letterSpacing:'.12em',textTransform:'uppercase',marginBottom:12}}>
                  {tl('Types de Collaboration', 'Collaboration Types', 'Tipos de Colaboración', 'Kooperationsarten','合作类型')}
                </div>
                {(COLLAB_TYPES[lang]||COLLAB_TYPES.fr).map((t,i)=>(
                  <div key={i} style={{display:'flex',gap:8,fontSize:'.8rem',color:'var(--text-mid)',padding:'5px 0',borderBottom:'1px solid var(--gray-200)'}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" style={{marginTop:2,flexShrink:0}}><polyline points="20,6 9,17 4,12"/></svg> {t}
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'var(--white)',padding:40,border:'1px solid var(--gray-200)',boxShadow:'var(--shadow-md)'}}>
              <div style={{fontFamily:'var(--f-display)',fontSize:'.78rem',color:'var(--gold)',letterSpacing:'.16em',marginBottom:26,textTransform:'uppercase'}}>
                {tl('FORMULAIRE DE COLLABORATION', 'COLLABORATION FORM', 'FORMULARIO DE COLABORACIÓN', 'KOOPERATIONSFORMULAR','合作申请表')}
              </div>
              {sent&&<div style={{background:'rgba(52,211,153,.08)',border:'1px solid rgba(52,211,153,.3)',color:'#34d399',padding:'10px 14px',marginBottom:16,fontSize:'.8rem',fontFamily:'var(--f-display)'}}>
                {tl('✓ Envoyé ! Redirection WhatsApp...', '✓ Sent! WhatsApp redirect...', '✓ ¡Enviado!', '✓ Gesendet!','✓ 已发送！正在跳转至WhatsApp...')}
              </div>}
              <div className="form-grid" style={{gap:14}}>
                {[
                  {k:'nom', lf:'Nom Complet *',le:'Full Name *',ls:'Nombre Completo *',ld:'Vollständiger Name *'},
                  {k:'org', lf:'Organisation',  le:'Organisation',ls:'Organización',    ld:'Organisation'},
                  {k:'pays',lf:'Pays *',         le:'Country *',  ls:'País *',           ld:'Land *'},
                  {k:'email',lf:'Email *',       le:'Email *',    ls:'Email *',          ld:'E-Mail *',t:'email'},
                  {k:'tel',  lf:'Téléphone *',   le:'Phone *',    ls:'Teléfono *',       ld:'Telefon *',t:'tel'},
                ].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-light">{{fr:f.lf,en:f.le,es:f.ls,de:f.ld}[lang]||f.lf}</label>
                    <input className="form-input form-input-light" type={f.t||'text'} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <div className="form-group form-full">
                  <label className="form-label form-label-light">{tl('Type de Collaboration *', 'Collaboration Type *', 'Tipo de Colaboración *', 'Kooperationsart *','合作类型 *')}</label>
                  <select className="form-select form-select-light" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                    <option value="">{tl('Sélectionner...', 'Select...', 'Seleccionar...', 'Auswählen...','请选择...')}</option>
                    {(COLLAB_TYPES[lang]||COLLAB_TYPES.fr).map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label form-label-light">{tl("Domaine d'Expertise *", 'Area of Expertise *', 'Área de Expertise *', 'Fachgebiet *',"专业领域 *")}</label>
                  <select className="form-select form-select-light" value={form.expertise} onChange={e=>setForm(p=>({...p,expertise:e.target.value}))}>
                    <option value="">{tl('Sélectionner...', 'Select...', 'Seleccionar...', 'Auswählen...','请选择...')}</option>
                    {(EXPERTISE_LIST[lang]||EXPERTISE_LIST.fr).map(e=><option key={e}>{e}</option>)}
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label form-label-light">{tl('Description de votre proposition *', 'Description of your proposal *', 'Descripción de su propuesta *', 'Beschreibung Ihres Vorschlags *','您的提案描述 *')}</label>
                  <textarea className="form-textarea form-textarea-light" style={{minHeight:130}} placeholder={tl('Décrivez votre proposition en détail...', 'Describe your proposal in detail...', 'Describa su propuesta en detalle...', 'Beschreiben Sie Ihren Vorschlag im Detail...','详细描述您的提案...')} value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))}/>
                </div>
              </div>
              <button onClick={submit} className="btn btn-wa" style={{marginTop:20,width:'100%',justifyContent:'center'}}>
                <WAIcon/> {tl('Soumettre ma proposition', 'Submit my proposal', 'Enviar mi propuesta', 'Vorschlag einreichen','提交我的提案')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
