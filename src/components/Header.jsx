import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50">
      <div className="flex justify-between items-center px-12 py-2 sm:px-14 md:px-16">
        {/* Contenedor para logo y menú, alineados a la izquierda */}
        <div className="flex items-center">
          {/* Logo a la izquierda con margen */}
          <div className="font-extrabold text-lg tracking-wide ml-16">
            <Link to="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" />
            </Link>
          </div>

          {/* Menú de navegación justo al lado del logo */}
          <nav className="flex gap-8 text-base font-medium ml-6">
            <Link to="/cursos" className="hover:text-yellow-400 transition duration-200 px-3 py-2">Cursos</Link>
            <Link to="/colegio" className="hover:text-yellow-400 transition duration-200 px-3 py-2">Colegio</Link>
            <Link to="/comunidad" className="hover:text-yellow-400 transition duration-200 px-3 py-2">Comunidad</Link> {/* Cambié "Admisiones" por "Comunidad" */}
          </nav>
        </div>

        {/* Botón de Estado de Inscripción con fondo mostaza */}
        <div className="flex gap-4 mr-16">
          <Link to="/estado" className="bg-[#FFB800] text-white px-4 py-2 rounded-full hover:bg-[#003C99] transition duration-200">
            Estado de Inscripción
          </Link>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-6 pb-4">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link to="/cursos" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200">Cursos</Link>
            <Link to="/colegio" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200">Colegio</Link>
            <Link to="/comunidad" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200">Comunidad</Link> {/* Cambié "Admisiones" por "Comunidad" */}
            <Link to="/estado" onClick={handleLinkClick} className="bg-[#FFB800] text-white px-4 py-2 rounded-full hover:bg-[#003C99] transition duration-200">
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;