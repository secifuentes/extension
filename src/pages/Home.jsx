import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const cursos = [
  { slug: 'iniciacion-musical', nombre: 'Iniciación Musical', valor: '$70.000', imagen: '/cursos/musica.jpg' },
  { slug: 'ensamble-musical', nombre: 'Ensamble Musical', valor: '$70.000', imagen: '/cursos/ensamble.jpg' },
  { slug: 'semillero-banda', nombre: 'Semillero Banda', valor: '$70.000', imagen: '/cursos/banda.jpg' },
  { slug: 'defensa-personal', nombre: 'Defensa Personal', valor: '$85.000', imagen: '/cursos/defensa.jpg' },
  { slug: 'junior-english-a1-a2', nombre: 'Junior English Level A1-A2 (9 to 11 years old)', valor: '$70.000', imagen: '/cursos/ingles1.jpg' },
  { slug: 'teens-english-b1', nombre: 'Teens English Level B1 (12 to 14 years old)', valor: '$80.000', imagen: '/cursos/ingles2.jpg' },
  { slug: 'young-adults-english-a1-a2', nombre: 'Young Adults English Level A1-A2 (15 to 17 years old)', valor: '$90.000', imagen: '/cursos/ingles3.jpg' },
  { slug: 'young-adults-english-b1-b2', nombre: 'Young Adults English Level B1-B2 (15 to 17 years old)', valor: '$90.000', imagen: '/cursos/ingles3.jpg' },
  { slug: 'adult-english-a1-a2', nombre: 'Adult English Level A1-A2 (18 years and older)', valor: '$90.000', imagen: '/cursos/ingles3.jpg' },
  { slug: 'ajedrez', nombre: 'Ajedrez', valor: '$80.000', imagen: '/cursos/ajedrez.jpg' },
];

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
            <div key={curso.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
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