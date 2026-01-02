import React from 'react'
import { useQuery } from '@tanstack/react-query'
import statisticsService from '../../../services/statisticsService'

/*
  MOCK_HISTORY definition (example):
  - id: unique visit id
  - date: ISO date (YYYY-MM-DD)
  - HEntree: entry time (HH:mm)
  - HSortie: exit time (HH:mm) or null if not left
  - motif: reason for visit
  - Statut: visit status (TERMINEE, EN_COURS, ANNULEE)
  - visiteur: person who requested/submitted the appointment
  - agentSecurite: security agent handling the visit
  - secretaire: secretary who coordinated
  - utilisateurValidation: user (agent/secretary) who validated the appointment

  Use these mocks to preview the table when backend has no data.
*/
const MOCK_HISTORY = [
  { id: 1, date: '2025-12-15', HEntree: '09:00', HSortie: '10:30', motif: 'Réunion équipe', Statut: 'TERMINEE', visiteur: 'John Smith', agentSecurite: 'Marc Dupont', secretaire: 'Sylvie Laurent', utilisateurValidation: 'Marc Dupont' },
  { id: 2, date: '2025-12-16', HEntree: '14:00', HSortie: '15:45', motif: 'Audit interne', Statut: 'TERMINEE', visiteur: 'Sarah Johnson', agentSecurite: 'Jean Martin', secretaire: 'Sylvie Laurent', utilisateurValidation: 'Jean Martin' },
  { id: 3, date: '2025-12-17', HEntree: '10:30', HSortie: '12:00', motif: 'Visite client', Statut: 'TERMINEE', visiteur: 'Mike Chen', agentSecurite: 'Pierre Bernard', secretaire: 'Marie Dubois', utilisateurValidation: 'Pierre Bernard' },
  { id: 4, date: '2025-12-18', HEntree: '11:00', HSortie: '12:30', motif: 'Présentation produit', Statut: 'TERMINEE', visiteur: 'Emma Wilson', agentSecurite: 'Marc Dupont', secretaire: 'Sylvie Laurent', utilisateurValidation: 'Marc Dupont' },
  { id: 5, date: '2025-12-20', HEntree: '09:15', HSortie: null, motif: 'Entretien', Statut: 'EN_COURS', visiteur: 'Robert Taylor', agentSecurite: 'Jean Martin', secretaire: 'Marie Dubois', utilisateurValidation: 'Jean Martin' },
  { id: 6, date: '2025-12-21', HEntree: '08:45', HSortie: '09:30', motif: 'Livraison', Statut: 'TERMINEE', visiteur: 'Lisa Anderson', agentSecurite: 'Pierre Bernard', secretaire: 'Sylvie Laurent', utilisateurValidation: 'Pierre Bernard' },
  { id: 7, date: '2026-01-02', HEntree: '13:00', HSortie: '14:00', motif: 'Réunion RH', Statut: 'TERMINEE', visiteur: 'David Lee', agentSecurite: 'Marc Dupont', secretaire: 'Marie Dubois', utilisateurValidation: 'Marc Dupont' },
  { id: 8, date: '2026-01-02', HEntree: '15:30', HSortie: null, motif: 'Visite technique', Statut: 'EN_COURS', visiteur: 'Anna Garcia', agentSecurite: 'Jean Martin', secretaire: 'Sylvie Laurent', utilisateurValidation: 'Jean Martin' },
  { id: 9, date: '2025-11-30', HEntree: '10:00', HSortie: '10:15', motif: 'Signature document', Statut: 'TERMINEE', visiteur: 'Tom White', agentSecurite: 'Pierre Bernard', secretaire: 'Marie Dubois', utilisateurValidation: 'Pierre Bernard' },
  { id: 10, date: '2025-12-01', HEntree: '16:00', HSortie: '16:30', motif: 'Support client', Statut: 'ANNULEE', visiteur: 'Nicole Brown', agentSecurite: null, secretaire: 'Sylvie Laurent', utilisateurValidation: 'Sylvie Laurent' },
]

export default function History() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['statistics','history'], queryFn: () => statisticsService.getHistory() })

  if (isLoading) return <div className="p-6">Chargement de l'historique...</div>
  if (isError) return <div className="p-6 text-red-600">Impossible de charger l'historique des visites.</div>

  const displayData = (data && Array.isArray(data) && data.length > 0) ? data : MOCK_HISTORY
  if (!displayData || displayData.length === 0) return <div className="p-6">Aucune donnée d'historique disponible.</div>

  const total = displayData.length
  const lastUpdated = new Date().toLocaleString()

  const statusBadge = (s) => {
    if (!s) return null
    const v = s.toString().toUpperCase()
    if (v.includes('TERM')) return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{s}</span>
    if (v.includes('EN')) return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">{s}</span>
    return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">{s}</span>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Historique des Visites</h1>
      <p className="mb-4 text-gray-600">Liste chronologique des visites. Les données affichées ci-dessous proviennent soit de l'API, soit des mocks locaux si l'API ne retourne rien.</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total visites</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Dernière mise à jour</div>
          <div className="text-sm">{lastUpdated}</div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Heures</th>
              <th className="p-2 text-left">Motif</th>
              <th className="p-2 text-left">Visiteur</th>
              <th className="p-2 text-left">Agent Sécurité</th>
              <th className="p-2 text-left">Secrétaire</th>
              <th className="p-2 text-left">Validé par</th>
              <th className="p-2 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{row.date}</td>
                <td className="p-2 text-xs">{row.HEntree} - {row.HSortie || '—'}</td>
                <td className="p-2">{row.motif}</td>
                <td className="p-2">{row.visiteur || '—'}</td>
                <td className="p-2">{row.agentSecurite || '—'}</td>
                <td className="p-2">{row.secretaire || '—'}</td>
                <td className="p-2">{row.utilisateurValidation || '—'}</td>
                <td className="p-2">{statusBadge(row.Statut)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">Remarque : utilisez ces mocks pour prototyper l'interface. Pour des rapports réels, créez des visites via l'application (formulaires/rdv) ou chargez un jeu de données côté backend.</div>
    </div>
  )
}
