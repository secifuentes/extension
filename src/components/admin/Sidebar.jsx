import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#21145F] text-white flex flex-col p-6 space-y-6 shadow-md">
      <div className="text-2xl font-bold tracking-wide">EXTENSIÓN</div>

      <nav className="flex flex-col gap-4 text-sm">
        <Link to="/admin" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/estudiantes" className="hover:text-yellow-300">Estudiantes</Link>
        <Link to="/admin/cursos" className="...">Cursos</Link>
        <Link to="/admin/inscripciones" className="hover:text-yellow-300">Inscripciones</Link>
        <Link to="/admin/certificados" className="hover:text-yellow-300">Certificados</Link>
        <Link to="/admin/contabilidad" className="hover:text-yellow-300">Contabilidad</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;