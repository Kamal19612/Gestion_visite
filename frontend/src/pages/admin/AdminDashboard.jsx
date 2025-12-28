import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StatCard from '../../components/ui/StatCard';
import appointmentService from '../../services/appointmentService';
import statisticsService from '../../services/statisticsService';

export default function AdminDashboard() {
  // Récupérer les rendez-vous
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentService.getAppointments,
  });

  // Récupérer les statistiques
  const { data: stats = [], isLoading: statsLoading } = useQuery({
    queryKey: ['statistics', 'overview'],
    queryFn: statisticsService.getOverview,
  });

  // Calculer les statistiques
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => 
    a.statut === 'EN_ATTENTE' || a.statut === 'Pending'
  ).length;
  const approvedAppointments = appointments.filter(a => 
    a.statut === 'APPROUVEE' || a.statut === 'Approved'
  ).length;
  const rejectedAppointments = appointments.filter(a => 
    a.statut === 'REJETEE' || a.statut === 'Rejected'
  ).length;

  // Statistiques par période (aujourd'hui)
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === today).length;

  const isLoading = appointmentsLoading || statsLoading;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Administrateur</h1>
        <p className="text-gray-600">Vue d'ensemble du système et gestion des utilisateurs</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Rendez-vous"
          value={isLoading ? '...' : totalAppointments}
          subtitle={`${todayAppointments} aujourd'hui`}
          icon="📅"
          color="blue"
          trend={todayAppointments > 0 ? 'up' : null}
        />
        <StatCard
          title="En Attente"
          value={isLoading ? '...' : pendingAppointments}
          subtitle="Nécessitent une action"
          icon="⏳"
          color="yellow"
          trend={pendingAppointments > 0 ? 'up' : null}
        />
        <StatCard
          title="Approuvés"
          value={isLoading ? '...' : approvedAppointments}
          subtitle="Rendez-vous confirmés"
          icon="✅"
          color="green"
        />
        <StatCard
          title="Rejetés"
          value={isLoading ? '...' : rejectedAppointments}
          subtitle="Rendez-vous refusés"
          icon="❌"
          color="red"
        />
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/statistics"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Statistiques</h3>
              <p className="text-gray-600">Consultez les statistiques détaillées et les rapports</p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">📈</div>
          </div>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestion Utilisateurs</h3>
              <p className="text-gray-600">Créez, modifiez ou supprimez les comptes utilisateurs</p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">👥</div>
          </div>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paramètres Système</h3>
              <p className="text-gray-600">Configurez les réglages et les droits d'accès</p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">⚙️</div>
          </div>
        </Link>
      </div>

      {/* Rendez-vous récents */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Rendez-vous Récents</h2>
          <Link
            to="/admin/statistics"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Voir tout →
          </Link>
        </div>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Chargement...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucun rendez-vous pour le moment</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Département</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.heure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        appointment.statut === 'APPROUVEE' || appointment.statut === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : appointment.statut === 'EN_ATTENTE' || appointment.statut === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {appointment.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.departement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
