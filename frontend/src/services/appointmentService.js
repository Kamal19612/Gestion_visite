import api from './api';

const appointmentService = {
  createAppointment: async (appointmentData) => {
    const response = await api.post('/v1/rendezvous', appointmentData);
    return response.data;
  },

  // Add other appointment-related API calls here (e.g., getAppointments, updateAppointment, etc.)
  getAppointments: async () => {
    const response = await api.get('/v1/rendezvous');
    return response.data;
  },

  /**
   * Récupère les rendez-vous de l'utilisateur connecté
   */
  getMyAppointments: async () => {
    const response = await api.get('/v1/rendezvous/mine');
    return response.data;
  },

  getAppointmentById: async (id) => {
    const response = await api.get(`/v1/rendezvous/${id}`);
    return response.data;
  },

  updateAppointment: async (id, updatedData) => {
    const response = await api.put(`/v1/rendezvous/${id}`, updatedData);
    return response.data;
  },

  deleteAppointment: async (id) => {
    const response = await api.delete(`/v1/rendezvous/${id}`);
    return response.data;
  },
};
export default appointmentService;
