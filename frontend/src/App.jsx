import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
// import logo from './assets/logo.jpeg'; // Logo is now handled by AppHeader

import AppHeader from './components/layout/AppHeader'; // Import AppHeader
import AppFooter from './components/layout/AppFooter'; // Import AppFooter

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col"> {/* Changed to flex-col to stack header, main, footer */}
      <AppHeader /> {/* Use the new AppHeader component */}

      <main className="flex-grow flex"> {/* Main content now occupies remaining space */}
        {/* Left Side - Welcome and Auth Options */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Logo and Welcome Text (moved to header or simplified here) */}
            {/* Removed redundant logo and welcome text, now handled by AppHeader and the main content section */}
            
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue sur VisitePulse</h2>
              <p className="text-gray-500">Votre solution centralisée pour la gestion des visites</p>
            </div>

            {/* Auth Buttons */}
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate('/auth/login')}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Se connecter</span>
              </button>
              <button
                onClick={() => navigate('/auth/register')}
                className="w-full border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-gray-700 cursor-pointer"
              >
                <span>Créer un compte</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -ml-36 -mb-36"></div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Transformez votre gestion des visites
            </h2>
            <p className="text-white text-opacity-90 text-lg">
              Accédez à des outils puissants et à une gestion en temps réel pour optimiser l'accueil de vos visiteurs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 rounded-xl p-3 w-fit mb-4">
                <span className="w-6 h-6 text-white">📊</span> {/* Placeholder for icon */}
              </div>
              <h3 className="text-white font-semibold mb-2">Analyse Avancée</h3>
              <p className="text-white text-opacity-80 text-sm">
                Outils de visualisation puissants pour une analyse des données
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 rounded-xl p-3 w-fit mb-4">
                <span className="w-6 h-6 text-white">📈</span> {/* Placeholder for icon */}
              </div>
              <h3 className="text-white font-semibold mb-2">Mises à jour en temps réel</h3>
              <p className="text-white text-opacity-80 text-sm">
                Surveillez vos indicateurs avec un flux de données en direct
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 rounded-xl p-3 w-fit mb-4">
                <span className="w-6 h-6 text-white">🗄️</span> {/* Placeholder for icon */}
              </div>
              <h3 className="text-white font-semibold mb-2">Intégration de données</h3>
              <p className="text-white text-opacity-80 text-sm">
                Connectez plusieurs sources de données de manière transparente
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 rounded-xl p-3 w-fit mb-4">
                <span className="w-6 h-6 text-white">🔒</span> {/* Placeholder for icon */}
              </div>
              <h3 className="text-white font-semibold mb-2">Plateforme sécurisée</h3>
              <p className="text-white text-opacity-80 text-sm">
                Sécurité de niveau entreprise pour vos données
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="relative z-10 flex items-center justify-around bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10K+</p>
              <p className="text-white text-opacity-80 text-sm">Utilisateurs Actifs</p>
            </div>
            <div className="h-12 w-px bg-white bg-opacity-30"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50M+</p>
              <p className="text-white text-opacity-80 text-sm">Points de Données</p>
            </div>
            <div className="h-12 w-px bg-white bg-opacity-30"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">99.9%</p>
              <p className="text-white text-opacity-80 text-sm">Disponibilité</p>
            </div>
          </div>
        </div>
      </main>

      <AppFooter /> {/* Use the new AppFooter component */}
    </div>
  );
}

export default App;
