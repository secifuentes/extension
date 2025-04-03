import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FaqItem from '../components/FaqItem';

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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
              </svg>

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

      <section className="bg-gray-50 py-16">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-institucional">
      Preguntas frecuentes
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FaqItem
        pregunta="¿Tengo que estudiar en el colegio para inscribirme?"
        respuesta="¡Para nada! Nuestros cursos de extensión están abiertos a toda la comunidad. Si eres de Girardota o alrededores y quieres aprender algo nuevo, ¡este espacio también es para ti!"
      />
      <FaqItem
        pregunta="¿Cuánto dura cada curso?"
        respuesta="Todos nuestros cursos duran 3 meses, con clases semanales dinámicas y muy prácticas. ¡El tiempo justo para aprender, disfrutar y lograr algo grande!"
      />
      <FaqItem
        pregunta="¿Cómo se paga el curso?"
        respuesta="¡Tú eliges cómo! Puedes hacer un solo pago por el curso completo o dividirlo en pagos mensuales. Queremos que sea fácil para ti y tu familia acceder a todo lo que ofrecemos."
      />
      <FaqItem
        pregunta="¿Qué pasa al finalizar el curso?"
        respuesta="Al finalizar, cada estudiante participará en una actividad especial, presentación o proyecto donde pondrá en práctica todo lo aprendido. ¡Es el momento de mostrar su talento!"
      />
      <FaqItem
        pregunta="¿Entregan certificados?"
        respuesta="¡Claro que sí! Al completar y aprobar el curso, podrás descargar tu certificado directamente desde nuestra página web. Un reconocimiento valioso para tu crecimiento."
      />
      <FaqItem
        pregunta="¿Hay beneficios para los estudiantes del colegio?"
        respuesta="Sí, quienes hacen parte de la Familia Presentación tienen descuentos especiales en nuestros cursos. ¡Es nuestra forma de seguir apoyando su formación!"
      />
      <FaqItem
        pregunta="¿Quiénes dictan los cursos?"
        respuesta="¡Profes verdaderos cracks en lo que hacen! Cada curso es liderado por docentes especializados, con experiencia real y pasión por enseñar. Aprenderás con los mejores."
      />
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;