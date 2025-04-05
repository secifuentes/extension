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
      window.location.reload();
    } catch (error) {
      console.error('❌ Error al eliminar cursos:', error);
      alert('Error al eliminar los cursos');
    }
  };

  useEffect(() => {
    const fetchCursos = async () => {
      const res = await fetch(`${API_URL}/api/cursos/con-inscritos`);
      const data = await res.json();
      setCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <div className="pt-10 p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-institucional mb-6 text-center md:text-left">
        Gestión de Cursos
      </h1>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
        <Link
          to="/admin/crear-curso"
          className="bg-institucional text-white px-6 py-2 rounded-md hover:bg-presentacionDark transition duration-300 text-center w-full sm:w-auto"
        >
          ➕ Crear nuevo curso
        </Link>

        <button
          onClick={eliminarTodosLosCursos}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300 w-full sm:w-auto"
        >
          🗑️ Eliminar todos los cursos
        </button>
      </div>

      {cursos.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No hay cursos creados todavía.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
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
            <tbody className="text-sm">
              {cursos.map((curso) => (
                <tr key={curso._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">
                    <img
                      src={curso.imagen}
                      alt={curso.nombre}
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="p-3 font-medium">{curso.nombre}</td>
                  <td className="p-3">{curso.modalidad}</td>
                  <td className="p-3">{curso.duracion}</td>
                  <td className="p-3">{curso.inscritos}</td>
                  <td className="p-3">${curso.precio.toLocaleString()}</td>
                  <td className="p-3 flex flex-col gap-2">
                    <Link
                      to={`/admin/editar-curso/${curso._id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600 text-center"
                    >
                      ✏️ Editar
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCursos;