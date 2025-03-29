import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import StatsCards from '../components/admin/StatsCards';
import ChartBox from '../components/admin/ChartBox';
import ChartResumen from '../components/admin/ChartResumen';
import InscripcionesTable from '../components/admin/InscripcionesTable';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 space-y-6 overflow-y-auto">
          <h1 className="text-2xl font-bold text-institucional">Panel de Administración</h1>
          <StatsCards />
          <ChartBox />
          <ChartResumen />
          <InscripcionesTable />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;