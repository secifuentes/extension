import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-white text-institucional shadow-md z-50">
      <div className="flex justify-between items-center px-4 py-2 sm:px-6 md:px-8">
        {/* Contenedor para logo y menú, alineados a la izquierda */}
        <div className="flex items-center">
          <div className="font-extrabold text-lg tracking-wide ml-6">
            <Link to="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" />
            </Link>
          </div>

          {/* Menú de navegación justo al lado del logo */}
          <nav className="flex gap-2 text-base font-medium ml-6">
            <Link to="/cursos" className="hover:text-yellow-400 transition duration-200 px-2 py-0.5">Cursos</Link> {/* Reducción del padding */}
            <Link to="/colegio" className="hover:text-yellow-400 transition duration-200 px-2 py-0.5">Colegio</Link> {/* Reducción del padding */}
            <Link to="/comunidad" className="hover:text-yellow-400 transition duration-200 px-2 py-0.5">Comunidad</Link> {/* Reducción del padding */}
          </nav>
        </div>

        {/* Botón de Estado de Inscripción con fondo azul institucional */}
        <div className="flex gap-4 mr-6">
          <Link to="/estado" className="bg-institucional text-white px-4 py-2 rounded-full hover:bg-presentacionDark transition duration-200">
            Estado de Inscripción
          </Link>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-white border-t border-institucional px-4 pb-4">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <Link to="/cursos" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-0.5">Cursos</Link> {/* Reducción del padding */}
            <Link to="/colegio" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-0.5">Colegio</Link> {/* Reducción del padding */}
            <Link to="/comunidad" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-0.5">Comunidad</Link> {/* Reducción del padding */}
            <Link to="/estado" onClick={handleLinkClick} className="bg-institucional text-white px-4 py-2 rounded-full hover:bg-presentacionDark transition duration-200">
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;