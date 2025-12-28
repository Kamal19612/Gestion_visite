import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function UserManagement() {
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Récupérer tous les utilisateurs
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
  });

  // Mutation pour supprimer un utilisateur
  const deleteMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      toast.success('Utilisateur supprimé avec succès');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setDeleteConfirm(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || 'Erreur lors de la suppression');
    },
  });

  const handleDelete = (userId, userName) => {
    if (deleteConfirm === userId) {
      deleteMutation.mutate(userId);
    } else {
      setDeleteConfirm(userId);
      setTimeout(() => setDeleteConfirm(null), 5000); // Reset après 5 secondes
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      ADMIN: { label: 'Administrateur', color: 'bg-purple-100 text-purple-800' },
      VISITEUR: { label: 'Visiteur', color: 'bg-blue-100 text-blue-800' },
      SECRETAIRE: { label: 'Secrétaire', color: 'bg-green-100 text-green-800' },
      AGENT_SECURITE: { label: 'Agent Sécurité', color: 'bg-yellow-100 text-yellow-800' },
      EMPLOYE: { label: 'Employé', color: 'bg-gray-100 text-gray-800' },
    };
    const config = roleConfig[role] || { label: role, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
          <p className="text-red-600">Erreur lors du chargement des utilisateurs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
            <p className="text-gray-600">Créez, modifiez ou supprimez les comptes utilisateurs</p>
          </div>
          <Link
            to="/admin/users/new"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            + Nouvel Utilisateur
          </Link>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Total Utilisateurs</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Administrateurs</p>
          <p className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.role === 'ADMIN').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Visiteurs</p>
          <p className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.role === 'VISITEUR').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Personnel</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter(u => ['SECRETAIRE', 'AGENT_SECURITE', 'EMPLOYE'].includes(u.role)).length}
          </p>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Aucun utilisateur enregistré.</p>
          <Link
            to="/admin/users/new"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Créer le premier utilisateur
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold">
                            {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'Sans nom'}
                          </div>
                          {user.phoneNumber && (
                            <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      {user.emailVerified ? (
                        <div className="text-xs text-green-600">✓ Vérifié</div>
                      ) : (
                        <div className="text-xs text-yellow-600">⚠ Non vérifié</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.emailVerified ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Actif
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          En attente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          // TODO: Implémenter la modification d'utilisateur
                          toast.info('Fonctionnalité de modification à venir');
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className={`${
                          deleteConfirm === user.id
                            ? 'text-red-800 font-bold'
                            : 'text-red-600 hover:text-red-900'
                        }`}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteConfirm === user.id ? 'Confirmer ?' : 'Supprimer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
