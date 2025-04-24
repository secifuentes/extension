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
      <a
  href="https://wa.me/573019856645"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 animate-bounce"
  title="¿Tienes dudas? Escríbenos por WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M16 2.933A13.055 13.055 0 002.933 16a12.93 12.93 0 001.883 6.648L2 30l7.574-2.414A13.007 13.007 0 0016 29.067 13.055 13.055 0 0029.067 16 13.055 13.055 0 0016 2.933zm0 23.8a10.82 10.82 0 01-5.52-1.5l-.4-.236-4.508 1.437 1.489-4.417-.261-.423a10.63 10.63 0 011.781-13.193A10.735 10.735 0 0116 5.2a10.78 10.78 0 017.607 18.47 10.697 10.697 0 01-7.607 3.063zm5.936-8.117c-.33-.165-1.961-.965-2.266-1.078s-.524-.165-.747.165-.858 1.078-1.051 1.3-.387.247-.717.082a8.756 8.756 0 01-2.577-2.149 9.73 9.73 0 01-1.814-3.068c-.121-.33.012-.508.091-.673s.122-.165.184-.247a2.178 2.178 0 00.123-.206.589.589 0 000-.495c-.082-.165-.747-1.8-1.025-2.463s-.548-.57-.747-.58-.413-.01-.63-.01a1.22 1.22 0 00-.89.412A3.698 3.698 0 007.68 9.5c0 2.189 1.6 4.312 1.822 4.616s3.16 4.826 7.651 6.577c1.069.46 1.9.734 2.547.939a6.418 6.418 0 002.953.184c.9-.138 1.961-.8 2.24-1.569s.279-1.43.195-1.569-.3-.225-.63-.39z" />
  </svg>
</a>
    </>
  );
};

export default App;