import React from 'react'
import { useQuery } from '@tanstack/react-query'
import statisticsService from '../../../services/statisticsService'

/*
  MOCK_AVG: sample average duration in minutes used when backend has no overview data.
  The backend may return a list of `statistiqueResponse` objects with a `dureeMoyenneMinutes` field.
*/
/* Example mock overview entries (backend may return list of objects with `periode` and `dureeMoyenneMinutes`):
   [ { periode: '2025-12-01', dureeMoyenneMinutes: 42 }, ... ]
*/
const MOCK_OVERVIEW = [
  { periode: '2025-11', dureeMoyenneMinutes: 38 },
  { periode: '2025-12', dureeMoyenneMinutes: 47 },
  { periode: '2026-01', dureeMoyenneMinutes: 45 },
]

const MOCK_AVG = Math.round(MOCK_OVERVIEW.reduce((s,x)=>s + x.dureeMoyenneMinutes,0)/MOCK_OVERVIEW.length)

export default function AverageDuration() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['statistics','overview'], queryFn: () => statisticsService.getOverview() })

  if (isLoading) return <div className="p-6">Chargement...</div>
  if (isError) return <div className="p-6 text-red-600">Impossible de récupérer la durée moyenne.</div>

  // backend returns a list of statistiqueResponse items; compute average if present
  let avg = null
  let min = null
  let max = null
  // prefer real data
  if (Array.isArray(data) && data.length > 0) {
    const nums = data.map(d => d.dureeMoyenneMinutes).filter(x => x != null)
    if (nums.length > 0) {
      const sum = nums.reduce((a,b)=>a+b,0)
      avg = Math.round(sum/nums.length)
      min = Math.min(...nums)
      max = Math.max(...nums)
    }
  }
  // fallback to MOCK_OVERVIEW
  if (avg == null && Array.isArray(MOCK_OVERVIEW) && MOCK_OVERVIEW.length > 0) {
    const nums = MOCK_OVERVIEW.map(d => d.dureeMoyenneMinutes).filter(x => x != null)
    const sum = nums.reduce((a,b)=>a+b,0)
    avg = Math.round(sum/nums.length)
    min = Math.min(...nums)
    max = Math.max(...nums)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Durée Moyenne des Visites</h1>
      <p className="mb-4 text-gray-600">Durée moyenne calculée en minutes. Les valeurs sont arrondies.
        <br />Unités : minutes — la durée est la différence moyenne entre heure d'entrée et heure de sortie.</p>

      <div className="bg-white p-6 rounded shadow">
        <div className="text-sm text-gray-500">Durée moyenne</div>
        <div className="text-3xl font-bold">{avg} <span className="text-base font-normal">minutes</span></div>
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>Minimum observé : <strong>{min} min</strong></div>
          <div>Maximum observé : <strong>{max} min</strong></div>
        </div>

        <div className="mt-4 text-xs text-gray-500">Si vous voyez des valeurs inattendues, vérifiez les enregistrements de `Visite` (heures d'entrée/sortie).</div>
      </div>
    </div>
  )
}
