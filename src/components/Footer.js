import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { SITE, NAV } from '../data/siteData';

const SocialIcon = ({ name }) => {
  const icons = {
    facebook:  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
    instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    tiktok:    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>,
    threads:   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01v-.017c.024-3.581 1.205-6.334 3.509-8.184C7.16 2.153 10.013 1.5 12.01 1.5h.017c2.562.017 4.747.68 6.496 1.97 1.734 1.279 2.696 2.988 2.866 5.08l.008.087h-3.01l-.006-.072c-.134-1.439-.784-2.648-1.934-3.594-1.156-.951-2.706-1.435-4.607-1.448h-.013c-2.357.017-4.29.761-5.748 2.212-1.459 1.45-2.199 3.39-2.199 5.765v.013c.017 2.357.761 4.29 2.212 5.748 1.45 1.459 3.39 2.199 5.765 2.199h.013c1.688-.011 3.093-.386 4.178-1.115.913-.615 1.525-1.456 1.822-2.503a5.17 5.17 0 00.092-1.613c-.096-.806-.351-1.457-.758-1.937a3.07 3.07 0 00-1.423-.889 8.15 8.15 0 00-.406-.094c-.179 1.688-.752 2.996-1.713 3.891-.961.897-2.229 1.351-3.774 1.351h-.01c-1.361-.009-2.482-.412-3.334-1.199-.855-.788-1.293-1.862-1.302-3.191v-.01c.008-1.263.407-2.293 1.187-3.063.791-.78 1.922-1.196 3.367-1.235h.028c.959.027 1.77.279 2.412.748.566.414.941.975 1.115 1.671a7.5 7.5 0 01.121.82c.065.558.076 1.089.034 1.58l-.011.132c.565.136 1.085.401 1.546.787.764.638 1.235 1.528 1.4 2.646a8.16 8.16 0 01-.12 2.534c-.39 1.475-1.235 2.706-2.514 3.658-1.354.999-3.132 1.517-5.284 1.539h-.02z"/></svg>,
    linkedin:  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  };
  return icons[name] || null;
};

export default function Footer() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const handleNav = (path) => { window.scrollTo({ top:0, behavior:'instant' }); navigate(path); };
  const tl = (fr,en,es,de) => ({fr,en,es,de}[lang]||fr);
  const wm = typeof SITE.waMsg==='object' ? (SITE.waMsg[lang]||SITE.waMsg.fr) : SITE.waMsg;
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`;
  const socials = [
    { key:'facebook', href:SITE.social.facebook, label:'Facebook' },
    { key:'instagram',href:SITE.social.instagram,label:'Instagram' },
    { key:'tiktok',   href:SITE.social.tiktok,   label:'TikTok' },
    { key:'threads',  href:SITE.social.threads,  label:'Threads' },
    { key:'linkedin', href:SITE.social.linkedin, label:'LinkedIn' },
  ];
  const navLabel = (item) => item[lang] || item.fr;

  return (
    <footer style={{ position:'relative', overflow:'hidden' }}>
      {/* Background cuisine image */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:"url('/Images/yaye-dia/cuisine-luxe.jpg')",
        backgroundSize:'cover', backgroundPosition:'center 40%',
        filter:'brightness(2.15)', zIndex:0,
      }}/>
      {/* Gold gradient overlay */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(180deg,rgba(5,8,16,.94) 0%,rgba(13,20,39,.9) 50%,rgba(5,8,16,.97) 100%)',
        zIndex:1,
      }}/>
      {/* Top border */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,var(--gold),rgba(201,168,76,.3),var(--gold),transparent)', zIndex:2 }}/>

      <div style={{ position:'relative', zIndex:3, padding:'64px 0 28px' }}>
        <div className="container">
          <div className="footer-grid">
            {/* BRAND */}
            <div>
              <div style={{ marginBottom:18 }}>
                <div style={{ background:'rgba(13,20,39,.85)', border:'1px solid rgba(201,168,76,.3)', padding:'10px 18px', display:'inline-block', backdropFilter:'blur(8px)' }}>
                  <div style={{ fontFamily:'var(--f-display)', fontSize:'.82rem', color:'var(--cream)', letterSpacing:'.22em' }}>GROUPE NDOYE AFRICA</div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
                    <div style={{ width:28, height:1.5, background:'var(--gold)' }}/>
                    <div style={{ fontFamily:'var(--f-display)', fontSize:'.7rem', color:'var(--gold)', letterSpacing:'.32em' }}>HOLDING.</div>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', color:'rgba(200,195,186,.5)', fontSize:'.88rem', marginBottom:16 }}>
                {tl("Bâtir l'Afrique de demain, un projet à la fois","Building tomorrow's Africa, one project at a time","Construyendo el África del mañana, un proyecto a la vez","Das Afrika von morgen bauen, ein Projekt nach dem anderen")}
              </div>
              <p style={{ fontSize:'.82rem', color:'rgba(200,195,186,.38)', marginBottom:20, lineHeight:1.8, maxWidth:280 }}>
                {tl("Société spécialisée dans le développement de projets, l'infrastructure et l'immobilier depuis 2015.",
                    "Company specialising in project development, infrastructure and real estate since 2015.",
                    "Empresa especializada en desarrollo de proyectos, infraestructura e inmobiliaria desde 2015.",
                    "Unternehmen spezialisiert auf Projektentwicklung, Infrastruktur und Immobilien seit 2015.")}
              </p>
              <div className="footer-socials">
                {socials.map(s=>(
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="footer-social" title={s.label} aria-label={s.label}>
                    <SocialIcon name={s.key}/>
                  </a>
                ))}
              </div>
            </div>

            {/* NAV 1 */}
            <div>
              <div className="footer-col-title">{tl('Navigation','Navigation','Navegación','Navigation')}</div>
              <div className="footer-links">
                {NAV.slice(0,5).map(item=>(
                  <span key={item.id} className="footer-link" onClick={()=>handleNav(item.path)} style={{cursor:'pointer',display:'block'}}>{navLabel(item)}</span>
                ))}
              </div>
            </div>

            {/* NAV 2 */}
            <div>
              <div className="footer-col-title">{tl('Liens Utiles','Useful Links','Enlaces Útiles','Nützliche Links')}</div>
              <div className="footer-links">
                {NAV.slice(5).map(item=>(
                  <span key={item.id} className="footer-link" onClick={()=>handleNav(item.path)} style={{cursor:'pointer',display:'block'}}>{navLabel(item)}</span>
                ))}
                <span className="footer-link" onClick={()=>handleNav('/galerie')} style={{cursor:'pointer',display:'block'}}>{tl('Galerie Photos','Photo Gallery','Galería de Fotos','Fotogalerie')}</span>
                <span className="footer-link" onClick={()=>handleNav('/videos')} style={{cursor:'pointer',display:'block'}}>{tl('Nos Vidéos','Our Videos','Nuestros Videos','Unsere Videos')}</span>
                <span className="footer-link" onClick={()=>handleNav('/admin')} style={{cursor:'pointer',display:'block',opacity:.28,fontSize:'.76rem'}}>Admin</span>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <div className="footer-col-title">{tl('Contact','Contact','Contacto','Kontakt')}</div>
              {[
                { d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10m-3 0a3 3 0 016 0 3 3 0 01-6 0", val:tl(SITE.address_fr,SITE.address_fr,SITE.address_fr,SITE.address_fr) },
                { d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2.84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 10.9a16 16 0 006.29 6.29l1.22-1.22a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0121.17 18z", val:SITE.phone },
                { d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6", val:SITE.email },
              ].map((row,i)=>(
                <div key={i} className="footer-contact-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" style={{flexShrink:0,marginTop:2}}><path d={row.d}/></svg>
                  <span style={{wordBreak:'break-all',fontSize:'.82rem'}}>{row.val}</span>
                </div>
              ))}
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-wa btn-sm" style={{marginTop:16,display:'inline-flex',alignItems:'center',gap:7}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {tl('Nous contacter','Contact us','Contáctenos','Kontakt')}
              </a>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Groupe Ndoye Africa Holding. {tl('Tous droits réservés.','All rights reserved.','Todos los derechos reservados.','Alle Rechte vorbehalten.')}</span>
            <span style={{fontFamily:'var(--f-serif)',fontStyle:'italic',color:'rgba(201,168,76,.25)'}}>
              {tl("Bâtir l'Afrique de demain","Building tomorrow's Africa","Construyendo el África del mañana","Das Afrika von morgen bauen")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
