const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:4000').replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('gnah_admin') : null;
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
      ...options,
      headers,
    });
  } catch (error) {
    throw new ApiError('Impossible de joindre le serveur. Vérifiez la configuration de l’API.', 0, error);
  }

  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(payload?.message || `Erreur API (${response.status})`, response.status, payload);
  }
  return payload;
}

export const api = {
  get: (path, options = {}) => apiRequest(path, { ...options, method: 'GET' }),
  post: (path, data, options = {}) => apiRequest(path, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (path, data, options = {}) => apiRequest(path, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (path, options = {}) => apiRequest(path, { ...options, method: 'DELETE' }),
};

export async function trackEvent(event, properties = {}) {
  try {
    await api.post('/api/analytics/events', {
      event,
      page: properties.page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      properties,
    });
  } catch {
    // Analytics are best-effort; site navigation must not depend on the API.
  }
}

export async function loginAdmin(email, password) {
  const result = await api.post('/api/auth/login', { email, password });
  if (!result?.token) throw new ApiError('Réponse de connexion invalide.', 502);
  return result;
}
