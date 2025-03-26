import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import InscripcionesTable from '../components/admin/InscripcionesTable';

const AdminInscripciones = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">
          <InscripcionesTable />
        </main>
      </div>
    </div>
  );
};

export default AdminInscripciones;