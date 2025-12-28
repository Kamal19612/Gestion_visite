import api from './api';

/**
 * Service pour gérer les soumissions de rendez-vous
 * Endpoint: /api/v1/soumissions
 */
const soumissionService = {
  /**
   * Créer une nouvelle soumission de rendez-vous
   * @param {Object} soumissionData - Données de la soumission
   * @returns {Promise} Réponse du serveur
   */
  createSoumission: async (soumissionData) => {
    const response = await api.post('/v1/soumissions', soumissionData);
    return response.data;
  },

  /**
   * Récupérer toutes les soumissions
   * @returns {Promise} Liste des soumissions
   */
  getAllSoumissions: async () => {
    const response = await api.get('/v1/soumissions');
    return response.data;
  },

  /**
   * Récupérer une soumission par ID
   * @param {number} id - ID de la soumission
   * @returns {Promise} Données de la soumission
   */
  getSoumissionById: async (id) => {
    const response = await api.get(`/v1/soumissions/${id}`);
    return response.data;
  },

  /**
   * ⚠️ ATTENTION: Cette méthode n'est pas implémentée dans le backend
   * Le contrôleur SoumissionController n'a pas de méthode PUT/PATCH
   * Si vous avez besoin de cette fonctionnalité, elle doit être implémentée côté backend
   */
  updateSoumission: async (id, updatedData) => {
    console.warn('updateSoumission: Cette méthode n\'est pas implémentée dans le backend.');
    throw new Error('La mise à jour des soumissions n\'est pas encore implémentée.');
  },

  /**
   * Supprimer une soumission
   * @param {number} id - ID de la soumission
   * @returns {Promise} Réponse du serveur
   */
  deleteSoumission: async (id) => {
    const response = await api.delete(`/v1/soumissions/${id}`);
    return response.data;
  },

  /**
   * ⚠️ ATTENTION: Ces méthodes ne sont pas implémentées dans le backend
   * Le contrôleur SoumissionController n'a pas de méthodes approve/reject
   * Ces endpoints existent uniquement pour les rendez-vous (RendezVousController)
   * Si vous avez besoin de cette fonctionnalité pour les soumissions, elle doit être implémentée côté backend
   */
  approveSoumission: async (id, approvalData) => {
    console.warn('approveSoumission: Cette méthode n\'est pas implémentée dans le backend.');
    throw new Error('L\'approbation des soumissions n\'est pas encore implémentée.');
  },

  rejectSoumission: async (id, rejectionData) => {
    console.warn('rejectSoumission: Cette méthode n\'est pas implémentée dans le backend.');
    throw new Error('Le rejet des soumissions n\'est pas encore implémenté.');
  }
};

export default soumissionService;
