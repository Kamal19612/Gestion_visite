import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import Input from '../../components/Form/Input';
import Button from '../../components/ui/Button';
import logo from '../../assets/logo.jpeg';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const validate = (data) => {
    const errs = {};
    if (!data.firstName?.trim()) errs.firstName = 'Le prénom est requis';
    if (!data.lastName?.trim()) errs.lastName = 'Le nom est requis';
    if (!data.email?.trim()) errs.email = 'L\'e-mail est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Adresse e-mail invalide';
    if (!data.password?.trim()) errs.password = 'Le mot de passe est requis';
    else if (data.password.length < 6) errs.password = 'Au moins 6 caractères';
    if (data.password !== data.confirm) errs.confirm = 'Les mots de passe ne correspondent pas';
    return errs;
  };

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
      setServerError('');
      navigate('/auth/verify-email', {
        state: {
          email: watch('email'),
          message: 'Inscription réussie ! Veuillez vérifier votre email.'
        }
      });
    },
    onError: (err) => {
      const errorMsg = err?.response?.data?.error || err?.response?.data?.message || 'Erreur lors de l\'inscription';
      setServerError(errorMsg);
    }
  });

  const onSubmit = (data) => {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setServerError('');
    mutation.mutate(data);
  };

  // Password strength indicator
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: 0, label: '', color: '', textColor: '' };
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    const levels = [
      { label: 'Très faible', color: 'bg-red-500', textColor: 'text-red-600' },
      { label: 'Faible', color: 'bg-orange-500', textColor: 'text-orange-600' },
      { label: 'Moyen', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
      { label: 'Fort', color: 'bg-green-500', textColor: 'text-green-600' },
      { label: 'Très fort', color: 'bg-green-600', textColor: 'text-green-700' },
    ];
    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src={logo} alt="VisitePulse Logo" className="w-12 h-12 rounded-full" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VisitePulse
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
            <p className="text-gray-600">Rejoignez-nous et commencez à gérer vos visites efficacement</p>
          </div>

          {/* Error Message */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start space-x-2 animate-fade-in">
              <span className="text-xl">⚠</span>
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Prénom"
                  name="firstName"
                  register={register}
                  error={fieldErrors.firstName}
                  placeholder="Jean"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  label="Nom"
                  name="lastName"
                  register={register}
                  error={fieldErrors.lastName}
                  placeholder="Dupont"
                  className="w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                label="Adresse e-mail"
                name="email"
                type="email"
                register={register}
                error={fieldErrors.email}
                placeholder="jean.dupont@example.com"
                className="w-full"
              />
            </div>

            {/* WhatsApp (Optional) */}
            <div>
              <Input
                label="WhatsApp (optionnel)"
                name="whatsapp"
                register={register}
                placeholder="+33 6 12 34 56 78"
                className="w-full"
              />
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="relative">
                  <Input
                    label="Mot de passe"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    register={register}
                    error={fieldErrors.password}
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
                {password && (
                  <div className="mt-2">
                    <div className="flex space-x-1 mb-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            level <= passwordStrength.strength
                              ? passwordStrength.color
                              : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      Force: <span className={`font-semibold ${passwordStrength.textColor || 'text-gray-600'}`}>
                        {passwordStrength.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div>
                <div className="relative">
                  <Input
                    label="Confirmer le mot de passe"
                    name="confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    register={register}
                    error={fieldErrors.confirm}
                    placeholder="••••••••"
                    className="w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                J'accepte les{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  politique de confidentialité
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="animate-spin">⏳</span>
                  <span>Inscription en cours...</span>
                </span>
              ) : (
                'Créer mon compte'
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Vous avez déjà un compte ?{' '}
                <Link
                  to="/auth/login"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
