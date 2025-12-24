import React from 'react';
import logo from '../../assets/logo.jpeg';
import { Link } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="VisitePulse Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold text-gray-900">VisitePulse</h1>
          </Link>
        </div>
        {/* Potentially add global navigation for unauthenticated users here, if any */}
      </div>
    </header>
  );
}
