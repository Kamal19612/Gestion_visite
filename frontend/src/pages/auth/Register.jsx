import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import Input from '../../components/Form/Input'
import Button from '../../components/ui/Button'

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = (data) => {
    const errs = {}
    if (!data.firstName?.trim()) errs.firstName = 'Le prénom est requis'
    if (!data.lastName?.trim()) errs.lastName = 'Le nom est requis'
    if (!data.email?.trim()) errs.email = 'L\'e-mail est requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Adresse e-mail invalide'
    if (!data.password?.trim()) errs.password = 'Le mot de passe est requis'
    else if (data.password.length < 6) errs.password = 'Au moins 6 caractères'
    if (data.password !== data.confirm) errs.confirm = 'Les mots de passe ne correspondent pas'
    return errs
  }

  const mutation = useMutation({
    mutationFn: (data) => authService.register({ 
      firstName: data.firstName, 
      lastName: data.lastName, 
      email: data.email, 
      whatsapp: data.whatsapp || null,
      password: data.password,
      confirmPassword: data.confirm
    }),
    onSuccess: (res) => {
      setServerError('')
      navigate('/auth/verify-email', { state: { email: watch('email'), message: 'Inscription réussie ! Veuillez vérifier votre email.' } })
    },
    onError: (err) => {
      const errorMsg = err?.response?.data?.error || err?.response?.data?.message || 'Erreur lors de l\'inscription'
      setServerError(errorMsg)
    }
  })

  const onSubmit = (data) => {
    const errs = validate(data)
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setServerError('')
    mutation.mutate(data)
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Créer un compte</h2>
      {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Prénom" name="firstName" register={register} error={fieldErrors.firstName} />
          <Input label="Nom" name="lastName" register={register} error={fieldErrors.lastName} />
        </div>
        <Input label="E-mail" name="email" register={register} error={fieldErrors.email} />
        <Input label="WhatsApp (optionnel)" name="whatsapp" register={register} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Mot de passe" name="password" type="password" register={register} error={fieldErrors.password} />
          <Input label="Confirmer mot de passe" name="confirm" type="password" register={register} error={fieldErrors.confirm} />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <a href="/auth/login" className="text-sm text-indigo-600 hover:underline">Vous avez déjà un compte ?</a>
          <Button type="submit" disabled={mutation.isPending}>S'inscrire</Button>
        </div>
      </form>
    </div>
  )
}
