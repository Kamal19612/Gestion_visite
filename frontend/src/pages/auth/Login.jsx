import React, { useState, useLayoutEffect, useRef, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/Form/Input';
import Button from '../../components/ui/Button';
import logo from '../../assets/logo.jpeg';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const [successMessage, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET':
        return action.payload;
      case 'CLEAR':
        return '';
      default:
        return state;
    }
  }, '');
  const [attemptCount, setAttemptCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const timeoutRef = useRef(null);

  useLayoutEffect(() => {
    if (location.state?.message) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      dispatch({ type: 'SET', payload: location.state.message });
      timeoutRef.current = setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);
    }
  }, [location.state?.message]);

  const mutation = useMutation({
    mutationFn: (data) => authService.login(data),
    onSuccess: async (res) => {
      localStorage.setItem('token', res.data.token);
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      await login(res.data.user || {});
      setAttemptCount(0);
      
      // Rediriger vers le dashboard approprié selon le rôle
      const role = res.data.user?.role || 'VISITEUR';
      const dashboards = {
        ADMIN: '/admin/dashboard',
        VISITEUR: '/visitor/dashboard',
        SECRETAIRE: '/secretary/dashboard',
        AGENT_SECURITE: '/agent/dashboard',
        EMPLOYE: '/employee/dashboard',
      };
      navigate(dashboards[role] || '/visitor/dashboard');
    },
    onError: (err) => {
      const newCount = attemptCount + 1;
      setAttemptCount(newCount);
      const msg = err?.response?.data?.error || 'E-mail ou mot de passe incorrect';
      setServerError(msg);
      if (newCount >= 3) {
        setServerError(msg + ' — Administrateur averti après 3 tentatives échouées');
      }
    },
  });

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      setServerError('Veuillez remplir tous les champs');
      return;
    }
    setServerError('');
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="VisitePulse Logo" className="w-12 h-12 rounded-full" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VisitePulse
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Bienvenue de retour !
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Connectez-vous pour accéder à votre tableau de bord et gérer vos rendez-vous en toute simplicité.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-8">
            {[
              { icon: '✅', text: 'Gestion simplifiée des rendez-vous' },
              { icon: '📊', text: 'Statistiques en temps réel' },
              { icon: '🔒', text: 'Sécurité de niveau entreprise' },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-10 border border-gray-100">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <img src={logo} alt="VisitePulse Logo" className="w-10 h-10 rounded-full" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VisitePulse
              </h1>
            </div>

            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600">Accédez à votre compte</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center space-x-2 animate-fade-in">
                <span className="text-xl">✓</span>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {serverError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start space-x-2 animate-fade-in">
                <span className="text-xl">⚠</span>
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Adresse e-mail"
                  name="email"
                  type="email"
                  register={register}
                  placeholder="votre@email.com"
                  className="w-full"
                />
              </div>

              <div>
                <div className="relative">
                  <Input
                    label="Mot de passe"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    register={register}
                    placeholder="••••••••"
                    className="w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Mot de passe oublié ?
                </a>
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span className="animate-spin">⏳</span>
                    <span>Connexion...</span>
                  </span>
                ) : (
                  'Se connecter'
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Ou</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Vous n'avez pas de compte ?{' '}
                  <Link
                    to="/auth/register"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
