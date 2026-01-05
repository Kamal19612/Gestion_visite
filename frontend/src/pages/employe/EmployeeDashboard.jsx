import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import employeeService from '../../services/employeeService';
import appointmentService from '../../services/appointmentService';

export default function EmployeeDashboard() {
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['employee', 'appointments'],
    queryFn: appointmentService.getAllAppointments,
  });

  // Count appointments by status
  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    approved: appointments.filter(a => a.status === 'Approved').length,
    rejected: appointments.filter(a => a.status === 'Rejected').length,
  };

  // Get upcoming appointments
  const upcomingAppointments = appointments
    .filter(a => a.status === 'Approved')
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 5);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Employé</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <h3 className="text-gray-600 text-sm font-semibold uppercase">Total RDV</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
          <h3 className="text-gray-600 text-sm font-semibold uppercase">En attente</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
          <h3 className="text-gray-600 text-sm font-semibold uppercase">Approuvés</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.approved}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
          <h3 className="text-gray-600 text-sm font-semibold uppercase">Rejetés</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.rejected}</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Prochains rendez-vous</h2>
          
          {isLoading && <p className="text-gray-600">Chargement...</p>}
          
          {!isLoading && upcomingAppointments.length === 0 && (
            <p className="text-gray-600 text-center py-4">Aucun rendez-vous approuvé</p>
          )}

          {!isLoading && upcomingAppointments.length > 0 && (
            <div className="space-y-3">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.visitorName || 'Visiteur'}</p>
                      <p className="text-sm text-gray-600">
                        📅 {new Date(appointment.appointmentDate).toLocaleDateString('fr-FR')}
                      </p>
                      {appointment.motif && (
                        <p className="text-sm text-gray-600 mt-1">Motif: {appointment.motif}</p>
                      )}
                    </div>
                    <Link
                      to={`/employee/appointments/${appointment.id}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Détails →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            to="/employee/schedule"
            className="mt-4 inline-block text-indigo-600 hover:underline font-semibold"
          >
            Voir le planning complet →
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <Link
              to="/employee/schedule"
              className="block w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 text-center font-semibold"
            >
              📅 Voir le planning complet
            </Link>
            <a
              href="/employee/appointments"
              className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 text-center font-semibold"
            >
              📋 Tous les rendez-vous
            </a>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>📌 Note:</strong> Consultez votre planning pour voir tous les rendez-vous approuvés. Les rendez-vous en attente ou rejetés ne s'affichent pas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
