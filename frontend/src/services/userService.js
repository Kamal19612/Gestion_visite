import api from './api';

const userService = {
  /**
   * Récupère tous les utilisateurs
   */
  getAllUsers: async () => {
    const response = await api.get('/v1/users');
    return response.data;
  },

  /**
   * Récupère un utilisateur par ID
   */
  getUserById: async (id) => {
    const response = await api.get(`/v1/users/${id}`);
    return response.data;
  },

  /**
   * Crée un nouvel utilisateur
   */
  createUser: async (userData) => {
    const response = await api.post('/v1/users', userData);
    return response.data;
  },

  /**
   * Supprime un utilisateur
   */
  deleteUser: async (id) => {
    const response = await api.delete(`/v1/users/${id}`);
    return response.data;
  },
};

export default userService;


