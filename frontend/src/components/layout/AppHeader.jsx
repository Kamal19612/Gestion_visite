import React from 'react';
import logo from '../../assets/logo.jpeg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VisitePulse" className="w-9 h-9 rounded-md object-cover" />
              <span className="hidden sm:inline-block text-lg font-semibold text-gray-800">VisitePulse</span>
            </Link>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">{user.firstName || user.email}</span>
                <button onClick={logout} className="text-sm text-red-600 hover:underline">Se déconnecter</button>
              </div>
            ) : (
              <>
                <Link to="/auth/login" className="text-sm text-gray-600 hover:text-indigo-600">Connexion</Link>
                <Link to="/auth/register" className="hidden sm:inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-md">S'inscrire</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
