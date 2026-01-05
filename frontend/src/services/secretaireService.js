import api from './api';

const secretaireService = {
  // Get pending appointments assigned to secretary
  getPendingAppointments: async () => {
    const res = await api.get('/v1/rendezvous/pending');
    return res.data;
  },

  // Get appointment by id (for secretary view)
  getAppointmentById: async (id) => {
    const res = await api.get(`/v1/rendezvous/${id}`);
    return res.data;
  },

  // Update appointment (approve/reject/edit)
  updateAppointment: async (id, payload) => {
    const res = await api.put(`/v1/rendezvous/${id}`, payload);
    return res.data;
  },

  // Get today's visits
  getVisitsToday: async () => {
    const res = await api.get('/v1/visites/today');
    return res.data;
  },

  // Reports (stub) - endpoint can accept params like from/to
  getReports: async (params) => {
    const res = await api.get('/v1/secretary/reports', { params });
    return res.data;
  }
};

export default secretaireService;
