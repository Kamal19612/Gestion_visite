import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/ui/StatCard';

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Agent de Sécurité</h1>
        <p className="text-gray-600">Gérez les visites et les rendez-vous sur place</p>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/agent/appointments/new-on-site"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nouveau Rendez-vous</h3>
              <p className="text-gray-600">Enregistrez un rendez-vous pour un visiteur présent sur site</p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">📝</div>
          </div>
        </Link>

        <Link
          to="/agent/visit/record"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enregistrer une Visite</h3>
              <p className="text-gray-600">Enregistrez l'arrivée et le départ d'un visiteur, y compris la signature</p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">✅</div>
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visiteurs Actuels</h3>
              <p className="text-gray-600">Consultez la liste des visiteurs actuellement sur site</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Instructions</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-800">
          <li>Pour créer un rendez-vous sur place, utilisez le formulaire "Nouveau Rendez-vous"</li>
          <li>Pour enregistrer une visite, utilisez "Enregistrer une Visite" et scannez la pièce d'identité</li>
          <li>N'oubliez pas de faire signer le visiteur avant son départ</li>
        </ul>
      </div>
    </div>
  );
}
