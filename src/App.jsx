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


const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curso/:id" element={<CursoDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estudiante" element={<EstudiantePanel />} />
        <Route path="/docente" element={<DocentePanel />} />
        <Route path="/estado" element={<EstadoEstudiante />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* ✅ Panel CRM nuevo */}
        <Route path="/admin/inscripciones" element={<AdminInscripciones />} />
        <Route path="/admin/docentes" element={<AdminDocentes />} />
        <Route path="/admin/estudiantes" element={<AdminEstudiantes />} />
        <Route path="/admin/certificados" element={<AdminCertificados />} />
        <Route path="/admin/contabilidad" element={<AdminContabilidad />} />
        
      </Routes>
    </MainLayout>
  );
};

export default App;