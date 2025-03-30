import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);  // Alterna el estado del menú
  };

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-white text-institucional shadow-md z-50">
      <div className="flex justify-between items-center px-12 py-2 sm:px-14 md:px-16">
        {/* Contenedor para logo y menú, alineados a la izquierda */}
        <div className="flex items-center">
          <div className="font-extrabold text-lg tracking-wide ml-16">
            <Link to="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" />
            </Link>
          </div>
        </div>

        {/* Botón de Estado de Inscripción con fondo azul institucional */}
        <div className="flex gap-4 mr-16">
          <Link to="/estado" className="bg-institucional text-white px-4 py-2 rounded-full hover:bg-presentacionDark transition duration-200">
            Estado de Inscripción
          </Link>
        </div>

        {/* Botón de Menú con fondo rosado, al lado derecho */}
        <div className="flex items-center sm:hidden">
          <button 
            onClick={toggleMenu} 
            className="bg-[#FF007F] text-white px-4 py-2 rounded-md hover:bg-[#FF2A8F] transition duration-200"
          >
            Menú
          </button>
        </div>
      </div>

      {/* Menú de pantalla completa (se activa cuando el menú está abierto) */}
      {menuAbierto && (
        <div className="fixed inset-0 bg-white text-institucional z-50 flex justify-center items-center">
          <div className="flex flex-col items-center space-y-6">
            <Link to="/cursos" onClick={handleLinkClick} className="text-2xl hover:text-mostaza transition duration-200">Cursos</Link>
            <Link to="/colegio" onClick={handleLinkClick} className="text-2xl hover:text-mostaza transition duration-200">Colegio</Link>
            <Link to="/comunidad" onClick={handleLinkClick} className="text-2xl hover:text-mostaza transition duration-200">Comunidad</Link>
            <Link to="/estado" onClick={handleLinkClick} className="bg-institucional text-white px-4 py-2 rounded-full hover:bg-presentacionDark transition duration-200">
              Estado de Inscripción
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;