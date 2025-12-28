import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StatCard from '../../components/ui/StatCard';
import appointmentService from '../../services/appointmentService';

export default function SecretaryDashboard() {
  // Récupérer tous les rendez-vous
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentService.getAppointments,
  });

  // Calculer les statistiques
  const pendingAppointments = appointments.filter(a => 
    a.statut === 'EN_ATTENTE' || a.statut === 'Pending'
  );
  const approvedAppointments = appointments.filter(a => 
    a.statut === 'APPROUVEE' || a.statut === 'Approved'
  );
  const todayAppointments = appointments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.date === today;
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Secrétaire</h1>
        <p className="text-gray-600">Gérez les demandes de rendez-vous et l'accès des visiteurs</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Demandes en attente"
          value={isLoading ? '...' : pendingAppointments.length}
          subtitle="Nécessitent votre attention"
          icon="⏳"
          color="yellow"
          trend={pendingAppointments.length > 0 ? 'up' : null}
        />
        <StatCard
          title="Rendez-vous approuvés"
          value={isLoading ? '...' : approvedAppointments.length}
          subtitle="Confirmés et planifiés"
          icon="✅"
          color="green"
        />
        <StatCard
          title="Rendez-vous aujourd'hui"
          value={isLoading ? '...' : todayAppointments.length}
          subtitle="Visiteurs prévus"
          icon="📅"
          color="blue"
        />
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/secretary/appointments"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gérer les Rendez-vous</h3>
              <p className="text-gray-600">
                {pendingAppointments.length > 0 
                  ? `${pendingAppointments.length} demande(s) en attente de traitement`
                  : 'Aucune demande en attente'}
              </p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">📋</div>
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visiteurs du Jour</h3>
              <p className="text-gray-600">
                {todayAppointments.length} visiteur(s) prévu(s) pour aujourd'hui
              </p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
      </div>

      {/* Demandes urgentes */}
      {pendingAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Demandes en Attente ({pendingAppointments.length})
            </h2>
            <Link
              to="/secretary/appointments"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {pendingAppointments.slice(0, 5).map((appointment) => (
              <Link
                key={appointment.id}
                to={`/secretary/appointments/${appointment.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {appointment.personneARencontrer} - {appointment.departement}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      📅 {appointment.date} à {appointment.heure}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{appointment.motif}</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                    En attente
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
