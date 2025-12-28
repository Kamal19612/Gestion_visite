import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.jpeg';

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getRoleLabel = (role) => {
    const labels = {
      ADMIN: 'Administrateur',
      VISITEUR: 'Visiteur',
      SECRETAIRE: 'Secrétaire',
      AGENT_SECURITE: 'Agent de Sécurité',
      EMPLOYE: 'Employé',
    };
    return labels[role] || role;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {!user ? (
          <>
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="VisitePulse Logo" className="w-10 h-10 rounded-full" />
              <h1 className="text-2xl font-bold text-gray-900">VisitePulse</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/auth/login" className="text-gray-600 hover:text-indigo-600 font-medium">
                Connexion
              </Link>
              <Link to="/auth/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                S'inscrire
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user.name || user.email}</p>
                <p className="text-gray-500">{getRoleLabel(user.role)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  logout();
                  navigate('/auth/login');
                }}
                className="text-gray-600 hover:text-red-600 font-medium transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
