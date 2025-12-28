import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './App.css';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Si l'utilisateur est connecté, rediriger vers son dashboard
  React.useEffect(() => {
    if (user) {
      const role = user.role || 'VISITEUR';
      const dashboards = {
        ADMIN: '/admin/dashboard',
        VISITEUR: '/visitor/dashboard',
        SECRETAIRE: '/secretary/dashboard',
        AGENT_SECURITE: '/agent/dashboard',
        EMPLOYE: '/employee/dashboard',
      };
      navigate(dashboards[role] || '/visitor/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <AppHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Bienvenue sur{' '}
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      VisitePulse
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Votre solution moderne et centralisée pour la gestion intelligente des visites et rendez-vous
                  </p>
                </div>

                {/* Features List */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">✅</span>
                    </div>
                    <span className="text-gray-700 font-medium">Gestion simplifiée</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">⚡</span>
                    </div>
                    <span className="text-gray-700 font-medium">Temps réel</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🔒</span>
                    </div>
                    <span className="text-gray-700 font-medium">Sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📊</span>
                    </div>
                    <span className="text-gray-700 font-medium">Analytics</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={() => navigate('/auth/login')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Se connecter</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  <button
                    onClick={() => navigate('/auth/register')}
                    className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg hover:border-indigo-500 transform hover:scale-105 transition-all duration-300"
                  >
                    Créer un compte
                  </button>
                </div>
              </div>

              {/* Right Content - Illustration */}
              <div className="relative lg:block hidden">
                <div className="relative z-10">
                  {/* Animated Background Shapes */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  
                  {/* Feature Cards */}
                  <div className="relative space-y-6">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl">
                          📅
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Rendez-vous</h3>
                          <p className="text-sm text-gray-600">Gestion simplifiée</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 ml-12">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl">
                          👥
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Visiteurs</h3>
                          <p className="text-sm text-gray-600">Suivi en temps réel</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl">
                          📊
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Statistiques</h3>
                          <p className="text-sm text-gray-600">Analytics avancés</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir VisitePulse ?</h2>
              <p className="text-xl text-gray-600">Une solution complète pour moderniser votre gestion des visites</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🚀',
                  title: 'Rapide et Efficace',
                  description: 'Interface intuitive pour une gestion fluide des rendez-vous',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: '🔐',
                  title: 'Sécurisé',
                  description: 'Protection de niveau entreprise pour vos données sensibles',
                  color: 'from-indigo-500 to-purple-500',
                },
                {
                  icon: '📱',
                  title: 'Multi-plateforme',
                  description: 'Accessible depuis n\'importe quel appareil, partout',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: '📈',
                  title: 'Analytics',
                  description: 'Tableaux de bord et rapports détaillés pour optimiser vos processus',
                  color: 'from-pink-500 to-red-500',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: '100%', label: 'Satisfaction Client' },
                { number: '24/7', label: 'Support Disponible' },
                { number: '99.9%', label: 'Disponibilité' },
              ].map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

export default App;
