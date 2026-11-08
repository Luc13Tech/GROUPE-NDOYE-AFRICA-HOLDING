const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://api.groupendoyeafrica.com').replace(/\/+$/, '');

export function buildApiUrl(path = '/') {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    credentials = 'include',
    parseJson = true,
    ...rest
  } = options;

  const preparedHeaders = { ...headers };

  if (body !== undefined && !(body instanceof FormData) && !preparedHeaders['Content-Type']) {
    preparedHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(buildApiUrl(path), {
    method,
    credentials,
    headers: preparedHeaders,
    body: body !== undefined && !(body instanceof FormData) ? JSON.stringify(body) : body,
    ...rest,
  });

  const raw = await response.text();
  const payload = raw ? JSON.parse(raw) : null;

  if (!response.ok) {
    const error = new Error(payload?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return parseJson ? payload : raw;
}

export function getPublicContent() {
  return apiRequest('/api/content');
}

export function loginAdmin({ email, password }) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function logoutAdmin() {
  return apiRequest('/api/auth/logout', {
    method: 'POST',
  });
}

export function submitContact({ name, email, phone, subject, message }) {
  return apiRequest('/api/contact', {
    method: 'POST',
    body: { name, email, phone, subject, message },
  });
}

export function getAdminStats() {
  return apiRequest('/api/admin/stats');
}
