import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { useContent } from '../services/ContentProvider';
import { makeTl, pick } from '../utils/i18n';

const SITE_URL = 'https://groupendoyeafrica.com';
const PRIMARY = ['services', 'projets', 'partenaires', 'entreprises', 'investisseurs', 'about'];

const icon = (d, filled) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const SOCIAL_ICONS = {
  facebook: icon(<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />, true),
  instagram: icon(<><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.4A4 4 0 1112.6 8 4 4 0 0116 11.4z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></>),
  linkedin: icon(<><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>),
  tiktok: icon(<path d="M19.6 6.7a4.8 4.8 0 01-3.8-4.3V2h-3.4v13.7a2.9 2.9 0 11-2-2.8V9.4a6.3 6.3 0 105.4 6.3V8.7a8.2 8.2 0 004.8 1.5V6.8a4.9 4.9 0 01-1-.1z" />, true),
};

export default function Footer() {
  const { lang } = useLang();
  const { NAV, SITE, TAGLINE, COMPANY_INTRO } = useContent();
  const tl = makeTl(lang);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [copied, setCopied] = useState(false);

  // L'état « installée » reflète toujours la réalité du moment : on peut réinstaller après une désinstallation.
  useEffect(() => {
    const check = () => setInstalled(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
    check();
    const onPrompt = (e) => { e.preventDefault(); setDeferredPrompt(e); setInstalled(false); };
    const onInstalled = () => setInstalled(true);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    const timer = setInterval(check, 3000);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      clearInterval(timer);
    };
  }, []);

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setInstalled(true);
      setDeferredPrompt(null);
      return;
    }
    window.alert(tl(
      'Pour installer l’application, ouvrez le menu de votre navigateur et choisissez « Ajouter à l’écran d’accueil » ou « Installer l’application ».',
      'To install the app, open your browser menu and choose “Add to Home Screen” or “Install app”.',
      'Para instalar la aplicación, abra el menú del navegador y elija «Añadir a la pantalla de inicio» o «Instalar aplicación».',
      'Um die App zu installieren, öffnen Sie das Browsermenü und wählen Sie „Zum Startbildschirm hinzufügen“ oder „App installieren“.',
      '要安装应用，请打开浏览器菜单，选择“添加到主屏幕”或“安装应用”。'
    ));
  };

  const share = async () => {
    const payload = { title: SITE.name, text: pick(TAGLINE, lang), url: SITE_URL };
    try {
      if (navigator.share) await navigator.share(payload);
      else {
        await navigator.clipboard.writeText(SITE_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      /* partage annulé par l'utilisateur */
    }
  };

  const label = (item) => item[lang] || item.fr;
  const byId = (id) => NAV.find((n) => n.id === id);
  const primary = PRIMARY.map(byId).filter(Boolean);
  const rest = NAV.filter((n) => !PRIMARY.includes(n.id) && n.id !== 'home');
  const social = Object.entries(SITE.social || {}).filter(([k, url]) => SOCIAL_ICONS[k] && url);
  const intro = pick(COMPANY_INTRO, lang) || '';

  return (
    <footer className="foot on-dark">
      <div className="container">
        <div className="foot__app">
          <p>{tl(
            'Installez l’application sur votre téléphone, votre tablette ou votre ordinateur pour retrouver le groupe en un geste.',
            'Install the app on your phone, tablet or computer and reach the group in a single tap.',
            'Instale la aplicación en su teléfono, tableta u ordenador y acceda al grupo con un solo gesto.',
            'Installieren Sie die App auf Ihrem Smartphone, Tablet oder Computer und erreichen Sie die Gruppe mit einem Fingertipp.',
            '在手机、平板或电脑上安装应用，一键即可访问集团。'
          )}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {installed ? (
              <span className="btn btn--ghost btn--sm" style={{ cursor: 'default' }}>
                ✓ {tl('Application installée', 'App installed', 'Aplicación instalada', 'App installiert', '应用已安装')}
              </span>
            ) : (
              <button type="button" className="btn btn--float btn--sm" onClick={install}>
                {tl('Installer l’application', 'Install the app', 'Instalar la aplicación', 'App installieren', '安装应用')}
              </button>
            )}
            <button type="button" className="btn btn--ghost btn--sm" onClick={share}>
              {copied ? tl('Lien copié', 'Link copied', 'Enlace copiado', 'Link kopiert', '链接已复制') : tl('Partager le site', 'Share the site', 'Compartir el sitio', 'Website teilen', '分享网站')}
            </button>
          </div>
        </div>

        <div className="foot__grid">
          <div>
            <p className="foot__brand-name">Groupe Ndoye<br />Africa Holding</p>
            <p style={{ margin: '0 0 6px', fontStyle: 'italic', color: 'var(--sage)' }}>{pick(TAGLINE, lang)}</p>
            <p style={{ margin: 0, color: 'rgba(244,238,228,.62)', maxWidth: '40ch', fontSize: '.95rem' }}>{intro.length > 190 ? `${intro.slice(0, 187).trimEnd()}…` : intro}</p>
            {social.length > 0 && (
              <div className="foot__social">
                {social.map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>{SOCIAL_ICONS[key]}</a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="foot__title">{tl('Le groupe', 'The group', 'El grupo', 'Die Gruppe', '集团')}</h2>
            <ul>{primary.map((item) => <li key={item.id}><Link to={item.path}>{label(item)}</Link></li>)}</ul>
          </div>

          <div>
            <h2 className="foot__title">{tl('Explorer', 'Explore', 'Explorar', 'Entdecken', '探索')}</h2>
            <ul>
              {rest.map((item) => <li key={item.id}><Link to={item.path}>{label(item)}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="foot__title">{tl('Contact', 'Contact', 'Contacto', 'Kontakt', '联系我们')}</h2>
            <ul>
              <li>{SITE.address_fr}</li>
              <li><a href={`tel:${String(SITE.phone).replace(/[^+\d]/g, '')}`}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} style={{ wordBreak: 'break-all' }}>{SITE.email}</a></li>
            </ul>
            <a className="btn btn--sm" style={{ marginTop: 22, opacity: 1 }} href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
              {tl('Écrire sur WhatsApp', 'Message us on WhatsApp', 'Escribir por WhatsApp', 'Per WhatsApp schreiben', '通过WhatsApp联系')}
            </a>
          </div>
        </div>

        <div className="foot__bottom">
          <span>© {new Date().getFullYear()} {SITE.name}. {tl('Tous droits réservés.', 'All rights reserved.', 'Todos los derechos reservados.', 'Alle Rechte vorbehalten.', '版权所有。')}</span>
          <span style={{ fontStyle: 'italic' }}>{pick(TAGLINE, lang)}</span>
        </div>
      </div>
    </footer>
  );
}
