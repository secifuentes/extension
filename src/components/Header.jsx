import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50">
      <div className="flex justify-between items-center px-8 py-2 sm:px-10 md:px-12"> {/* Aumentamos el padding para mover los elementos hacia adentro */}
        {/* Menú de navegación a la izquierda */}
        <nav className="flex gap-10 text-sm font-medium"> {/* Ajusté el gap para mayor distancia entre los elementos */}
          <Link to="/" className="hover:text-yellow-400 transition duration-200">Inicio</Link>
          <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition duration-200">Presentación</a>
          <Link to="/cursos" className="hover:text-yellow-400 transition duration-200">Cursos</Link>
        </nav>

        {/* Logo a la izquierda, con más espacio desde el borde */}
        <div className="font-extrabold text-lg tracking-wide ml-4"> {/* ml-4 añade margen izquierdo para separarlo del borde */}
          <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" />
        </div>

        {/* Botón de Estado de Inscripción a la derecha, con más espacio desde el borde */}
        <div className="flex gap-4 mr-4"> {/* mr-4 añade margen derecho para separarlo del borde */}
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