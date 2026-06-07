import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { NAV, SITE } from '../data/siteData';

const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const SOCIALS = [
  { href: SITE.social?.facebook,  label: 'Facebook',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { href: SITE.social?.instagram, label: 'Instagram',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { href: SITE.social?.linkedin,  label: 'LinkedIn',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { href: SITE.social?.tiktok,    label: 'TikTok',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg> },
];

export default function Footer() {
  const { lang } = useLang();
  const tl = (fr, en, es, de, zh) => ({ fr, en, es, de, zh }[lang] || fr);
  const wm = typeof SITE.waMsg === 'object' ? (SITE.waMsg[lang] || SITE.waMsg.fr) : SITE.waMsg;
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(wm)}`;
  const nl = (item) => item[lang] || item.fr;

  // Split NAV into two columns
  const nav1 = NAV.slice(0, 6);
  const nav2 = NAV.slice(6);

  return (
    <footer style={{
      position: 'relative', overflow: 'hidden',
      background: `linear-gradient(rgba(5,8,16,.92),rgba(5,8,16,.97)), url('/Images/yaye-dia/cuisine-luxe.jpg') center/cover no-repeat`,
      borderTop: '2px solid var(--gold)',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,.02) 40px,rgba(201,168,76,.02) 41px)', pointerEvents: 'none' }}/>

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,32px) clamp(24px,4vw,40px)' }}>
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="/Images/logo/gnah-logo.png" alt="GNAH"
                style={{ height: 52, objectFit: 'contain', marginBottom: 10, display: 'block' }}
                onError={e => e.target.style.display = 'none'}
              />
              <div className="footer-brand">GROUPE NDOYE AFRICA HOLDING</div>
              <div style={{ width: 36, height: 1.5, background: 'var(--gold)', margin: '6px 0 8px' }}/>
              <div className="footer-tagline">
                {tl("Bâtir l'Afrique de demain","Building tomorrow's Africa","Construyendo el África del mañana","Das Afrika von morgen bauen","建设明日非洲")}
              </div>
            </div>
            <div style={{ fontSize: '.82rem', color: 'rgba(200,195,186,.45)', lineHeight: 1.7, marginBottom: 18 }}>
              {tl(
                "Société spécialisée dans le développement de projets, l'infrastructure et l'immobilier en Afrique depuis 2015.",
                "Company specialising in project development, infrastructure and real estate in Africa since 2015.",
                "Empresa especializada en desarrollo de proyectos, infraestructura e inmobiliaria en África desde 2015.",
                "Unternehmen für Projektentwicklung, Infrastruktur und Immobilien in Afrika seit 2015.",
                "自2015年以来专注于非洲项目开发、基础设施和房地产的公司。"
              )}
            </div>
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="footer-social" title={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Nav col 1 */}
          <div>
            <div className="footer-col-title">{tl('Navigation','Navigation','Navegación','Navigation','导航')}</div>
            <div className="footer-links">
              {nav1.map(item => (
                <Link key={item.id} to={item.path} className="footer-link"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                  {nl(item)}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav col 2 */}
          <div>
            <div className="footer-col-title">&nbsp;</div>
            <div className="footer-links" style={{ marginTop: 'clamp(14px,2vw,24px)' }}>
              {nav2.map(item => (
                <Link key={item.id} to={item.path} className="footer-link"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                  {nl(item)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact col */}
          <div>
            <div className="footer-col-title">{tl('Contact','Contact','Contacto','Kontakt','联系')}</div>
            <div className="footer-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 2 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{SITE.address_fr}</span>
            </div>
            <div className="footer-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 2 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2.84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 10.9a16 16 0 006.29 6.29l1.22-1.22a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0121.17 18z"/></svg>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(200,195,186,.55)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,195,186,.55)'}>
                {SITE.phone}
              </a>
            </div>
            <div className="footer-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 2 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href={`mailto:${SITE.email}`}
                style={{ color: 'rgba(200,195,186,.55)', textDecoration: 'none', fontSize: '.8rem', transition: 'color .2s', wordBreak: 'break-all' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,195,186,.55)'}>
                {SITE.email}
              </a>
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', background: '#25D366', color: '#fff', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s', marginTop: 8 }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1ebe5b'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <WAIcon />
              {tl('Nous écrire','Message us','Escríbanos','Schreiben Sie uns','给我们发消息')}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{ marginTop: 'clamp(28px,4vw,48px)' }}>
          <span>© {new Date().getFullYear()} Groupe Ndoye Africa Holding. {tl('Tous droits réservés.','All rights reserved.','Todos los derechos reservados.','Alle Rechte vorbehalten.','版权所有。')}</span>
          <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', color: 'rgba(201,168,76,.2)' }}>
            {tl("Bâtir l'Afrique de demain","Building tomorrow's Africa","Construyendo el África del mañana","Das Afrika von morgen bauen","建设明日非洲")}
          </span>
        </div>
      </div>
    </footer>
  );
}
