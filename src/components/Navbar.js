import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { useContent } from '../services/ContentProvider';
import { LANGS, makeTl } from '../utils/i18n';

const PRIMARY = ['services', 'projets', 'partenaires', 'entreprises', 'investisseurs', 'about'];
const MORE = ['engagements', 'collaboration', 'galerie', 'videos'];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { NAV, SITE } = useContent();
  const { pathname } = useLocation();
  const tl = makeTl(lang);

  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [logoOk, setLogoOk] = useState(true);

  const label = (item) => item[lang] || item.fr;
  const byId = (id) => NAV.find((n) => n.id === id);
  const primary = PRIMARY.map(byId).filter(Boolean);
  const more = MORE.map(byId).filter(Boolean);
  const contact = byId('contact');
  const isActive = (path) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && (setOpen(false), setLangOpen(false));
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onBrandClick = (e) => {
    setOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const current = LANGS.find((l) => l.code === lang) || LANGS[0];
  const classes = `nav${open ? ' nav--menu' : solid ? ' nav--solid' : ''}`;
  const wa = `https://wa.me/${SITE.whatsapp}`;

  return (
    <>
      <a href="#contenu" className="sr-only">{tl('Aller au contenu', 'Skip to content', 'Ir al contenido', 'Zum Inhalt springen', '跳到正文')}</a>
      <header className={classes}>
        <div className="container nav__bar">
          <Link to="/" className="nav__brand" onClick={onBrandClick} aria-label={`${SITE.name} — ${tl('accueil', 'home', 'inicio', 'Startseite', '首页')}`}>
            <span className="nav__mark" aria-hidden="true">
              {logoOk && <img src="/Images/logo/gnah-logo.png" alt="" onError={() => setLogoOk(false)} />}
            </span>
            <span className="nav__word">
              Groupe Ndoye
              <small>Africa Holding</small>
            </span>
          </Link>

          <ul className="nav__links">
            {primary.map((item) => (
              <li key={item.id}>
                <Link to={item.path} className={`nav__link${isActive(item.path) ? ' is-active' : ''}`}>{label(item)}</Link>
              </li>
            ))}
            <li className="nav__drop">
              <button type="button" className="nav__link" aria-haspopup="true">
                {tl('Plus', 'More', 'Más', 'Mehr', '更多')}
              </button>
              <div className="nav__panel">
                {more.map((item) => (
                  <Link key={item.id} to={item.path} className={isActive(item.path) ? 'is-active' : ''}>{label(item)}</Link>
                ))}
              </div>
            </li>
          </ul>

          <div className={`nav__drop nav__lang-wrap${langOpen ? ' is-open' : ''}`}>
            <button type="button" className="nav__link nav__lang" aria-haspopup="true" aria-expanded={langOpen} onClick={() => setLangOpen((v) => !v)}>
              {current.short}
            </button>
            <div className="nav__panel" role="menu">
              {LANGS.map((l) => (
                <a key={l.code} href="#langue" role="menuitem" className={l.code === lang ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); setLang(l.code); setLangOpen(false); }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {contact && (
            <Link to={contact.path} className="btn btn--sm nav__cta">
              {label(contact)}
            </Link>
          )}

          <button type="button" className={`nav__burger${open ? ' is-open' : ''}`} aria-label={tl('Menu', 'Menu', 'Menú', 'Menü', '菜单')} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`menu${open ? ' is-open' : ''}`} aria-hidden={!open} aria-label="Menu">
        <ul className="menu__list">
          {NAV.map((item, i) => (
            <li key={item.id}>
              <Link to={item.path} className={isActive(item.path) ? 'is-active' : ''} style={{ '--i': i }} tabIndex={open ? 0 : -1}>
                {label(item)}
                <small>{String(i + 1).padStart(2, '0')}</small>
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu__lang" role="group" aria-label={tl('Langue', 'Language', 'Idioma', 'Sprache', '语言')}>
          {LANGS.map((l) => (
            <button key={l.code} type="button" tabIndex={open ? 0 : -1} className={l.code === lang ? 'is-on' : ''} onClick={() => setLang(l.code)}>
              {l.label}
            </button>
          ))}
        </div>
        <a className="btn btn--light" href={wa} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
          {tl('Écrire sur WhatsApp', 'Message us on WhatsApp', 'Escribir por WhatsApp', 'Per WhatsApp schreiben', '通过WhatsApp联系')}
        </a>
      </nav>
    </>
  );
}
