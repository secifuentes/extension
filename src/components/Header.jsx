import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50">
      {/* Menú */}
      <div className="flex justify-between items-center px-4 py-1 sm:px-6 md:px-8">
        {/* Contenedor para logo y menú, alineados a la izquierda */}
        <div className="flex items-center">
          <div className="font-extrabold text-lg tracking-wide ml-20">
            <Link to="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-8" />
            </Link>
          </div>

          {/* Menú de navegación justo al lado del logo (versión escritorio) */}
          <nav className="flex gap-3 text-sm font-medium ml-6 hidden sm:flex">
            <Link to="/cursos" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Cursos</Link>
            <Link to="/colegio" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Colegio</Link>
            <Link to="/comunidad" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Comunidad</Link>
          </nav>
        </div>

        {/* Botón de Estado de Inscripción + botón menú móvil */}
        <div className="flex gap-4 items-center mr-20">
          <Link to="/estado" className="hidden sm:block bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-presentacionDark transition duration-200 text-base">
            Estado de Inscripción
          </Link>

          {/* Botón hamburguesa solo móvil */}
          <button
            className="sm:hidden focus:outline-none"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            {menuAbierto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-4 pb-4">
          <nav className="flex flex-col gap-2 text-sm font-medium pt-2">
            <Link to="/cursos" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1.5">Cursos</Link>
            <Link to="/colegio" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1.5">Colegio</Link>
            <Link to="/comunidad" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1.5">Comunidad</Link>
            <Link to="/estado" onClick={handleLinkClick} className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-presentacionDark transition duration-200">
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;