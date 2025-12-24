import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Form/Input';
import Button from '../../components/ui/Button';
// import visitService from '../../services/visitService'; // Assuming a new service for visits

export default function RecordVisit() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [visitorData, setVisitorData] = useState(null);

  const recordVisitMutation = useMutation({
    mutationFn: (data) => new Promise(resolve => setTimeout(() => {
      console.log('Recording visit:', data);
      resolve({ message: 'Visite enregistrée avec succès!' });
    }, 1500)),
    onSuccess: () => {
      setSuccessMessage('Visite enregistrée avec succès !');
      setServerError('');
      setVisitorData(null);
    },
    onError: (err) => {
      setServerError(err?.response?.data?.message || 'Erreur lors de l\'enregistrement de la visite.');
      setSuccessMessage('');
    }
  });

  // Function to simulate ID scan and retrieve visitor info
  const handleIdScan = async (idNumber) => {
    setServerError('');
    setSuccessMessage('');
    if (!idNumber) {
      setServerError('Veuillez entrer un numéro d\'identification.');
      return;
    }
    
    // Simulate API call to get visitor info based on ID
    try {
      // const data = await visitService.getVisitorInfoById(idNumber);
      const data = await new Promise(resolve => setTimeout(() => { // Simulate API call
        if (idNumber === '123') {
          resolve({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        } else {
          resolve(null); // Visitor not found
        }
      }, 1000));

      if (data) {
        setVisitorData(data);
        setSuccessMessage('Informations visiteur récupérées.');
        // Optionally populate form fields with retrieved data
        // reset({ ...getValues(), visitorFirstName: data.firstName, visitorLastName: data.lastName, visitorEmail: data.email });
      } else {
        setServerError('Visiteur non trouvé ou ID invalide.');
        setVisitorData(null);
      }
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Erreur lors de la récupération des informations visiteur.');
    }
  };

  const onSubmit = (data) => {
    setServerError('');
    setSuccessMessage('');

    if (!data.idNumber || !data.arrivalTime || !data.departureTime || !data.signatureConfirmed) {
      setServerError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Combine form data with potentially scanned visitor data
    const finalData = {
      ...visitorData, // Use scanned data if available
      ...data,
      visitorId: data.idNumber, // Assuming idNumber is the unique identifier for the visitor
    };

    recordVisitMutation.mutate(finalData);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enregistrer une Visite</h2>
      <p className="mb-4 text-gray-600">Enregistrez les informations d\'arrivée et de départ d\'un visiteur.</p>

      {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Identification du Visiteur</h3>
        <div className="flex items-end gap-2">
          <Input 
            label="Numéro d\'Identification" 
            name="idNumber" 
            register={register({ required: 'Le numéro d\'identification est requis' })}
            error={errors.idNumber?.message}
            className="flex-grow"
          />
          <Button type="button" onClick={() => handleIdScan(document.getElementById('idNumber').value)}>Scanner ID</Button>
        </div>

        {visitorData && (
          <div className="bg-blue-50 p-4 rounded-md mt-4">
            <h4 className="font-semibold mb-2">Informations Visiteur (scannées) :</h4>
            <p><strong>Nom:</strong> {visitorData.firstName} {visitorData.lastName}</p>
            <p><strong>Email:</strong> {visitorData.email}</p>
            {/* Add more fields from visitorData as needed */}
          </div>
        )}

        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Détails de la Visite</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Heure d\'Arrivée" 
            name="arrivalTime" 
            type="time" 
            register={register({ required: 'L\'heure d\'arrivée est requise' })}
            error={errors.arrivalTime?.message}
            defaultValue={new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })}
          />
          <Input 
            label="Heure de Départ" 
            name="departureTime" 
            type="time" 
            register={register({ required: 'L\'heure de départ est requise' })}
            error={errors.departureTime?.message}
          />
        </div>
        
        <div>
          <label htmlFor="signatureConfirmed" className="block text-sm font-medium text-gray-700 mb-1">
            <input
              type="checkbox"
              id="signatureConfirmed"
              {...register("signatureConfirmed", { required: 'La confirmation de signature est requise' })}
              className="mr-2"
            />
            Signature du visiteur confirmée
          </label>
          {errors.signatureConfirmed && <p className="mt-1 text-sm text-red-600">{errors.signatureConfirmed.message}</p>}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={recordVisitMutation.isPending}>
            {recordVisitMutation.isPending ? 'Enregistrement...' : 'Enregistrer la Visite'}
          </Button>
        </div>
      </form>
    </div>
  );
}
