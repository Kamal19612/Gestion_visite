import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import appointmentService from '../../services/appointmentService'
import Toast from '../../components/ui/Toast'

const MOCK_PENDING_APPOINTMENTS = [
  { id: 1, visitorName: 'John Smith', visitorEmail: 'john@example.com', date: '2026-01-02', time: '10:00', motif: 'Réunion', department: 'IT', status: 'EN_ATTENTE', submittedBy: 'Visiteur' },
  { id: 2, visitorName: 'Sarah Johnson', visitorEmail: 'sarah@example.com', date: '2026-01-03', time: '14:30', motif: 'Audit', department: 'RH', status: 'EN_ATTENTE', submittedBy: 'Visiteur' },
  { id: 3, visitorName: 'Mike Chen', visitorEmail: 'mike@example.com', date: '2026-01-02', time: '11:00', motif: 'Visite client', department: 'Finance', status: 'EN_ATTENTE', submittedBy: 'Visiteur' },
]

export default function AppointmentValidation() {
  const queryClient = useQueryClient()
  const [filterStatus, setFilterStatus] = useState('EN_ATTENTE')
  const [toast, setToast] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  const { data: appointments = MOCK_PENDING_APPOINTMENTS, isLoading } = useQuery({
    queryKey: ['appointments', 'pending'],
    queryFn: () => appointmentService.getPendingAppointments?.() || Promise.resolve(MOCK_PENDING_APPOINTMENTS),
  })

  const approveMutation = useMutation({
    mutationFn: (appointmentId) => appointmentService.approveAppointment?.(appointmentId) || Promise.resolve({ success: true }),
    onSuccess: (_, appointmentId) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      setToast({ type: 'success', message: 'Rendez-vous approuvé avec succès!' })
      setTimeout(() => setToast(null), 3000)
    },
    onError: () => {
      setToast({ type: 'error', message: 'Erreur lors de l\'approbation du rendez-vous.' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (appointmentId) => appointmentService.rejectAppointment?.(appointmentId, { reason: rejectReason }) || Promise.resolve({ success: true }),
    onSuccess: (_, appointmentId) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      setToast({ type: 'success', message: 'Rendez-vous rejeté.' })
      setSelectedAppointment(null)
      setRejectReason('')
      setTimeout(() => setToast(null), 3000)
    },
    onError: () => {
      setToast({ type: 'error', message: 'Erreur lors du rejet du rendez-vous.' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  const filteredAppointments = appointments.filter(a => a.status === filterStatus)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Validation des Rendez-vous</h1>
      <p className="text-gray-600 mb-6">Approuvez ou rejetez les demandes de rendez-vous en attente de validation.</p>

      {toast && <Toast type={toast.type} message={toast.message} />}

      <div className="mb-4 flex gap-2">
        {['EN_ATTENTE', 'APPROUVEE', 'REJETEE'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded font-medium transition ${filterStatus === status ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {status === 'EN_ATTENTE' ? '⏳ En attente' : status === 'APPROUVEE' ? '✅ Approuvées' : '❌ Rejetées'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Aucun rendez-vous à {filterStatus === 'EN_ATTENTE' ? 'valider' : filterStatus === 'APPROUVEE' ? 'approuver' : 'rejeter'}</div>
      ) : (
        <div className="space-y-3">
          {filteredAppointments.map(apt => (
            <div key={apt.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <div className="font-semibold text-sm">{apt.visitorName}</div>
                  <div className="text-xs text-gray-600">{apt.visitorEmail}</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{apt.date} à {apt.time}</div>
                  <div className="text-gray-600">{apt.motif}</div>
                </div>
                <div className="text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{apt.department}</span>
                </div>
                <div className="text-sm text-gray-600">{apt.submittedBy}</div>
                {apt.status === 'EN_ATTENTE' && (
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => approveMutation.mutate(apt.id)}
                      disabled={approveMutation.isPending}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:bg-gray-400"
                    >
                      ✓ Approuver
                    </button>
                    <button
                      onClick={() => setSelectedAppointment(apt.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      ✕ Rejeter
                    </button>
                  </div>
                )}
                {apt.status !== 'EN_ATTENTE' && (
                  <div className={`text-sm font-medium ${apt.status === 'APPROUVEE' ? 'text-green-600' : 'text-red-600'}`}>
                    {apt.status === 'APPROUVEE' ? '✅ Approuvé' : '❌ Rejeté'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Motif du Rejet</h2>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Expliquez pourquoi ce rendez-vous est rejeté..."
              className="w-full p-3 border rounded-lg mb-4 h-24"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={() => rejectMutation.mutate(selectedAppointment)}
                disabled={!rejectReason.trim() || rejectMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
              >
                Confirmer le rejet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
