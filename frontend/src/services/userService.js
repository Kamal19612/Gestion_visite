import api from './api';

const userService = {
  getUsers: async () => {
    const res = await api.get('/v1/users');
    return res.data;
  },

  getUserById: async (id) => {
    const res = await api.get(`/v1/users/${id}`);
    return res.data;
  },

  createUser: async (payload) => {
    const res = await api.post('/v1/users', payload);
    return res.data;
  },

  updateUser: async (id, payload) => {
    const res = await api.put(`/v1/users/${id}`, payload);
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await api.delete(`/v1/users/${id}`);
    return res.data;
  },
};

export default userService;
