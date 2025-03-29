import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [imagenActual, setImagenActual] = useState(0);
  const [cursos, setCursos] = useState([]);

  const imagenes = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
  ];

  // Carrusel automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  // Obtener cursos desde el backend
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cursos/con-inscritos`);
        const data = await res.json();
        setCursos(data);
      } catch (error) {
        console.error('Error al cargar cursos desde el backend:', error);
      }
    };

    fetchCursos();
  }, []);

  return (
    <div className="pt-[72px]">

      {/* Carrusel */}
      <div className="w-full h-[400px] relative overflow-hidden">
        <img
          src={imagenes[imagenActual]}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-1000"
        />
      </div>

      {/* Cursos */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-institucional mb-6 text-center">Cursos de Extensión</h2>

        {cursos.length === 0 ? (
          <p className="text-center text-gray-500 text-sm mt-10">No hay cursos disponibles por ahora.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <Link to={`/curso/${curso._id}`} key={curso._id}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden">
                  <img
                    src={curso.imagen}
                    alt={curso.nombre}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-center font-bold text-institucional text-lg leading-snug">
                      {curso.nombre}
                    </h3>
                    <p className="text-sm text-center text-gray-500 mt-1">
                      💰 {curso.precio?.toLocaleString?.() ? `$${curso.precio.toLocaleString()}` : ''}
                    </p>
                    <p className="text-xs text-center text-gray-400 mt-1">
                      {curso.modalidad} • {curso.duracion}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN: ¿Por qué elegirnos? */}
      <div className="bg-[#f7f9fc] py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-institucional mb-4">¿Por qué elegirnos?</h2>
          <p className="text-gray-700 text-md mb-10">
            Nuestros cursos de extensión están diseñados para potenciar las habilidades de nuestros estudiantes,
            fomentar la creatividad y reforzar valores a través de experiencias significativas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-institucional mb-2">Profesores calificados</h3>
              <p className="text-gray-600 text-sm">
                Contamos con docentes apasionados, expertos en su área y con vocación educativa.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-institucional mb-2">Ambiente seguro</h3>
              <p className="text-gray-600 text-sm">
                Nuestras actividades se desarrollan en espacios seguros, pensados para el bienestar de cada estudiante.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-institucional mb-2">Formación integral</h3>
              <p className="text-gray-600 text-sm">
                Promovemos el desarrollo académico, emocional, físico y espiritual de nuestros estudiantes.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;