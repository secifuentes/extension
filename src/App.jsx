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
      {/* Botón flotante de WhatsApp PRO */}
<div className="fixed z-50 bottom-6 right-6 flex flex-col items-end gap-1 animate-fade-in-once">
  <div className="hidden sm:flex items-center bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
    ¿Tienes dudas? <span className="ml-2 text-institucional">¡Escríbenos!</span>
  </div>
  <a
    href="https://wa.me/573019856645"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-transform duration-300 hover:scale-105"
    title="Escríbenos por WhatsApp"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 32 32"
      className="w-6 h-6"
    >
      <path d="M20.52 3.48a11.88 11.88 0 0 0-16.8 0A11.88 11.88 0 0 0 1.8 16.2L1 22l5.8-1.52a11.88 11.88 0 0 0 16.8-16.8ZM12 19.8a7.8 7.8 0 0 1-4-1.08l-.28-.16-3.44.92.92-3.44-.16-.28a7.8 7.8 0 1 1 6.96 4.04Z" />
    </svg>
  </a>
</div>
    </>
  );
};

export default App;