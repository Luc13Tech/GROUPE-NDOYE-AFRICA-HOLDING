// Lecture du contenu public publié depuis l'administration (https://api.groupendoyeafrica.com).
// Le site ne fait que LIRE : toute modification passe par l'espace d'administration.
export const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://api.groupendoyeafrica.com').replace(/\/+$/, '');

const TIMEOUT_MS = 8000;

export async function getPublicContent() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL}/api/content`, {
      method: 'GET',
      credentials: 'omit',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}
