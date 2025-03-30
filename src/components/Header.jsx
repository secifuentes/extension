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

          {/* Menú de navegación justo al lado del logo */}
          <nav className="flex gap-8 text-base font-medium ml-6">
            <Link to="/cursos" className="hover:text-mostaza transition duration-200 px-3 py-2">Cursos</Link>
            <Link to="/colegio" className="hover:text-mostaza transition duration-200 px-3 py-2">Colegio</Link>
            <Link to="/comunidad" className="hover:text-mostaza transition duration-200 px-3 py-2">Comunidad</Link>
          </nav>
        </div>

        {/* Botón de Estado de Inscripción con fondo azul institucional */}
        <div className="flex gap-4 mr-16">
          <Link to="/estado" className="bg-institucional text-white px-4 py-2 rounded-full hover:bg-presentacionDark transition duration-200">
            Estado de Inscripción
          </Link>
        </div>

        {/* Botón de menú hamburguesa para dispositivos móviles */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-3xl bg-institucional text-white p-2 rounded-full">
            {menuAbierto ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Menú de pantalla completa */}
      {menuAbierto && (
        <div className="fixed inset-0 bg-white text-institucional flex justify-center items-center z-50">
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