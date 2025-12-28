import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    appName: 'VisitePulse',
    maintenanceMode: false,
    emailNotifications: true,
    autoApproveAppointments: false,
  });

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde des paramètres
    toast.success('Paramètres sauvegardés avec succès');
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres du Système</h1>
        <p className="text-gray-600">Configurez les réglages généraux et les droits d'accès</p>
      </div>

      {/* Réglages généraux */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Réglages Généraux</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'application
            </label>
            <input
              type="text"
              id="appName"
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="VisitePulse"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label htmlFor="maintenanceMode" className="block text-sm font-medium text-gray-700">
                Mode Maintenance
              </label>
              <p className="text-sm text-gray-500">Désactive l'accès public au système</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label htmlFor="emailNotifications" className="block text-sm font-medium text-gray-700">
                Notifications par Email
              </label>
              <p className="text-sm text-gray-500">Activer l'envoi d'emails automatiques</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label htmlFor="autoApprove" className="block text-sm font-medium text-gray-700">
                Approbation Automatique
              </label>
              <p className="text-sm text-gray-500">Approuver automatiquement les rendez-vous</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="autoApprove"
                checked={settings.autoApproveAppointments}
                onChange={(e) => setSettings({ ...settings, autoApproveAppointments: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Enregistrer les paramètres</Button>
        </div>
      </div>

      {/* Gestion des droits d'accès */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestion des Droits d'Accès</h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Rôles et Permissions</h3>
            <p className="text-sm text-gray-600 mb-4">
              Les rôles suivants sont configurés dans le système :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { role: 'ADMIN', desc: 'Accès complet au système', color: 'purple' },
                { role: 'SECRETAIRE', desc: 'Gestion des rendez-vous', color: 'green' },
                { role: 'AGENT_SECURITE', desc: 'Enregistrement des visites', color: 'yellow' },
                { role: 'VISITEUR', desc: 'Demande de rendez-vous', color: 'blue' },
                { role: 'EMPLOYE', desc: 'Consultation du planning', color: 'gray' },
              ].map((r) => (
                <div key={r.role} className="p-3 bg-gray-50 rounded-lg">
                  <span className={`font-semibold text-${r.color}-600`}>{r.role}</span>
                  <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zone de danger */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-900 mb-4">Zone de Danger</h2>
        <p className="text-red-700 mb-4">
          Les actions suivantes sont irréversibles. Utilisez-les avec précaution.
        </p>
        <div className="space-y-3">
          <button className="w-full text-left p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
            <span className="font-semibold text-red-900">Réinitialiser la base de données</span>
            <p className="text-sm text-red-700 mt-1">Supprime toutes les données du système</p>
          </button>
          <button className="w-full text-left p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
            <span className="font-semibold text-red-900">Exporter toutes les données</span>
            <p className="text-sm text-red-700 mt-1">Télécharge un backup complet</p>
          </button>
        </div>
      </div>
    </div>
  );
}
