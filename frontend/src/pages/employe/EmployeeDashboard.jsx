import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/ui/StatCard';
import appointmentService from '../../services/appointmentService';

export default function EmployeeDashboard() {
  const { user } = useAuth();

  // Récupérer les rendez-vous (pour voir ceux liés à l'employé)
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentService.getAppointments,
  });

  // Filtrer les rendez-vous pour cet employé (par département ou personne à rencontrer)
  const myAppointments = appointments.filter(a => 
    a.personneARencontrer?.toLowerCase().includes(user?.name?.toLowerCase() || '') ||
    a.departement?.toLowerCase().includes(user?.name?.toLowerCase() || '')
  );

  const todayAppointments = myAppointments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.date === today;
  });

  const upcomingAppointments = myAppointments.filter(a => {
    const appointmentDate = new Date(a.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today && (a.statut === 'APPROUVEE' || a.statut === 'Approved');
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-md p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenue, {user?.name || user?.email || 'Employé'} !
        </h1>
        <p className="text-green-100">Consultez votre planning et vos rendez-vous</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Rendez-vous Aujourd'hui"
          value={isLoading ? '...' : todayAppointments.length}
          subtitle="Visiteurs prévus"
          icon="📅"
          color="blue"
        />
        <StatCard
          title="Rendez-vous à Venir"
          value={isLoading ? '...' : upcomingAppointments.length}
          subtitle="Confirmés et planifiés"
          icon="📋"
          color="green"
        />
        <StatCard
          title="Total Rendez-vous"
          value={isLoading ? '...' : myAppointments.length}
          subtitle="Tous vos rendez-vous"
          icon="📊"
          color="purple"
        />
      </div>

      {/* Planning du jour */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Planning d'Aujourd'hui</h2>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Chargement...</div>
        ) : todayAppointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Aucun rendez-vous prévu pour aujourd'hui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {appointment.motif}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ⏰ {appointment.heure} - {appointment.departement}
                    </p>
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

      {/* Rendez-vous à venir */}
      {upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rendez-vous à Venir</h2>
          <div className="space-y-3">
            {upcomingAppointments.slice(0, 5).map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.motif}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      📅 {appointment.date} à {appointment.heure}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{appointment.departement}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    Planifié
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
