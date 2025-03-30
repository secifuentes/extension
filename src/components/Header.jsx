import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50"> {/* Fondo azul institucional */}
      <div className="flex justify-between items-center px-6 py-4 sm:px-8 md:px-10">
        {/* Logo a la izquierda */}
        <div className="font-extrabold text-lg tracking-wide">
          <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" />
        </div>

        {/* Menú de navegación a la izquierda (junto al logo) */}
        <nav className="flex gap-8 text-sm font-medium"> 
          <Link to="/" className="hover:text-yellow-400 transition duration-200">Inicio</Link>
          <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition duration-200">Presentación</a>
          <Link to="/cursos" className="hover:text-yellow-400 transition duration-200">Cursos</Link>
        </nav>

        {/* Barra de búsqueda centrada */}
        <div className="flex items-center flex-grow mx-6">
          <input
            type="text"
            className="w-full px-4 py-2 bg-[#333333] text-white border border-gray-700 rounded-full"
            placeholder="Buscar cursos..."
          />
        </div>

        {/* Botón de Estado de Inscripción a la derecha */}
        <div className="flex gap-4">
          <Link to="/estado" className="bg-[#ff6f61] text-white px-4 py-2 rounded-full hover:bg-[#ff3b2b] transition duration-200">
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
            <Link to="/estado" onClick={handleLinkClick} className="bg-[#ff6f61] text-white px-4 py-2 rounded-full hover:bg-[#ff3b2b] transition duration-200">
              Estado de Inscripción
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;