import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/ui/StatCard';
import appointmentService from '../../services/appointmentService';

export default function VisitorDashboard() {
  const { user } = useAuth();

  // Récupérer les rendez-vous de l'utilisateur connecté
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['myAppointments'],
    queryFn: appointmentService.getMyAppointments,
  });

  const upcomingAppointments = appointments.filter(a => {
    const appointmentDate = new Date(a.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today && (a.statut === 'APPROUVEE' || a.statut === 'Approved');
  });

  const pendingAppointments = appointments.filter(a => 
    a.statut === 'EN_ATTENTE' || a.statut === 'Pending'
  );

  const pastAppointments = appointments.filter(a => {
    const appointmentDate = new Date(a.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  });

  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenue, {user?.name || user?.email || 'Visiteur'} !
        </h1>
        <p className="text-indigo-100">Gérez vos rendez-vous et consultez l'historique de vos visites</p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Rendez-vous à venir"
          value={isLoading ? '...' : upcomingAppointments.length}
          subtitle="Confirmés et planifiés"
          icon="📅"
          color="blue"
        />
        <StatCard
          title="En attente"
          value={isLoading ? '...' : pendingAppointments.length}
          subtitle="En cours de traitement"
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Historique"
          value={isLoading ? '...' : pastAppointments.length}
          subtitle="Visites passées"
          icon="📋"
          color="green"
        />
      </div>

      {/* Rendez-vous à venir */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Mes Rendez-vous à Venir</h2>
        </div>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Chargement...</div>
        ) : upcomingAppointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Aucun rendez-vous à venir pour le moment.</p>
            <Link
              to="/visitor/appointments/new"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Prendre un nouveau rendez-vous
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
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
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Confirmé
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rendez-vous en attente */}
      {pendingAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rendez-vous en Attente</h2>
          <div className="space-y-4">
            {pendingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-yellow-200 bg-yellow-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {appointment.personneARencontrer} - {appointment.departement}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      📅 {appointment.date} à {appointment.heure}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                    En attente
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action rapide */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Besoin d'un nouveau rendez-vous ?</h3>
        <p className="text-gray-600 mb-4">Remplissez le formulaire pour demander un rendez-vous</p>
        <Link
          to="/visitor/appointments/new"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Prendre un nouveau rendez-vous
        </Link>
      </div>
    </div>
  );
}
