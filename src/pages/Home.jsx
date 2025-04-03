import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const imagenesBanner = [
  '/banner/banner1.jpg',
  '/banner/banner2.jpg',
  '/banner/banner3.jpg',
];

const Home = () => {
  const [imagenActual, setImagenActual] = useState(0);
  const [cursos, setCursos] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cursos/con-inscritos`);
        const data = await res.json();
        setCursos(data);
      } catch (error) {
        console.error('❌ Error al cargar cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenesBanner.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="pt-0">
      {/* Banner */}
      <div className="w-full h-[600px] relative">
        <img
          src={imagenesBanner[imagenActual]}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 flex items-center justify-center px-4 text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
              Cursos de Extensión para todos
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white font-medium opacity-90">
              No importa si no eres parte de nuestra Familia Presentación, ¡todos pueden inscribirse en nuestros cursos!
            </p>
            <a
            href="#cursos"
            className="mt-6 inline-block bg-white text-institucional font-bold px-6 py-3 rounded-full hover:bg-institucional hover:text-white transition">
              Ver cursos disponibles
            </a>
          </div>
        </div>
      </div>
      
      {/* Que es */}
      <section className="bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-institucional mb-4">¿Qué son los Cursos de Extensión?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Son espacios de aprendizaje diseñados para que cualquier persona, sin importar si hace parte o no del Colegio La Presentación, 
            pueda desarrollar nuevas habilidades, descubrir talentos o potenciar sus conocimientos. Están abiertos a toda la comunidad 
            y se realizan en nuestras instalaciones, con docentes calificados y una metodología divertida y flexible.
            </p>
            </div>
            </section>

      {/* Cursos */}
      <section id="cursos" className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center mb-10 text-institucional">Conoce nuestros cursos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <div key={curso._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[3/3] overflow-hidden">
                <img
                  src={curso.imagen}
                  alt={curso.nombre}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-center font-bold text-institucional text-lg leading-snug">
                  {curso.nombre}
                </h3>

                <Link
                  to={`/curso/${curso.slug}`}
                  className="mt-4 inline-block bg-institucional text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Inscribirme
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-institucional mb-8">
            ¿Por qué elegir nuestros Cursos de Extensión?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Tarjeta 1: Clases dinámicas y divertidas */}
            <div className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer">
              <div className="text-6xl mb-3">
                {/* Aquí puedes poner un icono o imagen en el futuro */}
              </div>
              <p className="font-semibold text-lg">Clases dinámicas y divertidas para todos.</p>
            </div>

            {/* Tarjeta 2: Aprende jugando */}
            <div className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer">
              <div className="text-6xl mb-3">
                {/* Aquí puedes poner un icono o imagen en el futuro */}
              </div>
              <p className="font-semibold text-lg">Aprende jugando, mientras te diviertes.</p>
            </div>

            {/* Tarjeta 3: Horarios flexibles */}
            <div className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer">
              <div className="text-6xl mb-3">
                {/* Aquí puedes poner un icono o imagen en el futuro */}
              </div>
              <p className="font-semibold text-lg">Horarios flexibles para tu comodidad.</p>
            </div>

            {/* Tarjeta 4: Cursos para todos */}
            <div className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer">
              <div className="text-6xl mb-3">
                {/* Aquí puedes poner un icono o imagen en el futuro */}
              </div>
              <p className="font-semibold text-lg">Cursos para todos, no importa si eres parte de nuestra familia o no.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;