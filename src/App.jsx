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
      {/* Botón flotante de WhatsApp profesional */}
<div className="fixed z-50 bottom-6 right-6 flex flex-col items-end gap-1 animate-fade-in-once">
  {/* Texto solo en pantallas grandes */}
  <div className="hidden sm:flex items-center bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
    ¿Tienes dudas? <span className="ml-2 text-green-600">¡Escríbenos!</span>
  </div>

  {/* Ícono WhatsApp */}
  <a
    href="https://wa.me/573019856645"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-transform duration-300 hover:scale-105"
    title="Escríbenos por WhatsApp"
  >
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 448 512"
  fill="currentColor"
  className="w-6 h-6"
>
  <path d="M380.9 97.1C339 55.2 283.2 32 224.1 32 100.3 32 0 132.3 0 256c0 45 11.8 88.2 34.3 126.6L2.5 480l101.3-30.7c35 19.2 74.3 29.4 114.3 29.4h.1c123.7 0 224-100.3 224-224 .1-59.1-23.1-114.9-65.1-157.8zM224.1 438.6c-33.2 0-65.7-8.9-94.1-25.7l-6.7-4-60.2 18.2 19.3-58.5-4.4-6.9c-20-31.2-30.6-67.3-30.6-104.2 0-107.6 87.5-195.1 195.2-195.1 52.1 0 101 20.3 137.8 57.1 36.8 36.8 57.1 85.7 57 137.8-.1 107.7-87.6 195.3-195.3 195.3zm101.1-138.3c-5.5-2.8-32.8-16.1-37.9-17.9-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 17.9-17.5 21.6c-3.2 3.8-6.4 4.2-11.9 1.4-32.4-16.2-53.6-28.9-75-65.2-5.7-9.8 5.7-9.1 16.2-30.3 1.8-3.8.9-7.1-.5-9.9-1.4-2.8-12.5-30.1-17.1-41.3-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-7.1-.2-10.9-.2s-10.1 1.4-15.4 7c-5.3 5.6-20.2 19.8-20.2 48.3s20.7 56 23.6 59.9c2.8 3.8 40.8 62.3 99.2 87.4 13.8 6 24.6 9.5 33 12.2 13.9 4.4 26.6 3.8 36.6 2.3 11.2-1.7 32.8-13.4 37.4-26.3 4.6-12.8 4.6-23.7 3.2-26.1-1.3-2.5-5-3.9-10.5-6.7z" />
</svg>
  </a>
</div>
    </>
  );
};

export default App;