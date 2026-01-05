import React from 'react';

export default function VisitsToday() {
  // Placeholder UI - replace with real data fetching when API is ready
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Visiteurs du jour</h1>

      <p className="mb-4 text-gray-600">Liste des visiteurs attendus aujourd'hui. Cette page sera connectée à l'API des visites.</p>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visiteur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure prévue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">Aucun visiteur pour le moment</td>
              <td className="px-6 py-4">—</td>
              <td className="px-6 py-4">—</td>
              <td className="px-6 py-4" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
