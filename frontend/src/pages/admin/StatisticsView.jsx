import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import statisticsService from '../../services/statisticsService';
import StatCard from '../../components/ui/StatCard';

export default function StatisticsView() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  });

  // Récupérer les statistiques générales
  const { data: allStats = [], isLoading: statsLoading } = useQuery({
    queryKey: ['statistics', 'overview'],
    queryFn: statisticsService.getOverview,
  });

  // Récupérer les statistiques par période
  const { data: periodStats = [], isLoading: periodLoading } = useQuery({
    queryKey: ['statistics', 'period', dateRange],
    queryFn: () => statisticsService.getHistory(dateRange),
    enabled: !!dateRange.from && !!dateRange.to,
  });

  // Récupérer les statistiques par département
  const { data: deptStats = [], isLoading: deptLoading } = useQuery({
    queryKey: ['statistics', 'departments'],
    queryFn: statisticsService.getByDepartment,
  });

  // Récupérer les statistiques par employé
  const { data: empStats = [], isLoading: empLoading } = useQuery({
    queryKey: ['statistics', 'employees'],
    queryFn: statisticsService.getByEmployee,
  });

  const isLoading = statsLoading || periodLoading || deptLoading || empLoading;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques et Rapports</h1>
        <p className="text-gray-600">Analysez les données des visites et rendez-vous</p>
      </div>

      {/* Filtres de période */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Période d'Analyse</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                const today = new Date();
                const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
                setDateRange({
                  from: lastMonth.toISOString().split('T')[0],
                  to: new Date().toISOString().split('T')[0],
                });
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Dernier mois
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Statistiques"
          value={isLoading ? '...' : allStats.length}
          subtitle="Enregistrements totaux"
          icon="📊"
          color="blue"
        />
        <StatCard
          title="Période Sélectionnée"
          value={isLoading ? '...' : periodStats.length}
          subtitle={`Du ${dateRange.from} au ${dateRange.to}`}
          icon="📈"
          color="green"
        />
        <StatCard
          title="Départements"
          value={isLoading ? '...' : deptStats.length}
          subtitle="Départements actifs"
          icon="🏢"
          color="purple"
        />
        <StatCard
          title="Employés"
          value={isLoading ? '...' : empStats.length}
          subtitle="Employés suivis"
          icon="👥"
          color="yellow"
        />
      </div>

      {/* Statistiques par département */}
      {deptStats.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Statistiques par Département</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Département</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visites</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durée Moyenne</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deptStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stat.departement || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.nombreVisites || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.dureeMoyenne || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistiques par employé */}
      {empStats.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Statistiques par Employé</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employé</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visites</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Département</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {empStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stat.nomEmploye || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.nombreVisites || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.departement || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Export de Données</h3>
          <p className="text-gray-600 mb-4">Exportez les statistiques au format PDF ou Excel</p>
          <div className="space-y-2">
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              📄 Exporter en PDF
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              📊 Exporter en Excel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapports Personnalisés</h3>
          <p className="text-gray-600 mb-4">Générez des rapports détaillés selon vos critères</p>
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            📋 Créer un Rapport
          </button>
        </div>
      </div>
    </div>
  );
}
