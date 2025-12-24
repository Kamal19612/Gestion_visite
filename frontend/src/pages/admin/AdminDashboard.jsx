import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Administrateur</h1>
      
      <p className="mb-4">Bienvenue sur votre tableau de bord. Gérez le système et consultez les statistiques.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Consulter les Statistiques</h2>
          <p className="text-gray-600">Visualisez les données et rapports sur les visites et rendez-vous.</p>
          <Link to="/admin/statistics" className="mt-4 inline-block text-indigo-600 hover:underline">Voir les statistiques</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Gestion des Utilisateurs</h2>
          <p className="text-gray-600">Créez, modifiez ou supprimez les comptes utilisateurs.</p>
          <Link to="/admin/users" className="mt-4 inline-block text-indigo-600 hover:underline">Gérer les utilisateurs</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Paramètres du Système</h2>
          <p className="text-gray-600">Configurez les réglages généraux et les droits d'accès.</p>
          <Link to="/admin/settings" className="mt-4 inline-block text-indigo-600 hover:underline">Accéder aux paramètres</Link>
        </div>
      </div>
    </div>
  );
}
