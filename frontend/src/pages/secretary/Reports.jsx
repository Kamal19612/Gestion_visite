import React from 'react';
import { Link } from 'react-router-dom';

export default function Reports() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Rapports Secrétariat</h1>

      <p className="mb-4 text-gray-600">Consultez les rapports liés aux rendez-vous et aux visites.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Rapport des visites</h2>
          <p className="text-gray-600">Exportez ou consultez l'historique des visites.</p>
          <Link to="/secretary/reports/visits" className="mt-4 inline-block text-indigo-600 hover:underline">Consulter</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Statistiques RDV</h2>
          <p className="text-gray-600">Vue agrégée des rendez-vous par période.</p>
          <Link to="/secretary/reports/appointments" className="mt-4 inline-block text-indigo-600 hover:underline">Consulter</Link>
        </div>
      </div>
    </div>
  );
}
