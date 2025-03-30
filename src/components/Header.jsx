import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el texto de búsqueda
  const history = useHistory(); // Hook para redirigir a otra página

  // Función que maneja la búsqueda cuando el formulario es enviado
  const handleSearch = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    if (searchTerm.trim()) {
      // Aquí puedes manejar la búsqueda, por ejemplo redirigir a una página de resultados:
      history.push(`/buscar?query=${searchTerm}`); // Redirige a la página de resultados con el parámetro de búsqueda
    }
  };

  const handleLinkClick = () => {
    setMenuAbierto(false); // Cierra el menú cuando se hace clic en un enlace
  };

  return (
    <header className="w-full fixed top-0 bg-institucional text-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4 sm:px-8 md:px-10">
        {/* Logo a la izquierda */}
        <div className="font-extrabold text-lg tracking-wide">
          <img src="/logo.svg" alt="Extensión La Presentación" className="h-10" />
        </div>

        {/* Menú de navegación a la izquierda (junto al logo) */}
        <nav className="flex gap-10 text-sm font-medium"> {/* Ajusté el gap para mayor distancia entre los elementos */}
          <Link to="/" className="hover:text-yellow-400 transition duration-200">Inicio</Link>
          <a href="https://lapresentaciongirardota.edu.co/index.php" className="hover:text-yellow-400 transition duration-200">Presentación</a>
          <Link to="/cursos" className="hover:text-yellow-400 transition duration-200">Cursos</Link>
        </nav>

        {/* Barra de búsqueda centrada */}
        <div className="flex items-center flex-grow mx-6">
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-700 rounded-full" {/* Cambié el fondo a un negro más suave */}
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el texto ingresado
            />
          </form>
        </div>

        {/* Botón de Estado de Inscripción a la derecha */}
        <div className="flex gap-4">
          <Link to="/estado" className="bg-[#0052CC] text-white px-4 py-2 rounded-full hover:bg-[#003C99] transition duration-200"> {/* Cambié el color del botón */}
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