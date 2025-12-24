import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout'; // Assuming MainLayout exists

export default function VisitorDashboard() {
  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord Visiteur</h1>
        
        <p className="mb-4">Bienvenue sur votre tableau de bord. Ici, vous pouvez gérer vos rendez-vous et consulter l'historique de vos visites.</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-3">Vos Rendez-vous à Venir</h2>
          <p className="text-gray-600">Aucun rendez-vous à venir pour le moment.</p>
          {/* Future: Display list of upcoming appointments */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-3">Historique des Visites</h2>
          <p className="text-gray-600">Aucune visite enregistrée pour le moment.</p>
          {/* Future: Display list of past visits */}
        </div>

        <div className="mt-8 text-center">
          <Link to="/visitor/appointments/new" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Prendre un nouveau rendez-vous
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
