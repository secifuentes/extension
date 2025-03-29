import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const AdminCursos = () => {
  const [cursos, setCursos] = useState([]);

  const eliminarTodosLosCursos = async () => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar TODOS los cursos? Esta acción no se puede deshacer.');
    if (!confirmacion) return;

    try {
      const res = await fetch(`${API_URL}/api/cursos/eliminar-todos`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.mensaje || 'Cursos eliminados');
      window.location.reload(); // recargar para reflejar el cambio
    } catch (error) {
      console.error('❌ Error al eliminar cursos:', error);
      alert('Error al eliminar los cursos');
    }
  };

  // Obtener cursos desde la API
  useEffect(() => {
    const fetchCursos = async () => {
      const res = await fetch(`${API_URL}/api/cursos/con-inscritos`);
      const data = await res.json();
      setCursos(data);
    };
    fetchCursos();
  }, []);

  console.log('✅ Se está renderizando AdminCursos');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-institucional mb-6">Gestión de Cursos</h1>

      {/* 🔘 Botones de acción */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Link
          to="/admin/crear-curso"
          className="bg-institucional text-white px-6 py-2 rounded hover:bg-presentacionDark"
        >
          ➕ Crear nuevo curso
        </Link>

        <button
          onClick={eliminarTodosLosCursos}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          🗑️ Eliminar todos los cursos
        </button>
      </div>

      {cursos.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No hay cursos creados todavía.
        </p>
      )}

      {/* Tabla de cursos */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Modalidad</th>
              <th className="p-3 text-left">Duración</th>
              <th className="p-3 text-left">Inscritos</th>
              <th className="p-3 text-left">Valor Mensual</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={curso.imagen}
                    alt={curso.nombre}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="p-3">{curso.nombre}</td>
                <td className="p-3">{curso.modalidad}</td>
                <td className="p-3">{curso.duracion}</td>
                <td className="p-3">{curso.inscritos}</td>
                <td className="p-3">${curso.precio.toLocaleString()}</td>
                <td className="p-3 flex gap-2">
                  <Link
                    to={`/admin/editar-curso/${curso._id}`}
                    className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>

                  <button className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCursos;