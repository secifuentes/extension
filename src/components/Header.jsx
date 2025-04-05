import React, { useState } from 'react';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50 h-[64px]">
      {/* Menú */}
      <div className="flex justify-between items-center px-4 py-0 sm:px-6 md:px-8 h-full">
        {/* Logo + navegación escritorio */}
        <div className="flex items-center h-full">
          <div className="font-extrabold text-lg tracking-wide ml-4 sm:ml-10 md:ml-20">
            <a href="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-8" />
            </a>
          </div>

          <nav className="flex gap-1 text-sm font-medium ml-6 hidden sm:flex">
            <a href="/#cursos" className="hover:text-yellow-400 transition duration-200 px-3 py-1 text-base">Cursos</a>
            <a href="https://lapresentaciongirardota.edu.co" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition duration-200 px-3 py-1 text-base">Colegio</a>
            <a href="/#faq" className="hover:text-yellow-400 transition duration-200 px-3 py-1 text-base">Preguntas</a>
            <a href="https://instagram.com/presentaciongirardota" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition duration-200 px-3 py-1 text-base">Comunidad</a>
          </nav>
        </div>

        {/* Botón estado + menú móvil */}
        <div className="flex gap-4 items-center mr-4 sm:mr-10 md:mr-20">
          <a
            href="/estado"
            target="_blank"
            className="hidden sm:block bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-white hover:text-blue-700 transition duration-200 text-base border border-transparent hover:border-blue-700"
          >
            Estado de Inscripción
          </a>

          <button
            className="sm:hidden focus:outline-none"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            {menuAbierto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="sm:hidden bg-institucional border-t border-white px-4 pb-4">
          <nav className="flex flex-col gap-2 text-sm font-medium pt-2">
            <a href="/#cursos" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1">Cursos</a>
            <a href="https://lapresentaciongirardota.edu.co" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1">Colegio</a>
            <a href="/#faq" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1">Preguntas</a>
            <a href="https://instagram.com/presentaciongirardota" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className="hover:text-yellow-400 transition duration-200 py-1">Comunidad</a>
            <a href="/estado" target="_blank" onClick={handleLinkClick} className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-presentacionDark transition duration-200">
              Estado de Inscripción
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;