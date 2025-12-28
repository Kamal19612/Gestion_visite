import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Form/Input';
import Button from '../../components/ui/Button';
import appointmentService from '../../services/appointmentService';

export default function OnsiteAppointment() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const mutation = useMutation({
    mutationFn: (data) => appointmentService.createAppointment(data),
    onSuccess: () => {
      setSuccessMessage('Rendez-vous sur place créé avec succès !');
      setServerError('');
      setTimeout(() => navigate('/agent/dashboard'), 2000);
    },
    onError: (err) => {
      // Afficher un message d'erreur plus détaillé
      const errorMessage = err?.response?.data?.message || 
                          err?.response?.data?.error || 
                          err?.message || 
                          'Erreur lors de la création du rendez-vous.';
      setServerError(errorMessage);
      setSuccessMessage('');
      console.error('Erreur création rendez-vous:', err);
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    setSuccessMessage('');

    // Validation des champs obligatoires
    if (!data.visitorFirstName || !data.visitorLastName || !data.visitorEmail || 
        !data.appointmentDate || !data.appointmentTime || !data.motif ||
        !data.personneARencontrer || !data.departement) {
      setServerError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Transformer les données pour correspondre au format attendu par le backend
    const appointmentData = {
      date: data.appointmentDate, // Backend attend "date" pas "appointmentDate"
      heure: data.appointmentTime, // Backend attend "heure" pas "appointmentTime"
      motif: data.motif,
      personneARencontrer: data.personneARencontrer,
      departement: data.departement,
      type: data.type || null, // Optionnel
      statut: data.statut || null, // Optionnel, sera défini par le backend si null
      code: data.code || null, // Optionnel
      // Informations du visiteur pour permettre à l'agent de créer un rendez-vous
      visiteurEmail: data.visitorEmail || null, // Email du visiteur (obligatoire si agent)
      visiteurFirstName: data.visitorFirstName || null, // Prénom du visiteur (pour création si nécessaire)
      visiteurLastName: data.visitorLastName || null, // Nom du visiteur (pour création si nécessaire)
      visiteurWhatsapp: data.visitorWhatsapp || null // WhatsApp du visiteur (optionnel)
    };

    mutation.mutate(appointmentData);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Créer un rendez-vous sur place</h2>
      <p className="mb-4 text-gray-600">Enregistrez un rendez-vous pour un visiteur directement sur site.</p>

      {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Visitor Information */}
        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Informations du Visiteur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Prénom du Visiteur" 
            name="visitorFirstName" 
            register={register({ required: 'Le prénom du visiteur est requis' })}
            error={errors.visitorFirstName?.message}
          />
          <Input 
            label="Nom du Visiteur" 
            name="visitorLastName" 
            register={register({ required: 'Le nom du visiteur est requis' })}
            error={errors.visitorLastName?.message}
          />
        </div>
        <Input 
          label="E-mail du Visiteur *" 
          name="visitorEmail" 
          type="email" 
          register={register({ 
            required: 'L\'email du visiteur est requis',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Adresse e-mail invalide'
            }
          })}
          error={errors.visitorEmail?.message}
        />
        <Input 
          label="WhatsApp du Visiteur (optionnel)" 
          name="visitorWhatsapp" 
          register={register}
          error={errors.visitorWhatsapp?.message}
        />

        {/* Appointment Details */}
        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Détails du Rendez-vous</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Date du Rendez-vous" 
            name="appointmentDate" 
            type="date" 
            register={register({ required: 'La date du rendez-vous est requise' })}
            error={errors.appointmentDate?.message}
          />
          <Input 
            label="Heure du Rendez-vous" 
            name="appointmentTime" 
            type="time" 
            register={register({ required: 'L\'heure du rendez-vous est requise' })}
            error={errors.appointmentTime?.message}
          />
        </div>
        <div>
          <label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1">Motif du rendez-vous *</label>
          <textarea
            id="motif"
            {...register("motif", { required: 'Le motif du rendez-vous est requis' })}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          {errors.motif && <p className="mt-1 text-sm text-red-600">{errors.motif.message}</p>}
        </div>
        <Input 
          label="Personne à rencontrer *" 
          name="personneARencontrer" 
          type="text" 
          register={register({ required: 'La personne à rencontrer est requise' })}
          error={errors.personneARencontrer?.message}
        />
        <Input 
          label="Département *" 
          name="departement" 
          type="text" 
          register={register({ required: 'Le département est requis' })}
          error={errors.departement?.message}
        />
        
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Création...' : 'Créer le rendez-vous'}
          </Button>
        </div>
      </form>
    </div>
  );
}
