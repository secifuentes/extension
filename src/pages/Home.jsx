import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [imagenActual, setImagenActual] = useState(0);
  const [cursos, setCursos] = useState([]);

  // Cargar cursos desde el backend
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

  // Carrusel (si lo usas)
  const imagenes = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="pt-[72px]">
      {/* Banner principal */}
      <div className="w-full h-[400px] relative overflow-hidden">
        <img
          src={imagenes[imagenActual]}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-1000"
        />
      </div>

      {/* Sección de cursos */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-institucional mb-6 text-center">Cursos de Extensión</h2>

        {/* Si no hay cursos */}
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
    </div>
  );
};

export default Home;