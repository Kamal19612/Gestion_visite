import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/layout/Sidebar';
import AppHeader from '../components/layout/AppHeader';

export default function MainLayout({ children }) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Si l'utilisateur n'est pas connecté, afficher un layout simple
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1">
          {children || <Outlet />}
        </main>
        <footer className="bg-white border-t py-3 text-center text-sm text-slate-500">
          © 2025 NativIA — VisitePulse
        </footer>
      </div>
    );
  }

  // Layout avec sidebar pour les utilisateurs connectés
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div 
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '256px' : '80px' }}
      >
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </main>
        <footer className="bg-white border-t py-3 text-center text-sm text-slate-500">
          © 2025 NativIA — VisitePulse
        </footer>
      </div>
    </div>
  );
}
