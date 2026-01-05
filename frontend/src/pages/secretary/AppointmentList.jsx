import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import appointmentService from '../../services/appointmentService';
import secretaireService from '../../services/secretaireService';

export default function AppointmentList() {
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading, isError, error } = useQuery({
    queryKey: ['secretary', 'appointments'],
    queryFn: appointmentService.getAllAppointments,
  });

  const updateAppointmentStatusMutation = useMutation({
    mutationFn: ({ id, status }) => secretaireService.updateAppointment(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secretary', 'appointments', 'pending'] });
    },
    onError: (mutationError) => {
      console.error('Error updating appointment status:', mutationError);
      // Optionally, set a server error state to display to the user
    },
  });

  const handleApprove = (id) => {
    updateAppointmentStatusMutation.mutate({ id, status: 'Approved' });
  };

  const handleReject = (id) => {
    updateAppointmentStatusMutation.mutate({ id, status: 'Rejected' });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-600">Chargement des demandes de rendez-vous...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600">
        <p>Erreur lors du chargement des rendez-vous: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des demandes de rendez-vous</h1>
      
      {appointments.length === 0 ? (
        <p className="text-gray-600">Aucune demande de rendez-vous pour le moment.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visiteur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Heure
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motif
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.visitorName}</div>
                    <div className="text-sm text-gray-500">{appointment.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.date} à {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.motif}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/secretary/appointments/${appointment.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Détails</Link>
                    {appointment.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => handleApprove(appointment.id)} 
                          className="text-green-600 hover:text-green-900 mr-4"
                          disabled={updateAppointmentStatusMutation.isPending}
                        >
                          Approuver
                        </button>
                        <button 
                          onClick={() => handleReject(appointment.id)} 
                          className="text-red-600 hover:text-red-900"
                          disabled={updateAppointmentStatusMutation.isPending}
                        >
                          Rejeter
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
