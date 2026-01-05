import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointmentService';

export default function EmployeeAppointmentDetail() {
  const { id } = useParams();

  const { data: appointment, isLoading, isError, error } = useQuery({
    queryKey: ['employee', 'appointments', id],
    queryFn: () => appointmentService.getAppointmentById(id),
    enabled: !!id,
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link to="/employee/schedule" className="text-indigo-600 hover:underline">← Retour au planning</Link>
      </div>

      {isLoading && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <p className="text-red-800">Erreur : {error?.message || 'Impossible de charger le rendez-vous'}</p>
        </div>
      )}

      {!isLoading && !isError && appointment && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {appointment.visitorName || 'Rendez-vous'}
            </h1>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
              ✓ Approuvé
            </span>
          </div>

          {/* Main Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date & Time */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">📅 Date et Heure</h2>
              <p className="text-gray-600 text-sm mb-2">Date</p>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                {new Date(appointment.appointmentDate).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <p className="text-gray-600 text-sm mb-2">Heure</p>
              <p className="text-2xl font-bold text-indigo-600">
                {new Date(appointment.appointmentDate).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {/* Visitor Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">👤 Visiteur</h2>
              <p className="text-gray-600 text-sm mb-1">Nom</p>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                {appointment.visitorName || 'Non spécifié'}
              </p>

              <p className="text-gray-600 text-sm mb-1">Email</p>
              <p className="text-gray-900 break-all">
                {appointment.visitorEmail || 'Non spécifié'}
              </p>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">✓ Statut</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Statut du RDV</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 font-semibold rounded-full">
                    Approuvé
                  </span>
                </div>
              </div>

              {appointment.approvedDate && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-gray-600 text-sm mb-1">Approuvé le</p>
                  <p className="text-gray-900">
                    {new Date(appointment.approvedDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">📝 Détails</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointment.motif && (
                <div>
                  <p className="text-gray-600 text-sm mb-1">Motif de la visite</p>
                  <p className="text-gray-900 font-medium">{appointment.motif}</p>
                </div>
              )}

              {appointment.personnArencontrer && (
                <div>
                  <p className="text-gray-600 text-sm mb-1">Personne à rencontrer</p>
                  <p className="text-gray-900 font-medium">{appointment.personnArencontrer}</p>
                </div>
              )}

              {appointment.departement && (
                <div>
                  <p className="text-gray-600 text-sm mb-1">Département</p>
                  <p className="text-gray-900 font-medium">{appointment.departement}</p>
                </div>
              )}

              {appointment.nombrePersonnes && (
                <div>
                  <p className="text-gray-600 text-sm mb-1">Nombre de personnes</p>
                  <p className="text-gray-900 font-medium">{appointment.nombrePersonnes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          {appointment.comments && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2 text-blue-900">💬 Commentaires</h2>
              <p className="text-blue-900">{appointment.comments}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex gap-3">
            <Link
              to="/employee/schedule"
              className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 text-center font-semibold"
            >
              Retour au planning
            </Link>
            <a
              href={`tel:${appointment.visitorPhone}`}
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold"
            >
              📞 Appeler
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
