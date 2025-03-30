import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] text-gray-800 pt-10 pb-6 mt-12">
      {/* Línea delgada con frase institucional antes del menú */}
      <div className="w-full bg-institucional py-2">
        <div className="text-center">
          <p className="text-white text-xl font-semibold sm:text-2xl md:text-3xl">
            Crear, Sentir y Transformar
          </p>
        </div>
      </div>

      {/* Parte superior: 3 columnas */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Columna 1: Contacto */}
        <div>
          <h4 className="font-bold mb-3 text-lg">Contáctanos</h4>
          <p>Instituto Parroquial Nuestra Señora de la Presentación</p>
          <p>Dirección: Calle 7 No. 18 - 92. Girardota, Antioquia</p>
          <p>Girardota, Antioquia</p>
          <p>Teléfonos: 604 424 41 00 - 604 424 41 01 - 604 424 41 02</p>
        </div>

        {/* Columna 2: Enlaces */}
        <div>
          <h4 className="font-bold mb-3 text-lg">Enlaces</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-institucional transition duration-200">Portal institucional</a></li>
            <li><a href="#" className="hover:text-institucional transition duration-200">Plataforma Académica</a></li>
            <li><a href="#" className="hover:text-institucional transition duration-200">Noticias</a></li>
            <li><a href="#" className="hover:text-institucional transition duration-200">Eventos</a></li>
            <li><a href="#" className="hover:text-institucional transition duration-200">Contácto</a></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales + Logo */}
        <div className="text-left">
          <h4 className="font-bold mb-3 text-lg">Nuestras redes</h4>
          <div className="flex space-x-6 text-3xl mb-4">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="TikTok">🎵</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
          <img src="/logo.png" alt="Logo Colegio" className="w-48 mt-2" />
        </div>
      </div>

      {/* Frase institucional al fondo */}
      <div className="mt-10 text-center">
        <p className="text-institucional text-2xl font-bold tracking-wide sm:text-3xl md:text-4xl">
          Crear, Sentir y Transformar
        </p>
      </div>
    </footer>
  );
};

export default Footer;