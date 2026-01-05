import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import secretaireService from '../../services/secretaireService';
import { exportToExcel, exportToPDF } from '../../services/exportService';

export default function ReportAppointments() {
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const { data: reports = [], isLoading, isError, error } = useQuery({
    queryKey: ['secretary', 'reports', 'appointments', { status, dateFrom, dateTo }],
    queryFn: () => secretaireService.getReports({ type: 'appointments', status, dateFrom, dateTo }),
    enabled: !!status || !!dateFrom || !!dateTo,
  });

  const exportColumns = [
    { key: 'visitorName', label: 'Visiteur' },
    { key: 'appointmentDate', label: 'Date RDV' },
    { key: 'status', label: 'Statut' },
    { key: 'motif', label: 'Motif' },
  ];

  const handleExportExcel = () => {
    exportToExcel(reports, exportColumns, `rapports-rendez-vous-${new Date().toISOString().split('T')[0]}`);
  };

  const handleExportPDF = () => {
    exportToPDF(
      reports,
      exportColumns,
      `rapports-rendez-vous-${new Date().toISOString().split('T')[0]}`,
      'Rapport des rendez-vous'
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link to="/secretary/reports" className="text-indigo-600 hover:underline">← Retour aux rapports</Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Statistiques rendez-vous</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Filtrer par statut et période</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Tous les statuts</option>
            <option value="Pending">En attente</option>
            <option value="Approved">Approuvés</option>
            <option value="Rejected">Rejetés</option>
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            placeholder="Date de début"
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            placeholder="Date de fin"
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="flex gap-2">
            <button
              onClick={handleExportExcel}
              disabled={reports.length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Exporter Excel
            </button>
            <button
              onClick={handleExportPDF}
              disabled={reports.length === 0}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Exporter PDF
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading && <p className="p-6 text-center text-gray-600">Chargement des données...</p>}
        {isError && <p className="p-6 text-center text-red-600">Erreur : {error?.message}</p>}
        {!isLoading && !isError && reports.length === 0 && (
          <p className="p-6 text-center text-gray-600">Aucun rendez-vous pour cette période.</p>
        )}

        {reports.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visiteur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date RDV</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motif</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4">{report.visitorName}</td>
                  <td className="px-6 py-4">{report.appointmentDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${
                      report.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{report.motif || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
