export const SUPPORTED_LANGUAGES = Object.freeze(['fr', 'en', 'es', 'de', 'zh']);

export const LANGUAGE_LABELS = Object.freeze({
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  zh: '中文',
});

/** Resolve a translated value while falling back to French and then to a safe default. */
export function translate(value, language = 'fr', fallback = '') {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return fallback;
  return value[language] || value.fr || fallback;
}

/** Read nested dictionary keys such as "home.hero.title". */
export function t(dictionary, key, language = 'fr', fallback = key) {
  const value = String(key).split('.').reduce((current, part) => current?.[part], dictionary);
  return translate(value, language, fallback);
}

export function getDocumentLanguage(language) {
  return language === 'zh' ? 'zh-Hans' : (SUPPORTED_LANGUAGES.includes(language) ? language : 'fr');
}
