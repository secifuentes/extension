// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Asegúrate de tener lucide-react instalado

const DashboardLayout = ({ children, usuario, onLogout }) => {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fijo para pantallas grandes */}
      <aside className="w-64 bg-white border-r p-5 hidden sm:block">
        <h2 className="text-xl font-bold text-blue-700 mb-6">Extensión</h2>
        <nav className="space-y-3 text-sm">
          <Link to="/panel" className="block hover:text-blue-600">🏠 Inicio</Link>
          <Link to="/panel/mis-cursos" className="block hover:text-blue-600">📘 Mis cursos</Link>
          <Link to="/panel/soportes" className="block hover:text-blue-600">📤 Soportes</Link>
          <Link to="/panel/mensajes" className="block hover:text-blue-600">💬 Mensajes</Link>
          <Link to="/panel/cuenta" className="block hover:text-blue-600">⚙️ Configuración</Link>
        </nav>
      </aside>

      {/* Sidebar móvil */}
      {sidebarAbierto && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 sm:hidden" onClick={() => setSidebarAbierto(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="w-64 bg-white p-5 absolute left-0 top-0 h-full shadow-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-700">Extensión</h2>
              <button onClick={() => setSidebarAbierto(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-3 text-sm">
              <Link to="/panel" className="block hover:text-blue-600">🏠 Inicio</Link>
              <Link to="/panel/mis-cursos" className="block hover:text-blue-600">📘 Mis cursos</Link>
              <Link to="/panel/soportes" className="block hover:text-blue-600">📤 Soportes</Link>
              <Link to="/panel/mensajes" className="block hover:text-blue-600">💬 Mensajes</Link>
              <Link to="/panel/cuenta" className="block hover:text-blue-600">⚙️ Configuración</Link>
            </nav>
          </aside>
        </div>
      )}

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-50 p-4 sm:p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="sm:hidden" onClick={() => setSidebarAbierto(true)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Hola, {usuario?.nombre || "Estudiante"}
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Cerrar sesión
          </button>
        </header>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;