import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
function useW(){const[w,sw]=React.useState(window.innerWidth);React.useEffect(()=>{const h=()=>sw(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return w;}
import { SITE } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.12){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

const WAIcon=()=><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

const SOCIALS = [
  { key:'facebook',  href:SITE.social?.facebook||'#',  label:'Facebook',  color:'#1877F2',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { key:'instagram', href:SITE.social?.instagram||'#', label:'Instagram', color:'#E1306C',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { key:'tiktok',    href:SITE.social?.tiktok||'#',    label:'TikTok',    color:'#ffffff',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg> },
  { key:'threads',   href:SITE.social?.threads||'#',   label:'Threads',   color:'#ffffff',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01v-.017c.024-3.581 1.205-6.334 3.509-8.184C7.16 2.153 10.013 1.5 12.01 1.5h.017c2.562.017 4.747.68 6.496 1.97 1.734 1.279 2.696 2.988 2.866 5.08l.008.087h-3.01l-.006-.072c-.134-1.439-.784-2.648-1.934-3.594-1.156-.951-2.706-1.435-4.607-1.448h-.013c-2.357.017-4.29.761-5.748 2.212-1.459 1.45-2.199 3.39-2.199 5.765v.013c.017 2.357.761 4.29 2.212 5.748 1.45 1.459 3.39 2.199 5.765 2.199h.013c1.688-.011 3.093-.386 4.178-1.115.913-.615 1.525-1.456 1.822-2.503a5.17 5.17 0 00.092-1.613c-.096-.806-.351-1.457-.758-1.937a3.07 3.07 0 00-1.423-.889 8.15 8.15 0 00-.406-.094c-.179 1.688-.752 2.996-1.713 3.891-.961.897-2.229 1.351-3.774 1.351h-.01c-1.361-.009-2.482-.412-3.334-1.199-.855-.788-1.293-1.862-1.302-3.191v-.01c.008-1.263.407-2.293 1.187-3.063.791-.78 1.922-1.196 3.367-1.235h.028c.959.027 1.77.279 2.412.748.566.414.941.975 1.115 1.671a7.5 7.5 0 01.121.82c.065.558.076 1.089.034 1.58l-.011.132c.565.136 1.085.401 1.546.787.764.638 1.235 1.528 1.4 2.646a8.16 8.16 0 01-.12 2.534c-.39 1.475-1.235 2.706-2.514 3.658-1.354.999-3.132 1.517-5.284 1.539h-.02z"/></svg> },
  { key:'linkedin',  href:SITE.social?.linkedin||'#',  label:'LinkedIn',  color:'#0A66C2',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
];

const SUBJECTS = {
  fr:['Demande d\'information','Réservation villa','Investissement','Partenariat','Collaboration','Autre'],
  en:['Information request','Villa booking','Investment','Partnership','Collaboration','Other'],
  es:['Solicitud de información','Reserva de villa','Inversión','Asociación','Colaboración','Otro'],
  de:['Informationsanfrage','Villabuchung','Investition','Partnerschaft','Zusammenarbeit','Sonstiges'],
};

export default function Contact() {
  const { lang } = useLang();
  const _w = useW();
  const isMob = _w < 768;
  const isTab = _w < 1024;
  const [gridRef, gridVis] = useInView();
  const [form, setForm] = useState({ nom:'', email:'', tel:'', pays:'', objet:'', msg:'' });
  const [sent, setSent] = useState(false);
  const tl = (fr,en,es,de,zh='') => ({fr,en,es,de,zh}[lang]||fr);

  const wm = typeof SITE.waMsg==='object' ? (SITE.waMsg[lang]||SITE.waMsg.fr) : SITE.waMsg;

  const submit = () => {
    if (!form.nom || !form.msg) return;
    const msg = `${tl('Bonjour', 'Hello', 'Hola', 'Hallo','您好')}, ${tl('je m\'appelle', 'my name is', 'me llamo', 'ich heiße','我的名字是')} ${form.nom}${form.pays ? ` (${form.pays})` : ''}.
${tl('Objet', 'Subject', 'Asunto', 'Betreff','主题')}: ${form.objet || 'N/A'}.
${tl('Téléphone', 'Phone', 'Teléfono', 'Telefon','电话')}: ${form.tel || 'N/A'}.
Email: ${form.email || 'N/A'}.

${form.msg}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ nom:'', email:'', tel:'', pays:'', objet:'', msg:'' }); }, 4000);
  };

  const CONTACT_INFO = [
    { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      label:tl('Adresse', 'Address', 'Dirección', 'Adresse','地址'),
      val: SITE.address_fr },
    { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2.84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 10.9a16 16 0 006.29 6.29l1.22-1.22a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0121.17 18z"/></svg>,
      label:'WhatsApp / Téléphone',
      val: SITE.phone, href:`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}` },
    { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label:'Email',
      val: SITE.email, href:`mailto:${SITE.email}` },
  ];

  return (
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/villa-f4pp-facade.jpg"
        label={tl("Restons en contact", "Let's stay in touch", "Mantengámonos en contacto", "Bleiben wir in Kontakt",'让我们保持联系')}
        title={tl('Contactez-Nous', 'Contact Us', 'Contáctenos', 'Kontakt','联系我们')}
        sub={tl('Notre équipe est à votre disposition 7j/7', 'Our team is available 7 days a week', 'Nuestro equipo está disponible 7 días a la semana', 'Unser Team ist 7 Tage die Woche für Sie da','我们的团队每周7天为您服务')}
        breadcrumbs={[{ label:tl('Contact', 'Contact', 'Contacto', 'Kontakt','联系') }]}
      />

      {/* MAIN SECTION */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:64, alignItems:'start' }}>

            {/* LEFT — INFO + SOCIALS */}
            <div className={`slide-left${gridVis?' visible':''}`}>
              <div className="sec-label">{tl('Coordonnées', 'Details', 'Coordenadas', 'Kontaktdaten','联系方式')}</div>
              <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Nos Coordonnées', 'Our Details', 'Nuestros Datos', 'Unsere Daten','我们的联系方式')}</h2>
              <div className="divider-gold"/>
              <p style={{ color:'var(--text-mid)', lineHeight:1.9, marginBottom:32, fontSize:'.88rem' }}>
                {tl("N'hésitez pas à nous contacter pour tout renseignement sur nos projets, services ou opportunités d'investissement. Notre équipe vous répond rapidement.", "Do not hesitate to contact us for any information about our projects, services or investment opportunities. Our team will respond quickly.", "No dude en contactarnos para cualquier información sobre nuestros proyectos, servicios u oportunidades de inversión.", "Zögern Sie nicht, uns für Informationen über unsere Projekte, Dienstleistungen oder Investitionsmöglichkeiten zu kontaktieren.",'如需了解我们的项目、服务或投资机会，请随时联系我们。')}
              </p>

              {/* Contact cards */}
              {CONTACT_INFO.map((c,i)=>(
                <div key={i} style={{ display:'flex', gap:16, alignItems:'flex-start', padding:'18px 20px', border:'1px solid var(--gray-200)', marginBottom:12, borderLeft:'3px solid var(--gold)', transition:'var(--trans)', background:'var(--white)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.transform='translateX(4px)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='translateX(0)'; }}>
                  <div style={{ flexShrink:0, marginTop:2 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily:'var(--f-display)', fontSize:'.62rem', letterSpacing:'.14em', color:'var(--gold)', textTransform:'uppercase', marginBottom:4 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ color:'var(--text-dark)', fontSize:'.9rem', textDecoration:'none', transition:'color .2s' }}
                          onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
                          onMouseLeave={e=>e.currentTarget.style.color='var(--text-dark)'}>{c.val}</a>
                      : <span style={{ color:'var(--text-dark)', fontSize:'.9rem' }}>{c.val}</span>}
                  </div>
                </div>
              ))}

              {/* Social networks */}
              <div style={{ marginTop:28 }}>
                <div className="sec-label" style={{ marginBottom:14 }}>{tl('Réseaux Sociaux', 'Social Networks', 'Redes Sociales', 'Soziale Netzwerke','社交媒体')}</div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  {SOCIALS.map(s=>(
                    <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px', border:'1px solid var(--gray-200)', color:'var(--text-dark)', textDecoration:'none', transition:'var(--trans)', fontFamily:'var(--f-display)', fontSize:'.66rem', letterSpacing:'.08em' }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color; e.currentTarget.style.color=s.color; e.currentTarget.style.background=`${s.color}0d`; e.currentTarget.style.transform='translateY(-2px)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--gray-200)'; e.currentTarget.style.color='var(--text-dark)'; e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='translateY(0)'; }}>
                      <span style={{ color:s.color }}>{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp direct CTA */}
              <div style={{ marginTop:28, padding:'20px 22px', background:'var(--navy)', border:'1px solid rgba(201,168,76,.2)' }}>
                <div style={{ fontFamily:'var(--f-display)', fontSize:'.68rem', color:'var(--gold)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:8 }}>
                  {tl('Réponse Rapide', 'Quick Response', 'Respuesta Rápida', 'Schnelle Antwort','快速回复')}
                </div>
                <p style={{ color:'rgba(200,195,186,.55)', fontSize:'.82rem', lineHeight:1.7, marginBottom:14 }}>
                  {tl('Contactez-nous directement sur WhatsApp pour une réponse sous 24h.', 'Contact us directly on WhatsApp for a response within 24 hours.', 'Contáctenos directamente en WhatsApp para una respuesta en 24 horas.', 'Kontaktieren Sie uns direkt per WhatsApp für eine Antwort innerhalb von 24 Stunden.','直接通过WhatsApp联系我们，24小时内回复。')}
                </p>
                <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-wa btn-sm" style={{ display:'inline-flex', alignItems:'center', gap:7 }}>
                  <WAIcon/> WhatsApp : {SITE.phone}
                </a>
              </div>
            </div>

            {/* RIGHT — FORM */}
            <div className={`slide-right${gridVis?' visible':''}`} style={{ background:'var(--navy2)', padding:40, border:'var(--border-gold)' }}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.78rem', color:'var(--gold)', letterSpacing:'.16em', marginBottom:26, textTransform:'uppercase' }}>
                {tl('FORMULAIRE DE CONTACT', 'CONTACT FORM', 'FORMULARIO DE CONTACTO', 'KONTAKTFORMULAR','联系表格')}
              </div>

              {sent && (
                <div style={{ background:'rgba(52,211,153,.08)', border:'1px solid rgba(52,211,153,.3)', color:'#34d399', padding:'12px 16px', marginBottom:18, fontSize:'.82rem', fontFamily:'var(--f-display)', letterSpacing:'.06em', display:'flex', alignItems:'center', gap:8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                  {tl('Message envoyé ! Redirection WhatsApp...', 'Message sent! WhatsApp redirect...', '¡Mensaje enviado! Redirigiendo a WhatsApp...', 'Nachricht gesendet! WhatsApp-Weiterleitung...','消息已发送！正在跳转至WhatsApp...')}
                </div>
              )}

              <div className="form-grid" style={{ gap:16 }}>
                {[
                  { k:'nom',   lf:'Nom Complet *',   le:'Full Name *',    ls:'Nombre Completo *',  ld:'Vollständiger Name *' },
                  { k:'email', lf:'Email *',          le:'Email *',        ls:'Email *',            ld:'E-Mail *', t:'email' },
                  { k:'tel',   lf:'Téléphone',        le:'Phone',          ls:'Teléfono',           ld:'Telefon', t:'tel' },
                  { k:'pays',  lf:'Pays',             le:'Country',        ls:'País',               ld:'Land' },
                ].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-dark">{{fr:f.lf,en:f.le,es:f.ls,de:f.ld}[lang]||f.lf}</label>
                    <input className="form-input form-input-dark" type={f.t||'text'} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/>
                  </div>
                ))}

                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Objet *', 'Subject *', 'Asunto *', 'Betreff *','主题 *')}</label>
                  <select className="form-select form-select-dark" value={form.objet} onChange={e=>setForm(p=>({...p,objet:e.target.value}))}>
                    <option value="">{tl('Sélectionner un objet...', 'Select a subject...', 'Seleccionar un asunto...', 'Betreff auswählen...','请选择主题...')}</option>
                    {(SUBJECTS[lang]||SUBJECTS.fr).map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group form-full">
                  <label className="form-label form-label-dark">{tl('Message *', 'Message *', 'Mensaje *', 'Nachricht *','消息 *')}</label>
                  <textarea className="form-textarea form-textarea-dark" style={{ minHeight:140 }}
                    placeholder={tl('Votre message...', 'Your message...', 'Su mensaje...', 'Ihre Nachricht...','您的消息...')}
                    value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))}/>
                </div>
              </div>

              <button onClick={submit} className="btn btn-wa"
                style={{ marginTop:22, width:'100%', justifyContent:'center', padding:'14px' }}>
                <WAIcon/>
                {tl('Envoyer via WhatsApp', 'Send via WhatsApp', 'Enviar por WhatsApp', 'Per WhatsApp senden','通过WhatsApp发送')}
              </button>

              <p style={{ marginTop:12, fontSize:'.74rem', color:'rgba(200,195,186,.3)', textAlign:'center', fontFamily:'var(--f-display)', letterSpacing:'.06em' }}>
                {tl('Réponse sous 24h — Équipe disponible 7j/7', 'Response within 24h — Team available 7 days/7', 'Respuesta en 24h — Equipo disponible 7 días/7', 'Antwort innerhalb 24h — Team verfügbar 7 Tage/7','24小时内回复 — 团队每周7天为您服务')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding:'0 0 72px' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div className="sec-label" style={{ display:'inline-flex' }}>{tl('Localisation', 'Location', 'Ubicación', 'Standort','位置')}</div>
            <h2 className="sec-title-light" style={{ marginTop:6 }}>{tl('Nous Trouver', 'Find Us', 'Encuéntrenos', 'Uns finden','找到我们')}</h2>
            <div className="divider-gold-c"/>
          </div>
          <div style={{ border:'3px solid var(--gold)', overflow:'hidden', height:360, position:'relative' }}>
            <iframe
              title="GNAH Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-16.8,14.5,-16.4,14.8&layer=mapnik&marker=14.693425,-17.447938"
              style={{ width:'100%', height:'100%', border:0 }}
              loading="lazy"
              allowFullScreen
            />
            <div style={{ position:'absolute', top:12, left:12, background:'rgba(5,8,16,.9)', backdropFilter:'blur(8px)', padding:'8px 14px', border:'1px solid rgba(201,168,76,.3)' }}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.65rem', color:'var(--gold)', letterSpacing:'.12em', textTransform:'uppercase' }}>GNAH</div>
              <div style={{ fontFamily:'var(--f-body)', fontSize:'.76rem', color:'rgba(200,195,186,.7)', marginTop:2 }}>Cité Baobab, Sénégal</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
