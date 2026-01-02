import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../../services/userService';
import toast from 'react-hot-toast';

export default function UserManagement() {
  const qc = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery({ queryKey: ['users'], queryFn: () => userService.getUsers() });

  const deleteMutation = useMutation({
    mutationFn: (id) => userService.deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('Utilisateur supprimé');
    },
    onError: (err) => {
      toast.error('Échec de la suppression');
      console.error(err);
    },
  });

  const handleDelete = (userId) => {
    if (!confirm('Confirmer la suppression de cet utilisateur ?')) return;
    deleteMutation.mutate(userId);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Utilisateurs</h1>

      <div className="flex justify-end mb-4">
        <Link to="/admin/users/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Créer un nouvel utilisateur</Link>
      </div>

      {isLoading ? (
        <p>Chargement...</p>
      ) : isError ? (
        <p className="text-red-600">Erreur lors du chargement des utilisateurs.</p>
      ) : users.length === 0 ? (
        <p className="text-gray-600">Aucun utilisateur enregistré.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/users/${user.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Modifier</Link>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
