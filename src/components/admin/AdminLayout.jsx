import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:ml-20 xl:ml-64 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;