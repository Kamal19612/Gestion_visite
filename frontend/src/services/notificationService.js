import api from './api'

const notificationService = {
  getNotifications: async () => {
    const res = await api.get('/v1/notifications')
    return res.data
  },
  /**
   * Récupère une notification par ID
   */
  getNotificationById: async (id) => {
    const res = await api.get(`/v1/notifications/${id}`)
    return res.data
  },
  /**
   * Recherche les notifications par visite ID
   */
  getNotificationsByVisiteId: async (visiteId) => {
    const res = await api.get('/v1/notifications/search', { params: { visiteId } })
    return res.data
  },
  /**
   * ⚠️ ATTENTION: Cette méthode n'est pas implémentée dans le backend
   * Le contrôleur NotificationController n'a pas de méthode pour marquer comme lu
   * Si vous avez besoin de cette fonctionnalité, elle doit être implémentée côté backend
   */
  markAsRead: async (id) => {
    console.warn('markAsRead: Cette méthode n\'est pas implémentée dans le backend.');
    throw new Error('La fonctionnalité "marquer comme lu" n\'est pas encore implémentée.');
  },
}

export default notificationService
