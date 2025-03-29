import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] text-gray-800 pt-10 pb-6 mt-12">
      {/* Parte superior: 3 columnas */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Columna 1: Contacto */}
        <div>
          <h4 className="font-bold mb-3">Contáctanos</h4>
          <p>Instituto Parroquial Nuestra Señora de la Presentación</p>
          <p>Dirección: Calle 7 No. 18 - 92. Girardota, Antioquia</p>
          <p>Girardota, Antioquia</p>
          <p>Teléfonos: 604 424 41 00 - 604 424 41 01 - 604 424 41 02</p>
        </div>

        {/* Columna 2: Enlaces */}
        <div>
          <h4 className="font-bold mb-3">Enlaces</h4>
          <ul className="space-y-1">
            <li><a href="#">Portal institucional</a></li>
            <li><a href="#">Plataforma Académica</a></li>
            <li><a href="#">Noticias</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Contácto</a></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales + Logo */}
        <div className="text-left">
          <h4 className="font-bold mb-3">Nuestras redes</h4>
          <div className="flex space-x-4 text-2xl mb-4">
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
        <p className="text-institucional text-2xl font-bold tracking-wide">
          Crear, Sentir y Transformar
        </p>
      </div>
    </footer>
  );
};

export default Footer;