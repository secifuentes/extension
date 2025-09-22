import React from 'react';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import '../styles/landing.css';

const whatsappNumber = '573019856645';
const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Hola Extensión La Presentación, quiero gestionar información sobre los cursos.'
)}`;

const LandingRedirect = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070d23] text-white">
      <div className="landing-aurora" aria-hidden="true" />
      <div className="landing-bubble" aria-hidden="true" />
      <div className="landing-bubble" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-14 sm:px-10">
        <div className="landing-glass relative w-full rounded-3xl px-7 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="landing-orbit" aria-hidden="true" />

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <img
              src="/logocol.svg"
              alt="Extensión La Presentación"
              className="h-16 w-auto drop-shadow-[0_14px_30px_rgba(15,111,255,0.3)] sm:h-20"
              loading="lazy"
            />
            <span className="text-sm font-semibold uppercase tracking-[0.5em] text-white/60">
              +
            </span>
            <img
              src="https://www.extensionlapresentacion.com/logo.svg"
              alt="Extensión La Presentación Alterno"
              className="h-14 w-auto opacity-80 backdrop-blur sm:h-16"
              loading="lazy"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-12 text-center">
            <span className="landing-badge landing-text-fade">Nueva experiencia de contacto</span>

            <div className="space-y-5">
              <h1 className="landing-text-fade text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                Hemos cambiado de casa digital
              </h1>
              <p className="landing-text-fade text-base text-white/70 sm:text-lg">
                Ahora gestionamos cada solicitud, inscripción y seguimiento de los cursos de extensión mediante un
                acompañamiento directo en WhatsApp. Estamos a un mensaje de ayudarte a crear experiencias que inspiran.
              </p>
            </div>

            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="landing-button-shadow group inline-flex items-center justify-center gap-3 rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 px-7 py-3 text-lg font-semibold text-[#041821] transition-all duration-300 hover:scale-[1.02] hover:from-emerald-400 hover:to-emerald-300"
            >
              <FaWhatsapp className="text-xl" />
              Conversar por WhatsApp
              <FaArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <p className="landing-text-fade text-xs uppercase tracking-[0.32em] text-white/50">
              Whatsapp oficial Extensión · {`+${whatsappNumber}`}
            </p>

            <div className="grid w-full gap-6 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white">Acompañamiento inmediato</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  Nuestro asistente responde al instante para guiarte con inscripciones, pagos y el envío de soportes
                  de pago. Todo el proceso queda acompañado con indicaciones claras y amigables.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white">Información siempre actualizada</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  Recibe respuestas automáticas con la agenda, tarifas y cupos en tiempo real, además de recordatorios
                  personalizados para que no te pierdas ninguna experiencia formativa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingRedirect;
