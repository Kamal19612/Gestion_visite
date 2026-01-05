import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointmentService';

export default function EmployeeSchedule() {
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'list'
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['employee', 'schedule', { viewMode, selectedDate }],
    queryFn: appointmentService.getAllAppointments,
  });

  // Filter only approved appointments
  const approvedAppointments = appointments
    .filter(a => a.status === 'Approved')
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  // Group appointments by date for week view
  const groupedByDate = approvedAppointments.reduce((acc, appointment) => {
    const date = new Date(appointment.appointmentDate).toLocaleDateString('fr-FR');
    if (!acc[date]) acc[date] = [];
    acc[date].push(appointment);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link to="/employee/dashboard" className="text-indigo-600 hover:underline">← Retour au tableau de bord</Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Planning des rendez-vous</h1>

      {/* View Toggle */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setViewMode('week')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            viewMode === 'week'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📅 Vue Semaine
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            viewMode === 'list'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📋 Vue Liste
        </button>
      </div>

      {isLoading && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Chargement du planning...</p>
        </div>
      )}

      {!isLoading && approvedAppointments.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Aucun rendez-vous approuvé pour le moment.</p>
        </div>
      )}

      {!isLoading && approvedAppointments.length > 0 && (
        <>
          {viewMode === 'week' ? (
            // Week View
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {Object.entries(groupedByDate).map(([date, dayAppointments]) => (
                <div key={date} className="border-b last:border-b-0">
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">{date}</h3>
                    <p className="text-sm text-gray-600">{dayAppointments.length} rendez-vous</p>
                  </div>

                  <div className="divide-y">
                    {dayAppointments.map(appointment => (
                      <div key={appointment.id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-lg font-semibold text-gray-900">
                              {appointment.visitorName || 'Visiteur'}
                            </p>
                            <p className="text-sm text-gray-600">
                              ⏰ {new Date(appointment.appointmentDate).toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                            Approuvé
                          </span>
                        </div>

                        {appointment.motif && (
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Motif:</strong> {appointment.motif}
                          </p>
                        )}

                        {appointment.personnArencontrer && (
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Personne à rencontrer:</strong> {appointment.personnArencontrer}
                          </p>
                        )}

                        {appointment.departement && (
                          <p className="text-sm text-gray-700 mb-3">
                            <strong>Département:</strong> {appointment.departement}
                          </p>
                        )}

                        <Link
                          to={`/employee/appointments/${appointment.id}`}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-semibold"
                        >
                          Voir détails →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-3">
              {approvedAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {appointment.visitorName || 'Visiteur'}
                      </p>
                      <p className="text-sm text-gray-600">
                        📅 {new Date(appointment.appointmentDate).toLocaleDateString('fr-FR')} à{' '}
                        {new Date(appointment.appointmentDate).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                      Approuvé
                    </span>
                  </div>

                  {appointment.motif && (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Motif:</strong> {appointment.motif}
                    </p>
                  )}

                  {appointment.personnArencontrer && (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Personne:</strong> {appointment.personnArencontrer}
                    </p>
                  )}

                  {appointment.departement && (
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Département:</strong> {appointment.departement}
                    </p>
                  )}

                  <Link
                    to={`/employee/appointments/${appointment.id}`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-semibold"
                  >
                    Voir détails →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
