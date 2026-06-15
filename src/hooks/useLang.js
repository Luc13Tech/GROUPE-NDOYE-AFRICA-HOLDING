import React, { createContext, useContext, useState, useEffect } from 'react';

const SUPPORTED = ['fr', 'en', 'es', 'de', 'zh'];

function detectLang() {
  try {
    const stored = localStorage.getItem('gnah_lang');
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || navigator.userLanguage || 'fr').slice(0, 2).toLowerCase();
    if (browser === 'zh') return 'zh';
    return SUPPORTED.includes(browser) ? browser : 'fr';
  } catch { return 'fr'; }
}

const LangContext = createContext({ lang: 'fr', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = (l) => {
    if (!SUPPORTED.includes(l)) return;
    setLangState(l);
    try {
      localStorage.setItem('gnah_lang', l);
      // Dispatch event so all components re-render with new lang
      window.dispatchEvent(new StorageEvent('storage', { key: 'gnah_lang', newValue: l }));
    } catch {}
  };

  // Sync across tabs
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'gnah_lang' && e.newValue && SUPPORTED.includes(e.newValue)) {
        setLangState(e.newValue);
      }
    };
    window.addEventListener('storage', h);
    return () => window.removeEventListener('storage', h);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() { return useContext(LangContext); }
