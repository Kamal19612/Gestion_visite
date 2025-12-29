import React, { useState, useLayoutEffect, useRef, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import authService from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/Form/Input'
import Button from '../../components/ui/Button'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')
  const [successMessage, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET':
        return action.payload
      case 'CLEAR':
        return ''
      default:
        return state
    }
  }, '')
  const [attemptCount, setAttemptCount] = useState(0)

  const timeoutRef = useRef(null)

  useLayoutEffect(() => {
    if (location.state?.message) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      dispatch({ type: 'SET', payload: location.state.message })
      timeoutRef.current = setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    }
  }, [location.state?.message])

  const mutation = useMutation({
    mutationFn: (data) => authService.login(data),
    onSuccess: async (res) => {
      localStorage.setItem('token', res.data.token)
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
      }
      await login(res.data.user || {})
      setAttemptCount(0)
      navigate('/visitor')
    },
    onError: (err) => {
      const newCount = attemptCount + 1
      setAttemptCount(newCount)
      const msg = err?.response?.data?.error || 'E-mail ou mot de passe incorrect'
      setServerError(msg)
      if (newCount >= 3) {
        setServerError(msg + ' — Administrateur averti après 3 tentatives échouées')
      }
    }
  })

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      setServerError('Veuillez remplir tous les champs')
      return
    }
    setServerError('')
    mutation.mutate(data)
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">✓ {successMessage}</div>}
      {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="E-mail" name="email" register={register} />
        <Input label="Mot de passe" name="password" type="password" register={register} />
        <div className="flex gap-2 justify-between items-center">
          <a href="/auth/register" className="text-sm text-indigo-600 hover:underline">Créer un compte</a>
          <Button type="submit" disabled={mutation.isPending}>Se connecter</Button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-gray-600 hover:underline">Retour à l'accueil</Link>
      </div>
    </div>
  )
}
