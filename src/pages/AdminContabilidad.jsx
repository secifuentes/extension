import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import ContabilidadResumen from '../components/admin/ContabilidadResumen';

const AdminContabilidad = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">
          <ContabilidadResumen />
        </main>
      </div>
    </div>
  );
};

export default AdminContabilidad;