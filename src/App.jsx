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
    </>
  );
};

export default App;