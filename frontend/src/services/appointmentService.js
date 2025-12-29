import api from './api';

const appointmentService = {
  createAppointment: async (appointmentData) => {
    const response = await api.post('/v1/rendezvous', appointmentData);
    return response.data;
  },

  // Get appointments for authenticated visitor
  getAppointments: async () => {
    const response = await api.get('/v1/rendezvous/mine');
    return response.data;
  },

  // Get all appointments (admin use)
  getAllAppointments: async () => {
    const response = await api.get('/v1/rendezvous');
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
