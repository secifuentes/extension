import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow z-50">
      <div className="w-full flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-4">
        
        {/* Nombre / logo */}
        <h1 className="font-extrabold text-lg tracking-wide">
          EXTENSIÓN LA PRESENTACIÓN
        </h1>

        {/* Menú */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">Inicio</Link>
          <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition">Presentación</a>
          <Link to="/contacto" className="hover:text-yellow-400 transition">Contacto</Link>
          <Link to="/estado" className="hover:text-yellow-400 transition">Consulta tu estado</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;