import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const beneficios = [
  { icono: '🎓', texto: 'Educación de Alta Calidad' },
  { icono: '💡', texto: 'Formación Integral' },
  { icono: '🤝', texto: 'Valores Presentación' },
  { icono: '🛡️', texto: 'Ambiente Seguro y Acompañamiento' },
];

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
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-center justify-center px-4 text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
              Cursos de Extensión
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white font-medium opacity-90">
              La Presentación Girardota
            </p>
          </div>
        </div>
      </div>

      {/* Cursos */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center mb-10 text-institucional">Conoce nuestros cursos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <div key={curso._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="aspect-[3/3] overflow-hidden">
        <img
          src={curso.imagen}
          alt={curso.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-center font-bold text-institucional text-lg leading-snug">
          {curso.nombre}
        </h3>

        {/* Mostrar valor y detalles 
        <p className="text-sm text-gray-500 mt-1">
          💰 {curso.precio?.toLocaleString?.() ? `$${curso.precio.toLocaleString()}` : ''}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {curso.modalidad} • {curso.duracion}
        </p> */}

        <Link
          to={`/curso/${curso.slug}`} // ✅ Usa el slug del backend
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
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-institucional">¿Por qué elegirnos?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {beneficios.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer"
              >
                <div className="text-6xl mb-3">{item.icono}</div>
                <p className="font-semibold text-lg">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;