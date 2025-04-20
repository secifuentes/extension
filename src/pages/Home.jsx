import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FaqItem from '../components/FaqItem';

const imagenesBanner = [
  '/banner/banner1.jpg',
  '/banner/banner2.jpg',
  '/banner/banner3.jpg',
  '/banner/banner4.jpg',
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
    let timer;
  
    if (imagenActual === 0) {
      timer = setTimeout(() => {
        setImagenActual(1);
      }, 7000); // Primer banner: 7 segundos
    } else {
      timer = setTimeout(() => {
        setImagenActual((prev) => (prev + 1) % imagenesBanner.length);
      }, 5000); // Otros: 5 segundos
    }
  
    return () => clearTimeout(timer);
  }, [imagenActual]);

  return (
    <div className="pt-0">
      {/* Banner con efecto slide */}
<div className="w-full h-[calc(100vh-54px)] relative overflow-hidden">
  {/* Carrusel de imágenes */}
  <div
    className="flex transition-transform duration-700 ease-in-out h-full"
    style={{ transform: `translateX(-${imagenActual * 100}%)` }}
  >
    {imagenesBanner.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`Banner ${i + 1}`}
        className="w-full h-full object-cover flex-shrink-0"
        loading="lazy"
      />
    ))}
  </div>

  {/* Overlay con texto y botón */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center px-4 text-center pb-16 md:pb-24">
    <div className="transition-opacity duration-700 ease-in-out">
      {imagenActual === 0 ? (
        // Slide 1: solo botón
        <a
          href="#cursos"
          className="inline-block mb-[88px] px-6 py-2 border-2 border-white text-white font-semibold rounded-md animate-slide-up backdrop-blur-sm bg-white/10 hover:bg-white/20 transition"
        >
          Ver cursos disponibles
        </a>
      ) : (
        <>
          {/* Slides 2–4: texto + botón */}
          <div className="animate-fade-in mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
              Cursos de Extensión para todos
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-white font-medium opacity-90">
              Aunque no seas parte de la Familia Presentación, este espacio también es para ti.
            </p>
          </div>

          <a
            href="#cursos"
            className="inline-block px-6 py-2 font-semibold rounded-md transition-all duration-500 border-2 text-white border-white hover:bg-white hover:text-institucional animate-slide-up"
          >
            Ver cursos disponibles
          </a>
        </>
      )}
    </div>
  </div>

  {/* Flechas modernas */}
  <button
    onClick={() =>
      setImagenActual((prev) =>
        prev === 0 ? imagenesBanner.length - 1 : prev - 1
      )
    }
    className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/50 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition z-10"
    aria-label="Anterior"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </button>

  <button
    onClick={() =>
      setImagenActual((prev) => (prev + 1) % imagenesBanner.length)
    }
    className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/50 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition z-10"
    aria-label="Siguiente"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </button>

  {/* Indicadores del banner */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
    {imagenesBanner.map((_, i) => (
      <button
        key={i}
        onClick={() => setImagenActual(i)}
        className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
          i === imagenActual ? 'bg-white' : 'bg-white/30'
        }`}
        aria-label={`Cambiar al banner ${i + 1}`}
      />
    ))}
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
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 mx-auto text-yellow-500">
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="font-semibold text-lg">Clases dinámicas y divertidas para todos.</p>
      </div>

      {/* Tarjeta 2: Aprende jugando */}
      <div className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 mx-auto text-yellow-500">
            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
          </svg>
        </div>
        <p className="font-semibold text-lg">Aprende jugando, mientras te diviertes.</p>
      </div>

      {/* Tarjeta 3: Horarios flexibles */}
      <div className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 mx-auto text-yellow-500">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="font-semibold text-lg">Horarios flexibles para tu comodidad.</p>
      </div>

      {/* Tarjeta 4: Cursos para todos */}
      <div className="bg-gradient-to-br from-white to-gray-100 hover:from-institucional hover:to-presentacionDark hover:text-white p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105 text-center cursor-pointer">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 mx-auto text-yellow-500">
            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
          </svg>
        </div>
        <p className="font-semibold text-lg">Cursos para todos, no importa si eres parte de nuestra familia o no.</p>
      </div>
    </div>
  </div>
</section>

<section className="bg-gray-100 py-14">
  <div className="text-center max-w-4xl mx-auto px-4">
    <div className="mb-4 w-16 h-1 mx-auto bg-institucional rounded-full" />
    <p className="text-2xl md:text-3xl font-bold italic text-institucional relative overflow-hidden shimmer-text">
      Más que cursos, experiencias que inspiran.
    </p>
    <div className="mt-4 w-16 h-1 mx-auto bg-institucional rounded-full" />
  </div>
</section>

<section id="faq" className="bg-gray-50 pt-16 pb-20">
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
      <FaqItem
      pregunta="¿Cómo realizo el pago del curso?"
      respuesta='Puedes pagar por consignación o transferencia a la cuenta de ahorros <strong>Bancolombia No. 39900005178</strong> a nombre del <strong>Instituto Parroquial Nuestra Señora de la Presentación</strong>. No olvides subir tu comprobante en el formulario para validar tu inscripción.'
      />
      <FaqItem
      pregunta="¿Qué pasa si no se completa el cupo mínimo para abrir el curso?"
      respuesta='Cada curso necesita un mínimo de 10 a 15 estudiantes inscritos, dependiendo del tipo de curso. Si no se alcanza este número, nos comunicaremos contigo y realizaremos la devolución completa de tu dinero. ¡Tu confianza y tranquilidad son muy importantes para nosotros!'
      />
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;