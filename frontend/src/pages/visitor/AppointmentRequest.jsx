import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // On utilise react-hot-toast pour les notifications
import appointmentService from '../../services/appointmentService';
import Input from '../../components/Form/Input'; // On réutilise le composant Input
import Button from '../../components/ui/Button'; // On réutilise le composant Button

export default function AppointmentRequest() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Configuration de la mutation pour appeler le service de création de rendez-vous
  const mutation = useMutation({
    mutationFn: (data) => appointmentService.createAppointment(data),
    onSuccess: () => {
      // Afficher une notification de succès
      toast.success('Votre demande de rendez-vous a été envoyée avec succès !');
      
      // Rediriger l'utilisateur après un court délai
      setTimeout(() => navigate('/visitor'), 2000);
    },
    onError: (err) => {
      // Afficher une notification d'erreur
      const errorMsg = err?.response?.data?.message || 'Une erreur est survenue lors de la création du rendez-vous.';
      toast.error(errorMsg);
    }
  });

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Demander un rendez-vous</h2>
      <p className="mb-6 text-gray-600">
        Veuillez remplir les informations ci-dessous pour planifier votre visite.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Champ pour la date du rendez-vous */}
        <Input
          label="Date du rendez-vous"
          name="date"
          type="date"
          register={register}
          validation={{ required: 'La date est obligatoire' }}
          error={errors.date}
        />

        {/* Champ pour l'heure du rendez-vous */}
        <Input
          label="Heure du rendez-vous"
          name="heure"
          type="time"
          register={register}
          validation={{ required: "L'heure est obligatoire" }}
          error={errors.heure}
        />

        {/* Nouveau champ pour le motif */}
        <Input
          label="Motif du rendez-vous"
          name="motif"
          type="text"
          register={register}
          validation={{ required: 'Le motif est obligatoire' }}
          error={errors.motif}
        />

        {/* Nouveau champ pour la personne à rencontrer */}
        <Input
          label="Personne à rencontrer"
          name="personneARencontrer"
          type="text"
          register={register}
          validation={{ required: 'La personne à rencontrer est obligatoire' }}
          error={errors.personneARencontrer}
        />

        {/* Nouveau champ pour le département */}
        <Input
          label="Département"
          name="departement"
          type="text"
          register={register}
          validation={{ required: 'Le département est obligatoire' }}
          error={errors.departement}
        />

        {/* Bouton de soumission */}
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Envoi en cours...' : 'Envoyer la demande'}
          </Button>
        </div>
      </form>
    </div>
  );
}