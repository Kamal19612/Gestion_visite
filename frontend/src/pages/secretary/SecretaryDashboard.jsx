import React from 'react';
import { Link } from 'react-router-dom';

export default function SecretaryDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Secrétaire</h1>
      
      <p className="mb-4">Bienvenue sur votre tableau de bord. Gérez les demandes de rendez-vous et l'accès des visiteurs.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Demandes de rendez-vous en attente</h2>
          <p className="text-gray-600">Vous avez <span className="font-bold text-red-500">3</span> nouvelles demandes à traiter.</p>
          <Link to="/secretary/appointments" className="mt-4 inline-block text-indigo-600 hover:underline">Voir les demandes</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Visiteurs du jour</h2>
          <p className="text-gray-600">0 visiteurs prévus pour aujourd'hui.</p>
          <Link to="/secretary/visits/today" className="mt-4 inline-block text-indigo-600 hover:underline">Gérer les visites</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Rapports et Statistiques</h2>
          <p className="text-gray-600">Accédez aux données agrégées.</p>
          <Link to="/secretary/reports" className="mt-4 inline-block text-indigo-600 hover:underline">Consulter les rapports</Link>
        </div>
      </div>
    </div>
  );
}
