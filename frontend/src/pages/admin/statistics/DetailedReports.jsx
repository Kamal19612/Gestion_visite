import React from 'react'
import { useQuery } from '@tanstack/react-query'
import statisticsService from '../../../services/statisticsService'

const MOCK_REPORTS = [
  { id: 1, date: '2025-12-15', HEntree: '09:00', HSortie: '10:30', motif: 'Réunion équipe', Statut: 'TERMINEE' },
  { id: 2, date: '2025-12-16', HEntree: '14:00', HSortie: '15:45', motif: 'Audit interne', Statut: 'TERMINEE' },
  { id: 3, date: '2025-12-17', HEntree: '10:30', HSortie: '12:00', motif: 'Visite client - ACME', Statut: 'TERMINEE' },
  { id: 4, date: '2025-12-18', HEntree: '11:00', HSortie: '13:15', motif: 'Présentation produit', Statut: 'TERMINEE' },
  { id: 5, date: '2025-12-20', HEntree: '09:15', HSortie: null, motif: 'Entretien candidat', Statut: 'EN_COURS' },
  { id: 6, date: '2025-12-21', HEntree: '08:45', HSortie: '09:30', motif: 'Livraison', Statut: 'TERMINEE' },
  { id: 7, date: '2026-01-02', HEntree: '13:00', HSortie: '14:00', motif: 'Réunion RH', Statut: 'TERMINEE' },
  { id: 8, date: '2026-01-02', HEntree: '15:30', HSortie: null, motif: 'Visite technique - équipement', Statut: 'EN_COURS' },
  { id: 9, date: '2025-11-30', HEntree: '10:00', HSortie: '10:15', motif: 'Signature document', Statut: 'TERMINEE' },
  { id: 10, date: '2025-12-01', HEntree: '16:00', HSortie: '16:30', motif: 'Support client', Statut: 'ANNULEE' },
  { id: 11, date: '2025-12-05', HEntree: '09:30', HSortie: '10:00', motif: 'Visite fournisseur', Statut: 'TERMINEE' },
  { id: 12, date: '2025-12-07', HEntree: '11:15', HSortie: '12:45', motif: 'Démo produit', Statut: 'TERMINEE' },
]

export default function DetailedReports() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['statistics','reports'], queryFn: () => statisticsService.getHistory() })

  if (isLoading) return <div className="p-6">Chargement...</div>
  if (isError) return <div className="p-6 text-red-600">Impossible de charger les rapports.</div>

  const displayData = (data && Array.isArray(data) && data.length > 0) ? data : MOCK_REPORTS
  if (!displayData || displayData.length === 0) return <div className="p-6">Aucun rapport disponible.</div>

  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Heure Entrée', 'Heure Sortie', 'Motif', 'Statut']
    const rows = displayData.map(r => [r.id, r.date, r.HEntree, r.HSortie || '', r.motif, r.Statut])
    const csv = [headers, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `rapports-visites-${new Date().toISOString().split('T')[0]}.csv`)
    link.click()
  }
  const total = displayData.length
  const countsByStatus = displayData.reduce((acc, r) => {
    const s = (r.Statut || 'INCONNU').toString()
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  const statusBadge = (s) => {
    const v = (s || '').toString().toUpperCase()
    if (v.includes('TERM')) return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{s}</span>
    if (v.includes('EN')) return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">{s}</span>
    if (v.includes('AN')) return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">{s}</span>
    return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">{s}</span>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Rapports Détaillés</h1>
      <p className="mb-4 text-gray-600">Visualisation ligne par ligne des visites. Vous pouvez exporter ces données côté backend ultérieurement (CSV/Excel).</p>

      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Total lignes</div>
            <div className="text-2xl font-bold">{total}</div>
          </div>
        </div>
        <button onClick={exportToCSV} className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 text-sm font-medium">
          📥 Exporter en CSV
        </button>
      </div>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Heure d'entrée</th>
              <th className="p-2 text-left">Heure de sortie</th>
              <th className="p-2 text-left">Motif</th>
              <th className="p-2 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-2">{row.id}</td>
                <td className="p-2">{row.date}</td>
                <td className="p-2">{row.HEntree}</td>
                <td className="p-2">{row.HSortie || '—'}</td>
                <td className="p-2">{row.motif}</td>
                <td className="p-2">{statusBadge(row.Statut)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">Note: champs attendus pour chaque ligne: id, date, HEntree, HSortie, motif, Statut.</div>
    </div>
  )
}

