import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import appointmentService from '../../services/appointmentService';

export default function VisitorDashboard() {
  const { data: appointments = [], isLoading, error, refetch } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentService.getAppointments,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => appointmentService.deleteAppointment(id),
    onSuccess: () => {
      toast.success('Rendez-vous supprimé avec succès');
      refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || 'Erreur lors de la suppression');
    }
  });

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      deleteMutation.mutate(id);
    }
  };

  const getField = (obj, candidates = []) => {
    for (const k of candidates) {
      if (obj && Object.prototype.hasOwnProperty.call(obj, k) && obj[k] != null) return obj[k];
    }
    return null;
  };

  const resolveDateValue = (a) => a && (a.rDVDate || a.rdvDate || a.date || a.dateRDV || a.rdv_date || a.rdvDateTime || null);
  const resolveTimeValue = (a) => a && (a.rDVHeure || a.rdvHeure || a.heure || a.time || a.rdv_heure || null);

  const formatDate = (a) => {
    const dateString = resolveDateValue(a);
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    if (!isNaN(d)) return d.toLocaleDateString('fr-FR');
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return new Date(dateString + 'T00:00:00').toLocaleDateString('fr-FR');
    return 'Date invalide';
  };

  const formatTime = (a) => {
    const timeVal = resolveTimeValue(a);
    if (timeVal) {
      const m = timeVal.match(/^(\d{2}:\d{2})(:\d{2})?$/);
      if (m) return m[1];
      const d = new Date(timeVal);
      if (!isNaN(d)) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      return timeVal;
    }
    const dateString = resolveDateValue(a);
    if (dateString) {
      const d = new Date(dateString);
      if (!isNaN(d)) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    return 'N/A';
  };

  const getStatusColor = (status) => {
    switch ((status || '').toString()) {
      case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
      case 'APPROUVEE': return 'bg-green-100 text-green-800';
      case 'REJETEE': return 'bg-red-100 text-red-800';
      case 'ANNULEE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // stats
  const [animated, setAnimated] = useState({ total: 0, enAttente: 0, approuvee: 0, rejetee: 0, annulee: 0 });
  useEffect(() => {
    const total = appointments.length;
    const enAttente = appointments.filter(a => a.statut === 'EN_ATTENTE').length;
    const approuvee = appointments.filter(a => a.statut === 'APPROUVEE').length;
    const rejetee = appointments.filter(a => a.statut === 'REJETEE').length;
    const annulee = appointments.filter(a => a.statut === 'ANNULEE').length;
    // animate
    const steps = 20; let step = 0;
    const start = { total: 0, enAttente: 0, approuvee: 0, rejetee: 0, annulee: 0 };
    const diff = { total, enAttente, approuvee, rejetee, annulee };
    const iv = setInterval(() => {
      step++;
      const f = step / steps;
      setAnimated({
        total: Math.round(start.total + diff.total * f),
        enAttente: Math.round(start.enAttente + diff.enAttente * f),
        approuvee: Math.round(start.approuvee + diff.approuvee * f),
        rejetee: Math.round(start.rejetee + diff.rejetee * f),
        annulee: Math.round(start.annulee + diff.annulee * f),
      });
      if (step >= steps) clearInterval(iv);
    }, 15);
    return () => clearInterval(iv);
  }, [appointments]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64"><div className="text-lg text-gray-600">Chargement des rendez-vous...</div></div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Erreur lors du chargement des rendez-vous: {error.message}</div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord Visiteur</h1>
          <p className="text-sm text-gray-500">Bienvenue — gérez vos rendez-vous ci-dessous</p>
        </div>
        <div />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-md">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total RDV</div>
            <div className="text-2xl font-bold text-gray-800">{animated.total}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-50 rounded-md">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">En attente</div>
            <div className="text-2xl font-bold text-gray-800">{animated.enAttente}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-md">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Approuvés</div>
            <div className="text-2xl font-bold text-gray-800">{animated.approuvee}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-md">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Rejetés/Annulés</div>
            <div className="text-2xl font-bold text-gray-800">{animated.rejetee + animated.annulee}</div>
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-600">Aucun rendez-vous trouvé.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <table className="w-full text-sm border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Heure</th>
                <th className="border px-4 py-2 text-left">Motif</th>
                <th className="border px-4 py-2 text-left">Personne</th>
                <th className="border px-4 py-2 text-left">Département</th>
                <th className="border px-4 py-2 text-left">Statut</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{formatDate(a)}</td>
                  <td className="border px-4 py-2">{formatTime(a)}</td>
                  <td className="border px-4 py-2">{getField(a, ['motif', 'Motif', 'objet', 'reason']) || '—'}</td>
                  <td className="border px-4 py-2">{getField(a, ['personneARencontrer', 'personne_a_rencontrer', 'personneArencontrer']) || '—'}</td>
                  <td className="border px-4 py-2">{getField(a, ['departement', 'departementName', 'department']) || '—'}</td>
                  <td className="border px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(a.statut)}`}>
                      {a.statut}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(a.id)}
                      disabled={deleteMutation.isLoading}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-1 px-3 rounded text-sm transition duration-200"
                    >
                      {deleteMutation.isLoading ? 'Suppression...' : 'Supprimer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/visitor/appointments/new" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">Prendre un nouveau rendez-vous</Link>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

