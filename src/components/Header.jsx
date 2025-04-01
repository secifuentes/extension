import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Íconos de hamburguesa y cerrar

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50">
      <div className="flex justify-between items-center px-4 py-2 sm:px-6 md:px-8">

        {/* Logo y navegación en desktop */}
        <div className="flex items-center gap-4">
          <Link to="/" className="font-extrabold text-lg tracking-wide">
            <img src="/logo.svg" alt="Extensión La Presentación" className="h-9" />
          </Link>

          <nav className="hidden sm:flex gap-4 text-sm font-medium ml-4">
            <Link to="/cursos" className="hover:text-mostaza transition">Cursos</Link>
            <Link to="/colegio" className="hover:text-mostaza transition">Colegio</Link>
            <Link to="/comunidad" className="hover:text-mostaza transition">Comunidad</Link>
          </nav>
        </div>

        {/* Botón Estado + hamburguesa */}
        <div className="flex items-center gap-4">
          <Link
            to="/estado"
            className="hidden sm:inline-block bg-mostaza text-institucional px-4 py-1.5 rounded-md hover:bg-yellow-400 transition text-sm font-semibold"
          >
            Estado de Inscripción
          </Link>

          {/* Ícono de menú hamburguesa solo en móvil */}
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="sm:hidden text-white text-2xl focus:outline-none">
            {menuAbierto ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link to="/cursos" onClick={handleLinkClick} className="hover:text-mostaza transition">Cursos</Link>
            <Link to="/colegio" onClick={handleLinkClick} className="hover:text-mostaza transition">Colegio</Link>
            <Link to="/comunidad" onClick={handleLinkClick} className="hover:text-mostaza transition">Comunidad</Link>
            <Link
              to="/estado"
              onClick={handleLinkClick}
              className="bg-mostaza text-institucional text-center mt-2 px-4 py-2 rounded-md hover:bg-yellow-400 transition text-sm font-semibold"
            >
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;