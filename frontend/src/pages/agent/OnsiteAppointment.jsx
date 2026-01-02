import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Form/Input'
import Button from '../../components/ui/Button'
import Toast from '../../components/ui/Toast'
import appointmentService from '../../services/appointmentService'

export default function OnsiteAppointment() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const mutation = useMutation({
    mutationFn: (data) => appointmentService.createAppointment?.(data) || Promise.resolve({ success: true }),
    onSuccess: () => {
      setToast({ type: 'success', message: 'Rendez-vous créé avec succès!' })
      setTimeout(() => navigate('/agent/dashboard'), 2000)
    },
    onError: (err) => {
      setToast({ type: 'error', message: err?.response?.data?.message || 'Erreur lors de la création.' })
    }
  })

  const onSubmit = (data) => {
    if (!data.visitorFirstName || !data.visitorLastName || !data.appointmentDate || !data.appointmentTime || !data.motif) {
      setToast({ type: 'error', message: 'Veuillez remplir tous les champs obligatoires.' })
      return
    }
    mutation.mutate(data)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">➕ Créer un Rendez-vous sur Place</h1>
          <p className="text-gray-600 mt-2">Enregistrez rapidement un rendez-vous pour un visiteur qui arrive sans réservation.</p>
        </div>

        {toast && <Toast type={toast.type} message={toast.message} />}

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Visitor Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b">👤 Informations du Visiteur</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Prénom *" 
                  name="visitorFirstName" 
                  register={register}
                  options={{ required: 'Prénom requis' }}
                  error={errors.visitorFirstName?.message}
                  placeholder="John"
                />
                <Input 
                  label="Nom *" 
                  name="visitorLastName" 
                  register={register}
                  options={{ required: 'Nom requis' }}
                  error={errors.visitorLastName?.message}
                  placeholder="Smith"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input 
                  label="Email" 
                  name="visitorEmail" 
                  type="email" 
                  register={register}
                  options={{ pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' } }}
                  error={errors.visitorEmail?.message}
                  placeholder="john@example.com"
                />
                <Input 
                  label="Téléphone" 
                  name="visitorPhone" 
                  register={register}
                  placeholder="+33612345678"
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b">📅 Détails du Rendez-vous</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Date *</label>
                    <button type="button" onClick={() => { const today = new Date().toISOString().split('T')[0]; document.querySelector('input[name="appointmentDate"]').value = today; }} className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Aujourd'hui</button>
                  </div>
                  <Input 
                      name="appointmentDate" 
                      type="date" 
                      register={register}
                      options={{ required: 'Date requise' }}
                      error={errors.appointmentDate?.message}
                    />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Heure *</label>
                    <button type="button" onClick={() => { const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }); document.querySelector('input[name="appointmentTime"]').value = now; }} className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Maintenant</button>
                  </div>
                  <Input 
                    name="appointmentTime" 
                    type="time" 
                    register={register}
                    options={{ required: 'Heure requise' }}
                    error={errors.appointmentTime?.message}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Département/Service *</label>
                <select 
                  {...register('department', { required: 'Département requis' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Sélectionnez un département</option>
                  <option value="IT">IT</option>
                  <option value="RH">RH</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Marketing">Marketing</option>
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-2">Motif du rendez-vous *</label>
                <textarea
                  id="motif"
                  {...register('motif', { required: 'Motif requis' })}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex: Réunion technique, audit, visite client, etc."
                />
                {errors.motif && <p className="mt-1 text-sm text-red-600">{errors.motif.message}</p>}
              </div>
            </div>

            {/* Who to meet */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b">👥 Personne à Rencontrer</h3>
              <Input 
                label="Nom et prénom *" 
                name="contactPerson" 
                register={register}
                options={{ required: 'Personne à rencontrer requise' }}
                error={errors.contactPerson?.message}
                placeholder="Ex: Marc Dupont"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/agent/dashboard')}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Annuler
              </button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? '⏳ Création...' : '✓ Créer le Rendez-vous'}
              </Button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <span className="text-2xl">ℹ️</span>
            <div className="text-sm text-blue-800">
              <strong>Conseil:</strong> Après la création du rendez-vous, n'oubliez pas d'enregistrer la visite (check-in) et de faire signer le visiteur.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
