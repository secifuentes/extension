import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaCertificate,
  FaCalculator,
  FaSignOutAlt,
} from 'react-icons/fa';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { path: '/admin/estudiantes', label: 'Estudiantes', icon: <FaUserGraduate /> },
  { path: '/admin/cursos', label: 'Cursos', icon: <FaBook /> },
  { path: '/admin/inscripciones', label: 'Inscripciones', icon: <FaClipboardList /> },
  { path: '/admin/certificados', label: 'Certificados', icon: <FaCertificate /> },
  { path: '/admin/contabilidad', label: 'Contabilidad', icon: <FaCalculator /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    alert('Cerrar sesión');
  };

  return (
    <>
      {/* 🖥️ Versión Escritorio */}
      <aside
        className={`bg-[#21145F] text-white shadow-md transition-all duration-300 ease-in-out
        ${expanded ? 'w-64' : 'w-16'} hidden md:flex flex-col h-screen relative`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-white/10">
          <span className="text-xl font-bold text-yellow-300 tracking-widest">
            {expanded ? 'EXTENSIÓN' : 'EX'}
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 px-2 pt-4 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={!expanded ? item.label : ''}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                  ${isActive ? 'bg-yellow-300 text-[#21145F] font-semibold' : 'hover:bg-yellow-400 hover:text-[#21145F]'}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {expanded && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full border-t border-white/10 px-3 py-4">
          <button
            onClick={handleLogout}
            title={!expanded ? 'Cerrar sesión' : ''}
            className="flex items-center gap-3 text-sm hover:text-yellow-400 transition"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            {expanded && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* 📱 Versión Móvil */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#21145F] text-white flex justify-around py-2 z-50 border-t border-white/10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              className={`text-xl px-2 ${
                isActive ? 'text-yellow-300' : 'hover:text-yellow-400'
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
        <button onClick={handleLogout} title="Cerrar sesión" className="text-xl px-2 hover:text-yellow-400">
          <FaSignOutAlt />
        </button>
      </nav>
    </>
  );
};

export default Sidebar;