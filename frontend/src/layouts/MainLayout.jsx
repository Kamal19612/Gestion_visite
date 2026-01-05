import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import { useAuth } from '../hooks/useAuth';

export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Determine home route based on user role
  const getHomeRoute = () => {
    if (!user) return '/';
    const role = typeof user.role === 'string' ? user.role : user.role?.name;
    switch (role) {
      case 'VISITEUR':
        return '/visitor/dashboard';
      case 'SECRETAIRE':
        return '/secretary/dashboard';
      case 'AGENT_SECURITE':
        return '/agent/dashboard';
      case 'EMPLOYEUR':
        return '/employee/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Sidebar (compact) */}
        <aside className="hidden md:flex flex-col w-52 mr-6">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white rounded-lg border p-4 text-sm text-gray-700">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">{(user.firstName || user.email || '?')[0]}</div>
                  <div>
                    <div className="font-medium text-gray-900">{user?.firstName || user?.email}</div>
                    <div className="text-xs text-gray-500">{user?.role}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600">Invité</p>
                  <Link to="/auth/login" className="text-indigo-600 hover:underline">Se connecter</Link>
                </div>
              )}
            </div>

            <nav className="bg-white rounded-lg border overflow-hidden">
              <ul className="divide-y">
                <li>
                  <Link to={getHomeRoute()} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z"/></svg>
                    <span className="text-sm text-gray-700">Accueil</span>
                  </Link>
                </li>
                {user && user.role === 'VISITEUR' && (
                  <>
                    <li>
                      <Link to="/visitor/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v4a1 1 0 001 1h3v6h8v-6h3a1 1 0 001-1V7M16 3.13a4 4 0 10-8 0V5h8V3.13z"/></svg>
                        <span className="text-sm text-gray-700">Mon tableau</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/visitor/appointments/new" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                        <span className="text-sm text-gray-700">Nouveau RDV</span>
                      </Link>
                    </li>
                  </>
                )}
                {user && user.role === 'SECRETAIRE' && (
                  <li>
                    <Link to="/secretary/appointments" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
                      <span className="text-sm text-gray-700">Liste RDV</span>
                    </Link>
                  </li>
                )}
                {user && user.role === 'EMPLOYEUR' && (
                  <li>
                    <Link to="/employee/schedule" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span className="text-sm text-gray-700">Planning</span>
                    </Link>
                  </li>
                )}}
                {user && user.role === 'ADMIN' && (
                  <li>
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 .74.268 1.415.707 1.947l-2.114 2.114A3 3 0 106.343 18l2.114-2.114A3 3 0 0010 15c1.657 0 3-1.343 3-3s-1.343-3-3-3z"/></svg>
                      <span className="text-sm text-gray-700">Administration</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {user && (
              <div className="bg-white rounded-lg border p-3 text-center">
                <button onClick={logout} className="text-sm text-red-600 hover:underline">Se déconnecter</button>
              </div>
            )}
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>

      <AppFooter />
    </div>
  );
}
