import React from 'react';

export default function SystemSettings() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres du Système</h1>
      
      <p className="mb-4">Configurez les réglages généraux de l'application et gérez les droits d'accès des utilisateurs.</p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Réglages Généraux</h2>
        <div className="space-y-4">
          <label htmlFor="appName" className="block text-sm font-medium text-gray-700">Nom de l'application</label>
          <input 
            type="text" 
            id="appName" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Gestion des Visites"
          />
          {/* More general settings here */}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Gestion des Droits d'Accès</h2>
        <div className="space-y-4">
          <p className="text-gray-600">Définissez les rôles et les permissions pour chaque type d'utilisateur.</p>
          {/* Access rights configuration here */}
        </div>
      </div>
    </div>
  );
}
