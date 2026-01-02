import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from '../../components/ui/Toast'

const MOCK_CURRENT_VISITORS = [
  { id: 101, visitorName: 'Emma Wilson', department: 'IT', purpose: 'Présentation produit', checkInTime: '10:30', floor: '3', contact: 'Marc Dupont', phone: '06-12-34-56-78' },
  { id: 102, visitorName: 'David Lee', department: 'RH', purpose: 'Réunion RH', checkInTime: '14:15', floor: '2', contact: 'Sylvie Laurent', phone: '06-87-65-43-21' },
  { id: 103, visitorName: 'Anna Garcia', department: 'Finance', purpose: 'Audit financier', checkInTime: '09:45', floor: '4', contact: 'Pierre Bernard', phone: '06-55-44-33-22' },
]

export default function CurrentVisitors() {
  const queryClient = useQueryClient()
  const [toast, setToast] = React.useState(null)

  const { data: visitors = MOCK_CURRENT_VISITORS, isLoading } = useQuery({
    queryKey: ['visitors', 'current'],
    queryFn: () => Promise.resolve(MOCK_CURRENT_VISITORS),
  })

  // local state to reflect immediate UI changes (mocked environment)
  const [localVisitors, setLocalVisitors] = React.useState(visitors)

  React.useEffect(() => {
    setLocalVisitors(visitors)
  }, [visitors])

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const checkOutMutation = useMutation({
    mutationFn: (visitorId) => {
      // In a real app we'd call visitService.checkout(visitorId)
      const departureTime = getCurrentTime()
      return Promise.resolve({ success: true, id: visitorId, departureTime })
    },
    onSuccess: (res) => {
      // Update local list: set departureTime and mark as finished
      setLocalVisitors(prev => prev.map(v => v.id === res.id ? { ...v, departureTime: res.departureTime, status: 'TERMINE' } : v))
      queryClient.invalidateQueries({ queryKey: ['visitors', 'current'] })
      setToast({ type: 'success', message: 'Check-out enregistré! (' + res.departureTime + ')' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  const calculateDuration = (checkInTime) => {
    const [hours, minutes] = checkInTime.split(':')
    const checkInDate = new Date()
    checkInDate.setHours(parseInt(hours), parseInt(minutes))
    const now = new Date()
    const diffMinutes = Math.round((now - checkInDate) / 60000)
    const hrs = Math.floor(diffMinutes / 60)
    const mins = diffMinutes % 60
    return hrs > 0 ? `${hrs}h ${mins}min` : `${mins}min`
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">🚪 Visiteurs Actuellement sur Site</h1>
      <p className="text-gray-600 mb-6">Liste des visiteurs en cours de visite. Enregistrez le départ quand ils quittent les lieux.</p>

      {toast && <Toast type={toast.type} message={toast.message} />}

      {isLoading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : visitors.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <div className="text-4xl mb-2">👥</div>
          <p>Aucun visiteur actuellement sur site.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localVisitors.map(visitor => (
            <div key={visitor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              {/* Header with status */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{visitor.visitorName}</h2>
                    <div className="text-green-50 text-sm">✓ Sur place depuis {calculateDuration(visitor.checkInTime)}</div>
                  </div>
                  <span className={`bg-white text-green-600 px-3 py-1 rounded-full text-sm font-semibold`}>{visitor.status === 'TERMINE' ? 'PARTI' : 'EN COURS'}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs font-semibold uppercase">Département</div>
                    <div className="font-medium">{visitor.department}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-semibold uppercase">Étage</div>
                    <div className="font-medium">Niveau {visitor.floor}</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-500 text-xs font-semibold uppercase">Motif</div>
                  <div className="font-medium text-gray-700">{visitor.purpose}</div>
                </div>

                <div className="border-t pt-3">
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-2">Contact interne</div>
                  <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                    <div>
                      <div className="font-medium">{visitor.contact}</div>
                      <div className="text-xs text-gray-600">{visitor.phone}</div>
                    </div>
                    <span className="text-xl">📞</span>
                  </div>
                </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="text-gray-500 text-xs">
                      <strong>Check-in:</strong> {visitor.checkInTime}
                      {visitor.departureTime && (<div><strong>Check-out:</strong> {visitor.departureTime}</div>)}
                    </div>
                    <div className="text-gray-500 text-xs">
                      <strong>ID:</strong> #{visitor.id}
                    </div>
                  </div>
              </div>

              {/* Footer with actions */}
                <div className="border-t bg-gray-50 p-4 flex gap-2">
                <button
                  onClick={() => checkOutMutation.mutate(visitor.id)}
                  disabled={checkOutMutation.isPending || visitor.status === 'TERMINE'}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-400 font-medium"
                >
                  🚪 Enregistrer départ
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
                  👁️ Détails
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics */}
      {visitors.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">📊 Résumé</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-gray-600 text-sm">Visiteurs actuels</div>
              <div className="text-3xl font-bold text-green-600">{visitors.length}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-gray-600 text-sm">Durée moyenne</div>
              <div className="text-3xl font-bold text-blue-600">45 min</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-gray-600 text-sm">Visites du jour</div>
              <div className="text-3xl font-bold text-purple-600">12</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
