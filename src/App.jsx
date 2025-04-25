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
     {/* Botón flotante de WhatsApp con mensaje arriba */}
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in-once">
  {/* Mensaje flotante */}
  <div className="mb-2 px-4 py-1.5 bg-white rounded-md shadow-lg text-sm text-gray-700 font-semibold">
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
    {/* Ícono oficial de WhatsApp en SVG (blanco) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      className="w-8 h-8"
    >
      <path d="M380.9 97.1C339 55.2 283.2 32 224.1 32 100.3 32 0 132.3 0 256c0 45 11.8 88.2 34.3 126.6L2.5 480l101.3-30.7c35 19.2 74.3 29.4 114.3 29.4h.1c123.7 0 224-100.3 224-224 .1-59.1-23.1-114.9-65.1-157.8zM224.1 438.6c-33.2 0-65.7-8.9-94.1-25.7l-6.7-4-60.2 18.2 19.3-58.5-4.4-6.9c-20-31.2-30.6-67.3-30.6-104.2 0-107.6 87.5-195.1 195.2-195.1 52.1 0 101 20.3 137.8 57.1 36.8 36.8 57.1 85.7 57 137.8-.1 107.7-87.6 195.3-195.3 195.3z"/>
    </svg>
  </a>
</div>
    </>
  );
};

export default App;