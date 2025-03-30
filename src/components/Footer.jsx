import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10 pb-6 mt-12">
      {/* Parte superior: 3 columnas */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
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
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Portal institucional</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Plataforma Académica</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Noticias</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Eventos</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition duration-200">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales + Logo */}
        <div className="text-left">
          <h4 className="font-bold mb-3 text-lg">Nuestras redes</h4>
          {/* Aquí puedes agregar tus iconos manualmente */}
          <div className="flex space-x-6 text-2xl mb-4">
            {/* Ejemplo de cómo poner los iconos manualmente (reemplaza con los íconos que prefieras) */}
            <a href="#" aria-label="Instagram">
              <img src="path/to/your/instagram-icon.svg" alt="Instagram" className="w-8 h-8" />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="path/to/your/facebook-icon.svg" alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="#" aria-label="TikTok">
              <img src="path/to/your/tiktok-icon.svg" alt="TikTok" className="w-8 h-8" />
            </a>
            <a href="#" aria-label="YouTube">
              <img src="path/to/your/youtube-icon.svg" alt="YouTube" className="w-8 h-8" />
            </a>
          </div>
          <img src="/footer.svg" alt="Logo Colegio" className="w-48 mt-2" />
        </div>
      </div>

      {/* Frase institucional al fondo */}
      <div className="mt-10 text-center">
        <p className="text-institucional text-2xl font-bold tracking-wide italic">
          Crear, Sentir y Transformar
        </p>
      </div>
    </footer>
  );
};

export default Footer;