export const SUPPORTED_LANGUAGES = Object.freeze(['fr', 'en', 'es', 'de', 'zh']);

// Locale metadata used by the language picker and document lang handling.
export const LANGS = Object.freeze([
  { code: 'fr', short: 'FR', label: 'Français' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'es', short: 'ES', label: 'Español' },
  { code: 'de', short: 'DE', label: 'Deutsch' },
  { code: 'zh', short: '中文', label: '中文' },
]);

export function pick(value, language = 'fr', fallback = '') {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return fallback;
  return value[language] || value.fr || fallback;
}

export function makeTl(language = 'fr') {
  return (fr, en, es, de, zh = '') => {
    const translations = { fr, en, es, de, zh };
    return translations[language] || translations.fr || '';
  };
}

export function translate(value, language = 'fr', fallback = '') {
  return pick(value, language, fallback);
}

export function getDocumentLanguage(language) {
  return language === 'zh' ? 'zh-Hans' : (SUPPORTED_LANGUAGES.includes(language) ? language : 'fr');
}
