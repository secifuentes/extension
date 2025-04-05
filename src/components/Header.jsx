import React, { useState } from 'react';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50 h-[56px]">
      {/* Contenido del header */}
      <div className="flex justify-between items-center h-full px-4 sm:px-6 md:px-8">
        {/* Logo y navegación */}
        <div className="flex items-center h-full">
          <div className="ml-4 sm:ml-10 md:ml-20">
            <a href="/">
              <img src="/logo.svg" alt="Extensión La Presentación" className="h-6" />
            </a>
          </div>

          <nav className="ml-6 hidden sm:flex gap-1 text-sm font-medium">
            <a href="/#cursos" className="hover:text-yellow-400 px-2 py-1">Cursos</a>
            <a href="https://lapresentaciongirardota.edu.co" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 px-2 py-1">Colegio</a>
            <a href="/#faq" className="hover:text-yellow-400 px-2 py-1">Preguntas</a>
            <a href="https://instagram.com/presentaciongirardota" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 px-2 py-1">Comunidad</a>
          </nav>
        </div>

        {/* Botón estado + hamburguesa */}
        <div className="flex gap-4 items-center mr-4 sm:mr-10 md:mr-20">
          <a
            href="/estado"
            target="_blank"
            className="hidden sm:block text-sm bg-yellow-500 text-white px-4 py-1 rounded hover:bg-white hover:text-blue-700 border border-transparent hover:border-blue-700 transition"
          >
            Estado de Inscripción
          </a>

          <button
            className="sm:hidden focus:outline-none"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            {menuAbierto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <a href="/#cursos" onClick={handleLinkClick} className="hover:text-yellow-400 py-1">Cursos</a>
            <a href="https://lapresentaciongirardota.edu.co" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className="hover:text-yellow-400 py-1">Colegio</a>
            <a href="/#faq" onClick={handleLinkClick} className="hover:text-yellow-400 py-1">Preguntas</a>
            <a href="https://instagram.com/presentaciongirardota" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className="hover:text-yellow-400 py-1">Comunidad</a>
            <a href="/estado" target="_blank" onClick={handleLinkClick} className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-presentacionDark transition">
              Estado de Inscripción
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;