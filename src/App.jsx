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

const App = () => {
  return (
    <MainLayout>
      <ScrollToTop /> {/* 👈 aquí va */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curso/:id" element={<CursoDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estudiante" element={<EstudiantePanel />} />
        <Route path="/docente" element={<DocentePanel />} />
        <Route path="/estado" element={<EstadoEstudiante />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/inscripciones" element={<AdminInscripciones />} />
        <Route path="/admin/docentes" element={<AdminDocentes />} />
        <Route path="/admin/estudiantes" element={<AdminEstudiantes />} />
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