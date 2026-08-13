const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const fetchAgreements = () => request('/api/agreements');

export const fetchAgreement = (id) => request(`/api/agreements/${id}`);

export const createAgreement = (payload) =>
  request('/api/agreements', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateAgreement = (id, payload) =>
  request(`/api/agreements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteAgreement = (id) =>
  request(`/api/agreements/${id}`, {
    method: 'DELETE',
  });
