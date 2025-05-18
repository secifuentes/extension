// src/components/panel/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiUser, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const enlaces = [
    { to: '/docente', label: 'Inicio', icon: <FiHome /> },
    { to: '/docente/estudiantes/curso123', label: 'Estudiantes', icon: <FiUsers /> },
    { to: '/docente/perfil', label: 'Perfil', icon: <FiUser /> },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-md min-h-screen hidden md:block">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-institucional">Docente</h2>
        <p className="text-sm text-gray-500">Extensión Presentación</p>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.to}
            to={enlace.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-100 transition font-medium ${
                isActive ? 'bg-institucional text-white' : 'text-gray-700'
              }`
            }
          >
            <span className="text-lg">{enlace.icon}</span>
            <span>{enlace.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4">
        <button
          onClick={() => window.location.href = '/login'}
          className="flex items-center space-x-3 w-full text-left text-gray-600 hover:text-red-600 transition"
        >
          <FiLogOut />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;