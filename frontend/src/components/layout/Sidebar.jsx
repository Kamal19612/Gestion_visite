import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.jpeg';

const menuItems = {
  ADMIN: [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: '📊' },
    { path: '/admin/statistics', label: 'Statistiques', icon: '📈' },
    { path: '/admin/users', label: 'Gestion Utilisateurs', icon: '👥' },
    { path: '/admin/settings', label: 'Paramètres', icon: '⚙️' },
  ],
  VISITEUR: [
    { path: '/visitor/dashboard', label: 'Tableau de bord', icon: '🏠' },
    { path: '/visitor/appointments/new', label: 'Nouveau rendez-vous', icon: '📅' },
  ],
  SECRETAIRE: [
    { path: '/secretary/dashboard', label: 'Tableau de bord', icon: '🏠' },
    { path: '/secretary/appointments', label: 'Rendez-vous', icon: '📋' },
  ],
  AGENT_SECURITE: [
    { path: '/agent/dashboard', label: 'Tableau de bord', icon: '🏠' },
    { path: '/agent/appointments/new-on-site', label: 'Rendez-vous sur place', icon: '📝' },
    { path: '/agent/visit/record', label: 'Enregistrer visite', icon: '✅' },
  ],
  EMPLOYE: [
    { path: '/employee/dashboard', label: 'Tableau de bord', icon: '🏠' },
  ],
};

export default function Sidebar({ isOpen: externalIsOpen, onToggle }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  
  // Utiliser l'état externe si fourni, sinon l'état interne
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;

  if (!user) return null;

  const role = user.role || 'VISITEUR';
  const items = menuItems[role] || menuItems.VISITEUR;

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
    <div className={`bg-gray-900 text-white min-h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} fixed left-0 top-0 z-40`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
            <span className="font-bold text-lg">VisitePulse</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      <div className="p-4 border-t border-gray-700">
        {isOpen ? (
          <div>
            <p className="text-gray-400 text-xs uppercase mb-1">Utilisateur</p>
            <p className="font-semibold">{user.name || user.email}</p>
            <p className="text-gray-400 text-sm">{getRoleLabel(role)}</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600 mx-auto flex items-center justify-center text-white font-bold">
              {(user.name || user.email || 'U').charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      <nav className="mt-4">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 bg-gray-900">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <span className="text-xl">🚪</span>
          {isOpen && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}

