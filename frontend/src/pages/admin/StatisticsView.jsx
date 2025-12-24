import React from 'react';
import { Link } from 'react-router-dom';

export default function StatisticsView() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Statistiques Administrateur</h1>
      <p className="mb-4">Sélectionnez le type de statistiques que vous souhaitez consulter :</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Historique des Visites</h2>
          <p className="text-gray-600">Consultez l'historique complet de toutes les visites.</p>
          <Link to="/admin/statistics/history" className="mt-4 inline-block text-indigo-600 hover:underline">Voir l'historique</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Durée Moyenne des Visites</h2>
          <p className="text-gray-600">Analysez la durée moyenne des visites.</p>
          <Link to="/admin/statistics/average-duration" className="mt-4 inline-block text-indigo-600 hover:underline">Voir la durée moyenne</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Statistiques par Département</h2>
          <p className="text-gray-600">Obtenez des statistiques détaillées par département.</p>
          <Link to="/admin/statistics/departments" className="mt-4 inline-block text-indigo-600 hover:underline">Voir par département</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Rapports Détaillés</h2>
          <p className="text-gray-600">Générez des rapports personnalisés.</p>
          <Link to="/admin/statistics/detailed-reports" className="mt-4 inline-block text-indigo-600 hover:underline">Générer les rapports</Link>
        </div>
      </div>
    </div>
  );
}
