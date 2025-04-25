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
      className="w-6 h-6"
    >
      <path
        fill="currentColor"
        d="M380.9 97.1C339-6.4 218.8-33.4 124 29.1 46.4 80.8 13 173.5 48.3 255L0 480l228.9-47.7c81.5 35 174.4 1.2 226.1-76.4 62.5-94.8 35.5-215-74.1-258.8zM229.7 392.2c-41.1 0-81.2-12.1-115.3-35.1l-8.3-5.3-82.3 17.1 17.5-80.4-5.4-8.2c-21.2-32.1-32.3-69.1-32.3-106C4.6 106 107.1 3.3 229.7 3.3c58.6 0 113.9 22.8 155.3 64.2s64.2 96.7 64.2 155.3-22.8 113.9-64.2 155.3-96.7 64.1-155.3 64.1zm100.7-138c-5.6-2.8-33.1-16.3-38.2-18.2s-8.8-2.8-12.5 2.8-14.4 18.2-17.7 21.9c-3.2 3.7-6.5 4.2-12.1 1.4-33.1-16.3-54.8-29.2-76.7-66.1-5.8-9.9 5.8-9.2 16.3-30.5 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5 5.5-19.4 19-19.4 46.3s19.9 53.6 22.7 57.3c2.8 3.7 39.1 59.6 94.7 83.6 13.2 5.6 23.5 8.9 31.5 11.4 13.2 4.2 25.1 3.6 34.6 2.2 10.5-1.6 33.1-13.5 37.8-26.6 4.7-13.1 4.7-24.4 3.3-26.7-1.3-2.3-5-3.7-10.6-6.5z"
      />
    </svg>
  </a>
</div>
    </>
  );
};

export default App;