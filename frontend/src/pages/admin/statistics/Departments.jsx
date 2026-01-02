import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import statisticsService from '../../../services/statisticsService'

/*
  MOCK_DEPTS example shape:
  - { department: 'IT', count: 5 }
  Backend may return objects like { name: 'IT', visits: 5 } or { department: 'IT', total: 5 }
*/
const MOCK_DEPTS = [
  { department: 'IT', count: 12 },
  { department: 'RH', count: 5 },
  { department: 'Finance', count: 7 },
  { department: 'Sales', count: 10 },
  { department: 'Support', count: 8 },
  { department: 'Marketing', count: 6 },
  { department: 'R&D', count: 3 },
  { department: 'Legal', count: 2 },
]

export default function Departments() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['statistics','departments'], queryFn: () => statisticsService.getByDepartment() })

  if (isLoading) return <div className="p-6">Chargement...</div>
  if (isError) return <div className="p-6 text-red-600">Impossible de récupérer les statistiques par département.</div>

  const displayData = (data && Array.isArray(data) && data.length > 0) ? data : MOCK_DEPTS
  if (!displayData || displayData.length === 0) return <div className="p-6">Aucune donnée disponible.</div>

  // normalize data to { name, count }
  const normalized = displayData.map(d => ({
    name: d.department || d.name || 'Inconnu',
    count: d.count || d.visits || d.total || 0
  }))

  const total = normalized.reduce((s,x)=>s + x.count, 0)
  const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444']

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Statistiques par Département</h1>
      <p className="mb-4 text-gray-600">Répartition du nombre de visites par département. Visualisation sous forme de diagramme et de barre.</p>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="text-sm text-gray-500">Total visites</div>
        <div className="text-2xl font-bold">{total}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Diagramme Circulaire</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={normalized}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, count }) => `${name}: ${count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {normalized.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} visites`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Graphique en Barres</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={normalized}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `${value} visites`} />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Détails par Département</h3>
        <div className="space-y-2">
          {normalized.map((d, i) => (
            <div key={d.name} className="flex justify-between items-center p-3 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="font-medium">{d.name}</span>
              </div>
              <span className="text-sm text-gray-600">{d.count} visites ({Math.round((d.count / (total || 1)) * 100)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
