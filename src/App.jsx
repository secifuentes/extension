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
import EnviarCorreo from './components/admin/EnviarCorreo';

// Paneles modernos (nuevo)
import DashboardLayout from './layouts/DashboardLayout';
import DocenteDashboard from './pages/docente/DocenteDashboard';
import EstudiantesCurso from './pages/docente/EstudiantesCurso';
import PerfilDocente from './pages/docente/PerfilDocente';

import EstudianteDashboard from './pages/estudiante/EstudianteDashboard';
import MisCursos from './pages/estudiante/MisCursos';
import PerfilEstudiante from './pages/estudiante/PerfilEstudiante';

import ScrollToTop from './components/ScrollToTop';

import { FaWhatsapp } from 'react-icons/fa'; // ✅ Ícono oficial de WhatsApp

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
    <Route path="/estado-inscripcion" element={<EstadoEstudiante />} />
  </Route>

  {/* Rutas admin con AdminLayout */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<StatsCards />} />
    <Route path="cursos" element={<AdminCursos />} />
    <Route path="crear-curso" element={<CrearCurso />} />
    <Route path="editar-curso/:id" element={<EditarCurso />} />
    <Route path="inscripciones" element={<AdminInscripciones />} />
    <Route path="docentes" element={<AdminDocentes />} />
    <Route path="estudiantes" element={<EstudiantesInscritosTable />} />
    <Route path="certificados" element={<AdminCertificados />} />
    <Route path="contabilidad" element={<AdminContabilidad />} />
    <Route path="tabla-inscritos" element={<EstudiantesInscritosTable />} />
    <Route path="enviar-correo" element={<EnviarCorreo />} />
  </Route>

  {/* Panel Docente */}
  <Route path="/docente" element={<DashboardLayout rol="docente" />}>
    <Route index element={<DocenteDashboard />} />
    <Route path="estudiantes/:cursoId" element={<EstudiantesCurso />} />
    <Route path="perfil" element={<PerfilDocente />} />
  </Route>

  {/* Panel Estudiante */}
  <Route path="/estudiante" element={<DashboardLayout rol="estudiante" />}>
    <Route index element={<EstudianteDashboard />} />
    <Route path="mis-cursos" element={<MisCursos />} />
    <Route path="perfil" element={<PerfilEstudiante />} />
  </Route>
</Routes>
      
     {/* Botón flotante de WhatsApp con texto arriba */}
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in-once">
  {/* Mensaje visible solo en pantallas sm y mayores */}
  <div className="hidden sm:block mb-2 px-4 py-1.5 bg-white rounded-md shadow-lg text-sm text-gray-700 font-semibold">
    ¿Tienes dudas? <span className="text-green-600">Escríbenos</span>
  </div>

  {/* Botón de WhatsApp */}
  <a
    href="https://wa.me/573019856645"
    target="_blank"
    rel="noopener noreferrer"
    className="w-16 h-16 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
    title="Escríbenos por WhatsApp"
  >
    <FaWhatsapp className="text-white text-3xl" />
  </a>
</div>
    </>
  );
};

export default App;