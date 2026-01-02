import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import appointmentService from '../../services/appointmentService'

const MOCK_TODAY_APPOINTMENTS = [
  { id: 1, visitorName: 'John Smith', time: '09:00', motif: 'Réunion', status: 'APPROUVEE', department: 'IT' },
  { id: 2, visitorName: 'Sarah Johnson', time: '14:30', motif: 'Audit', status: 'APPROUVEE', department: 'RH' },
  { id: 3, visitorName: 'Mike Chen', time: '11:00', motif: 'Visite client', status: 'EN_ATTENTE', department: 'Finance' },
]

const MOCK_ACTIVE_VISITS = [
  { id: 101, visitorName: 'Emma Wilson', checkInTime: '10:30', motif: 'Présentation', duration: '45 min' },
  { id: 102, visitorName: 'David Lee', checkInTime: '14:15', motif: 'Réunion RH', duration: '30 min' },
]

export default function AgentDashboard() {
  const { data: todayAppointments = MOCK_TODAY_APPOINTMENTS, isLoading: aptsLoading } = useQuery({
    queryKey: ['appointments', 'today'],
    queryFn: () => appointmentService.getTodayAppointments?.() || Promise.resolve(MOCK_TODAY_APPOINTMENTS),
  })

  const { data: activeVisits = MOCK_ACTIVE_VISITS, isLoading: visitsLoading } = useQuery({
    queryKey: ['visits', 'active'],
    queryFn: () => appointmentService.getActiveVisits?.() || Promise.resolve(MOCK_ACTIVE_VISITS),
  })

  const pendingCount = todayAppointments.filter(a => a.status === 'EN_ATTENTE').length
  const approvedCount = todayAppointments.filter(a => a.status === 'APPROUVEE').length

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tableau de Bord Agent de Sécurité</h1>
        <p className="text-gray-600">Bienvenue. Gérez les visites et validez les rendez-vous du jour.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">Rendez-vous aujourd'hui</div>
              <div className="text-3xl font-bold text-indigo-600">{todayAppointments.length}</div>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">En attente de validation</div>
              <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">Visites actuellement en cours</div>
              <div className="text-3xl font-bold text-green-600">{activeVisits.length}</div>
            </div>
            <div className="text-4xl">🚪</div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">📝 Enregistrer une Visite</h2>
          <p className="text-gray-600 text-sm mb-4">Enregistrez l'arrivée, les détails et la signature d'un visiteur.</p>
          <Link to="/agent/visit/record" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Enregistrer
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">➕ Nouveau Rendez-vous</h2>
          <p className="text-gray-600 text-sm mb-4">Créez un rendez-vous pour un visiteur présent sur site.</p>
          <Link to="/agent/appointments/new-on-site" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Créer
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">✅ Valider Rendez-vous</h2>
          <p className="text-gray-600 text-sm mb-4">Approuvez ou rejetez les demandes de rendez-vous en attente.</p>
          <Link to="/agent/appointments/validate" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Valider ({pendingCount})
          </Link>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">📋 Rendez-vous Aujourd'hui</h2>
        {aptsLoading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : todayAppointments.length === 0 ? (
          <p className="text-gray-500">Aucun rendez-vous prévu pour aujourd'hui.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-left font-semibold">Visiteur</th>
                  <th className="p-3 text-left font-semibold">Heure</th>
                  <th className="p-3 text-left font-semibold">Motif</th>
                  <th className="p-3 text-left font-semibold">Département</th>
                  <th className="p-3 text-left font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map(apt => (
                  <tr key={apt.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{apt.visitorName}</td>
                    <td className="p-3">{apt.time}</td>
                    <td className="p-3">{apt.motif}</td>
                    <td className="p-3">{apt.department}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${apt.status === 'APPROUVEE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {apt.status === 'APPROUVEE' ? '✓ Approuvé' : '⏳ En attente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active Visits */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">🚪 Visites Actuellement en Cours</h2>
        {visitsLoading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : activeVisits.length === 0 ? (
          <p className="text-gray-500">Aucune visite en cours actuellement.</p>
        ) : (
          <div className="space-y-3">
            {activeVisits.map(visit => (
              <div key={visit.id} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-lg">{visit.visitorName}</div>
                    <div className="text-sm text-gray-600">Arrivé à {visit.checkInTime} • {visit.motif}</div>
                    <div className="text-xs text-gray-500 mt-1">Durée estimée : {visit.duration}</div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm">
                    🚪 Check-out
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
