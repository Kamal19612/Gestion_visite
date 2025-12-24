import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import Input from '../../components/Form/Input'
import Button from '../../components/ui/Button'

export default function VerifyEmail() {
  const { register, handleSubmit } = useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const email = location.state?.email || ''
  const initialMessage = location.state?.message || ''

  const mutation = useMutation({
    mutationFn: (data) => authService.verifyEmail(email, data.code),
    onSuccess: () => {
      setSuccess(true)
      setServerError('')
      setTimeout(() => navigate('/auth/login', { state: { message: 'Votre email a été vérifié. Vous pouvez maintenant vous connecter.' } }), 2500)
    },
    onError: (err) => {
      const errorMsg = err?.response?.data?.error || err?.response?.data?.message || 'Code invalide'
      setServerError(errorMsg)
    }
  })

  const onSubmit = (data) => {
    if (!data.code?.trim()) {
      setServerError('Veuillez entrer le code')
      return
    }
    setServerError('')
    mutation.mutate(data)
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow text-center">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">✓ Vérification réussie</h2>
        <p className="text-slate-600">Redirection vers connexion...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Vérifier votre adresse e-mail</h2>
      <p className="text-sm text-slate-600 mb-4">Un code a été envoyé à {email || 'votre adresse e-mail'}</p>
      {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Code de vérification" name="code" register={register} placeholder="Ex: 123456" />
        <div className="flex gap-2 justify-between items-center">
          <a href="/auth/register" className="text-sm text-indigo-600 hover:underline">Revenir</a>
          <Button type="submit" disabled={mutation.isPending}>Vérifier</Button>
        </div>
      </form>
    </div>
  )
}
