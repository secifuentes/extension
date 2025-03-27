import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow z-50">
      <div className="w-full flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-4">
        {/* Logo / Nombre */}
        <h1 className="font-extrabold text-lg tracking-wide">
          EXTENSIÓN LA PRESENTACIÓN
        </h1>

        {/* Botón hamburguesa para móviles */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            {menuAbierto ? (
              <path
                fillRule="evenodd"
                d="M18.36 6.64a1 1 0 00-1.41 0L12 11.59 7.05 6.64a1 1 0 10-1.41 1.41L10.59 13l-4.95 4.95a1 1 0 101.41 1.41L12 14.41l4.95 4.95a1 1 0 001.41-1.41L13.41 13l4.95-4.95a1 1 0 000-1.41z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menú en escritorio */}
        <nav className="hidden sm:flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-yellow-400 transition">Inicio</a>
          <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition">Presentación</a>
          <a href="/contacto" className="hover:text-yellow-400 transition">Contacto</a>
          <a href="/estado" className="hover:text-yellow-400 transition">Consulta tu estado</a>
        </nav>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-6 pb-4">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <a href="/" className="hover:text-yellow-400 transition">Inicio</a>
            <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition">Presentación</a>
            <a href="/contacto" className="hover:text-yellow-400 transition">Contacto</a>
            <a href="/estado" className="hover:text-yellow-400 transition">Consulta tu estado</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;