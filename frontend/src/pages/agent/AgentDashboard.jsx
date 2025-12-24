import React from 'react';
import { Link } from 'react-router-dom';

export default function AgentDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Agent de Sécurité</h1>
      
      <p className="mb-4">Bienvenue sur votre tableau de bord. Gérez les visites et les rendez-vous sur place.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Nouvelle prise de rendez-vous sur place</h2>
          <p className="text-gray-600">Enregistrez un rendez-vous pour un visiteur présent sur site.</p>
          <Link to="/agent/appointments/new-on-site" className="mt-4 inline-block text-indigo-600 hover:underline">Créer rendez-vous</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Enregistrer une visite</h2>
          <p className="text-gray-600">Enregistrez l'arrivée et le départ d'un visiteur, y compris la signature.</p>
          <Link to="/agent/visit/record" className="mt-4 inline-block text-indigo-600 hover:underline">Enregistrer visite</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Visiteurs Actuels</h2>
          <p className="text-gray-600">Consultez la liste des visiteurs actuellement sur site.</p>
          <Link to="/agent/current-visitors" className="mt-4 inline-block text-indigo-600 hover:underline">Voir les visiteurs</Link>
        </div>
      </div>
    </div>
  );
}
