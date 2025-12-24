import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function MainLayout({ children }) {
  const [isMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Accueil</Link>
              <Link to="/auth/login" className="bg-indigo-600 text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium">Connexion</Link>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1 max-w-7xl mx-auto p-4 w-full">
        {children || <Outlet />}
      </main>
      <footer className="bg-white border-t py-3 text-center text-sm text-slate-500">
        © 2025 NativIA — VisitePulse
      </footer>
    </div>
  );
}
