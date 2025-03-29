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

      {/* Cursos listados en filas (en lugar de cuadrícula) */}
      <div className="space-y-6"> {/* Cambié de flex a espacio entre cada curso */}
        {cursos.map((curso) => (
          <div key={curso._id} className="bg-white shadow-md rounded-lg overflow-hidden w-full">
            <img
              src={curso.imagen}
              alt={curso.nombre}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-institucional">{curso.nombre}</h3>
              <p className="text-sm text-gray-600 mb-1">{curso.modalidad} • {curso.duracion}</p>
              <p className="text-sm text-gray-600 mb-2">{curso.ubicacion}</p>
              <p className="text-sm font-medium text-green-700">Inscritos: {curso.inscritos}</p>
              <p className="text-sm text-gray-500 mt-2">💰 Valor mensual: ${curso.precio.toLocaleString()}</p>

              <div className="mt-4 flex justify-between">
                <Link
                  to={`/admin/editar-curso/${curso._id}`}
                  className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </Link>

                <button className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCursos;