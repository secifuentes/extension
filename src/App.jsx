import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

// Pages públicas
import Home from './pages/Home';
import CursoDetalle from './pages/CursoDetalle';
import EstadoEstudiante from './pages/EstadoEstudiante';
import Login from './pages/Login';
import LandingRedirect from './pages/LandingRedirect';

// Paneles usuarios
import EstudiantePanel from './pages/EstudiantePanel';
import DocentePanel from './pages/DocentePanel';

// Admin Pages
import StatsCards from './components/admin/StatsCards';
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

import ScrollToTop from './components/ScrollToTop';
import { FaWhatsapp } from 'react-icons/fa';

const App = () => {
  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/visitas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: window.location.pathname }),
    }).catch(() => {
      // Silently ignore analytics errors to avoid breaking the landing page experience.
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingRedirect />} />

        <Route element={<MainLayout />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/curso/:slug" element={<CursoDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/estado" element={<EstadoEstudiante />} />
          <Route path="/estado-inscripcion" element={<EstadoEstudiante />} />
        </Route>

        <Route path="/panel/estudiante" element={<EstudiantePanel />} />
        <Route path="/panel/docente" element={<DocentePanel />} />

        <Route path="/admin/*" element={<AdminLayout />}>
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
      </Routes>

      <WhatsAppFab />
    </BrowserRouter>
  );
};

const WhatsAppFab = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in-once">
      <div className="hidden sm:block mb-2 px-4 py-1.5 bg-white rounded-md shadow-lg text-sm text-gray-700 font-semibold">
        ¿Tienes dudas? <span className="text-green-600">Escríbenos</span>
      </div>
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
  );
};

export default App;
