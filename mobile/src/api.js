import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL,
});

// attach token from localStorage when present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function login(credentials) {
  // expects backend endpoint POST /auth/login
    const resp = await api.post('/auth/login', credentials);
    return resp.data;
}

export async function register(userData) {
  // expects backend endpoint POST /auth/register
    const resp = await api.post('/auth/register', userData);
    return resp.data;
}

export async function getProfile() {
    // try a common profile endpoint; backend may vary (/auth/me or /users/me)
    const resp = await api.get('/auth/me');
    return resp.data;
}

export async function fetchRendezVous() {
  // expects backend endpoint GET /v1/rendezvous
    const resp = await api.get('/v1/rendezvous');
    return resp.data;
}

export async function getRendezVousById(id) {
  const resp = await api.get(`/v1/rendezvous/${id}`);
  return resp.data;
}

export async function createRendezVous(payload) {
  const resp = await api.post('/v1/rendezvous', payload);
  return resp.data;
}

export async function updateRendezVous(id, payload) {
  const resp = await api.put(`/v1/rendezvous/${id}`, payload);
  return resp.data;
}

export async function deleteRendezVous(id) {
  const resp = await api.delete(`/v1/rendezvous/${id}`);
  return resp.data;
}

export default api;

export async function uploadSignature(visiteId, file) {
  const form = new FormData();
  form.append('file', file);
  const resp = await api.post(`/v1/signatures/${visiteId}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return resp.data;
}

export async function validateSignature(visiteId) {
  const resp = await api.get(`/v1/signatures/${visiteId}/validate`);
  return resp.data;
}

export async function getSignaturePath(visiteId) {
  const resp = await api.get(`/v1/signatures/${visiteId}/path`);
  return resp.data;
}

export async function exportReports(format='pdf') {
  const resp = await api.get(`/v1/reports/export`, { params: { format }, responseType: 'blob' });
  return resp.data;
}

export async function getStatsByPeriode(from, to) {
  const resp = await api.get(`/v1/statistiques/par-periode`, { params: { from, to } });
  return resp.data;
}
