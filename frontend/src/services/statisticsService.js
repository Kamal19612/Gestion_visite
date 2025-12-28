import api from './api'

const statisticsService = {
  /**
   * Récupère toutes les statistiques (vue d'ensemble)
   */
  getOverview: async () => {
    const res = await api.get('/v1/statistiques')
    return res.data
  },
  /**
   * Récupère les statistiques par période
   * @param {Object} params - { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
   */
  getHistory: async (params) => {
    const res = await api.get('/v1/statistiques/par-periode', { params })
    return res.data
  },
  /**
   * Récupère les statistiques par département
   */
  getByDepartment: async () => {
    const res = await api.get('/v1/statistiques/par-departement')
    return res.data
  },
  /**
   * Récupère les statistiques par employé
   */
  getByEmployee: async () => {
    const res = await api.get('/v1/statistiques/par-employe')
    return res.data
  },
  /**
   * Récupère une statistique par ID
   */
  getById: async (id) => {
    const res = await api.get(`/v1/statistiques/${id}`)
    return res.data
  },
}

export default statisticsService
