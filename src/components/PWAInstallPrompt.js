import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../hooks/useLang';
import { makeTl } from '../utils/i18n';

const DISMISS_KEY = 'gnah_pwa_dismissed_at';
const REMIND_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // la proposition revient une semaine après un « Plus tard »

const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/**
 * Invitation à installer l'application, affichée à la première visite.
 * L'état « installée » est lu en direct : on peut toujours réinstaller après une désinstallation.
 */
export default function PWAInstallPrompt() {
  const { lang } = useLang();
  const tl = makeTl(lang);
  const [installEvent, setInstallEvent] = useState(null);
  const [ios, setIos] = useState(false);
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (isStandalone()) return undefined;
    let last = 0;
    try {
      last = Number(localStorage.getItem(DISMISS_KEY)) || 0;
    } catch {
      last = 0;
    }
    const snoozed = last > 0 && Date.now() - last < REMIND_AFTER_MS;

    const onPrompt = (e) => {
      e.preventDefault();
      setInstallEvent(e);
      if (!snoozed) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setVisible(true), 5000);
      }
    };
    const onInstalled = () => {
      clearTimeout(timer.current);
      setVisible(false);
      setInstallEvent(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    if (isIos() && !snoozed) {
      setIos(true);
      timer.current = setTimeout(() => setVisible(true), 6000);
    }
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* stockage indisponible : sans conséquence */
    }
  };

  const install = async () => {
    if (!installEvent) return;
    installEvent.prompt();
    await installEvent.userChoice;
    setVisible(false);
    setInstallEvent(null);
  };

  if (!visible || (!installEvent && !ios)) return null;

  return (
    <aside
      role="dialog"
      aria-label={tl('Installer l’application GNAH', 'Install the GNAH app', 'Instalar la aplicación GNAH', 'GNAH-App installieren', '安装GNAH应用')}
      style={{
        position: 'fixed', zIndex: 90, left: 16, bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        width: 'min(420px, calc(100% - 32px))', padding: '22px 22px 20px', background: 'var(--ivory)', color: 'var(--ink)',
        border: '1px solid var(--line)', borderTop: '3px solid var(--terra)', boxShadow: '0 30px 60px -24px rgba(16,24,21,.5)',
        animation: 'fadeUp .8s var(--ease) both',
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {tl('Application', 'App', 'Aplicación', 'App', '应用')}
      </div>
      <p style={{ margin: '0 0 6px', fontSize: '1.35rem', lineHeight: 1.2 }}>
        {tl('Installez l’application GNAH', 'Install the GNAH app', 'Instale la aplicación GNAH', 'GNAH-App installieren', '安装GNAH应用')}
      </p>
      <p style={{ margin: '0 0 16px', fontSize: '.98rem', color: 'var(--text-soft)', lineHeight: 1.55 }}>
        {installEvent
          ? tl(
              'Accédez au groupe en un geste, depuis votre écran d’accueil.',
              'Reach the group in one tap, straight from your home screen.',
              'Acceda al grupo con un solo gesto, desde su pantalla de inicio.',
              'Erreichen Sie die Gruppe mit einem Fingertipp direkt vom Startbildschirm.',
              '从主屏幕一键访问集团。'
            )
          : tl(
              'Touchez « Partager », puis « Sur l’écran d’accueil ».',
              'Tap “Share”, then “Add to Home Screen”.',
              'Pulse «Compartir» y luego «Añadir a pantalla de inicio».',
              'Tippen Sie auf „Teilen“ und dann auf „Zum Home-Bildschirm“.',
              '点按“分享”，然后选择“添加到主屏幕”。'
            )}
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {installEvent && (
          <button type="button" className="btn btn--sm" onClick={install}>
            {tl('Installer', 'Install', 'Instalar', 'Installieren', '安装')}
          </button>
        )}
        <button type="button" className="btn btn--ghost btn--sm" onClick={dismiss}>
          {installEvent ? tl('Plus tard', 'Later', 'Más tarde', 'Später', '稍后') : 'OK'}
        </button>
      </div>
    </aside>
  );
}
