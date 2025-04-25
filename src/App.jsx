import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

// Pages públicas
import Home from './pages/Home';
import CursoDetalle from './pages/CursoDetalle';
import Login from './pages/Login';
import EstadoEstudiante from './pages/EstadoEstudiante';

// Paneles usuarios
import EstudiantePanel from './pages/EstudiantePanel';
import DocentePanel from './pages/DocentePanel';

// Admin Pages
import StatsCards from './components/admin/StatsCards'; // ✅ Ruta corregida
import AdminCursos from './pages/AdminCursos';
import CrearCurso from './pages/CrearCurso';
import EditarCurso from './pages/EditarCurso';
import AdminInscripciones from './pages/AdminInscripciones';
import AdminDocentes from './pages/AdminDocentes';
import AdminEstudiantes from './pages/AdminEstudiantes';
import AdminCertificados from './pages/AdminCertificados';
import AdminContabilidad from './components/admin/ContabilidadResumen';
import EstudiantesInscritosTable from './components/admin/EstudiantesInscritosTable';

import ScrollToTop from './components/ScrollToTop';

const App = () => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/visitas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: window.location.pathname }),
    });
  }, []);

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Rutas públicas con MainLayout */}
        <Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/curso/:slug" element={<CursoDetalle />} />
  <Route path="/login" element={<Login />} />
  <Route path="/estado" element={<EstadoEstudiante />} />
  <Route path="/estado-inscripcion" element={<EstadoEstudiante />} /> {/* ✅ Ruta añadida */}
</Route>

        {/* Paneles independientes */}
        <Route path="/estudiante" element={<EstudiantePanel />} />
        <Route path="/docente" element={<DocentePanel />} />

        {/* Rutas admin con AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<StatsCards />} />
          <Route path="cursos" element={<AdminCursos />} />
          <Route path="crear-curso" element={<CrearCurso />} />
          <Route path="editar-curso/:id" element={<EditarCurso />} />
          <Route path="inscripciones" element={<AdminInscripciones />} />
          <Route path="docentes" element={<AdminDocentes />} />
          <Route path="/admin/estudiantes" element={<EstudiantesInscritosTable />} />
          <Route path="certificados" element={<AdminCertificados />} />
          <Route path="contabilidad" element={<AdminContabilidad />} />
          <Route path="tabla-inscritos" element={<EstudiantesInscritosTable />} />
        </Route>
      </Routes>
     {/* Botón flotante de WhatsApp con mensaje arriba (solo visible en pantallas medianas) */}
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in-once">
  {/* Texto visible solo en pantallas sm y superiores */}
  <div className="hidden sm:block mb-2 px-4 py-1.5 bg-white rounded-md shadow-lg text-sm text-gray-700 font-semibold">
    ¿Tienes dudas? <span className="text-green-600">Escríbenos</span>
  </div>

  {/* Botón */}
  <a
    href="https://wa.me/573019856645"
    target="_blank"
    rel="noopener noreferrer"
    className="w-16 h-16 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-xl hover:scale-105 transition transform duration-300"
    title="Escríbenos por WhatsApp"
  >
    {/* Ícono oficial de WhatsApp */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="white"
      className="w-8 h-8"
    >
      <path d="M20.52 3.48a11.88 11.88 0 0 0-16.8 0A11.88 11.88 0 0 0 1.8 16.2L1 22l5.8-1.52A13.96 13.96 0 0 0 16 30c7.72 0 14-6.28 14-14S23.724 2.003 16.004 2.003zm0 25.74c-2.47 0-4.777-.718-6.698-1.953l-.48-.3-4.054 1.064 1.087-3.946-.313-.518A11.41 11.41 0 0 1 4.59 16c0-6.24 5.085-11.327 11.323-11.327 6.236 0 11.323 5.087 11.323 11.327 0 6.237-5.087 11.323-11.323 11.323z"/>
      <path d="M22.497 19.432c-.316-.158-1.875-.924-2.166-1.03-.29-.106-.502-.158-.714.158-.21.316-.822 1.03-1.008 1.247-.185.21-.37.237-.686.079-.316-.158-1.334-.492-2.542-1.57-.94-.84-1.574-1.878-1.76-2.193-.185-.316-.02-.486.138-.64.142-.14.316-.37.474-.554.158-.185.21-.316.316-.527.105-.21.053-.395-.027-.554-.079-.158-.714-1.724-.978-2.36-.257-.616-.52-.533-.714-.543l-.61-.01c-.21 0-.554.08-.843.395-.29.316-1.1 1.074-1.1 2.616 0 1.542 1.125 3.037 1.282 3.243.158.211 2.215 3.376 5.372 4.732.75.32 1.337.51 1.793.655.753.24 1.437.206 1.977.125.603-.089 1.875-.767 2.14-1.509.263-.74.263-1.374.185-1.508-.078-.133-.29-.21-.605-.368z"/>
    </svg>
  </a>
</div>
    </>
  );
};

export default App;