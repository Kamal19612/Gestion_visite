import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../../services/userService';
import toast from 'react-hot-toast';

const ROLES = ['VISITEUR', 'SECRETAIRE', 'AGENT_SECURITE', 'EMPLOYE', 'ADMIN'];

export default function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
    enabled: isEdit,
    onSuccess: (data) => {
      if (data) {
        const [firstName, ...lastNameParts] = data.name.split(' ');
        const lastName = lastNameParts.join(' ') || '';
        reset({ firstName, lastName, email: data.email, role: data.role });
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: (payload) => userService.createUser(payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['users'] }); toast.success('Utilisateur créé'); navigate('/admin/users'); },
    onError: (error) => {
      console.error('Error creating user:', error);
      toast.error(error?.response?.data?.message || 'Échec lors de la création');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => userService.updateUser(id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['users'] }); toast.success('Utilisateur mis à jour'); navigate('/admin/users'); },
    onError: (error) => {
      console.error('Error updating user:', error);
      toast.error(error?.response?.data?.message || 'Échec lors de la mise à jour');
    }
  });

  const onSubmit = (data) => {
    // Validate password match for creation
    if (!isEdit && data.password !== data.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    const payload = { ...data };
    
    // If editing and password empty, don't send password/confirmPassword
    if (isEdit && (!payload.password || payload.password.trim() === '')) {
      delete payload.password;
      delete payload.confirmPassword;
    }

    if (isEdit) updateMutation.mutate({ id, payload });
    else createMutation.mutate(payload);
  };

  useEffect(() => {
    if (!isEdit) reset({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', whatsapp: '', role: 'VISITEUR' });
  }, [isEdit, reset]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Modifier l\'utilisateur' : 'Créer un nouvel utilisateur'}</h1>
      {isEdit && isLoading ? <p>Chargement...</p> : (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input {...register('firstName', { required: 'Le prénom est requis', minLength: { value: 2, message: 'Minimum 2 caractères' } })} className="mt-1 block w-full border rounded px-3 py-2" />
            {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input {...register('lastName', { required: 'Le nom est requis', minLength: { value: 2, message: 'Minimum 2 caractères' } })} className="mt-1 block w-full border rounded px-3 py-2" />
            {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" {...register('email', { required: 'L\'email est requis', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' } })} className="mt-1 block w-full border rounded px-3 py-2" />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Téléphone (WhatsApp)</label>
            <input {...register('whatsapp')} className="mt-1 block w-full border rounded px-3 py-2" placeholder="+212..." />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de passe {isEdit ? '(laisser vide pour ne pas modifier)' : ''}</label>
            <input 
              type="password" 
              {...register('password', { 
                required: isEdit ? false : 'Le mot de passe est requis',
                minLength: isEdit ? { value: 0, message: '' } : { value: 6, message: 'Minimum 6 caractères' }
              })} 
              className="mt-1 block w-full border rounded px-3 py-2" 
            />
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe {isEdit ? '(laisser vide pour ne pas modifier)' : ''}</label>
            <input 
              type="password" 
              {...register('confirmPassword', { 
                required: isEdit ? false : 'La confirmation est requise',
                validate: (value) => !isEdit && value !== password ? 'Les mots de passe ne correspondent pas' : true
              })} 
              className="mt-1 block w-full border rounded px-3 py-2" 
            />
            {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rôle</label>
            <select {...register('role', { required: 'Le rôle est requis' })} className="mt-1 block w-full border rounded px-3 py-2">
              <option value="">Sélectionner un rôle</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.role && <span className="text-red-600 text-sm">{errors.role.message}</span>}
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">{isEdit ? 'Mettre à jour' : 'Créer'}</button>
            <button type="button" onClick={() => window.history.back()} className="text-gray-600">Annuler</button>
          </div>
        </form>
      )}
    </div>
  );
}
