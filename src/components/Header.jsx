import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50">
      <div className="flex justify-between items-center px-4 py-2 sm:px-6 md:px-8">
        {/* Logo y menú desktop */}
        <div className="flex items-center">
          <div className="font-extrabold text-lg tracking-wide">
            <Link to="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-8" />
            </Link>
          </div>

          {/* Menú navegación (solo visible en escritorio) */}
          <nav className="hidden sm:flex gap-3 text-sm font-medium ml-6">
            <Link to="/cursos" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Cursos</Link>
            <Link to="/colegio" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Colegio</Link>
            <Link to="/comunidad" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Comunidad</Link>
          </nav>
        </div>

        {/* Botón de Estado + Hamburguesa */}
        <div className="flex items-center gap-4">
          <Link to="/estado" className="hidden sm:block bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-presentacionDark transition duration-200 text-base">
            Estado de Inscripción
          </Link>

          {/* Botón hamburguesa solo móvil */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-6 pb-4">
          <nav className="flex flex-col gap-2 text-base font-medium pt-2">
            <Link to="/cursos" onClick={handleLinkClick} className="hover:text-yellow-400 transition py-1.5">Cursos</Link>
            <Link to="/colegio" onClick={handleLinkClick} className="hover:text-yellow-400 transition py-1.5">Colegio</Link>
            <Link to="/comunidad" onClick={handleLinkClick} className="hover:text-yellow-400 transition py-1.5">Comunidad</Link>
            <Link to="/estado" onClick={handleLinkClick} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-presentacionDark transition">
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;