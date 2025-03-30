import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50">
      <div className="flex justify-between items-center px-8 py-2 sm:px-10 md:px-12">
        {/* Logo a la izquierda */}
        <div className="font-extrabold text-lg tracking-wide">
          <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" />
        </div>

        {/* Menú de navegación justo al lado del logo */}
        <nav className="flex gap-6 text-sm font-medium ml-4"> {/* ml-4 añade separación entre logo y las opciones */}
          <Link to="/" className="hover:text-yellow-400 transition duration-200">Inicio</Link>
          <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition duration-200">Presentación</a>
          <Link to="/cursos" className="hover:text-yellow-400 transition duration-200">Cursos</Link>
        </nav>

        {/* Botón de Estado de Inscripción a la derecha */}
        <div className="flex gap-4 mr-8"> {/* Espaciado desde el borde derecho */}
          <Link to="/estado" className="bg-[#0052CC] text-white px-4 py-2 rounded-full hover:bg-[#003C99] transition duration-200">
            Estado de Inscripción
          </Link>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-6 pb-4">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link to="/" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200">Inicio</Link>
            <a href="https://lapresentaciongirardota.edu.co/index.php" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200">Presentación</a>
            <Link to="/cursos" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200">Cursos</Link>
            <Link to="/estado" onClick={handleLinkClick} className="bg-[#0052CC] text-white px-4 py-2 rounded-full hover:bg-[#003C99] transition duration-200">
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;