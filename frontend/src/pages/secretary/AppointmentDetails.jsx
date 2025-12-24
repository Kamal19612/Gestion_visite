import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import Input from '../../components/Form/Input';
import Button from '../../components/ui/Button';
import appointmentService from '../../services/appointmentService';

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch appointment details
  const { data: appointment, isLoading, isError, error } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentService.getAppointmentById(id),
    onSuccess: (data) => {
      reset(data); // Populate form with fetched data
    },
    enabled: !!id, // Only run query if ID is available
  });

  // Mutation for updating appointment
  const updateMutation = useMutation({
    mutationFn: (updatedData) => appointmentService.updateAppointment(id, updatedData),
    onSuccess: () => {
      setSuccessMessage('Rendez-vous mis à jour avec succès !');
      setServerError('');
      setIsEditing(false); // Exit editing mode
      // Optionally refetch data: queryClient.invalidateQueries(['appointment', id]);
    },
    onError: (err) => {
      setServerError(err?.response?.data?.message || 'Erreur lors de la mise à jour.');
      setSuccessMessage('');
    },
  });

  // Mutation for approving appointment
  const approveMutation = useMutation({
    mutationFn: () => appointmentService.updateAppointment(id, { status: 'Approved' }),
    onSuccess: () => {
      setSuccessMessage('Rendez-vous approuvé avec succès !');
      setServerError('');
      // Optionally refetch data
    },
    onError: (err) => {
      setServerError(err?.response?.data?.message || 'Erreur lors de l\'approbation.');
      setSuccessMessage('');
    },
  });

  // Mutation for rejecting appointment
  const rejectMutation = useMutation({
    mutationFn: () => appointmentService.updateAppointment(id, { status: 'Rejected' }),
    onSuccess: () => {
      setSuccessMessage('Rendez-vous rejeté avec succès !');
      setServerError('');
      // Optionally refetch data
    },
    onError: (err) => {
      setServerError(err?.response?.data?.message || 'Erreur lors du rejet.');
      setSuccessMessage('');
    },
  });

  const onSubmit = (data) => {
    setServerError('');
    setSuccessMessage('');
    updateMutation.mutate(data);
  };

  if (isLoading) return <div className="text-center mt-12">Chargement des détails du rendez-vous...</div>;
  if (isError) return <div className="text-center mt-12 text-red-600">Erreur: {error.message}</div>;
  if (!appointment) return <div className="text-center mt-12">Rendez-vous non trouvé.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Détails du Rendez-vous #{id}</h2>
      
      {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="flex justify-between items-center mt-6">
          <Button onClick={() => navigate('/secretary/appointments')} type="button" variant="secondary">Retour à la liste</Button>
          
          <div className="flex gap-4">
            {!isEditing && appointment.status === 'Pending' && (
              <>
                <Button 
                  onClick={() => approveMutation.mutate()} 
                  disabled={approveMutation.isPending} 
                  type="button" 
                  className="bg-green-600 hover:bg-green-700"
                >
                  {approveMutation.isPending ? 'Approbation...' : 'Approuver'}
                </Button>
                <Button 
                  onClick={() => rejectMutation.mutate()} 
                  disabled={rejectMutation.isPending} 
                  type="button" 
                  className="bg-red-600 hover:bg-red-700"
                >
                  {rejectMutation.isPending ? 'Rejet...' : 'Rejeter'}
                </Button>
              </>
            )}
            
            {!isEditing && (appointment.status === 'Pending' || appointment.status === 'Approved') && (
              <Button onClick={() => setIsEditing(true)} type="button">Modifier</Button>
            )}

            {isEditing && (
              <>
                <Button onClick={() => { setIsEditing(false); reset(appointment); }} type="button" variant="secondary">Annuler</Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
