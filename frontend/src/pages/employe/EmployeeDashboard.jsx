import React from 'react';

export default function EmployeeDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Employé</h1>
      
      <p className="mb-4">Bienvenue sur votre tableau de bord. Ici, vous pourrez consulter votre planning, vos rendez-vous et vos disponibilités.</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Mon Planning</h2>
        <p className="text-gray-600">Le planning des rendez-vous et vos disponibilités pour la semaine seront affichés ici.</p>
        {/* Placeholder for actual schedule display */}
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="text-gray-500">Chargement du planning...</p>
        </div>
      </div>
    </div>
  );
}
