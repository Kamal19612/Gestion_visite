import api from './api'

const statisticsService = {
  getOverview: async () => {
    const res = await api.get('/v1/statistics/overview')
    return res.data
  },
  getHistory: async (params) => {
    const res = await api.get('/v1/statistics/history', { params })
    return res.data
  },
  getByDepartment: async () => {
    const res = await api.get('/v1/statistics/departments')
    return res.data
  },
}

export default statisticsService
