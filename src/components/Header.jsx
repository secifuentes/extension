import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50"> {/* Cambié bg-white por bg-institucional */}
      {/* Menú */}
      <div className="flex justify-between items-center px-4 py-1 sm:px-6 md:px-8">
        {/* Contenedor para logo y menú, alineados a la izquierda */}
        <div className="flex items-center">
          <div className="font-extrabold text-lg tracking-wide ml-20"> {/* Tamaño del logo moderado */}
            <Link to="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-8" /> {/* Logo de tamaño adecuado */}
            </Link>
          </div>

          {/* Menú de navegación justo al lado del logo */}
          <nav className="flex gap-3 text-sm font-medium ml-6"> {/* Gap reducido */}
            <Link to="/cursos" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Cursos</Link> {/* Reducir padding vertical */}
            <Link to="/colegio" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Colegio</Link> {/* Reducir padding vertical */}
            <Link to="/comunidad" className="hover:text-yellow-400 transition duration-200 px-3 py-1.5 text-base">Comunidad</Link> {/* Reducir padding vertical */}
          </nav>
        </div>

        {/* Botón de Estado de Inscripción con un border-radius moderado */}
        <div className="flex gap-4 mr-20">
          <Link to="/estado" className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-presentacionDark transition duration-200 text-base">
            Estado de Inscripción
          </Link>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-4 pb-4"> {/* Cambié bg-white por bg-institucional */}
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link to="/cursos" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1.5">Cursos</Link>
            <Link to="/colegio" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1.5">Colegio</Link>
            <Link to="/comunidad" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1.5">Comunidad</Link>
            <Link to="/estado" onClick={handleLinkClick} className="bg-institucional text-white px-4 py-1 rounded-md hover:bg-presentacionDark transition duration-200 text-base">
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;