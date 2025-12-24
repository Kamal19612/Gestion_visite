import api from './api';

const appointmentService = {
  createAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/v1/rendezvous', appointmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add other appointment-related API calls here (e.g., getAppointments, updateAppointment, etc.)
  getAppointments: async () => {
    try {
      const response = await api.get('/v1/rendezvous');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAppointmentById: async (id) => {
    try {
      const response = await api.get(`/v1/rendezvous/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAppointment: async (id, updatedData) => {
    try {
      const response = await api.put(`/v1/rendezvous/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteAppointment: async (id) => {
    try {
      const response = await api.delete(`/v1/rendezvous/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default appointmentService;
