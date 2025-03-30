import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow z-50">
      <div className="flex justify-between items-center px-4 py-2 sm:px-6 md:px-8"> {/* Ajusté el padding vertical de 4 a 2 */}
        {/* Logo */}
        <div className="font-extrabold text-lg tracking-wide">
          <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" /> {/* Ajusté el tamaño del logo a h-8 */}
        </div>

        {/* Botón hamburguesa para móviles */}
        <button
          className="sm:hidden flex items-center justify-center w-10 h-10"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <svg
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuAbierto ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú en escritorio */}
        <nav className="hidden sm:flex gap-4 text-sm font-medium"> {/* Ajusté el gap de 6 a 4 */}
          <Link to="/" className="hover:text-yellow-400 transition">Inicio</Link>
          <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition">Presentación</a>
          <Link to="/estado" className="hover:text-yellow-400 transition">Estado de Inscripción</Link>
        </nav>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-6 pb-4">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link to="/" onClick={handleLinkClick} className="hover:text-yellow-400 transition">Inicio</Link>
            <a href="https://lapresentaciongirardota.edu.co/index.php" onClick={handleLinkClick} className="hover:text-yellow-400 transition">Presentación</a>
            <Link to="/estado-inscripcion" onClick={handleLinkClick} className="hover:text-yellow-400 transition">Estado de Inscripción</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;