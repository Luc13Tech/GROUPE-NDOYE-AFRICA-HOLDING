import React, { useState, useEffect } from 'react';
import { useLang } from '../hooks/useLang';

export default function PWAInstallPrompt() {
  const { lang } = useLang();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);

  const tl = (fr, en, es, de, zh='') => ({ fr, en, es, de, zh }[lang] || fr);

  useEffect(() => {
    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true
      || localStorage.getItem('gnah_pwa_installed') === 'true';

    if (isInstalled) return;

    // Listen for browser install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show after 4 seconds delay for better UX
      setTimeout(() => setShow(true), 4000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('gnah_pwa_installed', 'true');
      setInstalled(true);
      setShow(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('gnah_pwa_installed', 'true');
        setInstalled(true);
      }
    } catch {}
    setInstalling(false);
    setShow(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    // Don't show again for 7 days
    const later = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('gnah_pwa_dismissed_until', String(later));
  };

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes gnah-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes gnah-pulse-gold {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
          50%      { box-shadow: 0 0 0 6px rgba(201,168,76,0.2); }
        }
        @keyframes gnah-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .gnah-pwa-prompt {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 99999;
          animation: gnah-slide-up .5s cubic-bezier(.16,1,.3,1) forwards;
        }
        @media (min-width: 640px) {
          .gnah-pwa-prompt {
            bottom: 24px;
            left: 50%;
            right: auto;
            transform: translateX(-50%);
            width: min(520px, 96vw);
          }
        }
      `}</style>

      <div className="gnah-pwa-prompt">
        {/* Backdrop blur on mobile */}
        <div style={{
          background: 'rgba(5,8,16,.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '2px solid var(--gold)',
          boxShadow: '0 -8px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(201,168,76,.15)',
          padding: 'clamp(16px,3vw,22px) clamp(16px,3vw,24px)',
        }}>
          {/* Top gold line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#c9a84c,transparent)' }}/>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* App Icon */}
            <div style={{
              flexShrink: 0,
              width: 58, height: 58,
              background: 'linear-gradient(145deg,#0d1427,#050810)',
              border: '1.5px solid rgba(201,168,76,.5)',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              animation: 'gnah-pulse-gold 2.5s ease-in-out infinite',
              boxShadow: '0 4px 16px rgba(0,0,0,.5)',
            }}>
              {/* Icon background gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 40% 30%, rgba(201,168,76,.12), transparent 70%)' }}/>
              {/* Building icon */}
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                <polygon points="24,4 6,16 6,44 42,44 42,16" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinejoin="round"/>
                <rect x="16" y="26" width="7" height="18" fill="#c9a84c" opacity=".8"/>
                <rect x="25" y="26" width="7" height="18" fill="#c9a84c" opacity=".8"/>
                <rect x="10" y="20" width="6" height="5" fill="#c9a84c" opacity=".5"/>
                <rect x="32" y="20" width="6" height="5" fill="#c9a84c" opacity=".5"/>
                <circle cx="24" cy="12" r="2.5" fill="#e8c96a" opacity=".9"/>
              </svg>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(.7rem,2vw,.8rem)', color: 'var(--gold)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                {tl("Installer l'Application",'Install the App','Instalar la Aplicación','App Installieren','安装应用程序')}
              </div>
              <div style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 'clamp(.72rem,2vw,.82rem)', color: 'var(--cream)', marginBottom: 2 }}>
                Groupe Ndoye Africa Holding
              </div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: 'clamp(.62rem,1.5vw,.7rem)', color: 'rgba(200,195,186,.45)', lineHeight: 1.4 }}>
                {tl(
                  'Accédez instantanément à la plateforme depuis votre écran d\'accueil.',
                  'Instantly access the platform from your home screen.',
                  'Acceda instantáneamente a la plataforma desde su pantalla de inicio.',
                  'Greifen Sie sofort von Ihrem Startbildschirm auf die Plattform zu.',
                  '从主屏幕即时访问平台。'
                )}
              </div>
            </div>

            {/* Close */}
            <button onClick={handleDismiss} style={{ flexShrink: 0, width: 28, height: 28, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(200,195,186,.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, transition: 'all .2s', alignSelf: 'flex-start' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.12)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.06)'}>
              ✕
            </button>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center' }}>
            <button
              onClick={handleInstall}
              disabled={installing}
              style={{
                flex: 1, padding: '11px 20px',
                background: installing ? 'rgba(201,168,76,.4)' : 'linear-gradient(135deg,#c9a84c,#e8c96a,#8b6914)',
                border: 'none', color: '#050810',
                fontFamily: 'var(--f-display)', fontSize: 'clamp(.62rem,1.5vw,.7rem)',
                letterSpacing: '.14em', textTransform: 'uppercase',
                cursor: installing ? 'wait' : 'pointer',
                transition: 'all .3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e=>{ if(!installing) e.currentTarget.style.opacity='.9'; }}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}
            >
              {installing ? (
                <>
                  <span style={{ width: 12, height: 12, border: '2px solid #050810', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'gnah-spin .8s linear infinite' }}/>
                  {tl('Installation...','Installing...','Instalando...','Wird installiert...','安装中...')}
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {tl('Installer','Install','Instalar','Installieren','安装')}
                </>
              )}
            </button>
            <button onClick={handleDismiss} style={{ padding: '11px 18px', background: 'transparent', border: '1px solid rgba(201,168,76,.25)', color: 'rgba(201,168,76,.6)', fontFamily: 'var(--f-display)', fontSize: 'clamp(.58rem,1.4vw,.66rem)', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(201,168,76,.06)'; e.currentTarget.style.color='var(--gold)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(201,168,76,.6)'; }}>
              {tl('Plus tard','Later','Después','Später','以后')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
