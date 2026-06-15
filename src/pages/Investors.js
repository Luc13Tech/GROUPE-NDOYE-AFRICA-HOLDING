import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { INVEST_CAPACITY, AFRICA_OPPS, SITE } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.12){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}
const WAIcon=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

export default function Investors() {
  const { lang } = useLang();
  const [tierRef, tierVis] = useInView();
  const [form, setForm] = useState({ nom:'', pays:'', email:'', tel:'', montant:'', secteur:'', desc:'' });
  const [sent, setSent] = useState(false);
  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);

  const SECTORS = {
    fr:['Immobilier','Infrastructure','Agriculture','Énergie Renouvelable','Port Maritime','Secteur Minier','Industrie'],
    en:['Real Estate','Infrastructure','Agriculture','Renewable Energy','Maritime Port','Mining','Industry'],
    es:['Inmobiliaria','Infraestructura','Agricultura','Energía Renovable','Puerto Marítimo','Minería','Industria'],
    de:['Immobilien','Infrastruktur','Landwirtschaft','Erneuerbare Energien','Seehafen','Bergbau','Industrie'],
  };
  const AMOUNTS = ['$3M — $20M','$20M — $50M','$50M — $100M','$100M — $450M','$450M — $6 Mrd'];

  const submit = () => {
    const msg = `${tl('Bonjour', 'Hello', 'Hola', 'Hallo','您好')}, ${tl('je m\'appelle', 'my name is', 'me llamo', 'ich heiße','我的名字是')} ${form.nom} (${form.pays}).
${tl('Montant envisagé', 'Investment amount', 'Monto previsto', 'Investitionsbetrag','预计投资额')}: ${form.montant}.
${tl('Secteur', 'Sector', 'Sector', 'Sektor','行业')}: ${form.secteur}.
${tl('Téléphone', 'Phone', 'Teléfono', 'Telefon','电话')}: ${form.tel}.
Email: ${form.email}.
${form.desc}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');
    setSent(true); setTimeout(()=>setSent(false),4000);
  };

  return (
    <main className="page-white">
      <PageHero
        bgImg="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=85"
        label={tl('Opportunités', 'Opportunities', 'Oportunidades', 'Möglichkeiten','机遇')}
        title={tl('Espace Investisseurs', 'Investor Space', 'Espacio Inversores', 'Investorenbereich','投资者专区')}
        sub={tl("Des opportunités d'investissement exceptionnelles sur le continent africain", "Exceptional investment opportunities across the African continent", "Oportunidades de inversión excepcionales en el continente africano", "Außergewöhnliche Investitionsmöglichkeiten auf dem afrikanischen Kontinent",'非洲大陆的卓越投资机会。')}
        breadcrumbs={[{ label: tl('Investisseurs', 'Investors', 'Inversores', 'Investoren','投资者') }]}
      />

      {/* WHY AFRICA */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:64, alignItems:'center' }}>
            <div>
              <div className="sec-label">{tl("Pourquoi l'Afrique", "Why Africa", "Por qué África", "Warum Afrika","为什么选择非洲")}</div>
              <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl("Un Continent d'Opportunités", "A Continent of Opportunities", "Un Continente de Oportunidades", "Ein Kontinent der Möglichkeiten","充满机遇的大陆")}</h2>
              <div className="divider-gold"/>
              <p style={{ fontSize:'.9rem', color:'var(--text-mid)', lineHeight:1.9, marginBottom:20 }}>{AFRICA_OPPS[lang]||AFRICA_OPPS.fr}</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:16 }}>
              {[
                { val:'23%',  fr:"Surface planète",          en:"Earth's surface",         es:"Superficie terrestre",      de:"Erdoberfläche" },
                { val:'90%',  fr:"Réserves platine",          en:"Platinum reserves",        es:"Reservas de platino",        de:"Platinreserven" },
                { val:'30%',  fr:"Ressources solaires",       en:"Solar resources",          es:"Recursos solares",           de:"Solarressourcen" },
                { val:'24,3%',fr:"Terres agricoles mondiales",en:"Global agricultural land", es:"Tierras agrícolas mundiales",de:"Weltweite Agrarfläche" },
              ].map(s => (
                <div key={s.val} style={{ textAlign:'center', padding:'28px 14px', border:'1px solid var(--gray-200)', background:'var(--white)', borderTop:'3px solid var(--gold)' }}>
                  <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.8rem', color:'var(--gold)', marginBottom:6 }}>{s.val}</div>
                  <div style={{ fontSize:'.74rem', color:'var(--text-mid)', lineHeight:1.5 }}>{s[lang]||s.fr}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT TIERS */}
      <section style={{ background:'var(--gray-50)', padding:'72px 0' }} ref={tierRef}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Capacité', 'Capacity', 'Capacidad', 'Kapazität','能力')}</div>
            <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl("Fourchettes d'Investissement", "Investment Ranges", "Rangos de Inversión", "Investitionsbereiche","投资范围")}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div className="grid-3">
            {INVEST_CAPACITY.map((t,i) => (
              <div key={i} className={`card-white fade-up${tierVis?' visible':''} delay-${i+1}`} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.72rem', color:'var(--text-mid)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:14 }}>
                  {t[lang]||t.fr}
                </div>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.6rem', color:'var(--gold)', marginBottom:20 }}>{t.range}</div>
                <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(tl(`Bonjour, je suis intéressé(e) par un investissement catégorie "${t.fr}" (${t.range}).`,`Hello, I am interested in investment category "${t.en}" (${t.range}).`,`Hola, estoy interesado/a en la categoría de inversión "${t.es}" (${t.range}).`,`Hallo, ich interessiere mich für die Investitionskategorie "${t.de}" (${t.range}).`))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline-dark btn-sm">
                  {tl('En savoir plus', 'Learn more', 'Saber más', 'Mehr erfahren','了解更多')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT FORM */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:64, alignItems:'start' }}>
            <div>
              <div className="sec-label">{tl('Investissez', 'Invest', 'Invierta', 'Investieren','投资')}</div>
              <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Devenez Investisseur GNAH', 'Become a GNAH Investor', 'Conviértase en Inversor GNAH', 'GNAH-Investor werden','成为GNAH投资者')}</h2>
              <div className="divider-gold"/>
              <p style={{ color:'var(--text-mid)', lineHeight:1.9, marginBottom:28, fontSize:'.88rem' }}>
                {tl("Rejoignez notre réseau d'investisseurs et participez au développement du continent africain.", "Join our investor network and participate in the development of the African continent.", "Únase a nuestra red de inversores y participe en el desarrollo del continente africano.", "Treten Sie unserem Investorennetzwerk bei und beteiligen Sie sich an der Entwicklung des afrikanischen Kontinents.",'加入我们的投资者网络，参与非洲大陆的发展。')}
              </p>
              {[
                {fr:'Analyse de faisabilité offerte',en:'Free feasibility analysis',es:'Análisis de viabilidad gratuito',de:'Kostenlose Machbarkeitsstudie'},
                {fr:'Accès à nos partenaires financiers',en:'Access to our financial partners',es:'Acceso a nuestros socios financieros',de:'Zugang zu unseren Finanzpartnern'},
                {fr:'Suivi personnalisé de votre projet',en:'Personalised project monitoring',es:'Seguimiento personalizado',de:'Personalisiertes Projektmonitoring'},
                {fr:'Relations directes avec les gouvernements',en:'Direct relations with governments',es:'Relaciones directas con gobiernos',de:'Direkte Beziehungen zu Regierungen'},
              ].map((it,i)=>(
                <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:'10px 0', borderBottom:'1px solid var(--gray-200)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                  <span style={{ fontSize:'.85rem', color:'var(--text-mid)' }}>{it[lang]||it.fr}</span>
                </div>
              ))}
            </div>
            <div style={{ background:'var(--navy2)', padding:40, border:'var(--border-gold)' }}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.78rem', color:'var(--gold)', letterSpacing:'.16em', marginBottom:26, textTransform:'uppercase' }}>
                {tl("FORMULAIRE D'INVESTISSEMENT", "INVESTMENT FORM", "FORMULARIO DE INVERSIÓN", "INVESTITIONSFORMULAR",'投资申请表')}
              </div>
              {sent&&<div style={{ background:'rgba(52,211,153,.08)', border:'1px solid rgba(52,211,153,.3)', color:'#34d399', padding:'10px 14px', marginBottom:16, fontSize:'.8rem', fontFamily:'var(--f-display)' }}>
                {tl('✓ Envoyé ! Redirection WhatsApp...', '✓ Sent! WhatsApp redirect...', '✓ ¡Enviado!', '✓ Gesendet!','✓ 已发送！正在跳转至WhatsApp...')}
              </div>}
              <div className="form-grid" style={{ gap:14 }}>
                {[
                  {k:'nom',lf:'Nom Complet *',le:'Full Name *',ls:'Nombre Completo *',ld:'Vollständiger Name *'},
                  {k:'pays',lf:'Pays *',le:'Country *',ls:'País *',ld:'Land *'},
                  {k:'email',lf:'Email *',le:'Email *',ls:'Email *',ld:'E-Mail *',t:'email'},
                  {k:'tel',lf:'Téléphone *',le:'Phone *',ls:'Teléfono *',ld:'Telefon *',t:'tel'},
                ].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-dark">{{fr:f.lf,en:f.le,es:f.ls,de:f.ld}[lang]||f.lf}</label>
                    <input className="form-input form-input-dark" type={f.t||'text'} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl("Montant d'Investissement", "Investment Amount", "Monto de Inversión", "Investitionsbetrag","投资金额")}</label>
                  <select className="form-select form-select-dark" value={form.montant} onChange={e=>setForm(p=>({...p,montant:e.target.value}))}>
                    <option value="">{tl('Sélectionner...', 'Select...', 'Seleccionar...', 'Auswählen...','请选择...')}</option>
                    {AMOUNTS.map(a=><option key={a}>{a}</option>)}
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl("Secteur d'Intérêt", "Sector of Interest", "Sector de Interés", "Interessensbereich","感兴趣的行业")}</label>
                  <select className="form-select form-select-dark" value={form.secteur} onChange={e=>setForm(p=>({...p,secteur:e.target.value}))}>
                    <option value="">{tl('Sélectionner...', 'Select...', 'Seleccionar...', 'Auswählen...','请选择...')}</option>
                    {(SECTORS[lang]||SECTORS.fr).map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Description', 'Description', 'Descripción', 'Beschreibung','描述')}</label>
                  <textarea className="form-textarea form-textarea-dark" value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} placeholder={tl("Décrivez votre projet d'investissement...", "Describe your investment project...", "Describa su proyecto de inversión...", "Beschreiben Sie Ihr Investitionsprojekt...",'描述您的投资项目...')}/>
                </div>
              </div>
              <button onClick={submit} className="btn btn-wa" style={{ marginTop:20, width:'100%', justifyContent:'center' }}>
                <WAIcon/> {tl('Soumettre ma demande', 'Submit my request', 'Enviar mi solicitud', 'Anfrage einreichen','提交我的申请')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
