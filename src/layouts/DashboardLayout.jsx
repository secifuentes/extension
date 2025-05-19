// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // o usa cualquier ícono

const DashboardLayout = ({ children, usuario, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* Sidebar móvil */}
      <div className={`fixed inset-0 z-40 bg-white w-64 p-5 border-r transform transition-transform duration-300 sm:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-700">Extensión</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <nav className="space-y-4 text-sm">
          <Link to="/panel" className="block hover:text-blue-600">🏠 Inicio</Link>
          <Link to="/panel/mis-cursos" className="block hover:text-blue-600">📘 Mis cursos</Link>
          <Link to="/panel/soportes" className="block hover:text-blue-600">📤 Soportes</Link>
          <Link to="/panel/mensajes" className="block hover:text-blue-600">💬 Mensajes</Link>
          <Link to="/panel/cuenta" className="block hover:text-blue-600">⚙️ Configuración</Link>
        </nav>
      </div>

      {/* Sidebar escritorio */}
      <aside className="hidden sm:block w-64 bg-white border-r p-5">
        <h2 className="text-xl font-bold text-blue-700 mb-6">Extensión</h2>
        <nav className="space-y-4 text-sm">
          <Link to="/panel" className="block hover:text-blue-600">🏠 Inicio</Link>
          <Link to="/panel/mis-cursos" className="block hover:text-blue-600">📘 Mis cursos</Link>
          <Link to="/panel/soportes" className="block hover:text-blue-600">📤 Soportes</Link>
          <Link to="/panel/mensajes" className="block hover:text-blue-600">💬 Mensajes</Link>
          <Link to="/panel/cuenta" className="block hover:text-blue-600">⚙️ Configuración</Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-50 p-4 sm:p-6">
        {/* Topbar móvil */}
        <header className="sm:hidden flex justify-between items-center mb-6">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Hola, {usuario?.nombre || "Estudiante"}
          </h1>
          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Salir
          </button>
        </header>

        {/* Topbar escritorio */}
        <header className="hidden sm:flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Hola, {usuario?.nombre || "Estudiante"}
          </h1>
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