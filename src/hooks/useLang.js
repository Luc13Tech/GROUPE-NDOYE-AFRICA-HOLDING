import React, { createContext, useContext, useState, useEffect } from 'react';

const SUPPORTED = ['fr','en','es','de'];

function detectLang() {
  try {
    const stored = localStorage.getItem('gnah_lang');
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || navigator.userLanguage || 'fr').slice(0,2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'fr';
  } catch { return 'fr'; }
}

const LangContext = createContext({ lang:'fr', setLang:()=>{} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = (l) => {
    if (!SUPPORTED.includes(l)) return;
    setLangState(l);
    try { localStorage.setItem('gnah_lang', l); } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
