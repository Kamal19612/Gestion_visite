import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Input from '../../components/Form/Input';
import Button from '../../components/ui/Button';
import appointmentService from '../../services/appointmentService';

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const { register: registerApproval, handleSubmit: handleSubmitApproval, reset: resetApproval } = useForm();
  const { register: registerRejection, handleSubmit: handleSubmitRejection, reset: resetRejection } = useForm();

  // Fetch appointment details
  const { data: appointment, isLoading, isError, error } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentService.getAppointmentById(id),
    onSuccess: (data) => {
      reset(data); // Populate form with fetched data
    },
    enabled: !!id, // Only run query if ID is available
  });

  // Mutation for approving appointment
  const approveMutation = useMutation({
    mutationFn: (approvalData) => appointmentService.approveAppointment(id, approvalData),
    onSuccess: () => {
      setSuccessMessage('Rendez-vous approuvé avec succès !');
      setServerError('');
      setShowApprovalForm(false);
      resetApproval();
      queryClient.invalidateQueries({ queryKey: ['appointment', id] });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (err) => {
      setServerError(err?.response?.data?.error || err?.response?.data?.message || 'Erreur lors de l\'approbation.');
      setSuccessMessage('');
    },
  });

  // Mutation for rejecting appointment
  const rejectMutation = useMutation({
    mutationFn: (rejectionData) => appointmentService.rejectAppointment(id, rejectionData),
    onSuccess: () => {
      setSuccessMessage('Rendez-vous rejeté avec succès !');
      setServerError('');
      setShowRejectionForm(false);
      resetRejection();
      queryClient.invalidateQueries({ queryKey: ['appointment', id] });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (err) => {
      setServerError(err?.response?.data?.error || err?.response?.data?.message || 'Erreur lors du rejet.');
      setSuccessMessage('');
    },
  });

  const onApproveSubmit = (data) => {
    setServerError('');
    setSuccessMessage('');
    approveMutation.mutate({
      reason: data.reason || 'Approuvé par la secrétaire',
      comments: data.comments || ''
    });
  };

  const onRejectSubmit = (data) => {
    setServerError('');
    setSuccessMessage('');
    rejectMutation.mutate({
      reason: data.reason || 'Rejeté par la secrétaire',
      comments: data.comments || ''
    });
  };

  // Helper function to check status (handles both French and English values)
  const isStatusPending = (status) => {
    return status === 'EN_ATTENTE' || status === 'Pending';
  };

  const isStatusApproved = (status) => {
    return status === 'APPROUVEE' || status === 'Approved' || status === 'PLANIFIEE';
  };

  if (isLoading) return <div className="text-center mt-12">Chargement des détails du rendez-vous...</div>;
  if (isError) return <div className="text-center mt-12 text-red-600">Erreur: {error.message}</div>;
  if (!appointment) return <div className="text-center mt-12">Rendez-vous non trouvé.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Détails du Rendez-vous #{id}</h2>
      
      {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Prénom du Visiteur" 
            name="visitorFirstName" 
            register={register} 
            defaultValue={appointment.visitorFirstName} // Assuming this field exists on the fetched object
            readOnly={!isEditing}
          />
          <Input 
            label="Nom du Visiteur" 
            name="visitorLastName" 
            register={register} 
            defaultValue={appointment.visitorLastName} // Assuming this field exists
            readOnly={!isEditing}
          />
        </div>
        <Input 
          label="E-mail du Visiteur" 
          name="visitorEmail" 
          type="email" 
          register={register} 
          defaultValue={appointment.visitorEmail} // Assuming this field exists
          readOnly={!isEditing}
        />
        <Input 
          label="WhatsApp du Visiteur" 
          name="visitorWhatsapp" 
          register={register} 
          defaultValue={appointment.visitorWhatsapp} // Assuming this field exists
          readOnly={!isEditing}
        />
        <Input 
          label="Date du Rendez-vous" 
          name="appointmentDate" 
          type="date" 
          register={register} 
          defaultValue={appointment.appointmentDate} // Assuming this field exists
          readOnly={!isEditing}
        />
        <Input 
          label="Heure du Rendez-vous" 
          name="appointmentTime" 
          type="time" 
          register={register} 
          defaultValue={appointment.appointmentTime} // Assuming this field exists
          readOnly={!isEditing}
        />
        <div>
          <label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1">Motif du rendez-vous</label>
          <textarea
            id="motif"
            {...register("motif")}
            defaultValue={appointment.motif} // Assuming this field exists
            rows="4"
            readOnly={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <Input
          label="Statut Actuel"
          name="status"
          register={register}
          defaultValue={appointment.status}
          readOnly
          className="bg-gray-100"
        />

        {/* Approval Form Modal */}
        {showApprovalForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Approuver le rendez-vous</h3>
              <form onSubmit={handleSubmitApproval(onApproveSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Raison *</label>
                  <input
                    {...registerApproval('reason', { required: true })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Raison de l'approbation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commentaires</label>
                  <textarea
                    {...registerApproval('comments')}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Commentaires optionnels"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="secondary" onClick={() => { setShowApprovalForm(false); resetApproval(); }}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={approveMutation.isPending} className="bg-green-600 hover:bg-green-700">
                    {approveMutation.isPending ? 'Approbation...' : 'Approuver'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Rejection Form Modal */}
        {showRejectionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Rejeter le rendez-vous</h3>
              <form onSubmit={handleSubmitRejection(onRejectSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Raison *</label>
                  <input
                    {...registerRejection('reason', { required: true })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Raison du rejet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commentaires</label>
                  <textarea
                    {...registerRejection('comments')}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Commentaires optionnels"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="secondary" onClick={() => { setShowRejectionForm(false); resetRejection(); }}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={rejectMutation.isPending} className="bg-red-600 hover:bg-red-700">
                    {rejectMutation.isPending ? 'Rejet...' : 'Rejeter'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <Button onClick={() => navigate('/secretary/appointments')} type="button" variant="secondary">Retour à la liste</Button>
          
          <div className="flex gap-4">
            {!isEditing && isStatusPending(appointment.status) && (
              <>
                <Button 
                  onClick={() => setShowApprovalForm(true)} 
                  type="button" 
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approuver
                </Button>
                <Button 
                  onClick={() => setShowRejectionForm(true)} 
                  type="button" 
                  className="bg-red-600 hover:bg-red-700"
                >
                  Rejeter
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
