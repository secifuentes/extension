import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CursoDetalle from './pages/CursoDetalle';
import Login from './pages/Login';
import EstudiantePanel from './pages/EstudiantePanel';
import DocentePanel from './pages/DocentePanel';
import EstadoEstudiante from './pages/EstadoEstudiante';
import AdminDashboard from './pages/AdminDashboard';
import AdminInscripciones from './pages/AdminInscripciones';
import AdminDocentes from './pages/AdminDocentes';
import MainLayout from './layouts/MainLayout';
import AdminEstudiantes from './pages/AdminEstudiantes';
import AdminCertificados from './pages/AdminCertificados';
import AdminContabilidad from './pages/AdminContabilidad';
import ScrollToTop from './components/ScrollToTop'; // 👈 importa
import AdminCursos from './pages/AdminCursos';
import CrearCurso from './pages/CrearCurso';
import EditarCurso from './pages/EditarCurso';
import EstudiantesInscritosTable from './components/admin/EstudiantesInscritosTable';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/visitas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: window.location.pathname }),
    });
  }, []);
  return (
    <MainLayout>
      <ScrollToTop /> {/* 👈 aquí va */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curso/:slug" element={<CursoDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estudiante" element={<EstudiantePanel />} />
        <Route path="/docente" element={<DocentePanel />} />
        <Route path="/estado" element={<EstadoEstudiante />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/inscripciones" element={<AdminInscripciones />} />
        <Route path="/admin/docentes" element={<AdminDocentes />} />
        <Route path="/admin/estudiantes" element={<EstudiantesInscritosTable />} />
        <Route path="/admin/certificados" element={<AdminCertificados />} />
        <Route path="/admin/contabilidad" element={<AdminContabilidad />} />
        <Route path="/admin/cursos" element={<AdminCursos />} />
        <Route path="/admin/crear-curso" element={<CrearCurso />} />
        <Route path="/admin/editar-curso/:id" element={<EditarCurso />} />
      </Routes>
    </MainLayout>
  );
};

export default App;