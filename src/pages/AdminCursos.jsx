import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const AdminCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);

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
      try {
        setCargando(true);
        const res = await fetch(`${API_URL}/api/cursos/con-inscritos`);
        const data = await res.json();
        setCursos(data);
      } catch (err) {
        console.error('Error cargando cursos:', err);
      } finally {
        setCargando(false);
      }
    };
    fetchCursos();
  }, []);

  return (
    <div className="pt-4 p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-institucional mb-6 text-center md:text-left">
        Gestión de Cursos
      </h1>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
        <Link
          to="/admin/crear-curso"
          className="bg-institucional text-white px-6 py-2 rounded-md hover:bg-presentacionDark transition duration-300 text-center w-full sm:w-auto"
        >
          Crear nuevo curso
        </Link>

        <button
          onClick={eliminarTodosLosCursos}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300 w-full sm:w-auto"
        >
          Eliminar todos los cursos
        </button>
      </div>

      {/* Cargando */}
      {cargando ? (
        <p className="text-center text-gray-600 text-lg mt-10">Cargando cursos...</p>
      ) : cursos.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No hay cursos creados todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cursos.map((curso) => (
            <div key={curso._id} className="bg-white rounded-lg shadow border p-4 flex flex-col justify-between">
              <img
                src={curso.imagen}
                alt={curso.nombre}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold text-institucional mb-1">{curso.nombre}</h2>
              <p className="text-sm text-gray-700 mb-1"><strong>Modalidad:</strong> {curso.modalidad}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Duración:</strong> {curso.duracion}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Inscritos:</strong> {curso.inscritos}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>Valor mensual:</strong> ${curso.precio.toLocaleString()}</p>

              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  to={`/admin/editar-curso/${curso._id}`}
                  className="bg-yellow-500 text-white text-sm px-4 py-2 rounded text-center hover:bg-yellow-600"
                >
                  Editar
                </Link>
                <button
                  className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCursos;