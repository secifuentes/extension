import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from 'react-icons/fa6'; // Usa FaTiktok de react-icons/fa6

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10 pb-6 mt-0">
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm items-start">
        
        {/* Columna 1: Contacto */}
        <div className="text-sm leading-relaxed">
          <h4 className="font-bold mb-3 text-lg text-institucional">Contáctanos</h4>
          <p className="font-semibold">Instituto Parroquial Nuestra Señora de la Presentación</p>
          <p>Dirección: Calle 7 No. 18 - 92</p>
          <p>Girardota, Antioquia</p>
          <p className="mt-2">
            Teléfonos:<br />
            604 424 41 00<br />
            604 424 41 01<br />
            604 424 41 02
          </p>
        </div>

        {/* Columna 2: Enlaces */}
        <div>
          <h4 className="font-bold mb-3 text-lg text-institucional">Enlaces</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Portal institucional</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Plataforma Académica</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Noticias</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Eventos</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales y logo */}
        <div className="flex flex-col items-center text-center justify-between h-full">
          {/* Redes sociales */}
          <div>
            <h4 className="font-bold mb-2 text-lg text-institucional">Redes sociales</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://instagram.com/presentaciongirardota" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-yellow-500 text-xl">
                <FaInstagram />
              </a>
              <a href="https://www.tiktok.com/@presentaciongirardota" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-600 hover:text-yellow-500 text-xl">
                <FaTiktok />
              </a>
              <a href="https://www.facebook.com/presentaciondegirardota" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-yellow-500 text-xl">
                <FaFacebookF />
              </a>
              <a href="https://www.youtube.com/@Presentaciongirardota" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-600 hover:text-yellow-500 text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Logo centrado abajo */}
          <div className="flex-grow flex items-end">
            <img src="/lfooter.svg" alt="Logo Colegio" className="w-40 sm:w-48 mx-auto" />
          </div>
        </div>
      </div>

      {/* Frase institucional */}
      <div className="mt-10 text-center">
        <p className="text-institucional text-2xl font-bold tracking-wide">
          Crear, Sentir y Transformar
        </p>
      </div>
    </footer>
  );
};

export default Footer;