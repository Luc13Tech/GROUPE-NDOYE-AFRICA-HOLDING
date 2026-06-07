import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../hooks/useLang';
import { COMPANIES, SITE } from '../data/siteData';
import PageHero from '../components/PageHero';

function useInView(t=.1){const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[t]);return[r,v];}

function getCompanies(){
  try{
    const s=localStorage.getItem('gnah_companies');
    if(s){const p=JSON.parse(s);if(Array.isArray(p)&&p.length>0)return p;}
  }catch{}
  return COMPANIES;
}

export default function Entreprises(){
  const{lang}=useLang();
  const[gridRef,gridVis]=useInView();
  const[companies,setCompanies]=useState(getCompanies);
  const tl=(fr,en,es,de,zh)=>({fr,en,es,de,zh}[lang]||fr);

  useEffect(()=>{
    const h=()=>setCompanies(getCompanies());
    window.addEventListener('storage',h);
    const iv=setInterval(h,2000);
    return()=>{window.removeEventListener('storage',h);clearInterval(iv);};
  },[]);

  const active=companies.filter(c=>c.active!==false);

  return(
    <main className="page-white">
      <PageHero
        bgImg="/Images/yaye-dia/cite-vue-aerienne.jpg"
        label={tl('Nos Partenaires Commerciaux','Our Business Partners','Nuestros Socios Comerciales','Unsere Handelspartner','我们的商业合作伙伴')}
        title={tl('Entreprises Partenaires','Partner Companies','Empresas Socias','Partnerunternehmen','合作企业')}
        sub={tl("Des entreprises d'excellence pour bâtir l'Afrique de demain","Excellence companies to build tomorrow's Africa","Empresas de excelencia para construir el África del mañana","Exzellente Unternehmen für das Afrika von morgen","卓越企业，共建明日非洲")}
        breadcrumbs={[{label:tl('Entreprises','Companies','Empresas','Unternehmen','企业')}]}
      />

      {/* INTRO */}
      <section style={{background:'var(--gray-50)',padding:'40px 0 28px',borderBottom:'1px solid var(--gray-200)'}}>
        <div className="container" style={{textAlign:'center'}}>
          <div className="sec-label" style={{display:'inline-flex'}}>
            {tl('Écosystème GNAH','GNAH Ecosystem','Ecosistema GNAH','GNAH-Ökosystem','GNAH生态系统')}
          </div>
          <h2 className="sec-title-light" style={{marginTop:6}}>
            {tl("Entreprises au Cœur de Notre Réseau","Companies at the Heart of Our Network","Empresas en el Corazón de Nuestra Red","Unternehmen im Herzen unseres Netzwerks","我们网络核心企业")}
          </h2>
          <div className="divider-gold-c"/>
          <p style={{color:'var(--text-mid)',maxWidth:640,margin:'0 auto',fontSize:'.88rem',lineHeight:1.8}}>
            {tl(
              "Groupe Ndoye Africa Holding collabore avec des entreprises partenaires sélectionnées pour leur expertise, leur fiabilité et leur vision commune du développement africain.",
              "Groupe Ndoye Africa Holding collaborates with selected partner companies for their expertise, reliability and shared vision of African development.",
              "Groupe Ndoye Africa Holding colabora con empresas socias seleccionadas por su experiencia y visión común.",
              "Groupe Ndoye Africa Holding arbeitet mit ausgewählten Partnerunternehmen für ihre Expertise zusammen.",
              "Groupe Ndoye Africa Holding与精选合作企业携手，共同推动非洲发展。"
            )}
          </p>
        </div>
      </section>

      {/* COMPANIES GRID */}
      <section className="section" ref={gridRef}>
        <div className="container">
          {active.length===0?(
            <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text-mid)'}}>
              <div style={{fontFamily:'var(--f-display)',fontSize:'.82rem',letterSpacing:'.1em'}}>
                {tl('Aucune entreprise partenaire pour le moment.','No partner companies at the moment.','No hay empresas socias por el momento.','Derzeit keine Partnerunternehmen.','暂无合作企业。')}
              </div>
            </div>
          ):(
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:24}}>
              {active.map((company,idx)=>{
                const desc=typeof company.desc==='object'?(company.desc[lang]||company.desc.fr):company.desc;
                const sector=typeof company.sector==='object'?(company.sector[lang]||company.sector.fr):company.sector;
                return(
                  <div key={company.id}
                    className={`fade-up${gridVis?' visible':''}`}
                    style={{transitionDelay:`${(idx%4)*0.1}s`,background:'var(--white)',border:'1px solid var(--gray-200)',overflow:'hidden',transition:'var(--trans)',boxShadow:'var(--shadow-sm)',display:'flex',flexDirection:'column'}}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='var(--shadow-lg)';e.currentTarget.style.borderColor='var(--gold)';}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='var(--shadow-sm)';e.currentTarget.style.borderColor='var(--gray-200)';}}>

                    {/* LOGO AREA */}
                    <div style={{background:'var(--navy)',padding:'32px 24px',display:'flex',alignItems:'center',justifyContent:'center',minHeight:150,position:'relative',overflow:'hidden',borderBottom:'3px solid var(--gold)'}}>
                      <div style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(201,168,76,.03) 20px,rgba(201,168,76,.03) 21px)',zIndex:0}}/>
                      {company.logo?(
                        <img
                          src={company.logo}
                          alt={company.name}
                          style={{maxHeight:90,maxWidth:210,objectFit:'contain',position:'relative',zIndex:1,filter:'brightness(1.1)'}}
                          onError={e=>{
                            e.target.style.display='none';
                            const fb=e.target.parentNode.querySelector('.logo-fallback');
                            if(fb)fb.style.display='flex';
                          }}
                        />
                      ):null}
                      <div className="logo-fallback" style={{display:company.logo?'none':'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,var(--gold),var(--gold-d))',width:80,height:80,position:'relative',zIndex:1}}>
                        <span style={{fontFamily:'var(--f-display)',fontSize:'1.4rem',color:'var(--navy)',fontWeight:700,letterSpacing:'.08em'}}>
                          {(company.name||'?').slice(0,2).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div style={{padding:'22px 24px',display:'flex',flexDirection:'column',flex:1}}>
                      <div style={{width:'100%',height:2,background:'linear-gradient(90deg,var(--gold),transparent)',marginBottom:16}}/>

                      <h3 style={{fontFamily:'var(--f-display)',fontSize:'1rem',color:'var(--text-dark)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:10}}>
                        {company.name}
                      </h3>

                      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:14}}>
                        <span style={{padding:'3px 10px',background:'rgba(201,168,76,.1)',color:'var(--gold)',fontFamily:'var(--f-display)',fontSize:'.58rem',letterSpacing:'.1em',border:'1px solid rgba(201,168,76,.25)'}}>
                          {sector}
                        </span>
                        {company.country&&(
                          <span style={{padding:'3px 10px',background:'var(--gray-50)',color:'var(--text-mid)',fontFamily:'var(--f-display)',fontSize:'.58rem',letterSpacing:'.1em',border:'1px solid var(--gray-200)'}}>
                            {company.country}
                          </span>
                        )}
                      </div>

                      <p style={{fontSize:'.84rem',color:'var(--text-mid)',lineHeight:1.8,marginBottom:20,flex:1}}>
                        {desc&&desc.length>200?desc.slice(0,200)+'...':desc}
                      </p>

                      <a
                        href={company.website||'#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{display:'inline-flex',alignItems:'center',gap:8,padding:'11px 22px',background:'linear-gradient(135deg,#c9a84c,#e8c96a,#8b6914)',color:'var(--navy)',fontFamily:'var(--f-display)',fontSize:'.7rem',letterSpacing:'.12em',textTransform:'uppercase',textDecoration:'none',transition:'var(--trans-f)',alignSelf:'flex-start'}}
                        onMouseEnter={e=>{e.currentTarget.style.opacity='.85';e.currentTarget.style.transform='translateY(-2px)';}}
                        onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)';}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                        {tl('En savoir plus','Learn more','Saber más','Mehr erfahren','了解更多')}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--navy)',padding:'64px 0'}}>
        <div className="container" style={{textAlign:'center'}}>
          <div className="sec-label" style={{display:'inline-flex'}}>
            {tl('Rejoignez le réseau','Join the network','Únase a la red','Dem Netzwerk beitreten','加入网络')}
          </div>
          <h2 className="sec-title-dark" style={{marginTop:6}}>
            {tl('Votre Entreprise dans Notre Réseau ?','Your Company in Our Network?','¿Su Empresa en Nuestra Red?','Ihr Unternehmen in unserem Netzwerk?','您的企业加入我们的网络？')}
          </h2>
          <div className="divider-gold-c"/>
          <p style={{color:'rgba(200,195,186,.55)',maxWidth:500,margin:'0 auto 28px',fontSize:'.88rem',lineHeight:1.8}}>
            {tl(
              "Contactez-nous pour discuter d'un partenariat.",
              "Contact us to discuss a partnership.",
              "Contáctenos para discutir una asociación.",
              "Kontaktieren Sie uns für eine Partnerschaft.",
              "联系我们讨论合作事宜。"
            )}
          </p>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(tl("Bonjour, je souhaite proposer mon entreprise pour intégrer le réseau GNAH.","Hello, I would like to propose my company to join the GNAH network.","Hola, me gustaría proponer mi empresa para integrarse en la red GNAH.","Hallo, ich möchte mein Unternehmen für das GNAH-Netzwerk vorschlagen.","您好，我想将我的企业加入GNAH网络。"))}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-wa"
            style={{display:'inline-flex',alignItems:'center',gap:8}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
